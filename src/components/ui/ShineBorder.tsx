import React from 'react';

export interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  shineColor?: string[];
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const ShineBorder: React.FC<ShineBorderProps> = ({
  borderRadius = 20,
  borderWidth = 1,
  duration = 8,
  shineColor = ['#1e3fd8', '#38bdf8', '#a5d8ff'],
  className = '',
  children,
  style,
}) => {
  return (
    <div
      style={{
        borderRadius: `${borderRadius}px`,
        ...style,
      }}
      className={`relative p-[1px] overflow-hidden isolate ${className}`}
    >
      <div
        aria-hidden="true"
        style={{
          animationDuration: `${duration}s`,
          background: `conic-gradient(from 0deg, transparent 0deg, ${shineColor.join(', ')}, transparent 360deg)`,
        }}
        className="absolute -inset-[150%] animate-[spin_8s_linear_infinite] [animation-play-state:running] pointer-events-none -z-10 @media(prefers-reduced-motion:reduce):animate-none opacity-75"
      />
      <div
        style={{
          borderRadius: `${borderRadius - borderWidth}px`,
        }}
        className="w-full h-full bg-surface relative z-10"
      >
        {children}
      </div>
    </div>
  );
};

export default ShineBorder;
