---
name: kavirox-ui-qa
description: Screenshot-and-verify loop for the Kavirox redesign. Use after building or changing any section, component or background.
---
# Kavirox UI QA loop
Follow `docs/redesign/07-qa-loop.md` exactly. Summary:
1. Start the dev server (or preview of a production build for perf checks).
2. With the browser subagent (real GPU Chrome), capture screenshots at: 390x844, 768x1024, 1280x800, 1440x900, 1920x1080. Wait until the ASCII intro has finished (about 3 s) or load with the QA flag that disables the intro.
3. Review each screenshot against the section's checklist in its component doc. Score: layout, typography, contrast, spacing, motion, brand fit.
4. Record findings in `docs/redesign/QA-LOG.md` (date, viewport, issue, fix, result).
5. Fix, rebuild, re-shoot. Max 4 iterations per section; if still failing, log it in `DECISIONS.md` and move on.
6. Measure frame time on a scroll pass for desktop and a 390-wide emulated mobile; log the median.
Never mark a section done without a screenshot at every viewport.
