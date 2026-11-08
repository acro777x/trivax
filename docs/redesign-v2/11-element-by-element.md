# 11 — Element by element: status in the current build, what to improve (TXT line ranges)

Legend: USED = already in the build; IMPROVE = change required; ADD = not yet used, now required.

| Element (TXT lines) | Status | What to do now |
|---|---|---|
| Gradient ASCII (1-903) | USED, IMPROVE | Calmer ramp (top stop primary-mid), glyphOpacity about 0.45 desktop, glow horizon behind the centered headline, vignette scrim; lite config on mobile; verify nav glass shows ASCII behind it (05, 06). |
| Flex Carousel (904-3812) | GATED | Default: not used (only two products have screenshots). Optional experiment per 19. |
| Lattice Loader (3813-4277) | USED | Keep for chatbot "thinking"; also reuse as the in-card loading state on detail pages while images load; recolor to tokens. |
| Pixel Swap (4278-4805) | USED, IMPROVE | Keep Solutions before/after; add to featured product cards for screenshot A to B on hover; click trigger on lite (04, 09). |
| Scroll Expand (4806-5247) | ADD | Product detail pages: expanding phone/scene as the lead screenshot (04). Needs real screenshots, now available. Window scroll mode; passive listeners; skip on lite if it janks and use a simple reveal. |
| Stroke Text (5248-5783) | USED, FIX | Accent word "solve"; fix clipping by measuring text width and allowing overflow visible; marching false (05). |
| Specular Button (5784-6420) | USED, IMPROVE | Secondary hero CTA; also use as the sheen on card hovers (08). |
| Soft Aurora (6421-7026) | USED | Final CTA background, desktop only; colors from tokens: color1 primary-mid, color2 primary. Keep intensity low; behind the contact card only. |
| Reflective Card (7027-8311) | SKIP | Needs a video file and is a WebGL name/role ID card; use a static glass card in About. |
| Staggered Menu (8312-9215) | USED, IMPROVE | Mobile menu panel; built-in header replaced by the glass bar (06); numbered links; products group. |
| Logo Loop (9216-10644) | USED, IMPROVE | Tools marquee, monochrome with primary hover; label centered above (05). |
| Pill Nav (10645-12040) | SKIP | Reserve; not used. Log in DECISIONS-V2. |
| Glass Surface (12041-13102) | USED, FIX | Refraction ON, low background opacity, white tint, svg renderer, max 3 instances: header, plus at most two feature surfaces (06). |
| Target Cursor (13103-13573) | USED, IMPROVE | Add labels via data-cursor-label; hideDefaultCursor false; make every card and button a target (08). |
| Gooey Nav (13574-14594) | USED, FIX | Translucent white blob, scroll-spy, new labels including Products (06). |
| Star Border (14595-15346) | USED, IMPROVE | Featured product cards and the highlighted engagement model. |
| Magnet (15347-15620) | USED | Hero primary CTA, card arrows; off on lite. |
| Stateful Button (15621-15694) | USED (own build) | Contact submit; keep honest "Opening your email" states. |
| Paper-plane note (15695-15704) | SKIP | Only a GitHub link, no source; Stateful Button is the choice. |
| Shine Border (15705-15756) | USED (own build) | Contact card; hover emphasis on compact product cards. |
| Loader, Uiverse (15757-16021) | OPTIONAL | Has real CSS in the TXT; preloader wordmark shimmer if recolorable (07). |
| Social buttons, Uiverse (16022-16124) | USED | Footer: LinkedIn, Instagram, email only. |
| Glow button, Uiverse (16125-16369, recommended) | USED, IMPROVE | Primary CTAs; verify the recolor is fully lime (hue about 80-90) at the border; glow only on hover/focus/press; no idle animation. |
| Accordion, HeroUI (16370-16457) | SKIP (custom used) | FAQ keeps the custom accordion; add product questions (09). |
| Intro Loader (16458-16468) | SKIP | The TXT holds only an install command with no source; use the custom preloader (07). |
| Expandable Search (16469-16486) | OWN BUILD | The TXT holds only an install command; try it once, else build a search that expands from an icon (09). |
| Flip Card (16487-16536, paid) | USED (own build) | Services cards; polish per 08 and 09. |
| Value grid (16537-16551, paid) | USED (own build) | Bento tiles with mini illustrations (08). |
| Owner extras: Lenis, GSAP sticky | USED | Lenis desktop only; sticky split in Solutions (09). Add GSAP Flip for filters and the detail-page transition (04). |

Every "SKIP" and "OPTIONAL" decision must be recorded in `DECISIONS-V2.md` with the reason.
