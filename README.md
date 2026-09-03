# KAVIROX (kavirox.space)

> **Building Secure. Intelligent. Impactful. Digital Solutions.**

Official production repository for **KAVIROX** (kavirox.space).

## Overview
KAVIROX delivers end-to-end digital solutions across:
- **AI/ML & NLP Research**: Published architectures at ACM MM 2025 and ACL 2025.
- **Cybersecurity & VAPT**: Offensive security frameworks (AcroMap, AcroStrike) and zero-trust engineering.
- **Hardware & IoT Systems**: Encrypted offline captive portal mesh communicators (Ghost Chat).
- **Web & Product Engineering**: Responsive obsidian glassmorphic applications with 21st.dev micro-interactions.
- **Digital Growth**: SEO, brand identity, and continuous operations support.

## Key Features
- **Multi-Language Engine**: Dynamic client-side internationalization (English, Spanish, Hindi).
- **Live GitHub Repository Index**: Real-time stats and search integration across organizations.
- **Interactive Case-Study Modals**: Deep dives with technical architecture diagrams.
- **Live Number Counter**: Smooth cubic-bezier count-up animations for key metrics.
- **Scroll-Reveal Animations**: Staggered entrance physics for battle-log contest wins.
- **Virtual AI Assistant**: 24/7 client concierge chatbot widget.

## Tech Stack
- **Backend**: Node.js & Express in **TypeScript** (`server/src/`)
- **Frontend**: **Vite** & Modular **TypeScript** (`src/`)
- **Styling**: Obsidian glassmorphism design system & micro-interactions (`style.css`)
- **Deployment**: Node.js server with clean SPA routing and static bundle serving

## Quick Start
```bash
# Install dependencies
npm install

# Run fullstack development (Vite frontend + Express Node.js backend)
npm run dev

# Run Node.js TypeScript server directly
npm run dev:server

# Build for production
npm run build

# Start production server
npm start
```

## Directory Structure
```
+-- package.json                 # Project dependencies and fullstack scripts
+-- tsconfig.json                # Root TypeScript configuration
+-- tsconfig.server.json         # Node.js backend TypeScript configuration
+-- vite.config.ts               # Vite bundler and dev server configuration
+-- index.html                   # Core semantic landing page (loads /src/main.ts)
+-- style.css                    # Obsidian design system & animations
+-- src/                         # Client-side TypeScript application
|   +-- main.ts                  # Application entry point & module bootstrapper
|   +-- types/client.ts          # Typed contracts (GitHub, translations, modals)
|   +-- modules/                 # Modular feature controllers
|       +-- preloader.ts         # Loading screen & hero typewriter
|       +-- theme.ts             # Dark/Light theme manager
|       +-- router.ts            # Clean SPA routing & scroll-spy
|       +-- counter.ts           # Easing count-up metric numbers
|       +-- timeline.ts          # Battle log scroll entrance observer
|       +-- i18n.ts              # Multi-language translation engine
|       +-- spotlight.ts         # 3D tilt & mouse spotlight effects
|       +-- projects.ts          # Categorization filters
|       +-- github.ts            # Live GitHub API showcase
|       +-- faq.ts               # Interactive FAQ accordion
|       +-- modal.ts             # Technical case-study dossiers
|       +-- chatbot.ts           # AI Virtual Assistant client widget
|       +-- contact.ts           # Executive inquiry validation & email generator
+-- server/                      # Node.js TypeScript Backend
|   +-- src/
|       +-- server.ts            # Express server application & SPA route resolver
|       +-- config.ts            # Typed environment configuration
|       +-- types/api.ts         # API request/response types
|       +-- routes/
|           +-- chat.ts          # /api/chat OpenRouter integration & OWASP LLM guardrails
|           +-- health.ts        # /api/health diagnostic status check
+-- assets/                      # Diagrams, illustrations, and media assets
```

## Contact & Transmission
- **Domain**: [kavirox.space](https://kavirox.space)
- **Email**: info@kavirox.space
- **Phone**: +91 95484 25711
- **Headquarters**: Greater Noida, Uttar Pradesh, India
