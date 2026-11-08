import React, { Suspense, lazy, useEffect, useRef } from 'react';
import StarBorder from '@/components/ui/StarBorder';
import ScrollFloat from '@/components/ui/ScrollFloat';
import { PRODUCTS_DATA, ProductItem } from '../data/products-data';
import { PhoneMock } from './phone-mock';
import { StatusBadge } from './status-badge';
import { ArrowUpRight } from 'lucide-react';
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
  const qa = isQaMode();

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
          {/* Mobile / Tablet Snap Rail */}
          <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-5 pb-6 -mx-5 px-5 scrollbar-none touch-pan-x">
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
                  onClick={() => onOpenProduct(product.slug)}
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

        {/* Compact Four Portfolio Grid (Desktop: 4-up; Mobile: 2-up) with Scroll-Triggered Cascade */}
        <div className="mt-8">
          <h4 className="text-xs font-mono uppercase text-text-muted/70 tracking-widest mb-4">
            More in the portfolio
          </h4>
          <div ref={compactGridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
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
                className="compact-product-card cursor-target group rounded-2xl bg-surface/70 border border-white/10 hover:border-primary/40 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
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
                    <span>View</span>
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
