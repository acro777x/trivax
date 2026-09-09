import React, { useEffect, useRef, useState, useCallback } from "react";

interface ChromaticTextProps {
  text: string;
  className?: string;
  seed?: number;
  delay?: number;
  duration?: number;
  interactive?: boolean;
  as?: "span" | "h1" | "h2" | "p" | "div";
}

// Pseudo-random generator with fixed seed for consistent letter jitter
function createRng(seed: number) {
  let a = seed >>> 0;
  return function () {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const eOut = (t: number) => 1 - Math.pow(1 - t, 3);
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a || 1e-6), 0, 1);

export function ChromaticText({
  text,
  className = "",
  seed = 7719,
  delay = 0.1,
  duration = 1.4,
  interactive = true,
  as: Component = "span",
}: ChromaticTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [isGlitching, setIsGlitching] = useState(false);

  // Precompute jitter vectors for each character: [dx, dy, randomDelay]
  const jitterMap = useRef<{ dx: number; dy: number; rDelay: number }[]>([]);
  
  if (jitterMap.current.length !== text.length) {
    const rng = createRng(seed);
    jitterMap.current = Array.from({ length: text.length }, () => ({
      dx: (rng() * 2 - 1) * 64, // horizontal displacement
      dy: (rng() * 2 - 1) * 36, // vertical displacement
      rDelay: rng(),
    }));
  }

  const renderFrame = useCallback((progress: number) => {
    spansRef.current.forEach((span, i) => {
      if (!span) return;
      const j = jitterMap.current[i];
      if (!j) return;

      // Character-level eased convergence (derived from ThreeUI intro assemble)
      const a = eOut(clamp(seg(progress, 0.05, 0.75) * 1.6 - j.rDelay * 0.45, 0, 1));
      
      const x = (j.dx * (1 - a)).toFixed(2);
      const y = (j.dy * (1 - a)).toFixed(2);
      const scale = lerp(1.22, 1, a).toFixed(3);
      const opacity = clamp(a * 1.8, 0, 1).toFixed(3);
      const sep = (1 - a) * 14;

      span.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      span.style.opacity = opacity;

      if (sep > 0.4) {
        span.style.textShadow = `${(-sep).toFixed(1)}px 0 rgba(255,64,72,0.85), ${sep.toFixed(1)}px 0 rgba(64,255,190,0.8), 0 ${(sep * 0.55).toFixed(1)}px rgba(96,124,255,0.8)`;
        span.style.filter = sep > 0.7 ? `blur(${(sep * 0.28).toFixed(2)}px)` : "none";
      } else {
        span.style.textShadow = "none";
        span.style.filter = "none";
      }
    });
  }, []);

  const startAnimation = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    startTimeRef.current = null;

    const animate = (now: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }
      const elapsed = (now - startTimeRef.current) / 1000;
      const adjustedElapsed = Math.max(0, elapsed - delay);
      const progress = clamp(adjustedElapsed / duration, 0, 1);

      renderFrame(progress);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Reset final crisp state
        spansRef.current.forEach((span) => {
          if (!span) return;
          span.style.transform = "none";
          span.style.opacity = "1";
          span.style.textShadow = "none";
          span.style.filter = "none";
        });
        setIsGlitching(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [delay, duration, renderFrame]);

  useEffect(() => {
    startAnimation();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [startAnimation]);

  // Interactive chromatic twitch on mouse hover
  const handleMouseEnter = () => {
    if (!interactive || isGlitching) return;
    setIsGlitching(true);
    
    // Quick chromatic pulse (150ms outward, then reassemble)
    let startTime: number | null = null;
    const glitchDuration = 0.45;
    
    const glitchLoop = (now: number) => {
      if (startTime === null) startTime = now;
      const p = clamp((now - startTime) / 1000 / glitchDuration, 0, 1);

      // Pulse: jumps to chromatic separation, then quickly snaps back
      const curve = p < 0.25 ? p / 0.25 : 1 - (p - 0.25) / 0.75;
      const sep = curve * 8;

      spansRef.current.forEach((span, i) => {
        if (!span) return;
        const j = jitterMap.current[i];
        if (!j) return;
        const x = (j.dx * 0.15 * curve).toFixed(1);
        const y = (j.dy * 0.15 * curve).toFixed(1);
        span.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        if (sep > 0.4) {
          span.style.textShadow = `${(-sep).toFixed(1)}px 0 rgba(255,64,72,0.9), ${sep.toFixed(1)}px 0 rgba(64,255,190,0.85), 0 ${(sep * 0.5).toFixed(1)}px rgba(96,124,255,0.85)`;
        } else {
          span.style.textShadow = "none";
        }
      });

      if (p < 1) {
        requestAnimationFrame(glitchLoop);
      } else {
        spansRef.current.forEach((span) => {
          if (!span) return;
          span.style.transform = "none";
          span.style.textShadow = "none";
        });
        setIsGlitching(false);
      }
    };

    requestAnimationFrame(glitchLoop);
  };

  return (
    <Component
      ref={containerRef as any}
      className={`inline-flex flex-nowrap whitespace-nowrap ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          ref={(el) => {
            spansRef.current[index] = el;
          }}
          className="inline-block tracking-tight"
          style={{
            willChange: "transform, opacity, filter, text-shadow",
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </Component>
  );
}

export default ChromaticText;
