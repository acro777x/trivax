import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DeviceTier } from './use-device-tier';

/**
 * Lenis smooth scroll: Fine pointer + full tier only.
 * Synced with GSAP ScrollTrigger ticker.
 * Disabled on touch, lite tier, or reduced motion.
 */
export function useLenis(tier: DeviceTier) {
  useEffect(() => {
    if (tier !== 'full') return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    (window as any).__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      (window as any).__lenis = null;
      lenis.destroy();
    };
  }, [tier]);
}
