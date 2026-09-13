import React, { useState } from "react";
import { solutions, SolutionItem } from "@/domains/solutions/components/kavirox-solutions";
import { ChromaticText } from "@/domains/marketing/components/chromatic-text";
import { Cpu, Check, Terminal, TrendingUp } from "lucide-react";

export function MobileSolutions() {
  const [activeId, setActiveId] = useState<string>(solutions[0].id);
  const activeSolution = solutions.find(s => s.id === activeId) || solutions[0];

  return (
    <section id="solutions" className="px-5 py-12 border-t border-white/10 relative">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs uppercase font-mono tracking-widest text-orange-400">
            Practical Systems
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white leading-tight">
          Systems We{" "}
          <span className="font-bold italic text-white inline-block">
            <ChromaticText text="Build For You" seed={6623} delay={0.1} duration={1.2} />
          </span>
        </h2>
        <p className="text-xs text-zinc-400 font-mono mt-2">
          Proven architectures built to load faster, recover lost sales, and automate customer journeys.
        </p>
      </div>

      {/* Horizontal Tab Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-6 -mx-5 px-5">
        {solutions.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`p-3 rounded-xl border text-left shrink-0 transition-all duration-200 active:scale-95 min-w-[150px] ${
                isActive
                  ? "bg-zinc-900/60 border-orange-500/80 shadow-md shadow-orange-500/15 backdrop-blur-md"
                  : "bg-zinc-950/30 border-white/10 text-zinc-400"
              }`}
            >
              <div className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase mb-0.5">
                0{index + 1} //
              </div>
              <div className="text-xs font-semibold text-white line-clamp-1">
                {item.tag}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Solution Detail Card */}
      <div className="space-y-4">
        <div className="p-5 rounded-2xl bg-zinc-900/30 backdrop-blur-md border border-white/10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] font-mono mb-3">
            <Cpu className="w-3 h-3" />
            {activeSolution.tag}
          </div>

          <h3 className="text-lg font-semibold text-white tracking-tight leading-snug mb-1">
            {activeSolution.title}
          </h3>
          <p className="text-xs font-mono text-orange-400/90 mb-3">
            {activeSolution.subtitle}
          </p>

          <p className="text-xs text-zinc-300 leading-relaxed mb-4">
            {activeSolution.description}
          </p>

          {/* Key Deliverables */}
          <div className="space-y-2 pt-3 border-t border-white/5">
            <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1">
              Included Deliverables
            </div>
            {activeSolution.architecturePoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="mt-0.5 flex-shrink-0 h-3.5 w-3.5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                  <Check className="w-2 h-2" />
                </div>
                <span className="text-[11px] text-zinc-300 font-sans leading-tight">
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="pt-3 mt-4 border-t border-white/5 flex flex-wrap gap-1.5">
            {activeSolution.stack.map((tech, idx) => (
              <span
                key={idx}
                className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Blueprint Live Flow Card */}
        <div className="p-4 rounded-2xl bg-zinc-950/40 backdrop-blur-md border border-white/10 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5 text-orange-400">
              <Terminal className="w-3.5 h-3.5" />
              LIVE SYSTEM FLOW
            </span>
            <span className="text-[9px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ACTIVE
            </span>
          </div>

          <div className="space-y-2">
            <div>
              <div className="text-zinc-500 text-[9px] uppercase tracking-wider mb-0.5">01. TRIGGER</div>
              <div className="p-2 rounded bg-zinc-900/60 border border-white/5 text-[11px] text-zinc-200">
                {activeSolution.blueprint.input}
              </div>
            </div>

            <div className="flex justify-center text-orange-500 text-xs">↓</div>

            <div>
              <div className="text-zinc-500 text-[9px] uppercase tracking-wider mb-0.5">02. SYSTEM ACTION</div>
              <div className="p-2 rounded bg-orange-950/20 border border-orange-500/30 text-[11px] text-orange-200">
                {activeSolution.blueprint.engine}
              </div>
            </div>

            <div className="flex justify-center text-orange-500 text-xs">↓</div>

            <div>
              <div className="text-zinc-500 text-[9px] uppercase tracking-wider mb-0.5">03. RESULT</div>
              <div className="p-2 rounded bg-emerald-950/20 border border-emerald-500/30 text-[11px] text-emerald-200">
                {activeSolution.blueprint.output}
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="p-4 rounded-2xl bg-zinc-900/30 backdrop-blur-md border border-white/10">
          <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-3 flex items-center justify-between">
            <span>Results We Aim For</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {activeSolution.metrics.map((metric, idx) => (
              <div key={idx} className="text-center p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="text-base font-bold text-orange-400 font-mono">
                  {metric.value}
                </div>
                <div className="text-[9px] text-zinc-400 font-sans leading-tight mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileSolutions;
