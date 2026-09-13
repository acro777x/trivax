import React, { useState, useRef } from "react";
import { serviceLines, ServiceLine } from "@/domains/services/components/kavirox-services";
import { ChromaticText } from "@/domains/marketing/components/chromatic-text";
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

export function MobileServices() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredServices = selectedFilter === "all"
    ? serviceLines
    : serviceLines.filter(s => s.category === selectedFilter);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const cardWidth = clientWidth * 0.82;
    const index = Math.round(scrollLeft / (cardWidth + 16));
    setActiveCardIndex(Math.min(index, filteredServices.length - 1));
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    const cardWidth = clientWidth * 0.82;
    scrollContainerRef.current.scrollTo({
      left: index * (cardWidth + 16),
      behavior: "smooth"
    });
    setActiveCardIndex(index);
  };

  return (
    <section id="services" className="px-5 py-12 border-t border-white/10 relative">
      {/* Section Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono tracking-widest uppercase mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          11 Core Service Lines
        </div>
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white leading-tight">
          Everything You Need to{" "}
          <span className="font-bold italic text-orange-500 inline-block">
            <ChromaticText text="Build & Scale" seed={5512} delay={0.1} duration={1.2} />
          </span>{" "}
          Online
        </h2>
        <p className="text-xs text-zinc-400 font-mono mt-2">
          Swipe left and right to explore all 11 technical service lines.
        </p>
      </div>

      {/* Horizontal Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-4 -mx-5 px-5">
        {[
          { id: "all", label: "All (11)" },
          { id: "commerce", label: "Commerce" },
          { id: "automation", label: "Automation" },
          { id: "data-ai", label: "Data & AI" },
          { id: "engineering", label: "Engineering" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedFilter(tab.id);
              setActiveCardIndex(0);
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
              }
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-mono shrink-0 transition-all active:scale-95 ${
              selectedFilter === tab.id
                ? "bg-orange-600 text-white font-semibold shadow-md shadow-orange-600/20"
                : "bg-zinc-900/40 text-zinc-400 border border-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Touch-First Horizontal Snap Swipe Carousel */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-5 px-5"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {filteredServices.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="w-[82vw] max-w-[320px] shrink-0 snap-center rounded-2xl bg-zinc-900/30 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Service Tag & Icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-widest text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full bg-orange-500/5">
                    SERVICE {service.number}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-orange-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Service Title & Tagline */}
                <h3 className="text-base font-semibold text-white tracking-tight leading-snug mb-1.5">
                  {service.title}
                </h3>
                <p className="text-xs text-zinc-400 font-mono leading-relaxed mb-4">
                  {service.tagline}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 pt-3 border-t border-white/5">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Tools Pills */}
              <div className="pt-3 mt-4 border-t border-white/10 flex flex-wrap gap-1">
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
          );
        })}
      </div>

      {/* Swipe Progress Dots & Controls */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
        <span className="text-[11px] font-mono text-zinc-500">
          {activeCardIndex + 1} of {filteredServices.length} Services
        </span>

        {/* Indicator dots */}
        <div className="flex gap-1.5 max-w-[120px] overflow-hidden">
          {filteredServices.slice(0, 8).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                activeCardIndex === idx
                  ? "w-4 bg-orange-500"
                  : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
          {filteredServices.length > 8 && (
            <span className="text-[9px] text-zinc-600 font-mono self-center">+3</span>
          )}
        </div>

        {/* Quick Next Button */}
        <button
          onClick={() => scrollToIndex(Math.min(activeCardIndex + 1, filteredServices.length - 1))}
          className="text-xs font-mono text-orange-400 flex items-center gap-0.5 active:scale-95"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}

export default MobileServices;
