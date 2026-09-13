import React, { useState } from 'react';
import { useIsMobile } from '@/shared/hooks/use-is-mobile';
import KaviroxMobileView from '@/domains/mobile/kavirox-mobile-view';
import FloatingNavbar from '@/domains/marketing/components/floating-navbar';
import KaviroxEditorialHero from '@/domains/marketing/components/kavirox-editorial-hero';
import KaviroxServices from '@/domains/services/components/kavirox-services';
import KaviroxSolutions from '@/domains/solutions/components/kavirox-solutions';
import KaviroxCapabilities from '@/domains/capabilities/components/kavirox-capabilities';
import KaviroxChatbot from '@/domains/chatbot/components/kavirox-chatbot';
import TubesCursor from '@/components/ui/tubes-curor';
import { ArrowUpRight, Heart, Copy, Check } from 'lucide-react';
import { LinkedIn, Instagram, X, Threads } from '@aliimam/logos';
import { getInquiryWebmailUrl, copyInquiryTemplate } from '@/shared/lib/email-inquiry';

export function App() {
  const isMobile = useIsMobile();
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // If viewing on mobile screen (< 768px), render dedicated touch-optimized mobile experience
  if (isMobile) {
    return <KaviroxMobileView />;
  }


  const handleCopyTemplate = async () => {
    const success = await copyInquiryTemplate({ source: "Studio Footer" });
    if (success) {
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2400);
    }
  };
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans selection:bg-orange-500/30 selection:text-white relative">
      {/* 3D Tubes Cursor Interactive Ambient Layer (Reactive to mouse, non-blocking) */}
      <TubesCursor 
        backgroundOnly={true} 
        tubesColors={["#ff5a1f", "#f59e0b", "#8b5cf6"]} 
        lightsColors={["#ff5a1f", "#9333ea", "#3b82f6", "#06b6d4"]} 
        lightsIntensity={180} 
      />

      {/* Global Translucent Frosted Floating Navbar */}
      <FloatingNavbar />

      {/* Global Right-Edge Vertical Ribbon Badge (Visible across all sections & pages) */}
      <a 
        href={getInquiryWebmailUrl({ source: "Global Side Ribbon" })}
        target="_blank"
        rel="noopener noreferrer"
        title="Start a Project with Kavirox (Opens Pre-Written Email in Gmail Web)"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 flex items-center group cursor-pointer select-none"
      >
        <div className="bg-orange-600 hover:bg-orange-500 text-white py-5 sm:py-6 px-2 sm:px-2.5 text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-2xl rounded-l-md sm:rounded-l-lg border-l border-t border-b border-orange-400/40 transition-all duration-200 group-hover:translate-x-[-3px] group-hover:shadow-[0_0_25px_rgba(234,88,12,0.45)]">
          <span className="rotate-180 [writing-mode:vertical-rl] block">
            Kavirox.space • Tech & Growth
          </span>
        </div>
      </a>

      {/* 1. Main Hero with Kavirox Logo in Top Left & ThreeUI Chromatic Wordmark Physics */}
      <KaviroxEditorialHero />

      {/* 2. Services Section: 11 Core Service Lines Grounded in Proposal */}
      <KaviroxServices />

      {/* 3. Solutions Section: Turnkey Architectures, Blueprints & Metrics */}
      <KaviroxSolutions />

      {/* 4. Capabilities Section: Complete Tooling Stack, Delivery Lifecycle & Engagement Models */}
      <KaviroxCapabilities />

      {/* Global Studio Footer & Contact Anchor (Clean, Brutalist, Translucent) */}
      <footer id="contact" className="relative z-10 bg-zinc-950/40 backdrop-blur-md border-t border-white/10 pt-16 pb-12 text-zinc-400 font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-start">
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/Kavirox_logo.png"
                  alt="Kavirox"
                  className="h-8 md:h-10 w-auto object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const fallback = target.parentElement?.querySelector(".footer-fallback");
                    if (fallback) fallback.classList.remove("hidden");
                  }}
                />
                <div className="footer-fallback hidden text-xl font-bold tracking-tight text-white font-mono">
                  KAVIROX.SPACE
                </div>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 font-mono max-w-md leading-relaxed">
                A technology and e-commerce studio helping consumer brands build faster online stores, automate customer messaging, and turn visitors into regular buyers.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                GBU Incubation • Greater Noida, Uttar Pradesh 201312
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <div className="text-xs uppercase font-mono tracking-widest text-zinc-200 mb-3">
                Navigation
              </div>
              <ul className="space-y-2 text-xs font-mono">
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    01 // Index
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-orange-400 transition-colors">
                    02 // Services
                  </a>
                </li>
                <li>
                  <a href="#solutions" className="hover:text-orange-400 transition-colors">
                    03 // Solutions
                  </a>
                </li>
                <li>
                  <a href="#capabilities" className="hover:text-orange-400 transition-colors">
                    04 // Capabilities
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <div className="text-xs uppercase font-mono tracking-widest text-zinc-200 mb-2">
                Connect
              </div>
              <div className="text-xs font-mono text-zinc-300">
                Direct Inquiries:
              </div>

              {/* Primary Email CTA (Redirects to Email Website with Pre-Written Brief) */}
              <a
                href={getInquiryWebmailUrl({ source: "Studio Footer Direct Inquiry" })}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Pre-Written Inquiry Email in Gmail Web"
                className="inline-flex items-center justify-center gap-2 w-full py-2 px-3.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/20 transition-all font-sans"
              >
                <span>Email Us (Pre-Written Brief)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Direct Email Address & Template Copy */}
              <div className="flex items-center justify-between gap-2 pt-1 text-xs font-mono">
                <a
                  href={getInquiryWebmailUrl({ source: "Studio Footer Email Link" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors"
                >
                  info@kavirox.space
                  <ArrowUpRight className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyTemplate}
                  className="text-zinc-400 hover:text-white transition-colors text-[11px] underline underline-offset-2 inline-flex items-center gap-1 cursor-pointer"
                  title="Copy pre-written inquiry email template to clipboard"
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

              <p className="text-[11px] text-zinc-500 font-mono leading-relaxed pt-0.5">
                Pre-written inquiry brief opens in Gmail Web. Just edit your brand name & send.
              </p>

              {/* Social Channels */}
              <div className="flex items-center gap-4 pt-3 text-zinc-400">
                <a
                  href="https://www.linkedin.com/company/kavirox/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <LinkedIn />
                </a>
                <a
                  href="https://www.instagram.com/kavirox.space?stkn=encybWN2NTFhZ291"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 hover:text-white"
                  aria-label="X"
                >
                  <X />
                </a>
                <a
                  href="https://threads.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 hover:text-white"
                  aria-label="Threads"
                >
                  <Threads />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
            <div>
              © {new Date().getFullYear()} Kavirox.space. All rights reserved.
            </div>
            <div className="flex items-center gap-1">
              Built with precision & high-performance engineering
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive AI Studio Concierge (OpenRouter Free Model Integration) */}
      <KaviroxChatbot />
    </div>
  );
}

export default App;
