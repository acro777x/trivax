# 01 — Brand and content (source of truth)

## Identity
- Name: Kavirox (Kavirox.space). Tagline direction: "Commerce, engineered." Incubated at AIC-GBU (Atal Incubation Centre, Gautam Buddha University), Greater Noida.
- Contact: info@kavirox.space. CTAs open the existing pre-written email via the helpers in `src/shared/lib/email-inquiry.ts` (webmail URL and mailto). Keep that behavior.
- Socials (real): LinkedIn company page `linkedin.com/company/kavirox`; Instagram `instagram.com/kavirox.space`. X and Threads links currently point at generic homepages: hide those two icons (no verified profile URLs). Use the clean LinkedIn and Instagram URLs above without tracking parameters (the repo's versions carry ?stkn= and /posts/?feedView=all).

## Logo
- The raster logo `public/Kavirox_logo.png` is lime/green on black, 1.26 MB, and its wordmark is near-black (invisible on dark). `public/kavirox-kmark.svg` is a simple white K mark.
- Use the SVG mark in the nav and render "KAVIROX" as live text in Bricolage Grotesque beside it. Tint the mark with the primary token. Compress or stop shipping the PNG (keep it only as the social/OG image if already referenced; a smaller optimized copy is preferred).
- Palette follows the logo (lime/green on near-black). See `02`.

## Content map (all existing in the repo; do not retype, import)
- Services: 11 items from `serviceLines` in `src/domains/services/components/kavirox-services.tsx`. Fields: id, number, category (commerce, automation, data-ai, engineering), title, tagline, icon, deliverables, tools.
- Solutions: 4 items from `solutions` in `src/domains/solutions/components/kavirox-solutions.tsx` — Custom D2C Storefronts; WhatsApp Order Updates & Recovery; RAG Brand Chatbots & Product Finders; Accurate Sales & Ad Tracking. Fields: id, tag, title, subtitle, description, architecturePoints, metrics, stack, blueprint (input, engine, output).
- Process and engagement: `deliverySteps`, `engagementModels`, `techCategories` from `kavirox-capabilities.tsx`.
- Studio facts: `STUDIO_IDENTITY` (has a `tagline`) and `SERVICES_KNOWLEDGE`, `SOLUTIONS_KNOWLEDGE`, `CAPABILITIES_KNOWLEDGE` in `chatbot/knowledge/studio-knowledge.ts`. There is no ready FAQ list.

## Honesty rules
- The `metrics` values on solutions (for example "95+", "-28%", "+34%", "42%") are existing site copy but are **unverified claims**. Show them only labeled as "typical targets" or move them behind the owner's confirmation. Default: render them with the caption "Targets we design for", never as achieved client results. Log this in DECISIONS.md.
- Do not ship the orphan work-showcase content (named fintech/edtech clients with invented outcomes). Delete the orphan file.
- No fake logos, no fake testimonials, no counters.

## Copy style
Plain, concrete, short sentences. Lead with the outcome for the founder. No filler adjectives.
