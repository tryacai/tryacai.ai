export type Tier = {
  name: string;
  id: string;
  href: string;
  priceMonthly: string;
  priceYearly: string;
  description: string;
  features: string[];
  featuresMonthly?: string[];
  featuresYearly?: string[];
  featured: boolean;
  cta: string;
  onClick: () => void;
  footnote?: string;
  yearlyNote?: string;
  yearlyBenefits?: string;
};

export const tiers: Tier[] = [
  {
    name: "One-Time Startup Fee",
    id: "tier-setup",
    href: "/contact",
    priceMonthly: "Custom Pricing",
    priceYearly: "Custom Pricing",
    description: "Based on your business needs and call volume.",
    features: [
      "Full system setup and AI training",
      "Custom workflow based on your services",
      "CRM and calendar integrations",
      "Call routing and automation setup",
      "Testing and deployment",
      "Done-for-you implementation",
    ],
    featuresMonthly: [
      "Full system setup and AI training",
      "Custom workflow based on your services",
      "CRM and calendar integrations",
      "Call routing and automation setup",
      "Testing and deployment",
      "Done-for-you implementation",
    ],
    featuresYearly: [
      "Full system setup and AI training",
      "Custom workflow based on your services",
      "CRM and calendar integrations",
      "Call routing and automation setup",
      "Testing and deployment",
      "Done-for-you implementation",
    ],
    featured: false,
    cta: "Get Started",
    onClick: () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/contact';
      }
    },
    footnote: "One-time investment to get you up and running.",
  },
  {
    name: "3-Month Retainer",
    id: "tier-3month-retainer",
    href: "/contact",
    priceMonthly: "Standard Rate",
    priceYearly: "Standard Rate",
    description: "Monthly maintenance and support. Cancel anytime.",
    features: [
      "24/7 AI call handling and management",
      "System monitoring and maintenance",
      "Ongoing optimizations and updates",
      "Performance tracking and reporting",
      "Technical support",
      "Cancel anytime—no long-term commitment",
    ],
    featuresMonthly: [
      "24/7 AI call handling and management",
      "System monitoring and maintenance",
      "Ongoing optimizations and updates",
      "Performance tracking and reporting",
      "Technical support",
      "Cancel anytime—no long-term commitment",
    ],
    featuresYearly: [
      "24/7 AI call handling and management",
      "System monitoring and maintenance",
      "Ongoing optimizations and updates",
      "Performance tracking and reporting",
      "Technical support",
      "Priority support and advanced features",
    ],
    featured: false,
    cta: "Get Started",
    onClick: () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/contact';
      }
    },
    footnote: "Standard monthly rate. Flexible and cancelable anytime.",
    yearlyNote: "Includes priority support and advanced optimization features.",
  },
  {
    name: "6-Month Retainer",
    id: "tier-6month-retainer",
    href: "/contact",
    priceMonthly: "Save 20%",
    priceYearly: "Save 20%",
    description: "Save 20% on monthly maintenance costs. Cancel anytime.",
    features: [
      "24/7 AI call handling and management",
      "System monitoring and maintenance",
      "Ongoing optimizations and updates",
      "Performance tracking and reporting",
      "Priority technical support",
      "Advanced automation features",
      "Save 20% on monthly fees",
      "Cancel anytime—we're confident you'll stay",
    ],
    featuresMonthly: [
      "24/7 AI call handling and management",
      "System monitoring and maintenance",
      "Ongoing optimizations and updates",
      "Performance tracking and reporting",
      "Priority technical support",
      "Advanced automation features",
      "Save 20% on monthly fees",
      "Cancel anytime—we're confident you'll stay",
    ],
    featuresYearly: [
      "24/7 AI call handling and management",
      "System monitoring and maintenance",
      "Ongoing optimizations and updates",
      "Performance tracking and reporting",
      "Priority technical support",
      "Advanced automation features",
      "Save 20% on monthly fees",
      "Cancel anytime—we're confident you'll stay",
    ],
    featured: true,
    cta: "Get Started",
    onClick: () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/contact';
      }
    },
    footnote: "Best value. Save 20% with 6-month commitment.",
    yearlyNote: "Save 20% compared to standard monthly rate. Best value with full flexibility—cancel anytime.",
    yearlyBenefits: "Save 20% on ongoing costs with priority support and advanced features.",
  },
];
