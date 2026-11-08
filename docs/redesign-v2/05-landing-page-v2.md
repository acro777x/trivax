# 05 — Landing page v2 (replaces `docs/redesign/03-landing-page.md` where different)

## Section order
0 Preloader → 1 Header (liquid glass) → 2 Hero → 3 Marquee → 4 Products → 5 How you can work with us → 6 Services (11 lines + capability strip) → 7 Solutions → 8 Process and engagement → 9 About and trust → 10 FAQ → 11 Contact → 12 Footer.

## 2. Hero (fixes the clipped, left-heavy hero)
Layout: `100svh`, content **centered horizontally and vertically** (flex center) inside a max-width 880 px column, text-align center on all viewports.
Order, top to bottom: eyebrow pill (plain words: "Product-led technology company"), H1 line one "Products that" + stroke word "solve" + "problems." (one visual line on desktop, wraps to two lines on mobile), line two quieter "Technology that moves businesses forward.", supporting paragraph (text in `18-copy-deck.md`, 2-3 lines), buttons row (primary Glow "Explore Products", secondary Specular "Discuss a Project"), then at the very bottom center the brand line BUILD. SECURE. GROW. in mono with wide tracking and the "Incubated at AIC-GBU, Greater Noida" line.
Stroke Text fix: the component sets its own SVG width from a numeric `fontSize`; the previous build clipped the word. Measure the rendered word width (font loaded) and give the wrapper `overflow: visible` with an explicit width equal to the measured text width plus padding equal to the stroke width. Verify the full word is visible at 390, 768, 1280, 1920. If after 2 loops it still clips, render the accent word as plain text with a CSS stroke-to-fill reveal and log it.
Background: Gradient ASCII, but calmer: desktop uses colors from the ramp with a LOWER top intensity (clamp highest stop to primary-mid, not full neon), glyphOpacity about 0.45, the bright region concentrated as a soft horizon glow BEHIND the headline centered, a radial vignette scrim over everything so the centered text has a dark, quiet field. The nav sits on top with liquid glass, so some ASCII must be visible behind it (that is what makes glass read as glass).
Add a slow, subtle parallax of the ASCII layer on pointer move (desktop only, already supported by mouseInteraction). Mobile: lite config, centered text, buttons stacked full-width (max 320 px), 56 px tall.
Scroll cue: small animated chevron at bottom center on desktop only; do not overlap the brand line.
Done-check: screenshots show symmetrical composition; the eye lands on the H1; no empty right half.

## 3. Marquee
"Tools we build with" label centered above; loop below. Logos monochrome, 55% opacity, primary on hover. Use the real logos from react-icons/si that exist. Add the existing tech names as text next to icons only if the icon is missing.

## 5. How you can work with us
Four cards from 02 with numbers 01-04 (plain numerals, no `//`). On desktop a connected line runs through the cards (a thin line with a traveling dot, transform only). Each card has a small icon, title, two-line text. Cards use Specular Button style sheen on hover and the card-tilt behavior from 08.

## 9. About and trust
Left: the About paragraph (02) in large type; right: a stacked trio of "proof" tiles that are verifiable facts only: "Incubated at AIC-GBU", "Greater Noida, India", "7 products and projects in the portfolio" (count must match the data module). No client logos, no testimonials. A static glass card (the Reflective Card is skipped; it needs a video and is a WebGL ID card).

## 11. Contact
Keep the pre-written email behavior and Shine Border card. Two paths side by side: "Discuss a project" (the form) and "Ask about a product" (a select of the 7 products that prefills the subject). Soft Aurora behind on desktop only.

## 12. Footer
Large wordmark: the real logo lockup scaled big at the bottom, partially cropped and faded (a common premium footer move). Columns: Products (the 7 names linking to detail pages), Services, Company, Contact. Columns have plain headings, no `//`. Socials: LinkedIn and Instagram squircle buttons, email.
