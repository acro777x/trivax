import React, { Suspense, lazy, useState, useEffect, useCallback, useRef } from 'react';
import { useDeviceTier } from '@/shared/hooks/use-device-tier';
import { useLenis } from '@/shared/hooks/use-lenis';

import KaviroxPreloader from '@/components/ui/KaviroxPreloader';
import TargetCursor from '@/components/ui/TargetCursor';
import KaviroxHeader from '@/domains/marketing/components/kavirox-header';
import KaviroxHero from '@/domains/marketing/components/kavirox-hero';

const Particles = lazy(() => import('@/components/ui/Particles'));

// Lazy-load below-the-fold sections per docs/redesign/06-performance-tiers.md
const TechMarquee = lazy(() => import('@/domains/marketing/components/tech-marquee'));
const ProductsSection = lazy(() =>
  import('@/domains/products/components/products-section').then((m) => ({
    default: m.ProductsSection,
  }))
);
const WorkWithUsSection = lazy(() =>
  import('@/domains/marketing/components/work-with-us-section').then((m) => ({
    default: m.WorkWithUsSection,
  }))
);
const KaviroxServices = lazy(() => import('@/domains/services/components/kavirox-services'));
const KaviroxCapabilities = lazy(() => import('@/domains/capabilities/components/kavirox-capabilities'));
const TrustSection = lazy(() => import('@/domains/marketing/components/trust-section'));
const FaqSection = lazy(() => import('@/domains/marketing/components/faq-section'));
const ContactSection = lazy(() => import('@/domains/marketing/components/contact-section'));
const KaviroxChatbot = lazy(() => import('@/domains/chatbot/components/kavirox-chatbot'));
const KaviroxFooter = lazy(() =>
  import('@/domains/marketing/components/kavirox-footer').then((m) => ({
    default: m.KaviroxFooter,
  }))
);
const ProductDetailView = lazy(() =>
  import('@/domains/products/components/product-detail-view').then((m) => ({
    default: m.ProductDetailView,
  }))
);

export function App() {
  const tier = useDeviceTier();
  const isFull = tier === 'full';

  // Lenis smooth scroll: Fine pointer + full tier only
  useLenis(tier);

  // Preserve scroll position when entering product detail view
  const savedScrollYRef = useRef<number>(0);

  // Lightweight SPA Router for /products/:slug
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  const navigateTo = useCallback((path: string) => {
    if (typeof window === 'undefined') return;
    if (path.startsWith('/#') || path.startsWith('#')) {
      const hash = path.includes('#') ? '#' + path.split('#')[1] : '';
      window.history.pushState({}, '', '/' + hash);
      setCurrentPath('/');
      setTimeout(() => {
        const id = hash.replace(/^#/, '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (path.startsWith('/products/')) {
      savedScrollYRef.current = window.scrollY;
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
      return;
    }

    if (path === '/' || path === '') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      setTimeout(() => {
        window.scrollTo({ top: savedScrollYRef.current, behavior: 'instant' });
      }, 25);
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const newPath = window.location.pathname;
      setCurrentPath(newPath);
      if (newPath === '/') {
        setTimeout(() => {
          window.scrollTo({ top: savedScrollYRef.current, behavior: 'instant' });
        }, 25);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept local /products/ links for instant SPA transition without reload
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      if (href.startsWith('/products/')) {
        e.preventDefault();
        navigateTo(href);
      } else if (href.startsWith('/#') && currentPath !== '/') {
        e.preventDefault();
        navigateTo(href);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [currentPath, navigateTo]);

  // Check if current route is product detail
  const productMatch = currentPath.match(/^\/products\/([^/?#]+)/);
  const currentProductSlug = productMatch ? productMatch[1] : null;

  return (
    <div className="min-h-screen bg-bg text-text font-sans selection:bg-primary/30 selection:text-white relative">
      {/* 0. Optional Short Preloader (max 850ms, session-flagged, reduced-motion safe) */}
      <KaviroxPreloader />

      {/* Target Cursor: Desktop PC and fine pointer devices */}
      <TargetCursor
        targetSelector=".cursor-target"
        cursorColor="#38bdf8"
        cursorColorOnTarget="#38bdf8"
        hideDefaultCursor={false}
        size={36}
        cornerSize={10}
        thickness={2.5}
        padding={6}
        dotSize={4}
        spinDuration={2}
        hoverDuration={0.2}
        parallaxOn={true}
        matchRadius={true}
      />

      {currentProductSlug ? (
        /* Product Detail View */
        <Suspense
          fallback={
            <div className="min-h-screen bg-bg flex items-center justify-center text-primary font-mono text-xs">
              Loading product...
            </div>
          }
        >
          <ProductDetailView
            slug={currentProductSlug}
            onBack={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                navigateTo('/');
              }
            }}
            onNavigateProduct={(newSlug) => navigateTo(`/products/${newSlug}`)}
          />
        </Suspense>
      ) : (
        /* Landing Page Order per docs/redesign-v2/05-landing-page-v2.md:
           0 Preloader → 1 Header → 2 Hero → 3 Marquee → 4 Products → 5 Ways to work →
           6 Services → 7 Solutions → 8 Process → 9 About → 10 FAQ → 11 Contact → 12 Footer
        */
        <>
          {/* 1. Header (Liquid glass desktop, floating bar mobile) */}
          <KaviroxHeader />

          <main id="main-content" className="relative">
            {/* 2. Hero: 100svh, centered composition, pure GradientASCII, ZERO particles */}
            <KaviroxHero />

            {/* Below-Hero Container with Ambient Particles */}
            <div className="relative isolate overflow-hidden">
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

              <Suspense fallback={<div className="w-full h-24 bg-bg" />}>
                {/* 3. Marquee: Technologies we build with */}
                <TechMarquee />
              </Suspense>

              <Suspense fallback={<div className="w-full min-h-[600px] bg-bg" />}>
                {/* 4. Products: 7 products, honest badges, phone mocks */}
                <ProductsSection onOpenProduct={(slug) => navigateTo(`/products/${slug}`)} />
              </Suspense>

              <Suspense fallback={<div className="w-full min-h-[400px] bg-bg" />}>
                {/* 5. How you can work with us: 4 cards with connector line */}
                <WorkWithUsSection />
              </Suspense>

              <Suspense fallback={<div className="w-full min-h-[600px] bg-bg" />}>
                {/* 6. Services: 11 lines, 2-column featured first card, capability strip */}
                <KaviroxServices />
              </Suspense>

              <Suspense fallback={<div className="w-full min-h-[600px] bg-bg" />}>
                {/* 7. Process: How a project runs, Step 1..Step 6 with scroll-drawn line */}
                <KaviroxCapabilities />
              </Suspense>

              <Suspense fallback={<div className="w-full min-h-[300px] bg-bg" />}>
                {/* 9. About and trust: Verifiable proof tiles, no invented stats */}
                <TrustSection />
              </Suspense>

              <Suspense fallback={<div className="w-full min-h-[400px] bg-bg" />}>
                {/* 10. FAQ: Two-column accessible accordion */}
                <FaqSection />
              </Suspense>

              <Suspense fallback={<div className="w-full min-h-[500px] bg-bg" />}>
                {/* 11. Contact: Dual path (project / product), Soft Aurora, Shine Border */}
                <ContactSection />
              </Suspense>
            </div>
          </main>

          <Suspense fallback={<div className="w-full min-h-[200px] bg-surface" />}>
            {/* 12. Footer: 4 columns, 7 product links, cropped wordmark watermark */}
            <KaviroxFooter />
          </Suspense>
        </>
      )}

      {/* Global AI Assistant (48px round mobile, compact desktop pill, 85dvh bottom sheet) */}
      <Suspense fallback={null}>
        <KaviroxChatbot />
      </Suspense>
    </div>
  );
}

export default App;
