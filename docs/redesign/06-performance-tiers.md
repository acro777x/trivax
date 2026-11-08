# 06 — Performance and device tiers

## Honest target
"120/144 Hz smooth" depends on the phone, browser and battery mode; it cannot be guaranteed. The target is: no dropped frames from our code on mid-range phones, minimal main-thread work, and compositor-only animation, so capable screens can reach their native refresh rate.

## One tree, two budgets
Replace the current two separate trees (desktop and mobile switched by a width hook) with ONE responsive component tree. Create one device-tier hook that returns `full` or `lite`.
- `lite` if ANY: no fine pointer, no hover, viewport under 768 px, device memory 4 GB or less (when reported), 4 or fewer CPU cores (when reported), save-data on, or prefers-reduced-motion.
- Otherwise `full`.
The hook must read values once and subscribe to media-query changes. SSR-safe defaults to `lite`.

## Budget per tier
| Item | full (desktop) | lite (mobile) |
|---|---|---|
| Hero ASCII | cell size about 18, dpr up to 2 (default), mouse interaction on, full glow/grain/flicker | cell size about 26, dpr 1, no mouse, glow 0.2, grain 0.05, flicker 0.15 or lower |
| Glass Surface | up to 3 instances, renderer fixed to svg | frosted CSS only |
| Target Cursor | on | off (component already self-disables on non-fine pointers) |
| Magnet / Star Border | on | off / static border |
| Soft Aurora (final CTA) | mounted lazily, pauses offscreen | not mounted; use a static CSS radial gradient |
| Lenis | on | off |
| Reveals | stagger + translate | opacity + short translate only |
| Reflective Card | not used (static CSS card instead) | same |

## Hard budgets
- Initial JS 250 KB gzip or less; total JS after lazy chunks under 600 KB gzip. (The current 2.4 MB gzip bundle is unacceptable.)
- LCP under 2.5 s on throttled mobile; CLS under 0.05; no long tasks over 100 ms during scroll.
- Fonts: exactly 2 preloaded files (Bricolage Grotesque latin, Geist Mono latin); see `02`.
- Images: modern formats, explicit width/height, lazy below the fold, none over 150 KB.
- Remove three, threejs-components, and any unused icon/library packages once nothing imports them.

## Techniques to apply
- Code-split with lazy imports and Suspense, one chunk per below-fold section and per WebGL component.
- IntersectionObserver to pause any canvas and any CSS animation offscreen.
- `content-visibility: auto` with intrinsic size on long below-fold sections.
- Avoid layout thrash: no reading layout inside scroll handlers; use passive listeners.
- `will-change` only on elements that are animating, removed after.
- Use `svh/dvh` units for the hero to avoid mobile browser-bar jumps.

## Measurement
Use a real-GPU Chrome in the browser subagent. Software-rendered headless Chrome is NOT representative (WebGL frame times there are 10x+ worse) and must not be used to judge WebGL smoothness. Log: LCP, CLS, total JS, and median frame time during a scripted scroll, for desktop and a 390 px emulated device. If the browser subagent cannot emulate mobile, resize the window to 390 px width and note the limitation. The owner will confirm on a real phone.
