import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ShoppingBag, 
  Cpu, 
  Layers, 
  Mail 
} from "lucide-react";
import { getInquiryWebmailUrl } from "@/shared/lib/email-inquiry";

interface NavAction {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isExternal?: boolean;
}

const mobileNavActions: NavAction[] = [
  { id: "hero", label: "Index", href: "#", icon: Sparkles },
  { id: "services", label: "Services", href: "#services", icon: ShoppingBag },
  { id: "solutions", label: "Systems", href: "#solutions", icon: Cpu },
  { id: "capabilities", label: "Stack", href: "#capabilities", icon: Layers },
  { 
    id: "inquire", 
    label: "Inquire", 
    href: getInquiryWebmailUrl({ source: "Mobile Bottom Nav" }), 
    icon: Mail,
    isExternal: true 
  },
];

export function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState<string>("hero");

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const contactEl = document.getElementById("contact");
          const capabilitiesEl = document.getElementById("capabilities");
          const solutionsEl = document.getElementById("solutions");
          const servicesEl = document.getElementById("services");

          if (contactEl && contactEl.getBoundingClientRect().top < 400) {
            setActiveTab("inquire");
          } else if (capabilitiesEl && capabilitiesEl.getBoundingClientRect().top < 300) {
            setActiveTab("capabilities");
          } else if (solutionsEl && solutionsEl.getBoundingClientRect().top < 300) {
            setActiveTab("solutions");
          } else if (servicesEl && servicesEl.getBoundingClientRect().top < 300) {
            setActiveTab("services");
          } else {
            setActiveTab("hero");
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavAction) => {
    if (item.isExternal) return; // Opens Gmail compose in new tab / webmail

    if (item.href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveTab("hero");
      return;
    }

    if (item.href.startsWith("#")) {
      e.preventDefault();
      const targetEl = document.getElementById(item.href.slice(1));
      if (targetEl) {
        const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
        setActiveTab(item.id);
      }
    }
  };

  return (
    <nav 
      className="fixed bottom-0 inset-x-0 z-40 bg-zinc-950/85 backdrop-blur-2xl border-t border-white/10 px-2 py-1.5 flex items-center justify-around shadow-[0_-8px_30px_rgba(0,0,0,0.8)]"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0.5rem))" }}
      aria-label="Mobile Navigation"
    >
      {mobileNavActions.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        const isHighlight = item.id === "inquire";

        return (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleNavClick(e, item)}
            target={item.isExternal ? "_blank" : undefined}
            rel={item.isExternal ? "noopener noreferrer" : undefined}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 select-none relative ${
              isHighlight
                ? "text-orange-400 active:scale-90"
                : isActive
                ? "text-white active:scale-90"
                : "text-zinc-500 hover:text-zinc-300 active:scale-95"
            }`}
          >
            {/* Active Glow Pill */}
            {isActive && !isHighlight && (
              <span className="absolute -top-1.5 w-6 h-1 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            )}

            <div className={`p-1 rounded-lg transition-colors ${isActive ? "bg-white/10 text-orange-400" : ""}`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono tracking-tight mt-0.5">
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

export default MobileBottomNav;
