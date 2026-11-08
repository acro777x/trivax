import React from 'react';

interface LogoMarkProps {
  size?: number | string;
  className?: string;
  glow?: boolean;
  idPrefix?: string;
}

/**
 * Clean vector LogoMark rendered from the authentic Kavirox emblem artwork
 * (Outer dual-arc ring with top-left pixel scatter, notched K stem, angled code brackets)
 */
export const LogoMark: React.FC<LogoMarkProps> = ({
  size = 36,
  className = '',
  glow = false,
  idPrefix = 'kv',
}) => {
  const gradId = `${idPrefix}-brand-grad`;
  const glowId = `${idPrefix}-glow`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 760 640"
      width={size}
      height={typeof size === 'number' ? (size * 640) / 760 : 'auto'}
      fill="none"
      className={`shrink-0 ${className}`}
      aria-label="Kavirox Mark"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="45%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3fd8" />
        </linearGradient>
        {glow && (
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      {/* Code brackets < > : light (white 80%) on dark backgrounds */}
      <g className="text-white/80" fill="currentColor">
        {/* Left bracket < */}
        <path d="M 89 238 L 12 303 L 6 317 L 11 330 L 82 389 L 95 394 L 105 386 L 104 369 L 44 318 L 105 262 L 104 244 L 96 238 Z" />
        {/* Right bracket > */}
        <path d="M 671 238 L 748 303 L 754 317 L 749 330 L 678 389 L 665 394 L 655 386 L 656 369 L 716 318 L 655 262 L 656 244 L 664 238 Z" />
      </g>

      {/* Brand Gradient: Broken Ring, Notched K Stem, Pixel Scatter */}
      <g fill={`url(#${gradId})`} filter={glow ? `url(#${glowId})` : undefined}>
        {/* Pixel scatter squares top-left */}
        <rect x="134" y="60" width="37" height="37" rx="3" />
        <rect x="94" y="112" width="28" height="28" rx="2" />
        <rect x="130" y="145" width="40" height="40" rx="3" />
        <rect x="170" y="190" width="33" height="33" rx="2" />
        <rect x="106" y="198" width="24" height="24" rx="2" />
        <rect x="137" y="229" width="19" height="19" rx="1.5" />
        <rect x="163" y="254" width="19" height="19" rx="1.5" />

        {/* Lower Ring Arc (from left opening around 180° counter-clockwise to right opening ~0°) */}
        <path d="M 112 450 C 132 506 182 560 248 596 C 314 632 396 644 476 626 C 556 608 626 558 662 496 L 620 468 C 590 518 534 558 468 572 C 402 586 334 576 280 546 C 226 516 186 470 166 422 Z" />

        {/* Upper Ring Arc (sweeping from top-left pixel break clockwise to right horizontal opening ~0°) */}
        <path d="M 212 94 C 274 38 360 8 448 18 C 536 28 614 78 656 150 C 684 198 698 252 698 308 L 642 308 C 642 264 630 220 608 182 C 574 124 510 84 438 76 C 366 68 296 92 246 138 Z" />

        {/* Notched K Stem: vertical column with distinct left-curving hook/flag at upper crest */}
        <path d="M 314 138 C 304 136 294 140 286 148 C 276 158 270 174 270 196 L 270 472 L 326 472 L 326 216 L 350 216 C 362 216 372 208 372 196 C 372 184 362 176 350 176 L 326 176 L 326 150 C 326 142 320 138 314 138 Z" />

        {/* K Upper Leg: bold diagonal branching up-right */}
        <path d="M 326 312 L 444 192 L 512 192 L 382 322 Z" />

        {/* K Lower Leg: bold diagonal branching down-right */}
        <path d="M 372 312 L 518 472 L 448 472 L 326 338 Z" />
      </g>
    </svg>
  );
};

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDescriptor?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showDescriptor = true,
  className = '',
  onClick,
  href = '#top',
}) => {
  const markSizes = {
    sm: 28,
    md: 36,
    lg: 48,
    xl: 64,
  };

  const textSizes = {
    sm: 'text-[15px]',
    md: 'text-[19px]',
    lg: 'text-[26px]',
    xl: 'text-[36px]',
  };

  const subSizes = {
    sm: 'text-[8px] tracking-[0.25em]',
    md: 'text-[9.5px] tracking-[0.3em]',
    lg: 'text-[12px] tracking-[0.35em]',
    xl: 'text-[15px] tracking-[0.4em]',
  };

  const currentMarkSize = markSizes[size];

  const content = (
    <div
      className={`inline-flex items-center gap-3 select-none group ${className}`}
      onClick={onClick}
    >
      <LogoMark size={currentMarkSize} />
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline">
          <span
            className={`font-display font-[800] tracking-[0.04em] text-white transition-colors duration-200 group-hover:text-primary ${textSizes[size]}`}
          >
            KAVIROX
          </span>
          <span className="text-primary font-display font-extrabold ml-[1px]">.</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`font-mono uppercase text-primary font-medium ${subSizes[size]}`}
          >
            SPACE
          </span>
          {showDescriptor && size !== 'sm' && (
            <span className="hidden sm:inline-block text-[10.5px] font-mono text-text-muted/70 tracking-normal pl-1.5 border-l border-white/10">
              Technology • Products • Solutions
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
        {content}
      </a>
    );
  }

  return content;
};
