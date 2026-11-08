import React, { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is Kavirox a product company or an agency?',
    answer:
      'Both, in that order. We build our own products and also deliver technology services. The products show what we can do; the services fit it to your needs.',
  },
  {
    question: 'Can I use a product as it is?',
    answer:
      'Where a product already covers your main need, yes. We explain scope, setup, limits, data handling, support and price before you decide.',
  },
  {
    question: 'What if a product does not fit exactly?',
    answer:
      'We can configure it, integrate it with your tools, or extend it with custom modules, and we keep the standard and the custom parts clearly separate.',
  },
  {
    question: 'Are all your products live today?',
    answer:
      'No. Each product shows its real status: prototype, in development, pilot or built. We do not present unfinished work as finished.',
  },
  {
    question: 'How do you approach security?',
    answer:
      'We design to strengthen security and reduce exposure, using access control, data protection and testing. We do not promise that any system is completely safe. Security testing is scoped and done with authorization.',
  },
  {
    question: 'Do you guarantee rankings, sales or leads?',
    answer:
      'No. We improve the foundations, such as speed, structure, tracking and experience, and we measure results, but we do not guarantee outcomes.',
  },
  {
    question: 'How do we start?',
    answer:
      'Send us a short note about what you want to build. We reply with questions, a rough plan and the next step.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(idx);
    }
  };

  return (
    <section
      id="faq"
      className="relative w-full py-20 sm:py-28 md:py-32 bg-bg border-b border-line overflow-hidden scroll-mt-24 md:scroll-mt-28"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Sticky Section Header on lg+ */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-4">
            <Reveal>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest">
                <span className="w-4 h-[1px] bg-primary" />
                <span>Questions</span>
              </div>
            </Reveal>

            <Reveal delayMs={60}>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text tracking-tight leading-[1.08]">
                Things people ask first.
              </h2>
            </Reveal>

            <Reveal delayMs={120}>
              <p className="text-text-muted text-base leading-relaxed text-pretty">
                Clear answers regarding our products, custom engineering services, security boundaries, and delivery standards.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Accordion Panels */}
          <div className="lg:col-span-7 space-y-3.5">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              const contentId = `faq-answer-${idx}`;

              return (
                <Reveal key={idx} delayMs={idx * 40}>
                  <div
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-surface/90 border-primary/40 shadow-lg'
                        : 'bg-surface/50 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      onClick={() => toggleItem(idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className="cursor-target w-full px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                      data-cursor-label={isOpen ? 'Close' : 'Open'}
                    >
                      <span className="font-display font-bold text-base sm:text-lg text-text">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-primary shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-primary' : 'text-text-muted/60'
                        }`}
                      />
                    </button>

                    {/* CSS Grid-Rows Smooth Height Transition without layout thrashing */}
                    <div
                      id={contentId}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-5 pt-1 text-sm sm:text-base text-text-muted leading-relaxed font-sans">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
