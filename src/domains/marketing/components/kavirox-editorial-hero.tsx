import React, { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { BadgeQuestionMark } from "@aliimam/icons";
import { Instagram, Threads, X, LinkedIn } from "@aliimam/logos";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ChromaticText } from "./chromatic-text";
import { getInquiryWebmailUrl } from "@/shared/lib/email-inquiry";

export function KaviroxEditorialHero() {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLAnchorElement>(null);

  // GSAP Entrance and continuous chromatic animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered Headline Reveal with blur-to-sharp & chromatic shift
      gsap.fromTo(
        ".gsap-headline-row",
        { opacity: 0, y: 50, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.2, ease: "power3.out" }
      );

      // 2. Letters chromatic RGB split reveal
      gsap.fromTo(
        ".chromatic-letter",
        { opacity: 0, y: 30, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.9, 
          stagger: 0.04, 
          ease: "back.out(1.7)",
          delay: 0.2 
        }
      );

      // 3. Badge Elastic Rotation
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { scale: 0, rotate: -90, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, duration: 1.3, delay: 0.4, ease: "elastic.out(1, 0.45)" }
        );
      }

      // 4. Heart SVG Pulse
      if (heartRef.current) {
        gsap.to(heartRef.current, {
          scale: 1.12,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // 5. Floating Ribbon Animation
      if (ribbonRef.current) {
        gsap.to(ribbonRef.current, {
          y: "+=10",
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // 6. Interactive Mouse Parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const xNorm = (e.clientX / innerWidth - 0.5) * 2;
        const yNorm = (e.clientY / innerHeight - 0.5) * 2;

        gsap.to(".gsap-parallax-bg", {
          x: xNorm * 15,
          y: yNorm * 15,
          duration: 0.9,
          ease: "power2.out"
        });

        gsap.to(".gsap-chromatic-glow", {
          x: xNorm * -10,
          y: yNorm * -10,
          duration: 1.1,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={heroContainerRef}
      className="min-h-screen relative bg-[#09090b] text-[#fafafa] overflow-hidden selection:bg-orange-500/30 selection:text-white font-sans flex flex-col justify-between"
    >
      {/* Subtle Dot Matrix Grid with GSAP Parallax */}
      <div 
        className="gsap-parallax-bg w-full absolute inset-0 z-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.18)_1px,_transparent_1px)] opacity-20 pointer-events-none"
        style={{ backgroundSize: "24px 24px" }} 
      />

      {/* Subtle Ambient Radial Glow */}
      <div className="gsap-chromatic-glow absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-b from-orange-500/15 via-rose-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header with Kavirox Logo in Top Left Corner */}
      <header className="relative z-10 flex justify-between items-center px-6 md:px-12 pt-18 sm:pt-20 lg:pt-6">
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            {/* Kavirox Logo */}
            <div className="relative flex items-center justify-center">
              <img
                src="/Kavirox_logo.png"
                alt="Kavirox Logo"
                className="h-8 sm:h-9 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.parentElement?.querySelector(".logo-fallback");
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div className="logo-fallback hidden flex items-center gap-2">
                <img src="/kavirox-kmark.svg" alt="Kavirox" className="h-7 w-7" />
                <span className="text-lg md:text-xl font-bold tracking-tight">KAVIROX</span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col border-l border-white/10 pl-3">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Technology & Growth Partner
              </span>
              <span className="text-[11px] text-white/40 font-mono">GBU Incubation</span>
            </div>
          </a>
        </div>

        {/* Balanced spacer for global floating navbar on desktop */}
        <div className="hidden lg:block w-96" aria-hidden="true" />

        {/* Header Action: Start Your Project (Redirects to Email Website) */}
        <div className="flex items-center gap-3">
          <a
            href={getInquiryWebmailUrl({ source: "Hero Header Start" })}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Pre-Written Inquiry Email in Gmail Web"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 rounded-full text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/20 transition-all hover:scale-105"
          >
            <span className="hidden sm:inline">Start Your Project</span>
            <span className="sm:hidden">Start Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Hero Content with Integrated Chromatic Text Animation */}
      <main className="relative z-10 pt-10 sm:pt-14 md:pt-20 pb-12 my-auto">
        <div className="flex relative gap-2 px-6 md:items-center w-full flex-col justify-center max-w-7xl mx-auto">
          
          {/* Headline Row 1: Description + DIGITAL with Chromatic Text Animation */}
          <div className="gsap-headline-row md:flex gap-8 items-center w-full justify-center">
            <p className="text-xs text-zinc-400 md:text-sm text-start md:text-right leading-5 max-w-[240px] md:max-w-[210px] font-mono">
              Kavirox is a technology, e-commerce, and automation studio founded at Gautam Buddha University.
            </p>
            <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-[9.5rem] font-light leading-none tracking-tight flex cursor-default select-none">
              <ChromaticText text="DIGITAL" seed={7719} delay={0.15} duration={1.3} />
            </h1>
          </div>

          {/* Headline Row 2: PR + Badge + DUCTS + Description */}
          <div className="gsap-headline-row md:flex gap-8 items-center w-full justify-center">
            <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-[9.5rem] flex items-center font-light leading-none tracking-tight cursor-default select-none">
              <ChromaticText text="PR" seed={9051} delay={0.25} duration={1.3} />
              <div 
                ref={badgeRef}
                className="inline-flex items-center justify-center mx-1 md:mx-2 text-orange-500"
              >
                <BadgeQuestionMark
                  type="solid"
                  className="lg:size-36 md:size-24 size-14 text-orange-500 transition-transform hover:rotate-12"
                />
              </div>
              <ChromaticText text="DUCTS" seed={4242} delay={0.32} duration={1.3} />
            </h1>
            <p className="text-xs text-zinc-400 md:text-sm pt-4 md:pt-0 leading-5 max-w-[260px] md:max-w-[210px] font-mono">
              We build fast online stores, automate customer messaging, and help modern brands grow with confidence.
            </p>
          </div>

          {/* Headline Row 3: DESIGN + Heart + CODE with Chromatic Text Animation */}
          <div className="gsap-headline-row md:flex gap-6 items-center w-full justify-center">
            <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-[9.5rem] flex items-center font-light leading-none tracking-tight cursor-default select-none">
              <ChromaticText text="DESIGN" seed={6103} delay={0.45} duration={1.3} />
              <div ref={heartRef} className="hidden lg:block mx-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="130"
                  height="130"
                  viewBox="0 0 24 24"
                  fill="#f43f5e"
                  className="transition-transform duration-500 hover:scale-110"
                >
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </div>
              <div className="block lg:hidden mx-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="#f43f5e"
                >
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </div>
              <ChromaticText text="CODE" seed={8391} delay={0.55} duration={1.3} />
            </h1>
          </div>
        </div>

        {/* Separator & Studio Meta */}
        <div className="mx-auto max-w-7xl w-full px-6 mt-10 md:mt-14">
          <Separator className="w-full my-6 mx-auto max-w-5xl bg-white/10" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-5xl mx-auto w-full px-2">
            <div className="text-[11px] md:text-xs tracking-widest uppercase font-mono text-zinc-500 whitespace-nowrap select-none">
              GREATER NOIDA, INDIA • GBU CAMPUS 201312
            </div>
            <div className="flex items-baseline gap-2.5 sm:gap-3.5 whitespace-nowrap shrink-0">
              <span className="text-xs sm:text-sm md:text-base font-extralight tracking-wider text-zinc-400 uppercase whitespace-nowrap select-none">
                TECHNOLOGY & E-COMMERCE
              </span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold italic tracking-tight text-orange-500 cursor-pointer whitespace-nowrap select-none inline-flex items-center">
                <ChromaticText text="kavirox.space" seed={8808} delay={0.7} duration={1.1} />
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Meta & Social Links */}
      <footer className="relative z-10 px-6 md:px-12 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/5">
        <div className="text-xs text-zinc-500 font-mono">
          © {new Date().getFullYear()} Kavirox.space • Digital Systems & Growth Engineering
        </div>

        {/* Social Links Bottom Right */}
        <div className="flex items-center gap-5 text-zinc-400">
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
            aria-label="X (Twitter)"
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

        {/* Fixed Right Edge Vertical Ribbon Badge (Interactive Contact Option) */}
        <a 
          ref={ribbonRef}
          href={getInquiryWebmailUrl({ source: "Hero Side Ribbon" })}
          target="_blank"
          rel="noopener noreferrer"
          title="Start a Project with Kavirox (Opens Pre-Written Email in Gmail Web)"
          className="fixed right-0 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center group cursor-pointer"
        >
          <div className="bg-orange-600 group-hover:bg-orange-500 text-white py-6 px-2.5 text-xs font-bold tracking-widest uppercase shadow-xl rounded-l-md border-l border-t border-b border-orange-400/40 transition-all duration-200 group-hover:translate-x-[-3px]">
            <span className="rotate-180 [writing-mode:vertical-rl]">
              Kavirox.space • Tech & Growth
            </span>
          </div>
        </a>
      </footer>
    </div>
  );
}

export default KaviroxEditorialHero;
