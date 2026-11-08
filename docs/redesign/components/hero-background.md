# Gradient ASCII (hero background) — TXT lines 1-903
Source ranges: props documentation from line 3; CSS lines 33-49; component code lines 51-897.
Dependencies: none beyond React (the component imports only react hooks and uses raw WebGL2). Do not install ogl for this component.

## Placement
Behind the hero only. Wrapper is an absolute full-size layer at the lowest z-layer; a scrim layer above it; content above both. The component container must NOT sit in normal flow (it pushed content off-screen in the spike).

## Props to use (names as in the TXT)
- colors: the four-color ramp from `02`.
- shape: horizon. characters: keep default.
- full tier: cellSize about 18, density about 0.8, glyphOpacity about 0.7, glow about 0.2, grain about 0.05, flicker about 0.15, mouseInteraction on, intro on.
- lite tier: cellSize about 26, dpr 1, mouseInteraction off, same glow/grain/flicker or lower.
- fontFamily: must be set to the exact Fontsource family name for Geist Mono (the Fontsource variable family name is "Geist Mono Variable", unlike the TXT default "Geist Mono"). Without this the glyph atlas falls back and looks wrong.
- The component builds its glyph atlas after fonts load; the Geist Mono latin file is one of the two preloaded font files (see `02`).

## Scrim
Vertical gradient from near-black at the bottom (about 92% opacity) through about 55% at 45% height to transparent by 75% height, using the bg token. Text must keep 4.5:1 contrast.

## Behavior notes (from code inspection)
Pauses offscreen and when the tab is hidden; honors reduced motion; clamps cellSize 6-64; has a 2.4 s intro. In QA add a query flag (for example `?qa=1`) that turns the intro off so screenshots are consistent. Under reduced motion show the static first frame.

## Integration
JS source file needs a sibling type declaration (props: the ones above plus className, style, an index signature for the rest). Lazy-load the component; render a flat bg-colored placeholder with the same dimensions until it mounts (no layout shift).

## Checklist
Visible texture in the upper hero; text legible; mobile frame smooth; no second WebGL canvas animating at the same time; console clean.
