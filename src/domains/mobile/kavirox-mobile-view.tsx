import React, { useState } from "react";
import MobileHeader from "./components/mobile-header";
import MobileHero from "./components/mobile-hero";
import MobileServices from "./components/mobile-services";
import MobileSolutions from "./components/mobile-solutions";
import MobileCapabilities from "./components/mobile-capabilities";
import MobileBottomNav from "./components/mobile-bottom-nav";
import KaviroxChatbot from "@/domains/chatbot/components/kavirox-chatbot";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { LinkedIn, Instagram, X, Threads } from "@aliimam/logos";
import { getInquiryWebmailUrl, copyInquiryTemplate } from "@/shared/lib/email-inquiry";

export function KaviroxMobileView() {
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const handleCopyTemplate = async () => {
    const success = await copyInquiryTemplate({ source: "Mobile Footer" });
    if (success) {
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2400);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans selection:bg-orange-500/30 selection:text-white pb-24 relative overflow-x-hidden">
      {/* 1. Sticky Mobile Header */}
      <MobileHeader />

      {/* 2. Scaled Editorial Hero */}
      <MobileHero />

      {/* 3. Touch Snap Services Carousel */}
      <MobileServices />

      {/* 4. Practical Systems & Blueprints */}
      <MobileSolutions />

      {/* 5. Tooling & Capabilities Matrix */}
      <MobileCapabilities />

      {/* 6. Mobile Studio Footer */}
      <footer id="contact" className="px-5 pt-12 pb-10 border-t border-white/10 bg-zinc-950/50 backdrop-blur-md">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/Kavirox_logo.png"
              alt="Kavirox"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const fallback = target.parentElement?.querySelector(".footer-mobile-fallback");
                if (fallback) fallback.classList.remove("hidden");
              }}
            />
            <div className="footer-mobile-fallback hidden text-lg font-bold tracking-tight text-white font-mono">
              KAVIROX.SPACE
            </div>
          </div>

          <p className="text-xs text-zinc-400 font-mono leading-relaxed">
            A technology & e-commerce studio helping growing brands build faster online stores, automate customer messaging, and turn visitors into regular buyers.
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Founded at GBU Incubation Center (AIC-GBU) • Greater Noida 201312</span>
          </div>

          {/* Primary Action Button */}
          <div className="pt-4 space-y-2.5">
            <a
              href={getInquiryWebmailUrl({ source: "Mobile Footer Primary" })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 active:scale-98 transition-all"
            >
              <span>Email Us (Pre-Written Brief)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="flex items-center justify-between text-xs font-mono pt-1">
              <a
                href={getInquiryWebmailUrl({ source: "Mobile Footer Email" })}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300"
              >
                info@kavirox.space ↗
              </a>

              <button
                type="button"
                onClick={handleCopyTemplate}
                className="text-zinc-400 hover:text-white underline underline-offset-2 flex items-center gap-1 cursor-pointer"
              >
                {copiedTemplate ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Template</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-5 pt-4 text-zinc-400 border-t border-white/5">
            <a
              href="https://www.linkedin.com/company/kavirox/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="LinkedIn"
            >
              <LinkedIn />
            </a>
            <a
              href="https://www.instagram.com/kavirox.space?stkn=encybWN2NTFhZ291"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="X"
            >
              <X />
            </a>
            <a
              href="https://threads.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Threads"
            >
              <Threads />
            </a>
          </div>

          <div className="pt-4 text-[10px] font-mono text-zinc-600">
            © {new Date().getFullYear()} Kavirox.space. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 7. AI Chatbot Concierge */}
      <KaviroxChatbot />

      {/* 8. Fixed Bottom Thumb Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
}

export default KaviroxMobileView;
