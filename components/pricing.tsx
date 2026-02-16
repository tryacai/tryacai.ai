"use client";
import { IconCircleCheckFilled, IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Link } from "next-view-transitions";

// Tier type definition
type Tier = {
  name: string;
  monthlyRange: string;
  onboardingRange: string;
  features: string[];
  note?: string;
};

const industries = [
  "Plumbing",
  "HVAC",
  "Barbers",
  "Roofing",
  "Mechanics",
  "Detailing",
  "Cleaning",
  "Electricians",
  "Landscaping",
  "Pest Control",
  "Med Spa",
  "Chiropractor",
];

// Industry-based pricing structure
const getPricingForIndustry = (industry: string): { tier1: Tier; tier2: Tier; tier3: Tier | null } => {
  const pricingData: Record<string, {
    tier1: { monthlyRange: string; onboardingRange: string };
    tier2Multiplier: number;
    tier3: { monthlyRange: string; onboardingRange: string } | null;
  }> = {
    Barbers: {
      tier1: {
        monthlyRange: "$79 - $149",
        onboardingRange: "$199 - $399",
      },
      tier2Multiplier: 1.5,
      tier3: null, // hidden for barbers
    },
    Detailing: {
      tier1: {
        monthlyRange: "$149 - $299",
        onboardingRange: "$399 - $699",
      },
      tier2Multiplier: 1.5,
      tier3: {
        monthlyRange: "$599 - $1,200",
        onboardingRange: "$1,000 - $2,000",
      },
    },
    Cleaning: {
      tier1: {
        monthlyRange: "$149 - $299",
        onboardingRange: "$399 - $699",
      },
      tier2Multiplier: 1.5,
      tier3: {
        monthlyRange: "$599 - $1,200",
        onboardingRange: "$1,000 - $2,000",
      },
    },
    Roofing: {
      tier1: {
        monthlyRange: "$199 - $399",
        onboardingRange: "$750 - $1,250",
      },
      tier2Multiplier: 1.5,
      tier3: {
        monthlyRange: "$1,500 - $3,000",
        onboardingRange: "$2,000 - $4,000",
      },
    },
    Plumbing: {
      tier1: {
        monthlyRange: "$299 - $599",
        onboardingRange: "$750 - $1,500",
      },
      tier2Multiplier: 1.5,
      tier3: {
        monthlyRange: "$1,500 - $4,000",
        onboardingRange: "$2,000 - $5,000",
      },
    },
    HVAC: {
      tier1: {
        monthlyRange: "$299 - $599",
        onboardingRange: "$750 - $1,500",
      },
      tier2Multiplier: 1.5,
      tier3: {
        monthlyRange: "$1,500 - $4,000",
        onboardingRange: "$2,000 - $5,000",
      },
    },
    Electricians: {
      tier1: {
        monthlyRange: "$299 - $599",
        onboardingRange: "$750 - $1,500",
      },
      tier2Multiplier: 1.5,
      tier3: {
        monthlyRange: "$1,500 - $4,000",
        onboardingRange: "$2,000 - $5,000",
      },
    },
    "Pest Control": {
      tier1: {
        monthlyRange: "$249 - $499",
        onboardingRange: "$750 - $1,250",
      },
      tier2Multiplier: 1.5,
      tier3: {
        monthlyRange: "$1,200 - $2,500",
        onboardingRange: "$1,500 - $3,000",
      },
    },
    Landscaping: {
      tier1: {
        monthlyRange: "$249 - $499",
        onboardingRange: "$750 - $1,250",
      },
      tier2Multiplier: 1.5,
      tier3: {
        monthlyRange: "$1,200 - $2,500",
        onboardingRange: "$1,500 - $3,000",
      },
    },
    Chiropractor: {
      tier1: {
        monthlyRange: "$399 - $799",
        onboardingRange: "$1,000 - $2,000",
      },
      tier2Multiplier: 1.5,
      tier3: {
        monthlyRange: "$1,800 - $3,500",
        onboardingRange: "$2,500 - $4,500",
      },
    },
    "Med Spa": {
      tier1: {
        monthlyRange: "$499 - $1,000",
        onboardingRange: "$1,500 - $3,000",
      },
      tier2Multiplier: 1.5,
      tier3: {
        monthlyRange: "$2,000 - $6,000",
        onboardingRange: "$3,000 - $7,000",
      },
    },
    Mechanics: {
      tier1: {
        monthlyRange: "$199 - $399",
        onboardingRange: "$500 - $1,000",
      },
      tier2Multiplier: 1.5,
      tier3: {
        monthlyRange: "$999 - $2,000",
        onboardingRange: "$1,500 - $3,000",
      },
    },
  };

  const data = pricingData[industry] || pricingData["Plumbing"];

  return {
    tier1: {
      name: "AI Receptionist",
      monthlyRange: data.tier1.monthlyRange,
      onboardingRange: data.tier1.onboardingRange,
      features: [
        "24/7 AI call answering",
        "Instant appointment scheduling",
        "Natural conversation AI",
        "Call summaries and logging",
        "Calendar integration",
      ],
    },
    tier2: {
      name: "Growth Automation",
      monthlyRange: data.tier1.monthlyRange,
      onboardingRange: data.tier1.onboardingRange,
      features: [
        "Everything in AI Receptionist",
        "Automated follow-up sequences",
        "Review generation automation",
        "Missed call text-back",
        "Customer re-engagement campaigns",
      ],
      note: "Price = Tier 1 + 40-60%",
    },
    tier3: data.tier3
      ? {
          name: "Full AI Infrastructure",
          monthlyRange: data.tier3.monthlyRange,
          onboardingRange: data.tier3.onboardingRange,
          features: [
            "Everything in previous tiers",
            "Intelligent quote routing",
            "Multi-location support",
            "Advanced CRM integration",
            "Custom workflow automation",
            "Priority support & strategy",
          ],
        }
      : null,
  };
};

export function Pricing() {
  const [selectedIndustry, setSelectedIndustry] = useState("Plumbing");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const pricing = getPricingForIndustry(selectedIndustry);
  const tiers: Tier[] = [pricing.tier1, pricing.tier2, pricing.tier3].filter((tier): tier is Tier => tier !== null);

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center mb-12">
        {/* Industry Dropdown */}
        <div className="relative mb-8">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-semibold hover:border-neutral-500 transition-all duration-200 min-w-[280px] justify-between"
          >
            <span>{selectedIndustry}</span>
            <IconChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto"
              >
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => {
                      setSelectedIndustry(industry);
                      setIsDropdownOpen(false);
                    }}
                    className={cn(
                      "w-full px-6 py-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                      selectedIndustry === industry ? "bg-neutral-100 dark:bg-neutral-800 font-semibold" : ""
                    )}
                  >
                    {industry}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center max-w-2xl mb-2">
          Showing pricing for <span className="font-semibold text-neutral-900 dark:text-white">{selectedIndustry}</span>
        </p>
        
        <p className="text-xs text-neutral-500 dark:text-neutral-500 text-center italic max-w-2xl">
          Pricing reflects call volume and automation complexity.
        </p>
      </div>

      <div className="mx-auto mt-8 grid relative z-20 grid-cols-1 gap-6 items-stretch md:grid-cols-3 max-w-6xl">
        {tiers.map((tier, tierIdx) => {
          if (!tier) return null;
          
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: tierIdx * 0.1 }}
              className={cn(
                tierIdx === 1
                  ? "relative bg-[radial-gradient(164.75%_100%_at_50%_0%,#4c1d95_0%,#0b0a0f_48.73%)] shadow-2xl shadow-[0_0_32px_6px_rgba(168,85,247,0.18),_0_0_22px_4px_rgba(236,72,153,0.16),_0_0_18px_3px_rgba(147,51,234,0.14)] ring-1 ring-white/5 md:scale-105"
                  : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
                "rounded-2xl px-6 py-8 h-full flex flex-col justify-between"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={cn(
                      tierIdx === 1
                        ? "text-white"
                        : "text-neutral-900 dark:text-white",
                      "text-xl font-bold"
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tierIdx === 1 && (
                    <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <div className="mb-4">
                    <p className={cn(
                      tierIdx === 1 ? "text-neutral-400" : "text-neutral-600 dark:text-neutral-400",
                      "text-sm font-semibold mb-1"
                    )}>
                      Monthly Investment
                    </p>
                    <p className={cn(
                      tierIdx === 1 ? "text-white" : "text-neutral-900 dark:text-white",
                      "text-2xl font-bold"
                    )}>
                      {tier.monthlyRange}
                    </p>
                    {tier.note && (
                      <p className={cn(
                        tierIdx === 1 ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-500",
                        "text-xs italic mt-1"
                      )}>
                        {tier.note}
                      </p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <p className={cn(
                      tierIdx === 1 ? "text-neutral-400" : "text-neutral-600 dark:text-neutral-400",
                      "text-sm font-semibold mb-1"
                    )}>
                      Onboarding
                    </p>
                    <p className={cn(
                      tierIdx === 1 ? "text-neutral-300" : "text-neutral-700 dark:text-neutral-300",
                      "text-lg font-semibold"
                    )}>
                      {tier.onboardingRange}
                    </p>
                  </div>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6 mb-6">
                  <p className={cn(
                    tierIdx === 1 ? "text-white" : "text-neutral-900 dark:text-white",
                    "font-semibold mb-4"
                  )}>
                    What's Included
                  </p>
                  <ul className="space-y-3">
                    {tier.features.map((feature: string) => (
                      <li key={feature} className="flex gap-x-3 items-start">
                        <IconCircleCheckFilled
                          className={cn(
                            tierIdx === 1
                              ? "text-white"
                              : "text-purple-500",
                            "h-5 w-5 flex-none mt-0.5"
                          )}
                        />
                        <span className={cn(
                          tierIdx === 1 ? "text-neutral-300" : "text-neutral-600 dark:text-neutral-300",
                          "text-sm leading-6"
                        )}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className={cn(
                  tierIdx === 1 ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-500",
                  "text-xs italic mb-4"
                )}>
                  Save 15% with 6-month commitment
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  as={Link}
                  href={`/solutions/${tierIdx === 0 ? 'ai-receptionist' : tierIdx === 1 ? 'automation-system' : 'full-infrastructure'}`}
                  variant="simple"
                  className={cn(
                    "w-full rounded-full text-center",
                    tierIdx === 1 ? "text-white border-white/30 hover:border-white" : ""
                  )}
                >
                  Learn More
                </Button>
                <Button
                  as={Link}
                  href="/contact"
                  className={cn(
                    "w-full rounded-full text-center",
                    tierIdx === 1
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-gradient-to-r from-[#ff1a1a] via-[#a100ff] to-[#004cff]"
                  )}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-8 max-w-2xl mx-auto">
        All pricing is customized based on your specific needs and call volume. 
        <Link href="/contact" className="text-purple-500 hover:text-purple-400 ml-1">
          Contact us for a detailed quote.
        </Link>
      </p>
    </div>
  );
}
