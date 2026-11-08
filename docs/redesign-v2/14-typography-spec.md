# 14 — Typography specification (supersedes any size in docs/redesign/02)

## Families and roles (self-hosted Fontsource variable; no Google Fonts link)
| Role | Family | Why |
|---|---|---|
| Display (H1, H2, product names, big numerals) | Bricolage Grotesque Variable | Characterful grotesque with optical size and width axes; reads as crafted, not default sans |
| Body, UI, buttons, form text | Geist Variable | Neutral, very legible at 14-18 px, has tabular numerals |
| Labels, status badges, tags, ASCII glyphs | Geist Mono Variable | Technical tone; also required by the ASCII atlas |
No fourth family. No serif. No italic display.

## Variable axes (use them; this is what makes it look designed)
- Bricolage: `opsz` axis follows size (high optical size for H1, auto for smaller); `wdth` slightly condensed (about 90-95) for H1 on desktop so long lines fit; `wght` 700-800 for H1/H2, 600 for H3 and card titles. If the installed Fontsource package exposes only the `wght` file, import the `opsz`/`wdth` files too and verify in the computed styles that axes work; otherwise log and use wght only.
- Geist: wght 400 body, 500 UI, 600 emphasis. Geist Mono: wght 400-500.
- Enable `font-feature-settings` for tabular numerals on counts, numbers and statuses; `font-optical-sizing: auto`.

## Fluid scale (px at 360 / 768 / 1440; use clamp between)
| Token | 360 | 768 | 1440 | Line height | Tracking | Wght |
|---|---|---|---|---|---|---|
| display-xl (hero H1) | 40 | 64 | 96 | 0.98 | -0.035em | 800 |
| display-l (H2 section) | 30 | 40 | 60 | 1.04 | -0.03em | 700 |
| display-m (H3 detail blocks) | 24 | 28 | 36 | 1.1 | -0.02em | 700 |
| title (card titles) | 19 | 20 | 22 | 1.2 | -0.01em | 600 |
| lead (hero sub, section sub) | 17 | 19 | 21 | 1.5 | 0 | 400 |
| body | 16 | 16 | 17 | 1.6 | 0 | 400 |
| small | 14 | 14 | 14 | 1.5 | 0 | 400 |
| label (eyebrow, badge) | 12 | 12 | 13 | 1.2 | 0.08em | 500 mono |
Nothing under 12 px anywhere (badges are 12 px). Body never below 16 px on phones.

## Rules
- Headings: `text-wrap: balance`; paragraphs: `text-wrap: pretty`; max measure 62 characters for body, 22 ch for H1 line breaks on mobile.
- Eyebrows: plain sentence-case words ("Our products", "How a project runs"), preceded by a 16 px lime line or a 6 px dot. Not all-caps terminal text. Mono is for badges, tags, counters and the brand line only.
- Section numerals: plain "01" in Bricolage at 14 px with tabular figures, lime; never with `//`, `/`, brackets or "PHASE" prefixes (use "Step 1").
- Numbers and statuses use tabular figures so counters do not jitter.
- Quotes: typographic quotes and en dashes; no double spaces; no orphan single word on the last line of headings.
- Links in running text underlined with offset 3 px, thickness 1 px, color primary; focus ring 2 px.
- Buttons: Geist 600, 15-16 px, tracking 0; icon 18 px, gap 8 px.
- Hero H1 composition: line one is display-xl with the stroke word; line two is `lead` size at 70% text color, not a second H1.

## Loading
- Preload the Bricolage latin file and the Geist Mono latin file; Geist body loads with `font-display: swap`.
- Use a metric-matched system fallback (size-adjust, ascent/descent override) for each family so swapping causes zero layout shift (CLS under 0.02 from fonts).
- The preloader waits for `document.fonts.ready` for the two preloaded families before revealing text, so the first paint is never a fallback font.

## Verification (agent must do)
Read computed `font-family`, `font-weight`, `font-variation-settings` for the H1, a card title, body text, a badge, and a button at 390 and 1440 and log them. Screenshot the type specimen route `/__type` (a hidden dev-only page listing every token) to confirm the scale visually; remove the route before finishing.
