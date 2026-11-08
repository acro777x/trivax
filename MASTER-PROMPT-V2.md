# Master prompt for Antigravity, Round 2 (paste as the first message)

```
You are continuing the Kavirox.space front-end redesign (Kavirox is spelled with a K). Round 1 is already built on branch redesign/v2. This Round 2 pack is unzipped in the workspace root. It fixes what is wrong, adds the company's new product-led positioning, a Products section with animated detail pages, a liquid-glass header, the real logo, and a proper preloader.

AUTHORITY
1. Read AGENTS.md and .agents/rules/ first. Then follow docs/redesign-v2/ in the order given in AGENTS.md; docs 14 (typography), 15 (motion), 16 (devices), 17 (section repairs), 18 (copy) and 19 (element selection) are the detailed authority. Where v2 conflicts with docs/redesign/, v2 wins. Do not do anything not covered; log choices in docs/redesign-v2/DECISIONS-V2.md.
2. Use the UI elements from kavirox_ui_elemnts.txt per docs/redesign-v2/11-element-by-element.md (line ranges given). Do not rewrite them from memory.
3. Content comes only from docs/redesign-v2/02 and 03. No invented features, stats, clients or prices. Show honest status badges. No GitHub links anywhere on the site. No "//" ornament anywhere.
4. Product screenshots are in assets/projects/<slug>/. Use them in phone mocks as specified. For products without screenshots use the illustrated mock states, never fake screenshots.
5. Continue on branch redesign/v2. Never push.

EXECUTION ORDER
0. Before coding, reread 14-19 and write docs/redesign-v2/PLAN-V2.md listing each section, its elements, its motion and its mobile behavior in your own words (one paragraph per section).
A. Fix foundations that block everything: remove every "//" ornament; add the real logo assets (07); build the liquid-glass header on desktop and mobile (06); rebuild the preloader (07).
B. Hero v2 centered composition with the new copy and the stroke-text clipping fix (05).
C. Products section, data module and the 7 detail pages with the scene-opening transition (03, 04).
D. How-you-can-work-with-us, Services, Solutions, Process, About, FAQ, Contact, Footer fixes (05, 08, 09).
E. Metadata and chatbot knowledge sync (17, S13). Then mobile pass and the "not AI-generated" polish checklist (10).
F. Element-by-element sweep (11), then QA v2 (12).

VERIFY AFTER EVERY STEP
Use the kavirox-v2-qa skill. Real-GPU Chrome. Screenshots at 390, 768, 1280, 1440, 1920. Compare with the acceptance list in 00-read-first-v2.md. Log in QA-LOG-V2.md. Maximum 4 fix loops per section, then log what remains and move on. npm run build must pass after each step.

START NOW. First reply: (a) a 10-line plan, (b) any instruction you find contradictory or unclear, (c) confirmation that you will stay within the docs. Then begin step A without waiting, unless (b) lists a blocker.
```
