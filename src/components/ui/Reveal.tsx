import React, { useEffect, useRef, useState } from 'react';
import { isQaMode, useDeviceTier } from '@/shared/hooks/use-device-tier';

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  yOffset?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  yOffset = 20,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const tier = useDeviceTier();
  const isLite = tier === 'lite';

  const [revealed, setRevealed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return isQaMode() || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (revealed) return;
    const el = ref.current;
    if (!el) return;

    if (isQaMode() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '120px 0px 60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  const effectiveOffset = isLite ? Math.min(yOffset, 12) : yOffset;
  const effectiveDelay = isLite ? Math.min(delayMs, 100) : delayMs;

  return (
    <div
      ref={ref}
      style={{
        transform: revealed ? 'none' : `translateY(${effectiveOffset}px)`,
        opacity: revealed ? 1 : 0,
        transitionProperty: 'opacity, transform',
        transitionDuration: isLite ? '400ms' : '700ms',
        transitionDelay: `${effectiveDelay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Reveal;
