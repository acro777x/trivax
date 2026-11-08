# 08 — Cards and animation system (one language for every card)

The first build used the card elements timidly. Every card on the page now belongs to one of five card types, each with a defined set of TXT elements and motion. Consistency is what removes the "template" feel.

## Motion vocabulary (all transform/opacity only)
- Reveal: rise 24 px + fade, 700 ms, ease-out (0.22, 1, 0.36, 1), staggered 70 ms, once per card.
- Tilt (fine pointer, full tier): up to 5 degrees toward the pointer with a moving specular highlight (a radial gradient following the pointer via CSS variables), eased with lerp; reset on leave.
- Magnetic pull (Magnet, TXT 15347-15620): CTAs and the card's arrow only.
- Sheen sweep: one diagonal white gradient pass on hover, 600 ms.
- Border light: Star Border (TXT 14595-15346) for featured items; Shine Border (own build per Round 1) for form and hover emphasis.
- Pixel Swap (TXT 4278-4805): content swaps (screenshot A to B, before to after).
- Press (touch): scale 0.98, 120 ms.
Respect device tier: tilt, magnet, sheen are off on lite; reveals shorten.

## Card types
1. **Product card** (tall, phone mock) — spec in 04.
2. **Service card** (11) — see 09. Glass-dark surface, large icon tile, number in plain numerals, title, tagline; on hover/tap it flips (CSS 3D) to deliverables and tools. Add a faint lime gradient corner glow that follows the pointer (tilt highlight). Equal heights; no dead space (title area fixed to 2 lines, tagline 3 lines, deliverable count chip "5 deliverables" at the bottom).
3. **Process card** (steps) — numbered nodes on a vertical line with a traveling dot linked to scroll progress; the active step brightens, others dim to 50%.
4. **Value tile** (bento) — mixed sizes (2x1, 1x1, 1x2), each with a mini live illustration (CSS only): speed gauge, payment chips (UPI, COD), a chat bubble, a tracking graph. Hover lifts and brightens the illustration.
5. **Engagement card** — three models; the `highlighted` one has Star Border; others plain with Shine Border on hover.

## Card surface style
Surface token at 70% with 1 px line border, 20 px radius, an inner top highlight (white 6%), optional faint noise at 3% opacity (a tiny repeated PNG or CSS gradient noise; no big images). Avoid pure black boxes with only a border: that is the main reason the cards look templated.

## Carousels and rails
Use CSS scroll-snap rails with edge fade masks and drag-to-scroll on desktop (pointer events), arrow buttons (44 px) and a progress bar underneath; keyboard accessible. Flex Carousel (WebGL) only where 04 says so.

## Cursor
Target Cursor (TXT 13103-13573) on desktop; mark all cards, buttons and nav links with the cursor-target class; label text: "View", "Open", "Drag" via `data-cursor-label`. `hideDefaultCursor` false.
