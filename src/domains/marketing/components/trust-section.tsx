import React from 'react';
import Reveal from '@/components/ui/Reveal';
import { Building2, MapPin, Layers } from 'lucide-react';
import { PRODUCTS_DATA } from '@/domains/products/data/products-data';

export const TrustSection: React.FC = () => {
  const productCount = PRODUCTS_DATA.length;

  return (
    <section
      id="about"
      className="relative w-full py-20 sm:py-28 md:py-32 bg-bg border-b border-line overflow-hidden scroll-mt-24 md:scroll-mt-28"
      aria-label="About Kavirox"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: About Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest">
                <span className="w-4 h-[1px] bg-primary" />
                <span>About Kavirox</span>
              </div>
            </Reveal>

            <Reveal delayMs={60}>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-text tracking-tight leading-[1.12]">
                Useful products, practical engineering.
              </h2>
            </Reveal>

            <Reveal delayMs={120}>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed max-w-2xl text-pretty">
                Kavirox is a product-led technology company building digital products and delivering
                technology services for businesses and organizations. We work across SaaS and
                product development, custom software, web and mobile applications, AI and
                automation, e-commerce systems, cybersecurity, cloud and DevOps, and digital growth.
                We develop our own products while helping customers design, build, integrate, deploy
                and improve technology that addresses real needs.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Stacked Proof Tiles */}
          <div className="lg:col-span-5 space-y-4">
            {/* Tile 1: Incubation */}
            <Reveal delayMs={80}>
              <div className="p-6 rounded-[22px] bg-surface/90 border border-line hover:border-primary/40 transition-colors shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-text">
                      Incubated at AIC-GBU
                    </h3>
                    <p className="font-mono text-xs text-text-muted mt-1 leading-relaxed">
                      Atal Incubation Centre, Gautam Buddha University
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Tile 2: Location */}
            <Reveal delayMs={140}>
              <div className="p-6 rounded-[22px] bg-surface/90 border border-line hover:border-primary/40 transition-colors shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-text">
                      Greater Noida, India
                    </h3>
                    <p className="font-mono text-xs text-text-muted mt-1 leading-relaxed">
                      Uttar Pradesh 201312
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Tile 3: Portfolio Count */}
            <Reveal delayMs={200}>
              <div className="p-6 rounded-[22px] bg-surface/90 border border-line hover:border-primary/40 transition-colors shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-text">
                      {productCount} products and projects
                    </h3>
                    <p className="font-mono text-xs text-text-muted mt-1 leading-relaxed">
                      Active in our portfolio
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
