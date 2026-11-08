---
name: kavirox-component-port
description: Procedure for porting one component from the TXT elements file into the Kavirox repo.
---
# Port one TXT component
0. If the doc says the TXT has no source (Shine Border, Stateful Button, Glow button is HTML only), follow the doc's own-build instruction instead of steps 2-4.
1. Open the component's doc in `docs/redesign/components/` and note its TXT line range.
2. Extract exactly those lines from the TXT into a new file under `src/components/ui/` (one component per file; CSS into a sibling CSS file if the TXT separates it).
3. Install only the npm packages the doc lists, at the listed versions or newer compatible ones.
4. Keep the file as .jsx and add a sibling .d.ts declaring its props (include an index signature so extra props pass); do not enable allowJs. If the source is already TypeScript, skip this.
5. Replace TXT demo defaults (colors, copy, images) with tokens and repo content per the doc.
6. Add the tier behavior (full vs lite) per the doc.
7. Confirm `npm run build` passes, then run the QA skill for the section that uses it.
Do not modify the logic of the ported component beyond the props and styling the doc allows.
