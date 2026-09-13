import React from "react";
import { BadgeQuestionMark } from "@aliimam/icons";
import { ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";
import { ChromaticText } from "@/domains/marketing/components/chromatic-text";
import { getInquiryWebmailUrl } from "@/shared/lib/email-inquiry";

export function MobileHero() {
  return (
    <section className="relative px-5 pt-8 pb-12 overflow-hidden flex flex-col justify-between">
      {/* Ambient background glow optimized for mobile */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[340px] h-[260px] bg-gradient-to-b from-orange-500/20 via-rose-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Top Tagline Pill */}
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono tracking-widest uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
          Tech & E-Commerce Studio
        </span>
      </div>

      {/* Main Editorial Headlines with Chromatic Text Physics */}
      <div className="space-y-2 select-none">
        {/* Row 1: DIGITAL */}
        <div className="flex items-baseline">
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-none">
            <ChromaticText text="DIGITAL" seed={7719} delay={0.1} duration={1.2} />
          </h1>
        </div>

        {/* Row 2: PRODUCTS with interactive Badge */}
        <div className="flex items-center">
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-none flex items-center">
            <ChromaticText text="PR" seed={9051} delay={0.2} duration={1.2} />
            <div className="inline-flex items-center justify-center mx-1 text-orange-500">
              <BadgeQuestionMark
                type="solid"
                className="w-11 h-11 text-orange-500"
              />
            </div>
            <ChromaticText text="DUCTS" seed={4242} delay={0.3} duration={1.2} />
          </h1>
        </div>

        {/* Row 3: DESIGN + Heart + CODE */}
        <div className="flex items-center">
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-none flex items-center">
            <ChromaticText text="DESIGN" seed={6103} delay={0.4} duration={1.2} />
            <div className="mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="#f43f5e"
              >
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>
            </div>
            <ChromaticText text="CODE" seed={8391} delay={0.5} duration={1.2} />
          </h1>
        </div>
      </div>

      {/* Description copy */}
      <p className="text-xs text-zinc-400 font-mono leading-relaxed mt-6 max-w-sm">
        Helping consumer brands build faster online stores, automate customer messaging, and turn casual visitors into loyal buyers.
      </p>

      {/* Mobile Action CTAs */}
      <div className="flex flex-col gap-2.5 mt-8">
        <a
          href={getInquiryWebmailUrl({ source: "Mobile Hero Primary" })}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Pre-Written Inquiry Email in Gmail Web"
          className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-600/25 active:scale-98 transition-all"
        >
          <span>Start Your Project (Email Brief)</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>

        <a
          href="#services"
          className="w-full py-3 px-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 border border-white/10 font-mono text-xs flex items-center justify-center gap-2 backdrop-blur-md active:scale-98 transition-all"
        >
          <span>Explore 11 Service Lines</span>
          <span className="text-orange-400">↓</span>
        </a>
      </div>

      {/* Campus metadata footer */}
      <div className="pt-8 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>GREATER NOIDA, INDIA</span>
        <span className="text-orange-400 font-semibold">kavirox.space</span>
      </div>
    </section>
  );
}

export default MobileHero;
