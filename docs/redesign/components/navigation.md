# Navigation

## Glass Surface — TXT 12041-13102 (owner: highly recommended)
Deps: React only. Always pass the renderer prop as `svg` (default `auto` falls back to a WebGL2 canvas on browsers without SVG-filter support, which would break the one-canvas rule; with `svg`, unsupported browsers get frosted CSS automatically). Props seen: width, height, children, borderRadius (usage block at about line 12050-12091).
Use: the floating desktop nav pill container (full tier). Max 3 instances on the page (nav, plus at most two feature cards). Lite tier: do NOT use the refraction renderer; use a plain frosted panel (semi-transparent surface token + backdrop blur of modest radius + 1px line border). Size the glass to its content (the nav), set border radius to full pill.
Checklist: text on glass keeps contrast; glass visibly refracts the hero ASCII behind it on desktop; no jank on scroll; fallback looks intentional.

## Gooey Nav — TXT 13574-14594 (owner: recommended together with Glass Surface)
Deps: React only. Props seen: theme (dark/light), size (md default), frame (default true), items, activeIndex (controlled; line 13824).
Use: inside the Glass Surface, as the link row. Pass frame as false so the Glass Surface is the only visible frame, theme dark, and recolor the gooey blob and active text to the primary token via the component's CSS variables (TXT defaults are purple/neutral).
Behavior: drive activeIndex from a scroll-spy over the section ids (the component supports a controlled activeIndex), and also update on click. Keyboard: arrow keys and Enter work; visible focus. Show the desktop nav (Glass + Gooey) when viewport is 768 px or wider AND a fine pointer exists; otherwise show the mobile header. This switch is by viewport/pointer, independent of the performance tier.

## Staggered Menu — TXT 8312-9215
Deps: gsap. The component is a side panel (position prop left or right, default right) that includes its OWN header with a logo and menu toggle. Props: items (each with label, ariaLabel, link), colors (pre-layer colors), position, logoUrl, isFixed, plus accent/styling props (see usage block 8325-8376). Its default logoUrl points to a missing asset: always pass `/kavirox-kmark.svg`. Pass isFixed true. Pre-layer colors from tokens (bg, surface-2, primary-deep).
Use: this IS the mobile header (do not add a second header bar). Override the panel width to 100% on phones so it behaves as a full-screen menu, and use Bricolage Grotesque for the link text.
The source has no Escape-to-close, no scroll lock and no focus trap: add these in a thin wrapper component (listen for Escape, lock body scroll while open, move focus into the panel on open and back to the toggle on close) without editing the ported source. Add the email CTA and small socials as the last items.
Checklist: opens/closes smoothly at 390 px; no layout jump; links reach the sections; Escape closes.

## Pill Nav — TXT 10645-12040 (reserve)
Do not use by default. Only fall back to it if Gooey Nav inside Glass Surface fails QA after 4 iterations (log it).

## Mobile header
Provided by the Staggered Menu header (see above). Hide-on-scroll is not required; keep it fixed and compact.
