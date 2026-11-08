import React, { useEffect, useRef } from 'react';
import { PRODUCTS_DATA, ProductItem } from '../data/products-data';
import { PhoneMock } from './phone-mock';
import { StatusBadge } from './status-badge';
import { LogoMark } from '@/shared/components/logo';
import { getInquiryActionUrl, openEmailInquiry } from '@/shared/lib/email-inquiry';
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertCircle, Layers, ShieldCheck, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

interface ProductDetailViewProps {
  slug: string;
  onBack: () => void;
  onNavigateProduct: (newSlug: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  slug,
  onBack,
  onNavigateProduct,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const product = PRODUCTS_DATA.find((p) => p.slug === slug || (slug === 'gbu-sdsm' && p.slug === 'gbu-sdms'));

  // Focus heading and set title
  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      document.title = `${product.name} — Kavirox Products`;
      setTimeout(() => headingRef.current?.focus(), 100);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // GSAP Scene-Opening entrance
    const tl = gsap.timeline();
    if (containerRef.current) {
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' }
      );
    }
    if (heroRef.current) {
      tl.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      );
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [slug, product, onBack]);

  if (!product) {
    return (
      <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display font-extrabold text-3xl mb-3 text-white">
          That page is not here.
        </h1>
        <p className="text-text-muted mb-6">Go back to Kavirox.</p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-ink font-display font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to products</span>
        </button>
      </div>
    );
  }

  // Next two products for the bottom carousel
  const otherProducts = PRODUCTS_DATA.filter((p) => p.slug !== slug).slice(0, 2);

  const inquiryUrl = getInquiryActionUrl({
    source: `Product Detail: ${product.name}`,
  });

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-bg text-text selection:bg-primary/30 selection:text-white relative z-50"
    >
      {/* Sticky Slim Top Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#060913]/85 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <button
          onClick={onBack}
          className="cursor-target inline-flex items-center gap-2 text-sm font-mono text-text-muted hover:text-white transition-colors"
          data-cursor-label="Back"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span className="hidden sm:inline">Back to products</span>
          <span className="sm:hidden">Back</span>
        </button>

        <a href="#top" onClick={(e) => { e.preventDefault(); onBack(); }} className="flex items-center gap-2">
          <LogoMark size={24} />
          <span className="font-display font-bold text-sm text-white tracking-wide">
            KAVIROX
          </span>
        </a>

        <a
          href={inquiryUrl}
                onClick={(e) => { e.preventDefault(); openEmailInquiry({ source: `Product Detail: ${product.name}` }); }}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-target inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-primary text-primary-ink font-display font-bold text-xs hover:brightness-110 transition-all shadow-[0_0_12px_rgba(56, 189, 248,0.3)] shrink-0"
          data-cursor-label="Open"
        >
          <span className="hidden sm:inline">Discuss a project like this</span>
          <span className="sm:hidden">Discuss</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </a>
      </header>

      {/* Main Content Stage */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pt-10 sm:pt-16 pb-24">
        {/* Stage Hero Section */}
        <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center mb-16 sm:mb-24">
          {/* Left Column: Spec & Titles */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={product.status} type={product.statusType} />
              <span className="text-xs font-mono text-text-muted/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.04] outline-none"
            >
              {product.name}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-text-muted font-normal leading-relaxed text-pretty">
              {product.oneLine}
            </p>

            {/* Fact Chips Row */}
            <div className="pt-2 flex flex-wrap gap-2">
              {product.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono text-text-muted/90 bg-surface2/90 border border-white/10 px-3 py-1.5 rounded-lg"
                >
                  {t}
                </span>
              ))}
            </div>

            {product.externalUrl && (
              <div className="pt-3">
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-target inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-sm font-mono text-white transition-colors border border-white/15"
                >
                  <span>Open live preview</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                </a>
              </div>
            )}
          </div>

          {/* Right Column: Large Phone Mock Hero */}
          <div className="lg:col-span-5 flex justify-center relative py-4">
            <PhoneMock product={product} isStage={true} />
          </div>
        </div>

        {/* The Problem */}
        <section className="mb-16 sm:mb-24 pt-10 border-t border-white/10">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase text-primary tracking-widest mb-2.5">
              The problem
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white leading-snug">
              {product.problem}
            </h2>
          </div>
        </section>

        {/* What It Does (Feature Grid) */}
        <section className="mb-16 sm:mb-24">
          <div className="text-xs font-mono uppercase text-primary tracking-widest mb-4">
            What it does
          </div>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-3xl mb-8">
            {product.whatItDoes}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.featureGroups.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-surface/80 border border-white/10 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Screens Gallery (if screens exist) */}
        {product.screens.length > 0 && (
          <section className="mb-16 sm:mb-24 pt-10 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xs font-mono uppercase text-primary tracking-widest">
                Screens &amp; Interface
              </div>
              <span className="text-xs font-mono text-text-muted/70">
                {product.screens.length} screens captured
              </span>
            </div>

            {/* Lead visual: Clean, unobstructed high-fidelity interface showcase */}
            {product.stageImage && (
              <div className="w-full my-6 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-4 sm:p-8 relative shadow-2xl">
                <div className="max-w-3xl mx-auto flex flex-col items-center">
                  <div className="w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/80">
                    <img
                      src={product.stageImage}
                      alt={`${product.name} Primary Interface`}
                      className="w-full h-auto max-h-[560px] object-contain mx-auto"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs font-mono text-text-muted">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span>Live interface capture: {product.name}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Screens Gallery Rail */}
            <div className="w-full my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#08100a]/80 backdrop-blur-md">
              <div className="overflow-x-auto pb-6 pt-6 px-4 sm:px-6 flex gap-6 snap-x snap-mandatory scrollbar-none">
                {product.screens.map((screen, sIdx) => {
                  const isWide =
                    product.mockType === 'table' ||
                    screen.file.includes('dashboard') ||
                    screen.file.includes('analytics') ||
                    screen.file.includes('records') ||
                    screen.file.includes('retrieval') ||
                    screen.file.includes('ticket');

                  return (
                    <div
                      key={sIdx}
                      className={`snap-center shrink-0 flex flex-col ${
                        isWide ? 'w-[320px] sm:w-[460px]' : 'w-[240px] sm:w-[280px]'
                      }`}
                    >
                      <div className="rounded-2xl overflow-hidden border border-white/20 bg-black/70 shadow-xl p-2 mb-3 transition-transform hover:scale-[1.01]">
                        <img
                          src={`/projects/${product.slug}/${screen.file}`}
                          alt={screen.caption}
                          className={`w-full ${
                            isWide ? 'aspect-[16/10]' : 'aspect-[9/16]'
                          } object-cover object-top rounded-xl`}
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs font-mono text-text-muted px-1 line-clamp-2">
                        {screen.caption}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Where This Stands (Honest Transparency Box) */}
        <section className="mb-16 sm:mb-24 rounded-3xl bg-surface/90 border border-white/15 p-6 sm:p-8 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Where this stands</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Current state &amp; scope
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <h4 className="text-xs font-mono uppercase text-primary mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Working Today
                </h4>
                <ul className="space-y-1.5 text-xs text-text-muted">
                  {product.featureGroups.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-primary">•</span>
                      <span>{f.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-amber-300 mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Not Included Yet
                </h4>
                <ul className="space-y-1.5 text-xs text-text-muted">
                  {product.notIncludedYet.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Caveats & Attribution Lines */}
            {(product.caveat || product.attribution) && (
              <div className="pt-4 border-t border-white/10 text-xs font-mono text-text-muted/70 space-y-1">
                {product.caveat && <p>Notice: {product.caveat}</p>}
                {product.attribution && <p>{product.attribution}</p>}
              </div>
            )}
          </div>
        </section>

        {/* Next Product Carousel & CTA */}
        <section className="pt-10 border-t border-white/10">
          <div className="text-xs font-mono uppercase text-text-muted tracking-widest mb-6">
            Explore more products
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {otherProducts.map((p) => (
              <div
                key={p.slug}
                onClick={() => onNavigateProduct(p.slug)}
                className="cursor-target group rounded-2xl bg-surface/70 border border-white/10 hover:border-primary/40 p-5 flex items-center justify-between transition-all"
                data-cursor-label="View"
              >
                <div>
                  <span className="text-[10px] font-mono text-primary uppercase">{p.category}</span>
                  <h4 className="font-display font-bold text-lg text-white group-hover:text-primary transition-colors mt-0.5">
                    {p.name}
                  </h4>
                  <p className="text-xs text-text-muted mt-1 line-clamp-1">{p.oneLine}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-primary/20 flex items-center justify-center text-text-muted group-hover:text-primary transition-colors shrink-0 ml-3">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>

          {/* Closing Dual CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-surface2 via-surface to-bg border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                Need something like this built for your business?
              </h3>
              <p className="text-sm text-text-muted mt-1">
                We configure ready-built modules or deliver custom engineering.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={inquiryUrl}
                onClick={(e) => { e.preventDefault(); openEmailInquiry({ source: `Product Detail: ${product.name}` }); }}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-primary text-primary-ink font-display font-bold text-sm shadow-[0_0_20px_rgba(56, 189, 248,0.35)] hover:brightness-110 transition-all"
              >
                <span>Discuss a project</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
              <button
                onClick={onBack}
                className="cursor-target inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-sm font-display font-semibold text-white border border-white/10 transition-colors"
              >
                <span>All products</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetailView;
