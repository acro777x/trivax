# 00 — READ FIRST

## Who and what
Kavirox is a studio that builds fast custom storefronts, WhatsApp automation, AI chatbots and tracking for Indian D2C brands. The audience: D2C founders and marketing heads. They judge craft in seconds; the site is the proof of craft.

## Goals (priority order)
1. Landing page that feels expensive, fast and unmistakably Kavirox.
2. Responsive by device type: one codebase, two effect budgets (see `06`).
3. Real content only (see `01`).
4. Accessible and SEO-safe (keep JSON-LD, meta, robots, sitemap).

## Interpretations to honor (confirmed assumptions from the owner's brief)
- "ACI11" background = the **Gradient ASCII** component (first in the TXT).
- "Caveats / Kavibeats" = **Kavirox**.
- Owner-marked highly recommended: Glass Surface, Gooey Nav (paired with Glass Surface), Target Cursor, Glow button. Use all four.
- The owner allows 1-2 elements of your own: **Lenis smooth scroll** and a **GSAP ScrollTrigger sticky storytelling** section. Nothing else.
- The paper-plane button note says "try, remove if not better": default to the Stateful Button; adopt paper plane only if you build both and QA proves it better, and log it.

## Workflow
Branch `redesign/v2` -> foundations (`02`, `06`) -> hero (`03` section 1) -> verify -> remaining sections one by one -> global polish -> final QA. Use the QA loop after every section.

## Scope boundaries
Front end only. Do not touch chatbot logic, the OpenRouter call, or email-inquiry behavior, except restyling. Do not push. Do not add routes: the site stays a single-page landing.
