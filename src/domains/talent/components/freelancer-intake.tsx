import React from 'react';
import type { FreelanceRole } from '../types';

const openRoles: FreelanceRole[] = [
  {
    role: 'Senior React / Next.js Contract Engineer',
    type: 'Remote Contract (20-40 hrs/wk)',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Three.js'],
    spots: 3
  },
  {
    role: 'Node.js & Distributed Systems Architect',
    type: 'Contract / Project-Based',
    stack: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'Docker'],
    spots: 2
  },
  {
    role: 'AI / Multi-Agent Integration Engineer',
    type: 'Sprint Contract',
    stack: ['Python', 'TypeScript', 'LangChain', 'FastAPI', 'LLM APIs'],
    spots: 2
  }
];

export const FreelancerIntake: React.FC = () => {
  return (
    <section id="talent" className="py-20 md:py-28 lg:py-32 px-5 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-5">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-sans border border-emerald-500/20 px-3 py-1 rounded-full bg-emerald-500/10">
            For Freelancers & Contractors
          </span>
          <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-instrument-serif mt-5 text-white leading-[1.1]">
            Build With Kavirox On High-Value Client Contracts
          </h2>
          <p className="text-white/70 text-[clamp(0.95rem,1.05vw,1.075rem)] mt-5 font-sans leading-relaxed">
            We partner with independent developers, UI engineers, and system architects. No bureaucratic corporate hierarchies—just challenging engineering, flexible contractor rates, and clear scopes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#apply"
              className="inline-flex items-center justify-center rounded-full bg-white text-neutral-900 px-6 py-3 font-sans text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Apply to Freelancer Network
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <p className="text-xs uppercase font-sans tracking-wider text-white/50 mb-2">
            Current Contract Openings
          </p>
          {openRoles.map((role, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h4 className="text-lg font-medium text-white font-sans">{role.role}</h4>
                <p className="text-xs text-white/60 font-sans mt-1">{role.type}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {role.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-white/70 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="sm:text-right shrink-0">
                <span className="inline-block text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {role.spots} contract spots
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreelancerIntake;
