# 07 — Logo and preloader

## What the real logo is (verified by viewing `public/Kavirox_logo.png`)
It is NOT flat lime-on-black. It is an embossed, softly glowing 3D render on near-black: a thick ring that is open on the left and right, with a bold "K" inside it whose upper stem has a notched flag; a cluster of small embossed pixel squares breaking off at the top-left; two dark code brackets (a left angle bracket and a right angle bracket) flanking the ring; the word KAVIROX in large embossed letters (dark, with the last letter "X" lit bright green), ".SPACE" below it in wide-tracked green letters between two green lines, and a dark descriptor line that reads "Technology • Growth • Solutions". The colors run from yellow-lime (about #9bd400) at the top-left to deep green (about #1b8f1b) at the bottom-right, with a soft glow.
Because the wordmark and brackets are near-black, removing the black background would delete them. The 1.26 MB size and the glow also make it unsuitable as an inline image.

## Required logo assets (build as clean vectors that match the artwork)
1. **Mark (SVG)**: redraw the ring, the K, the pixel squares and the two brackets as a clean SVG by tracing the PNG visually. Place the PNG as a 50% opacity reference layer while drawing and compare overlays at 3 sizes until geometry matches (ring thickness, K stem notch, bracket angle, pixel positions). Fill the ring and K with a linear gradient from #9bd400 (top-left) to #1b8f1b (bottom-right); pixel squares use the same gradient; brackets are light (white at 80%) on dark pages. Export `kavirox-mark.svg` and 64, 128, 256 and 512 px PNGs and a favicon set (16, 32, 180, 512).
2. **Lockup**: mark plus live-text "KAVIROX" in Bricolage Grotesque 800 with +0.04em tracking, and a second smaller line ".SPACE" in Geist Mono wide-tracked in lime; optional descriptor line "Technology • Products • Solutions" in Geist Mono 11-12 px at 60% (hidden below 640 px). The artwork's own descriptor says "Growth"; the company profile says "Products": use the profile text and log the mismatch for the owner.
3. Components: `Logo` (sizes sm 28, md 36, lg 64 px tall) and `LogoMark`. Use in header (md), preloader (lg), footer (large), chatbot (sm), detail-page top bar (sm), 404.
4. Open Graph image (1200x630): dark background, the mark large with a soft green glow, the wordmark and the tagline. Do not ship the 1.26 MB PNG on the site; move it to `brand-source/` and keep it for reference only.
5. Brand gradient token: add `--brand-gradient` (from #9bd400 to #1b8f1b) for the mark and rare accents only; the UI accent remains primary #a8e62e.
6. Minimum clear space around the mark equals the ring stroke width x 2. Never place the dark wordmark artwork on dark; always use the live-text wordmark.

## Preloader (must be visible and polished)
Current problem: the preloader is not seen as a proper intro. Rebuild:
- Plays once per session on the first load (sessionStorage with try/catch), skipped on reduced motion (instant fade) and on `?qa=1`.
- It ends when (a) the two preloaded fonts are ready, (b) the hero ASCII reports ready or 1.8 s have passed, and (c) at least 1.4 s have elapsed (so it is never a flash), capped at 3.2 s.
- Visual: full-screen near-black with a faint green radial glow. Center: the SVG mark draws itself (ring strokes draw, the K fills, the pixel squares scatter in from the top-left and settle, brackets slide in from the sides) with GSAP; then the live wordmark rises in by letter with 40 ms stagger; ".SPACE" fades in below; a thin lime progress line and a counter 0 to 100 (tabular figures, Geist Mono 12 px) reflect real progress (fonts, hero ready), not a fake timer. Optional: Uiverse Loader shimmer on the wordmark only if recolorable and tiny.
- Exit: the logo scales to 0.92 and fades while the panel splits into two halves that slide up and down (transform only, 700 ms inout), revealing the hero; the hero timeline A (15) starts on the same frame. No flash of unstyled content.
- Scroll is locked during the preloader; unlocked at exit.
- Test: throttle to Fast 3G and confirm the progress line keeps moving and the exit still runs; capture frames at 0.4 s, 1.0 s, 1.6 s and after exit; log them.
