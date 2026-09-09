import React from 'react';
import ResponsiveHeroBanner from '@/components/ui/responsive-hero-banner';
import { ElementsCollection } from '@/shaders/elements/ElementsCollection';

export const KaviroxHero: React.FC = () => {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#060708]">
      <div className="absolute inset-0 z-0">
        <ElementsCollection
          variant="water"
          speed={1.0}
          size={1.0}
          particleAmount={1.0}
          hue={0}
          saturation={1.0}
          brightness={0.65}
          opacity={1.0}
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
      <div className="relative z-10">
        <ResponsiveHeroBanner
          logoUrl="/Kavirox_logo.png"
          transparent
          navLinks={[
            { label: "Home", href: "#", isActive: true },
            { label: "Services", href: "#services" },
            { label: "Contracting", href: "#contracting" },
            { label: "Our Work", href: "#work" },
            { label: "Freelancers", href: "#talent" },
            { label: "Contact", href: "#contact" }
          ]}
          ctaButtonText="Start a Project"
          ctaButtonHref="#services"
          badgeLabel="Startup Studio"
          badgeText="Founded at Gautam Buddha University • gbu.ac.in"
          title="Kavirox"
          titleLine2="The launchpad for next-gen ideas"
          description="We help ambitious brands build fast, reliable online stores, automate customer messaging, and create digital experiences people love."
          primaryButtonText="See Our Services"
          primaryButtonHref="#services"
          secondaryButtonText="Work With Us"
          secondaryButtonHref="#contracting"
          partnersTitle="Founded & Incubated at Academic Institution"
          partners={[
            {
              name: "Gautam Buddha University",
              sublabel: "Founding Campus • gbu.ac.in",
              logoUrl: "/assets/gbu-logo.jpg",
              href: "https://www.gbu.ac.in/"
            }
          ]}
        />
      </div>
    </section>
  );
};

export default KaviroxHero;