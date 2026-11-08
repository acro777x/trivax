# 10 — Mobile responsiveness and the "not AI-generated" polish pass

## Mobile fixes (390 and 360 widths first)
- Side gutters 20 px; section padding 64 px top and bottom; consistent 8 px grid.
- Glass header per 06; content starts below it (add top padding equal to the bar plus 16 px so nothing collides).
- Hero: centered text, fluid H1 clamp (36 to 44 px), buttons full-width stacked, brand line and incubated line at the bottom with safe-area padding.
- Chat launcher: shrink to a 48 px round button (icon only) bottom-right, 16 px from edges, and hide it while the Staggered Menu is open and while the keyboard is open. It must not overlap section content: add bottom padding to the last section.
- All rails: snap, momentum scroll, edge fade, progress bar.
- Touch targets 44 px; text 16 px minimum for body; no text smaller than 12 px.
- Orientation change and 320 px width: no horizontal scroll, nothing clipped.
- Glass budget: the header bar plus at most two other glass surfaces visible at once (CSS frosted on lite, Glass Surface component on full, max 3 instances in total including the header).
- iOS Safari: use `svh`/`dvh`, avoid `position: fixed` jitter (use transform-only hide/show), test 100vh issues.

## "Does not look AI-generated" checklist (apply to every section)
1. Hierarchy: one clear focal element per viewport; large contrast in size between headings and body (at least 2.5x).
2. Asymmetry with intent: mix of full-width, 2-column and bento layouts; not every section as a row of equal boxes.
3. Real content density: concrete nouns from the profile; no filler like "cutting-edge solutions".
4. No terminal cosplay: remove `//`, `>`, `$`, fake status lines, blinking cursors, hex labels.
5. Limited palette discipline: lime appears as an accent on at most about 10% of any viewport; neutrals do the rest. No rainbow gradients, no purple.
6. Imagery with purpose: real screenshots in device frames, real logos, illustration only where marked as illustration.
7. Rhythm: alternate dark surface levels (bg, surface, surface-2) between sections, with thin dividers; occasional full-bleed band.
8. Micro-details: consistent 1 px borders, inner highlights, focus rings, hover states, cursor labels, section numbering as plain numerals, tabular figures for numbers.
9. Typography craft: Bricolage Grotesque headings with tight tracking and balanced wrapping (`text-wrap: balance`), Geist body with `text-wrap: pretty`, real quotation marks and en dashes, no orphan words in headings.
10. Copy voice: short, plain, outcome-first (see 02). Read every heading aloud; delete anything that sounds like a slogan generator.
11. Motion restraint: one idea per section, never more than two things moving at once in a viewport; nothing loops on mobile except the marquee.
12. Consistency audit: all radii, border colors, shadows and spacing come from tokens; search the code for stray hex values.
