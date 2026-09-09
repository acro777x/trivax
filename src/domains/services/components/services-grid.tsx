import React from 'react';
import type { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: 'fullstack-dev',
    icon: '⚡',
    title: 'Full-Stack Web & Mobile Engineering',
    badge: 'Core Service',
    description: 'End-to-end modern web and cross-platform mobile apps engineered for speed, high conversions, and clean maintainability.',
    capabilities: [
      'Next.js, React, TypeScript, Tailwind CSS',
      'High-performance Node.js & Go backends',
      'Reactive state management & snappy offline-first architectures',
      'API design (GraphQL, REST, gRPC)'
    ],
    deliverables: 'Production web app, mobile builds, complete source code & automated tests'
  },
  {
    id: 'ai-agents',
    icon: '🧠',
    title: 'Custom AI & Intelligent Automation',
    badge: 'High Demand',
    description: 'We design and deploy practical AI solutions—from multi-agent workflows and enterprise RAG to custom model integration.',
    capabilities: [
      'Autonomous agent systems & decision pipelines',
      'Domain-specific RAG (Retrieval-Augmented Generation)',
      'LLM fine-tuning & prompt evaluation frameworks',
      'Vector databases, semantic caching & cost optimization'
    ],
    deliverables: 'Operational AI agents, secured API endpoints & reasoning benchmark reports'
  },
  {
    id: 'cloud-devops',
    icon: '☁️',
    title: 'Cloud Infrastructure & Scalable Backends',
    badge: 'Enterprise Grade',
    description: 'Resilient cloud foundations engineered to handle traffic spikes, ensure 99.99% uptime, and optimize cloud infrastructure costs.',
    capabilities: [
      'AWS, GCP, and Cloudflare distributed deployments',
      'Docker, Kubernetes, Terraform IaC automation',
      'Zero-downtime CI/CD deployment pipelines',
      'Database clustering, sharding & Redis caching'
    ],
    deliverables: 'Terraform blueprints, auto-scaling clusters & observability dashboards'
  },
  {
    id: 'mvp-sprint',
    icon: '🚀',
    title: '0-to-1 Rapid MVP Sprints',
    badge: 'Time-to-Market',
    description: 'Turn your product vision into a tested, market-ready software product in 3 to 6 weeks. Zero fluff, pure execution.',
    capabilities: [
      'Interactive Figma UI/UX prototyping & design system',
      'Rapid full-stack build with production authentication & billing',
      'Analytics, user telemetry & feedback capture integration',
      'App Store / Play Store / Cloud production launch'
    ],
    deliverables: 'Fully functional, deployed production MVP ready for customer acquisition'
  },
  {
    id: 'architecture-audit',
    icon: '🔍',
    title: 'Architecture Review & Code Refactoring',
    badge: 'Optimization',
    description: 'Identify performance bottlenecks, eliminate technical debt, and modernize legacy codebases for sustained engineering velocity.',
    capabilities: [
      'Deep architectural audit & performance bottleneck profiling',
      'Database query optimization & latency reduction',
      'Codebase migration to modern TypeScript/Node stacks',
      'Automated testing suites & code quality gates'
    ],
    deliverables: 'Comprehensive audit dossier, actionable PRs & measurable performance gains'
  },
  {
    id: 'squad-contracting',
    icon: '👥',
    title: 'Embedded Contractor Engineering Squads',
    badge: 'Flexible Staffing',
    description: 'Plug-and-play autonomous engineering pods that seamlessly integrate with your product roadmap and ship milestones.',
    capabilities: [
      'Senior Lead Architect + 2-4 senior full-stack engineers',
      'Direct asynchronous collaboration via Slack/Discord & GitHub',
      'Weekly demo cycles & continuous delivery',
      'Flexible sprint-based or monthly contracts'
    ],
    deliverables: 'Dedicated engineering bandwidth executing directly on your Jira/Linear tickets'
  }
];

export const ServicesGrid: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-28 lg:py-32 px-5 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
        <span className="text-xs uppercase tracking-widest text-white/60 font-sans border border-white/10 px-3 py-1 rounded-full bg-white/5">
          Engineering Services
        </span>
        <h2 className="text-[clamp(1.9rem,3.8vw,3.5rem)] font-instrument-serif mt-5 text-white leading-[1.1]">
          Full-Cycle Software Services & Bespoke Engineering
        </h2>
        <p className="text-white/70 text-[clamp(0.95rem,1.05vw,1.075rem)] mt-5 font-sans leading-relaxed">
          From rapid MVPs to high-scale platforms, Kavirox delivers comprehensive engineering services. We build what your business needs, backed by senior contractors and vetted freelance specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="group rounded-2xl bg-white/[0.02] border border-white/10 p-8 hover:border-white/20 transition-all hover:bg-white/[0.04] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{service.icon}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/80 font-sans">
                  {service.badge}
                </span>
              </div>
              <h3 className="text-2xl font-instrument-serif text-white mb-3 group-hover:text-white/95 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-white/70 font-sans leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="space-y-2 mb-6">
                <p className="text-xs uppercase tracking-wider font-semibold text-white/40">Core Capabilities</p>
                {service.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-white/75 font-sans">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-[11px] text-white/50 font-sans mb-4">
                <strong className="text-white/70">Typical Deliverable:</strong> {service.deliverables}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-emerald-400 transition-colors font-sans"
              >
                Inquire About Service <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
