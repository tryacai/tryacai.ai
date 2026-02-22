"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heading } from "./heading";
import { Link } from "next-view-transitions";
import { ChevronDown } from "lucide-react";

const levels = [
  {
    level: "TIER 1",
    title: "AI Receptionist",
    cardDescription: "High-volume, standardized service with essential automation coverage.",
    price: "$299",
    targetMarket: "Solo operators & small teams (1-3 people)",
    valueProp:
      "High-volume, standardized service - we handle the basics so you can focus on the work.",
    positioning:
      "Affordable, essential automation for businesses just getting started or running lean.",
    copyEmphasis: [
      "Stop losing money to missed calls",
      "Never miss another opportunity",
    ],
    includes: [
      "24/7 AI receptionist and instant call pickup",
      "Basic qualification + booking handoff",
      "After-hours and overflow coverage",
      "Missed call protection baseline",
    ],
    industryLink: "/plumbing",
    industryLabel: "Plumbing",
  },
  {
    level: "TIER 2",
    title: "Follow-Ups + Review Automation + Missed Call Text",
    cardDescription: "Smart growth automation that recovers revenue and builds reputation.",
    price: "$599",
    targetMarket: "Growing businesses ready to scale (4-10 people)",
    valueProp:
      "Smart automation that builds your reputation and recovers lost revenue.",
    positioning:
      "For businesses ready to systematize their growth and build their brand.",
    copyEmphasis: [
      "Turn one-time customers into repeat business",
      "Automate what's stealing your time",
    ],
    includes: [
      "Everything in Tier 1",
      "Missed call text-back with recovery workflows",
      "Automated estimate and follow-up sequences",
      "Review generation and post-job retention nudges",
    ],
    industryLink: "/hvac",
    industryLabel: "HVAC",
  },
  {
    level: "TIER 3",
    title: "Full AI Infrastructure + Quote Routing + Multi Location",
    cardDescription: "Premium white-glove infrastructure for high-priority operations.",
    price: "$1199",
    targetMarket: "Established operations & multi-location businesses (10+ people)",
    valueProp:
      "Custom infrastructure for businesses where time is more valuable than money.",
    positioning:
      "Boutique, high-touch service with full customization - not commoditized.",
    copyEmphasis: [
      "We build the system, you run the empire",
      "Your time back, guaranteed",
    ],
    includes: [
      "Everything in Tier 2",
      "Advanced quote routing and priority logic",
      "Multi-location call orchestration",
      "Custom SOP workflows + dedicated infrastructure support",
    ],
    industryLink: "/roofing",
    industryLabel: "Roofing",
  },
];

export const ScalingLadder = () => {
  const [expandedTier, setExpandedTier] = React.useState<string | null>(null);

  return (
    <section className="relative z-20 py-10 lg:py-20 w-full">
      <Heading as="h2" size="md">
        The ACAI Growth Ladder
      </Heading>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((item, index) => (
          <motion.div
            key={item.level}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.12 }}
            whileHover={{ 
              y: -4,
              transition: { duration: 0.2 }
            }}
            className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 px-6 py-6 hover:border-transparent hover:shadow-[0_0_18px_rgba(168,85,247,0.24)] hover:bg-gradient-to-br hover:from-[#ff003c]/10 hover:via-[#7b00ff]/10 hover:to-[#0066ff]/10 transition-all duration-200 ease-out relative overflow-hidden"
          >
            {item.level === "TIER 3" && (
              <div className="absolute right-[-38px] top-[18px] z-20 rotate-45 bg-gradient-to-r from-[#f6e6b4] via-[#d9bd7c] to-[#b8924c] px-10 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2d2312] shadow-[0_0_14px_rgba(217,189,124,0.55)]">
                Priority Access
              </div>
            )}

            {/* Gradient glow border on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] p-[1px]">
              <div className="h-full w-full rounded-2xl bg-white dark:bg-neutral-900" />
            </div>
            
            <div className="relative z-10">
              <div className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:via-purple-500 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-200 ease-out">
                {item.level}
              </div>
              <div className="mt-3 text-base md:text-lg font-semibold text-neutral-900 dark:text-white leading-snug min-h-[3.5rem]">
                {item.title}
              </div>
              <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 min-h-[2.5rem]">
                {item.cardDescription}
              </div>
              
              {/* Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedTier((current) =>
                      current === item.level ? null : item.level
                    )
                  }
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-700 dark:text-neutral-300 transition-all duration-150 ease-out hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:scale-105"
                >
                  Learn More
                  <ChevronDown
                    className={`ml-2 h-3.5 w-3.5 transition-transform ${expandedTier === item.level ? "rotate-180" : ""}`}
                  />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff1a1a] via-[#a100ff] to-[#004cff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-150 ease-out hover:shadow-lg hover:scale-105"
                >
                  Get Started
                </Link>
              </div>

              {expandedTier === item.level && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="mt-5 rounded-xl border border-white/10 bg-black/45 p-4 text-left"
                >
                  {item.level === "TIER 3" ? (
                    <>
                      <div className="space-y-4 text-sm text-neutral-200">
                        <p className="text-xs uppercase tracking-[0.16em] text-[#e7cf9c]">TIER 3 - PREMIUM INFRASTRUCTURE</p>
                        <p className="text-white font-medium">For businesses where efficiency and priority matter more than cost.</p>
                        <p className="text-neutral-300">This isn&apos;t a product. It&apos;s a partnership.</p>

                        <div>
                          <p className="font-semibold text-white">Who This Is For:</p>
                          <ul className="mt-2 space-y-1 text-neutral-300">
                            <li>• Established operators who value their time above all else</li>
                            <li>• Multi-location businesses that need seamless coordination</li>
                            <li>• Companies ready to invest in systems that scale with them</li>
                            <li>• Owners who want white-glove service, not DIY setup</li>
                          </ul>
                        </div>

                        <div>
                          <p className="font-semibold text-white">What Makes This Different:</p>
                          <p className="mt-1 text-white/95">1-on-1 Priority Service</p>
                          <ul className="mt-2 space-y-1 text-neutral-300">
                            <li>• Dedicated infrastructure specialist assigned to your account</li>
                            <li>• Direct team access - no ticket queues, no waiting</li>
                            <li>• Custom SOP development for your operation, not templates</li>
                            <li>• Priority response times with proactive optimization</li>
                          </ul>
                        </div>

                        <div>
                          <p className="font-semibold text-white">Premium Features:</p>
                          <ul className="mt-2 space-y-1 text-neutral-300">
                            <li>• Everything in Tier 2 (follow-ups, reviews, missed-call recovery)</li>
                            <li>• Advanced quote routing with priority logic you control</li>
                            <li>• Multi-location orchestration by time, availability, and specialty</li>
                            <li>• Custom workflow automation around your SOPs</li>
                            <li>• Ongoing optimization and performance reviews</li>
                          </ul>
                        </div>

                        <div>
                          <p className="font-semibold text-white">What You Get That Others Don&apos;t:</p>
                          <ul className="mt-2 space-y-1 text-neutral-300">
                            <li>• First-class treatment, always</li>
                            <li>• Custom solutions, not cookie-cutter packages</li>
                            <li>• Faster deployment with hands-on setup support</li>
                            <li>• Smoother operations while you focus on growth</li>
                          </ul>
                        </div>

                        <div className="rounded-lg border border-[#d9bd7c]/40 bg-[#d9bd7c]/10 p-3">
                          <p className="font-semibold text-[#f3dfb2]">The Investment</p>
                          <p className="mt-1 text-neutral-200">Custom pricing based on your needs and scale, starting conversations at $1199/month.</p>
                          <p className="mt-2 text-neutral-300">Time is your most valuable asset. We protect it.</p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          href="/contact"
                          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff1a1a] via-[#a100ff] to-[#004cff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-150 ease-out hover:shadow-lg"
                        >
                          Schedule a Priority Consultation
                        </Link>
                        <span className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-300">
                          View Case Studies - Coming Soon
                        </span>
                      </div>

                      <div className="mt-4 text-xs text-neutral-300">
                        See industry-specific examples on our{" "}
                        <Link href="/roofing" className="text-purple-300 hover:text-white underline underline-offset-4">Roofing</Link>
                        {" / "}
                        <Link href="/plumbing" className="text-purple-300 hover:text-white underline underline-offset-4">Plumbing</Link>
                        {" / "}
                        <Link href="/hvac" className="text-purple-300 hover:text-white underline underline-offset-4">HVAC</Link>
                        {" "}pages.
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-3 text-sm text-neutral-200">
                        <p><span className="font-semibold text-white">Best Fit:</span> {item.targetMarket}</p>
                        <p><span className="font-semibold text-white">Value:</span> {item.valueProp}</p>
                        <p><span className="font-semibold text-white">Positioning:</span> {item.positioning}</p>
                        <div>
                          <p className="font-semibold text-white">What&apos;s Included:</p>
                          <ul className="mt-2 space-y-1 text-neutral-300">
                            {item.includes.map((entry) => (
                              <li key={entry}>• {entry}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-white">Copy Emphasis:</p>
                          <ul className="mt-2 space-y-1 text-neutral-300">
                            {item.copyEmphasis.map((line) => (
                              <li key={line}>• {line}</li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-neutral-300"><span className="font-semibold text-white">Pricing:</span> {item.price}</p>
                      </div>

                      <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-neutral-300">
                        <p className="font-semibold text-white">View Case Studies - Coming Soon</p>
                        <Link href={item.industryLink} className="mt-2 inline-flex text-purple-300 hover:text-white underline underline-offset-4">
                          See {item.industryLabel} Page for Details
                        </Link>
                      </div>

                      <Link
                        href="/contact"
                        className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff1a1a] via-[#a100ff] to-[#004cff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-150 ease-out hover:shadow-lg"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
