---
trigger: glob
globs: src/**/*
description: Kavirox design tokens, fonts, palette and content rules for any UI code.
---
# Kavirox design rules
- Palette comes ONLY from `docs/redesign/02-design-system.md`. No hard-coded orange or purple left over from the old UI or from TXT defaults (TXT defaults are purple or off-palette in: Glow button, Gooey Nav, Soft Aurora #e100ff, Staggered Menu, Shine Border demo, Star Border; recolor every one).
- Fonts: Bricolage Grotesque (display), Geist (body), Geist Mono (labels, ASCII). Self-hosted via Fontsource variable packages. No Google Fonts link, no Inter, no Instrument Serif.
- Colors are CSS variables defined once in the Tailwind v4 theme block; components reference tokens, never raw hex. Props that need literal color strings (ASCII ramp, aurora colors, menu colors) read them from one `tokens.ts` mirror of the token table; no other hex literals.
- Copy is taken from existing repo data modules. If copy must be new (section headings), keep it plain, concrete, benefit-led; no hype words, no invented numbers.
- Every interactive element: visible focus ring, 44px minimum touch target on mobile, accessible name.
- Every ported TXT component keeps its original file header comment naming its source.
- Ported JS components get a sibling type declaration file so strict TypeScript builds without enabling allowJs.
