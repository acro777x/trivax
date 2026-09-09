import React from 'react';
import FloatingNavbar from '@/domains/marketing/components/floating-navbar';
import KaviroxEditorialHero from '@/domains/marketing/components/kavirox-editorial-hero';
import KaviroxServices from '@/domains/services/components/kavirox-services';
import KaviroxSolutions from '@/domains/solutions/components/kavirox-solutions';
import KaviroxCapabilities from '@/domains/capabilities/components/kavirox-capabilities';
import { ArrowUpRight, Heart } from 'lucide-react';
import { LinkedIn, Instagram, X, Threads } from '@aliimam/logos';

export function App() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans selection:bg-orange-500/30 selection:text-white relative">
      {/* Global Translucent Frosted Floating Navbar */}
      <FloatingNavbar />

      {/* 1. Main Hero with Kavirox Logo in Top Left & ThreeUI Chromatic Wordmark Physics */}
      <KaviroxEditorialHero />

      {/* 2. Services Section: 11 Core Service Lines Grounded in Proposal */}
      <KaviroxServices />

      {/* 3. Solutions Section: Turnkey Architectures, Blueprints & Metrics */}
      <KaviroxSolutions />

      {/* 4. Capabilities Section: Complete Tooling Stack, Delivery Lifecycle & Engagement Models */}
      <KaviroxCapabilities />

      {/* Global Studio Footer & Contact Anchor (Clean, Brutalist) */}
      <footer id="contact" className="relative z-10 bg-zinc-950 border-t border-white/10 pt-16 pb-12 text-zinc-400 font-sans">
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
              <div className="text-xs uppercase font-mono tracking-widest text-zinc-200 mb-3">
                Connect
              </div>
              <div className="text-xs font-mono text-zinc-300">
                Direct Inquiries:
              </div>
              <a
                href="mailto:info@kavirox.space"
                className="inline-flex items-center gap-1.5 text-sm font-mono text-orange-400 hover:text-orange-300 transition-colors"
              >
                info@kavirox.space
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

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
    </div>
  );
}

export default App;
