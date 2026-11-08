# 06 — Header: bright white liquid glass (desktop and mobile)

## What is wrong now
The desktop capsule passes refraction off and a high background opacity (0.7), so it renders as a flat grey translucent pill; the gooey active pill is opaque white; mobile has no glass at all (just a logo and "Menu +").

## Target look
Apple-style liquid glass: a clear, **white-tinted translucent** body that bends and brightens what is behind it, a bright 1 px specular edge (top and left stronger), a faint inner glow, soft long shadow underneath. Behind it you can see the ASCII hero and page content shifting. Text is white at 90% on glass over dark content; the active item is a brighter, frosted white pill, not a solid white block.

## Desktop (viewport 768 and up with a fine pointer)
- Container: Glass Surface (TXT 12041-13102) with **refraction ON** and renderer fixed to `svg`. Start from the TXT's own recommended usage values and tune: distortionScale about -180, displace about 0.5, backgroundOpacity about 0.10 to 0.16 (NOT 0.7), brightness about 50-60, opacity about 0.93, blur about 11-16, saturation about 1.4-1.8, borderWidth about 0.07, RGB offsets as in the TXT (0 / 10 / 20) for a subtle chromatic edge. Border radius = pill.
- Add on top of the component (CSS, around the glass): a 1 px inner white border at 35% alpha, a top-left specular gradient highlight (white 40% to transparent, 40% of the height), and a drop shadow `0 18px 40px rgba(0,0,0,.35)`. Do not animate shadow or blur.
- Size: about 720 px wide, 56 px tall, centered, 16-20 px from the top. On scroll down past the hero it shrinks slightly (scale 0.96 and 8 px up) using transform only.
- Contents: real logo lockup (see 07) at left, Gooey Nav (TXT 13574-14594) links centered: Products, Services, Solutions, Process, FAQ, Contact; "Discuss a project" pill at right (primary lime with dark text; this is the one solid element).
- Gooey Nav colors: frame false; link text white 80%, active white 100%; the gooey blob is a **translucent white** (white at 18-24% alpha with a 1 px white 40% border), not solid white, and not lime. Active section follows scroll-spy as before.
- Fallback when SVG filters are unsupported: the component falls back to frosted CSS; ensure the frosted version still looks white-translucent (white 12% alpha, backdrop blur 18 px, saturate 160%).
- Browser reality: the SVG-filter refraction path uses `backdrop-filter: url()`, which works in Chromium only. In Safari and Firefox the glass shows as frosted white translucent CSS (still bright, white, with specular edge, but without bending). Acceptance for refraction applies to Chromium; Safari and Firefox must look good as frosted glass.
- Verify with screenshots over three backgrounds: the bright ASCII top, the dark mid-hero, and a card-filled section. Text must remain legible on all three (add a faint dark text-shadow if needed, 0 1px 8px rgba(0,0,0,.35)).

## Mobile (below 768 or no fine pointer)
- A floating glass bar, inset 12 px from edges and 10 px from the top: height 56 px, pill radius, **frosted white-translucent glass using CSS only** (white 12% alpha, backdrop-filter blur 18 px saturate 160%, 1 px white 30% border, top specular gradient). No SVG refraction on mobile (performance).
- Left: real logo lockup (mark plus live wordmark). Right: a circular glass menu button (44 px) that opens the Staggered Menu (TXT 8312-9215). The Staggered Menu has no controlled `open` prop and its toggle lives inside its own header row, so do NOT hide that header. Instead restyle the component's own header row and toggle (via its class names and CSS variables) so that they ARE the glass bar described here: pill radius, frosted white translucency, specular edge, inset spacing, the real logo lockup at left and the glass round toggle at right. Keep its panel and pre-layers. If a controlled prop is needed for Escape/scroll lock, add a minimal one in the wrapper and log it.
- The bar hides on scroll down and returns on scroll up (transform only), always visible near the page top.
- Menu panel: full-screen dark, big Bricolage Grotesque links with numerals (01-06 plain numerals), the products as a second group ("Products" with the 7 names), the email button at the bottom, socials small.
- Safe-area padding for notched phones. The floating chat launcher must not overlap the bar or content (see 10).

## Checks
Screenshots at 390 and 1440 with the page at top, mid and bottom; compare against the target look; the glass must visibly bend the ASCII behind it on desktop; there is no solid grey anywhere in the header.
