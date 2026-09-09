import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { getInquiryWebmailUrl, openEmailInquiry } from "@/shared/lib/email-inquiry";

interface NavItem {
  id: string;
  label: string;
  href: string;
  targetId?: string;
  isAvailable: boolean;
}

const navItems: NavItem[] = [
  { id: "index", label: "Index", href: "#", isAvailable: true },
  { id: "services", label: "Services", href: "#services", targetId: "services", isAvailable: true },
  { id: "solutions", label: "Solutions", href: "#solutions", targetId: "solutions", isAvailable: true },
  { id: "work", label: "Our Work", href: "#work", targetId: "work", isAvailable: false },
  { id: "capabilities", label: "Capabilities", href: "#capabilities", targetId: "capabilities", isAvailable: true },
  { id: "contact", label: "Contact", href: "#contact", targetId: "contact", isAvailable: true },
];

export function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState("index");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);
  const [workNotice, setWorkNotice] = useState(false);

  // Sliding pill position and width
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  const itemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const navRef = useRef<HTMLElement>(null);

  // Smooth Section Tracking via requestAnimationFrame & focal line
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
          setScrollProgress(Math.min(Math.max(progress, 0), 100));
          setIsScrolled(scrollY > 30);

          // Focus line at 35% of the viewport height
          const focalY = window.innerHeight * 0.35;

          const contactEl = document.getElementById("contact");
          const capabilitiesEl = document.getElementById("capabilities");
          const solutionsEl = document.getElementById("solutions");
          const servicesEl = document.getElementById("services");

          // Bottom to top evaluation for accurate active state
          if (contactEl && contactEl.getBoundingClientRect().top <= focalY + 150) {
            setActiveSection("contact");
          } else if (capabilitiesEl && capabilitiesEl.getBoundingClientRect().top <= focalY) {
            setActiveSection("capabilities");
          } else if (solutionsEl && solutionsEl.getBoundingClientRect().top <= focalY) {
            setActiveSection("solutions");
          } else if (servicesEl && servicesEl.getBoundingClientRect().top <= focalY) {
            setActiveSection("services");
          } else {
            setActiveSection("index");
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Update gliding frosted pill indicator whenever active section or hover changes
  const updatePill = useCallback(() => {
    const targetId = hoveredItem?.id || activeSection;
    const targetEl = itemRefs.current[targetId];

    if (targetEl && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const elRect = targetEl.getBoundingClientRect();
      const left = elRect.left - navRect.left + (navRef.current.scrollLeft || 0);
      const width = elRect.width;

      setIndicatorStyle({
        left,
        width,
        opacity: 1,
      });
    }
  }, [activeSection, hoveredItem]);

  useEffect(() => {
    updatePill();
    // Safety check after fonts render
    const timer = setTimeout(updatePill, 120);
    return () => clearTimeout(timer);
  }, [updatePill]);

  // Recalculate on window resize
  useEffect(() => {
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  // Smooth scroll handler
  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (!item.isAvailable && item.id === "work") {
      e.preventDefault();
      setWorkNotice(true);
      setTimeout(() => setWorkNotice(false), 2600);
      return;
    }

    if (item.href.startsWith("#")) {
      e.preventDefault();

      if (item.id === "contact") {
        // Redirect to pre-written formatted email compose on email website (Gmail Web)
        openEmailInquiry({ source: "Floating Navbar Contact" });
        // Smoothly scroll down to contact section
        const el = document.getElementById("contact");
        if (el) {
          const targetY = el.getBoundingClientRect().top + window.scrollY - 76;
          window.scrollTo({ top: targetY, behavior: "smooth" });
          setActiveSection("contact");
        }
        return;
      }

      if (item.href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("index");
      } else if (item.targetId) {
        const el = document.getElementById(item.targetId);
        if (el) {
          const targetY = el.getBoundingClientRect().top + window.scrollY - 76;
          window.scrollTo({ top: targetY, behavior: "smooth" });
          setActiveSection(item.id);
        }
      }
    }
  };

  // Distance / direction guidance calculation
  const getScrollGuidance = (item: NavItem) => {
    if (item.id === "work") return "Case Studies (Coming Soon)";
    if (item.id === "contact") return "Opens Pre-Written Email Inquiry ↗";

    if (!item.targetId || item.id === "index") {
      return window.scrollY > 120 ? "Scroll to Top ↑" : "Current View";
    }

    const el = document.getElementById(item.targetId);
    if (!el) return null;

    const rect = el.getBoundingClientRect();
    const distancePx = Math.round(rect.top - 76);

    if (Math.abs(distancePx) < 160) {
      return "Current View";
    } else if (distancePx > 0) {
      const screens = (distancePx / window.innerHeight).toFixed(1);
      return `Scroll Down ↓ (~${screens} screens)`;
    } else {
      const screens = (Math.abs(distancePx) / window.innerHeight).toFixed(1);
      return `Scroll Up ↑ (~${screens} screens)`;
    }
  };

  return (
    <div
      className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[95vw] sm:max-w-max transition-transform duration-300 ease-out"
    >
      {/* 
        True Frosted Glass Container:
        - 72% - 80% opacity dark glass tint
        - Hardware accelerated backdrop-filter blur(24px) & saturate(180%)
        - Crisply defined 14% white border + top rim specular highlight
        - Deep soft drop shadow for floating elevation
      */}
      <div
        className="relative flex items-center rounded-full p-1.5 transition-all duration-300"
        style={{
          background: isScrolled
            ? "rgba(14, 14, 18, 0.82)"
            : "rgba(18, 18, 24, 0.74)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: isScrolled
            ? "0 20px 48px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 0 rgba(0, 0, 0, 0.5)"
            : "0 12px 36px -8px rgba(0, 0, 0, 0.55), inset 0 1px 0 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 0 rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Subtle Specular Sheen Overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

        {/* Kavirox Quick Return Home Mark - Smooth & Minimal Green Color K */}
        <a
          href="#"
          onClick={(e) => handleItemClick(e, navItems[0])}
          className="flex items-center pl-1.5 sm:pl-2 pr-2 sm:pr-2.5 py-1 mr-1 border-r border-white/10 group cursor-pointer shrink-0 focus:outline-none"
          title="Kavirox - Back to Top"
        >
          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-[#09090b] font-sans font-black text-[11px] sm:text-xs leading-none transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.65)] shadow-[0_0_8px_rgba(16,185,129,0.35)]">
            K
          </div>
        </a>

        {/* Navigation Items with Persistent Gliding Frosted Pill */}
        <nav
          ref={navRef}
          className="relative flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-xs md:text-sm font-sans overflow-x-auto scrollbar-none"
        >
          {/* Smooth Gliding Frosted Pill Indicator (Minimal & Refined) */}
          <div
            className="absolute top-1 bottom-1 left-0 rounded-full pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          >
            {/* Pill Interior: Minimal Translucent Frosted Glass */}
            <div className="w-full h-full rounded-full bg-white/[0.09] border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_8px_rgba(0,0,0,0.25)] backdrop-blur-md relative overflow-hidden">
              {/* Soft upward ambient tint */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-orange-500/15 to-transparent pointer-events-none" />
            </div>
            
            {/* Minimal Ambient Underglow Halo */}
            <div 
              className="absolute -bottom-1.5 inset-x-0 mx-auto w-8 h-2.5 rounded-full bg-orange-500/25 blur-sm pointer-events-none"
              style={{
                animation: "ambientGlowPulse 2.8s ease-in-out infinite",
              }}
            />

            {/* Razor-Thin Ambient Light Flare at the bottom rim */}
            <div
              className="absolute -bottom-[1px] inset-x-0 mx-auto w-3/5 max-w-[28px] h-[1.5px] rounded-full pointer-events-none bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_8px_rgba(249,115,22,0.65)]"
              style={{
                animation: "ambientBeamShimmer 2.4s ease-in-out infinite",
              }}
            />
          </div>

          {/* Navigation Links */}
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem?.id === item.id;
            const guidance = isHovered ? getScrollGuidance(item) : null;

            return (
              <div key={item.id} className="relative group">
                <a
                  ref={(el) => {
                    itemRefs.current[item.id] = el;
                  }}
                  href={item.href}
                  onClick={(e) => handleItemClick(e, item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative px-2.5 sm:px-3 py-1 rounded-full transition-colors duration-200 block text-center select-none font-medium whitespace-nowrap ${
                    isActive
                      ? "text-white font-semibold"
                      : isHovered
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <span>{item.label}</span>
                </a>

                {/* Interactive Scroll Distance Guidance Tooltip */}
                {guidance && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-2.5 py-1 rounded-md bg-[#0e0e12]/95 backdrop-blur-xl border border-white/15 text-[10px] font-mono text-orange-400 whitespace-nowrap shadow-2xl pointer-events-none z-50 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150">
                    <Compass className="w-3 h-3 text-orange-400 shrink-0" />
                    <span>{guidance}</span>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Quick Action Start Project CTA Button (Redirects to Email Website) */}
        <a
          href={getInquiryWebmailUrl({ source: "Floating Navbar Start" })}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Pre-Written Inquiry Email in Gmail Web"
          className={`ml-1.5 sm:ml-2.5 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold text-white transition-all duration-300 shrink-0 ${
            isScrolled
              ? "bg-orange-600 hover:bg-orange-500 shadow-sm shadow-orange-600/30 scale-100 opacity-100"
              : "bg-white/10 hover:bg-white/15 text-zinc-200 scale-95 opacity-90 hidden md:inline-flex"
          }`}
        >
          <span>Start</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>

        {/* "Our Work" in-progress toast/pill */}
        {workNotice && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 rounded-full bg-[#121218]/95 backdrop-blur-xl border border-orange-500/30 text-[11px] font-mono text-orange-300 shadow-2xl pointer-events-none z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Case Studies & Work Section coming soon!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FloatingNavbar;
