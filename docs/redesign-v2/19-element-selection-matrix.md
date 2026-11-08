# 19 — Element selection matrix (which TXT element where, how many per viewport)

Rule: **at most three "featured effects" visible in any one viewport** (for example hero: ASCII + stroke word + glow button; products: card chrome + tilt + pixel swap). Everything else stays quiet. Overusing elements is what made Round 1 look generated.

| Section | Primary element(s) | Supporting | Explicitly NOT here |
|---|---|---|---|
| Preloader | own logo draw (GSAP) | Uiverse Loader shimmer (optional) | Lattice, aurora |
| Header | Glass Surface + Gooey Nav (desktop), Staggered Menu (mobile) | Magnet on the right button | Pill Nav |
| Hero | Gradient ASCII, Stroke Text, Glow button | Specular button, Magnet, Target Cursor | Aurora, glass cards |
| Marquee | Logo Loop (full), CSS loop (lite) | none | any border/glow |
| Products | DOM card rail with phone mocks; Star Border on featured; Pixel Swap | Target Cursor labels, tilt; Flex Carousel only as a gated experiment (see 04 and the rule below) | Shine Border on the same cards |
| Product detail | Scroll Expand (stage image), pinned screens scroller | Lattice Loader for image loading, Star Border on the CTA card | WebGL aurora |
| Ways to work | custom cards, connector line | Specular sheen, Magnet arrow | Star Border |
| Services | flip cards, Expandable Search (own build ok), Flip filters | tilt highlight | Star Border, Pixel Swap |
| Solutions | sticky blueprint, Pixel Swap before/after in panel 1 | Logo-style stack chips | flip cards |
| Process | scroll-drawn line | none | tilt, flip |
| About | static glass card | none | Reflective Card (SKIP) |
| FAQ | custom accordion | none | effects |
| Contact | custom Shine Border card, Stateful button, Soft Aurora (full) | Glow button | Magnet |
| Footer | Uiverse squircle socials, big wordmark | none | effects |
| Chat | Lattice Loader | none | glass |

## Flex Carousel gate
Only two products have real screenshots, so the Flex Carousel cannot represent all seven. Default decision: **do not use Flex Carousel**; use the DOM rail. Try it only if everything else passes QA and time remains, as a hero-level feature inside the Rakshak Setu and GBU One detail pages screen gallery (two products with enough screens), with `captureWheel` set to false (so it never hijacks page scroll under Lenis), `fit` tuned for portrait images and `onSelect` unused. Log the outcome.

## Own-build elements (no source in the TXT)
Shine Border, Stateful Button, Expandable Search (if the registry source cannot be installed), Intro Loader (skip), paper-plane button (skip), flip card, value grid. Implement them cleanly with tokens; never leave a broken import.

## Skipped elements (log in DECISIONS-V2)
Pill Nav, Reflective Card, Intro Loader, paper-plane button, HeroUI accordion, beUI Pro paid components.

## Selection rules for any new decoration
Before adding any effect ask: does it explain, guide or delight without slowing? If it only fills space, remove it. Never combine glow + tilt + sheen + border-light on one card.
