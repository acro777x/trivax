import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChromaticText } from "@/domains/marketing/components/chromatic-text";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ServiceLine {
  id: string;
  number: string;
  category: "commerce" | "automation" | "data-ai" | "engineering";
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
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredServices = selectedFilter === "all" 
    ? serviceLines 
    : serviceLines.filter(s => s.category === selectedFilter);

  // Automatic Scroll-Driven Horizontal Translation with GSAP ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const track = trackRef.current;
    if (!section || !trigger || !track) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal overflow distance to scroll through
      const getScrollDistance = () => {
        const paddingRight = window.innerWidth < 640 ? 40 : 120;
        return Math.max(0, track.scrollWidth - window.innerWidth + paddingRight);
      };

      const distance = getScrollDistance();
      if (distance <= 0) return;

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${getScrollDistance() * 1.2 + 350}`,
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress * 100);
          }
        }
      });
    }, section);

    return () => ctx.revert();
  }, [filteredServices]);

  const handleFilterChange = (tabId: string) => {
    setSelectedFilter(tabId);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);
  };

  return (
    <section ref={sectionRef} id="services" className="relative z-10 bg-transparent text-[#fafafa] border-t border-white/10">
      {/* Pinned Screen Viewport: stays pinned while user scrolls vertically */}
      <div 
        ref={triggerRef}
        className="h-screen max-h-screen flex flex-col justify-between py-6 sm:py-8 md:py-10 px-6 md:px-12 overflow-hidden relative"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 md:mb-6 gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono tracking-widest uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                What We Do
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
                Everything You Need to{" "}
                <span className="font-bold italic text-orange-500 inline-block cursor-pointer">
                  <ChromaticText text="Build & Scale" seed={5512} delay={0.1} duration={1.2} />
                </span>{" "}
                Your Online Brand
              </h2>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-2">
            {[
              { id: "all", label: "All Services (11)" },
              { id: "commerce", label: "E-Commerce & CX" },
              { id: "automation", label: "Automation & Growth" },
              { id: "data-ai", label: "Data, Analytics & AI" },
              { id: "engineering", label: "Engineering & Security" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  selectedFilter === tab.id
                    ? "bg-orange-600 text-white font-semibold shadow-lg shadow-orange-600/20"
                    : "bg-zinc-900/35 backdrop-blur-md text-zinc-400 border border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Middle: Horizontal Cards Track (Scrolls automatically with page vertical scroll) */}
        <div className="my-auto w-full overflow-visible py-3">
          <div 
            ref={trackRef}
            className="flex gap-6 items-stretch will-change-transform max-w-none pl-2 sm:pl-6 md:pl-12"
          >
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="w-[300px] sm:w-[350px] md:w-[380px] lg:w-[410px] h-[370px] sm:h-[390px] md:h-[410px] shrink-0 rounded-2xl bg-zinc-900/25 backdrop-blur-md border border-white/10 hover:border-orange-500/50 hover:bg-zinc-900/40 p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/15 flex flex-col justify-between group"
                >
                  {/* Card Header & Content */}
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[11px] font-mono tracking-widest text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full bg-orange-500/5">
                        SERVICE {service.number}
                      </span>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 group-hover:text-orange-400 group-hover:border-orange-500/30 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white mb-1.5 group-hover:text-orange-400 transition-colors line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-3.5 font-mono line-clamp-2">
                      {service.tagline}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-1.5 pt-3 border-t border-white/5">
                      {service.deliverables.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-zinc-300">
                          <CheckCircle2 className="w-3 h-3 text-orange-400 shrink-0 mt-0.5" />
                          <span className="leading-snug line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Tools Footer */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1">
                      {service.tools.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400"
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

        {/* Bottom: Minimal Scroll Progress Bar */}
        <div className="max-w-7xl mx-auto w-full pt-1">
          <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-75"
              style={{ width: `${Math.max(6, scrollProgress)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default KaviroxServices;
