/**
 * Kavirox Dynamic Studio Knowledge Base
 * Grounded in verified services, solutions, capabilities, delivery lifecycles, and contact workflows.
 */

export const STUDIO_IDENTITY = {
  name: "Kavirox",
  domain: "kavirox.space",
  tagline: "Technology and e-commerce studio helping consumer and D2C brands build faster online stores, automate customer messaging, and turn visitors into regular buyers.",
  headquarters: "GBU Incubation, Gautam Buddha University Campus, Greater Noida, Uttar Pradesh 201312, India",
  primaryEmail: "info@kavirox.space",
  socials: {
    linkedin: "https://www.linkedin.com/company/kavirox/posts/?feedView=all",
    instagram: "https://www.instagram.com/kavirox.space?stkn=encybWN2NTFhZ291",
  },
  mission: "Digital Systems & Growth Engineering. We build high-converting storefronts, conversational WhatsApp engines, and grounded RAG chatbots with precision code and no corporate fluff."
};

export const SERVICES_KNOWLEDGE = [
  {
    id: "01",
    title: "E-Commerce Experience & Store Optimisation",
    tagline: "Fast, conversion-focused shopping journeys designed for discovery and seamless buying.",
    deliverables: [
      "Product page refinement for rich storytelling and buying confidence",
      "Catalog search, smart tagging, and intelligent filtering",
      "Layering and bundle cross-selling optimization for higher AOV",
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
      "Clean semantic page architecture, metadata, and JSON-LD schema",
      "Third-party app audit to eliminate theme bloat and speed bottlenecks"
    ],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Shopify Storefront API"]
  },
  {
    id: "03",
    title: "Customer Experience & Guided Discovery",
    tagline: "Interactive product finders that guide shoppers to their ideal match in seconds.",
    deliverables: [
      "Interactive multi-step product match quizzes",
      "Sensory or category recommendation algorithms",
      "1-click add-to-cart bundles generated from quiz outcomes"
    ],
    tools: ["React", "Custom Algorithms", "Storefront API"]
  },
  {
    id: "04",
    title: "WhatsApp Conversational Commerce",
    tagline: "Direct customer communication channel for ordering, support, and cart recovery.",
    deliverables: [
      "Meta Cloud API integration with verified green tick support",
      "Automated cart recovery sequences with instant checkout links",
      "Real-time shipping notifications and live courier tracking alerts",
      "Smart keyword chatbots handling order status and FAQs 24/7"
    ],
    tools: ["Meta Cloud API", "n8n", "Webhooks", "Shopify Events"]
  },
  {
    id: "05",
    title: "Email & Retention Automation",
    tagline: "Automated customer email journeys that turn one-time buyers into repeat customers.",
    deliverables: [
      "Welcome series, post-purchase replenishment, and win-back flows",
      "RFM behavioral segmentation based on order recency and spend",
      "Automated review collection triggers with visual photo incentives"
    ],
    tools: ["Klaviyo", "Mailchimp", "Shopify Email"]
  },
  {
    id: "06",
    title: "Payments, Checkout & Order Flow",
    tagline: "Friction-free payments engineered for maximum checkout success.",
    deliverables: [
      "UPI deep-linking, cards, netbanking, and payment aggregator setup",
      "Automated Cash on Delivery (COD) OTP confirmation and address verification",
      "Smart RTO (Return to Origin) reduction workflows"
    ],
    tools: ["Razorpay", "Cashfree", "Shopify Checkout", "Shiprocket"]
  },
  {
    id: "07",
    title: "Customer Data, CRM & Analytics",
    tagline: "Clean, first-party data infrastructure without tracking drop-offs.",
    deliverables: [
      "GA4 e-commerce tracking with clean checkout funnels",
      "Meta Conversions API (CAPI) server-side event tracking",
      "Custom Looker Studio dashboards tracking CAC, LTV, and AOV"
    ],
    tools: ["GA4", "Meta CAPI", "Google Tag Manager Server", "Looker Studio"]
  },
  {
    id: "08",
    title: "SEO, Content & Organic Growth",
    tagline: "High-intent organic discovery that brings customers without paying for every click.",
    deliverables: [
      "Technical site audits, canonicalization, and crawl error fixes",
      "Structured product, breadcrumb, and organization Schema markup",
      "High-intent editorial templates and keyword strategy"
    ],
    tools: ["Google Search Console", "Schema.org", "GA4"]
  },
  {
    id: "09",
    title: "AI Personalisation & RAG Chatbots",
    tagline: "Custom RAG chatbots trained on your brand's actual product catalog and customer FAQs.",
    deliverables: [
      "Custom RAG (Retrieval-Augmented Generation) chatbots trained on store catalog, ingredients, FAQs, and policies",
      "24/7 conversational shopping assistants helping undecided buyers choose their ideal match",
      "Accurate, grounded answers without hallucinations, pulling verified product info directly from your store",
      "Automated customer support routing for shipping questions, order status, and returns",
      "Dynamic cross-sell suggestions based on customer preferences and pairings"
    ],
    tools: ["RAG Architecture", "Vector Embeddings", "OpenRouter / LLM APIs", "Storefront API", "n8n"]
  },
  {
    id: "10",
    title: "Security, Reliability & Technical Health",
    tagline: "Protecting your customer experience while keeping your storefront reliable and secure.",
    deliverables: [
      "Storefront, checkout, and API integration audits following OWASP guidelines",
      "Encrypted handling and privacy-first storage of customer and order data",
      "Continuous uptime, latency, and error monitoring",
      "Automated daily backups and disaster recovery protocols"
    ],
    tools: ["OWASP Standards", "HTTPS / TLS 1.3", "Cloudflare", "Sentry"]
  },
  {
    id: "11",
    title: "Growth Automation & Campaign Systems",
    tagline: "Connecting your store, marketing, messaging, and analytics into repeatable workflows.",
    deliverables: [
      "Event-driven campaign triggers based on customer actions and milestones",
      "Multi-platform customer synchronization between store, CRM, and WhatsApp",
      "Automated weekly performance reports delivered directly to stakeholders",
      "Custom webhook middleware connecting Shopify with proprietary business tools"
    ],
    tools: ["n8n", "Zapier", "Make", "Shopify Webhooks", "Slack Alerts"]
  }
];

export const SOLUTIONS_KNOWLEDGE = [
  {
    title: "Custom D2C Storefronts",
    subtitle: "Fast-Loading Stores Built to Turn Browsers into Regular Buyers",
    description: "Custom online stores using Shopify and modern web frameworks with mobile speed scores of 95+, rich storytelling, and instant UPI/COD.",
    impact: "+34% Average Order Value, -28% Checkout Drop-off"
  },
  {
    title: "WhatsApp & Omnichannel Engine",
    subtitle: "Automated Customer Conversations that Bring Buyers Back",
    description: "Direct WhatsApp engagement connected to your store with 90%+ open rates, automated cart recovery, and in-chat ordering.",
    impact: "+22% Cart Recovery Rate, <2 min Support Response Time"
  },
  {
    title: "RAG Brand Chatbots & Product Finders",
    subtitle: "Smart AI Assistants Trained on Your Brand's Catalog and FAQs",
    description: "Retrieval-Augmented Generation (RAG) conversational agents trained strictly on verified store data, answering product and policy questions 24/7 without hallucinations.",
    impact: "85% First-Contact Resolution, +18% Quiz-to-Checkout Conversion"
  },
  {
    title: "Server-Side Telemetry & Retention Pipeline",
    subtitle: "Accurate Ad Tracking and Customer Analytics for Profitable Scaling",
    description: "Server-side Meta CAPI and GA4 tracking resilient to iOS ad blockers, feeding real-time Looker Studio dashboards.",
    impact: "+38% Attribution Accuracy, 0% Third-Party Tracking Drop"
  }
];

export const CAPABILITIES_KNOWLEDGE = {
  engagementModels: [
    {
      name: "Project-Based Sprint",
      subtitle: "Fixed Scope, Rapid Delivery",
      description: "Ideal for store redesigns, new storefront launches, custom RAG chatbot builds, or specific system integrations. Features defined scope, milestone sprints, and fixed delivery timelines."
    },
    {
      name: "Dedicated Growth Team",
      subtitle: "Monthly Retainer",
      description: "A full engineering and optimization squad embedded directly with your brand team. Continuous sprints, dedicated Slack channel, weekly deployments, and proactive CRO."
    },
    {
      name: "Technical Advisory & Support",
      subtitle: "On-Demand Systems",
      description: "Architecture audits, uptime assurance, technical escalation support, and quarterly growth roadmaps for established brands needing senior engineering guidance."
    }
  ],
  deliveryLifecycle: [
    "01 Discovery & Strategy: Deep dive into catalog, tech stack, and customer bottlenecks",
    "02 UX & Architecture: User journey wireframes, data flows, and tech blueprint",
    "03 Rapid Engineering: Agile sprint cycles with transparent code reviews and live staging previews",
    "04 Rigorous QA & Testing: Cross-device testing, payment sandbox audits, speed benchmarks, and security checks",
    "05 Production Deployment: Zero-downtime cutover, DNS propagation, and server telemetry verification",
    "06 Continuous Optimisation: Post-launch monitoring, conversion analytics, and iterative improvements"
  ]
};

export function buildStudioSystemPrompt(): string {
  const servicesList = SERVICES_KNOWLEDGE.map(
    s => `- Service ${s.id}: ${s.title} — ${s.tagline} (Tools: ${s.tools.join(", ")})`
  ).join("\n");

  const solutionsList = SOLUTIONS_KNOWLEDGE.map(
    s => `- ${s.title}: ${s.description} (Impact: ${s.impact})`
  ).join("\n");

  const modelsList = CAPABILITIES_KNOWLEDGE.engagementModels.map(
    m => `- ${m.name} (${m.subtitle}): ${m.description}`
  ).join("\n");

  return `You are the official AI Concierge for Kavirox (kavirox.space).
You represent Kavirox Studio directly to brand founders, marketing leads, and e-commerce operators who visit the website.

KAVIROX PROFILE:
- Name: Kavirox Studio
- Website: kavirox.space
- Mission: Digital Systems & Growth Engineering for consumer & D2C brands.
- Location: GBU Incubation, Gautam Buddha University Campus, Greater Noida, UP 201312, India.
- Inquiries Email: info@kavirox.space

TONE & PERSONALITY:
- Clear, grounded, conversational, friendly, and expert.
- Avoid corporate buzzwords and artificial hype. Speak like a sharp senior engineer / product builder who understands D2C reality.
- Keep responses concise, organized with clean bullet points, and directly answer the visitor's question.

CORE CAPABILITIES & SERVICES:
${servicesList}

TURNKEY SOLUTIONS:
${solutionsList}

ENGAGEMENT MODELS:
${modelsList}

RAG CHATBOT EXPERTISE:
- When visitors ask about RAG (Retrieval-Augmented Generation) chatbots, explain that Kavirox builds custom AI shopping assistants and support chatbots trained directly on their verified brand catalog, ingredients, FAQs, and store policies.
- Emphasize that Kavirox RAG chatbots eliminate hallucinations by retrieving verified product data directly from their store, answer customer inquiries 24/7, and generate instant 1-click cart links.

HOW VISITORS CAN WORK WITH KAVIROX:
- Explain that Kavirox provides a pre-written project brief template on the website.
- When they are interested in starting a project, getting a proposal, or discussing their store, let them know they can click the "Start Project" or "Email Us" button on the site or send an inquiry to info@kavirox.space.
- If appropriate, invite them to share their store URL or project scope so you can give tailored advice right here in the chat!

Keep your answers helpful, focused, and under 180 words per message unless the user asks for deep technical details.`;
}
