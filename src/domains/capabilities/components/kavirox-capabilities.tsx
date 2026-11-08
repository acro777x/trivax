import React, { useState, useEffect } from 'react';
import Reveal from '@/components/ui/Reveal';
import ScrollFloat from '@/components/ui/ScrollFloat';
import {
  Compass,
  Layers,
  Code2,
  FileCheck,
  Rocket,
  Repeat,
  CheckCircle2,
} from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Understanding Your Needs',
    description:
      'We assess your current product or digital system, identify where users encounter friction, and establish clear technical requirements.',
    chips: ['Architecture review', 'Scope alignment', 'Technical plan'],
    icon: Compass,
  },
  {
    step: 2,
    title: 'Design & Planning',
    description:
      'We architect intuitive, responsive user interfaces and map out backend data models, APIs, and permissions before coding begins.',
    chips: ['Design system', 'Data flow mapping', 'API specifications'],
    icon: Layers,
  },
  {
    step: 3,
    title: 'Clean Development',
    description:
      'We write modular, production-tested code designed for speed, security, and scalability across web and mobile platforms.',
    chips: ['TypeScript', 'Component architecture', 'Integrations'],
    icon: Code2,
  },
  {
    step: 4,
    title: 'Testing Everything',
    description:
      'We rigorously test user flows, security access, edge cases, and performance across real devices and network environments.',
    chips: ['Cross-device QA', 'Security audit', 'Performance tuning'],
    icon: FileCheck,
  },
  {
    step: 5,
    title: 'Smooth Launch',
    description:
      'We deploy your system with zero downtime, configure monitoring and telemetry, and verify all integrations in production.',
    chips: ['Zero-downtime deploy', 'Telemetry setup', 'Live verification'],
    icon: Rocket,
  },
  {
    step: 6,
    title: 'Ongoing Support',
    description:
      'We maintain health metrics, perform platform upgrades, and build iterative enhancements as your business grows.',
    chips: ['Continuous care', 'SLA response', 'Iterative updates'],
    icon: Repeat,
  },
];

export const KaviroxCapabilities: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const stepElements = document.querySelectorAll('.process-step-row');
      const triggerY = window.innerHeight * 0.52;
      let currentIdx = 0;

      stepElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) {
          currentIdx = idx;
        }
      });
      setActiveStep(currentIdx + 1);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentStepData = PROCESS_STEPS[activeStep - 1] || PROCESS_STEPS[0];

  return (
    <section
      id="process"
      className="relative w-full py-20 sm:py-28 md:py-32 bg-bg border-b border-line scroll-mt-24 md:scroll-mt-28"
      aria-label="Process: How a project runs"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Header */}
        <Reveal>
          <div className="max-w-3xl mb-14 sm:mb-20 space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest">
              <span className="w-4 h-[1px] bg-primary" />
              <span>Process</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-text tracking-tight leading-[1.05] text-balance">
              <ScrollFloat effect="float" splitBy="words" animationDuration={0.8} stagger={0.03}>
                How a project runs.
              </ScrollFloat>
            </h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed text-pretty">
              Six clear steps from first conversation to ongoing support.
            </p>
          </div>
        </Reveal>

        {/* Sticky Split Layout: Left sticky progress indicator / Right 6 sequential steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 relative items-start">
          {/* Left Sticky Panel (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-surface/90 border border-white/10 shadow-2xl backdrop-blur-md space-y-5">
              <div className="flex items-baseline justify-between border-b border-white/10 pb-3.5">
                <span className="font-mono text-xs uppercase text-primary tracking-widest">
                  Current Stage
                </span>
                <span className="font-mono text-xs text-text-muted tabular-nums">
                  {activeStep} of 06
                </span>
              </div>

              {/* Big Step Numeral & Title */}
              <div>
                <div className="font-display font-black text-5xl sm:text-6xl text-primary/95 mb-2 tabular-nums">
                  0{activeStep}
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2.5">
                  {currentStepData.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {currentStepData.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 pt-1 border-t border-white/5">
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(168,230,46,0.6)]"
                    style={{ width: `${(activeStep / 6) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-text-muted/60">
                  <span>Kickoff</span>
                  <span>Delivery &amp; Scale</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Steps along a scroll-linked vertical rule */}
          <div className="lg:col-span-7 relative">
            {/* Drawing vertical line mathematically centered at x = 20px */}
            <div
              className="absolute left-[19px] top-9 bottom-12 w-[2px] bg-white/10 pointer-events-none rounded-full z-0"
              aria-hidden="true"
            >
              <div
                className="w-full bg-primary transition-all duration-300 ease-out shadow-[0_0_8px_rgba(168,230,46,0.6)] rounded-full"
                style={{ height: `${((activeStep - 1) / 5) * 100}%` }}
              />
            </div>

            <div className="space-y-8 sm:space-y-10 relative z-10">
              {PROCESS_STEPS.map((step) => {
                const Icon = step.icon;
                const isPassedOrActive = activeStep >= step.step;
                const isCurrent = activeStep === step.step;

                return (
                  <div
                    key={step.step}
                    id={`step-${step.step}`}
                    className={`process-step-row flex items-start gap-4 sm:gap-6 relative transition-all duration-300 ${
                      isCurrent
                        ? 'opacity-100'
                        : isPassedOrActive
                        ? 'opacity-85'
                        : 'opacity-50'
                    }`}
                  >
                    {/* Step Node Dot centered directly on the 40px track column at x = 20px */}
                    <div className="w-10 flex-none flex items-center justify-center pt-6">
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all relative ${
                          isPassedOrActive
                            ? 'bg-bg border-primary shadow-[0_0_8px_rgba(168,230,46,0.7)]'
                            : 'bg-bg border-white/20'
                        }`}
                      >
                        {isCurrent && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary absolute inset-0 m-auto animate-ping" />
                        )}
                      </div>
                    </div>

                    {/* Step Content Card */}
                    <div
                      className={`flex-1 p-6 sm:p-7 rounded-2xl bg-surface/80 border transition-all ${
                        isCurrent
                          ? 'border-primary/40 bg-surface shadow-xl ring-1 ring-primary/20'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-sans font-semibold text-xs text-primary tracking-wide">
                          Step {step.step}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-surface2 border border-white/10 flex items-center justify-center text-text-muted">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Deliverable Chips */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                        {step.chips.map((chip, cIdx) => (
                          <span
                            key={cIdx}
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted bg-white/5 px-2.5 py-1 rounded-md"
                          >
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                            <span>{chip}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KaviroxCapabilities;
