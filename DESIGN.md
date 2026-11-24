---
version: 1.0
name: dark-editorial-adventure-ui
description: >-
  Dark editorial interface system inspired by the visual characteristics of a
  fantasy-adventure web experience. Uses deep blue-charcoal surfaces, a restrained
  red action accent, expressive serif display typography, and clear sans-serif UI.
  This is an abstract design reference, not a pixel-level recreation or an official
  brand specification for any existing website.

colors:
  primary: "#E40712"          # Main action accent; use sparingly
  on-primary: "#FFFFFF"
  header: "#222B2F"
  topbar: "#11171C"
  background: "#111820"
  surface: "#202A30"
  text: "#F4F5F6"
  text-muted: "#C3C9CC"
  text-subtle: "#A0A9AE"
  border: "rgba(235, 242, 245, 0.16)"
  overlay: "rgba(7, 12, 18, 0.68)"
  primary-hover: "#C90610"  # Suggested interaction state, not sampled

# Dark-first palette. These are approximate visual observations from the
# supplied screenshots, not verified source-code or official brand tokens.

# Suggested font stacks. Exact website font files were not verified.
typography:
  display:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(44px, 5.5vw, 84px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  heading-xl:
    fontFamily: "Inter, 'Segoe UI', Arial, sans-serif"
    fontSize: "clamp(36px, 4vw, 56px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  heading-lg:
    fontFamily: "Inter, 'Segoe UI', Arial, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.15
  heading-md:
    fontFamily: "Inter, 'Segoe UI', Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.25
  body-lg:
    fontFamily: "Inter, 'Segoe UI', Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "Inter, 'Segoe UI', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Inter, 'Segoe UI', Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, 'Segoe UI', Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
  # For Korean UI copy, append Pretendard or Noto Sans KR before sans-serif.

rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"

spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  base: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "80px"
  5xl: "96px"

layout:
  content-max: "1280px"
  page-gutter: "clamp(20px, 5vw, 96px)"
  section-y-desktop: "80px–112px"
  section-y-mobile: "56px–72px"
  header-height-desktop: "80px–96px"
  breakpoint-tablet: "768px"
  breakpoint-desktop: "1200px"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    fontWeight: 700
    rounded: "{rounded.sm}"
    minHeight: "48px"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    border: "1px solid {colors.border}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    minHeight: "48px"
    padding: "12px 24px"
  navigation:
    backgroundColor: "{colors.header}"
    textColor: "{colors.text}"
    minHeight: "80px–96px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "20px–24px"
  content-container:
    maxWidth: "{layout.content-max}"
    horizontalPadding: "{layout.page-gutter}"
  icon:
    size: "20px–24px"
  icon-large:
    size: "32px–40px"

---

# DESIGN.md

## Overview

A dark editorial adventure UI: atmospheric, cinematic, and content-led. Deep blue-charcoal surfaces establish the environment; a restrained red accent identifies the most important action; expressive serif typography creates character while sans-serif UI keeps navigation and information easy to scan.

The design should communicate **immersion without sacrificing usability**. Use artwork to establish mood, hierarchy to explain the page, and color to guide action. Do not reproduce the reference website's exact composition, logo, artwork, wording, or branded assets.

The token values are approximate implementation defaults based on the supplied screenshots. The rules below are the durable design principles.

## Colors

- **Dark-first, not pure black.** Use `background`, `surface`, and `header` as related blue-charcoal tones. Avoid a flat black canvas.
- **Accent is for action.** `primary` is the visual exception, not a general decorative color. Reserve it for the single most important CTA, selected states, and rare high-priority emphasis.
- **Keep the hierarchy quiet.** Most of the interface should use dark neutral surfaces and light text. Avoid adding multiple competing accent colors.
- **Use contrast deliberately.** Main text uses `text`; supporting copy uses `text-muted`. Do not reduce opacity until important information becomes difficult to read.
- **Image overlays are functional.** Put a dark overlay or directional gradient behind text on top of photography or illustration. Never depend on the image crop alone for legibility.
- **Gradients are purposeful.** Use them to protect text contrast or blend an image into a dark surface. Do not add decorative gradients to buttons, cards, or empty backgrounds.
- **Semantic states stay distinct.** Do not use the brand red as a universal error, warning, and selection color. Define semantic colors separately when the product requires them.

## Typography

- **Two-family hierarchy.** Use a bold serif display face for a limited number of atmospheric headlines. Use a clean sans-serif for navigation, body copy, labels, buttons, and functional headings.
- **Display is a feature, not a default.** Reserve the serif face for hero headlines or major editorial moments. Do not apply it to every card title or navigation item.
- **UI must scan quickly.** Navigation and functional headings use a clear sans-serif with medium-to-bold weight.
- **Body copy stays comfortable.** Default body text is 16px; use 18px for prominent introductory copy and 14px only for secondary metadata.
- **Control line length.** Keep long descriptions around 55–70 characters per line where practical. Let headings wrap naturally rather than shrinking them aggressively.
- **Font uncertainty.** The screenshots do not identify the exact font files. The stacks in the token block are suggested equivalents, not verified source fonts. For Korean UI, add `Pretendard` or `Noto Sans KR` to the sans-serif stack.

## Layout

- **One clear focal point per section.** Establish a headline, key visual, or featured content item before introducing secondary elements.
- **Use a wide editorial container.** Keep the main content within `layout.content-max`, centered with consistent page gutters.
- **Do not force a repeated grid.** Choose a single feature, split image-and-text section, two-column layout, or card grid according to the content. Three equal cards are an option, not a default template.
- **Keep section rhythm varied.** Alternate dense browsing areas with spacious editorial sections. Maintain consistent alignment, but vary composition to avoid a mechanical sequence.
- **Align content to a shared frame.** Navigation, hero copy, section headings, and footer content should use a consistent horizontal alignment system.
- **Whitespace is structural.** Use larger spacing between sections and tighter spacing within related components. Do not fill empty space with unnecessary labels, icons, or decorative panels.

## Header & Navigation

- Use a dark, stable navigation surface that is visually distinct from the hero artwork.
- Group the brand area, primary navigation, and account or utility actions into clear zones. The exact arrangement may change to suit the product; do not copy the reference site's menu order.
- Navigation labels should be short, readable, and consistently weighted.
- Use a visible hover, focus, and active state. Do not communicate the active page through color alone.
- On smaller screens, collapse navigation into a compact menu instead of squeezing desktop links into a single row.
- Promotional or announcement bars are optional. Add one only when there is a real announcement to communicate.

## Hero & Editorial Sections

- Treat the hero as a **message plus supporting visual**, not as a background image with text pasted on top.
- Place the main title in a high-contrast region. A left-aligned text block is a useful default, but its position should follow the image composition and the content's reading order.
- Keep the hero headline concise. Pair it with one short supporting statement and one primary action.
- Use a dark directional overlay when text overlaps detailed artwork. The overlay should be strongest behind the text and may soften toward the image's focal subject.
- Do not let the hero occupy the entire page by default. Make the next section discoverable through visible content or a clear continuation cue.
- For editorial sections, use image-and-text pairings, asymmetrical compositions, or curated grids where they best explain the content.

## Components

### Buttons & CTAs

- `button-primary` represents the main action of the current section or screen. Keep one dominant primary CTA in a given visual group.
- `button-secondary` supports alternative or lower-priority actions.
- Use short labels that make the next action predictable. Do not use vague labels when a specific verb is available.
- Keep button height and horizontal padding consistent across the same interface.
- Hover may adjust brightness or surface tone. Focus must have a clear visible indicator. Avoid scale jumps and decorative motion.

### Cards

- Use cards when content needs to be grouped or compared. Do not turn every paragraph or link into a card.
- Keep card imagery consistent in aspect ratio within the same content group.
- Use a restrained surface contrast. Avoid combining a strong border, heavy shadow, bright accent strip, and saturated background on one card.
- Card content should have a clear order: image or visual, title, concise description, then an optional action.
- Make click behavior explicit. If the whole card is interactive, provide an appropriate focus state and accessible name.

### Navigation Links

- Use light neutral text for the default state.
- Make hover, active, and focus states distinguishable through more than a subtle color shift when necessary.
- Ensure the clickable area is larger than the text glyphs, especially on touch devices.

### Icons & Graphics

- Use icons to clarify actions or categories, not as filler.
- Prefer one consistent icon family and stroke or fill style.
- Keep small functional icons around 20–24px and larger supporting graphics around 32–40px.
- Use detailed illustration as a deliberate focal asset. Avoid placing multiple competing hero graphics in one viewport.
- Do not use emoji as a substitute for a designed icon system.

## Imagery & Art Direction

- Use original or properly licensed imagery. Do not copy the reference site's logo, character art, monsters, screenshots, or proprietary visual assets.
- Select imagery for composition as well as subject. Leave a calm area where headings and actions can sit.
- Prefer cinematic lighting, controlled contrast, and a coherent visual palette over random fantasy imagery.
- Keep content thumbnails consistent in crop and aspect ratio within a section.
- Avoid placing important text over faces, detailed focal subjects, or high-frequency image regions.
- If no suitable image exists, use a restrained surface treatment rather than a generic decorative gradient.

## Shapes & Depth

- Keep control and card radii restrained (`rounded.sm`–`rounded.lg`). Avoid making every element pill-shaped.
- Separate large regions primarily through tone (`background` versus `surface`). Use borders only when a boundary is needed for comprehension.
- Shadows should be subtle and reserved for overlays or floating controls that need elevation. Do not add heavy shadows to every card.
- Avoid ornamental borders, glowing outlines, and repeated accent-colored edge treatments.

## Motion & Micro-interaction

- Motion should communicate a real state change: opening a menu, changing a tab, submitting a form, or navigating to content.
- Keep transitions short and restrained. Avoid parallax, particles, or looping effects that compete with reading.
- Do not animate elements merely to make a static screen feel active.
- Respect `prefers-reduced-motion` and provide an equally understandable reduced-motion experience.

## Responsive Rules

- **Desktop (`1200px+`):** use the full navigation structure, wide editorial container, and flexible two- or three-column content layouts where useful.
- **Tablet (`768px–1199px`):** reduce page gutters, simplify navigation, and prefer two-column compositions.
- **Mobile (`below 768px`):** use a compact navigation pattern, single-column content, and touch-friendly controls.
- Stack image-and-text layouts in meaningful reading order. Do not preserve a desktop split layout when it makes mobile content cramped.
- Scale display typography with `clamp()` and allow natural wrapping. Do not solve narrow layouts by shrinking text below comfortable reading sizes.
- Use full-width primary buttons only when it improves the mobile action flow.
- Ensure sticky navigation does not cover anchor targets or page content.

## Accessibility

- Aim for at least **4.5:1 contrast** for normal text and **3:1** for large text and essential UI boundaries.
- Never rely on red or any single color alone to communicate selection, errors, or status.
- Provide visible keyboard focus for all interactive elements.
- Give icon-only controls accessible names and adequate touch targets.
- Provide meaningful alternative text for informative images; use empty alt text for purely decorative imagery.
- Keep text readable over images with an adequate overlay or a separate text surface.

## Do's and Don'ts

**Do**

- Use dark blue-charcoal neutrals as the foundation.
- Reserve the red accent for the primary action and a small number of meaningful states.
- Pair expressive serif display typography with practical sans-serif UI typography.
- Let the content determine whether a section uses a split layout, list, feature, or grid.
- Keep image overlays, spacing, and typography in service of readability.
- Use original brand assets and content for the implementation.

**Don't**

- Recreate the reference website pixel for pixel or reuse its proprietary logo, artwork, or copy.
- Make every section a three-card grid or repeat the same hero-and-card formula down the page.
- Use red as a large decorative background or apply it to every button.
- Put low-contrast text directly over busy imagery.
- Use pure black everywhere, excessive gradients, heavy shadows, or glowing effects as decoration.
- Reduce body text to tiny sizes to fit more content into a viewport.
- Add motion, icons, or visual effects that do not clarify content or interaction.

## Implementation Notes

- Treat the token block at the top of this file as the default source of truth for design decisions.
- If the product has its own brand accent, replace `colors.primary` and re-check `on-primary` contrast before building screens. Do not assume red is mandatory for every product.
- The sampled colors are approximate. Re-check the palette against the actual assets and test all text/background combinations before shipping.
- Typography families, breakpoints, and component dimensions are implementation recommendations inferred from the screenshots, not confirmed values from the source website.

## CSS Starter Tokens

```css
:root {
  color-scheme: dark;

  --color-primary: #E40712;
  --color-on-primary: #FFFFFF;
  --color-header: #222B2F;
  --color-topbar: #11171C;
  --color-background: #111820;
  --color-surface: #202A30;
  --color-text: #F4F5F6;
  --color-text-muted: #C3C9CC;
  --color-text-subtle: #A0A9AE;
  --color-border: rgba(235, 242, 245, 0.16);
  --color-overlay: rgba(7, 12, 18, 0.68);
  --color-primary-hover: #C90610;

  --font-display: Georgia, "Times New Roman", serif;
  --font-ui: Inter, "Segoe UI", Arial, sans-serif;

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-base: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 80px;
  --space-5xl: 96px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  --content-max: 1280px;
  --page-gutter: clamp(20px, 5vw, 96px);
}

.page-container {
  width: min(calc(100% - 2 * var(--page-gutter)), var(--content-max));
  margin-inline: auto;
}

.display-title {
  font-family: var(--font-display);
  font-size: clamp(44px, 5.5vw, 84px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.025em;
  color: var(--color-text);
}

.button-primary {
  min-height: 48px;
  padding: 12px 24px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: var(--color-on-primary);
  font: 700 16px/1.2 var(--font-ui);
}
```
