# 03 — Products and projects catalogue (content for the site)

Use these records as the only source for the Products/Projects section and detail pages. Source: Kavirox Master Company Profile (7 Nov 2026), the Study Hub system manual, and the project repos' own README files. Lifecycle badges must match. Where a field says CONFIRM, show the safe wording given and log the item in DECISIONS-V2.md.

Common detail-page fields: slug, name, one-line, category, status badge, problem, what it does, feature groups, users, tech stack, what is not included yet, screens (if any), call to action.

---
## 1. Rakshak Setu (slug: rakshak-setu) — Mobile cybersecurity
Ownership note: the company profile says not to list Rakshak Setu as a Kavirox product until ownership is confirmed; the repo is Team Forge Labs, Apache-2.0, Smart India Hackathon 2026. The owner stated in chat (7 Nov 2026) that these are Kavirox professional projects, so it is shown, with the attribution line, and flagged in DECISIONS-V2.md.
- Status badge: **Prototype with working modules** (CONFIRM final wording).
- One-line: An on-device voice shield that warns you during suspicious calls, built to counter AI voice cloning and phone-scam impersonation.
- Problem: Scammers use cloned voices and pressure scripts (fake officials, "digital arrest" threats, family emergencies, bank and parcel fraud). People get little help in the moment of the call.
- What it does (from the project's own README): listens for scam indicators locally on the phone, shows a live threat HUD during a call, produces an evidence record you can use for reporting, scans links and QR codes, and offers a path to report to the national cyber-crime portal. Designed so raw call audio is processed in memory and not stored.
- Feature groups: Live call protection (threat HUD, safe-call indicator, system heads-up alerts); Evidence and reports (forensic evidence dossier, report audit); Scanners (links and QR codes); Reporting help (1930 / NCRP co-pilot); Simulation lab (voice-clone simulation for demos).
- Screens (in `assets/projects/rakshak-setu/`): 01_in_call_threat_hud, 03_defense_dashboard, 02_forensic_evidence_dossier, 04_forensic_reports_audit, 08_url_qr_threat_scanner, 06_ncrp_1930_copilot, 09_voice_clone_lab_simulation, 10_system_heads_up_notification.
- Tech (README): Android (Kotlin), on-device ML models, speech recognition, local processing.
- Attribution line on the detail page, small: "Built by Team Forge Labs, Gautam Buddha University. Smart India Hackathon 2026 project." (CONFIRM ownership with the owner before removing.)
- Do NOT claim: detection accuracy figures, universal call-audio support, legal admissibility, or "India's first". Do state: call-audio access depends on Android version and device.
- Caveat line: "Call-audio access varies by Android version and device."

## 2. GBU One and GBU One Admin (slug: gbu-one) — University companion
- Status badge: **Built and device-tested** (CONFIRM public release state; do not say "official GBU app").
- One-line: An offline-first student companion for Gautam Buddha University, with a separate admin console for publishing.
- Problem: Timetables, notices, exam schedules and previous-year papers are scattered across portals and chat groups; access is poor when the network is.
- Student app: onboarding by school, programme, semester and section; home dashboard with next class and countdown; timetable with room-shift badges and local class alarms; notices with filters, search and offline PDF caching; PYQ library with filters, downloads and contributor leaderboard; exam datesheet and countdown; academic calendar; campus events and gallery; GBU Mail shortcut; attendance tracker ("Attendance Battery"); guest mode works without an account.
- Admin app (separate package, PIN-gated): publish events and gallery, moderate PYQ uploads, publish notices and datesheets, broadcast required app updates, audit records.
- Screens (`assets/projects/gbu-one/`): screen_tecno_student_app, screen_tecno_events_fixed, screen_verification_pyq, screen_tecno_admin_lock, screen_tecno_admin_gallery_tools, screen_admin_auto_update.
- Tech (README): Expo / React Native, TypeScript, SQLite offline cache, Supabase backend, push notifications.
- Do NOT claim: GBU endorsement; user counts.

## 3. Study Hub AI (slug: study-hub) — Campus study assistant on WhatsApp and Telegram
- Status badge: **Campus pilot** (CONFIRM).
- One-line: A study assistant that lives where students already are, WhatsApp and Telegram, and answers from the university's own syllabus, papers and notes.
- Problem: Official portals are slow to navigate; generic AI does not know your professor, your syllabus or your exam pattern.
- What it does (from the system manual): students message the bot to get study material and answers grounded in a local library of university content (retrieval-augmented), with fallbacks across several AI providers so it keeps answering if one is down; contributors can add material and appear on a leaderboard; admins manage content from a dashboard.
- Feature groups: Ask in chat (WhatsApp, Telegram); Local knowledge base (syllabus, past papers, notes); Resilient AI routing; Community contributions and leaderboard; Admin dashboard.
- Screens: none supplied. Use the designed mock state (see doc 04 "No-screenshot products") with a chat-style illustration built from CSS; no fabricated UI that pretends to be a real screenshot.
- Tech chips (public): Node.js, Express, SQLite, WhatsApp and Telegram bot interfaces, retrieval layer, multiple AI providers. (Do not name the unofficial WhatsApp client library.)
- Team line: "Built by Team Forge Labs." The company profile does not list Study Hub; ownership is stated by the owner in chat (CONFIRM).
- Do NOT claim: user counts, uptime, response-time numbers.

## 4. FitFuel (slug: fitfuel) — Calorie and workout tracker
- Status badge: **In development** (core tracking, workout library and settings working; AI features paused; release date to confirm).
- One-line: A mobile-first calorie and workout tracker meant to keep the core tools free.
- What it does today (team brief): daily calorie ring and macro targets, manual food and barcode entry, water tracking, workout library by muscle group, progress view, settings, imperial and metric units.
- Not yet: photo-based food analysis (paused). Show it under "Coming later" with a muted label, never as live.
- Platform wording: "Mobile-first web app" (not a native app). Barcode feature is "manual barcode entry".
- Safe wording: "A tracking and guidance tool, not medical advice." Do not say "free forever"; say "built to keep core tracking free".
- Screens: none supplied. Mock state.

## 5. Try-Out (slug: try-out) — Virtual fashion try-on
- Status badge: **In development** (public preview page exists).
- One-line: A virtual fashion try-on experience for visual exploration before you buy.
- Safe wording only: "Preview how an outfit could look." Do not claim exact fit, size recommendation, AR, or AI method (unconfirmed).
- Screens: capture 3 to 4 screenshots yourself from the live preview (`https://try-out.antideploy.app/`) using the browser tool, desktop and phone width; this is the owner's own product page. If capture fails, use the mock state.
- External link: a quiet "Open link" button to that URL (allowed; it is not GitHub). Deployment state is unconfirmed (CONFIRM); if the URL fails to load during QA, remove the button and log it.

## 6. LAPS One (slug: laps-one) — Event management
- Status badge: **In development**.
- One-line: An event-management platform in development.
- Nothing else is confirmed. Show only name, category and status. Do not list registration, ticketing, payments, QR or analytics. It gets a MINIMAL detail page (name, category, status badge, one line, "Where this stands", CTA) using the same route and transition, so all seven cards behave the same.

## 7. GBU Student Data Management System (slug: gbu-sdsm) — Institutional records
- Status badge: **Specified** (CONFIRM whether any module is built; the profile describes a specification).
- One-line: A role-based platform for student records, attendance and academic administration.
- Roles: administrator, coordinator, school chairperson, faculty, student; each sees only what their role allows.
- Capabilities (spec): central student records, class structure and enrollment, faculty assignments, digital attendance with session locking, timetables, messaging and notifications, bulk roster import from Excel, audit records.
- Do not claim institutional adoption or GBU endorsement. Screens: none. Mock state.

## Display order
Featured first: Rakshak Setu, GBU One, Study Hub AI. Then GBU-SDSM, FitFuel, Try-Out, LAPS One.

## Status badge styles
Prototype / In development / Campus pilot / Built and device-tested: pill, mono 12px, with a small dot; colors from tokens (primary for built, amber-neutral for in development, never red). Always visible on cards and detail pages.
