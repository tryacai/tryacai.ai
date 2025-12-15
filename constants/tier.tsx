export type Tier = {
  name: string;
  id: string;
  href: string;
  priceMonthly: string;
  priceYearly: string;
  description: string;
  features: string[];
  featured: boolean;
  cta: string;
  onClick: () => void;
  footnote?: string;
  yearlyNote?: string;
};

export const tiers: Tier[] = [
  {
    name: "Setup & Onboarding",
    id: "tier-setup",
    href: "#",
    priceMonthly: "$2,000 – $4,000",
    priceYearly: "$2,000 – $4,000",
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
    onClick: () => {},
    footnote: "Final setup cost depends on scope and complexity.",
  },
  {
    name: "Ongoing Management",
    id: "tier-monthly",
    href: "#",
    priceMonthly: "$400 – $600 / month",
    priceYearly: "$320 – $480 / month",
    description: "Monthly support",
    features: [
      "Monitoring and maintenance",
      "Ongoing system optimizations",
      "Workflow adjustments",
      "Performance tracking",
      "Support and troubleshooting",
    ],
    featured: true,
    cta: "Contact Us",
    onClick: () => {},
    footnote: "Pricing adjusts based on usage and services.",
    yearlyNote: "12-month commitment required. Priority support, expanded access, and preferred optimization cadence included.",
  },
];
