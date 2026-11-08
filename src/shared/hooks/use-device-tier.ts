import { useState, useEffect } from 'react';

export type DeviceTier = 'full' | 'lite';

/**
 * Checks if the current client should be assigned the 'lite' performance tier.
 * Rules per docs/redesign/06-performance-tiers.md:
 * lite if ANY:
 * - no fine pointer
 * - no hover
 * - viewport under 768 px
 * - device memory <= 4 GB (when reported)
 * - <= 4 CPU cores (when reported)
 * - save-data on
 * - prefers-reduced-motion
 */
export function checkIsLite(): boolean {
  if (typeof window === 'undefined') return true;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const hasHover = window.matchMedia('(hover: hover)').matches;
  if (!hasFinePointer || !hasHover) {
    return true;
  }

  if (window.innerWidth < 768) {
    return true;
  }

  const nav = navigator as unknown as {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };

  if (nav.connection?.saveData === true) {
    return true;
  }

  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) {
    return true;
  }

  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4) {
    return true;
  }

  return false;
}

export function isQaMode(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('qa') === '1' || params.has('qa');
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>(() =>
    typeof window !== 'undefined' ? (checkIsLite() ? 'lite' : 'full') : 'lite'
  );

  useEffect(() => {
    const evaluate = () => {
      setTier(checkIsLite() ? 'lite' : 'full');
    };

    evaluate();

    const mqlReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqlPointer = window.matchMedia('(pointer: fine)');
    const mqlHover = window.matchMedia('(hover: hover)');

    const handleResize = () => evaluate();

    mqlReduced.addEventListener('change', evaluate);
    mqlPointer.addEventListener('change', evaluate);
    mqlHover.addEventListener('change', evaluate);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      mqlReduced.removeEventListener('change', evaluate);
      mqlPointer.removeEventListener('change', evaluate);
      mqlHover.removeEventListener('change', evaluate);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return tier;
}
