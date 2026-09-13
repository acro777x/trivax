import React, { useState, useEffect, useMemo } from "react";
import { Home, Sparkles, Cpu, Layers, Boxes, Mail } from "lucide-react";
import { LimelightNav, NavItem } from "@/components/ui/limelight-nav";

export function FloatingNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [workNotice, setWorkNotice] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Smooth Section Tracking via requestAnimationFrame & focal line
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 30);

          // Focus line at 35% of the viewport height
          const focalY = window.innerHeight * 0.35;

          const contactEl = document.getElementById("contact");
          const capabilitiesEl = document.getElementById("capabilities");
          const solutionsEl = document.getElementById("solutions");
          const servicesEl = document.getElementById("services");

          // Bottom to top evaluation for accurate active state
          if (contactEl && contactEl.getBoundingClientRect().top <= focalY + 160) {
            setActiveIndex(5); // Contact
          } else if (capabilitiesEl && capabilitiesEl.getBoundingClientRect().top <= focalY) {
            setActiveIndex(4); // Capabilities
          } else if (solutionsEl && solutionsEl.getBoundingClientRect().top <= focalY) {
            setActiveIndex(2); // Solutions
          } else if (servicesEl && servicesEl.getBoundingClientRect().top <= focalY) {
            setActiveIndex(1); // Services
          } else {
            setActiveIndex(0); // Index
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

  const navItems: NavItem[] = useMemo(
    () => [
      {
        id: "index",
        icon: <Home className="w-4 h-4" />,
        label: "Index",
        onClick: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveIndex(0);
        },
      },
      {
        id: "services",
        icon: <Sparkles className="w-4 h-4" />,
        label: "Services",
        onClick: () => {
          const el = document.getElementById("services");
          if (el) {
            const targetY = el.getBoundingClientRect().top + window.scrollY - 76;
            window.scrollTo({ top: targetY, behavior: "smooth" });
            setActiveIndex(1);
          }
        },
      },
      {
        id: "solutions",
        icon: <Cpu className="w-4 h-4" />,
        label: "Solutions",
        onClick: () => {
          const el = document.getElementById("solutions");
          if (el) {
            const targetY = el.getBoundingClientRect().top + window.scrollY - 76;
            window.scrollTo({ top: targetY, behavior: "smooth" });
            setActiveIndex(2);
          }
        },
      },
      {
        id: "work",
        icon: <Layers className="w-4 h-4" />,
        label: "Our Work",
        onClick: () => {
          setWorkNotice(true);
          setTimeout(() => setWorkNotice(false), 2600);
          setActiveIndex(3);
        },
      },
      {
        id: "capabilities",
        icon: <Boxes className="w-4 h-4" />,
        label: "Capabilities",
        onClick: () => {
          const el = document.getElementById("capabilities");
          if (el) {
            const targetY = el.getBoundingClientRect().top + window.scrollY - 76;
            window.scrollTo({ top: targetY, behavior: "smooth" });
            setActiveIndex(4);
          }
        },
      },
      {
        id: "contact",
        icon: <Mail className="w-4 h-4" />,
        label: "Contact",
        onClick: () => {
          const el = document.getElementById("contact");
          if (el) {
            const targetY = el.getBoundingClientRect().top + window.scrollY - 76;
            window.scrollTo({ top: targetY, behavior: "smooth" });
            setActiveIndex(5);
          }
        },
      },
    ],
    []
  );

  return (
    <div className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[95vw] sm:max-w-max transition-all duration-300 ease-out">
      {/* 
        Limelight Navigation Bar:
        - Logo completely removed as requested
        - Dramatic overhead limelight emitter & conical light beam highlighting active section
        - Smooth sliding transitions with frosted backdrop-blur container
      */}
      <div className="relative">
        <LimelightNav
          items={navItems}
          activeIndex={activeIndex}
          onTabChange={(index) => setActiveIndex(index)}
          showLabels={true}
          className={`h-11 sm:h-12 rounded-full transition-all duration-300 px-1 sm:px-2 border border-white/10 backdrop-blur-md ${
            isScrolled
              ? "bg-zinc-900/35 border-white/15 shadow-xl shadow-black/40"
              : "bg-zinc-900/20 hover:bg-zinc-900/30 shadow-lg shadow-black/20"
          }`}
          limelightClassName="bg-orange-500 shadow-[0_25px_15px_rgba(249,115,22,0.95)]"
          iconContainerClassName="px-2.5 sm:px-3.5 py-1 text-xs sm:text-[13px]"
        />

        {/* "Our Work" in-progress toast/pill */}
        {workNotice && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 rounded-full bg-[#121218]/95 backdrop-blur-xl border border-orange-500/30 text-[11px] font-mono text-orange-300 shadow-2xl pointer-events-none z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span>Case Studies & Work Section coming soon!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FloatingNavbar;
