# Text and motion

## Stroke Text — TXT 5248-5783
Deps: gsap (ScrollTrigger plugin registered once). Props seen: fontSize (a NUMBER in px, default 128 at line 5358; no CSS clamp possible), marching (default false), hoverRedraw (default false), trigger (usage at 5275-5309). The SVG already has role="img" and an aria-label.
Use ONLY for the single accent word of the hero H1 ("engineered."). Compute fontSize in JS from the viewport (about 44 px phones to 112 px desktop) and update on resize (debounced). Keep marching false; hoverRedraw only on full tier. Keep a real text H1 for SEO/screen readers: the visible H1 contains the plain words and the stroke word is wrapped in an aria-hidden span, with the full phrase available to assistive tech once. Stroke in primary. Reduced motion: show the final state immediately. Do not edit the component's source.

## Lenis smooth scroll (owner-allowed extra element)
Package: lenis. Fine pointer + full tier only. Sync with GSAP ScrollTrigger (single raf source). Disabled under reduced motion. Anchor links scroll via Lenis. Never on touch.

## Sticky storytelling (owner-allowed extra element)
GSAP ScrollTrigger pinning in the Solutions section, desktop only (full tier); described in `03`. Use transform/opacity. Refresh triggers after fonts load and after lazy sections mount.

## Scroll Expand — TXT 4806-5247 (reserve)
Needs real hero media (image/video) that does not exist. Do not use unless the owner provides media.

## Reveal utility
One shared reveal wrapper using IntersectionObserver + CSS transitions (no per-element GSAP). Once per element.
