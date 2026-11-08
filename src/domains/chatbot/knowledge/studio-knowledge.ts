/**
 * Kavirox Dynamic Studio Knowledge Base (Round 2 Sync)
 * Grounded in verified products, services, solutions, and company profile.
 */

export const STUDIO_IDENTITY = {
  name: "Kavirox",
  domain: "kavirox.space",
  tagline: "Products that solve problems. Technology that moves businesses forward.",
  brandLine: "BUILD. SECURE. GROW.",
  headquarters: "Incubated at AIC-GBU, Greater Noida, Uttar Pradesh 201312, India",
  primaryEmail: "info@kavirox.space",
  socials: {
    linkedin: "https://www.linkedin.com/company/kavirox",
    instagram: "https://www.instagram.com/kavirox.space",
  },
  mission: "Kavirox is a product-led technology company building digital products and delivering technology services across SaaS and product development, custom software, web and mobile applications, AI and automation, e-commerce systems, cybersecurity, cloud and DevOps, and digital growth."
};

export const PRODUCTS_KNOWLEDGE = [
  {
    name: "Rakshak Setu",
    slug: "rakshak-setu",
    status: "Prototype with working modules",
    tagline: "An on-device voice shield that warns you during suspicious calls.",
    description: "Built to counter AI voice cloning and phone-scam impersonation. Listens for scam indicators locally on the phone, shows a live threat HUD during calls, and produces evidence records for reporting."
  },
  {
    name: "GBU One & GBU One Admin",
    slug: "gbu-one",
    status: "Built and device-tested",
    tagline: "An offline-first student companion for Gautam Buddha University.",
    description: "Consolidates timetables, notices with offline PDF caching, previous-year question papers, exam datesheets, and attendance tracking, with a PIN-gated admin console for university updates."
  },
  {
    name: "Study Hub AI",
    slug: "study-hub",
    status: "Campus pilot",
    tagline: "Campus study assistant on WhatsApp and Telegram.",
    description: "Answers student queries grounded in university syllabus, exam patterns, and notes using retrieval-augmented generation with multi-provider fallbacks."
  },
  {
    name: "FitFuel",
    slug: "fitfuel",
    status: "In development",
    tagline: "Mobile-first calorie and workout tracker.",
    description: "Built to keep core tracking free. Features daily calorie and macro targets, manual food and barcode entry, water tracking, and a workout library by muscle group."
  },
  {
    name: "Try-Out",
    slug: "try-out",
    status: "In development",
    tagline: "Virtual fashion try-on experience.",
    description: "Allows shoppers to preview how an outfit could look before purchasing for visual exploration."
  },
  {
    name: "LAPS One",
    slug: "laps-one",
    status: "In development",
    tagline: "Modern event management platform.",
    description: "In active development for streamlined event coordination and administration."
  },
  {
    name: "GBU Student Data Management System",
    slug: "gbu-sdsm",
    status: "Specified",
    tagline: "Role-based platform for student records and administration.",
    description: "Role-based architecture for administrators, coordinators, faculty, and students to manage central academic records, digital attendance with session locking, and roster imports."
  }
];

export const WORK_WAYS_KNOWLEDGE = [
  {
    title: "Ready-built product",
    description: "Choose a Kavirox product that already addresses the main need. We explain scope, setup, limits, data handling, support and price."
  },
  {
    title: "Product implementation",
    description: "We configure, onboard users, connect data, set permissions, integrate with your platforms and train your team."
  },
  {
    title: "Custom development",
    description: "For needs no product covers: websites, applications, SaaS modules, integrations, automation, dashboards."
  },
  {
    title: "Product plus custom extension",
    description: "Start from a product and commission extra modules or integrations. We separate what is standard from what is custom."
  }
];

export const SERVICES_KNOWLEDGE = [
  {
    id: "01",
    title: "E-Commerce Experience & Store Optimisation",
    tagline: "Fast, conversion-focused shopping journeys designed for discovery and friction-free buying.",
    deliverables: [
      "Product page refinement for rich storytelling and buying confidence",
      "Catalog search, smart tagging, and intelligent filtering",
      "Cart & checkout UX improvements, COD verification, and payment trust signals",
      "Mobile-first shopping experiences with minimal drop-off"
    ],
    tools: ["Shopify", "Liquid", "Headless Next.js", "React", "Tailwind CSS"]
  },
  {
    id: "02",
    title: "Website Development & Performance",
    tagline: "Polished, responsive, SEO-ready digital storefront engineered for speed.",
    deliverables: [
      "Custom brand storytelling components and review showcases",
      "Core Web Vitals tuning across scripts, images, and fonts",
      "Clean semantic page architecture, metadata, and JSON-LD schema"
    ],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Vite"]
  },
  {
    id: "03",
    title: "WhatsApp Conversational Commerce",
    tagline: "Direct customer communication channel for ordering, support, and cart recovery.",
    deliverables: [
      "Meta Cloud API integration with verified green tick support",
      "Automated cart recovery sequences with instant checkout links",
      "Real-time shipping notifications and live courier tracking alerts"
    ],
    tools: ["Meta Cloud API", "n8n", "Webhooks"]
  },
  {
    id: "04",
    title: "AI Personalisation & RAG Chatbots",
    tagline: "Custom RAG chatbots trained on verified catalogues and knowledge bases.",
    deliverables: [
      "Custom RAG chatbots grounded in verified documentation, FAQs, and policies",
      "Conversational discovery assistants answering queries accurately without hallucination",
      "Automated customer support routing"
    ],
    tools: ["RAG Architecture", "Vector Embeddings", "LLM APIs", "n8n"]
  },
  {
    id: "05",
    title: "Security, Reliability & Technical Health",
    tagline: "Protecting systems with scoped authorization, access control, and proactive auditing.",
    deliverables: [
      "Scoped VAPT security assessments performed with authorization",
      "Encrypted handling and privacy-first storage of customer and order data",
      "Uptime, latency, and error monitoring"
    ],
    tools: ["OWASP Standards", "HTTPS / TLS 1.3", "Cloudflare", "Sentry"]
  }
];

export function buildStudioSystemPrompt(): string {
  const productsList = PRODUCTS_KNOWLEDGE.map(
    p => `- ${p.name} [Status: ${p.status}]: ${p.tagline} — ${p.description}`
  ).join("\n");

  const workList = WORK_WAYS_KNOWLEDGE.map(
    w => `- ${w.title}: ${w.description}`
  ).join("\n");

  const servicesList = SERVICES_KNOWLEDGE.map(
    s => `- ${s.title}: ${s.tagline} (Tools: ${s.tools.join(", ")})`
  ).join("\n");

  return `You are the official AI Assistant for Kavirox (kavirox.space).
You represent Kavirox directly to visitors, founders, and engineering teams.

KAVIROX PROFILE:
- Positioning: Product-led technology company with services.
- Brand line: BUILD. SECURE. GROW.
- Tagline: Products that solve problems. Technology that moves businesses forward.
- Incubation: Incubated at AIC-GBU, Greater Noida, India.
- Inquiries Email: info@kavirox.space

OUR 7 PRODUCTS & PLATFORMS:
${productsList}

FOUR WAYS TO WORK WITH US:
${workList}

SERVICES WE DELIVER:
${servicesList}

STRICT GUIDELINES:
- Honest claims only. Never promise 100% security, zero hallucinations, or guaranteed rankings/sales.
- VAPT is always "scoped assessment performed with authorization".
- Real product statuses: prototype, in development, or built/live. Never claim unfinished work is live.
- Direct contact: visitors can click "Discuss a project" or "Ask about a product" on the site, or email info@kavirox.space.
- Tone: concrete, direct, polite, engineering-grounded, no hype words (revolutionary, seamless, cutting-edge).
- Keep answers under 150 words per message unless deep technical details are explicitly requested.
- NEVER mention third-party AI keys, OpenRouter, or internal model configurations.`;
}
