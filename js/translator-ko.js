/*
 * 한국어 ↔ 영어 번역 헬퍼 (Chrome 내장 Translator API, 데스크톱 Chrome 138 이상)
 * on-device LLM은 한국어를 잘 못 다루므로, LLM 앞뒤에서 입력은 영어로, 출력은 한국어로 바꿔준다.
 *
 * 연결: <script src="js/translator-ko.js"></script> → 전역 KoTranslate 사용
 *
 *   await KoTranslate.prepare(onProgress)        처음 1회, 반드시 버튼 클릭 핸들러 안에서 호출 (번역 모델 다운로드)
 *   await KoTranslate.toEnglish(text)            한 → 영 (문자열 또는 문자열 배열)
 *   await KoTranslate.toKorean(text)             영 → 한
 *   await KoTranslate.withLLM(한국어, async (en) => 영어결과)   한→영 → LLM → 영→한을 한 번에
 *   await KoTranslate.fieldsToKorean(obj, ['summary'])          객체(또는 객체 배열)의 지정한 필드만 한국어로
 *   await KoTranslate.status()                   'available' | 'downloadable' | 'downloading' | 'unavailable' | 'unsupported'
 */
(() => {
  const MAX_CHUNK = 1000;
  const translators = new Map();
  const memo = new Map();
  const HANGUL = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;

  const isSupported = () => 'Translator' in self;

  async function status(from = 'ko', to = 'en') {
    if (!isSupported()) return 'unsupported';
    return Translator.availability({ sourceLanguage: from, targetLanguage: to });
  }

  function explain(err) {
    if (err?.name === 'NotAllowedError') {
      return new Error('번역 모델을 받으려면 사용자 클릭이 필요합니다. 버튼 클릭 핸들러 안에서 KoTranslate.prepare()를 먼저 호출하세요.');
    }
    return err;
  }

  function getTranslator(from, to, onProgress) {
    if (!isSupported()) {
      return Promise.reject(new Error('이 브라우저는 Translator API를 지원하지 않습니다. 데스크톱 Chrome 138 이상에서 열어주세요.'));
    }
    const key = `${from}>${to}`;
    if (!translators.has(key)) {
      const created = Translator.create({
        sourceLanguage: from,
        targetLanguage: to,
        monitor(m) {
          m.addEventListener('downloadprogress', (e) => onProgress?.(e.loaded, key));
        },
      }).catch((err) => {
        translators.delete(key);
        throw explain(err);
      });
      translators.set(key, created);
    }
    return translators.get(key);
  }

  async function prepare(onProgress) {
    await Promise.all([getTranslator('ko', 'en', onProgress), getTranslator('en', 'ko', onProgress)]);
  }

  // 긴 줄은 문장 단위로 잘라 번역 (한 번에 너무 긴 입력을 넣으면 실패할 수 있음)
  function splitLong(line) {
    if (line.length <= MAX_CHUNK) return [line];
    const parts = [];
    let buf = '';
    for (const s of line.split(/(?<=[.!?。])\s+/)) {
      if (buf && buf.length + s.length + 1 > MAX_CHUNK) {
        parts.push(buf);
        buf = s;
      } else {
        buf = buf ? `${buf} ${s}` : s;
      }
    }
    if (buf) parts.push(buf);
    return parts;
  }

  async function translateLine(t, line, from, to) {
    if (!line.trim()) return line;
    if (from === 'ko' && !HANGUL.test(line)) return line; // 한글이 없는 줄(URL, 숫자 등)은 그대로 둠
    const key = `${from}>${to}:${line}`;
    if (memo.has(key)) return memo.get(key);
    const out = [];
    for (const piece of splitLong(line)) out.push(await t.translate(piece));
    const result = out.join(' ');
    memo.set(key, result);
    return result;
  }

  async function translate(text, from = 'ko', to = 'en') {
    if (Array.isArray(text)) {
      const out = [];
      for (const item of text) out.push(await translate(item, from, to));
      return out;
    }
    if (text == null || String(text).trim() === '') return text ?? '';
    const t = await getTranslator(from, to);
    const lines = [];
    for (const line of String(text).split('\n')) lines.push(await translateLine(t, line, from, to));
    return lines.join('\n');
  }

  const toEnglish = (text) => translate(text, 'ko', 'en');
  const toKorean = (text) => translate(text, 'en', 'ko');

  // LLM 결과가 문자열이면 한국어로 번역, 객체면 그대로 반환 (객체는 fieldsToKorean 사용)
  async function withLLM(koreanInput, llmFn) {
    const result = await llmFn(await toEnglish(koreanInput));
    return typeof result === 'string' ? toKorean(result) : result;
  }

  async function translateFields(obj, keys, from = 'en', to = 'ko') {
    if (Array.isArray(obj)) {
      const out = [];
      for (const item of obj) out.push(await translateFields(item, keys, from, to));
      return out;
    }
    const copy = { ...obj };
    for (const k of keys) {
      if (typeof copy[k] === 'string' || Array.isArray(copy[k])) copy[k] = await translate(copy[k], from, to);
    }
    return copy;
  }

  const fieldsToKorean = (obj, keys) => translateFields(obj, keys, 'en', 'ko');
  const fieldsToEnglish = (obj, keys) => translateFields(obj, keys, 'ko', 'en');

  self.KoTranslate = {
    isSupported,
    status,
    prepare,
    translate,
    toEnglish,
    toKorean,
    withLLM,
    translateFields,
    fieldsToKorean,
    fieldsToEnglish,
  };
})();
