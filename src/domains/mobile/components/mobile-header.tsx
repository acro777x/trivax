import React from "react";
import { ArrowUpRight } from "lucide-react";
import { getInquiryWebmailUrl } from "@/shared/lib/email-inquiry";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/40 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between transition-all">
      {/* Logo & Incubator Label */}
      <a href="#" className="flex items-center gap-2.5 focus:outline-none">
        <img
          src="/Kavirox_logo.png"
          alt="Kavirox"
          className="h-7 w-auto object-contain"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const fallback = target.parentElement?.querySelector(".mobile-logo-fallback");
            if (fallback) fallback.classList.remove("hidden");
          }}
        />
        <div className="mobile-logo-fallback hidden flex items-center gap-1.5 font-bold tracking-tight text-white font-mono text-base">
          <img src="/kavirox-kmark.svg" alt="Kavirox" className="h-6 w-6" />
          <span>KAVIROX</span>
        </div>

      </a>

      {/* Direct Inquiry CTA */}
      <a
        href={getInquiryWebmailUrl({ source: "Mobile Top Header" })}
        target="_blank"
        rel="noopener noreferrer"
        title="Open Pre-Written Inquiry Email in Gmail Web"
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-semibold tracking-tight shadow-md shadow-orange-600/20 active:scale-95 transition-all"
      >
        <span>Email Us</span>
        <ArrowUpRight className="w-3 h-3" />
      </a>
    </header>
  );
}

export default MobileHeader;
