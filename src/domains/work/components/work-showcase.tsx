import React from 'react';
import type { WorkItem } from '../types';

const clientWork: WorkItem[] = [
  {
    id: 'work-1',
    client: 'Fintech Scale-Up',
    title: 'High-Concurrency Event-Driven Ledger Engine',
    category: 'Backend & Infrastructure',
    outcome: 'Processed 2.4M transactions daily with sub-30ms p99 latency.',
    technologies: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Kafka'],
    engagementType: 'Dedicated Squad Contract (4 Months)'
  },
  {
    id: 'work-2',
    client: 'EdTech Enterprise',
    title: 'StudyHub Learning Intelligence Platform',
    category: 'Product & Web Engineering',
    outcome: 'Shipped unified web application supporting 85k active students.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'FastAPI', 'PostgreSQL'],
    engagementType: 'Contract Build & Deployment (3 Months)'
  },
  {
    id: 'work-3',
    client: 'Public Safety Network',
    title: 'Rakshak Setu Real-Time Emergency SOS Network',
    category: 'Distributed Telemetry & Mobile Mesh',
    outcome: 'Sub-second geolocation dispatch routing across low-connectivity nodes.',
    technologies: ['TypeScript', 'WebSockets', 'Go', 'Docker', 'GIS'],
    engagementType: 'Autonomous Pod Contract (6 Months)'
  }
];

export const WorkShowcase: React.FC = () => {
  return (
    <section id="work" className="py-20 md:py-28 lg:py-32 px-5 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-white/60 font-sans border border-white/10 px-3 py-1 rounded-full bg-white/5">
            Shipped Contracts
          </span>
          <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-instrument-serif mt-5 text-white leading-[1.1]">
            Client Work & Delivered Systems
          </h2>
        </div>
        <p className="text-white/60 text-[clamp(0.9rem,1vw,1rem)] max-w-md font-sans">
          A track record of shipping production-grade platforms with speed, rigor, and zero bureaucracy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {clientWork.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-white/[0.02] border border-white/10 p-7 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-white/50 mb-3 font-sans">
                <span>{item.client}</span>
                <span className="text-[11px] text-white/40">{item.category}</span>
              </div>
              <h3 className="text-2xl font-instrument-serif text-white group-hover:text-white/90 transition-colors mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-white/70 font-sans leading-relaxed mb-6">
                {item.outcome}
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {item.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-sans px-2 py-0.5 rounded bg-white/5 text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-white/50">
                <span>{item.engagementType}</span>
                <span className="text-white/80 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkShowcase;
