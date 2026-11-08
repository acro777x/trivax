import React, { useState, useEffect } from 'react';
import { solutions } from './solutions-data';
import PixelSwap from '@/components/ui/PixelSwap';
import Reveal from '@/components/ui/Reveal';
import { useDeviceTier } from '@/shared/hooks/use-device-tier';
import {
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Sparkles,
  Zap,
} from 'lucide-react';

export const KaviroxSolutions: React.FC = () => {
  const tier = useDeviceTier();
  const isFull = tier === 'full';
  const [activeStep, setActiveStep] = useState(0);

  // Scroll listener to update sticky active solution
  useEffect(() => {
    const handleScroll = () => {
      const panels = document.querySelectorAll('.solution-panel');
      const middleY = window.innerHeight * 0.42;

      panels.forEach((panel, idx) => {
        const rect = panel.getBoundingClientRect();
        if (rect.top <= middleY && rect.bottom >= middleY) {
          setActiveStep(idx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentSolution = solutions[activeStep] || solutions[0];

  // 3-step Blueprint Nodes configuration per solution
  const blueprintNodes = [
    {
      input: 'Customer Traffic & Device',
      engine: 'Edge SSR & Image Optimizer',
      output: 'Sub-second Loaded Storefront',
    },
    {
      input: 'Abandoned Cart & User Signals',
      engine: 'Event Trigger & Logic Engine',
      output: 'Verified WhatsApp Recovery',
    },
    {
      input: 'Catalog & Customer Inquiries',
      engine: 'RAG Layer & Grounded LLM',
      output: 'Accurate Contextual Recommendations',
    },
    {
      input: 'Browser & Server-side Events',
      engine: 'CAPI & Data Pipeline',
      output: 'Attributed Conversion Signal',
    },
  ][activeStep] || {
    input: 'Input Stream',
    engine: 'Processing Engine',
    output: 'Optimized System Output',
  };

  return (
    <section
      id="solutions"
      className="relative w-full py-20 sm:py-28 md:py-32 bg-bg border-b border-line overflow-hidden scroll-mt-24 md:scroll-mt-28"
      aria-label="Kavirox Solutions"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Two-Column Layout: Left Sticky Blueprint & Nav (5/12) / Right Solution Panels (7/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">
          {/* Left Column: Sticky Storytelling & Active Blueprint Diagram (Never Empty) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <Reveal>
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest">
                  <span className="w-4 h-[1px] bg-primary" />
                  <span>Solutions</span>
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text tracking-tight leading-[1.06] text-balance">
                  Four problems we solve often.
                </h2>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed text-pretty">
                  Practical systems for stores and brands: a storefront that loads fast, messages that recover orders, a chatbot that knows your catalogue, and tracking you can trust.
                </p>
              </div>
            </Reveal>

            {/* Step Selector List */}
            <div className="hidden lg:flex flex-col gap-2 p-3 rounded-2xl bg-surface/90 border border-white/10">
              {solutions.map((sol, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={sol.id}
                    type="button"
                    onClick={() => {
                      const el = document.getElementById(`solution-${sol.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`cursor-target w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between ${
                      isActive
                        ? 'bg-surface2 border-primary/40 text-white shadow-[0_0_15px_rgba(56, 189, 248,0.15)]'
                        : 'border-transparent text-text-muted hover:text-white hover:bg-white/5'
                    }`}
                    data-cursor-label="View"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs font-bold tabular-nums ${
                          isActive ? 'text-primary' : 'text-text-muted/50'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="font-display font-semibold text-sm">
                        {sol.title}
                      </span>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Blueprint Visual with Traveling Pulse (Input -> Engine -> Output) */}
            <div className="hidden lg:block rounded-2xl bg-surface2/80 border border-white/15 p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase text-primary tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-primary" /> Live Architecture Blueprint
                </span>
                <span className="text-[10px] font-mono text-text-muted/70">
                  Step 0{activeStep + 1} of 04
                </span>
              </div>

              {/* Connected 3-node diagram */}
              <div className="space-y-3 relative">
                {/* Traveling dot indicator line */}
                <div className="absolute left-4 top-4 bottom-4 w-[2px] bg-white/10 -z-0">
                  <div className="w-full h-8 bg-primary rounded-full animate-bounce shadow-[0_0_8px_rgba(56, 189, 248,0.6)]" />
                </div>

                {/* Node 1: Input */}
                <div className="relative z-10 flex items-center gap-3 pl-1">
                  <div className="w-6 h-6 rounded-full bg-surface border border-white/20 flex items-center justify-center text-[10px] font-mono text-primary shrink-0">
                    1
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface border border-white/10 flex-1">
                    <span className="text-[9px] font-mono uppercase text-text-muted block">INPUT</span>
                    <span className="text-xs font-semibold text-white">{blueprintNodes.input}</span>
                  </div>
                </div>

                {/* Node 2: Engine */}
                <div className="relative z-10 flex items-center gap-3 pl-1">
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-mono text-primary shrink-0">
                    2
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface border border-primary/30 flex-1">
                    <span className="text-[9px] font-mono uppercase text-primary block">ENGINE</span>
                    <span className="text-xs font-semibold text-primary">{blueprintNodes.engine}</span>
                  </div>
                </div>

                {/* Node 3: Output */}
                <div className="relative z-10 flex items-center gap-3 pl-1">
                  <div className="w-6 h-6 rounded-full bg-surface border border-white/20 flex items-center justify-center text-[10px] font-mono text-white shrink-0">
                    3
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface border border-white/10 flex-1">
                    <span className="text-[9px] font-mono uppercase text-text-muted block">OUTPUT</span>
                    <span className="text-xs font-semibold text-white">{blueprintNodes.output}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Solution Panels (7/12) */}
          <div className="lg:col-span-7 space-y-10 sm:space-y-12">
            {solutions.map((sol, index) => {
              const bestThreePoints = sol.architecturePoints.slice(0, 3);

              return (
                <div
                  key={sol.id}
                  id={`solution-${sol.id}`}
                  className="solution-panel scroll-mt-32 rounded-3xl bg-surface/90 border border-white/10 hover:border-primary/30 p-6 sm:p-8 transition-all shadow-xl"
                >
                  {/* Top Badge & Number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary bg-primary/10 border border-primary/25 px-3 py-1 rounded-full">
                      {sol.tag}
                    </span>
                    <span className="font-mono text-sm font-semibold text-text-muted/60 tabular-nums">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2 leading-tight">
                    {sol.title}
                  </h3>
                  <p className="text-sm sm:text-base text-primary/90 font-medium mb-3">
                    {sol.subtitle}
                  </p>
                  <p className="text-sm text-text-muted leading-relaxed line-clamp-3 mb-6">
                    {sol.description}
                  </p>

                  {/* Mobile Compact Blueprint Row */}
                  <div className="block lg:hidden my-5 p-3 rounded-xl bg-surface2 border border-white/10 text-xs space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-primary">Architecture Flow:</div>
                    <div className="flex items-center gap-1.5 text-text-muted text-[11px] overflow-x-auto scrollbar-none py-1">
                      <span className="text-white shrink-0">{sol.blueprint.input}</span>
                      <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                      <span className="text-primary font-medium shrink-0">{sol.blueprint.engine}</span>
                      <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                      <span className="text-white shrink-0">{sol.blueprint.output}</span>
                    </div>
                  </div>

                  {/* Panel 1 Special: Pixel Swap Before & After Visual */}
                  {index === 0 && (
                    <div className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-surface2/60 relative">
                      <div className="px-4 py-2.5 bg-surface2/90 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                        <span className="text-text-muted">Interactive Benchmark</span>
                        <span className="text-primary text-[11px]">Hover or tap to dissolve</span>
                      </div>
                      <div className="p-2 sm:p-3">
                        <PixelSwap
                          pattern="random"
                          pixelSize={16}
                          duration={0.6}
                          trigger="hover"
                          className="w-full rounded-xl overflow-hidden min-h-[140px]"
                          firstContent={
                            <div className="w-full h-full p-4 sm:p-5 rounded-xl bg-black/60 border border-amber-500/20 flex flex-col justify-between">
                              <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold">
                                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                                  Legacy Storefront (Before)
                                </span>
                                <span className="text-[10px] font-mono text-text-muted">3.8s LCP</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 my-3 text-center">
                                <div className="p-2 rounded-lg bg-white/5">
                                  <span className="text-[10px] font-mono text-text-muted block">LCP</span>
                                  <span className="text-lg sm:text-xl font-bold font-display text-amber-400">3.8s</span>
                                </div>
                                <div className="p-2 rounded-lg bg-white/5">
                                  <span className="text-[10px] font-mono text-text-muted block">Score</span>
                                  <span className="text-lg sm:text-xl font-bold font-display text-amber-400">42/100</span>
                                </div>
                                <div className="p-2 rounded-lg bg-white/5">
                                  <span className="text-[10px] font-mono text-text-muted block">Bundle</span>
                                  <span className="text-lg sm:text-xl font-bold font-display text-amber-400">1.4 MB</span>
                                </div>
                              </div>
                              <div className="text-[11px] text-text-muted/80">
                                Monolithic storefront stack with heavy runtime execution and render lag.
                              </div>
                            </div>
                          }
                          secondContent={
                            <div className="w-full h-full p-4 sm:p-5 rounded-xl bg-primary/10 border border-primary/40 flex flex-col justify-between shadow-[0_0_24px_rgba(56, 189, 248,0.15)]">
                              <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-semibold">
                                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                  Kavirox Architecture (After)
                                </span>
                                <span className="text-[10px] font-mono text-primary font-bold">0.8s LCP</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 my-3 text-center">
                                <div className="p-2 rounded-lg bg-primary/15 border border-primary/20">
                                  <span className="text-[10px] font-mono text-primary/80 block">LCP</span>
                                  <span className="text-lg sm:text-xl font-bold font-display text-primary">0.8s</span>
                                </div>
                                <div className="p-2 rounded-lg bg-primary/15 border border-primary/20">
                                  <span className="text-[10px] font-mono text-primary/80 block">Score</span>
                                  <span className="text-lg sm:text-xl font-bold font-display text-primary">98/100</span>
                                </div>
                                <div className="p-2 rounded-lg bg-primary/15 border border-primary/20">
                                  <span className="text-[10px] font-mono text-primary/80 block">Bundle</span>
                                  <span className="text-lg sm:text-xl font-bold font-display text-primary">&lt;160 KB</span>
                                </div>
                              </div>
                              <div className="text-[11px] text-primary/90 font-medium">
                                Headless edge-rendered stack with instant page transitions and sub-second paint.
                              </div>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* Key Points (Best 3) */}
                  <div className="space-y-3 mb-6 pt-4 border-t border-white/5">
                    <h4 className="text-xs font-mono uppercase text-text-muted/80 tracking-wider">
                      Key points
                    </h4>
                    <div className="space-y-2">
                      {bestThreePoints.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-muted">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="mb-6">
                    <span className="text-[10px] font-mono uppercase text-text-muted/60 block mb-2">
                      Built with
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {sol.stack.map((item, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-mono text-text-muted bg-white/5 border border-white/10 px-2.5 py-1 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Targets We Design For Trio with Tooltip */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase text-primary tracking-wider">
                        Targets we design for
                      </span>
                      <div className="group relative cursor-help flex items-center gap-1 text-[11px] font-mono text-text-muted/70">
                        <HelpCircle className="w-3.5 h-3.5 text-text-muted" />
                        <span className="hidden sm:inline">Design targets, not client results</span>
                        {/* Tooltip */}
                        <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-56 p-2 rounded-lg bg-surface2 border border-white/20 text-[10px] text-text-muted shadow-xl z-30">
                          These represent target benchmarks we engineer systems toward, not guaranteed client metrics.
                        </div>
                      </div>
                    </div>

                      <div className="grid grid-cols-3 gap-3">
                      {sol.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="p-3 rounded-xl bg-surface2/60 border border-white/5 text-center">
                          <span className="font-display font-extrabold text-lg sm:text-xl text-white block">
                            {metric.value}
                          </span>
                          <span className="text-[10px] font-mono text-text-muted block mt-0.5 leading-tight">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KaviroxSolutions;
