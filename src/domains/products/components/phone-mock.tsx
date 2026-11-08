import React from 'react';
import PixelSwap from '@/components/ui/PixelSwap';
import { ProductItem } from '../data/products-data';
import { Bot, Activity, Calendar, Table, Shirt, ShieldCheck, Sparkles } from 'lucide-react';

interface PhoneMockProps {
  product: ProductItem;
  className?: string;
  isStage?: boolean; // When on detail page
  enablePixelSwap?: boolean;
}

export const PhoneMock: React.FC<PhoneMockProps> = ({
  product,
  className = '',
  isStage = false,
  enablePixelSwap = false,
}) => {
  const hasScreenshots = product.screens && product.screens.length > 0;
  const screen1 = hasScreenshots ? `/projects/${product.slug}/${product.screens[0].file}` : null;
  const screen2 = hasScreenshots && product.screens.length > 1 ? `/projects/${product.slug}/${product.screens[1].file}` : null;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Soft cyan/sapphire glow behind phone */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary-mid/20 via-primary/25 to-primary-mid/10 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Peeking secondary screen (desktop / stage or featured cards) */}
      {hasScreenshots && screen2 && (
        <div
          className={`absolute top-2 -right-3 sm:-right-5 w-[85%] h-[92%] rounded-[32px] overflow-hidden border border-white/10 opacity-40 shadow-xl pointer-events-none transform rotate-[6deg] transition-transform duration-500 ease-out ${
            isStage ? 'sm:block' : 'hidden sm:block'
          }`}
          aria-hidden="true"
        >
          <img
            src={screen2}
            alt=""
            className="w-full h-full object-cover object-top filter brightness-90"
            loading="lazy"
          />
        </div>
      )}

      {/* Main Phone Device Frame */}
      <div
        className={`relative z-10 w-full aspect-[9/16] max-w-[270px] sm:max-w-[290px] ${
          isStage ? 'sm:max-w-[340px] md:max-w-[380px]' : ''
        } bg-[#08100a] rounded-[36px] p-2.5 sm:p-3 border border-white/20 shadow-[0_22px_50px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out group-hover:scale-[1.02]`}
      >
        {/* Dynamic Island / Speaker notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 flex items-center justify-center border border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10 mr-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#1a3a16]" />
        </div>

        {/* Screen Bezel Container */}
        <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-[#0c130d] border border-white/10 flex flex-col">
          {hasScreenshots && screen1 ? (
            enablePixelSwap && screen2 ? (
              <div className="w-full h-full relative overflow-hidden">
                <PixelSwap
                  firstContent={
                    <img
                      src={screen1}
                      alt={product.name}
                      className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02]"
                    />
                  }
                  secondContent={
                    <img
                      src={screen2}
                      alt={`${product.name} Preview`}
                      className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02]"
                    />
                  }
                  trigger="hover"
                  pattern="diagonal"
                  pixelSize={14}
                  duration={650}
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={screen1}
                  alt={product.name}
                  className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02]"
                  loading="lazy"
                />
              </div>
            )
          ) : (
            /* Stylized CSS Illustration for products without live screenshots */
            <div className="w-full h-full p-4 pt-10 flex flex-col justify-between bg-gradient-to-b from-surface2/90 via-surface to-bg text-left relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/10 rounded-full blur-xl pointer-events-none" />

              {/* Status Header inside mock */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[10px] font-mono text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {product.category}
                </span>
                <span className="text-[9px] font-mono text-text-muted bg-white/5 px-2 py-0.5 rounded-full">
                  Preview coming
                </span>
              </div>

              {/* Illustration variants */}
              {product.mockType === 'chat' && (
                <div className="space-y-2.5 py-3">
                  <div className="bg-surface2/90 border border-white/10 rounded-2xl rounded-tl-sm p-2.5 text-xs text-text-muted">
                    <p className="font-mono text-[9.5px] text-primary/80 mb-1 flex items-center gap-1">
                      <Bot className="w-3 h-3 text-primary" /> Verified Syllabus Retrieval
                    </p>
                    Where can I find PYQ papers for Data Structures?
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-sm p-2.5 text-xs text-text ml-4">
                    <p className="text-[11px] leading-snug">
                      Retrieved from Semester 3 local repository: 6 verified papers loaded.
                    </p>
                  </div>
                </div>
              )}

              {product.mockType === 'fitness' && (
                <div className="py-3 flex flex-col items-center justify-center">
                  <div className="relative w-24 h-24 rounded-full border-4 border-primary/30 border-t-primary flex flex-col items-center justify-center shadow-[0_0_16px_rgba(168,230,46,0.2)]">
                    <Activity className="w-4 h-4 text-primary mb-0.5" />
                    <span className="font-display font-extrabold text-sm text-white">2,140</span>
                    <span className="font-mono text-[8px] text-text-muted">KCAL TARGET</span>
                  </div>
                  <div className="w-full mt-3 space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono text-text-muted">
                      <span>Protein 130g</span>
                      <span className="text-primary">85%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-primary rounded-full" />
                    </div>
                  </div>
                </div>
              )}

              {product.mockType === 'calendar' && (
                <div className="py-2 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-text mb-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" /> Session Timeline
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-[11px]">
                    <div className="text-primary font-semibold">10:00 AM • Main Auditorium</div>
                    <div className="text-text-muted text-[10px]">Keynote: Engineering at Scale</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-[11px]">
                    <div className="text-text-muted font-semibold">11:30 AM • Track B Lab</div>
                    <div className="text-text-muted text-[10px]">Security Hackathon Briefing</div>
                  </div>
                </div>
              )}

              {product.mockType === 'table' && (
                <div className="py-2 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-text mb-1">
                    <Table className="w-3.5 h-3.5 text-primary" /> Academic Records
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-[9.5px] font-mono text-text-muted border-b border-white/10 pb-1">
                    <span>Role</span>
                    <span>Scope</span>
                    <span>Access</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-white/90 pt-0.5">
                    <span className="text-primary">Faculty</span>
                    <span>CSE Dept</span>
                    <span>Verified</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-white/90 pt-0.5">
                    <span className="text-primary">Chair</span>
                    <span>School of ICT</span>
                    <span>Admin</span>
                  </div>
                </div>
              )}

              {/* Bottom Brand Stamp */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-text-muted">
                <span>{product.name}</span>
                <span className="text-primary">KAVIROX</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneMock;
