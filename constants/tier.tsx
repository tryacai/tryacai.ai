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
    name: "3-Month Plan",
    id: "tier-setup",
    href: "/contact",
    priceMonthly: "Startup Fee",
    priceYearly: "Startup Fee",
    description: "Custom fee based on call volume. Cancel anytime.",
    features: [
      "Full system setup and AI training",
      "Custom workflow based on your services",
      "CRM and calendar integrations",
      "24/7 call handling",
      "Ongoing support and optimization",
      "Cancel anytime—no long-term commitment",
    ],
    featured: false,
    cta: "Get Started",
    onClick: () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/contact';
      }
    },
    footnote: "Standard rate. Flexible and cancelable anytime.",
  },
  {
    name: "6-Month Plan",
    id: "tier-monthly",
    href: "/contact",
    priceMonthly: "Startup Fee",
    priceYearly: "Startup Fee",
    description: "Custom fee based on call volume. Save 20%. Cancel anytime.",
    features: [
      "Full system setup and AI training",
      "Custom workflow based on your services",
      "CRM and calendar integrations",
      "24/7 call handling",
      "Save 20% on ongoing costs",
      "Priority support and faster setup",
      "Cancel anytime—we're confident you'll stay",
    ],
    featuresMonthly: [
      "Full system setup and AI training",
      "Custom workflow based on your services",
      "CRM and calendar integrations",
      "24/7 call handling",
      "Save 20% on ongoing costs",
      "Priority support and faster setup",
      "Cancel anytime—we're confident you'll stay",
    ],
    featuresYearly: [
      "Full system setup and AI training",
      "Custom workflow based on your services",
      "CRM and calendar integrations",
      "24/7 call handling",
      "Save 20% on ongoing costs",
      "Priority support and faster setup",
      "Cancel anytime—we're confident you'll stay",
    ],
    featured: true,
    cta: "Get Started",
    onClick: () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/contact';
      }
    },
    footnote: "Best value. Most popular choice for growing businesses.",
    yearlyNote: "Save 20% compared to 3-Month Plan. Best value with full flexibility—cancel anytime.",
    yearlyBenefits: "Save 20% with priority support, faster setup, and advanced optimization.",
  },
];
