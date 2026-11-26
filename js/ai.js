/*
 * on-device LLM 준비와 진단 (Chrome 내장 Prompt API, 데스크톱 Chrome 148 이상)
 * 번역은 translator-ko.js(KoTranslate)가 맡고, 이 파일은 언어 모델만 다룬다.
 *
 * 연결: <script src="js/translator-ko.js"></script>
 *       <script src="js/ai.js"></script>              → 전역 AI 사용
 *
 *   AI.isSupported()                            이 브라우저에 Prompt API가 있는지
 *   await AI.status()                           'available' | 'downloadable' | 'downloading' | 'unavailable' | 'unsupported'
 *   await AI.diagnose()                         { secure, lm, translate } 한 번에 확인 (translate는 KoTranslate가 있을 때만)
 *   await AI.showDiagnosis(el)                  el에 '내장 AI 상태: secure=… · LM=… · 번역=…' 한 줄 표시
 *   await AI.prepare(onProgress)                처음 1회, 반드시 버튼 클릭 핸들러 안에서 await보다 먼저 호출 (모델 다운로드)
 *   await AI.loadPrompt(url, { interests })     prompt.md를 읽어 '#' 줄을 빼고 system prompt로 돌려줌 (못 읽으면 기본 프롬프트)
 *   await AI.loadSchema(url)                    schema.json(답 형식)을 읽어 돌려줌 (못 읽으면 기본 schema)
 *   await AI.createSession(systemPrompt)        판단 기준(system prompt)을 넣은 세션 만들기
 *   await AI.ask(session, text, schema)         한 건 물어보고 JSON 객체로 받기 (매번 세션을 복제해 이전 대화가 섞이지 않게)
 *   AI.JUDGE_SCHEMA                             schema.json을 못 읽었을 때 쓰는 기본 schema { relevant, price, discount, reason }
 */
(() => {
  // 한국어는 지원 언어가 아니라서, 입력·출력 모두 영어로 선언한다 (번역은 KoTranslate)
  const LLM_OPTS = {
    expectedInputs: [{ type: 'text', languages: ['en'] }],
    expectedOutputs: [{ type: 'text', languages: ['en'] }],
  };

  // schema.json을 못 읽었을 때 쓰는 기본 답 형식 (schema.json과 같은 내용)
  const JUDGE_SCHEMA = {
    type: 'object',
    properties: {
      relevant: { type: 'boolean' },
      price: { type: 'string' },
      discount: { type: 'string' },
      reason: { type: 'string' },
    },
    required: ['relevant', 'price', 'discount', 'reason'],
  };

  // prompt.md를 못 읽었을 때 쓰는 기본 프롬프트 (prompt.md v1과 같은 내용)
  const DEFAULT_PROMPT = [
    'You check shopping deal posts and news headlines for one user.',
    "User's interests: Dyson vacuum, laptop, E-mart.",
    '',
    'Mark relevant = true only if the item is a discount, sale, or deal',
    "on one of the user's interests.",
    'Mark relevant = false for: new product launches, stock or company news,',
    'deals on unrelated products, deals only for overseas stores.',
    '',
    'For price and discount, copy only numbers written in the item.',
    'If there is none, write "none".',
    'Give the reason in one short sentence.',
  ].join('\n');

  let base = null; // 다운로드를 시작한 첫 세션 (Promise)

  const isSupported = () => 'LanguageModel' in self;

  async function status() {
    if (!isSupported()) return 'unsupported';
    try {
      return await LanguageModel.availability(LLM_OPTS);
    } catch (err) {
      return `오류(${err.name})`;
    }
  }

  async function diagnose() {
    const secure = self.isSecureContext;
    const lm = await status();
    let translate = '없음';
    if (self.KoTranslate) {
      try { translate = await KoTranslate.status('ko', 'en'); } catch (err) { translate = `오류(${err.name})`; }
    }
    return { secure, lm, translate };
  }

  async function showDiagnosis(el) {
    const d = await diagnose();
    if (el) el.textContent = `내장 AI 상태: secure=${d.secure} · LM=${d.lm} · 번역=${d.translate}`;
    return d;
  }

  function explain(err) {
    if (err?.name === 'NotAllowedError') {
      return new Error('모델을 받으려면 사용자 클릭이 필요합니다. 버튼 클릭 핸들러 안에서 AI.prepare()를 가장 먼저 호출하세요.');
    }
    if (err?.name === 'NotSupportedError') {
      return new Error('이 기기에서는 내장 모델을 쓸 수 없습니다. chrome://on-device-internals 에서 상태를 확인하세요.');
    }
    return err;
  }

  // async 함수가 아니어서 호출하는 순간 바로 create()가 실행된다 → 클릭 직후 사용자 활성화가 유지됨
  function prepare(onProgress) {
    if (!isSupported()) {
      return Promise.reject(new Error('이 브라우저는 Prompt API를 지원하지 않습니다. 데스크톱 Chrome 148 이상에서 http://localhost 또는 https 주소로 열어주세요.'));
    }
    if (!base) {
      base = LanguageModel.create({
        ...LLM_OPTS,
        monitor(m) {
          m.addEventListener('downloadprogress', (e) => onProgress?.(e.loaded, 'language-model'));
        },
      }).catch((err) => {
        base = null;
        throw explain(err);
      });
    }
    return base;
  }

  async function loadPrompt(url = 'ai/prompt.md', { interests } = {}) {
    let text = DEFAULT_PROMPT;
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) text = await res.text();
    } catch (err) {
      // file:// 로 열었거나 파일이 없으면 기본 프롬프트 사용
    }
    let lines = text.split('\n').filter((line) => !line.trim().startsWith('#'));
    if (interests?.length) {
      lines = lines.map((line) => (/^\s*User's interests:/i.test(line) ? `User's interests: ${interests.join(', ')}.` : line));
    }
    return lines.join('\n').trim();
  }

  async function loadSchema(url = 'ai/schema.json') {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) return await res.json();
    } catch (err) {
      // file:// 로 열었거나 파일이 없거나 JSON 문법이 틀리면 기본 schema 사용
      console.warn('schema.json을 읽지 못해 기본 형식을 써요:', err);
    }
    return JUDGE_SCHEMA;
  }

  async function createSession(systemPrompt) {
    await prepare(); // 모델이 아직 없으면 여기서 기다림 (다운로드 시작은 반드시 클릭 직후 prepare()로)
    try {
      return await LanguageModel.create({
        ...LLM_OPTS,
        initialPrompts: [{ role: 'system', content: systemPrompt }],
      });
    } catch (err) {
      throw explain(err);
    }
  }

  async function ask(session, text, schema = JUDGE_SCHEMA) {
    const s = await session.clone();
    try {
      const raw = await s.prompt(text, { responseConstraint: schema });
      return JSON.parse(raw);
    } finally {
      s.destroy();
    }
  }

  self.AI = {
    LLM_OPTS,
    JUDGE_SCHEMA,
    isSupported,
    status,
    diagnose,
    showDiagnosis,
    prepare,
    loadPrompt,
    loadSchema,
    createSession,
    ask,
  };
})();
