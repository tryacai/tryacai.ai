"use client";
import { IconCircleCheckFilled, IconInfoCircle, IconStar } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { tiers } from "@/constants/tier";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./button";

export function Pricing() {
  const [active, setActive] = useState("yearly");
  const [showTooltip, setShowTooltip] = useState(false);
  const tabs = [
    { name: "6-Month", value: "yearly", badge: "Most Popular" },
    { name: "3-Month", value: "monthly" },
  ];

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 w-fit rounded-md overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={cn(
                "text-sm font-medium text-gray-500 dark:text-muted-dark p-4 rounded-md relative",
                active === tab.value ? "text-white dark:text-black" : "",
                tab.value === "yearly" ? "font-semibold" : ""
              )}
              onClick={() => setActive(tab.value)}
            >
              {active === tab.value && (
                <motion.span
                  layoutId="moving-div"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  className={cn(
                    "absolute inset-0",
                    tab.value === "yearly" 
                      ? "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 shadow-lg shadow-purple-500/50" 
                      : "bg-black dark:bg-white"
                  )}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.value === "yearly" && <IconStar className="h-4 w-4" />}
                {tab.name}
                {tab.badge && (
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
          Save 20% with our 6-month plan
        </p>
        <div className="max-w-2xl mx-auto mt-3 px-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
            Flexible pricing based on call volume. Most businesses see ROI in the first week. Cancel anytime—we're confident you'll stay.
          </p>
        </div>
        <div className="max-w-2xl mx-auto mt-4 px-4">
          <p className="text-xs text-neutral-500 dark:text-neutral-500 text-center italic">
            Both plans include a custom startup fee based on your needs, plus ongoing monthly management.
          </p>
        </div>
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
                        Pricing Details:
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                        Custom pricing is based on your call volume and specific needs. We'll provide a detailed quote after understanding your business requirements.
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Both plans can be canceled anytime with no penalties. We're confident in our service and believe you'll see the value immediately.
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
              <p className={cn(
                tier.featured ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-500",
                "mt-1 text-xs"
              )}>
                Includes full system setup and AI training
              </p>
              <p
                className={cn(
                  tier.featured
                    ? "text-neutral-300"
                    : "text-neutral-600 dark:text-neutral-300",
                  "mt-4 text-sm leading-7  h-12 md:h-12 xl:h-12"
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
              {active === "yearly" && tier.yearlyNote && (
                <p className={cn(
                  tier.featured ? "text-neutral-300" : "text-neutral-600 dark:text-neutral-400",
                  "mt-4 text-sm leading-6"
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
