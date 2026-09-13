import React, { useEffect, useRef } from 'react';

export interface TubesCursorProps {
  className?: string;
  tubesColors?: string[];
  lightsColors?: string[];
  lightsIntensity?: number;
  showContent?: boolean;
  title?: string;
  subtitle?: string;
  instructions?: string;
  backgroundOnly?: boolean;
}

// The main App component that encapsulates the animation
// In React, component names must start with a capital letter to be recognized as components.
// I've renamed the function from "component" to "TubesCursor".
export default function TubesCursor({
  className = "h-screen w-screen bg-black font-['Montserrat',_sans-serif] overflow-hidden cursor-pointer",
  tubesColors = ["#5e72e4", "#8965e0", "#f5365c"],
  lightsColors = ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"],
  lightsIntensity = 200,
  showContent = true,
  title = "Tubes",
  subtitle = "Cursor",
  instructions = "Click to change colors",
  backgroundOnly = false,
}: TubesCursorProps) {
  // useRef to get a persistent reference to the canvas element
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // useRef to hold the animation instance so we can call its methods
  const appRef = useRef<any>(null);

  /**
   * Generates an array of random hex color strings.
   * @param {number} count - The number of random colors to generate.
   * @returns {string[]} An array of color strings.
   */
  const randomColors = (count: number): string[] => {
    return new Array(count)
      .fill(0)
      .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
  };

  // This effect runs once when the component mounts
  useEffect(() => {
    // The error "Computed radius is NaN" suggests a race condition where the animation 
    // library initializes before the canvas element has its final dimensions, leading 
    // to invalid geometry calculations. Delaying the initialization with setTimeout 
    // ensures the DOM is fully painted and ready.
    const initTimer = setTimeout(() => {
      const loadEngine = async () => {
        try {
          // Dynamic import from CDN as requested, with fallback to local package
          const module = await import(
            /* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
          );
          return module.default || module;
        } catch (cdnErr) {
          try {
            const localMod = await import('threejs-components/build/cursors/tubes1.min.js');
            return localMod.default || localMod;
          } catch (localErr) {
            console.error("Failed to load TubesCursor module:", cdnErr, localErr);
            return null;
          }
        }
      };

      loadEngine().then((TubesCursorFactory) => {
        if (!TubesCursorFactory) return;

        // Ensure the canvas element is still available before initializing
        if (canvasRef.current) {
          try {
            // Initialize the TubesCursor animation
            const app = TubesCursorFactory(canvasRef.current, {
              tubes: {
                colors: tubesColors,
                lights: {
                  intensity: lightsIntensity,
                  colors: lightsColors
                }
              }
            });
            // Store the instance in our ref for later use
            appRef.current = app;
          } catch (e) {
            console.error("Failed to initialize TubesCursor instance:", e);
          }
        }
      });
    }, 100); // 100ms delay to allow for DOM rendering

    // Cleanup function to dispose of the animation and clear the timeout
    return () => {
      clearTimeout(initTimer);
      // Check if app was initialized and has a dispose method before calling
      if (appRef.current && typeof appRef.current.dispose === 'function') {
        try {
          appRef.current.dispose();
        } catch {
          // Ignore disposal errors on unmount
        }
      }
    };
  }, []); // The empty dependency array ensures this effect runs only once

  // Handles click events on the main container
  const handleClick = () => {
    if (appRef.current && appRef.current.tubes) {
      const newTubeColors = randomColors(3);
      const newLightColors = randomColors(4);
      
      // Update the colors in the running animation
      if (typeof appRef.current.tubes.setColors === 'function') {
        appRef.current.tubes.setColors(newTubeColors);
      }
      if (typeof appRef.current.tubes.setLightsColors === 'function') {
        appRef.current.tubes.setLightsColors(newLightColors);
      }
    }
  };

  if (backgroundOnly) {
    return (
      <div 
        onClick={handleClick} 
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden" 
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      </div>
    );
  }

  return (
    // Main container with full-screen styles and click handler
    <div
      onClick={handleClick}
      className={className}
    >
      {/* Canvas element for the animation, positioned behind everything else */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
      
      {/* Hero content displayed over the canvas */}
      {showContent && (
        <div className="relative h-full flex flex-col items-center justify-center gap-2.5 z-10 pointer-events-none select-none">
          {/* Using arbitrary values for text-shadow which doesn't have a default Tailwind utility */}
          <h1 className="m-0 p-0 text-white text-[80px] font-bold uppercase leading-none select-none [text-shadow:0_0_20px_rgba(0,0,0,1)]">
            {title}
          </h1>
          <h2 className="m-0 p-0 text-white text-[60px] font-medium uppercase leading-none select-none [text-shadow:0_0_20px_rgba(0,0,0,1)]">
            {subtitle}
          </h2>
          <p className="m-0 p-0 text-white text-xl leading-none select-none [text-shadow:0_0_20px_rgba(0,0,0,1)]">
            {instructions}
          </p>
        </div>
      )}
    </div>
  );
}
