import React, { useState, useEffect, Suspense, lazy } from 'react';
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

const Particles = lazy(() => import('@/components/ui/Particles'));

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
      'We configure production infrastructure, DNS, SSL, databases, monitoring, and run controlled phased rollouts with rollback contingencies.',
    chips: ['CI/CD pipeline', 'Zero-downtime deploy', 'Audit checks'],
    icon: Rocket,
  },
  {
    step: 6,
    title: 'Ongoing Support',
    description:
      'We stay with you post-launch to monitor error rates, optimize latency, apply security patches, and build future product iterations.',
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
      className="relative w-full py-20 sm:py-28 md:py-32 bg-bg border-b border-line scroll-mt-24 md:scroll-mt-28 overflow-hidden isolate"
      aria-label="Process: How a project runs"
    >
      {/* Dedicated Original Particles Background for Process Section */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <Suspense fallback={null}>
          <Particles
            particleColors={["#ffffff", "#ffffff", "#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            glow={0.5}
            twinkle={0.3}
            moveParticlesOnHover
            hoverEffect="parallax"
            sizeRandomness={1}
            shape="circle"
            depthOfField={0}
            connections={false}
            connectionDistance={110}
            particleHoverFactor={1}
            hoverRadius={140}
            drift="none"
            driftSpeed={1}
            alphaParticles={false}
            disableRotation={false}
            cameraDistance={20}
            variation={0}
            opacity={1}
            clickBurst
            intro
            lightMode={false}
          />
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Header with Zero-Collision Spacing */}
        <div className="max-w-3xl mb-14 sm:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest mb-1">
            <span className="w-4 h-[1px] bg-primary" />
            <span>Process</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-text tracking-tight leading-[1.05] text-balance mb-4">
            <ScrollFloat effect="float" splitBy="words" animationDuration={0.85} stagger={0.035}>
              How a project runs.
            </ScrollFloat>
          </h2>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed text-pretty">
            Six clear steps from first conversation to ongoing support.
          </p>
        </div>

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

              {/* Step Progress Pill Indicator */}
              <div className="pt-2">
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${(activeStep / 6) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-text-muted mt-2">
                  <span>Kickoff</span>
                  <span>Delivery &amp; Scale</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sequential Steps with Connected Timeline */}
          <div className="lg:col-span-7 relative">
            {/* Vertical timeline spine */}
            <div className="absolute left-6 top-8 bottom-8 w-[1px] bg-white/10 hidden sm:block" />

            <div className="space-y-8 sm:space-y-12">
              {PROCESS_STEPS.map((step) => {
                const Icon = step.icon;
                const isActive = activeStep === step.step;

                return (
                  <div
                    key={step.step}
                    className={`process-step-row relative transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-60 hover:opacity-85'
                    }`}
                  >
                    <div className="sm:pl-16 relative">
                      {/* Timeline Node */}
                      <div
                        className={`hidden sm:flex absolute left-0 top-1 w-12 h-12 rounded-full border items-center justify-center transition-all duration-300 -translate-x-[23px] ${
                          isActive
                            ? 'bg-primary/20 border-primary text-primary shadow-[0_0_16px_rgba(56,189,248,0.5)] scale-110'
                            : 'bg-surface border-white/15 text-text-muted'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Step Card Content */}
                      <div
                        className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                          isActive
                            ? 'bg-surface/90 border-primary/40 shadow-xl'
                            : 'bg-surface/60 border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-xs font-semibold text-primary uppercase">
                            Step {step.step}
                          </span>
                          <div className="sm:hidden w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <h4 className="font-display font-bold text-xl sm:text-2xl text-white mb-2.5">
                          {step.title}
                        </h4>
                        <p className="text-sm text-text-muted leading-relaxed mb-4">
                          {step.description}
                        </p>

                        {/* Deliverables / Focus Chips */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                          {step.chips.map((chip, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-text-muted flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                              <span>{chip}</span>
                            </span>
                          ))}
                        </div>
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
