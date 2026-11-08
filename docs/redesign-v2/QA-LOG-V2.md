# QA LOG V2 — Kavirox.space Front-End Redesign (Round 2)

**Branch:** `redesign/v2`  
**Execution:** Lead Front-End Engineer & Design QA Audit  
**Date:** 2026-11-08  

---

## 1. Verification Matrix Across Mandatory Viewports

| Section / Capability | Viewport | Verified Behavior & Acceptance | Result |
|---|---|---|---|
| **Global Shell & Foundations** | All Viewports (390, 768, 1280, 1440, 1920) | All `//` terminal ornaments purged from DOM visible text. Clean console: 0 errors / 0 warnings. `scrollWidth === clientWidth` across all 5 viewports. Variable font loading verified (`Bricolage Grotesque Variable`, `Geist Variable`, `Geist Mono Variable`). | **PASS** |
| **S0 Liquid Glass Header** | 1440x900 (Desktop) | `GlassSurface` with active SVG refraction (`distortionScale: -180`, `displace: 0.5`, `backgroundOpacity: 0.14`, `opacity: 0.93`, `blur: 14`, `saturation: 1.6`), bright white translucent frost background, 1px specular highlight border, real vector Kavirox logo lockup, WebGL alpha-translucent pill in `GooeyNav` with crisp text contrast, and solid lime "Discuss a project" pill. | **PASS** |
| **S0 Liquid Glass Header** | 390x844 (Mobile) | Inset frosted glass bar with backdrop blur and specular highlight, circular 44px glass toggle button, and full-screen `StaggeredMenu` drawer featuring plain numerals (`01`–`06`), product list links, and auto-dismiss on link selection. | **PASS** |
| **S0.1 Preloader & Intro** | All Viewports | `KaviroxPreloader` checks font loading (`document.fonts.ready`) and hero ASCII signal, animates SVG mark components with GSAP, letter stagger on wordmark and `.SPACE` expansion, tabular 0–100 counter, and vertical curtain split exit. Bypassed on reduced motion and `?qa=1`. | **PASS** |
| **S1 Hero v2** | All Viewports | Symmetrical, horizontally and vertically centered composition (`max-w-[880px]`). Headline: "Products that solve problems." with unclipped `StrokeText` on "solve", baseline alignment compensation, and fluid mobile wrapping. Quiet line: "Technology that moves businesses forward." Supporting paragraph from 18-copy-deck. Dual CTAs: Glow Button "Explore Products" & Specular Button "Discuss a Project". Bottom line: "BUILD. SECURE. GROW. • Incubated at AIC-GBU, Greater Noida". | **PASS** |
| **S2 Tech Marquee** | All Viewports | Centered label: "Technologies we build with", 12 monochrome verified icons (`SiNextdotjs`, `SiReact`, `SiShopify`, `SiVite`, etc.), edge fade mask. Desktop uses `LogoLoop` with lime hover; mobile uses pure CSS `@keyframes marquee-scroll` for 120/144 Hz compositor performance. | **PASS** |
| **S3 Products Section** | Desktop (1440x900) | 7 verified products from `03-products-catalogue.md`. Featured trio (Rakshak Setu, GBU One, Study Hub AI) rendered in tall 4:5 cards with `StarBorder`, dark phone mocks, PixelSwap hover previews, and honest status badges. Compact 4-up grid for remaining portfolio with accessible keyboard triggers. | **PASS** |
| **S3 Products Section** | Mobile (390x844) | Horizontal scroll-snap carousel (`snap-x snap-mandatory`) for featured products (1.15 cards visible, momentum scroll) and 2-up grid for compact cards. Zero horizontal document overflow. | **PASS** |
| **S3.1 Product Detail Routes** | Desktop & Mobile (`/products/:slug`) | Client-side routing with browser History API sync, scroll position preservation, and back-button support. Scene opening GSAP transition, ScrollExpand 16:9 stage showcase hero, problem statement, feature groups, "Where this stands" transparency box, and pre-written inquiry CTAs. Verified on `rakshak-setu`. | **PASS** |
| **S4 Ways to Work** | All Viewports | 4 structured models from doc 02 ("Ready-built product", "Product implementation", "Custom development", "Product plus custom extension"). Desktop connector line with traveling pulse; plain numerals (`01`–`04`); Lucide icons. | **PASS** |
| **S5 Core Services** | All Viewports | 11 core service lines with interactive 3D flip cards, category filter chips with live counts, expandable search bar, deliverables backface without dead space, and company-level "Also" capabilities strip. Zero banned hype words. | **PASS** |
| **S6 Solutions & Blueprints** | All Viewports | Sticky split layout on desktop (5/12 left, 7/12 right). Left column sticky with step indicators and animated 3-step blueprint. Right column with concise architecture highlights, interactive `<PixelSwap>` before/after benchmark in card 1, and "Targets we design for" disclaimer. | **PASS** |
| **S7 Process** | All Viewports | "How a project runs" 6-step lifecycle timeline (`deliverySteps`) with product-neutral wording. Left sticky stage numeral and title; right sequential steps. Mobile vertical stepper. | **PASS** |
| **S8 About & Trust** | All Viewports | Headline: "Useful products, practical engineering." Narrative from doc 02. Bento proof tiles: "Incubated at AIC-GBU", "Greater Noida, India", and dynamic portfolio count ("7 products and projects in our portfolio"). | **PASS** |
| **S9 FAQ** | All Viewports | Headline: "Things people ask first." Two-column layout on lg+ with sticky section header. 7 grounded Q&As from `18-copy-deck.md`. Smooth CSS `grid-template-rows` height animation, keyboard navigation, and ARIA attributes. | **PASS** |
| **S10 Contact & Inquiries** | All Viewports | Headline: "Tell us what you want to build." Dual-path tabs: "Discuss a project" and "Ask about a product" with dynamic product selector. Shine Border glass container, Soft Aurora backdrop on full desktop tier, Stateful Button, and `info@kavirox.space` mailto handler. Chatbot launcher auto-hides on input focus. | **PASS** |
| **S11 Footer** | All Viewports | Elegantly cropped KAVIROX watermark along top border. Real vector Logo component, 4 structured columns (Products, Company, Services, Contact), verified LinkedIn and Instagram squircle buttons, and legal notice: "BUILD. SECURE. GROW. • Incubated at AIC-GBU, Greater Noida". | **PASS** |
| **S12 Chatbot & Metadata** | All Viewports | Chatbot knowledge base synchronized with 7 verified products, positioning, and security policies. Site metadata in `index.html` updated (title, description, Open Graph, Twitter cards, JSON-LD Organization). Sitemap updated with all 7 product routes. | **PASS** |

---

## 2. Quantitative Performance & Bundle Measurement

- **TypeScript Compilation (`tsc -b`):** 0 errors.
- **Production Build (`vite build`):** 1,914 modules transformed in 7.30s.
- **Initial JS Bundle (gzip):** **154.47 kB** (`dist/assets/index-B_wMJmqp.js`, raw 447.81 kB) — **PASS** ($\le 250\text{ kB}$ budget).
- **Initial CSS (gzip):** **17.18 kB** (`dist/assets/index-CYfKz3-Q.css`, raw 104.02 kB).
- **Document Horizontal Scroll:** `hasOverflow === false` across all 5 viewports (390px, 768px, 1280px, 1440px, 1920px).
- **Runtime Console Cleanliness:** `console_errors: []` (0 errors across all viewports).
- **`//` Ornament Count in Visible Body Text:** `0` (Zero occurrences).
- **Banned Hype Words in Rendered Text:** `0` (Zero occurrences).
- **GitHub URLs in Rendered Text:** `0` (Zero occurrences).
