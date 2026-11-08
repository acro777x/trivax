import React, { Suspense, lazy, useEffect, useRef } from 'react';
import ScrollFloat from '@/components/ui/ScrollFloat';
import { Package, Wrench, Code2, Layers, ArrowUpRight } from 'lucide-react';
import { getInquiryWebmailUrl } from '@/shared/lib/email-inquiry';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isQaMode } from '@/shared/hooks/use-device-tier';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Particles = lazy(() => import('@/components/ui/Particles'));

interface WorkModel {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const WORK_MODELS: WorkModel[] = [
  {
    number: '01',
    title: 'Ready-built product',
    description:
      'Choose a Kavirox product that already addresses the main need. We explain scope, setup, limits, data handling, support and price.',
    icon: Package,
  },
  {
    number: '02',
    title: 'Product implementation',
    description:
      'We configure, onboard users, connect data, set permissions, integrate with your platforms and train your team.',
    icon: Wrench,
  },
  {
    number: '03',
    title: 'Custom development',
    description:
      'For needs no product covers: websites, applications, SaaS modules, integrations, automation, dashboards.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'Product plus custom extension',
    description:
      'Start from a product and commission extra modules or integrations. We separate what is standard from what is custom.',
    icon: Layers,
  },
];

export const WorkWithUsSection: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const qa = isQaMode();

  useEffect(() => {
    const el = cardsRef.current;
    if (!el || qa) return;

    const cards = el.querySelectorAll('.work-model-card');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 64, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [qa]);

  return (
    <section
      id="solutions"
      className="relative w-full py-20 sm:py-24 md:py-28 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto scroll-mt-24 overflow-hidden isolate"
      aria-label="How you can work with Kavirox"
    >
      <span id="work-with-us" className="sr-only" />

      {/* Dedicated Original Particles Background for Work With Us Section */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <Suspense fallback={null}>
          <Particles
            particleColors={["#ffffff", "#ffffff", "#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            glow={0.5}
            twinkle={0.3}
            moveParticlesOnHover
            hoverEffect="parallax"
            sizeRandomness={1}
            shape="circle"
            depthOfField={0}
            connections={false}
            connectionDistance={110}
            particleHoverFactor={1}
            hoverRadius={140}
            drift="none"
            driftSpeed={1}
            alphaParticles={false}
            disableRotation={false}
            cameraDistance={20}
            variation={0}
            opacity={1}
            clickBurst
            intro
            lightMode={false}
          />
        </Suspense>
      </div>

      {/* Eyebrow and Heading with Zero-Collision Spacing */}
      <div className="max-w-3xl mb-12 sm:mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-3">
          <span className="w-4 h-[1px] bg-primary" />
          <span>Work with us</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-text tracking-tight leading-[1.08] text-balance mb-4">
          <ScrollFloat effect="float" splitBy="words" animationDuration={0.85} stagger={0.035}>
            Four ways to start.
          </ScrollFloat>
        </h2>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl leading-relaxed text-pretty">
          Use a product as it is, have us set it up, build something custom, or start from a product and extend it.
        </p>
      </div>

      {/* 4 Cards Grid with Desktop Connector Line & Smooth Staggered Cascade */}
      <div ref={cardsRef} className="relative z-10">
        {/* Desktop Connector line with traveling pulse */}
        <div
          className="hidden lg:block absolute top-12 left-8 right-8 h-[1px] bg-white/10 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <div className="w-24 h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORK_MODELS.map((model) => {
            const Icon = model.icon;
            return (
              <div
                key={model.number}
                className="work-model-card cursor-target group relative rounded-2xl bg-surface/80 border border-white/10 hover:border-primary/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                data-cursor-label="Start"
              >
                <div>
                  {/* Top row: Icon + Plain Numeral */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-sm font-semibold text-text-muted/60">
                      {model.number}
                    </span>
                  </div>

                  {/* Title & Body */}
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-primary transition-colors mb-2.5">
                    {model.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {model.description}
                  </p>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                  <a
                    href={getInquiryWebmailUrl({
                      source: `Work Model: ${model.title}`,
                      modelTitle: model.title,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold text-white/90 group-hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    <span>Get started</span>
                  </a>
                  <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-primary/20 flex items-center justify-center text-text-muted group-hover:text-primary transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkWithUsSection;
