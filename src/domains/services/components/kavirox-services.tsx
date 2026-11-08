import React, { useState, useMemo, useRef, useEffect, Suspense, lazy } from 'react';
import { serviceLines, ServiceLine } from './service-data';
import Reveal from '@/components/ui/Reveal';
import ScrollFloat from '@/components/ui/ScrollFloat';
import {
  RotateCcw,
  CheckCircle2,
  Search,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isQaMode } from '@/shared/hooks/use-device-tier';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Particles = lazy(() => import('@/components/ui/Particles'));

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'commerce', label: 'Commerce' },
  { key: 'automation', label: 'Automation' },
  { key: 'data-ai', label: 'Data and AI' },
  { key: 'engineering', label: 'Engineering' },
] as const;

const COMPANY_CAPABILITIES = [
  'SaaS & Product Development',
  'Custom Software Engineering',
  'Web & Mobile Applications',
  'UI/UX & Product Design',
  'Cloud Architecture & DevOps',
  'Cybersecurity & Authorized VAPT',
  'Technology Consulting',
  'Workflow Automation',
  'AI Integration & RAG Systems',
  'E-Commerce Infrastructure',
];

export const KaviroxServices: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchExpanded, setSearchExpanded] = useState<boolean>(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const qa = isQaMode();

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip(id);
    }
  };

  const filteredServices = useMemo(() => {
    return serviceLines.filter((service) => {
      const matchesCategory =
        activeCategory === 'all' || service.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Cards cascading animation: coming one by one from below to top on scroll
  useEffect(() => {
    const el = gridRef.current;
    if (!el || qa) return;

    const cards = el.querySelectorAll('.service-card');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 56, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.08,
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
  }, [filteredServices, qa]);

  const getCategoryCount = (catKey: string) => {
    if (catKey === 'all') return serviceLines.length;
    return serviceLines.filter((s) => s.category === catKey).length;
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'commerce':
        return 'bg-primary/10 border-primary/20 text-primary';
      case 'automation':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
      case 'data-ai':
        return 'bg-teal-500/10 border-teal-500/20 text-teal-400';
      case 'engineering':
      default:
        return 'bg-primary/10 border-primary/20 text-primary';
    }
  };

  return (
    <section
      id="services"
      className="relative w-full py-20 sm:py-28 md:py-32 bg-bg border-b border-line overflow-hidden scroll-mt-24 md:scroll-mt-28 isolate"
      aria-label="Kavirox Services"
    >
      {/* Dedicated Original Particles Background for Services Section */}
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

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Header with Zero-Collision Spacing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest mb-1">
              <span className="w-4 h-[1px] bg-primary" />
              <span>Services</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-text tracking-tight leading-[1.05] text-balance mb-4">
              <ScrollFloat effect="float" splitBy="words" animationDuration={0.85} stagger={0.035}>
                Everything around a product, built properly.
              </ScrollFloat>
            </h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed text-pretty">
              Alongside our products, we provide custom software, product engineering, web and mobile, AI and automation, cybersecurity, cloud and DevOps, e-commerce and digital growth support.
            </p>
          </div>

          {/* Expandable Search Input */}
          <div className="relative flex items-center justify-end">
            <div
              className={`flex items-center bg-surface-2 border border-line rounded-full transition-all duration-300 ${
                searchExpanded || searchQuery ? 'w-full sm:w-64 px-3 py-1.5' : 'w-10 h-10 justify-center'
              }`}
            >
              <button
                type="button"
                aria-label="Toggle search input"
                onClick={() => {
                  setSearchExpanded(!searchExpanded);
                  if (!searchExpanded) {
                    setTimeout(() => searchInputRef.current?.focus(), 50);
                  }
                }}
                className="text-text-muted hover:text-white transition-colors"
              >
                <Search className="w-4 h-4 shrink-0" />
              </button>
              {(searchExpanded || searchQuery) && (
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search services or tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => {
                    if (!searchQuery) setSearchExpanded(false);
                  }}
                  className="w-full bg-transparent border-none text-xs text-white placeholder-text-muted/60 focus:outline-none ml-2"
                />
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8 sm:mb-10" role="tablist">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.key;
            const count = getCategoryCount(cat.key);
            return (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(cat.key)}
                className={`cursor-target px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-2 ${
                  active
                    ? 'bg-primary text-primary-ink font-semibold shadow-[0_0_12px_rgba(56,189,248,0.35)] scale-[1.02]'
                    : 'bg-surface/90 text-text-muted hover:text-white hover:border-white/20 border border-white/5'
                }`}
                data-cursor-label="Filter"
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-primary-ink/20 text-primary-ink' : 'bg-white/5 text-text-muted'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Services Grid (Desktop: Featured 2-col first card, 3-col grid; Mobile: snap rail) with Smooth Cascade */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => {
            const Icon = service.icon;
            const isFlipped = flippedCards[service.id];
            const isFeatured = idx === 0 && activeCategory === 'all' && !searchQuery;
            const themeClass = getCategoryTheme(service.category);

            return (
              <div
                key={service.id}
                className={`service-card relative cursor-target ${isFeatured ? 'lg:col-span-2' : 'col-span-1'}`}
                data-cursor-label="Flip"
              >
                <div
                  className="perspective-1000 w-full h-[360px] sm:h-[340px]"
                  onClick={() => toggleFlip(service.id)}
                  onKeyDown={(e) => handleKeyDown(e, service.id)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isFlipped}
                  aria-label={`${service.title}. Press Enter or click to flip.`}
                >
                  <div
                    className={`relative w-full h-full transform-style-3d transition-transform duration-500 ease-kavirox rounded-2xl ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* FRONT FACE */}
                    <div className="absolute inset-0 backface-hidden rounded-2xl bg-surface/90 border border-white/10 hover:border-primary/40 p-6 flex flex-col justify-between shadow-lg transition-colors">
                      <div>
                        {/* Top Row: Icon + Plain Numeral */}
                        <div className="flex items-center justify-between mb-5">
                          <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${themeClass}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-semibold text-text-muted/60 tabular-nums">
                              {service.number}
                            </span>
                            <div className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-muted/80 transition-colors">
                              <RotateCcw className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 leading-snug">
                          {service.title}
                        </h3>
                        <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                          {service.tagline}
                        </p>

                        {/* Featured card extras (top deliverables preview) */}
                        {isFeatured && (
                          <div className="hidden sm:grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5">
                            {service.deliverables.slice(0, 2).map((d, dIdx) => (
                              <div key={dIdx} className="text-xs text-text-muted/90 flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                <span className="line-clamp-2">{d}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Row: Deliverables count chip + Arrow */}
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                          {service.deliverables.length} deliverables
                        </span>
                        <div className="flex items-center gap-1 text-xs font-mono text-text-muted">
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5 text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* BACK FACE */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-surface2/95 border border-primary/30 p-6 flex flex-col justify-between shadow-xl">
                      <div>
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                          <span className="font-mono text-xs font-semibold text-primary uppercase">
                            What you get
                          </span>
                          <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-primary">
                            <RotateCcw className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Deliverables Checklist (first 4 clamped) */}
                        <ul className="space-y-2 text-xs text-text-muted">
                          {service.deliverables.slice(0, 4).map((d, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                              <span className="line-clamp-2 leading-tight">{d}</span>
                            </li>
                          ))}
                          {service.deliverables.length > 4 && (
                            <li className="text-[11px] font-mono text-primary/80 pl-5">
                              + {service.deliverables.length - 4} more deliverables
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Tool Chips */}
                      <div className="pt-3 border-t border-white/10">
                        <span className="text-[10px] font-mono uppercase text-text-muted/60 block mb-1.5">
                          Tools &amp; Stack
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {service.tools.slice(0, 4).map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-text-muted border border-white/5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Capability Strip ("Also") from Company Profile */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="font-mono text-xs uppercase text-primary tracking-widest shrink-0 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Also:
            </span>
            <div className="overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="animate-marquee-css flex items-center gap-3">
                {[...COMPANY_CAPABILITIES, ...COMPANY_CAPABILITIES].map((cap, cIdx) => (
                  <span
                    key={cIdx}
                    className="shrink-0 px-3.5 py-1.5 rounded-full bg-surface2/80 border border-white/10 text-xs font-mono text-text-muted hover:text-white hover:border-primary/40 transition-colors"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KaviroxServices;
