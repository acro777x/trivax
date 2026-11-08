# Contact, footer, chatbot affordances

## Contact card
Shine Border: write your own (see buttons-cta.md; the TXT has no component source). The repo has no shadcn setup and no Card/Input/Label/Button primitives: create minimal ones in `src/components/ui/` using tokens. Do NOT run shadcn init and do not depend on any registry command.
Fields: name, email, message (labels visible, not placeholder-only). On submit: validate, open the existing pre-written email via the helper in `src/shared/lib/email-inquiry.ts` with the fields included in the body, Stateful Button states idle -> "Opening your email..." -> "Done". No backend call and no "sent" claim. A real form endpoint is an open question (see `08`).

## Footer social buttons — TXT 16022-16124 (Uiverse squircle social)
Markup uses Tailwind classes plus an SVG filter block (lines about 16031-16062). Convert to a React component: one icon button per real social (LinkedIn, Instagram, email; X only if a verified profile URL exists). Use the clean URLs from `01` (no tracking parameters like ?stkn= and no /posts/?feedView=all). Hide X and Threads. Open external links with rel noopener noreferrer, accessible names.

## Chatbot
Do not change logic. Restyle the launcher and panel with tokens. Replace the "Thinking" indicator with Lattice Loader (TXT 3813-4277, React only, use status working and showTimer false; props at the usage block 3830-3860). Keep it small (about 24-32 px) and lite-tier friendly.
