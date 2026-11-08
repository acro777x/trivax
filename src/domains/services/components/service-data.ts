import React from 'react';
import { 
  ShoppingBag, 
  Code2, 
  Sparkles, 
  MessageSquareCode, 
  Mail, 
  CreditCard, 
  BarChart3, 
  Search, 
  Bot, 
  ShieldCheck, 
  Workflow 
} from 'lucide-react';

export interface ServiceLine {
  id: string;
  number: string;
  category: 'commerce' | 'automation' | 'data-ai' | 'engineering';
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
  tools: string[];
}

export const serviceLines: ServiceLine[] = [
  {
    id: "ecommerce-ux",
    number: "01",
    category: "commerce",
    title: "E-Commerce Experience & Store Optimisation",
    tagline: "Creating a premium, fast, conversion-focused shopping experience for brand discovery and purchase.",
    icon: ShoppingBag,
    deliverables: [
      "Product page refinement for rich storytelling, ingredient/notes clarity, and buying confidence",
      "Catalog collection, search, and intelligent filtering journeys",
      "Layering and bundle cross-selling optimization for higher Average Order Value (AOV)",
      "Cart & checkout UX improvements, COD verification, and payment trust signals",
      "Mobile-first shopping journeys engineered for fast browsing with minimal drop-off",
      "High-converting campaign landing pages for seasonal offers, drops, and gifting"
    ],
    tools: ["Shopify", "Liquid", "Headless Next.js", "React", "Tailwind CSS", "Hotjar"]
  },
  {
    id: "web-dev",
    number: "02",
    category: "engineering",
    title: "Website Development & Performance",
    tagline: "A polished, responsive, SEO-ready digital storefront designed to feel as premium as the brand itself.",
    icon: Code2,
    deliverables: [
      "Custom components and sections for brand storytelling, reviews, and gifting",
      "Core Web Vitals and performance tuning across images, scripts, fonts, and third-party apps",
      "Technical enhancements to navigation, catalog discovery, cart, and customer accounts",
      "Clean semantic page structures, metadata, JSON-LD schema, and indexation support",
      "Third-party integrations and APIs for marketing, analytics, CRM, and fulfillment",
      "Ongoing website maintenance, bug fixes, feature sprints, and platform upgrades"
    ],
    tools: ["Shopify", "Liquid", "Next.js", "TypeScript", "Node.js", "REST APIs", "GraphQL"]
  },
  {
    id: "cx-discovery",
    number: "03",
    category: "commerce",
    title: "Customer Experience & Guided Discovery",
    tagline: "Helping visitors discover their exact match faster while making the buying journey feel personal and premium.",
    icon: Sparkles,
    deliverables: [
      "Interactive product & scent finders based on mood, occasion, notes, and personal preference",
      "Dynamic product recommendations and complementary combo suggestions",
      "Product layering guidance that helps customers discover unique combinations",
      "Curated gift discovery journeys for birthdays, anniversaries, and festive celebrations",
      "Interactive customer education around notes, craftsmanship, and longevity",
      "Post-purchase journeys encouraging reviews, discovery of complementary products, and repeat orders"
    ],
    tools: ["Recommendation Logic", "Shopify Storefront API", "Analytics Events", "AI Discovery"]
  },
  {
    id: "whatsapp-automation",
    number: "04",
    category: "automation",
    title: "WhatsApp Automation & Conversational Commerce",
    tagline: "Turning WhatsApp into a premium sales, retention, and order-communication channel.",
    icon: MessageSquareCode,
    deliverables: [
      "Official WhatsApp Business Platform integration for customer enquiries and catalog discovery",
      "Automated order confirmations, shipping updates, and real-time delivery notifications",
      "High-recovery abandoned cart and browse abandonment flows with customer consent",
      "Conversational recommendation flows and guided finders directly inside WhatsApp",
      "Promotional launch campaigns and repeat-purchase triggers with opt-in compliance",
      "Direct human hand-off routing for enquiries requiring concierge support"
    ],
    tools: ["WhatsApp Business Platform", "Meta Cloud API", "Shopify Webhooks", "n8n", "Zapier"]
  },
  {
    id: "email-retention",
    number: "05",
    category: "automation",
    title: "Email & Retention Automation",
    tagline: "Building personalized lifecycle communication that turns first-time buyers into loyal returning customers.",
    icon: Mail,
    deliverables: [
      "Welcome series, brand storytelling, and first-purchase incentive journeys",
      "Multi-stage abandoned-cart and checkout recovery email sequences",
      "Transactional shipping, fulfillment, and post-delivery follow-ups",
      "Automated review requests and user-generated content (UGC) collection",
      "Cross-sell, replenishment, and combo recommendations based on purchase history",
      "Win-back, birthday, and seasonal gifting campaigns with dynamic audience segmentation"
    ],
    tools: ["Klaviyo", "Shopify Email", "Webhooks", "n8n", "Customer CRM"]
  },
  {
    id: "payments-checkout",
    number: "06",
    category: "commerce",
    title: "Payments, Checkout & Order Flow",
    tagline: "Making the path from discovery to completed order as frictionless and trustworthy as possible.",
    icon: CreditCard,
    deliverables: [
      "Payment gateway checkout UX review, speed optimization, and error rate reduction",
      "Frictionless support for UPI, Credit/Debit Cards, NetBanking, Wallets, and COD",
      "Checkout trust signals, security seals, and automated payment-failure recovery triggers",
      "Order confirmation, tracking link delivery, and SMS/WhatsApp status sync",
      "Automated refund, cancellation, and inventory reconciliation workflows",
      "Shipping aggregator and logistics API integrations (Shiprocket, Delhivery, etc.)"
    ],
    tools: ["Razorpay", "Cashfree", "Shopify Payments", "Logistics APIs", "Webhooks"]
  },
  {
    id: "analytics-crm",
    number: "07",
    category: "data-ai",
    title: "Customer Data, CRM & Analytics",
    tagline: "Turning customer and store activity into actionable insight for better decisions and stronger retention.",
    icon: BarChart3,
    deliverables: [
      "Clean unified data structures across storefront, marketing, and support channels",
      "Customer segmentation by purchase behavior, product preferences, and lifecycle stage",
      "Comprehensive BI dashboards for traffic, conversion rate, AOV, LTV, and repeat purchase rate",
      "Server-side event tracking across product views, add-to-cart, checkout steps, and reviews",
      "Cohort and customer retention analysis to identify repeat buying patterns",
      "Data privacy, access governance, automated backups, and secure customer handling"
    ],
    tools: ["Google Analytics 4 (GA4)", "Google Tag Manager", "Meta CAPI", "Looker Studio", "PostgreSQL"]
  },
  {
    id: "seo-growth",
    number: "08",
    category: "commerce",
    title: "SEO, Content & Organic Growth",
    tagline: "Making your brand easier to discover while establishing authority around product education.",
    icon: Search,
    deliverables: [
      "Technical SEO audit covering indexing, crawlability, canonicals, and site architecture",
      "Comprehensive product, review, and collection structured JSON-LD schema markup",
      "Search-focused educational content around ingredients, usage, gifting, and occasions",
      "Strategic internal linking between product catalogs, collections, and buying guides",
      "Editorial blog enhancement designed to attract high-intent organic shoppers",
      "Continuous tracking of organic rankings, search impressions, and organic revenue"
    ],
    tools: ["Google Search Console", "GA4", "Schema.org", "Ahrefs / SEMrush", "Shopify Blog"]
  },
  {
    id: "ai-personalisation",
    number: "09",
    category: "data-ai",
    title: "AI Personalisation & RAG Chatbots",
    tagline: "Custom RAG chatbots and smart shopping assistants trained on your brand's actual product catalog and customer FAQs.",
    icon: Bot,
    deliverables: [
      "Custom RAG (Retrieval-Augmented Generation) chatbots trained on your brand catalog, ingredients, FAQs, and store policies",
      "24/7 conversational shopping assistants helping undecided buyers choose their ideal match",
      "Accurate, grounded answers without hallucinations, pulling verified product info directly from your store",
      "Automated customer support routing for shipping questions, order status, and returns",
      "Dynamic cross-sell suggestions based on customer preferences and product pairings",
      "Customer review and feedback analysis to discover recurring preferences and buying habits"
    ],
    tools: ["RAG Architecture", "Vector Embeddings", "OpenAI / Claude APIs", "Storefront API", "n8n"]
  },
  {
    id: "security-health",
    number: "10",
    category: "engineering",
    title: "Security, Reliability & Technical Health",
    tagline: "Protecting your customer experience while keeping the digital storefront reliable, secure, and maintainable.",
    icon: ShieldCheck,
    deliverables: [
      "Storefront, checkout, and API integration security audits following OWASP guidelines",
      "Role-based access control and account-permission reviews across connected platforms",
      "Encrypted handling and privacy-first storage of customer, order, and payment data",
      "Continuous uptime, API latency, broken journey, and error monitoring",
      "Automated daily backups, disaster recovery protocols, and incident response procedures",
      "Third-party app and plugin security risk assessments to prevent bloat and vulnerabilities"
    ],
    tools: ["OWASP Standards", "HTTPS / TLS 1.3", "Cloudflare", "Sentry", "Uptime Monitoring"]
  },
  {
    id: "growth-automation",
    number: "11",
    category: "automation",
    title: "Growth Automation & Campaign Systems",
    tagline: "Connecting store, marketing, customer communication, and analytics into repeatable growth workflows.",
    icon: Workflow,
    deliverables: [
      "End-to-end campaign automation spanning email, WhatsApp, discounts, and landing pages",
      "High-converting seasonal drop strategies, product teasers, and VIP early access funnels",
      "Automated customer loyalty tiers, referral journeys, and brand advocate recognition",
      "Syncing ad audience segments between Shopify, Meta Ads, and Google Customer Match",
      "Automated real-time inventory notifications and low-stock urgency alerts",
      "Performance reporting cadences aligning merchandising, marketing, and engineering"
    ],
    tools: ["Shopify Automations", "Meta Ads CAPI", "Google Ads", "n8n", "Zapier", "Klaviyo"]
  }
];
