# DECISIONS

Log every deviation, fallback and default here: date, decision, reason.

## 2026-11-07 — Phase A Foundations

1. **Palette:** Lime/green token system (#050a06 bg, #a8e62e primary, #0a3a16/#2f9e1a ramp) selected over orange to match the official Kavirox logo and mark (`public/kavirox-kmark.svg`).
2. **Metrics & Case Studies:** Solution metrics ("95+", "-28%", "+34%", "42%") captioned strictly as "Targets we design for", never as achieved client outcomes. No fake client logos, testimonials, or counters added.
3. **Services Flip Card & Value Grid:** Used custom CSS 3D flip card and custom Bento grid fallback since `@beui-pro` packages require a paid token (`BEUI_PRO_TOKEN`) not present in environment.
4. **Form Handling:** Form submit uses 3-state Stateful Button and opens pre-written inquiry email via `src/shared/lib/email-inquiry.ts`. Honest copy ("Opening your email client..."), never claims "message sent".
5. **AIC-GBU Trust Card:** Reflective Card from TXT requires missing video asset (`videoSrc`). Used static CSS identity card with surface tokens, 1px border, and subtle gradient.
6. **Chatbot Security Note:** Existing chatbot directly calls OpenRouter API with client-side Vite key. Maintained existing logic and security boundary without exposing new secrets, with recommendation to move behind backend proxy in production.
7. **Single Responsive Tree:** Replaced dual desktop/mobile trees with one responsive component tree governed by `useDeviceTier` (`full` vs `lite`).
8. **QA Query Flag:** Added `?qa=1` URL query parameter support to skip ASCII intro animation for instant and deterministic visual QA screenshotting.

## 2026-11-07 — Phase D & E Decommissioning, Bundle Budgets & QA

9. **Old WebGL Hero & Heavy Dependencies Decommissioning:** Decommissioned `tubes-curor.tsx`, `src/shaders`, `@designcodeio/threeui` aliases, and uninstalled `three` (v0.186.0), `threejs-components` (v0.0.30), `@aliimam/icons`, and `@aliimam/logos`. Initial JS bundle dropped from 2.4 MB gzip (8.3 MB raw) to **205.15 kB gzip** (596 kB raw), meeting the 250 kB gzip budget requirement.
10. **GlassSurface Navbar Crispness:** Set `width="auto"`, `height="auto"`, and `refraction={false}` on the header `GlassSurface` to prevent SVG displacement distortion on text and allow flexible horizontal capsule expansion with `GooeyNav`.
11. **StaggeredMenu Mobile Theme:** Corrected hardcoded `background: white` and black text in `StaggeredMenu.css` to dark token `#0b120c` background, `#eef5ea` item text, and `#a8e62e` accent numbering, with responsive `clamp()` font size to prevent viewport clipping on small phones.
12. **Below-the-Fold Lazy Loading & Code-Splitting:** Dynamic `React.lazy()` imports with `<Suspense>` boundary fallbacks applied to all below-the-fold domain sections (`TechMarquee`, `KaviroxServices`, `KaviroxSolutions`, `KaviroxCapabilities`, `TrustSection`, `FaqSection`, `ContactSection`, `KaviroxFooter`, and `KaviroxChatbot`). Reduced initial JS bundle from 205.15 kB gzip down to **149.36 kB gzip**, resolving the Vite 500 kB chunk threshold warning and improving First Input Delay / INP on mobile.
13. **Mobile Services Horizontal Scroll-Snap:** Per Section 4 spec (`docs/redesign/03-landing-page.md`), mobile viewport utilizes a touch-first horizontal scroll-snap carousel (`snap-x snap-mandatory flex overflow-x-auto`) with dot indicators and next control, rather than an unmanageable 4,500px vertical stack. Desktop retains the 3-column 3D flip card grid.
14. **Reveal IntersectionObserver Margins:** Replaced negative root margin (`0px 0px -40px 0px`) and strict 0.1 threshold with positive root margin (`120px 0px 60px 0px`) and 0.01 threshold, with bypass for `isQaMode()` and reduced-motion, preventing blank void blocks during programmatic screenshotting and fast scrolls.
15. **StaggeredMenu In-Drawer Link Auto-Close:** Added `onClick` handlers to mobile navigation anchor links to toggle `mobileMenuOpen` closed when a section anchor is tapped, preventing the drawer from blocking the viewport after navigation.
16. **Lite-Tier Compositor Marquee:** Replaced continuous JS `requestAnimationFrame` marquee loop on touch devices with pure CSS `@keyframes marquee-scroll`, respecting 120/144 Hz mobile compositor performance and saving battery.
