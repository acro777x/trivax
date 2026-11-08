import React, { useMemo } from 'react';
import LogoLoop, { LogoLoopItem } from '@/components/ui/LogoLoop';
import { useDeviceTier } from '@/shared/hooks/use-device-tier';
import {
  SiShopify,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiNodedotjs,
  SiWhatsapp,
  SiMeta,
  SiRazorpay,
  SiGoogleanalytics,
  SiN8N,
} from 'react-icons/si';

export const TechMarquee: React.FC = () => {
  const tier = useDeviceTier();
  const isFull = tier === 'full';

  const techLogos: LogoLoopItem[] = useMemo(
    () => [
      { node: <SiNextdotjs className="w-6 h-6" />, title: 'Next.js', hoverColor: '#38bdf8' },
      { node: <SiReact className="w-6 h-6" />, title: 'React', hoverColor: '#38bdf8' },
      { node: <SiTypescript className="w-6 h-6" />, title: 'TypeScript', hoverColor: '#38bdf8' },
      { node: <SiTailwindcss className="w-6 h-6" />, title: 'Tailwind CSS', hoverColor: '#38bdf8' },
      { node: <SiNodedotjs className="w-6 h-6" />, title: 'Node.js', hoverColor: '#38bdf8' },
      { node: <SiShopify className="w-6 h-6" />, title: 'Shopify', hoverColor: '#38bdf8' },
      { node: <SiVite className="w-6 h-6" />, title: 'Vite', hoverColor: '#38bdf8' },
      { node: <SiWhatsapp className="w-6 h-6" />, title: 'WhatsApp API', hoverColor: '#38bdf8' },
      { node: <SiMeta className="w-6 h-6" />, title: 'Meta Cloud API', hoverColor: '#38bdf8' },
      { node: <SiRazorpay className="w-6 h-6" />, title: 'Razorpay', hoverColor: '#38bdf8' },
      { node: <SiGoogleanalytics className="w-6 h-6" />, title: 'Google Analytics', hoverColor: '#38bdf8' },
      { node: <SiN8N className="w-6 h-6" />, title: 'n8n', hoverColor: '#38bdf8' },
    ],
    []
  );

  return (
    <section
      className="relative w-full py-8 sm:py-10 bg-bg border-y border-line overflow-hidden select-none"
      aria-label="Technologies we build with"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-5 text-center">
        <span className="font-mono text-xs text-text-muted/80 tracking-wider">
          Technologies we build with
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        {isFull ? (
          <LogoLoop
            logos={techLogos}
            speed={50}
            direction="left"
            logoHeight={32}
            gap={48}
            hoverSpeed={0}
            scaleOnHover={true}
            labels="hover"
            muted={0.55}
            ariaLabel="Technologies and platforms engineered by Kavirox"
            className="text-text-muted hover:text-primary cursor-target"
          />
        ) : (
          <div className="animate-marquee-css items-center gap-10 py-1" aria-label="Technologies and platforms engineered by Kavirox">
            {[...techLogos, ...techLogos].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-text-muted opacity-60 hover:opacity-100 hover:text-primary shrink-0 font-mono text-xs transition-opacity"
              >
                <span className="w-6 h-6 flex items-center justify-center">{item.node}</span>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TechMarquee;
