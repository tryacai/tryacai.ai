"use client";
import { IconCircleCheckFilled, IconInfoCircle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { tiers } from "@/constants/tier";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./button";

export function Pricing() {
  const [active, setActive] = useState("yearly");
  const [showTooltip, setShowTooltip] = useState(false);
  const tabs = [
    { name: "Yearly", value: "yearly", badge: "Most Popular" },
    { name: "Monthly", value: "monthly" },
  ];

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 w-fit rounded-md overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={cn(
                "text-sm font-medium text-gray-500 dark:text-muted-dark p-4  rounded-md relative",
                active === tab.value ? " text-white dark:text-black" : "",
                tab.value === "yearly" ? "font-semibold" : ""
              )}
              onClick={() => setActive(tab.value)}
            >
              {active === tab.value && (
                <motion.span
                  layoutId="moving-div"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  className="absolute inset-0 bg-black dark:bg-white"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.name}
                {tab.badge && (
                  <span className="text-xs bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white px-2 py-0.5 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
          Save up to 20% with a yearly commitment
        </p>
        <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300 mt-4 text-center">
          Starting at $2,000, plus call volume and complexity of integrations.
        </p>
      </div>
      <div className="mx-auto mt-4 md:mt-20 grid relative z-20 grid-cols-1 gap-6 items-stretch md:grid-cols-2 max-w-5xl">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={cn(
              tier.featured
                ? "relative bg-[radial-gradient(164.75%_100%_at_50%_0%,#334155_0%,#0F172A_48.73%)]  shadow-2xl"
                : " bg-white dark:bg-black",
              "rounded-lg px-6 py-8 sm:mx-8 lg:mx-0  h-full flex flex-col justify-between"
            )}
          >
            <div className="">
              <div className="flex items-center gap-2">
                <h3
                  id={tier.id}
                  className={cn(
                    tier.featured
                      ? "text-white"
                      : "text-muted dark:text-muted-dark",
                    "text-base font-semibold leading-7"
                  )}
                >
                  {tier.name}
                </h3>
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip(!showTooltip)}
                    className={cn(
                      tier.featured ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-400",
                      "hover:opacity-80 transition-opacity flex items-center gap-1"
                    )}
                    aria-label="Pricing information"
                  >
                    <IconInfoCircle className="h-4 w-4" />
                    <span className="text-neutral-400 dark:text-neutral-500 text-xs">Disclaimer</span>
                  </button>
                  {showTooltip && (
                    <div className="absolute left-0 top-6 w-80 sm:w-96 p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-xl z-50 text-xs leading-relaxed">
                      <p className="text-neutral-700 dark:text-neutral-300 font-semibold mb-2">
                        ACAI Voice Agent Pricing Notice:
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                        Pricing is based on ACAI's standard agent model and an initial assessment of scope, usage, integrations, and automation complexity.
                      </p>
                      <div className="bg-neutral-100 dark:bg-neutral-900 p-3 border border-neutral-200 dark:border-neutral-700 rounded mb-2">
                        <p className="text-neutral-700 dark:text-neutral-300 font-semibold mb-1 text-sm">
                          Commitment Terms:
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          Monthly plans require a 3-month minimum commitment. Yearly plans (12-month commitment) include a fee reevaluation at the 6-month mark to ensure pricing reflects actual usage and value delivered.
                        </p>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                        All pricing, setup fees, and timelines are estimates and subject to change based on technical requirements, platform constraints, API access, data volume, customization depth, and third-party dependencies. Some implementations may be completed within hours, while others may require extended timelines depending on system architecture and platform requirements.
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Quoted pricing is non-binding and specific to the evaluated use case. A detailed scope and estimate will be provided prior to implementation. Final costs and delivery timelines are confirmed only after technical review. By proceeding with any service or package, you acknowledge that integration complexity, usage growth, or scope expansion may materially impact pricing and delivery schedules.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-4">
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  key={active}
                  className={cn(
                    "text-4xl font-bold tracking-tight  inline-block",
                    tier.featured
                      ? "text-white"
                      : "text-neutral-900 dark:text-neutral-200"
                  )}
                >
                  {active === "monthly" ? tier.priceMonthly : tier.priceYearly}
                </motion.span>
              </p>
              <p
                className={cn(
                  tier.featured
                    ? "text-neutral-300"
                    : "text-neutral-600 dark:text-neutral-300",
                  "mt-6 text-sm leading-7  h-12 md:h-12 xl:h-12"
                )}
              >
                {tier.description}
              </p>
              {active === "yearly" && tier.yearlyBenefits && (
                <p className={cn(
                  tier.featured ? "text-neutral-300" : "text-neutral-600 dark:text-neutral-400",
                  "mt-2 text-sm leading-6"
                )}>
                  {tier.yearlyBenefits}
                </p>
              )}
              <ul
                role="list"
                className={cn(
                  tier.featured
                    ? "text-neutral-300"
                    : "text-neutral-600 dark:text-neutral-300",
                  "mt-8 space-y-3 text-sm leading-6 sm:mt-10"
                )}
              >
                {(active === "yearly" && tier.featuresYearly 
                  ? tier.featuresYearly 
                  : active === "monthly" && tier.featuresMonthly 
                  ? tier.featuresMonthly 
                  : tier.features
                ).map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <IconCircleCheckFilled
                      className={cn(
                        tier.featured
                          ? "text-white"
                          : "text-muted dark:text-muted-dark",
                        "h-6 w-5 flex-none"
                      )}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              {/* Commitment Terms */}
              {tier.id === "tier-monthly" && (
                <div className={cn(
                  tier.featured ? "text-neutral-300" : "text-neutral-600 dark:text-neutral-400",
                  "mt-4 text-sm leading-6"
                )}>
                  {active === "monthly" && (
                    <p>3-month minimum commitment</p>
                  )}
                  {active === "yearly" && (
                    <p>Fee reevaluation at 6-month mark</p>
                  )}
                </div>
              )}
              {active === "yearly" && tier.yearlyNote && (
                <p className={cn(
                  tier.featured ? "text-neutral-300" : "text-neutral-600 dark:text-neutral-400",
                  "mt-4 text-xs leading-5"
                )}>
                  {tier.yearlyNote}
                </p>
              )}
              {tier.footnote && (
                <p className={cn(
                  tier.featured ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-500",
                  "mt-4 text-xs italic leading-5"
                )}>
                  {tier.footnote}
                </p>
              )}
            </div>
            <div>
              <Button
                onClick={tier.onClick}
                aria-describedby={tier.id}
                className={cn(
                  tier.featured
                    ? "bg-white text-black shadow-sm hover:bg-white/90 focus-visible:outline-white"
                    : "",
                  "mt-8 rounded-full py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 block w-full"
                )}
              >
                {tier.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
