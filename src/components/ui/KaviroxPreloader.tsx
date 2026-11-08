import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { isQaMode } from '@/shared/hooks/use-device-tier';

interface KaviroxPreloaderProps {
  onComplete?: () => void;
}

export const KaviroxPreloader: React.FC<KaviroxPreloaderProps> = ({ onComplete }) => {
  const [mounted, setMounted] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (isQaMode()) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get('noloader') === '1') return false;
    return true;
  });

  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const leftBracketRef = useRef<SVGPathElement>(null);
  const rightBracketRef = useRef<SVGPathElement>(null);
  const upperArcRef = useRef<SVGPathElement>(null);
  const lowerArcRef = useRef<SVGPathElement>(null);
  const kStemRef = useRef<SVGPathElement>(null);
  const kUpperLegRef = useRef<SVGPathElement>(null);
  const kLowerLegRef = useRef<SVGPathElement>(null);
  const pixelGroupRef = useRef<SVGGElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const dotRef = useRef<HTMLSpanElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) {
      onComplete?.();
      window.dispatchEvent(new CustomEvent('kavirox-preloader-complete'));
      return;
    }

    try {
      sessionStorage.setItem('kavirox_preloader_seen', '1');
    } catch {
      // ignore
    }

    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    let isFontsReady = false;
    let isAsciiReady = false;
    let animProgress = { val: 0 };

    // 1. Check fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        isFontsReady = true;
      });
    } else {
      isFontsReady = true;
    }

    // 2. Listen for ASCII ready or timeout at 1.8s
    const handleAsciiReady = () => {
      isAsciiReady = true;
    };
    window.addEventListener('kavirox-ascii-ready', handleAsciiReady);
    const asciiTimeout = setTimeout(() => {
      isAsciiReady = true;
    }, 1800);

    // Timeline for logo intro
    const tl = gsap.timeline();

    // Initial states
    if (leftBracketRef.current && rightBracketRef.current) {
      gsap.set(leftBracketRef.current, { x: 30, opacity: 0 });
      gsap.set(rightBracketRef.current, { x: -30, opacity: 0 });
    }
    if (upperArcRef.current && lowerArcRef.current) {
      gsap.set([upperArcRef.current, lowerArcRef.current], { opacity: 0, scale: 0.94, transformOrigin: 'center center' });
    }
    if (kStemRef.current && kUpperLegRef.current && kLowerLegRef.current) {
      gsap.set([kStemRef.current, kUpperLegRef.current, kLowerLegRef.current], { opacity: 0, y: 15 });
    }
    if (pixelGroupRef.current) {
      gsap.set(pixelGroupRef.current.children, { opacity: 0, x: -15, y: -15 });
    }
    const validLetters = lettersRef.current.filter(Boolean);
    if (validLetters.length > 0) {
      gsap.set(validLetters, { opacity: 0, y: 16 });
    }
    if (dotRef.current) {
      gsap.set(dotRef.current, { opacity: 0, scale: 0 });
    }
    if (spaceRef.current) {
      gsap.set(spaceRef.current, { opacity: 0, y: 6 });
    }

    // Sequence logo components
    tl.to([leftBracketRef.current, rightBracketRef.current], {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
    })
      .to([upperArcRef.current, lowerArcRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
      .to([kStemRef.current, kUpperLegRef.current, kLowerLegRef.current], {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'back.out(1.4)',
      }, '-=0.4')
      .to(pixelGroupRef.current ? pixelGroupRef.current.children : [], {
        opacity: 1,
        x: 0,
        y: 0,
        stagger: 0.04,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.3')
      .to(validLetters, {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.35,
        ease: 'power2.out',
      }, '-=0.2')
      .to([dotRef.current, spaceRef.current], {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.3,
        ease: 'back.out(1.5)',
      }, '-=0.1');

    // Interval to calculate real loading progress (min 1.4s, max 3.2s)
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      let target = Math.min(elapsed / 1800, 0.95);

      if (isFontsReady && isAsciiReady && elapsed >= 1400) {
        target = 1.0;
      }

      // Hard cap at 3.2s
      if (elapsed >= 3200) {
        target = 1.0;
      }

      gsap.to(animProgress, {
        val: target,
        duration: 0.2,
        onUpdate: () => {
          setProgress(Math.round(animProgress.val * 100));
        },
      });

      if (target >= 1.0) {
        clearInterval(interval);
        window.removeEventListener('kavirox-ascii-ready', handleAsciiReady);
        clearTimeout(asciiTimeout);

        // Run exit animation after a tiny settling pause
        setTimeout(() => {
          runExit();
        }, 120);
      }
    }, 50);

    const runExit = () => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = prevOverflow;
          setMounted(false);
          onComplete?.();
          window.dispatchEvent(new CustomEvent('kavirox-preloader-complete'));
        },
      });

      // Logo scale 0.92 and fade
      exitTl.to(logoWrapperRef.current, {
        scale: 0.92,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.in',
      });

      // Panel split vertically: top slides up, bottom slides down (transform only, 700ms inout)
      exitTl.to(
        topPanelRef.current,
        {
          yPercent: -100,
          duration: 0.7,
          ease: 'power3.inOut',
        },
        '-=0.1'
      );
      exitTl.to(
        bottomPanelRef.current,
        {
          yPercent: 100,
          duration: 0.7,
          ease: 'power3.inOut',
        },
        '<'
      );
    };

    return () => {
      clearInterval(interval);
      clearTimeout(asciiTimeout);
      window.removeEventListener('kavirox-ascii-ready', handleAsciiReady);
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, onComplete]);

  if (!mounted) return null;

  return (
    <aside
      ref={containerRef}
      aria-label="Loading site..."
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden"
    >
      {/* Top half curtain */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#060913] will-change-transform z-10 border-b border-primary/20"
      />
      {/* Bottom half curtain */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#060913] will-change-transform z-10 border-t border-primary/20"
      />

      {/* Central stage with azure-sapphire radial ambiance */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">
        <div
          ref={logoWrapperRef}
          className="flex flex-col items-center justify-center will-change-transform relative"
        >
          {/* Subtle ambient radial glow */}
          <div className="absolute -inset-24 bg-gradient-to-r from-[#0f172a]/20 via-[#1e3fd8]/20 to-[#38bdf8]/15 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Large Mark SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 760 640"
            className="w-24 h-20 sm:w-32 sm:h-28 shrink-0 drop-shadow-[0_0_24px_rgba(56,189,248,0.35)]"
            fill="none"
          >
            <defs>
              <linearGradient id="preloader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="45%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1e3fd8" />
              </linearGradient>
            </defs>

            {/* Brackets */}
            <g fill="#ffffff" fillOpacity="0.85">
              <path
                ref={leftBracketRef}
                d="M 89 238 L 12 303 L 6 317 L 11 330 L 82 389 L 95 394 L 105 386 L 104 369 L 44 318 L 105 262 L 104 244 L 96 238 Z"
              />
              <path
                ref={rightBracketRef}
                d="M 671 238 L 748 303 L 754 317 L 749 330 L 678 389 L 665 394 L 655 386 L 656 369 L 716 318 L 655 262 L 656 244 L 664 238 Z"
              />
            </g>

            {/* Gradient Mark components */}
            <g fill="url(#preloader-grad)">
              <g ref={pixelGroupRef}>
                <rect x="134" y="60" width="37" height="37" rx="3" />
                <rect x="94" y="112" width="28" height="28" rx="2" />
                <rect x="130" y="145" width="40" height="40" rx="3" />
                <rect x="170" y="190" width="33" height="33" rx="2" />
                <rect x="106" y="198" width="24" height="24" rx="2" />
                <rect x="137" y="229" width="19" height="19" rx="1.5" />
                <rect x="163" y="254" width="19" height="19" rx="1.5" />
              </g>

              <path
                ref={lowerArcRef}
                d="M 112 450 C 132 506 182 560 248 596 C 314 632 396 644 476 626 C 556 608 626 558 662 496 L 620 468 C 590 518 534 558 468 572 C 402 586 334 576 280 546 C 226 516 186 470 166 422 Z"
              />
              <path
                ref={upperArcRef}
                d="M 212 94 C 274 38 360 8 448 18 C 536 28 614 78 656 150 C 684 198 698 252 698 308 L 642 308 C 642 264 630 220 608 182 C 574 124 510 84 438 76 C 366 68 296 92 246 138 Z"
              />
              <path
                ref={kStemRef}
                d="M 314 138 C 304 136 294 140 286 148 C 276 158 270 174 270 196 L 270 472 L 326 472 L 326 216 L 350 216 C 362 216 372 208 372 196 C 372 184 362 176 350 176 L 326 176 L 326 150 C 326 142 320 138 314 138 Z"
              />
              <path
                ref={kUpperLegRef}
                d="M 326 312 L 444 192 L 512 192 L 382 322 Z"
              />
              <path
                ref={kLowerLegRef}
                d="M 372 312 L 518 472 L 448 472 L 326 338 Z"
              />
            </g>
          </svg>

          {/* Live wordmark letter stagger */}
          <div className="mt-4 flex items-baseline">
            {'KAVIROX'.split('').map((char, idx) => (
              <span
                key={idx}
                ref={(el) => { lettersRef.current[idx] = el; }}
                className="font-display font-[800] text-2xl sm:text-3xl tracking-[0.05em] text-white"
              >
                {char}
              </span>
            ))}
            <span ref={dotRef} className="text-primary font-display font-extrabold text-2xl sm:text-3xl ml-0.5">.</span>
          </div>

          <div ref={spaceRef} className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary mt-1">
            SPACE
          </div>

          {/* Progress hairline & tabular numbers */}
          <div className="w-48 sm:w-60 mt-6 flex flex-col items-center gap-2">
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-mid to-primary transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="w-full flex justify-between items-center text-[11px] font-mono tabular-nums text-text-muted">
              <span>INITIALIZING</span>
              <span className="text-primary">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default KaviroxPreloader;
