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

export const industryConfig: Record<string, IndustryPricingConfig> = {
  barbers: {
    key: "barbers",
    label: "Barbers",
    headline: "Barber Pricing Built to Grow With Your Shop",
    subheadline:
      "From solo operators to multi-location brands, pick the tier that matches your chair count and call volume.",
    positioningText: "Built to scale beyond basic booking tools.",
    tiers: {
      basic: {
        name: "BASIC",
        price: "$49/month",
        bestFor: "Best for Solo & 1–2 Chair Barbers",
        learnMoreHref: "/barbers#basic",
        features: [
          "AI answers calls 24/7",
          "Sends Booksy link automatically",
          "Missed caller auto-text",
          "After-hours coverage",
          "Simple monthly call summary",
          "60 AI minutes included",
        ],
      },
      growth: {
        name: "GROWTH",
        price: "$197/month",
        bestFor: "Best for 2–5 Chair Shops",
        badge: "Most Popular",
        isPopular: true,
        learnMoreHref: "/barbers#growth",
        features: [
          "Everything in Basic",
          "21-day automatic rebooking texts",
          "Appointment reminder texts",
          "Automated review requests",
          "Multi-service booking logic",
          "Light AI script customization",
          "Booking analytics dashboard",
          "150 AI minutes included",
        ],
      },
      enterprise: {
        name: "ENTERPRISE",
        price: "Starting at $799/month",
        bestFor: "Best for 5+ Chairs & Multi-Location Shops",
        badge: "PREMIUM",
        isPremium: true,
        learnMoreHref: "/barbers#enterprise",
        features: [
          "Everything in Growth",
          "Multi-barber intelligent routing",
          "Multi-location call routing",
          "VIP priority handling",
          "Advanced analytics dashboard",
          "Peak call insights",
          "No-show tracking",
          "Custom AI voice personalization",
          "Dedicated onboarding",
          "Monthly optimization session",
          "Custom workflow builds",
          "Priority support",
          "300+ AI minutes included",
        ],
      },
    },
  },
  "plumbing-hvac": {
    key: "plumbing-hvac",
    label: "Plumbing & HVAC",
    headline: "Service-Call Pricing for Plumbing & HVAC Teams",
    subheadline:
      "Capture urgent calls faster, route jobs accurately, and automate follow-up as your dispatch volume grows.",
    positioningText: "Built to scale beyond basic booking tools.",
    tiers: {
      basic: {
        name: "BASIC",
        price: "$299/month",
        bestFor: "Best for owner-operator teams",
        learnMoreHref: "/plumbing#basic",
        features: [
          "24/7 inbound call answering",
          "Urgency-based call qualification",
          "Missed-call instant text back",
          "Calendar + dispatch handoff",
          "Basic service FAQ handling",
          "90 AI calls included",
        ],
      },
      growth: {
        name: "GROWTH",
        price: "$599/month",
        bestFor: "Best for growing field teams",
        badge: "Most Popular",
        isPopular: true,
        learnMoreHref: "/plumbing#growth",
        features: [
          "Everything in Basic",
          "Estimate follow-up automations",
          "Reminder and no-show prevention texts",
          "Review request automations",
          "Smart routing by service type",
          "220 AI calls included",
        ],
      },
      enterprise: {
        name: "ENTERPRISE",
        price: "Starting at $1299/month",
        bestFor: "Best for multi-crew, high-volume operators",
        badge: "PREMIUM",
        isPremium: true,
        learnMoreHref: "/plumbing#enterprise",
        features: [
          "Everything in Growth",
          "Multi-team dispatch routing",
          "Priority emergency call handling",
          "Advanced performance dashboards",
          "Custom automation workflows",
          "Priority support and optimization",
          "400+ AI calls included",
        ],
      },
    },
  },
  roofing: {
    key: "roofing",
    label: "Roofing",
    headline: "Roofing Intake and Follow-Up That Converts Faster",
    subheadline:
      "Respond first during storm spikes, keep estimates moving, and scale call handling across crews.",
    positioningText: "Built to scale beyond basic booking tools.",
    tiers: {
      basic: {
        name: "BASIC",
        price: "$249/month",
        bestFor: "Best for local roofing teams",
        learnMoreHref: "/roofing#basic",
        features: [
          "24/7 estimate-call capture",
          "Storm-lead prioritization",
          "Missed-call auto text-back",
          "Inspection booking intake",
          "Service FAQ handling",
          "80 AI calls included",
        ],
      },
      growth: {
        name: "GROWTH",
        price: "$499/month",
        bestFor: "Best for scaling roofing operations",
        badge: "Most Popular",
        isPopular: true,
        learnMoreHref: "/roofing#growth",
        features: [
          "Everything in Basic",
          "Automated estimate follow-up",
          "Review and reputation automations",
          "Multi-crew booking logic",
          "Lead status visibility dashboard",
          "180 AI calls included",
        ],
      },
      enterprise: {
        name: "ENTERPRISE",
        price: "Starting at $999/month",
        bestFor: "Best for regional and multi-location roofers",
        badge: "PREMIUM",
        isPremium: true,
        learnMoreHref: "/roofing#enterprise",
        features: [
          "Everything in Growth",
          "Advanced storm surge routing",
          "High-value lead prioritization",
          "Multi-location call orchestration",
          "Custom automation workflows",
          "Dedicated strategic support",
          "320+ AI calls included",
        ],
      },
    },
  },
  mechanics: {
    key: "mechanics",
    label: "Mechanics",
    headline: "Auto Shop Pricing for High-Intent Service Calls",
    subheadline:
      "Keep bays full with faster intake, fewer missed calls, and smarter follow-up automations.",
    positioningText: "Built to scale beyond basic booking tools.",
    tiers: {
      basic: {
        name: "BASIC",
        price: "$229/month",
        bestFor: "Best for single-location service shops",
        learnMoreHref: "/mechanics#basic",
        features: [
          "24/7 service-call answering",
          "Appointment intake + scheduling",
          "Missed-call recovery texts",
          "Vehicle issue pre-qualification",
          "Basic customer reminders",
          "90 AI calls included",
        ],
      },
      growth: {
        name: "GROWTH",
        price: "$449/month",
        bestFor: "Best for high-throughput shops",
        badge: "Most Popular",
        isPopular: true,
        learnMoreHref: "/mechanics#growth",
        features: [
          "Everything in Basic",
          "Service reminder sequences",
          "Review request automations",
          "Advisor handoff notes automation",
          "Booking analytics dashboard",
          "200 AI calls included",
        ],
      },
      enterprise: {
        name: "ENTERPRISE",
        price: "Starting at $899/month",
        bestFor: "Best for multi-bay, multi-advisor operations",
        badge: "PREMIUM",
        isPremium: true,
        learnMoreHref: "/mechanics#enterprise",
        features: [
          "Everything in Growth",
          "Priority routing for urgent jobs",
          "Multi-advisor call distribution",
          "Advanced performance dashboards",
          "Custom automation workflows",
          "Priority support",
          "350+ AI calls included",
        ],
      },
    },
  },
  detailing: {
    key: "detailing",
    label: "Detailing",
    headline: "Detailing Pricing Built for Better Booking Consistency",
    subheadline:
      "Capture every inquiry, automate reminders, and scale package bookings without front-desk overhead.",
    positioningText: "Built to scale beyond basic booking tools.",
    tiers: {
      basic: {
        name: "BASIC",
        price: "$149/month",
        bestFor: "Best for solo mobile/detail studios",
        learnMoreHref: "/detailing#basic",
        features: [
          "24/7 inbound call handling",
          "Package inquiry qualification",
          "Missed-call auto text-back",
          "Basic reminder texts",
          "Calendar booking handoff",
          "70 AI calls included",
        ],
      },
      growth: {
        name: "GROWTH",
        price: "$299/month",
        bestFor: "Best for growing detailing teams",
        badge: "Most Popular",
        isPopular: true,
        learnMoreHref: "/detailing#growth",
        features: [
          "Everything in Basic",
          "Upsell-aware booking logic",
          "Review request automations",
          "Rebooking reminder flows",
          "Booking insights dashboard",
          "160 AI calls included",
        ],
      },
      enterprise: {
        name: "ENTERPRISE",
        price: "Starting at $699/month",
        bestFor: "Best for high-volume and multi-team operations",
        badge: "PREMIUM",
        isPremium: true,
        learnMoreHref: "/detailing#enterprise",
        features: [
          "Everything in Growth",
          "Multi-team call routing",
          "Priority lead handling",
          "Advanced automation workflows",
          "Dedicated onboarding + optimization",
          "300+ AI calls included",
        ],
      },
    },
  },
  cleaning: {
    key: "cleaning",
    label: "Cleaning",
    headline: "Cleaning Business Pricing for Reliable Lead Capture",
    subheadline:
      "Handle inbound quotes day and night, automate recurring follow-up, and keep schedules full as you scale.",
    positioningText: "Built to scale beyond basic booking tools.",
    tiers: {
      basic: {
        name: "BASIC",
        price: "$149/month",
        bestFor: "Best for solo and small cleaning crews",
        learnMoreHref: "/cleaning#basic",
        features: [
          "24/7 call answering",
          "Quote inquiry qualification",
          "Missed-call auto text-back",
          "Recurring booking support",
          "Monthly call summary",
          "70 AI calls included",
        ],
      },
      growth: {
        name: "GROWTH",
        price: "$297/month",
        bestFor: "Best for growing recurring-service teams",
        badge: "Most Popular",
        isPopular: true,
        learnMoreHref: "/cleaning#growth",
        features: [
          "Everything in Basic",
          "Follow-up text automation",
          "Reminder and no-show prevention",
          "Review request automation",
          "Booking analytics dashboard",
          "170 AI calls included",
        ],
      },
      enterprise: {
        name: "ENTERPRISE",
        price: "Starting at $699/month",
        bestFor: "Best for multi-team cleaning operations",
        badge: "PREMIUM",
        isPremium: true,
        learnMoreHref: "/cleaning#enterprise",
        features: [
          "Everything in Growth",
          "Multi-crew intelligent routing",
          "Priority repeat-client handling",
          "Advanced analytics + insights",
          "Custom workflow automations",
          "Priority support",
          "320+ AI calls included",
        ],
      },
    },
  },
  electricians: {
    key: "electricians",
    label: "Electricians",
    headline: "Electrician Pricing for Faster Dispatch and Better Conversion",
    subheadline:
      "Prioritize urgent requests, automate callbacks, and scale call operations for high-intent service demand.",
    positioningText: "Built to scale beyond basic booking tools.",
    tiers: {
      basic: {
        name: "BASIC",
        price: "$249/month",
        bestFor: "Best for local electrical contractors",
        learnMoreHref: "/electricians#basic",
        features: [
          "24/7 inbound call answering",
          "Urgency-based lead triage",
          "Missed-call instant text-back",
          "Job-ready intake notes",
          "Basic scheduling handoff",
          "90 AI calls included",
        ],
      },
      growth: {
        name: "GROWTH",
        price: "$497/month",
        bestFor: "Best for expanding electrical teams",
        badge: "Most Popular",
        isPopular: true,
        learnMoreHref: "/electricians#growth",
        features: [
          "Everything in Basic",
          "Quote follow-up automations",
          "Reminder and review automations",
          "Service-type routing logic",
          "Performance dashboard",
          "210 AI calls included",
        ],
      },
      enterprise: {
        name: "ENTERPRISE",
        price: "Starting at $899/month",
        bestFor: "Best for multi-crew and multi-location operators",
        badge: "PREMIUM",
        isPremium: true,
        learnMoreHref: "/electricians#enterprise",
        features: [
          "Everything in Growth",
          "Advanced emergency-call prioritization",
          "Multi-crew intelligent routing",
          "Advanced analytics and peak-time insights",
          "Custom workflow automations",
          "Priority support",
          "380+ AI calls included",
        ],
      },
    },
  },
};

export const pricingConfig = {
  defaultIndustryKey: "barbers",
  industries: [
    { key: "barbers", label: "Barbers" },
    { key: "plumbing-hvac", label: "Plumbing & HVAC" },
    { key: "roofing", label: "Roofing" },
    { key: "mechanics", label: "Mechanics" },
    { key: "detailing", label: "Detailing" },
    { key: "cleaning", label: "Cleaning" },
    { key: "electricians", label: "Electricians" },
  ],
};

export const getIndustryPricing = (industryKey: string): IndustryPricingConfig => {
  return (
    industryConfig[industryKey] ??
    industryConfig[pricingConfig.defaultIndustryKey]
  );
};
