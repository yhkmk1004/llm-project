---
version: beta
name: Update Tracker — Hot Deal / Sale Tracker
description: >-
  A desktop web dashboard that collects hot-deal and sale news (Ppomppu hot
  deals, Google News) for keywords the user cares about. Follows Toss's design
  principles (text-first, depth through tone, a single accent color) with a
  fixed screen structure: keyword input → tag box → kanban board. Avoids
  patterns that make a design read as AI-generated (default blue, decorative
  gradients, formulaic section structures).

colors:
  # Brand accent is mint (#73F3C3). Its contrast on white is only 1.4:1, so it
  # can never be used as a text color.
  # → Use it as a fill only; text on top of it is always on-primary (ink).
  primary: "#73F3C3"
  on-primary: "#191F28"           # 12.1:1 on mint
  primary-soft: "#E8FDF5"         # selected-tag background, hover, other light emphasis
  primary-text: "#0B7A55"         # when accent text/links are needed on white (5.3:1)
  background: "#FFFFFF"           # 6 — base
  surface: "#F2F4F6"              # 3 — tag box, kanban column background (tone instead of borders)
  on-surface: "#191F28"           # default text (black)
  on-surface-muted: "#4E5968"
  on-surface-subtle: "#8B95A1"
  error: "#E5484D"
  # Dark mode is out of scope for this project, so there are no dark tokens.

typography:
  # Title = Pretendard / Header = Noto Sans ExtraBold / Body = Noto Sans
  title:                          # page title (service name)
    fontFamily: Pretendard
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.02em
  header-lg:                      # kanban column title (keyword)
    fontFamily: Noto Sans KR
    fontSize: 18px
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: -0.01em
  header-md:                      # card title, dialog title
    fontFamily: Noto Sans KR
    fontSize: 16px
    fontWeight: 800
    lineHeight: 1.45
  body-lg:
    fontFamily: Noto Sans KR
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Noto Sans KR
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Noto Sans KR
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
  label-md:                       # tag chips, source labels, dates
    fontFamily: Noto Sans KR
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.5
  label-sm:                       # low-priority info only, e.g. last-collected time
    fontFamily: Noto Sans KR
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5

rounded:
  none: 0px
  sm: 8px
  md: 12px
  lg: 16px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px

layout:
  content-max-width: 1200px
  keyword-input-width: 560px
  kanban-column-width: 320px
  kanban-column-gap: 16px

components:
  keyword-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.md}"
    height: 52px
    padding: 16px
  tag-box:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: 16px
  tag-chip:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: 32px
    padding: 12px
  tag-chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  kanban-column:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: 16px
    width: "{layout.kanban-column-width}"
  deal-card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: 16px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: 44px
    padding: 16px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: 44px
    padding: 16px
  icon:
    size: 20px
  icon-lg:
    size: 24px
---

# DESIGN.md

## Overview

A personal tracker that gathers hot-deal and sale news matching the user's keywords on a single screen. White background with black text by default; mint (`#73F3C3`) is the only accent. The user does exactly three things here: **manage keywords, filter by keyword, and jump to the original post.** Every element is judged by whether it helps one of those three actions.

- Target: desktop browser (Chrome), served from localhost or GitHub Pages.
- Data: the page only reads `data.json`, which GitHub Actions refreshes every 15 minutes.
- The LLM filter (Chrome built-in LLM) runs when the user presses a button. Automatic runs are out of scope because the LLM only runs inside the browser and the first model download requires a user gesture.
- Out of scope: notifications, dark mode, workarounds for pages that can't be collected via RSS, automatic LLM runs.
- UI copy is Korean. Korean strings in this document are the actual UI text and should be used as written.

## Colors

- **6:3:1 ratio** — `background` (white) : `surface` (gray tone) : `primary` (mint). Mint is the "1". Never spread it over large areas.
- **Mint is fill-only.** At 1.4:1 on white, it is unreadable as text, icons, or thin lines. Text on mint is always `on-primary` (ink).
- When accent text is genuinely needed on white (e.g. hover on an original-post link), use `primary-text` (`#0B7A55`).
- Mint is limited to:
  - Selected keyword tags (`tag-chip-selected`)
  - The single primary action button on the screen (`button-primary`)
  - The focus ring of the keyword input
- **No blue.** Links are ink + underline, or `primary-text` — never blue.
- **No gradients.**
- Sources (Ppomppu / News) are distinguished by text labels, not color, to keep the single-accent rule intact.

## Typography

- **Title = Pretendard, Header = Noto Sans ExtraBold (800), Body = Noto Sans.** Load Noto Sans KR for Korean.
- `title` is used in exactly one place: the service name at the top of the page.
- Headers (`header-lg`, `header-md`) are for kanban column titles (keywords) and card titles. Weight 800 is heavy, so keep sizes at 16–18px even when many headers line up on one screen.
- Body text is 14–16px. Dates and source labels use `label-md` (13px).
- 12px (`label-sm`) is only for low-priority info such as "마지막 수집: 5분 전" (last collected: 5 min ago).

## Layout

The screen is a single top-to-bottom flow. No decorative sections, and this order never changes.

```
┌──────────────────────────────────────────────┐
│             Service name (title)             │
│      [ Keyword input — press Enter to add ]  │  ← top center, like a search bar
│ ┌──────────────────────────────────────────┐ │
│ │ [vacuum ×] [AirPods ×] [Nintendo ×] … More ▾│ │  ← tag box (surface)
│ │ Sort: A–Z ▾   Clear selection [LLM filter] │ │
│ └──────────────────────────────────────────┘ │
│  Sort deals: ending soonest ▾          ←  →  │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────      │
│ │ vacuum │ │AirPods │ │Nintendo│ │ …          │  ← kanban board (keyword = column)
│ │ [card] │ │ [card] │ │ [card] │ │            │
│ │ [card] │ │ [card] │ │        │ │            │
│ └────────┘ └────────┘ └────────┘ └──────      │
└──────────────────────────────────────────────┘
```

- **Keyword input**: top center, about 560px wide. Looks like a search bar; the placeholder tells users that Enter adds a keyword.
- **Tag box**: directly below the input. Shows two rows by default and expands with `더보기` (More) when it overflows. The expanded state is persisted.
- **Kanban board**: one column per keyword. Columns extend horizontally; when they overflow, `←` `→` buttons move one column at a time. A button is disabled when there is nowhere further to go.
- Repeating equal-width kanban columns is an exception to the "no uniform grid" rule because it reflects the information structure (grouping by keyword). Card heights inside a column vary with content.
- Max content width is 1200px; only the kanban board scrolls horizontally.

## Elevation & Depth

- Depth comes from **tone, not lines**: white background → gray `surface` (tag box, kanban columns) → white cards and white tags inside them.
- No borders, shadows, or colored top edges on cards or tags.
- Exception: the tag currently being dragged gets a faint shadow to show it is "lifted".

## Shapes

- Moderate corners (`rounded.sm`–`rounded.lg`). Tags use `rounded.sm`, not pills (9999px).
- Tag box and kanban columns = `lg`; cards, input, buttons = `md`; tags = `sm`.

## Motion & Micro-interaction

- Motion reflects real state only.
  - Show progress only while the LLM is judging. Remove it the moment it finishes.
  - Show skeleton cards only while `data.json` is loading.
- When reordering tags by drag, use only a short shift as items make room (~150ms).
- Kanban `←` `→` scroll smoothly by one column width.
- No particles, sparkles, or decorative animation.

## Voice & Content Strategy

Korean copy follows Toss's voice & tone guidelines.

| Principle | Rule | Example in this project |
|---|---|---|
| 해요체 | All strings use 해요체 | "키워드를 추가해요" |
| Active voice | Prefer active over passive | "수집됐어요" → "모았어요" |
| Positive framing | Reframe blockers as conditions | "결과가 없어요" → "키워드를 추가하면 소식을 모아볼 수 있어요" |
| Drop excessive honorifics | No ~시겠어요? | "삭제하시겠어요?" → "삭제할까요?" |
| No noun stacking | Unpack Sino-Korean compounds into verb phrases | "키워드 필터 해제" → "선택 풀기" |
| Dialog buttons | Left button is always **닫기** (Close), never 취소 (Cancel) | Keyword delete confirm: [닫기] [삭제하기] |

**Common strings**
- Input placeholder: "관심 있는 상품을 입력하고 엔터를 눌러요"
- Keyword delete confirm: title "'청소기'를 삭제할까요?", description "이 키워드로 모은 소식도 화면에서 사라져요"
- Empty state (no keywords): "키워드를 추가하면 할인 소식을 모아볼 수 있어요"
- Empty state (no results for filter): "이 키워드로 모은 소식이 아직 없어요. 15분마다 새로 모아요"
- LLM judging in progress: "새 소식 12개를 살펴보고 있어요"
- Browser without LLM support: "Chrome에서 열면 관심사에 맞는 글만 골라볼 수 있어요"

**CTAs**
- The label alone predicts the next action: "LLM 필터" ✕ → "관심사에 맞는 글만 보기" (Show only posts that match my interests) ○
- Don't add helper text above a button that repeats what the button says.

## Components

### Keyword Input
- Enter adds the keyword. If it already exists, don't add it; briefly highlight the existing tag instead.
- Trim whitespace; ignore empty input.

### Tag Chip
- Structure: keyword text + `×` button (one icon only, no emoji).
- **Click** = toggle selection. Multiple tags can be selected. Selected tags use `tag-chip-selected` (mint background + ink text).
- **`×`** = opens the delete confirmation dialog. Never deletes immediately.
- **Drag** = manual ordering. Show the drag-handle cursor only when keyword sort is set to manual.
- When at least one tag is selected, show a `선택 풀기` (Clear selection) button (`button-secondary`) in the tag box. Clicking a selected tag again also deselects it.

### Tag Box
- Two rows by default; `더보기 ▾` / `접기 ▴` (More / Less) when it overflows.
- Keyword sort control: A–Z ↑ / A–Z ↓ / Manual.

### Kanban Column
- Column title = keyword (`header-lg`) + post count (`label-md`, `on-surface-muted`).
- When keywords are selected, only their columns remain. With no selection, all columns show.
- Card order within a column follows the deal sort: ending soonest (end date ↑) / most recently started (start date ↓).

### Deal Card
- Structure (top to bottom): source label (`뽐뿌` / `뉴스`, `label-md`) → title (`header-md`, max 2 lines) → dates (start/end, if available) → link to original.
- The whole card is the link to the original post, opened in a new tab.
- No thumbnails: RSS doesn't provide them consistently, and they conflict with the text-first principle.
- Articles grouped from the same press release show as one card with a collapsible "비슷한 기사 n개" (n similar articles).
- If a post has no end date, omit the date line. No placeholder like "종료일 없음" (no end date).

### Buttons & Dialogs
- There is exactly one `button-primary` (mint) on the screen: **관심사에 맞는 글만 보기** (the Chrome built-in LLM second-pass filter).
- Everything else (clear selection, sort, more, ← →) is `button-secondary` or a text button.
- The only dialog is the keyword delete confirmation: [닫기] on the left, [삭제하기] on the right. Since deletion can't be undone, the right button's text uses `error` (background stays `surface`).

### LLM Filter Button
- `button-primary` at the bottom right of the tag box. Label: "관심사에 맞는 글만 보기".
- If the model hasn't been downloaded yet, the first click starts the download. Change the label to "AI 모델 받는 중이에요" and show progress.
- While judging, show "새 소식 12개를 살펴보고 있어요" next to the button. Filter out cards as soon as each judgment finishes; never leave the screen empty while waiting.
- While the filter is on, the button becomes "모든 글 보기" (Show all posts, `button-secondary`), so users can compare against the first-pass keyword results.
- Posts already judged use the cached result and are not judged again.
- In browsers without the Chrome built-in LLM, show only the keyword-filter results plus a one-line notice.

### Keyword Suggestion (keyword-improvement agent)
- Appears one at a time directly below the tag box, only after the LLM filter finishes and only when it finds something to improve. If it finds nothing, nothing appears.
- Structure: cause → suggestion → evidence → buttons.
  - Cause: "'청소기'에 해외 직구 기사가 섞여 있어요" (`body-md`)
  - Suggestion: "제외어 '해외'를 추가하면 3개가 빠져요" (`header-md`). Always state how many posts would be removed.
  - Evidence: 2–3 titles of posts that would be removed, in `body-sm`, `on-surface-muted`, so the user can judge for themselves.
  - Buttons: [닫기] on the left, [적용하기] (Apply) on the right. Both `button-secondary`; the only mint button on the screen stays the LLM filter.
- Background `surface`, no border. No exclamation icons or yellow — it must not look like a warning.
- Pressing [적용하기] reruns the filter and looks for the next suggestion based on the new results. Show "다시 살펴보고 있어요" only while this is in progress.
- Applied exclusion words appear in small text inside the tag chip: `청소기 −해외` (`label-md`, `on-surface-subtle`). Clicking it removes just the exclusion word.
- Suggestions that would require changing the collection keywords (repo config) show guidance instead of an apply button — "repo 설정에서 '청소기'를 '무선청소기'로 바꿔보세요" — with only [닫기]. Never make the page look like it can do something it can't.

### Icons
- 20–24px, one consistent line-icon set. Never place an icon next to an emoji.
- Used for: `×` (delete), `←` `→` (kanban navigation), `▾` (more / sort), drag handle. No other decorative icons.
- No exclamation icons for non-error situations (e.g. empty states).

## State Persistence

Persist the following in browser storage (localStorage) so they survive closing and reopening the window. Don't show "saved" notifications — persistence is the expected default.

| Item | Contents |
|---|---|
| Keyword list | Tags and their order |
| Selected keywords | Multi-selection state |
| Keyword sort mode | A–Z ↑/↓, manual |
| Deal sort mode | End date ↑, start date ↓ |
| Tag box expanded | More/Less state |
| LLM filter results | Per-keyword cache (so the same post isn't judged twice) |
| Approved exclusion words | Per-keyword exclusion list |
| Dismissed suggestions | So the same suggestion doesn't reappear |

## Do's and Don'ts

**Do**
- Use mint as a fill only, with ink text on top.
- Keep the screen order fixed (input → tag box → kanban).
- One primary action: "관심사에 맞는 글만 보기".

**Don't**
- Blue, gradients, or emojis.
- Mint text, thin mint lines, or large mint backgrounds.
- Repeating the "eyebrow → title → description → button" formula. This screen has no hero section.
- Borders, shadows, or color strips on cards.
- Distinguishing sources (Ppomppu / News) by color.

**Usability hard rules**
1. **No entry interrupts.** No guide popups or tutorial modals on first visit; empty-state copy is enough.
2. **No deletion without confirmation.** Deleting a keyword always goes through the confirmation dialog.
3. **Always provide an out.** Every dialog has [닫기]; every filter has `선택 풀기`.
4. **Predictable CTAs.** The button label alone tells the user what will happen.
