# 03 — Landing page spec (single page, section order is fixed)

Each section: purpose, layout, elements (see `components/`), content source, desktop vs mobile, done-check.

## 0. Preloader (optional, short)
Only if it costs under 1.2 s and never blocks content. Uiverse Loader or Intro Loader (see `components/loaders-misc.md`). Skip entirely on repeat visits (session flag) and on reduced motion.

## 1. Header / navigation
Desktop (viewport 768 px or wider with a fine pointer, regardless of tier): floating pill centered at top, Glass Surface wrapping Gooey Nav (links: Services, Solutions, Process, FAQ, Contact), logo mark + live "KAVIROX" at left, primary CTA "Email us" at right. Otherwise: the Staggered Menu's own header (logo mark and toggle) and a full-screen menu with the same links and the email CTA. Docs: `components/navigation.md`.

## 2. Hero (the signature moment)
- Full `100svh`. Background: Gradient ASCII, horizon shape, lime ramp. Dark scrim rising from the bottom so the text sits on dark.
- Content bottom-aligned left on desktop, bottom-aligned on mobile: eyebrow label (mono, "Technology & e-commerce studio for D2C brands"), H1 "Commerce, engineered." with the word "engineered." rendered with Stroke Text, one-sentence sub-copy taken from the `tagline` field of STUDIO_IDENTITY (studio-knowledge.ts), shortened if needed, two CTAs: primary Glow button "Start a project" (opens the pre-written email), secondary Specular Button "See our services" (anchor scroll). Small mono line: "Incubated at AIC-GBU, Greater Noida".
- Desktop adds Magnet on the primary CTA and Target Cursor site-wide. Mobile: static, lighter ASCII.
- Done-check: H1 fully legible; ASCII visible in the top 60% and clearly more than a flat gradient; no layout jump when fonts load; LCP element is the H1 text.
Docs: `components/hero-background.md`, `components/buttons-cta.md`, `components/text-motion.md`.

## 3. Tech marquee
Slim band under the hero: "Tools we build with" + Logo Loop of real stack logos (derived only from `techCategories` and the `tools` arrays of `serviceLines`; see components/sections.md). Grayscale at rest, primary on hover (desktop). Lite tier: CSS-only transform loop. Doc: `components/sections.md`.

## 4. Services (11 lines)
Heading + category filter chips (All, Commerce, Automation, Data & AI, Engineering). Grid of flip cards: front = number, icon, title, tagline; back = deliverables (first 3-4) and tools. Desktop: 3-column grid, hover/focus flips. Mobile: horizontal scroll-snap carousel (keep the existing snap pattern), tap to flip. Optional Expandable Search to filter by text. Doc: `components/sections.md`.

## 5. Solutions (4)
Sticky storytelling (the owner-allowed GSAP ScrollTrigger element): left column pins the section title and a step indicator; right column scrolls four solution panels (tag, title, subtitle, description, architecturePoints, blueprint input->engine->output as a three-node diagram). Metrics shown only as "targets" (see `01`). Mobile: no pinning; stacked panels with simple reveals. Inside the first solution (storefronts), a Pixel Swap before/after: "Slow template store" vs "Kavirox custom store" built from live-rendered mock cards (no stock photos). Docs: `components/sections.md`.

## 6. Process and capabilities
`deliverySteps` as a numbered vertical timeline; `engagementModels` (from kavirox-capabilities.tsx; use that file's names) as cards with Star Border only on the one with `highlighted: true`; `techCategories` as compact chip groups. Value grid (bento) summarizing why Kavirox: speed, India-first payments (UPI/COD), WhatsApp-native, measurable tracking; take statements from existing copy only. Doc: `components/sections.md`.

## 7. Trust
One restrained block: "Incubated at AIC-GBU" as a static CSS identity card (the Reflective Card is NOT used; see components/sections.md). No client logos or testimonials.

## 8. FAQ
4-8 questions written ONLY from facts in `SERVICES_KNOWLEDGE`, `SOLUTIONS_KNOWLEDGE`, `CAPABILITIES_KNOWLEDGE` and `STUDIO_IDENTITY` (there is no FAQ data in the repo; do not invent pricing or timelines; if a fact is absent, omit the question). Custom accessible accordion (single open, keyboard operable, aria-expanded/aria-controls). Do not install the HeroUI accordion unless the budget in `06` is still met afterward. Doc: `components/sections.md`.

## 9. Final CTA and contact
Soft Aurora background (full tier only, lazy, pauses offscreen; lite gets a static gradient). A custom Shine Border card holds the contact block: name, email/brand, message fields and a Stateful Button. Phase 1 behavior: submitting opens the existing pre-written email (compose) with fields prefilled; button states: idle -> "Opening your email..." -> done. Never claim "message sent". Doc: `components/forms-contact.md`.

## 10. Footer
Logo, short description, link columns (Services, Solutions, Process, Contact), social buttons (Uiverse social style, real URLs), copyright, "Incubated at AIC-GBU". Doc: `components/forms-contact.md`.

## 11. Global layers
Target Cursor (desktop), Lenis (desktop), chatbot launcher restyled to tokens and its "Thinking" state replaced with Lattice Loader. Keep chatbot logic unchanged.
