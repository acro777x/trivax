# 07 — QA loop (mandatory, per section)

## Viewports
390x844 (phone), 768x1024 (tablet), 1280x800, 1440x900, 1920x1080.

## Loop
1. Build or change one section/component.
2. Run dev server; load the page. For the hero wait about 3 s so the ASCII intro completes (or use the documented QA query flag that skips the intro; add that flag in the hero doc).
3. Screenshot every viewport. Also capture hover/focus states on desktop and the open state of menus on mobile.
4. Inspect against the checklist in the section's doc plus these universals:
   - Text fully legible over backgrounds (contrast, scrim present)
   - No horizontal scroll at any viewport
   - No overlapping or clipped elements; consistent spacing on the 8px grid
   - Fonts are the three specified ones and actually loaded (check computed font)
   - Only the allowed accent color dominates; nothing purple or orange left over
   - Touch targets 44px+, focus rings visible
   - Console clean (no errors/warnings from our code)
   - Motion present on desktop, reduced on mobile, static under reduced-motion
5. Log in `docs/redesign/QA-LOG.md`: section, viewport, finding, fix, pass/fail.
6. Fix and repeat. Max 4 iterations per section, then log remaining issues in DECISIONS.md.

## Global passes (after all sections)
- Full-page scroll-through recording (WebM) desktop and 390 px.
- Lighthouse mobile run: Performance 90+, Accessibility 95+, SEO 95+, Best Practices 95+ (record real numbers, never estimate).
- Keyboard-only walkthrough; screen-reader landmark check.
- Build output sizes against `06` budgets.
- Verify reduced-motion and save-data emulation.

## Independent review
Before declaring done, review all screenshots once more as a skeptical art director: does it look like a premium studio site or a template? If template-like, list specific fixes and apply them (one extra round).
