import React, { useState } from "react";
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
  Workflow,
  CheckCircle2
} from "lucide-react";

interface ServiceLine {
  id: string;
  number: string;
  category: "commerce" | "automation" | "data-ai" | "engineering";
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
  tools: string[];
}

const serviceLines: ServiceLine[] = [
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
      "Seamless human hand-off routing for enquiries requiring concierge support"
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
      "Event-driven campaign triggers based on customer actions and lifecycle milestones",
      "Omnichannel promotional launch workflows for new products, bundles, and seasonal drops",
      "Multi-platform customer synchronization between store, CRM, email, and WhatsApp",
      "Automated weekly and monthly performance reports delivered directly to stakeholders",
      "Workflow automation eliminating repetitive operational, fulfillment, and marketing tasks",
      "Custom webhook middleware connecting Shopify with proprietary business tools"
    ],
    tools: ["n8n", "Zapier", "Make", "Shopify Webhooks", "Meta Cloud API", "Slack Alerts"]
  }
];

export function KaviroxServices() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredServices = selectedFilter === "all" 
    ? serviceLines 
    : serviceLines.filter(s => s.category === selectedFilter);

  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-12 bg-[#09090b] text-[#fafafa] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              What We Do
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-tight">
              Everything You Need to <span className="font-bold italic text-orange-500">Build & Scale</span> <br className="hidden sm:block" />
              Your Online Brand
            </h2>
          </div>
          <p className="text-sm md:text-base text-zinc-400 max-w-lg leading-relaxed font-mono">
            We help D2C brands build fast, reliable websites, connect their sales tools, and create smooth shopping journeys that keep customers coming back.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {[
            { id: "all", label: "All Services (11)" },
            { id: "commerce", label: "E-Commerce & CX" },
            { id: "automation", label: "Automation & Growth" },
            { id: "data-ai", label: "Data, Analytics & AI" },
            { id: "engineering", label: "Engineering & Security" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                selectedFilter === tab.id
                  ? "bg-orange-600 text-white font-semibold shadow-lg shadow-orange-600/20"
                  : "bg-zinc-900/80 text-zinc-400 border border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-orange-500/40 p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Header: Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono tracking-widest text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded-full bg-orange-500/5">
                      SERVICE {service.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 group-hover:text-orange-400 group-hover:border-orange-500/30 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-medium tracking-tight text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mb-6 font-mono">
                    {service.tagline}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-white/5">
                    {service.deliverables.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tools Footer */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default KaviroxServices;
