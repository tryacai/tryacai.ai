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
    name: "Setup & Onboarding",
    id: "tier-setup",
    href: "/contact",
    priceMonthly: "Starting at $2,000 (one-time)",
    priceYearly: "Starting at $2,000 (one-time)",
    description: "One-time investment",
    features: [
      "System design and automation architecture",
      "Custom workflow development",
      "CRM, phone, and platform integrations",
      "Call logic, routing, and failover handling",
      "Testing, optimization, and deployment",
      "Done-for-you implementation",
    ],
    featured: false,
    cta: "Get Started",
    onClick: () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/contact';
      }
    },
    footnote: "Final setup cost depends on scope and complexity.",
  },
  {
    name: "Ongoing Management",
    id: "tier-monthly",
    href: "/contact",
    priceMonthly: "Starting at $400 / month",
    priceYearly: "Starting at $320 / month",
    description: "12-month commitment required.",
    features: [
      "Monitoring and maintenance",
      "Ongoing system optimizations",
      "Workflow adjustments",
      "Performance tracking",
      "Support and troubleshooting",
    ],
    featuresMonthly: [
      "Monitoring and maintenance",
      "Ongoing system optimizations",
      "Workflow adjustments",
      "Performance tracking",
      "Support and troubleshooting",
      "3-month minimum commitment",
    ],
    featuresYearly: [
      "Monitoring and maintenance",
      "Ongoing system optimizations",
      "Workflow adjustments",
      "Performance tracking",
      "Support and troubleshooting",
      "Fee reevaluation at 6-month mark",
    ],
    featured: true,
    cta: "Get Started",
    onClick: () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/contact';
      }
    },
    footnote: "Pricing adjusts based on usage and services.",
    yearlyNote: "12-month commitment required. Priority support, expanded access, and preferred optimization cadence included.",
    yearlyBenefits: "Priority support, expanded access, and preferred optimization cadence included.",
  },
];
