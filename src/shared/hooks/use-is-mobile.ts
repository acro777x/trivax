import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current viewport matches mobile screen dimensions.
 * Uses window.matchMedia with listener fallback for smooth responsive switching.
 * Default breakpoint is 768px (Tailwind 'md').
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const updateMatch = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Initial check
    updateMatch(mediaQuery);

    // Modern and legacy event listener support
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMatch);
      return () => mediaQuery.removeEventListener('change', updateMatch);
    } else {
      // @ts-ignore
      mediaQuery.addListener(updateMatch);
      return () => {
        // @ts-ignore
        mediaQuery.removeListener(updateMatch);
      };
    }
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;
