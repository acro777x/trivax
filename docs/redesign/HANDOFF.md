# HANDOFF — Kavirox.space Front-End Redesign

**Branch:** `redesign/v2`  
**Stack:** Vite 6 + React 19 + TypeScript Strict + Tailwind CSS v4  
**Date:** 2026-11-07  

---

## 1. What Is Completed

### Architecture & Foundations
- **Single Responsive Tree:** Replaced the legacy dual-tree architecture (`desktop-view.tsx` + `kavirox-mobile-view.tsx`) with a unified responsive component tree in `src/App.tsx`.
- **Hardware-Aware Tiering:** Implemented `src/shared/hooks/use-device-tier.ts` (`full` vs `lite`) detecting fine pointer, hardware concurrency, device memory, viewport width, and reduced motion.
- **Motion & Smooth Scroll:** Integrated Lenis (`src/shared/hooks/use-lenis.ts`) on desktop fine-pointer synchronized with GSAP ticker; mobile touch defaults to 120/144 Hz native momentum scroll.
- **Typography & Fontsource:** Fully self-hosted fonts with latin WOFF2 preloading in `src/main.tsx` (`@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/geist`, `@fontsource-variable/geist-mono`). Removed Google Fonts CDN link.
- **Tokens & Styling:** Canonical design tokens in `src/shared/tokens.ts` and Tailwind v4 `@theme inline` variables in `src/index.css` (`#050a06` dark ground, `#a8e62e` lime primary, `#0a3a16` deep green, `#eef5ea` high-contrast text).

### Components Ported & Implemented
1. **Header & Navigation:** Desktop Glass Surface capsule with Gooey Nav active section tracker; mobile Staggered Menu drawer with keyboard Escape listener, body scroll lock, and link click auto-close.
2. **Hero:** Fullscreen 100svh section with WebGL Gradient ASCII Horizon (`shape="horizon"`, lime color ramp), Stroke Text ("engineered." with dynamic responsive tracking), Glow Button with Magnet ("Start a project"), and Specular Button ("See our services").
3. **Tech Stack Marquee:** Smooth continuous Logo Loop with verified brand icons (`react-icons/si`: Shopify, Next.js, React, TypeScript, Tailwind, Node.js, Meta) on desktop; pure CSS compositor-only `@keyframes marquee-scroll` on mobile.
4. **Core Services:** 11 real services rendered in 3D CSS flip cards on desktop; touch-first horizontal scroll-snap carousel with dot pagination on mobile. Active category filter pills and live search.
5. **Solutions & Blueprints:** 4 architecture showcases with GSAP-linked sticky sequence indicator, PixelSwap before/after comparison, 3-node technical blueprints, and honest metric labeling.
6. **Process & Capabilities:** Value grid bento ("Why Brands Build with Kavirox"), 6-phase disciplined delivery lifecycle timeline, and engagement models with Star Border highlight.
7. **Institutional Trust:** AIC-GBU incubation identity card honoring Gautam Buddha University, AIM, and NITI Aayog ecosystem credentials.
8. **FAQ:** Accessible keyboard-friendly accordion grounded exclusively in studio facts.
9. **Contact & Inquiries:** Soft Aurora background, Shine Border card, 3-state Stateful Button synchronized with form validation, and email inquiry workflow generating pre-filled briefs to `info@kavirox.space`.
10. **Footer:** Squircle social links (LinkedIn, Instagram, Email) with verified URLs and incubation address.
11. **Chatbot / AI Concierge:** Styled with token system and Lattice Loader thinking indicator while strictly preserving OpenRouter streaming mechanics.

---

## 2. Performance Budgets & Measured Results

| Metric | Budget Target | Measured Result | Status |
|---|---|---|---|
| **Initial JS Chunk (gzip)** | ≤ 250 kB | **149.36 kB** (`index-CW0TDXFg.js` raw 431.59 kB) | **PASS** |
| **Initial CSS (gzip)** | Minimal | **14.17 kB** (`index-CNngfZoN.css` raw 81.68 kB) | **PASS** |
| **Code Splitting** | Heavy / Below-fold lazy | Dynamic imports for all 7 below-the-fold sections + WebGL (`GradientASCII`: 7.88 kB gzip, `SoftAurora`: 5.01 kB gzip) | **PASS** |
| **Horizontal Scroll** | 0px on all viewports | `scrollWidth === clientWidth` on 390px, 768px, 1280px, 1440px, 1920px | **PASS** |
| **Console Cleanliness** | 0 errors | 0 errors across all 5 viewports in headless Chrome | **PASS** |
| **Build Integrity** | `tsc -b && vite build` clean | 0 TypeScript errors, 1907 modules transformed | **PASS** |

---

## 3. Fallbacks Used & Deviations Documented

1. **beUI Pro Token:** `@beui-pro` packages require a paid subscription token (`BEUI_PRO_TOKEN`) not provided in environment. Implemented custom 3D CSS flip cards and custom responsive Bento grid.
2. **Reflective Card Video:** TXT card component required an external video asset (`videoSrc`) not in repo. Implemented an institutional incubation trust card matching design system tokens.
3. **Email Inquiry Action:** Form submission opens pre-written inquiry email via `src/shared/lib/email-inquiry.ts` with honest button state ("Opening your email client..."), avoiding false claims of backend database submission.

---

## 4. Open Questions for the Owner (from 08-open-questions-risks.md)

1. **Palette Confirmation:** Redesign uses lime/green (`#a8e62e` on `#050a06`) matching official brand logo and SVG K-mark. If orange is preferred, tokens in `src/shared/tokens.ts` can be switched.
2. **Real Case Studies & Metrics:** Solution metrics are currently captioned strictly as "Targets we design for". When real client metrics and case studies are approved, they can replace the design benchmark figures.
3. **Form Backend:** Currently submits via mailto/webmail URI. If a backend service (e.g. Resend, Formspree) is desired, an API endpoint can be connected.
4. **Chatbot Proxy:** OpenRouter key is currently exposed in Vite client code (pre-existing repo architecture). We recommend moving this call behind a serverless proxy or edge route.

---

## 5. How to Run Locally

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run production build and typecheck
npm run build

# Preview production build locally
npm run preview
```
Visit `http://localhost:3000/?qa=1` to view the page without the initial ASCII intro animation.
