# Section components

## Logo Loop (tech marquee) — TXT 9216-10644
Deps: react-icons (si set). Usage example at lines 9233-9234 imports SiReact, SiNextdotjs, SiTypescript, SiTailwindcss. react-icons is NOT yet in package.json: install it. Names checked to exist in react-icons/si 5.7.0: SiShopify, SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiWhatsapp, SiRazorpay, SiGoogleanalytics, SiMeta, SiVite (and others); verify any other name by build, else use a text chip.
Use: the tech marquee under the hero. Derive the list ONLY from `techCategories` (kavirox-capabilities.tsx) and the `tools` arrays in `serviceLines`: expected candidates Shopify, Next.js, React, TypeScript, Tailwind, Vite, Node.js, WhatsApp, Meta, Razorpay, Google Analytics, n8n, Zapier; skip any without a logo icon. Do not add Stripe, Vercel, Python, PostgreSQL or Cloudflare unless they appear in those data. One row. Fade edges with masks. Pause on hover (desktop). Lite tier: use a CSS-only transform loop (no JS animation loop).

## Services flip cards — beUI Pro flip-card (TXT 16487-16536) with fallback
The TXT gives commands for `@beui-pro/flip-card` and `@beui-pro/flip-card-modal`. These need a paid beUI Pro token (BEUI_PRO_TOKEN). Check whether the token is provided in the environment. If not: build an own CSS 3D flip card (front/back faces, backface hidden, transform-only, focusable, flips on hover/focus on desktop and tap on touch, a visible "flip" affordance, keyboard Enter/Space). Log which path was taken. Content per `03` section 4.

## Expandable Search — TXT 16469-16486 (easyui)
Optional filter for the services grid. Uses an easyui shadcn command given in the TXT (unverified). If the command fails, build a simple search input that expands on focus. If time is short, skip and log.

## Value grid — TXT 16537-16551 (beUI Pro content-value-grid)
Paid registry. Fallback: own bento grid with 4-6 tiles (2-col mobile, 3-4 col desktop), each a short value statement from existing copy with a lucide icon. Tiles use surface token, line border, hover lift on fine pointers.

## Pixel Swap — TXT 4278-4805
Deps: React only. Use for the before/after in the first solution panel: "Typical template store" vs "Kavirox storefront", both composed from small live-rendered mock UI cards (no stock photos, no screenshots of others' work). Check the component's props near the usage block (lines 4285-4327) for how to pass the two children/images; if it only accepts images, render each mock to an image once at build time or use the supported element mode. The component accepts any React nodes as firstContent and secondContent, and trigger is hover or click only: use hover on full tier, click on lite tier.

## Accordion (FAQ) — TXT 16370-16457 (HeroUI v3 + @gravity-ui/icons)
Measured in a spike build (estimates for your build; re-measure): HeroUI per-component CSS+JS about +16 KB gzip CSS and +21 KB gzip JS; full HeroUI about +52 KB gzip CSS. Default: custom accessible accordion styled with tokens (no HeroUI). Use HeroUI only if budgets in `06` still pass; then import per-component CSS (utilities and variants imports are required for Tailwind v4) and do not import the full stylesheet.

## Flex Carousel — TXT 904-3812 (reserve)
WebGL (ogl), uses Unsplash placeholder images, would be a second full-screen WebGL surface. Do not use. If the owner later supplies real project imagery, revisit.

## Reflective Card — TXT 7027-8311 (skip)
It needs a video source (videoSrc; the usage points at a missing mp4) and would be another WebGL surface. Do not use it. Instead build a static CSS "Incubated at AIC-GBU" identity card (surface token, line border, mono labels, subtle gradient). Log the decision.

## Soft Aurora — TXT 6421-7026
Deps: React only (raw WebGL). Final CTA background on full tier. Props are color1 and color2 only (defaults #f7f7f7 and purple #e100ff at lines 6438-6439): set color1 to primary-mid and color2 to primary, and let the section's CSS supply the near-black base. Lazy mount when the section is within one viewport; unmount/pause offscreen. Lite tier: static CSS radial gradients.
