import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useDeviceTier, isQaMode } from '@/shared/hooks/use-device-tier';
import { ASCII_RAMP } from '@/shared/tokens';
import { getInquiryWebmailUrl } from '@/shared/lib/email-inquiry';
import GlowButton from '@/components/ui/GlowButton';
import SpecularButton from '@/components/ui/SpecularButton';
import Magnet from '@/components/ui/Magnet';
import StrokeText from '@/components/ui/StrokeText';
import FoldText from '@/components/ui/FoldText';
import { ChevronDown, Sparkles } from 'lucide-react';

const TICKER_WORDS = ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE', 'PRODUCT-LED'];

// Lazy-load WebGL Gradient ASCII
const GradientASCII = lazy(() => import('@/components/ui/GradientASCII'));

export const KaviroxHero: React.FC = () => {
  const tier = useDeviceTier();
  const [strokeFontSize, setStrokeFontSize] = useState(64);
  const [tickerIndex, setTickerIndex] = useState(0);
  const qa = isQaMode();
  const isFull = tier === 'full';

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Dynamic stroke font-size calculation: 36px on mobile to 92px on desktop
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setStrokeFontSize(Math.round(Math.max(34, Math.min(44, width * 0.095))));
      } else if (width < 768) {
        setStrokeFontSize(Math.round(Math.max(44, Math.min(60, width * 0.08))));
      } else if (width < 1280) {
        setStrokeFontSize(Math.round(Math.max(60, Math.min(80, width * 0.065))));
      } else {
        setStrokeFontSize(Math.round(Math.max(80, Math.min(94, width * 0.055))));
      }
    };

    updateSize();
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateSize, 80);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScrollToProducts = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo('#products', { duration: 1.1 });
      return;
    }
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'products';
    }
  };

  const handleScrollToContact = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo('#contact', { duration: 1.2 });
      return;
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'contact';
    }
  };

  return (
    <section
      id="top"
      className="relative w-full h-[100svh] min-h-[660px] flex flex-col items-center justify-center overflow-hidden bg-bg isolate px-4 sm:px-6 md:px-8 text-center"
      aria-label="Kavirox Hero"
    >
      {/* 1. Lowest z-layer: WebGL Gradient ASCII Horizon */}
      <div className="absolute inset-0 -z-30 pointer-events-auto">
        <Suspense fallback={<div className="w-full h-full bg-[#060913]" />}>
          <GradientASCII
            colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']}
            shape="horizon"
            characters=" =+xX0S8#@"
            cellSize={isFull ? 18 : 24}
            density={0.8}
            glyphOpacity={0.85}
            glow={0.2}
            depthOfField={0}
            flicker={0.2}
            softness={0.5}
            scale={1}
            flow={0.5}
            speed={1}
            gradientOpacity={0.9}
            grain={0.08}
            variation={0}
            mouseInteraction={isFull}
            scrambleRadius={0.1}
            clickEffect="wave"
            intro={isFull && !qa}
            lightMode={false}
            dpr={isFull ? undefined : 1}
            fontFamily="Geist Mono Variable"
            className="w-full h-full"
          />
        </Suspense>
      </div>



      {/* 3. Centered Content Container */}
      <div className="relative z-10 max-w-[880px] w-full mx-auto flex flex-col items-center justify-center pt-14 sm:pt-16 pb-12 sm:pb-14">
        {/* Eyebrow Label with Clean Kinetic Status Ticker */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0a1122]/90 border border-white/15 text-xs font-mono tracking-wider text-text-muted backdrop-blur-md mb-5 sm:mb-6 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <span className="w-2 h-2 rounded-full bg-[#a8e62e] shadow-[0_0_8px_rgba(168,230,46,0.8)] animate-pulse shrink-0" />
          <div className="h-5 overflow-hidden relative min-w-[110px] text-left">
            <div
              className="transition-transform duration-500 ease-out"
              style={{ transform: `translateY(-${tickerIndex * 20}px)` }}
            >
              {TICKER_WORDS.map((word, idx) => (
                <div
                  key={idx}
                  className={`h-5 flex items-center font-mono font-medium text-xs tracking-wider transition-opacity duration-300 ${
                    tickerIndex === idx ? 'text-[#38bdf8] opacity-100' : 'text-[#38bdf8]/40 opacity-40'
                  }`}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[76px] text-text tracking-tight leading-[1.04] text-balance mb-3 sm:mb-4">
          <span className="sr-only">Products that solve problems.</span>
          <span aria-hidden="true" className="inline-flex flex-wrap items-baseline justify-center gap-x-2.5 sm:gap-x-3.5">
            <span className="block sm:inline">Products that </span>
            <span className="inline-flex items-baseline gap-x-2.5 sm:gap-x-3.5 whitespace-nowrap">
              <span className="inline-block translate-y-[0.14em] sm:translate-y-[0.16em] text-[#a8e62e] overflow-visible">
                <StrokeText
                  text="solve"
                  fontSize={strokeFontSize}
                  letterSpacing={Math.round(strokeFontSize * -0.02)}
                  strokeColor="#a8e62e"
                  fillColor="#a8e62e"
                  strokeStyle="solid"
                  strokeWidth={1.8}
                  drawDuration={1.2}
                  fillDelay={0.3}
                  trigger="mount"
                  hoverRedraw={isFull}
                  fontFamily="Bricolage Grotesque Variable, system-ui, sans-serif"
                  fontWeight={800}
                  shadow={true}
                  shadowColor="rgba(168, 230, 46, 0.45)"
                  className="inline-block overflow-visible"
                />
              </span>
              <span>problems.</span>
            </span>
          </span>
        </h1>

        {/* Quiet Second Line with FoldText Origami Unfold Animation */}
        <div className="text-base sm:text-xl md:text-2xl text-text-muted/90 font-medium tracking-tight mb-4 sm:mb-5">
          <FoldText
            text="Technology that moves businesses forward."
            foldStyle="paper"
            splitBy="char"
            hinge="top"
            trigger="mount"
            foldAngle={88}
            duration={0.65}
            stagger={0.02}
            staggerFrom="start"
            ease="power3.out"
            hoverRefold={isFull}
            refoldRadius={120}
            refoldAngle={40}
            perspective={700}
            fontSize="inherit"
            fontWeight={600}
            color="#cbd5e1"
          />
        </div>

        {/* Supporting Paragraph */}
        <p className="text-text-muted text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl text-pretty mb-7 sm:mb-8">
          We build digital products and deliver software, AI, automation, security and growth solutions.
          Explore our products, or work with us to build what your business needs.
        </p>

        {/* Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-[340px] sm:max-w-none mb-10 sm:mb-12">
          {isFull ? (
            <Magnet padding={80} magnetStrength={2}>
              <GlowButton
                href="#products"
                onClick={handleScrollToProducts}
                className="w-full sm:w-auto font-display font-bold text-sm sm:text-base px-6 py-3.5 shadow-[0_0_24px_rgba(168,230,46,0.35)] cursor-target"
                data-cursor-label="View"
              >
                Explore Products
              </GlowButton>
            </Magnet>
          ) : (
            <GlowButton
              href="#products"
              onClick={handleScrollToProducts}
              className="w-full sm:w-auto font-display font-bold text-sm px-6 py-3.5"
            >
              Explore Products
            </GlowButton>
          )}

          <SpecularButton
            size="md"
            radius={9999}
            tint="#101a12"
            tintOpacity={0.65}
            textColor="#eef5ea"
            lineColor="rgba(255, 255, 255, 0.16)"
            intensity={isFull ? 1 : 0.3}
            idleIntensity={0.25}
            followMouse={isFull}
            href="#contact"
            onClick={handleScrollToContact}
            className="w-full sm:w-auto cursor-target font-display font-semibold text-xs sm:text-sm px-6 py-3.5 border border-white/10"
            data-cursor-label="Open"
          >
            <span>Discuss a Project</span>
          </SpecularButton>
        </div>

        {/* Brand line & incubation pill at the bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-text-muted/80 tracking-widest pt-2">
          <span className="font-semibold text-primary/90 tracking-[0.25em]">
            BUILD. SECURE. GROW.
          </span>
          <span className="hidden sm:inline-block text-white/20">•</span>
          <div className="flex items-center gap-1.5 text-text-muted/70">
            <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Incubated at AIC-GBU, Greater Noida</span>
          </div>
        </div>
      </div>

      {/* Desktop Scroll Cue */}
      {isFull && (
        <a
          href="#products"
          aria-label="Scroll to Products"
          onClick={handleScrollToProducts}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 text-text-muted/60 hover:text-primary transition-colors cursor-target"
          data-cursor-label="Scroll"
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      )}
    </section>
  );
};

export default KaviroxHero;