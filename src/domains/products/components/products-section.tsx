import React, { Suspense, lazy, useEffect, useRef, useState, useCallback } from 'react';
import StarBorder from '@/components/ui/StarBorder';
import ScrollFloat from '@/components/ui/ScrollFloat';
import { PRODUCTS_DATA, ProductItem } from '../data/products-data';
import { PhoneMock } from './phone-mock';
import { StatusBadge } from './status-badge';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isQaMode } from '@/shared/hooks/use-device-tier';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Particles = lazy(() => import('@/components/ui/Particles'));

interface ProductsSectionProps {
  onOpenProduct: (slug: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onOpenProduct }) => {
  const featuredProducts = PRODUCTS_DATA.filter((p) => p.isFeatured);
  const compactProducts = PRODUCTS_DATA.filter((p) => !p.isFeatured);
  const featuredGridRef = useRef<HTMLDivElement>(null);
  const compactGridRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const qa = isQaMode();

  const featuredRailRef = useRef<HTMLDivElement>(null);
  const [featuredActiveIdx, setFeaturedActiveIdx] = useState(0);
  const [featuredCanLeft, setFeaturedCanLeft] = useState(false);
  const [featuredCanRight, setFeaturedCanRight] = useState(true);

  // Touch drag tracking to allow silky smooth swiping without accidental clicks
  const isDraggingRail = useRef(false);
  const railStartX = useRef(0);
  const railMoved = useRef(false);

  const onRailTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingRail.current = true;
    railMoved.current = false;
    railStartX.current = e.touches[0].clientX;
  };

  const onRailTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRail.current) return;
    const diff = Math.abs(e.touches[0].clientX - railStartX.current);
    if (diff > 8) {
      railMoved.current = true;
    }
  };

  const onRailTouchEnd = () => {
    isDraggingRail.current = false;
    setTimeout(() => {
      railMoved.current = false;
    }, 100);
  };

  const checkFeaturedScroll = useCallback(() => {
    if (!featuredRailRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = featuredRailRef.current;
    setFeaturedCanLeft(scrollLeft > 10);
    setFeaturedCanRight(scrollLeft < scrollWidth - clientWidth - 10);
    const cardWidth = featuredRailRef.current.firstElementChild?.clientWidth || 300;
    const idx = Math.round(scrollLeft / (cardWidth + 20));
    setFeaturedActiveIdx(Math.min(featuredProducts.length - 1, Math.max(0, idx)));
  }, [featuredProducts.length]);

  useEffect(() => {
    const el = featuredRailRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkFeaturedScroll, { passive: true });
    checkFeaturedScroll();
    return () => el.removeEventListener('scroll', checkFeaturedScroll);
  }, [checkFeaturedScroll]);

  const slideFeaturedLeft = () => {
    if (!featuredRailRef.current) return;
    featuredRailRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const slideFeaturedRight = () => {
    if (!featuredRailRef.current) return;
    featuredRailRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const scrollToFeatured = (index: number) => {
    if (!featuredRailRef.current) return;
    const cards = featuredRailRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const checkScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = 320;
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveSlide(Math.min(compactProducts.length - 1, Math.max(0, idx)));
  }, [compactProducts.length]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  const slideLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
  };

  const slideRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
  };

  // Cards cascading animation: coming one by one from below to top on scroll
  useEffect(() => {
    if (qa) return;

    const ctx = gsap.context(() => {
      // 1. Featured cards cascade
      if (featuredGridRef.current) {
        const cards = featuredGridRef.current.querySelectorAll('.featured-product-card');
        if (cards.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 64, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              stagger: 0.16,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: featuredGridRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      }

      // 2. Compact cards cascade
      if (compactGridRef.current) {
        const compactCards = compactGridRef.current.querySelectorAll('.compact-product-card');
        if (compactCards.length) {
          gsap.fromTo(
            compactCards,
            { opacity: 0, y: 48, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: compactGridRef.current,
                start: 'top 88%',
                once: true,
              },
            }
          );
        }
      }
    });

    return () => ctx.revert();
  }, [qa]);

  return (
    <section
      id="products"
      className="relative w-full py-20 sm:py-24 md:py-28 scroll-mt-24 overflow-hidden border-b border-line isolate"
      aria-label="Products and Platforms"
    >
      {/* Dedicated Original Particles Background for Products Section */}
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
        {/* Header Block with Zero-Collision Spacing */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-3">
            <span className="w-4 h-[1px] bg-primary" />
            <span>Our products</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-text tracking-tight leading-[1.08] text-balance mb-4">
            <ScrollFloat effect="float" splitBy="words" animationDuration={0.85} stagger={0.035}>
              Useful products, built properly.
            </ScrollFloat>
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl leading-relaxed text-pretty">
            Digital products we design, build and run. Each one starts from a real problem.
          </p>
        </div>

        {/* Featured Trio (Desktop: 3-up Large Cards; Mobile: CSS Snap Rail) */}
        <div className="mb-10 sm:mb-14">
          {/* Mobile / Tablet Snap Rail with Smooth Dual-Axis Swipe */}
          <div
            ref={featuredRailRef}
            onTouchStart={onRailTouchStart}
            onTouchMove={onRailTouchMove}
            onTouchEnd={onRailTouchEnd}
            className="flex lg:hidden overflow-x-auto snap-x snap-proximity gap-5 pb-6 -mx-5 px-5 scrollbar-none touch-swipe-rail touch-pan-x touch-pan-y overscroll-x-contain"
          >
            {featuredProducts.map((product) => (
              <div
                key={product.slug}
                className="snap-center shrink-0 w-[84vw] max-w-[340px]"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenProduct(product.slug);
                    }
                  }}
                  onClick={() => {
                    if (railMoved.current) return;
                    onOpenProduct(product.slug);
                  }}
                  className="group cursor-pointer rounded-[24px] bg-surface/90 border border-white/10 p-5 flex flex-col justify-between h-full transition-all duration-300 active:scale-[0.98] shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <StatusBadge status={product.status} type={product.statusType} />
                      <span className="text-[11px] font-mono text-text-muted/80">{product.category}</span>
                    </div>

                    {/* Phone Mock */}
                    <div className="py-4 my-2">
                      <PhoneMock product={product} enablePixelSwap={false} />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-text-muted mt-1.5 line-clamp-2 leading-relaxed">
                      {product.oneLine}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-semibold mt-3.5 group-hover:underline">
                      <span>View product</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipe Indicators & Controls for Featured Trio */}
          <div className="flex lg:hidden items-center justify-between -mt-2 mb-8 px-1">
            <div className="flex items-center gap-1.5">
              {featuredProducts.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => scrollToFeatured(dotIdx)}
                  aria-label={`Go to product ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    featuredActiveIdx === dotIdx ? 'w-6 bg-primary' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-text-muted mr-1">Swipe ← →</span>
              <button
                type="button"
                onClick={slideFeaturedLeft}
                disabled={!featuredCanLeft}
                aria-label="Previous featured product"
                className={`p-2 rounded-full border transition-all ${
                  featuredCanLeft
                    ? 'border-white/20 bg-surface/80 text-white active:scale-90 hover:border-primary/50'
                    : 'border-white/5 bg-surface/30 text-white/30 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={slideFeaturedRight}
                disabled={!featuredCanRight}
                aria-label="Next featured product"
                className={`p-2 rounded-full border transition-all ${
                  featuredCanRight
                    ? 'border-white/20 bg-surface/80 text-white active:scale-90 hover:border-primary/50'
                    : 'border-white/5 bg-surface/30 text-white/30 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Desktop 3-up Cards with Star Border & Scroll-Triggered Cascade */}
          <div ref={featuredGridRef} className="hidden lg:grid grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.slug}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenProduct(product.slug);
                  }
                }}
                onClick={() => onOpenProduct(product.slug)}
                className="featured-product-card cursor-target block rounded-[24px] group"
                data-cursor-label="View"
              >
                <StarBorder
                  as="div"
                  radius={24}
                  color="#38bdf8"
                  duration={5}
                  thickness={1}
                  glow={0.5}
                  className="w-full h-full p-6 bg-surface/80 border border-white/10 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <StatusBadge status={product.status} type={product.statusType} />
                      <span className="text-xs font-mono text-text-muted/80">{product.category}</span>
                    </div>

                    {/* Phone Mock with Pixel Swap on hover */}
                    <div className="py-6 my-2">
                      <PhoneMock product={product} enablePixelSwap={true} />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h3 className="font-display font-bold text-2xl text-white group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-text-muted mt-2 line-clamp-2 leading-relaxed">
                      {product.oneLine}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-semibold mt-4 group-hover:underline">
                      <span>View product</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </StarBorder>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Slider: Slide-wise from left to right */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest mb-1.5">
                <span className="w-3.5 h-[1px] bg-primary" />
                <span>Portfolio Catalog</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                More in the portfolio.
              </h3>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-text-muted hidden sm:inline-block">
                {String(activeSlide + 1).padStart(2, '0')} / {String(compactProducts.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={slideLeft}
                  disabled={!canScrollLeft}
                  aria-label="Previous project"
                  className={`p-2.5 rounded-full border transition-all ${
                    canScrollLeft
                      ? 'border-white/20 bg-surface/80 text-white hover:border-primary/50 hover:bg-primary/10 active:scale-95'
                      : 'border-white/5 bg-surface/30 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={slideRight}
                  disabled={!canScrollRight}
                  aria-label="Next project"
                  className={`p-2.5 rounded-full border transition-all ${
                    canScrollRight
                      ? 'border-white/20 bg-surface/80 text-white hover:border-primary/50 hover:bg-primary/10 active:scale-95'
                      : 'border-white/5 bg-surface/30 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sliding Track: slide-wise left to right with Touch Drag */}
          <div
            ref={(node) => {
              (sliderRef as any).current = node;
              (compactGridRef as any).current = node;
            }}
            onTouchStart={onRailTouchStart}
            onTouchMove={onRailTouchMove}
            onTouchEnd={onRailTouchEnd}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-proximity pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scrollbar-none touch-swipe-rail touch-pan-x touch-pan-y overscroll-x-contain"
            tabIndex={0}
            role="region"
            aria-label="Portfolio projects slider"
          >
            {compactProducts.map((product) => (
              <div
                key={product.slug}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenProduct(product.slug);
                  }
                }}
                onClick={() => onOpenProduct(product.slug)}
                className="compact-product-card shrink-0 snap-start w-[270px] sm:w-[310px] md:w-[330px] cursor-target group rounded-2xl bg-surface/80 border border-white/10 hover:border-primary/50 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)] active:scale-[0.98] select-none"
                data-cursor-label="View"
              >
                <div>
                  <div className="flex flex-col gap-1.5 mb-3">
                    <span className="text-[10px] font-mono text-text-muted/70 uppercase">
                      {product.category}
                    </span>
                    <StatusBadge status={product.status} type={product.statusType} className="self-start text-[10px] px-2 py-0.5" />
                  </div>

                  {/* Compact illustration frame */}
                  <div className="py-2 my-1 scale-95 origin-center">
                    <PhoneMock product={product} />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 mt-3">
                  <h5 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-primary transition-colors">
                    {product.name}
                  </h5>
                  <p className="text-xs text-text-muted mt-1 line-clamp-2">
                    {product.oneLine}
                  </p>
                  <div className="inline-flex items-center gap-1 text-[11px] font-mono text-primary mt-2.5">
                    <span>Explore project</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
