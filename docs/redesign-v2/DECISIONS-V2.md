# DECISIONS V2 — Kavirox.space Round 2 Redesign

Log of all deviations, architectural decisions, and skipped elements during Round 2 redesign.

---

### Decision 1: Zero-Dependency History API SPA Router
- **Date**: 2026-11-08
- **Decision**: Implemented a lightweight zero-dependency History API SPA router inside `src/App.tsx` instead of adding `react-router-dom`.
- **Reason**: `react-router-dom` would add ~35 KB to the bundle, risking the strict 250 KB gzip initial JS budget. The native History API handles `/products/:slug` detail routes, browser back/forward navigation (`popstate`), and scroll position restoration seamlessly and efficiently.

---

### Decision 2: Authentic Vector Logo Extraction & Multi-Format Generation
- **Date**: 2026-11-08
- **Decision**: Traced the authentic emblem from `public/Kavirox_logo.png` using a Python OpenCV/Pillow contour tracer (`scripts/trace_logo.py`) to create `public/kavirox-mark.svg`. Generated complete icon packages (favicon 16/32/64/128/180/256/512, apple-touch-icon, og-image.png, and og-image.jpg). Moved the 1.26 MB raster reference to `brand-source/Kavirox_logo.png`.
- **Reason**: The site previously used a placeholder SVG or generic circle K. Vector extraction ensures crisp SVG rendering at all resolutions and eliminates multi-megabyte image payloads from the critical path.

---

### Decision 3: Logo Descriptor Wording Resolution
- **Date**: 2026-11-08
- **Decision**: Used the company profile wording `"Technology • Products • Solutions"` in all live rendered UI text (Header, Footer, Logo component), while acknowledging that the legacy 3D logo artwork displays `"Technology • Growth • Solutions"`.
- **Reason**: `02-company-and-tagline.md` explicitly mandates: *"Descriptor under the logo: Technology • Products • Solutions (the logo artwork itself prints 'Technology • Growth • Solutions'; use the profile wording in live text and log the mismatch for the owner)"*.

---

### Decision 4: Try-Out Real Screenshots Capture
- **Date**: 2026-11-08
- **Decision**: Captured live mobile and desktop screenshots of `https://try-out.antideploy.app/` using Playwright and Pillow (`01_try_out_hero.webp`, `02_try_out_gallery.webp`, `03_try_out_desktop.webp`), saving optimized `.webp` files in both `public/projects/try-out/` and `assets/projects/try-out/`.
- **Reason**: Try-Out is a live product. Per `04-projects-section-and-detail.md`, real screenshots must be shown for live products.

---

### Decision 5: Skipped Elements and Rationale
1. **Reflective Card (WebGL ID Card)**:
   - *Status*: Skipped in Section 9 (About).
   - *Reason*: Explicitly instructed in `05-landing-page-v2.md` section 9: *"A static glass card (the Reflective Card is skipped; it needs a video and is a WebGL ID card)"*. Running a second WebGL canvas would violate `.agents/rules/kavirox-performance.md` ("Only ONE full-viewport WebGL canvas may animate at a time").
2. **Pill Nav**:
   - *Status*: Skipped in favor of `GooeyNav` on desktop and `StaggeredMenu` on mobile.
   - *Reason*: `06-header-liquid-glass.md` pairs `GlassSurface` with `GooeyNav` for desktop liquid glass, and `StaggeredMenu` for the floating mobile liquid glass bar.
3. **Intro Loader**:
   - *Status*: Skipped in favor of `KaviroxPreloader`.
   - *Reason*: `KaviroxPreloader` incorporates the authentic vector logo emblem draw, live wordmark letter stagger, and font/ASCII readiness tracking.

---

### Decision 6: Total Elimination of `//` Ornament
- **Date**: 2026-11-08
- **Decision**: Removed all `//` marks from section eyebrows, card numbers, FAQ headers, and footer column titles. Replaced with clean sentence-case plain text, numbers (01, 02), or subtle dots/lines.
- **Reason**: Rule in `kavirox-v2-corrections.md`: *"Banned: the characters `//` used as decoration... Use real labels, small numerals (01, 02) or a short line/dot instead"*.

---

### Decision 7: Honest Status Badges
- **Date**: 2026-11-08
- **Decision**: Configured `StatusBadge` to display strictly honest lifecycle statuses across all 7 canonical products from `03-products-catalogue.md`:
  - Rakshak Setu: `Prototype with working modules` (slug: `rakshak-setu`)
  - GBU One: `Built and device-tested` (slug: `gbu-one`)
  - Study Hub AI: `Campus pilot` (slug: `study-hub`)
  - FitFuel: `In development` (slug: `fitfuel`)
  - Try-Out: `In development` (slug: `try-out`)
  - LAPS One: `In development` (slug: `laps-one`)
  - GBU Student Data Management System: `Specified` (slug: `gbu-sdsm`)
- **Reason**: Hard rule: zero hype words, no false representations of unfinished work as finished. Products without live captures feature clean CSS mock illustrations rather than fake screenshots.

---

### Decision 8: ScrollExpand 16:9 Composed Stage Imagery on Product Detail
- **Date**: 2026-11-08
- **Decision**: Composed 16:9 wide aspect ratio stage showcase compositions for Rakshak Setu, GBU One, and Try-Out (`public/projects/<slug>/stage_composed_16_9.webp`), integrating `<ScrollExpand>` lead animation on desktop with seamless fallback for mobile viewports.
- **Reason**: Doc `04-projects-section-and-detail.md` specifies an expansive hero stage visual on desktop with scroll expand transition before delving into feature groups and screens.
