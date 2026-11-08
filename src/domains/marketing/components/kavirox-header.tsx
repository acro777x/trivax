import React, { useEffect, useState } from 'react';
import GlassSurface from '@/components/ui/GlassSurface';
import GooeyNav, { GooeyNavItem } from '@/components/ui/GooeyNav';
import StaggeredMenu, { StaggeredMenuItem } from '@/components/ui/StaggeredMenu';
import { Logo } from '@/shared/components/logo';
import { getInquiryWebmailUrl } from '@/shared/lib/email-inquiry';
import { ArrowUpRight } from 'lucide-react';

const NAV_ITEMS: GooeyNavItem[] = [
  { label: 'Home', href: '#top' },
  { label: 'Products', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const MOBILE_MENU_ITEMS: StaggeredMenuItem[] = [
  { label: 'Home', ariaLabel: 'Jump to top of page', link: '#top' },
  { label: 'Products', ariaLabel: 'Jump to products', link: '#products' },
  { label: 'Services', ariaLabel: 'Jump to services', link: '#services' },
  { label: 'Solutions', ariaLabel: 'Jump to solutions and ways to work with us', link: '#solutions' },
  { label: 'Process', ariaLabel: 'Jump to process and capabilities', link: '#process' },
  { label: 'FAQ', ariaLabel: 'Jump to frequently asked questions', link: '#faq' },
  { label: 'Contact', ariaLabel: 'Jump to contact', link: '#contact' },
  {
    label: 'Discuss a project',
    ariaLabel: 'Open pre-written inquiry email',
    link: getInquiryWebmailUrl({ source: 'Mobile Menu' }),
  },
];

import { PRODUCTS_DATA } from '@/domains/products/data/products-data';

const PRODUCT_ITEMS: StaggeredMenuItem[] = PRODUCTS_DATA.map((p) => ({
  label: p.name,
  link: `/products/${p.slug}`,
}));

const MOBILE_SOCIALS = [
  { label: 'LinkedIn', link: 'https://www.linkedin.com/company/kavirox' },
  { label: 'Instagram', link: 'https://www.instagram.com/kavirox.space' },
];

export const KaviroxHeader: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      // Per doc 16: Width 900 and up uses desktop pill nav
      setIsDesktop(window.innerWidth >= 900);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth, { passive: true });
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Scroll tracking: active section spy
  useEffect(() => {
    const sections = ['top', 'products', 'services', 'solutions', 'process', 'faq', 'contact'];

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollPos = currentScrollY + 240;

      // Hero shrink threshold
      setIsScrolledPastHero(currentScrollY > 400);

      // Section spy
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(i);
          return;
        }
      }
      setActiveSection(0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDesktop) {
    return (
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center transition-all duration-300 ease-out translate-y-0 opacity-100 ${
          isScrolledPastHero ? 'scale-[0.96] -translate-y-1' : 'scale-100'
        }`}
      >
        <div className="relative group rounded-full">
          {/* Specular top-left gradient highlight */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none z-30"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 25%, transparent 50%)',
              padding: '1px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          <GlassSurface
            refraction={true}
            renderer="svg"
            distortionScale={-28}
            displace={0.3}
            backgroundOpacity={0.25}
            brightness={55}
            opacity={0.96}
            blur={18}
            saturation={1.6}
            borderWidth={0.08}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            borderRadius={9999}
            width="auto"
            height="auto"
            className="rounded-full shadow-[0_20px_48px_rgba(0,0,0,0.65)] px-3.5 py-1.5 transition-all"
            style={{
              background: 'rgba(6, 10, 22, 0.88)',
              backdropFilter: 'blur(24px) saturate(1.8)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
              boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.25), 0 20px 48px rgba(0, 0, 0, 0.7)',
            }}
          >
            <div className="flex items-center gap-4 relative z-20">
              {/* Real Kavirox Logo Lockup */}
              <div className="pl-1 pr-2">
                <Logo size="sm" showDescriptor={false} href="#top" />
              </div>

              {/* Gooey Navigation Links */}
              <GooeyNav
                items={NAV_ITEMS}
                activeIndex={activeSection}
                frame={false}
                theme="dark"
                size="sm"
                color="rgba(255, 255, 255, 0.85)"
                activeTextColor="#ffffff"
                className="text-xs font-mono font-medium"
              />

              {/* Discuss a project Solid Azure/Cyan CTA */}
              <a
                href={getInquiryWebmailUrl({ source: 'Desktop Navbar' })}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target inline-flex items-center gap-1.5 bg-primary text-primary-ink px-4 py-2 rounded-full font-display font-bold text-xs hover:brightness-110 transition-all shadow-[0_0_16px_rgba(56,189,248,0.4)] active:scale-95 ml-1"
                data-cursor-label="Open"
              >
                <span>Discuss a project</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>
            </div>
          </GlassSurface>
        </div>
      </header>
    );
  }

  // Mobile Floating Frosted Glass Bar + Staggered Menu
  return (
    <div className="fixed top-0 left-0 w-full z-40">
      <StaggeredMenu
        position="right"
        isFixed={true}
        items={MOBILE_MENU_ITEMS}
        productItems={PRODUCT_ITEMS}
        socialItems={MOBILE_SOCIALS}
        displaySocials={true}
        displayItemNumbering={true}
        logoComponent={<Logo size="sm" showDescriptor={false} href="#top" />}
        menuButtonColor="#f6f8ff"
        openMenuButtonColor="#38bdf8"
        changeMenuColorOnOpen={true}
        colors={['#060913', '#0a1122', '#1e3fd8']}
        accentColor="#38bdf8"
      />
    </div>
  );
};

export default KaviroxHeader;
