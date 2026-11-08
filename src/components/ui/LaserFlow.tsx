'use client';

import React, { useEffect, useRef } from 'react';
import './LaserFlow.css';

export interface LaserFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  surfaceRef?: React.RefObject<HTMLElement | null>;
  beamPosition?: number;
  color?: string;
  intensity?: number;
  flare?: number;
  spread?: number;
  spill?: number;
  fog?: number;
  dust?: number;
  revealImage?: string;
  revealRadius?: number;
  revealOpacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const LaserFlow: React.FC<LaserFlowProps> = ({
  surfaceRef,
  beamPosition = 0.6,
  color = '#38bdf8',
  intensity = 1.8,
  flare = 1.5,
  spread = 1.5,
  spill = 1,
  fog = 0.2,
  dust = 1.6,
  revealImage,
  revealRadius = 220,
  revealOpacity = 0.6,
  className = '',
  style,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let time = 0;
    let disposed = false;

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.scale(dpr, dpr);
    };

    const parseColor = (col: string) => {
      if (col.startsWith('#')) {
        const hex = col.slice(1);
        const r = parseInt(hex.slice(0, 2), 16) || 0;
        const g = parseInt(hex.slice(2, 4), 16) || 0;
        const b = parseInt(hex.slice(4, 6), 16) || 0;
        return [r, g, b];
      }
      return [56, 189, 248];
    };

    const [r, g, b] = parseColor(color);

    const render = () => {
      if (disposed) return;
      time += 0.02;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Multiple dynamic laser beams spanning the section
      const positions = [beamPosition * 0.5, beamPosition, Math.min(0.85, beamPosition * 1.6)];
      positions.forEach((pos, idx) => {
        const beamY = h * pos + Math.sin(time * 0.35 + idx * 1.8) * 28;

        // Wide volumetric glow
        const grad = ctx.createLinearGradient(0, beamY - 90 * spread, 0, beamY + 90 * spread);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        grad.addColorStop(0.25, `rgba(30, 63, 216, ${Math.min(1, 0.35 * intensity)})`);
        grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${Math.min(1, 0.75 * intensity)})`);
        grad.addColorStop(0.75, `rgba(30, 63, 216, ${Math.min(1, 0.35 * intensity)})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, beamY - 90 * spread, w, 180 * spread);

        // Core high-intensity laser line
        const coreGrad = ctx.createLinearGradient(0, beamY - 4, 0, beamY + 4);
        coreGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        coreGrad.addColorStop(0.5, `rgba(255, 255, 255, ${Math.min(1, 0.98 * intensity)})`);
        coreGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = coreGrad;
        ctx.fillRect(0, beamY - 4, w, 8);
      });

      // Ambient dust particles floating throughout the space
      const dustCount = Math.round(45 * dust);
      for (let i = 0; i < dustCount; i++) {
        const px = (Math.sin(i * 137.5 + time * 0.25) * 0.5 + 0.5) * w;
        const py = ((i / dustCount) * h + Math.cos(i * 92.1 + time * 0.4) * 60 + h) % h;
        const alpha = (Math.sin(i * 45.2 + time) * 0.5 + 0.5) * 0.85 * flare;
        ctx.fillStyle = i % 2 === 0 ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgba(165, 216, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [beamPosition, color, intensity, flare, spread, dust]);

  return (
    <div
      ref={containerRef}
      className={`laser-flow-container ${className}`.trim()}
      style={style}
      {...rest}
    >
      <canvas ref={canvasRef} className="laser-flow-canvas" aria-hidden="true" />
    </div>
  );
};

export default LaserFlow;
