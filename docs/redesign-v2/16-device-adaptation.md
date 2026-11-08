# 16 — Device adaptation (what shows, what moves, what changes per device)

Supersedes the nav switching rule in 06 and the tier details in docs/redesign/06 where they differ.

## Two separate decisions
1. **Layout** is chosen by viewport width (CSS breakpoints only; no JS layout switching, no second component tree).
2. **Effects budget** (`full` or `lite`) is chosen by capability: fine pointer plus hover plus enough memory/cores plus no save-data plus no reduced-motion.

## Breakpoints (CSS)
| Name | Width | Typical device | Layout |
|---|---|---|---|
| xs | 320-389 | small phones | 1 column, gutters 16 |
| sm | 390-599 | modern phones | 1 column, gutters 20 |
| md | 600-899 | large phones landscape, small tablets | 2 columns where useful, gutters 24, mobile header bar |
| lg | 900-1279 | tablets landscape, small laptops | desktop layout, pill nav (CSS glass), gutters 32 |
| xl | 1280-1679 | laptops, desktops | full layout, gutters 40, container 1200 |
| 2xl | 1680+ | large and ultrawide | container capped at 1360; type scale x1.08; never stretch content wider |
Also handle landscape phones (height under 500): hero uses min-height 100svh but without vertical centering tricks that overflow; the nav bar stays compact.

## Effects by capability
| Effect | full (fine pointer, capable) | lite (touch, small, weak, reduced motion) |
|---|---|---|
| Hero ASCII | cell about 18, dpr up to 2, pointer interaction | cell about 26, dpr 1, no pointer, lower grain/flicker; static frame if reduced motion |
| Header glass | SVG refraction (Chromium only), CSS frosted elsewhere | CSS frosted only |
| Smooth scroll | Lenis | native |
| Cursor | Target Cursor | none |
| Card tilt, magnet, sheen | on | off (press scale only) |
| Reveals | wave stagger, ScrollTrigger | IntersectionObserver + CSS, shorter |
| Sticky storytelling | pinned split | stacked cards |
| Flex Carousel (WebGL) | allowed (04) | DOM rail |
| Soft Aurora | on, lazy | static CSS gradient |
| Parallax | on, capped | off |
| Marquees | JS loop | CSS transform loop |
Switching must be live: if the user plugs in a mouse or toggles reduced motion, the tier updates without reload.

## Header rule (supersedes 06 switching)
Width 900 and up: floating pill nav with Gooey Nav (refraction on `full` + Chromium, CSS frosted otherwise). Below 900: the mobile glass bar plus Staggered Menu. A tablet in landscape therefore gets the pill nav with CSS glass; a touch laptop gets the same.

## Per-device section behavior
| Section | Phone (xs/sm) | Large phone / small tablet (md) | Laptop and up (lg+) |
|---|---|---|---|
| Hero | centered, H1 two to three lines, stacked full-width buttons (max 320), brand line bottom | centered, buttons side by side | centered, one-line H1 at xl, buttons side by side |
| Products | featured trio as snap rail 1.15 cards; compact four as 2-up grid | rail 2.1 cards; compact 4-up | featured 3-up large; compact 4-up |
| Product detail | single column; phone mock 70% width; screens as swipe rail | two columns for facts | stage layout with pinned screens scroller and Scroll Expand |
| Ways to work | stacked cards, no connector line | 2 x 2 | 4 across with connector |
| Services | snap rail 1.15 cards, chips scroll horizontally, search icon only | 2-column grid | 3-column grid with featured first card spanning 2 |
| Solutions | stacked cards, compact blueprint row | stacked | sticky split |
| Process | vertical stepper | vertical stepper | sticky left + steps right |
| FAQ | full width, 48 px rows | same | two columns (heading left, accordion right) |
| Contact | single column, buttons full width | single column centered 560 | dual path side by side |
| Footer | accordion-free stacked columns, 2-up link groups | 2-up | 4 columns + big wordmark |

## Touch and mobile browser details
- Targets 44 px minimum; spacing between adjacent targets 8 px.
- Use `svh`/`dvh`; no `100vh` heights that jump with the URL bar.
- Safe-area insets on the header bar, the chat launcher and the footer.
- `overscroll-behavior` contained on the menu and on sheets; body scroll locked while a menu or detail transition runs.
- Avoid `position: sticky` inside overflow containers; avoid `backdrop-filter` inside scrolling rails.
- Images: provide 360, 720 and 1080 widths with `srcset`/`sizes`; phones never download the 1080 version.
- `touch-action: pan-y` on horizontal rails so vertical scroll never gets trapped; rails use `scroll-snap-stop: normal`.
- Keyboard-open handling: the fixed chat launcher hides when an input is focused on mobile.

## Test matrix (must screenshot all)
360x780, 390x844, 430x932, 600x960, 768x1024 portrait, 1024x768 landscape, 1280x800, 1440x900, 1920x1080, 2560x1080 (ultrawide). Also one landscape phone 844x390.
