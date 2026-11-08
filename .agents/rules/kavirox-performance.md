---
trigger: always_on
description: Performance and smoothness rules for all Kavirox work.
---
# Performance rules (always)
- Animate only transform and opacity. Never animate width, height, top, left, blur radius or box-shadow continuously.
- Only ONE full-viewport WebGL canvas may animate at a time. Offscreen canvases must pause (IntersectionObserver) and release on unmount.
- Respect the device tier from `06-performance-tiers.md`: `full` tier = desktop with fine pointer; `lite` tier = touch, small screens, low memory, save-data, or reduced motion.
- No continuous JS animation on touch devices except the hero background (lite config), marquee (CSS transform), and scroll-linked effects.
- Lazy-load every section below the first viewport and every WebGL component. Initial JS budget: 250 KB gzip or less.
- Never use backdrop-filter or SVG displacement filters on more than 3 elements at once; mobile uses frosted CSS fallback only.
- All animation honors prefers-reduced-motion with a static alternative.
- Remove unused heavy deps (three, threejs-components) once the old hero is deleted.
