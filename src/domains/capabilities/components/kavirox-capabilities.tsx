import React from "react";
import { 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Workflow, 
  Sparkles, 
  Clock, 
  Users, 
  Briefcase, 
  Repeat, 
  Compass, 
  Code2, 
  Rocket, 
  FileCheck,
  Server,
  Lock,
  ArrowUpRight
} from "lucide-react";
import { getInquiryWebmailUrl } from "@/shared/lib/email-inquiry";

interface TechCategory {
  title: string;
  badge: string;
  skills: string[];
}

const techCategories: TechCategory[] = [
  {
    title: "Storefronts & Frontend",
    badge: "UI / UX",
    skills: ["Shopify Liquid", "Next.js", "React 19", "TypeScript", "Tailwind CSS", "Storefront API", "Vite"]
  },
  {
    title: "Conversational & Automation",
    badge: "Workflows",
    skills: ["WhatsApp Business API", "Meta Cloud API", "n8n", "Zapier", "Webhooks", "Node.js", "REST / GraphQL"]
  },
  {
    title: "Payments & Commerce Ops",
    badge: "Transactions",
    skills: ["Razorpay", "Cashfree", "UPI Deep-Linking", "COD Verification", "Logistics & Shipping APIs"]
  },
  {
    title: "AI & RAG Chatbots",
    badge: "Intelligence",
    skills: ["RAG Chatbots", "Brand Knowledge Bases", "Vector Search", "OpenAI APIs", "Google Analytics 4", "Meta CAPI", "Looker Studio"]
  },
  {
    title: "Security, Cloud & Health",
    badge: "Infrastructure",
    skills: ["OWASP Compliance", "SSL / TLS 1.3", "Access Governance", "CDN Caching", "Disaster Recovery", "Uptime SLAs"]
  }
];

const deliverySteps = [
  {
    step: "01",
    title: "Understanding Your Needs",
    description: "We look at your current store, see where shoppers drop off, and find practical ways to improve your sales.",
    icon: Compass
  },
  {
    step: "02",
    title: "Design & Planning",
    description: "We design clean, easy-to-use shopping pages and map out the automations needed behind the scenes.",
    icon: Layers
  },
  {
    step: "03",
    title: "Clean Development",
    description: "We write fast, reliable code that looks great on mobile and connects seamlessly with your tools.",
    icon: Code2
  },
  {
    step: "04",
    title: "Testing Everything",
    description: "We test every button, cart flow, and payment method so your customers never experience friction.",
    icon: FileCheck
  },
  {
    step: "05",
    title: "Smooth Launch",
    description: "We roll out your updates with zero downtime, making sure all orders and customer alerts work perfectly.",
    icon: Rocket
  },
  {
    step: "06",
    title: "Ongoing Support",
    description: "We keep checking your numbers, testing new ideas, and keeping your store fast and reliable every month.",
    icon: Repeat
  }
];

const engagementModels = [
  {
    title: "Project-Based",
    type: "Clear Goals & Fixed Timeline",
    description: "Ideal for a specific project — like building a new store, a custom checkout flow, or launching a brand-trained RAG chatbot.",
    features: [
      "Fixed timeline and clear milestone dates",
      "Custom design and clean code built for your brand",
      "Full handover with easy-to-follow documentation",
      "Post-launch support and bug fixes included"
    ],
    badge: "Clear Scope"
  },
  {
    title: "Dedicated Team",
    type: "Your In-House Tech Partner",
    description: "A focused team of developers working closely with you every week to build, improve, and scale your digital store.",
    features: [
      "Dedicated developers for frontend, backend, automations, and RAG chatbots",
      "Direct chat on Slack or WhatsApp for quick daily answers",
      "Weekly updates and steady feature shipping",
      "Freedom to adjust priorities as your business grows"
    ],
    badge: "Most Popular",
    highlighted: true
  },
  {
    title: "Monthly Support",
    type: "Ongoing Maintenance & Growth",
    description: "Reliable monthly support to keep your store fast, fix issues quickly, run campaigns, and test new improvements.",
    features: [
      "Fast response whenever you need quick changes or fixes",
      "Ongoing tweaks to improve conversions and sales",
      "Hands-on help with WhatsApp and email workflows",
      "Regular health checks for speed and security"
    ],
    badge: "Continuous Care"
  }
];

export function KaviroxCapabilities() {
  return (
    <section 
      id="capabilities" 
      className="relative z-10 bg-[#09090b] text-[#fafafa] py-24 md:py-36 border-t border-white/10 overflow-hidden font-sans"
    >
      {/* Background Dot Matrix */}
      <div 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.12)_1px,_transparent_1px)] opacity-20 pointer-events-none"
        style={{ backgroundSize: "28px 28px" }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs uppercase font-mono tracking-widest text-orange-400">
                Our Capabilities & Tools
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight">
              How We <span className="font-bold italic text-white">Work & Build</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-zinc-400 font-mono max-w-md">
            Founded at Gautam Buddha University to help growing brands build faster stores, connect their tools, and scale with confidence.
          </p>
        </div>

        {/* 1. Technology Matrix */}
        <div className="py-16 border-b border-white/10">
          <div className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-8 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-orange-500" />
            <span>01 // The Tools & Technology We Use</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCategories.map((cat, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-zinc-200">{cat.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {cat.badge}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-300 border border-white/5 hover:border-orange-500/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. End-to-End Delivery Methodology */}
        <div className="py-16 border-b border-white/10">
          <div className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-8 flex items-center gap-2">
            <Workflow className="w-4 h-4 text-orange-500" />
            <span>02 // How We Bring Your Ideas to Life</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverySteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-xl bg-zinc-950 border border-white/5 relative group hover:border-orange-500/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-mono font-light text-orange-500">
                      {step.step}
                    </span>
                    <div className="p-2 rounded-lg bg-white/5 text-zinc-400 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-100 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Engagement Models */}
        <div className="pt-16">
          <div className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-8 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-orange-500" />
            <span>03 // Simple Ways to Work Together</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {engagementModels.map((model, idx) => (
              <div 
                key={idx}
                className={`p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
                  model.highlighted
                    ? "bg-zinc-900/90 border-orange-500 shadow-2xl shadow-orange-500/10 relative"
                    : "bg-zinc-950/60 border-white/10 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      {model.badge}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">MODEL 0{idx + 1}</span>
                  </div>

                  <h3 className="text-2xl font-light tracking-tight text-white mb-1">
                    {model.title}
                  </h3>
                  <div className="text-xs font-mono text-orange-400/90 mb-4">
                    {model.type}
                  </div>

                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
                    {model.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/5">
                    {model.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-zinc-300 font-sans">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-white/5">
                  <a
                    href={getInquiryWebmailUrl({ modelTitle: model.title, source: "Capabilities Engagement Model" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open Pre-Written Inquiry Email for ${model.title} in Gmail Web`}
                    className={`w-full py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      model.highlighted
                        ? "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/20"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    <span>Work With Us</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default KaviroxCapabilities;
