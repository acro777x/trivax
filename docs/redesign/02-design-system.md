# 02 — Design system

## Palette (dark-first, lime on near-black; matches the logo)
Define as CSS variables in the Tailwind v4 theme block, once.
| Token | Value | Use |
|---|---|---|
| bg | #050a06 | page background |
| surface | #0b120c | cards |
| surface-2 | #101a12 | raised cards, inputs |
| line | white at 10% opacity | borders |
| text | #eef5ea | primary text |
| text-muted | #9aaa96 | secondary text (must hold 4.5:1 on bg; verify) |
| primary | #a8e62e | accents, CTAs, active states |
| primary-ink | #08130a | text on primary |
| primary-mid | #2f9e1a | gradients, glows |
| primary-deep | #0a3a16 | ASCII ramp, deep glows |
Gradient ASCII ramp (low to high): #050a06, #0a3a16, #2f9e1a, #a8e62e (validated in a spike).
Use primary sparingly: one dominant accent per viewport. Large areas stay near-black.
**Open decision:** green vs the old orange. Default green (logo match). See `08`.

## Typography (self-hosted, Fontsource variable packages)
- Display: Bricolage Grotesque Variable, weights 600-800, tight tracking (about -0.03em), line-height 0.95-1.05 for H1.
- Body: Geist Variable, 400/500, line-height 1.6.
- Mono: Geist Mono Variable for eyebrow labels, numbers, tags, and as the ASCII glyph font.
- Fluid scale with clamp: H1 about 44px (mobile) to 112px (desktop); H2 32 to 64; body 16 to 18; label 11-12 uppercase mono, tracking 0.12em.
- Install `@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/geist`, `@fontsource-variable/geist-mono`; import each package's `wght.css`. Preload exactly two files via `?url` imports: the Bricolage Grotesque latin file and the Geist Mono latin file (Geist body loads normally with font-display swap and a metric-matched fallback). Remove the Google Fonts link from index.html.
- Fallback stack for each font to system sans/mono with matching metrics to avoid layout shift.

## Spacing, shape, depth
- 8px base grid. Section vertical padding: 96px desktop, 64px mobile. Container max width 1200px, side gutters 20px mobile / 40px desktop.
- Radii: 12px controls, 20px cards, pill for buttons and nav.
- Depth by 1px low-contrast borders and soft inner highlights, not heavy drop shadows. Glow only on primary actions.

## Motion language
- Easing: one signature ease-out (cubic-bezier 0.22, 1, 0.36, 1) for entrances; 200-300 ms for UI, 600-900 ms for reveals.
- Reveals: fade + 16-24px translate, staggered 60-80 ms, once per element.
- Hover (fine pointer only): lift 2-4px, border brightens. Touch: press scale 0.97.
- Lenis smooth scroll on fine pointers only. Native momentum scroll on touch.

## Iconography
lucide-react is already in the repo; keep it for UI icons. Tech-stack logos use react-icons/si (see marquee doc). Verify each icon name exists before using; swap to a lucide icon if it does not.

## Accessibility
Contrast 4.5:1 body, 3:1 large text. Focus ring 2px primary with 2px offset. Skip link. Landmarks. One H1. Reduced motion: no autoplay motion, static hero background frame.
