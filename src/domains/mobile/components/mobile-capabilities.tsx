import React, { useState } from "react";
import { 
  techCategories, 
  deliverySteps, 
  engagementModels 
} from "@/domains/capabilities/components/kavirox-capabilities";
import { ChromaticText } from "@/domains/marketing/components/chromatic-text";
import { Cpu, Workflow, Briefcase, CheckCircle2, ArrowUpRight } from "lucide-react";
import { getInquiryWebmailUrl } from "@/shared/lib/email-inquiry";

export function MobileCapabilities() {
  const [activeTab, setActiveTab] = useState<"tech" | "steps" | "models">("tech");

  return (
    <section id="capabilities" className="px-5 py-12 border-t border-white/10 relative">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs uppercase font-mono tracking-widest text-orange-400">
            Capabilities & Stack
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white leading-tight">
          How We{" "}
          <span className="font-bold italic text-white inline-block">
            <ChromaticText text="Work & Build" seed={7734} delay={0.1} duration={1.2} />
          </span>
        </h2>
        <p className="text-xs text-zinc-400 font-mono mt-2">
          Founded at Gautam Buddha University to help growing brands engineer scalable commerce infrastructure.
        </p>
      </div>

      {/* Segmented Category Switcher */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-950/60 border border-white/10 rounded-xl mb-6 font-mono text-[11px]">
        <button
          onClick={() => setActiveTab("tech")}
          className={`py-2 px-1 rounded-lg text-center transition-all ${
            activeTab === "tech"
              ? "bg-orange-600 text-white font-semibold shadow-md shadow-orange-600/20"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          01. Tech
        </button>
        <button
          onClick={() => setActiveTab("steps")}
          className={`py-2 px-1 rounded-lg text-center transition-all ${
            activeTab === "steps"
              ? "bg-orange-600 text-white font-semibold shadow-md shadow-orange-600/20"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          02. Process
        </button>
        <button
          onClick={() => setActiveTab("models")}
          className={`py-2 px-1 rounded-lg text-center transition-all ${
            activeTab === "models"
              ? "bg-orange-600 text-white font-semibold shadow-md shadow-orange-600/20"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          03. Models
        </button>
      </div>

      {/* 01. Tech Stack Matrix */}
      {activeTab === "tech" && (
        <div className="space-y-3.5">
          {techCategories.map((cat, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-zinc-900/30 backdrop-blur-md border border-white/10"
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold text-white">{cat.title}</span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {cat.badge}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 02. Process / Delivery Steps */}
      {activeTab === "steps" && (
        <div className="space-y-3">
          {deliverySteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-zinc-950/40 backdrop-blur-md border border-white/10 flex items-start gap-3"
              >
                <div className="shrink-0 p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-orange-500">
                      STEP {step.step}
                    </span>
                    <h4 className="text-xs font-semibold text-white">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 03. Engagement Models */}
      {activeTab === "models" && (
        <div className="space-y-4">
          {engagementModels.map((model, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border backdrop-blur-md flex flex-col justify-between ${
                model.highlighted
                  ? "bg-zinc-900/50 border-orange-500 shadow-xl shadow-orange-500/10"
                  : "bg-zinc-950/30 border-white/10"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {model.badge}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">MODEL 0{idx + 1}</span>
                </div>

                <h3 className="text-lg font-light tracking-tight text-white mb-0.5">
                  {model.title}
                </h3>
                <div className="text-[11px] font-mono text-orange-400/90 mb-3">
                  {model.type}
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {model.description}
                </p>

                <div className="space-y-2 pt-3 border-t border-white/5">
                  {model.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
                      <span className="text-[11px] text-zinc-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5">
                <a
                  href={getInquiryWebmailUrl({ modelTitle: model.title, source: "Mobile Capabilities Model" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-98 transition-all ${
                    model.highlighted
                      ? "bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/20"
                      : "bg-white/10 text-white"
                  }`}
                >
                  <span>Inquire for {model.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MobileCapabilities;
