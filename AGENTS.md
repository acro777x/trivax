# AGENTS.md — Kavirox.space, Round 2 (v2 corrections)

This pack is applied ON TOP of the first redesign (already built on branch `redesign/v2`). Unzip it into the workspace root and overwrite. Where `docs/redesign-v2/` conflicts with `docs/redesign/`, **v2 wins**.

## What Round 2 is
The first build is structurally good but looks generic and unfinished. Round 2 turns it from "AI-made template" into a crafted, product-led company site. The owner's complaints, verified in screenshots:
1. Hero text is not centered or composed; the stroke-text word is clipped ("engin…"); the right half is empty.
2. Strange `//` marks appear in every eyebrow, card number and footer column. Remove all of them.
3. The header is not liquid glass: it is a dull grey translucent capsule. It must be a bright, white, translucent liquid-glass bar on desktop AND mobile.
4. The real Kavirox logo is barely used. The loading screen is missing or invisible.
5. Services cards are plain boxes with big empty gaps; the Solutions left column is blank; most TXT card/animation elements are unused.
6. Mobile is not polished (header has no surface, text collides, spacing uneven).
7. Content is outdated: Kavirox is now a **product-led technology company with services**. Products and projects are missing.
8. A new Projects section (cards with real UI screenshots, animated) and a full detail page per product, opening with a scene-style animation.

## Hard rules (unchanged from Round 1, plus)
- Instructions in `docs/redesign-v2/` only. Log deviations in `docs/redesign-v2/DECISIONS-V2.md`.
- Branch `redesign/v2` continues; never push.
- Do not show GitHub links anywhere on the site.
- Do not invent product features, metrics, prices, clients or testimonials. Copy comes from `02-company-and-tagline.md` and `03-products-catalogue.md` verbatim or lightly shortened.
- Lifecycle status of every product must be shown honestly (badge).
- Never use `//`, `>`, `$`, or terminal-style decoration as ornament text.

## Read order
`00-read-first-v2.md` → `02-company-and-tagline.md` → `18-copy-deck.md` → `03-products-catalogue.md` → `14-typography-spec.md` → `16-device-adaptation.md` → `15-motion-choreography.md` → `19-element-selection-matrix.md` → `17-section-repair-guide.md` (the main work order) → `04`, `05`, `06`, `07`, `08`, `09`, `10`, `11` as each section needs them → `12-qa-v2.md` → `13-open-questions.md`.

Priority when files disagree: 17 and 16 > 15 > 14 > 18 > the rest of v2 > docs/redesign (Round 1).

## Definition of done
All items in `00-read-first-v2.md` section "Acceptance list" pass with screenshots at 390, 768, 1280, 1440, 1920 widths, logged in `docs/redesign-v2/QA-LOG-V2.md`; `npm run build` clean.
