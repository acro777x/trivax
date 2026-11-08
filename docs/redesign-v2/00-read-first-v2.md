# 00 — Read first (Round 2)

## Audit of the current build (from screenshots)
| Area | What is wrong | Fix doc |
|---|---|---|
| Hero (desktop) | Left-aligned block with empty right side; stroke word "engineered." is clipped at its container width; ASCII top is harsh neon lime and fights the nav | 05 |
| Hero (mobile) | Text sits low and tight; no logo lockup; header has no surface | 05, 06, 10 |
| Header | Grey translucent capsule with white gooey pill; not liquid glass; mobile has no glass at all | 06 |
| Logo | Only a tiny white circle-K from the simplified SVG; the real artwork is unused | 07 |
| Preloader | Not visible / not performing as a proper intro | 07 |
| Eyebrows and numbers | "01 // Capabilities", "// 04", "// Architecture Guarantee" everywhere | rule file, 09 |
| Services | 11 identical boxes, large dead space, no imagery, flip hint text only | 09, 08 |
| Solutions | Left column of the sticky layout is empty; one very long dense card | 09 |
| Content | Pre-product copy; no products, no projects, no company story | 02, 03 |
| TXT elements | Flex Carousel, Scroll Expand, Reflective Card, Expandable Search, Intro Loader, Accordion variants not used; others used timidly | 11 |
| Mobile | Spacing inconsistent; floating chat pill overlaps content; sections feel stacked boxes | 10 |

## Acceptance list (all must pass)
1. Hero: headline, sub-copy and both buttons are horizontally centered on every viewport, vertically centered in the visible area between the nav and the bottom; nothing clipped; right and left balanced.
2. Zero occurrences of `//` as UI ornament (search the visible rendered text only; URLs such as https:// in hrefs are fine).
3. Header is bright white translucent liquid glass on desktop and mobile, with a visible edge highlight; light refraction in Chromium on the full tier, frosted CSS elsewhere.
4. The real logo artwork is visible in header, preloader, footer and as favicon.
5. A preloader plays on first visit per session (about 1.6-2.2 s), animated, never blocks longer than the real load.
6. Products and Projects sections exist with real screenshots; each card opens an animated detail page; no GitHub links.
7. Services section has visual richness (icons, imagery, motion) and no dead space.
8. Every TXT element is either used as specified in `11-element-by-element.md` or explicitly marked skipped with a reason in DECISIONS-V2.md.
9. Mobile: no overlap, 44 px targets, smooth scroll, lite effects.
10. Passes the "does not look AI-generated" checklist in `10`.
