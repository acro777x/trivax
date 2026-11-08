# 08 — Open questions, defaults and risks
Work with the default; never block on these.
| # | Question for the owner | Default used |
|---|---|---|
| 1 | Palette: lime/green (matches the logo) or keep orange? | Lime/green |
| 2 | beUI Pro token for flip card and value grid? | Own CSS flip card and own bento |
| 3 | Real form endpoint (Formspree, Resend, own API)? | Opens the pre-written email; honest copy |
| 4 | Real case studies, client names, verified metrics? | None shown; metrics labeled "targets" |
| 5 | "ACI11" = Gradient ASCII? | Yes |
| 6 | Real X and Threads profile URLs? | Hidden |
| 7 | Real images/video for Scroll Expand and Flex Carousel? | Not used |

## Risks (verify early, log outcomes)
- shadcn registry namespaces for Magic UI and Aceternity and the easyui commands are unverified; hand-port from the TXT if the CLI fails.
- Browser subagent mobile emulation may be unavailable; use a 390 px window.
- Software-rendered browsers make WebGL look slow and the ASCII intro look empty; use real GPU Chrome and wait about 3 s or use the QA flag.
- Existing security issue (out of scope to fix in UI, but do not make worse): the chatbot calls OpenRouter directly from the browser with a Vite-exposed key. Do not add new secrets to the client. Report it in DECISIONS.md as a recommendation to move behind a proxy.
- Orphan code: delete files not imported anywhere (work-showcase, squad-overview, freelancer-intake, services-grid, kavirox-hero, threeui-scene, hero-03, the shared footer) only after confirming by build that nothing imports them. Removal order for the old WebGL hero, after `App.tsx` no longer uses it: delete `src/components/ui/tubes-curor.tsx`, then `src/shaders`, then the `@designcodeio/threeui` aliases in `vite.config.ts` and `tsconfig.json`, then three-related lines in `src/vite-env.d.ts`, then uninstall `three` and `threejs-components`. Build after each step. Treat the duplicate directories (`components/ui` vs `src/components/ui`, `src/lib` vs `src/shared/lib`) the same way: only merge/delete what the build proves unused.
