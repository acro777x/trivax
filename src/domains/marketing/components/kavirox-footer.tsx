import React, { useState, Suspense, lazy } from 'react';
import FooterSocials from '@/components/ui/FooterSocials';
import { Logo, LogoMark } from '@/shared/components/logo';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS_DATA } from '@/domains/products/data/products-data';

const TechText = lazy(() => import('@/components/ui/TechText'));

export interface KaviroxFooterProps {
  onNavigateProduct?: (slug: string) => void;
}

export const KaviroxFooter: React.FC<KaviroxFooterProps> = ({ onNavigateProduct }) => {
  const currentYear = new Date().getFullYear();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative w-full bg-[#060913]/90 border-t border-white/10 pt-16 pb-8 text-text-muted font-sans overflow-hidden isolate">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 space-y-16">
        {/* Brand Lockup Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-2">
            <Logo size="lg" showDescriptor={true} href="#top" />
            <p className="text-text-muted text-xs max-w-md font-mono pt-1">
              Product-led technology company with services. Incubated at AIC-GBU, Greater Noida.
            </p>
          </div>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-2 border border-line text-xs font-mono text-text-muted">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Ready to build &amp; deploy</span>
          </div>
        </div>

        {/* Top 4-Column Navigation Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Column 1: Products */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <h3 className="font-display font-bold text-sm text-text tracking-wide uppercase mb-4">
              Products
            </h3>
            <ul className="space-y-2.5">
              {PRODUCTS_DATA.map((product) => (
                <li key={product.slug}>
                  <a
                    href={`/products/${product.slug}`}
                    onClick={(e) => {
                      if (onNavigateProduct) {
                        e.preventDefault();
                        onNavigateProduct(product.slug);
                      }
                    }}
                    className="hover:text-primary transition-colors cursor-target flex items-center justify-between group"
                    data-cursor-label="View"
                  >
                    <span className="text-text-muted group-hover:text-white transition-colors">
                      {product.name}
                    </span>
                    <span className="text-[10px] text-text-muted/40 group-hover:text-primary transition-colors">
                      {product.statusType === 'built' ? 'Live' : 'Dev'}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <h3 className="font-display font-bold text-sm text-text tracking-wide uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#process" className="hover:text-white text-text-muted transition-colors cursor-target">
                  Engineering Process
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white text-text-muted transition-colors cursor-target">
                  AIC-GBU Incubation
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white text-text-muted transition-colors cursor-target">
                  Technical FAQs
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white text-text-muted transition-colors cursor-target">
                  Architecture &amp; Security
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 text-text-muted/60">
                  <span>System Telemetry</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/5 text-primary">Active</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <h3 className="font-display font-bold text-sm text-text tracking-wide uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#about" className="hover:text-white text-text-muted transition-colors cursor-target">
                  About Kavirox
                </a>
              </li>
              <li>
                <a href="#work-with-us" className="hover:text-white text-text-muted transition-colors cursor-target">
                  Ways to Work
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white text-text-muted transition-colors cursor-target">
                  Studio Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white text-text-muted transition-colors cursor-target">
                  Contact Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Subscription */}
          <div className="md:col-span-4 space-y-4 font-mono text-xs">
            <h3 className="font-display font-bold text-base text-text tracking-tight mb-2">
              Sign up for our newsletter to stay up to date
            </h3>
            <p className="text-text-muted/80 text-xs font-sans leading-relaxed">
              Updates on released products, engineering insights, and security alerts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3 pt-1">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full bg-[#0a1122] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-primary/80 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={subscribed}
                  className="cursor-target inline-flex items-center justify-center bg-white text-[#030712] font-display font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-primary hover:text-primary-ink transition-all active:scale-95 shadow-[0_0_12px_rgba(255,255,255,0.15)] disabled:opacity-75"
                  data-cursor-label="Send"
                >
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </button>

                <div className="pt-0.5">
                  <FooterSocials />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Interactive TechText Brand Watermark with authentic LogoMark */}
        <div
          className="relative w-full pt-8 pb-4 flex flex-col sm:flex-row items-center justify-center gap-6 select-none opacity-85 hover:opacity-100 transition-opacity"
        >
          <div className="flex items-center gap-4 sm:gap-6 justify-center">
            {/* Authentic Kavirox Vector Emblem Mark */}
            <LogoMark
              size={110}
              idPrefix="footer-wm"
              glow={true}
              className="w-16 h-14 sm:w-24 sm:h-20 shrink-0 drop-shadow-[0_0_24px_rgba(56,189,248,0.4)]"
            />
          </div>

          <div className="w-full max-w-[640px] h-[150px] sm:h-[170px] relative flex items-center justify-center">
            <Suspense fallback={
              <span className="font-display font-black text-6xl sm:text-8xl text-white/30 tracking-wider">
                KAVIROX
              </span>
            }>
              <TechText
                text="KAVIROX"
                fontWeight={700}
                fontSize={92}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                intro="none"
                introDuration={2}
                clickKick
                guides={false}
                fontFamily="Bricolage Grotesque, Geist"
                letterSpacing={-0.02}
                accentColor="#38bdf8"
                reach={200}
                softness={0.7}
                lineStyle="dashed"
                strokeWidth={1.5}
                speed={1}
                bounce={0.4}
                selection
                labels
                color="#ffffff"
                align="center"
                draggable
                sweep
              />
            </Suspense>
          </div>
        </div>

        {/* Bottom Bar: Operational Status & Legal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono text-text-muted/70">
          {/* Operational Status */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-text-muted">All systems operational</span>
          </div>

          {/* Legal and Copyright */}
          <div className="flex items-center gap-6">
            <a href="#faq" className="hover:text-primary transition-colors cursor-target">
              Privacy policy
            </a>
            <a href="#faq" className="hover:text-primary transition-colors cursor-target">
              Terms of service
            </a>
            <span>&copy; {currentYear} Kavirox.space</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default KaviroxFooter;
