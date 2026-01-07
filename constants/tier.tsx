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
    priceMonthly: "Standard Rate",
    priceYearly: "Standard Rate",
    description: "Flexible month-to-month. Cancel anytime.",
    features: [
      "Full system setup and configuration",
      "AI training on your services",
      "CRM and calendar integrations",
      "24/7 call handling",
      "Ongoing support and optimization",
      "Cancel anytime—we're confident you'll stay",
    ],
    featured: false,
    cta: "Get Started",
    onClick: () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/contact';
      }
    },
    footnote: "Great for trying out ACAI with full flexibility.",
  },
  {
    name: "6-Month Plan",
    id: "tier-monthly",
    href: "/contact",
    priceMonthly: "Save 20%",
    priceYearly: "Save 20%",
    description: "Best value. Still cancel anytime.",
    features: [
      "Everything in 3-Month Plan",
      "Save 20% on monthly costs",
      "Priority support and updates",
      "Advanced optimization",
      "Preferred implementation timeline",
      "Cancel anytime—no penalties",
    ],
    featuresMonthly: [
      "Everything in 3-Month Plan",
      "Save 20% on monthly costs",
      "Priority support and updates",
      "Advanced optimization",
      "Preferred implementation timeline",
      "Cancel anytime—no penalties",
    ],
    featuresYearly: [
      "Everything in 3-Month Plan",
      "Save 20% on monthly costs",
      "Priority support and updates",
      "Advanced optimization",
      "Preferred implementation timeline",
      "Cancel anytime—no penalties",
    ],
    featured: true,
    cta: "Get Started",
    onClick: () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/contact';
      }
    },
    footnote: "Most popular choice for businesses serious about growth.",
    yearlyNote: "Recommended for maximum savings. We're so confident in the results, you can still cancel anytime.",
    yearlyBenefits: "Save 20% compared to 3-Month Plan, plus priority support and faster setup.",
  },
];
