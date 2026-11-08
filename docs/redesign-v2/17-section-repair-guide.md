# 17 — Section-by-section repair guide (what is broken, target, steps, acceptance)

Format per section: Observed problem (from screenshots of the current build) → Target → Build steps → Acceptance. Work in this order; do not move on until acceptance passes (max 4 loops, then log).

## S0 Global shell
Observed: the grey header capsule overlaps headings at scroll; mobile bar has no surface so the logo and "Menu +" collide with content; chat pill ("Ask AI") overlaps the footer line of the form on mobile and sits on text on desktop.
Target: glass header (06); `scroll-margin-top` on all anchored sections equal to header height + 24 px; the chat launcher is a 48 px round icon button on mobile and a compact pill on desktop, offset above the safe area, and it hides on the contact form field focus; add bottom padding of 80 px to the last section so the launcher never covers content.
Acceptance: no overlapping text at any scroll position in screenshots at the 10 test sizes.

## S1 Hero
Observed: left aligned; clipped "engin…"; harsh neon ASCII; two stacked paragraphs; mobile has too little breathing room.
Target: 05 plus 14 (type) and 15 (timeline A).
Steps: centered flex column; H1 uses display-xl; measure the stroke word after fonts load and reserve its width; calm ASCII ramp; vignette; brand line and incubation line at bottom with safe-area padding.
Acceptance: symmetrical composition at all sizes; the stroke word fully visible; LCP element is the H1; no layout shift when fonts load.

## S2 Marquee
Observed: a thin row of a few logos.
Target: a labeled band, centered label "Technologies we build with", 10-12 monochrome logos, edge fade, pause on hover desktop.
Acceptance: seamless loop with no jump; icons all load; text fallback if an icon is missing.

## S3 Products (new)
Spec: 03, 04, 15 timeline D. Acceptance: seven cards, correct badges, real screenshots on Rakshak Setu and GBU One cards, illustrated mocks elsewhere, working detail routes and transition, no GitHub links.

## S4 Ways to work (new)
Spec: 02 and 05 section 5. Four cards with connector line (desktop). Acceptance: equal card heights; plain numerals; icons from lucide; copy exact from 02.

## S5 Services
Observed: 11 identical boxes with large empty bottoms; "// 04" numbering; "Flip for deliverables" mono hint; header overlap.
Target: 09 services spec; featured first card spanning two columns; category chips with counts; expandable search; deliverables count chip; no dead space.
Acceptance: card heights equal per row; no text clipped on the back face (clamp to 4 deliverables + "and more"); filter animates with Flip; works on keyboard and touch.

## S6 Solutions
Observed: left column blank; single enormous card; dense three-column bullets; "// KEY ARCHITECTURAL PILLARS" labels; on mobile the card runs wider than the gutters and text hugs the edge.
Target: 09 solutions spec. Left sticky panel always populated (heading, step list, blueprint visual); right panels short and scannable (three key points, stack chips, targets trio).
Acceptance: at 1440 the left column never empty; at 390 the card has 20 px gutters; metric trio labeled "Targets we design for".

## S7 Process
Observed: six uneven cards (card 3 shorter), "PHASE 01" mono labels, content centered on old e-commerce story, a separate "Flexible Engagement Models" block with its own `//` label.
Target: heading "How a project runs"; desktop sticky split: left shows big step numeral and current step title with a progress line; right lists the six steps as rows (title, one-line text, deliverable chips) revealed along a drawing vertical line; mobile vertical stepper with the line at the left edge. Replace "PHASE 0x" with "Step 1" in Geist (not mono). Keep the six titles and texts from `deliverySteps`, but edit wording to be product-neutral where it names only stores (example: "your store" becomes "your product or store") without inventing facts.
Engagement models merge into S4 (ways to work); remove the old block.
Acceptance: all steps equal rhythm; line draws with scroll; works with reduced motion (all visible).

## S8 About and trust
Spec: 05 section 9, copy from 02. Acceptance: no invented numbers; count tile equals the data module length.

## S9 FAQ
Observed: not reviewed in screenshots; verify. Target: 09 FAQ + product questions; two columns on lg+; 48 px rows; one open at a time; animated height via grid-rows trick or max-height transition without layout thrash (use `grid-template-rows` 0fr to 1fr). Acceptance: aria-expanded correct; keyboard works.

## S10 Contact
Observed: heading "Start Engineering Your Store" (old positioning); placeholder person name; labels in mono caps; single path; chat pill overlaps the "Direct email" line on mobile.
Target: heading "Tell us what you want to build"; sub from the copy deck (18); two paths ("Discuss a project", "Ask about a product" with a product select); labels in Geist 14 px sentence case above fields; placeholders neutral ("Your name", "Email or phone", "What are you building?"); Shine Border card; aurora behind on full tier; the honest email-open behavior and wording.
Acceptance: nothing overlaps at 390; submit states work; the product select prefills the email subject.

## S11 Footer
Observed: columns with `01 // Index` headings. Target: 05 section 12. Acceptance: big wordmark cropped elegantly, no `//`, links work, safe area respected.

## S12 Chatbot
Restyle only; replace Thinking with Lattice Loader; header uses the Logo lockup small; the panel on mobile is a bottom sheet at 85dvh with drag handle; closes with Escape and swipe down.

## Cross-section checklist (apply after each)
Spacing follows 8 px grid; section padding 96/64; heading + sub + content rhythm identical across sections; no section starts with a card directly under the previous section's last card (use a 96 px gap); all eyebrows follow 14; all numerals tabular.

## S13 Site metadata and knowledge sync (do not forget)
Round 1 still says "Technology & E-Commerce Studio" and D2C in `index.html` (title, meta description, Open Graph, Twitter, JSON-LD), in the chatbot knowledge (`studio-knowledge.ts`: STUDIO_IDENTITY and related constants) and the sitemap. Rewrite them to the product-led positioning in `02`: title "Kavirox | Products that solve problems", description from the hero paragraph, JSON-LD Organization with the real description and the two social URLs, no invented fields. Add the seven product URLs to the sitemap. Update the chatbot's knowledge with the product list (names, one-liners, honest statuses) from `03`, without adding claims.
