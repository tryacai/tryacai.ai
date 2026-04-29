"use client";

import { IconChevronDown, IconCircleCheckFilled } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "next-view-transitions";

import { Button } from "./button";
import { cn } from "@/lib/utils";
import { getIndustryPricing, pricingConfig, tierOrder } from "@/constants/pricing-config";

export function Pricing() {
  const [selectedIndustry, setSelectedIndustry] = useState(
    pricingConfig.defaultIndustryKey
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const industry = useMemo(
    () => getIndustryPricing(selectedIndustry),
    [selectedIndustry]
  );

  const tiers = tierOrder.map((tierKey) => industry.tiers[tierKey]);

  return (
    <div className="relative w-full">
      <div className="mb-12 flex flex-col items-center justify-center">
        <div className="relative mb-8">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex min-w-[280px] items-center justify-between gap-3 rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-900 transition-all duration-200 hover:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          >
            <span>{industry.label}</span>
            <IconChevronDown
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                isDropdownOpen ? "rotate-180" : ""
              )}
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-2xl border border-neutral-300 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
              >
                {pricingConfig.industries.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setSelectedIndustry(item.key);
                      setIsDropdownOpen(false);
                    }}
                    className={cn(
                      "w-full px-6 py-3 text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800",
                      selectedIndustry === item.key
                        ? "bg-neutral-100 font-semibold dark:bg-neutral-800"
                        : ""
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <h2 className="text-center text-2xl font-semibold text-neutral-900 dark:text-white md:text-3xl">
          {industry.headline}
        </h2>
        <p className="mt-2 max-w-3xl text-center text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
          {industry.subheadline}
        </p>
        <p className="mt-2 text-center text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {industry.positioningText}
        </p>
      </div>

      <div className="relative z-20 mx-auto mt-8 grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-3">
        {tiers.map((tier, tierIdx) => {
          const isPopular = Boolean(tier.isPopular);
          const isPremium = Boolean(tier.isPremium);

          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: tierIdx * 0.08 }}
              className={cn(
                "group relative h-full overflow-hidden rounded-2xl px-6 py-8 transition-transform duration-300",
                isPremium
                  ? "border border-amber-300/60 bg-neutral-900 shadow-2xl ring-1 ring-amber-300/40 hover:scale-[1.015]"
                  : isPopular
                  ? "border border-neutral-700 bg-neutral-900"
                  : "border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
              )}
            >
              {isPremium && (
                <div className="pointer-events-none absolute inset-0 rounded-2xl p-[1px]">
                  <div className="h-full w-full rounded-2xl bg-gradient-to-r from-amber-200/30 via-yellow-200/50 to-amber-200/30" />
                </div>
              )}

              {isPremium && !prefersReducedMotion && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-[-35%] w-[30%] bg-gradient-to-r from-transparent via-amber-100/25 to-transparent"
                  initial={{ x: "-120%" }}
                  animate={{ x: ["-120%", "420%"] }}
                  transition={{
                    duration: 1.1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 4.9,
                  }}
                />
              )}

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {tier.name}
                    </h3>
                    {tier.badge && (
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                          isPremium
                            ? "border border-amber-300/60 bg-amber-300/20 text-amber-100"
                            : "bg-white/20 text-white"
                        )}
                      >
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {tier.price}
                  </p>
                  <p className="mt-2 text-sm font-medium text-neutral-600 dark:text-neutral-300">
                    {tier.bestFor}
                  </p>

                  <div className="mb-6 mt-6 border-t border-neutral-200 pt-6 dark:border-neutral-700">
                    <p className="mb-4 font-semibold text-neutral-900 dark:text-white">
                      What&apos;s Included
                    </p>
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-x-3">
                          <IconCircleCheckFilled
                            className={cn(
                              "mt-0.5 h-5 w-5 flex-none",
                              isPremium
                                ? "text-amber-200"
                                : isPopular
                                ? "text-white"
                                : "text-purple-500"
                            )}
                          />
                          <span
                            className={cn(
                              "text-sm leading-6",
                              isPremium
                                ? "text-amber-50/90"
                                : isPopular
                                ? "text-neutral-200"
                                : "text-neutral-600 dark:text-neutral-300"
                            )}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    as={Link}
                    href={tier.learnMoreHref}
                    variant="simple"
                    className={cn(
                      "w-full rounded-full text-center",
                      isPremium || isPopular
                        ? "border-white/30 text-white hover:border-white"
                        : ""
                    )}
                  >
                    Learn More
                  </Button>
                  <Button
                    as={Link}
                    href="/contact"
                    className={cn(
                      "w-full rounded-full text-center",
                      isPremium || isPopular
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-neutral-900 dark:bg-white dark:text-black"
                    )}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
