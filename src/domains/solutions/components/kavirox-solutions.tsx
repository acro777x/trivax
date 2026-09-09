import React, { useState } from "react";
import { 
  Cpu, 
  ShoppingBag, 
  MessageSquare, 
  Sparkles, 
  Database, 
  ArrowUpRight, 
  Check, 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  Zap,
  Terminal
} from "lucide-react";

interface SolutionItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  architecturePoints: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  blueprint: {
    input: string;
    engine: string;
    output: string;
  };
}

const solutions: SolutionItem[] = [
  {
    id: "d2c-storefront",
    tag: "Fast Online Stores",
    title: "Custom D2C Storefronts",
    subtitle: "Fast-Loading Stores Built to Turn Browsers into Regular Buyers",
    description: 
      "We build custom online stores using Shopify and modern web frameworks. Instead of slow templates, your visitors get fast mobile browsing, clear product storytelling, and smooth checkouts with COD and UPI.",
    architecturePoints: [
      "Custom sections that highlight your ingredients, quality, and craftsmanship",
      "Smart product bundles and combos that increase average order value",
      "Fast, trustworthy mobile checkout with instant UPI and COD verification",
      "Optimized page speeds so shoppers never bounce while waiting for pages to load"
    ],
    metrics: [
      { label: "Mobile Speed Score", value: "95+" },
      { label: "Checkout Drop-off", value: "-28%" },
      { label: "Average Order Value", value: "+34%" }
    ],
    stack: ["Shopify", "Liquid", "Next.js", "Tailwind CSS", "TypeScript", "Razorpay"],
    blueprint: {
      input: "Visitors from Ads & Social Media",
      engine: "Fast Custom Storefront + Smart Combo Suggestions",
      output: "Smooth Checkouts & Higher Order Values"
    }
  },
  {
    id: "whatsapp-commerce",
    tag: "WhatsApp Messaging",
    title: "WhatsApp Order Updates & Recovery",
    subtitle: "Reach Customers Directly on the App They Use Every Day",
    description: 
      "We connect your store directly to WhatsApp to automatically recover abandoned carts, send instant order and shipping updates, and answer customer questions before they leave.",
    architecturePoints: [
      "Automatic cart recovery messages with direct links to complete checkout",
      "Instant order confirmations and real-time shipping tracking alerts",
      "Simple interactive chat flows to help customers pick the right product",
      "Easy option for customers to chat with your support team"
    ],
    metrics: [
      { label: "Cart Recovery Rate", value: "42%" },
      { label: "Message Open Rate", value: "98%" },
      { label: "Response Speed", value: "< 2s" }
    ],
    stack: ["WhatsApp Business API", "Meta Cloud API", "n8n", "Shopify Webhooks", "Node.js"],
    blueprint: {
      input: "Customer Drops Off Before Completing Order",
      engine: "Automated WhatsApp Notification with Saved Cart Link",
      output: "Recovered Order & Instant Customer Confirmation"
    }
  },
  {
    id: "ai-discovery",
    tag: "AI & RAG Chatbots",
    title: "RAG Brand Chatbots & Product Finders",
    subtitle: "AI Shopping Assistants & Quizzes Trained on Your Exact Products",
    description: 
      "We build custom RAG (Retrieval-Augmented Generation) chatbots and interactive finders trained directly on your store's catalog, FAQs, and brand knowledge base. Customers get accurate, instant answers and personalized product matches 24/7.",
    architecturePoints: [
      "Brand-trained RAG chatbot answering ingredient, sizing, and shipping questions accurately",
      "Interactive guided quizzes that recommend the best product match in seconds",
      "Direct integration on your online storefront and official WhatsApp Business",
      "Instant 1-click checkout links generated directly inside the chat conversation"
    ],
    metrics: [
      { label: "Questions Answered", value: "85%" },
      { label: "Conversion Lift", value: "3.2x" },
      { label: "Support Time Saved", value: "60%" }
    ],
    stack: ["RAG Architecture", "Vector Search", "OpenAI / Claude", "Storefront API", "WhatsApp API"],
    blueprint: {
      input: "Customer Asks About Products or Answers a Quiz",
      engine: "Brand RAG Engine Pulling Verified Store Data & FAQs",
      output: "Instant Grounded Answer, Product Link & 1-Click Cart"
    }
  },
  {
    id: "data-telemetry",
    tag: "Clear Analytics",
    title: "Accurate Sales & Ad Tracking",
    subtitle: "Know Exactly Which Ads and Products Drive Your Revenue",
    description: 
      "We set up reliable server-side tracking and simple dashboards so you know exactly which marketing campaigns bring profitable customers and repeat purchases.",
    architecturePoints: [
      "Direct server tracking with Meta CAPI for accurate ad attribution",
      "Clean Google Analytics 4 tracking across every step of your funnel",
      "Simple, visual dashboards showing daily revenue, repeat buyers, and top products",
      "Safe, privacy-compliant handling of all customer information"
    ],
    metrics: [
      { label: "Attribution Accuracy", value: "99.4%" },
      { label: "Repeat Purchase Rate", value: "+38%" },
      { label: "Ad ROAS Visibility", value: "Real-Time" }
    ],
    stack: ["Meta CAPI", "Google Analytics 4", "GTM Server Container", "Looker Studio", "Klaviyo"],
    blueprint: {
      input: "Store Visits, Purchases & Ad Clicks",
      engine: "Server-Side Tracking & Unified Data Pipeline",
      output: "Clear, Accurate Revenue Dashboard in Looker Studio"
    }
  }
];

export function KaviroxSolutions() {
  const [activeId, setActiveId] = useState<string>(solutions[0].id);
  const activeSolution = solutions.find((s) => s.id === activeId) || solutions[0];

  return (
    <section 
      id="solutions" 
      className="relative z-10 bg-[#09090b] text-[#fafafa] py-24 md:py-36 border-t border-white/10 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.12)_1px,_transparent_1px)] opacity-20 pointer-events-none"
        style={{ backgroundSize: "32px 32px" }}
      />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/3 -right-60 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-60 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs uppercase font-mono tracking-widest text-orange-400">
                Practical Solutions
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight">
              Systems We <span className="font-bold italic text-white">Build For You</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-zinc-400 font-mono max-w-md">
            Simple, reliable systems built to help your store load faster, recover lost sales, and make shopping effortless for your customers.
          </p>
        </div>

        {/* Tab Navigation Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-8 pb-12">
          {solutions.map((item, index) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`text-left p-4 md:p-5 rounded-lg border transition-all duration-300 relative ${
                  isActive
                    ? "bg-zinc-900/90 border-orange-500 shadow-lg shadow-orange-500/10"
                    : "bg-zinc-950/40 border-white/5 hover:border-white/20 hover:bg-zinc-900/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                    0{index + 1} //
                  </span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  )}
                </div>
                <div className="text-xs text-orange-400 font-mono mb-1">{item.tag}</div>
                <div className="text-sm md:text-base font-medium line-clamp-1 text-zinc-200">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Solution Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Solution Detail & Deliverables */}
          <div className="lg:col-span-7 bg-zinc-900/60 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono mb-4">
              <Cpu className="w-3.5 h-3.5" />
              {activeSolution.tag}
            </div>

            <h3 className="text-2xl md:text-4xl font-light tracking-tight mb-2">
              {activeSolution.title}
            </h3>
            <p className="text-sm font-mono text-orange-400/90 mb-6">
              {activeSolution.subtitle}
            </p>

            <p className="text-sm md:text-base text-zinc-300 leading-relaxed mb-8">
              {activeSolution.description}
            </p>

            {/* Architecture Highlights */}
            <div className="space-y-3 mb-8">
              <div className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-2">
                What We Include
              </div>
              {activeSolution.architecturePoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 h-4 w-4 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-xs md:text-sm text-zinc-300 font-sans">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div>
              <div className="text-[11px] uppercase font-mono tracking-widest text-zinc-500 mb-2.5">
                Tech & Tools We Use
              </div>
              <div className="flex flex-wrap gap-2">
                {activeSolution.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Blueprint & Measurable Impact */}
          <div className="lg:col-span-5 space-y-6">
            {/* System Blueprint Card */}
            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden font-mono">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs text-zinc-400">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-orange-500" />
                  HOW THIS WORKS
                </span>
                <span className="text-[10px] text-emerald-400">LIVE SYSTEM</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">01. TRIGGER</div>
                  <div className="p-2.5 rounded bg-zinc-900/80 border border-white/5 text-zinc-200">
                    {activeSolution.blueprint.input}
                  </div>
                </div>

                <div className="flex justify-center my-1 text-orange-500">
                  ↓
                </div>

                <div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">02. SYSTEM ACTION</div>
                  <div className="p-2.5 rounded bg-orange-950/20 border border-orange-500/30 text-orange-200">
                    {activeSolution.blueprint.engine}
                  </div>
                </div>

                <div className="flex justify-center my-1 text-orange-500">
                  ↓
                </div>

                <div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">03. RESULT</div>
                  <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-500/30 text-emerald-200">
                    {activeSolution.blueprint.output}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-6 flex items-center justify-between">
                <span>Results We Aim For</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {activeSolution.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-xl md:text-2xl font-bold text-orange-400 font-mono mb-1">
                      {metric.value}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-sans leading-tight">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default KaviroxSolutions;
