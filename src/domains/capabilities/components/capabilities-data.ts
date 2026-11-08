import React from 'react';
import {
  Compass,
  Layers,
  Code2,
  FileCheck,
  Rocket,
  Repeat,
} from 'lucide-react';

export interface TechCategory {
  title: string;
  badge: string;
  skills: string[];
}

export const techCategories: TechCategory[] = [
  {
    title: "Storefronts & Frontend",
    badge: "UI / UX",
    skills: ["Shopify Liquid", "Next.js", "React 19", "TypeScript", "Tailwind CSS", "Storefront API", "Vite"]
  },
  {
    title: "Conversational & Automation",
    badge: "Workflows",
    skills: ["WhatsApp Business API", "Meta Cloud API", "n8n", "Zapier", "Webhooks", "Node.js", "REST / GraphQL"]
  },
  {
    title: "Payments & Commerce Ops",
    badge: "Transactions",
    skills: ["Razorpay", "Cashfree", "UPI Deep-Linking", "COD Verification", "Logistics & Shipping APIs"]
  },
  {
    title: "AI & RAG Chatbots",
    badge: "Intelligence",
    skills: ["RAG Chatbots", "Brand Knowledge Bases", "Vector Search", "OpenAI APIs", "Google Analytics 4", "Meta CAPI", "Looker Studio"]
  },
  {
    title: "Security, Cloud & Health",
    badge: "Infrastructure",
    skills: ["OWASP Compliance", "SSL / TLS 1.3", "Access Governance", "CDN Caching", "Disaster Recovery", "Uptime SLAs"]
  }
];

export const deliverySteps = [
  {
    step: "01",
    title: "Understanding Your Needs",
    description: "We look at your current store, see where shoppers drop off, and find practical ways to improve your sales.",
    icon: Compass
  },
  {
    step: "02",
    title: "Design & Planning",
    description: "We design clean, easy-to-use shopping pages and map out the automations needed behind the scenes.",
    icon: Layers
  },
  {
    step: "03",
    title: "Clean Development",
    description: "We write fast, reliable code that looks great on mobile and connects directly with your tools.",
    icon: Code2
  },
  {
    step: "04",
    title: "Testing Everything",
    description: "We test every button, cart flow, and payment method so your customers never experience friction.",
    icon: FileCheck
  },
  {
    step: "05",
    title: "Smooth Launch",
    description: "We roll out your updates with zero downtime, making sure all orders and customer alerts work perfectly.",
    icon: Rocket
  },
  {
    step: "06",
    title: "Ongoing Support",
    description: "We keep checking your numbers, testing new ideas, and keeping your store fast and reliable every month.",
    icon: Repeat
  }
];

export const engagementModels = [
  {
    title: "Project-Based",
    type: "Clear Goals & Fixed Timeline",
    description: "Ideal for a specific project — like building a new store, a custom checkout flow, or launching a brand-trained RAG chatbot.",
    features: [
      "Fixed timeline and clear milestone dates",
      "Custom design and clean code built for your brand",
      "Full handover with easy-to-follow documentation",
      "Post-launch support and bug fixes included"
    ],
    badge: "Clear Scope"
  },
  {
    title: "Dedicated Team",
    type: "Your In-House Tech Partner",
    description: "A focused team of developers working closely with you every week to build, improve, and scale your digital store.",
    features: [
      "Dedicated developers for frontend, backend, automations, and RAG chatbots",
      "Direct chat on Slack or WhatsApp for quick daily answers",
      "Weekly updates and steady feature shipping",
      "Freedom to adjust priorities as your business grows"
    ],
    badge: "Most Popular",
    highlighted: true
  },
  {
    title: "Monthly Support",
    type: "Ongoing Maintenance & Growth",
    description: "Reliable monthly support to keep your store fast, fix issues quickly, run campaigns, and test new improvements.",
    features: [
      "Fast response whenever you need quick changes or fixes",
      "Ongoing tweaks to improve conversions and sales",
      "Hands-on help with WhatsApp and email workflows",
      "Regular health checks for speed and security"
    ],
    badge: "Continuous Care"
  }
];
