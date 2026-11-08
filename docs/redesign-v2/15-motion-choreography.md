# 15 — Motion choreography (exact timings; transform and opacity only)

## Principles
1. One hero moment per viewport; everything else supports it. Maximum two things moving at once on screen (excluding the ASCII).
2. Motion explains: it shows where things come from and where they go.
3. Same easing family everywhere: **out** = cubic-bezier(0.16, 1, 0.3, 1); **inout** = cubic-bezier(0.65, 0, 0.35, 1); **spring-ish** (buttons only) = cubic-bezier(0.34, 1.56, 0.64, 1) over 350 ms.
4. Durations: micro 150 ms, ui 250 ms, reveal 700 ms, scene 900-1200 ms.
5. No per-frame React state. Pointer/scroll values go into CSS variables or direct style writes from one shared requestAnimationFrame loop. Remove `will-change` after an animation ends.
6. Reduced motion: replace every movement with a 150 ms opacity fade; no parallax, tilt, marquee, Lenis, ASCII animation (static frame).
7. Touch lite tier: no pointer effects; reveals use IntersectionObserver plus CSS classes (no ScrollTrigger); only the marquee and the hero ASCII (lite) run continuously.

## Timeline A: first load (desktop and mobile)
t = 0 ms preloader (07). On exit at t0:
- t0+0: header glass bar slides down 24 px and fades, 600 ms out.
- t0+0: ASCII layer fades 0 to 1 over 900 ms; its own intro runs.
- t0+150: eyebrow pill fades and rises 12 px, 500 ms.
- t0+250: H1 line one reveals word by word (split by words, not characters): each word rises from 100% inside an overflow-hidden line box, 800 ms out, 70 ms stagger.
- t0+700: the stroke word draws its outline over 900 ms, then fills over 400 ms.
- t0+1000: line two fades in with 12 px rise, 600 ms.
- t0+1150: supporting paragraph fades in, 600 ms.
- t0+1300: buttons scale 0.96 to 1 and fade, 500 ms spring-ish, 80 ms stagger.
- t0+1600: brand line BUILD. SECURE. GROW. letter-spacing eases from 0.4em to 0.22em while fading in, 900 ms. Scroll cue appears last.
Mobile: same order, durations x0.8, no stroke-draw (fade the accent word to lime fill instead if the stroke clip risk is high), no letter-spacing animation.

## Timeline B: scroll
- Page progress: a 2 px lime bar at the very top scaling X with scroll progress (transform only), hidden on mobile Safari if it causes address-bar jank.
- Section heading: eyebrow fades, heading reveals by line (mask, 700 ms), sub fades, then content cards cascade (see C). Triggers at 80% viewport, once.
- Background tone: between sections the page background steps between bg, surface and surface-2 with 1 px dividers; no gradients that animate.
- Parallax (desktop full tier only): hero ASCII layer moves at 0.15x scroll; product phone mocks move at 0.06x; never more than 8% of the element height.
- Lenis (desktop fine pointer): lerp 0.1; anchor jumps use 1.1 s inout; disable for reduced motion.

## Timeline C: card choreography
- Grid cards reveal in a wave: delay = column index x 60 ms + row index x 120 ms; rise 28 px + fade, 700 ms out. Never reveal more than 12 cards in one wave; the rest reveal as they enter.
- Hover (fine pointer): lift 6 px over 250 ms; tilt toward the pointer up to 5 degrees; a radial highlight follows the pointer (CSS variables); border brightens; the card's arrow translates 4 px and uses Magnet. Release returns over 400 ms.
- Press (touch): scale 0.98 over 120 ms and back over 200 ms.
- Flip cards: 3D rotate Y 180 degrees over 600 ms inout, with the back face's content fading in during the last 250 ms; focus-visible also flips; Escape unflips.
- Filter change: gsap Flip animates survivors to their new positions over 500 ms out while leavers fade 200 ms and enterers fade/rise 300 ms.

## Timeline D: Products
- Section entry: heading reveal, then the three featured cards rise with 100 ms stagger; the phone mock inside each card floats in after its card (delay 200 ms) with a 6 degree rotation settling to 0.
- Idle: none (no floating loops).
- Hover on featured: phone tilts; the second screenshot swaps in with Pixel Swap (about 500 ms); cursor label shows "View".
- Card to detail transition (desktop 900 ms, mobile 600 ms), choreographed:
  1. 0-150: other cards fade to 0.2 and scale 0.98; clicked card lifts 8 px.
  2. 100-700: Flip expands the card's panel from its rectangle to full viewport; background becomes the stage color; the phone travels to its hero position.
  3. 500-900: glow radial fades in behind the phone, title lines reveal by mask (100 ms stagger), badge and facts rise 16 px staggered 60 ms.
  4. Page scroll locked until 900 ms, then unlocked; focus moves to the heading.
- Close: reverse in 600 ms; restore the previous scroll position before the reverse starts so the card is in view; re-enable the grid wave only if the user scrolled away.
- Detail internal: sections reveal like B; Scroll Expand scrubs with scroll; screens scroller advances with the pinned scroll on desktop and swipes on mobile.

## Timeline E: Solutions sticky
- Left blueprint panel crossfades between solutions over 450 ms (opacity plus 12 px translate); the traveling dot in the blueprint moves input to engine to output over 1.6 s, loops only while the panel is in view, and stops on reduced motion.
- Progress line fills with scroll (scaleY).

## Timeline F: Process
- A vertical line draws with scroll (scaleY); each step node scales 0.6 to 1 and its card reveals as the line reaches it; passed steps stay lit, upcoming steps are 45% opacity.

## Timeline G: Contact and footer
- Shine Border travels around the card (one revolution per 6 s, only while visible, paused offscreen, static on lite).
- Form submit: button states per Round 1 with a 250 ms morph between states.
- Footer big wordmark rises 40 px with a mask as it enters; social buttons stagger 60 ms.

## Header
- Hides on scroll down after 120 px and returns on scroll up (transform 300 ms out); on the hero it stays.
- Active link blob moves 450 ms inout between links (Gooey Nav default is fine; verify smoothness).

## Cursor (desktop)
Target Cursor corner brackets snap to the target over 200 ms; labels fade 150 ms; native cursor stays visible.

## Performance proof required
Record a 10 s scripted scroll (desktop and 390 px) and log: median frame time, 95th percentile, number of long tasks. Targets: median under 8.3 ms on a real-GPU desktop, no long task over 50 ms during scroll. Report honestly if the environment cannot measure.
