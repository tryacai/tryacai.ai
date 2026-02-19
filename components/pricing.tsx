"use client";
import { IconCircleCheckFilled, IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Link } from "next-view-transitions";
import { getIndustryPricing, pricingConfig, tierMeta, tierOrder } from "@/constants/pricing-config";

export function Pricing() {
  const [selectedIndustry, setSelectedIndustry] = useState(
    pricingConfig.defaultIndustryKey
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const industry = getIndustryPricing(selectedIndustry);
  const tiers = tierOrder.map((tierKey) => ({
    tierKey,
    tier: industry.tiers[tierKey],
    meta: tierMeta[tierKey],
  }));

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center mb-12">
        {/* Industry Dropdown */}
        <div className="relative mb-8">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-semibold hover:border-neutral-500 transition-all duration-200 min-w-[280px] justify-between"
          >
            <span>{industry.label}</span>
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
                {pricingConfig.industries.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setSelectedIndustry(item.key);
                      setIsDropdownOpen(false);
                    }}
                    className={cn(
                      "w-full px-6 py-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                      selectedIndustry === item.key ? "bg-neutral-100 dark:bg-neutral-800 font-semibold" : ""
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center max-w-2xl mb-2">
          Showing pricing for <span className="font-semibold text-neutral-900 dark:text-white">{industry.label}</span>
        </p>
        
        <p className="text-xs text-neutral-500 dark:text-neutral-500 text-center italic max-w-2xl">
          Pricing reflects call volume and automation complexity.
        </p>
      </div>

      <div className="mx-auto max-w-6xl mb-6">
        <div className="rounded-2xl border border-amber-200/70 dark:border-amber-300/20 bg-amber-50/80 dark:bg-amber-500/10 px-5 py-4 text-center">
          <p className="text-sm md:text-base font-semibold text-amber-900 dark:text-amber-100">
            All plans include a 14-day Proof of Value Pilot. No card required.
          </p>
          <p className="mt-1 text-xs md:text-sm text-amber-800/90 dark:text-amber-100/80">
            We set it up, run it live, and show results before you commit.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-8 grid relative z-20 grid-cols-1 gap-6 items-stretch md:grid-cols-3 max-w-6xl">
        {tiers.map(({ tier, meta }, tierIdx) => {
          return (
            <motion.div
              key={meta.label}
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
                    {meta.label}
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
                      Price per month
                    </p>
                    <p className={cn(
                      tierIdx === 1 ? "text-white" : "text-neutral-900 dark:text-white",
                      "text-2xl font-bold"
                    )}>
                      ${tier.price}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <p className={cn(
                      tierIdx === 1 ? "text-neutral-400" : "text-neutral-600 dark:text-neutral-400",
                      "text-sm font-semibold mb-1"
                    )}>
                      Included calls per month
                    </p>
                    <p className={cn(
                      tierIdx === 1 ? "text-neutral-300" : "text-neutral-700 dark:text-neutral-300",
                      "text-lg font-semibold"
                    )}>
                      {tier.calls} ({tier.minutesRange})
                    </p>
                    <p className={cn(
                      tierIdx === 1 ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-500",
                      "text-xs italic mt-1"
                    )}>
                      Overage per additional AI minute: ${tier.overagePerMin}
                    </p>
                  </div>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6 mb-6">
                  <p className={cn(
                    tierIdx === 1 ? "text-white" : "text-neutral-900 dark:text-white",
                    "font-semibold mb-4"
                  )}>
                    What&apos;s Included
                  </p>
                  <ul className="space-y-3">
                    {tier.bullets.map((feature) => (
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
