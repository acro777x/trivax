import React from 'react';
import type { ContractTier } from '../types';

const tiers: ContractTier[] = [
  {
    id: 'rapid-squad',
    name: 'Rapid Sprint Pod',
    badge: 'Sprint-Based',
    description: 'A 2 to 3-engineer cross-functional pod that steps in to build MVP features, unblock bottlenecks, or ship rapid iterations.',
    deliverables: [
      'Full-stack TypeScript / React / Node.js development',
      'Direct Slack/Discord async integration',
      'Daily commits & bi-weekly deploy milestones',
      'Autonomous project management'
    ],
    engagementPeriod: '2 to 6 weeks',
    idealFor: 'Early-stage startups needing urgent execution velocity'
  },
  {
    id: 'dedicated-squad',
    name: 'Dedicated Platform Squad',
    badge: 'Core Contracting',
    description: 'An embedded senior engineering squad covering system design, cloud infrastructure, front-end polish, and backend concurrency.',
    deliverables: [
      'Senior Lead Architect + 2-4 senior engineers',
      'Production-grade cloud architecture & CI/CD',
      'Enterprise security & high-availability standards',
      'Complete documentation & knowledge transfer'
    ],
    engagementPeriod: '3 to 12 months',
    idealFor: 'Funded scale-ups building or overhauling core products'
  },
  {
    id: 'freelance-burst',
    name: 'On-Demand Freelancer Scale',
    badge: 'Flexible Talent',
    description: 'Pre-vetted freelance specialists in niche disciplines (Three.js/WebGL, LLM integration, high-concurrency systems).',
    deliverables: [
      'Access to vetted senior freelancer roster',
      'Kavirox QA and technical vetting included',
      'Flexible hourly or milestone-based contracts',
      'Immediate onboarding within 48 hours'
    ],
    engagementPeriod: 'Flexible / As-needed',
    idealFor: 'Teams looking to supplement internal capacity with specialized skillsets'
  }
];

export const SquadOverview: React.FC = () => {
  return (
    <section id="contracting" className="py-20 md:py-28 lg:py-32 px-5 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
        <span className="text-xs uppercase tracking-widest text-white/60 font-sans border border-white/10 px-3 py-1 rounded-full bg-white/5">
          Contracting & Engagement Models
        </span>
        <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-instrument-serif mt-5 text-white leading-[1.1]">
          Autonomous Squads Designed for High-Velocity Delivery
        </h2>
        <p className="text-white/70 text-[clamp(0.95rem,1.05vw,1.075rem)] mt-5 font-sans">
          We eliminate hiring friction. Work directly with battle-tested contractors and seasoned freelancers who know how to ship production-ready code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="rounded-2xl bg-white/[0.03] border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all hover:bg-white/[0.05]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/90">
                  {tier.badge}
                </span>
                <span className="text-xs text-white/50">{tier.engagementPeriod}</span>
              </div>
              <h3 className="text-2xl font-instrument-serif text-white mb-3">
                {tier.name}
              </h3>
              <p className="text-sm text-white/70 font-sans mb-6">
                {tier.description}
              </p>
              <div className="space-y-2 mb-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Includes</p>
                {tier.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-white/80 font-sans">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-6 border-t border-white/10">
              <p className="text-xs text-white/50 mb-4">
                <strong className="text-white/80">Best for:</strong> {tier.idealFor}
              </p>
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-neutral-900 font-sans text-sm font-medium transition-all"
              >
                Inquire for Squad
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SquadOverview;
