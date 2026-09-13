import React, { useEffect, useRef } from 'react';
// Direct import from installed package for instantaneous, offline-ready bundling
import TubesCursorModule from 'threejs-components/build/cursors/tubes1.min.js';

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
  tubesColors = ["#f97316", "#8b5cf6", "#f5365c"],
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

  // Handles click events on the main container or window
  const triggerColorChange = () => {
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

  // This effect runs once when the component mounts
  useEffect(() => {
    let disposed = false;
    let frameId: number | null = null;
    let timerId: any = null;

    const resolveFactory = async () => {
      if (typeof TubesCursorModule === 'function') {
        return TubesCursorModule;
      }
      if (TubesCursorModule && typeof (TubesCursorModule as any).default === 'function') {
        return (TubesCursorModule as any).default;
      }
      try {
        const cdnModule = await import(
          /* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
        );
        return cdnModule.default || cdnModule;
      } catch (err) {
        console.error("Failed to load TubesCursor module:", err);
        return null;
      }
    };

    const initAnimation = async () => {
      const TubesFactory = await resolveFactory();
      if (disposed || !TubesFactory || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const parent = canvas.parentElement;

      // Ensure the parent element has non-zero geometry to avoid "Computed radius is NaN"
      if (!parent || parent.offsetWidth === 0 || parent.offsetHeight === 0) {
        frameId = requestAnimationFrame(initAnimation);
        return;
      }

      try {
        const app = TubesFactory(canvas, {
          tubes: {
            colors: tubesColors,
            lights: {
              intensity: lightsIntensity,
              colors: lightsColors
            }
          }
        });
        if (!disposed) {
          appRef.current = app;
        } else if (app && typeof app.dispose === 'function') {
          app.dispose();
        }
      } catch (err) {
        console.error("Failed to initialize TubesCursor instance:", err);
      }
    };

    // Small delay ensuring DOM layout has committed
    timerId = setTimeout(() => {
      initAnimation();
    }, 60);

    // If in backgroundOnly mode, allow clicks on non-interactive regions of the window to randomize colors
    const handleGlobalClick = (e: MouseEvent) => {
      if (!backgroundOnly) return;
      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest('a, button, input, textarea, select, [role="button"], dialog, .chat-panel');
      if (!isInteractive) {
        triggerColorChange();
      }
    };

    if (backgroundOnly) {
      window.addEventListener('click', handleGlobalClick);
    }

    return () => {
      disposed = true;
      if (timerId) clearTimeout(timerId);
      if (frameId) cancelAnimationFrame(frameId);
      if (backgroundOnly) {
        window.removeEventListener('click', handleGlobalClick);
      }
      if (appRef.current && typeof appRef.current.dispose === 'function') {
        try {
          appRef.current.dispose();
        } catch {
          // ignore cleanup errors on unmount
        }
        appRef.current = null;
      }
    };
  }, [backgroundOnly]);

  if (backgroundOnly) {
    return (
      <div 
        className="pointer-events-none fixed inset-0 z-30 w-screen h-screen overflow-hidden mix-blend-screen"
        aria-hidden="true"
      >
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none" 
        />
      </div>
    );
  }

  return (
    // Main container with full-screen styles and click handler
    <div
      onClick={triggerColorChange}
      className={className}
    >
      {/* Canvas element for the animation, positioned behind everything else */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full" />
      
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
