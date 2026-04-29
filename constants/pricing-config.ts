export type TierKey = "basic" | "growth" | "enterprise";

export type TierConfig = {
  name: string;
  price: string;
  bestFor: string;
  features: string[];
  learnMoreHref: string;
  badge?: string;
  isPopular?: boolean;
  isPremium?: boolean;
};

export type IndustryPricingConfig = {
  key: string;
  label: string;
  headline: string;
  subheadline: string;
  positioningText: string;
  tiers: Record<TierKey, TierConfig>;
};

export const tierOrder: TierKey[] = ["basic", "growth", "enterprise"];

function buildContractorTiers(learnMoreBase: string): Record<TierKey, TierConfig> {
  return {
    basic: {
      name: "BASIC",
      price: "$299/month",
      bestFor: "Best for owner-operator teams",
      learnMoreHref: `${learnMoreBase}#basic`,
      features: [
        "24/7 call handling",
        "Missed call recovery text-back",
        "CRM logging with call notes",
        "Service booking handoff",
        "After-hours overflow coverage",
      ],
    },
    growth: {
      name: "GROWTH",
      price: "$599/month",
      bestFor: "Best for growing field teams",
      badge: "Most Popular",
      isPopular: true,
      learnMoreHref: `${learnMoreBase}#growth`,
      features: [
        "Everything in Basic",
        "Emergency routing by urgency",
        "Dispatch integration workflow",
        "Missed call recovery sequences",
        "CRM logging with tagged outcomes",
      ],
    },
    enterprise: {
      name: "ENTERPRISE",
      price: "Starting at $1299/month",
      bestFor: "Best for high-volume multi-crew operators",
      badge: "PREMIUM",
      isPremium: true,
      learnMoreHref: `${learnMoreBase}#enterprise`,
      features: [
        "Everything in Growth",
        "Priority emergency routing with escalation",
        "Advanced dispatch integration paths",
        "Multi-line missed call recovery",
        "Deep CRM logging and reporting",
      ],
    },
  };
}

export const industryConfig: Record<string, IndustryPricingConfig> = {
  plumbing: {
    key: "plumbing",
    label: "Plumbing",
    headline: "Plumbing Pricing Built for Reliable Call Coverage",
    subheadline:
      "Capture emergency calls, qualify jobs quickly, and keep your board full with consistent follow-up.",
    positioningText: "Built for plumbing and mechanical service workflows.",
    tiers: buildContractorTiers("/plumbing"),
  },
  hvac: {
    key: "hvac",
    label: "HVAC",
    headline: "HVAC Pricing Built for Seasonal Call Surges",
    subheadline:
      "Handle urgent breakdown calls, route by urgency, and convert more inbound service opportunities.",
    positioningText: "Built for plumbing and mechanical service workflows.",
    tiers: buildContractorTiers("/hvac"),
  },
  "sewer-drain": {
    key: "sewer-drain",
    label: "Sewer & Drain",
    headline: "Sewer & Drain Pricing for Fast Emergency Response",
    subheadline:
      "Route backup emergencies immediately, recover missed callers, and keep dispatch informed in real time.",
    positioningText: "Built for plumbing and mechanical service workflows.",
    tiers: buildContractorTiers("/sewer-drain"),
  },
  septic: {
    key: "septic",
    label: "Septic",
    headline: "Septic Service Pricing for Better Intake and Routing",
    subheadline:
      "Answer every urgent septic call, book service faster, and keep records synced for your office team.",
    positioningText: "Built for plumbing and mechanical service workflows.",
    tiers: buildContractorTiers("/septic"),
  },
  "water-heater": {
    key: "water-heater",
    label: "Water Heater Services",
    headline: "Water Heater Pricing for High-Intent Service Calls",
    subheadline:
      "Convert no-hot-water emergencies into booked jobs with better call handling and tighter dispatch flow.",
    positioningText: "Built for plumbing and mechanical service workflows.",
    tiers: buildContractorTiers("/water-heater"),
  },
  "residential-plumbing": {
    key: "residential-plumbing",
    label: "Residential Plumbing",
    headline: "Residential Plumbing Pricing for Daily Service Demand",
    subheadline:
      "Book more homeowner calls, recover missed leads, and route urgent jobs without office bottlenecks.",
    positioningText: "Built for plumbing and mechanical service workflows.",
    tiers: buildContractorTiers("/residential-plumbing"),
  },
  "commercial-plumbing": {
    key: "commercial-plumbing",
    label: "Commercial Plumbing",
    headline: "Commercial Plumbing Pricing for Complex Dispatch Needs",
    subheadline:
      "Handle larger inbound call volume, prioritize emergency issues, and keep CRM records clean across teams.",
    positioningText: "Built for plumbing and mechanical service workflows.",
    tiers: buildContractorTiers("/commercial-plumbing"),
  },
};

export const pricingConfig = {
  defaultIndustryKey: "plumbing",
  industries: [
    { key: "plumbing", label: "Plumbing" },
    { key: "hvac", label: "HVAC" },
    { key: "sewer-drain", label: "Sewer & Drain" },
    { key: "septic", label: "Septic" },
    { key: "water-heater", label: "Water Heater Services" },
    { key: "residential-plumbing", label: "Residential Plumbing" },
    { key: "commercial-plumbing", label: "Commercial Plumbing" },
  ],
};

export const getIndustryPricing = (industryKey: string): IndustryPricingConfig => {
  return industryConfig[industryKey] ?? industryConfig[pricingConfig.defaultIndustryKey];
};
