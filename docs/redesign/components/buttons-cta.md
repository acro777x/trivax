# Buttons and CTAs

## Glow button (Uiverse sparkle) — TXT 16125-16369 (owner: recommended)
This is plain HTML plus CSS (not a React component). Convert to a React button with a real text label.
Required changes (verified at these lines): (1) recolor EVERY purple value: hsl 270/260 at about 16134, 16139, 16142, 16155-16157 and the border at about 16212; use the primary token hues (lime, hue about 80-90). (2) Delete the page-wide rule `body:has(button:is(:hover,:focus-visible))` (about 16277); scope the active state to the button itself. (3) Replace the box-shadow transition with an opacity transition on a pseudo-element holding the glow. (4) The infinite animations (flip about 16225, rotate about 16252, float-out about 16322) must run only while hovered/focused/pressed, never idle; on touch trigger on press only. Reduced motion: static glow.
Use as the primary CTA ("Start a project", "Email us"). Checklist: label contrast; focus ring visible; zero layout shift; idle state has no running animation.

## Specular Button — TXT 5784-6420
Deps: React only (hooks). Use as the secondary CTA ("See our services"). Pointer-driven specular highlight on full tier; on lite tier a static sheen. Color from tokens.

## Magnet — TXT 15347-15620
Deps: React only. Props seen: padding (default 100), disabled, magnetStrength (default 2), tilt, scale, wrapperClassName. Wrap the hero primary CTA only. Disabled on lite tier and reduced motion.

## Star Border — TXT 14595-15346
Deps: React only; its colors live in an internal themes table: pick or edit the theme to token colors. Use ONLY on the engagement model with `highlighted: true` in `engagementModels` (one instance). Static border on lite tier.

## Shine Border — TXT 15705-15756 (see forms-contact.md)
The TXT range contains ONLY a login-card demo (it imports ShineBorder from `@/registry/magicui/shine-border`, shineColor purple/pink at about line 15726); the component source is not in the TXT. Write your own small ShineBorder: an absolutely positioned border layer using a masked conic/linear gradient rotated with transform, props shineColor (array) and duration, token colors, static under reduced motion and on lite tier.

## Stateful Button — TXT 15621-15694
The range holds only two identical usage demos (import Button from `@/components/ui/stateful-button`, function StatefulButtonDemo at about 15634 and 15661). There is NO component source and NO install command. Write your own 3-state button: the click handler may return a Promise; states idle, loading (spinner, disabled, aria-busy), success (check icon, label change, auto-reset after about 2 s); transform/opacity transitions; token colors. Use for the contact submit.

## Paper-plane button — TXT note at about 15695 (owner: "try; remove if not better")
Default: do not build it. Build only if time remains after all sections pass QA; compare screenshots/behavior against the Stateful Button, keep the better, log the decision.
