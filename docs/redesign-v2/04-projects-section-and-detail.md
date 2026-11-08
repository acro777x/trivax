# 04 — Products & Projects section and detail pages

## Where
New section directly after the hero and marquee, id `products`, nav label "Products". Heading: "Our products". Sub-line: "Digital products we design, build and run. Each one starts from a real problem." Status honesty applies (see 03).

## Section layout
- Default for every tier: the DOM card rail below. Flex Carousel (TXT 904-3812, ogl) is NOT the default because only two products have real screenshots; see `19-element-selection-matrix.md` for the gated experiment (screens gallery of Rakshak Setu and GBU One). Its items are objects with src, alt and title (the TXT's DEFAULT_ITEMS shows the shape, with Unsplash placeholders): replace them with the product screenshot files (webp, portrait) and their captions. Check how it crops portrait images; if cropping hurts, use the composed stage images described below or fall back to the DOM rail.
- DOM card rail (default for lite and for products without screenshots): horizontally scrollable snap rail of tall cards, 3 visible on desktop, 1.15 on mobile.
- Featured trio (Rakshak Setu, GBU One, Study Hub AI) are larger cards; the other four are compact cards beneath in a 4-up grid (2-up on mobile).

## Card anatomy (tall, 4:5)
1. Top: status badge, category label.
2. Middle: a **phone mock** (CSS device frame, dark bezel, rounded 36px) showing the project's first screenshot, cropped to the top 60%; second screenshot peeks behind it rotated about 6 degrees. Screenshots are light-theme app UIs: the dark frame and a soft lime glow behind make them pop on the dark page.
3. Bottom: name (Bricolage Grotesque), one-line description (two lines max), a thin "View product" row with an arrow.
4. Card chrome: surface token, 1px line border, Star Border on the featured trio (TXT 14595-15346), Shine Border on hover for the compact ones.
5. Hover (fine pointer): card lifts 6 px, phone tilts toward the cursor (a few degrees, transform only), screenshot swaps to the second screen using Pixel Swap (TXT 4278-4805, hover trigger) on featured cards; cursor shows the label "View" via Target Cursor `data-cursor-label`.
6. Touch: press scale 0.98; the rail has momentum scroll; no tilt.
7. Reveal: cards rise 24 px and fade, staggered 80 ms, once.

## No-screenshot products (Study Hub AI, FitFuel, GBU-SDSM, LAPS One, Try-Out if capture fails)
Build a **stylized UI illustration** in CSS, clearly an illustration (not a fake screenshot): abstract blocks, a chat-bubble pattern for Study Hub, a ring and bars for FitFuel, a table grid for SDSM, a calendar grid for LAPS One. Use token colors. Add a small label "Preview coming" under the frame. When the owner later drops real screenshots in `assets/projects/<slug>/`, the card must pick them up automatically by file name convention (see "Asset convention").

## Asset convention
Files at `assets/projects/<slug>/NN_name.webp`. Copy to `public/projects/<slug>/` at build. A single data module lists, per project: slug, name, status, one-line, category, screens (ordered file names with captions), feature groups, tech, and notes. Cards and detail pages read only from it.

## Detail page: "scene opening" animation
Clicking a card opens a full detail page at `/products/<slug>` (client-side route, shareable URL, browser back works, reduced-motion safe). Recommended library for routing: react-router (one new dependency, allowed; verify the version installs and the build stays within the JS budget; if the budget fails, use a tiny History API router instead). Use GSAP Flip (included with gsap) for the shared-element transition; View Transitions API only as progressive enhancement.

Open sequence (about 900 ms desktop, 600 ms mobile):
1. The clicked card's phone mock is captured, the rest of the page fades and slightly scales back (0.98) and dims.
2. A dark panel expands from the card's rectangle to the full viewport (Flip), like a curtain opening onto a stage; the phone mock travels with it to its hero position on the detail page.
3. The stage lights up: a soft lime radial glow behind the phone, title lines reveal masked from below, status badge and one-liner fade in, facts slide in on stagger.
4. Close (back arrow or Escape or browser back): reverse sequence into the original card position; scroll position of the main page is restored.
Fallbacks: lite tier uses a simple fade/translate; reduced motion uses an instant swap with a 150 ms fade.

## Detail page structure (top to bottom; no GitHub links anywhere)
1. **Stage hero**: status badge, name, one-line, a row of 3 fact chips (category, platform, stack top 3), the phone mock large with floating second and third screens; sticky slim top bar with back arrow, logo mark and the "Discuss a project like this" button.
2. **The problem** (two to three sentences, large type, left-aligned in a 7-column measure).
3. **What it does**: feature groups as a 2x2 or 3-column grid of cards with icons (lucide), each with a short title and 1-2 lines.
4. **Screens**: a gallery. Use **Scroll Expand** (TXT 4806-5247; props seen: src, alt, title, scrollHint, useWindowScroll, startWidth, startHeight, startRadius, endRadius, mediaZoom, overlayScrim; it takes ONE image or video as `src`) for the lead visual. The screenshots are tall portrait phone images and would crop badly if expanded full-bleed on a landscape desktop, so generate ONE composed 16:9 stage image per featured product at build or authoring time (dark background, soft lime glow, the first screenshot large and centered in a phone frame, the second and third angled beside it) and pass that as `src`; start portrait-ish (startWidth about 30, startHeight about 58) and expand to full width with useWindowScroll. Study Hub, FitFuel, GBU-SDSM, LAPS One and Try-Out (no real screenshots) do not use Scroll Expand: they use the stage layout with the illustrated mock. If composing is not feasible or the expand looks cropped or janky on QA, skip Scroll Expand and use the pinned screen scroller instead; log it. On mobile show the composed stage image as a simple full-width reveal; then a horizontal pinned scroller (desktop) or snap rail (mobile) through the remaining screens with captions. If a product has fewer than 3 screens, skip the scroller.
5. **How it works** (3-step diagram: input, engine, output) when the data supports it; else skip.
6. **Built with**: stack chips (Logo Loop not required here).
7. **Honest status box**: "Where this stands" with the lifecycle state, what works today, what is not included yet. This is a feature, not a disclaimer: it builds trust.
8. **Next product** carousel (two other products) and the closing CTA: "Need something like this? Discuss a project" (pre-written email including the product name) and "Explore all products".
9. Attribution line where required by 03 (Rakshak Setu).

## Routing and hosting
Direct loads of `/products/<slug>` and a 404 route must work: add the single-page-app rewrite for the host that is used (a `vercel.json` rewrite, a Netlify `_redirects` rule, or equivalent) and make the dev and preview servers fall back to index.html. Add per-product URLs to the sitemap. Unknown slugs render the 404 microcopy from `18`.

## Behavior details
- The route page is lazy-loaded; prefetch on card hover/focus (desktop) or intersection (mobile).
- Meta: set the document title and description per product; keep the home page JSON-LD; add per-product Open Graph text (no image required).
- Focus management: move focus to the detail heading on open; return focus to the card on close.
- Scroll restoration on back.
- Performance: detail pages use only CSS and GSAP; Scroll Expand and any WebGL mount only when in view; screenshots are `webp`, explicit width/height, `loading=lazy` below the hero.

## Done-check
Open each of the 7 products on desktop and phone width; transition smooth with no layout jump; back restores position; no horizontal scroll; no GitHub link; statuses correct.
