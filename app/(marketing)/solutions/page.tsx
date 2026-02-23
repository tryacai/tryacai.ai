"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";

type SystemTier = "capture" | "recover" | "optimize";

const tiers: Array<{ key: SystemTier; label: string }> = [
  { key: "capture", label: "Capture" },
  { key: "recover", label: "Recover" },
  { key: "optimize", label: "Optimize" },
];

const sectionsByTier: Record<SystemTier, string[]> = {
  capture: [
    "24/7 AI receptionist",
    "Lead qualification routing",
    "After-hours coverage",
    "Missed-call baseline protection",
  ],
  recover: [
    "Missed call text-back recovery",
    "Estimate follow-up automation",
    "Review request sequencing",
    "Rebooking logic",
  ],
  optimize: [
    "Advanced quote routing",
    "Multi-location coordination",
    "Custom SOP development",
    "Dedicated infrastructure specialist",
    "Ongoing QA & performance scoring",
  ],
};

export default function SolutionsPage() {
  const [activeTier, setActiveTier] = useState<SystemTier>("capture");
  const [callsPerMonth, setCallsPerMonth] = useState(120);

  const activeIndex = tiers.findIndex((tier) => tier.key === activeTier);

  const accentClass =
    activeTier === "capture"
      ? "from-red-500/30 via-purple-500/30 to-blue-500/30"
      : activeTier === "recover"
      ? "from-fuchsia-500/30 via-purple-500/30 to-indigo-500/30"
      : "from-amber-300/30 via-purple-500/30 to-blue-500/30";

  const recoveredCalls = useMemo(() => Math.round(callsPerMonth * 0.34), [callsPerMonth]);
  const reviewsGenerated = useMemo(() => Math.round(callsPerMonth * 0.18), [callsPerMonth]);

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center pb-20">
        <div className="relative z-20 mx-auto w-full max-w-5xl py-10 text-center md:pt-40">
          <Heading as="h1">The ACAI System</Heading>
          <Subheading className="mx-auto mt-4 max-w-3xl text-center">
            One infrastructure. Three levels of capability.
          </Subheading>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {tiers.map((tier) => {
              const isActive = tier.key === activeTier;

              return (
                <button
                  key={tier.key}
                  onClick={() => setActiveTier(tier.key)}
                  className={`rounded-full border px-6 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "border-transparent bg-gradient-to-r from-[#ff1a1a] via-[#a100ff] to-[#004cff] text-white"
                      : "border-white/20 bg-black/35 text-neutral-300 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {tier.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative z-20 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-6 md:p-8">
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentClass} transition-all duration-500`} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTier}
              initial={{ opacity: 0, x: activeIndex === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeIndex === 0 ? 50 : -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2"
            >
              <div>
                {activeTier === "capture" && (
                  <>
                    <h2 className="text-3xl font-semibold text-white">Never Miss Another Opportunity.</h2>
                    <p className="mt-3 text-sm text-neutral-200 md:text-base">
                      Instant pickup. Basic qualification. Booking handoff.
                    </p>
                  </>
                )}

                {activeTier === "recover" && (
                  <>
                    <h2 className="text-3xl font-semibold text-white">Revenue Doesn&apos;t Slip Through Cracks.</h2>
                    <p className="mt-3 text-sm text-neutral-200 md:text-base">
                      Recover missed calls. Automate follow-ups. Build reputation.
                    </p>
                  </>
                )}

                {activeTier === "optimize" && (
                  <>
                    <h2 className="text-3xl font-semibold text-white">White-Glove Infrastructure.</h2>
                    <p className="mt-3 text-sm text-neutral-200 md:text-base">
                      Custom routing. Multi-location orchestration. Dedicated optimization.
                    </p>
                  </>
                )}

                <ul className="mt-6 space-y-3 text-sm text-neutral-200">
                  {sectionsByTier[activeTier].map((item) => (
                    <li key={item} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {activeTier === "capture" && (
                  <div className="rounded-2xl border border-white/15 bg-neutral-950/75 p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-neutral-400">Dashboard Preview</p>
                    <div className="mt-6 grid grid-cols-4 items-center gap-2 text-center text-xs text-neutral-200">
                      <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-3">Incoming Call</div>
                      <div className="text-neutral-400">→</div>
                      <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-3">AI</div>
                      <div className="text-neutral-400">→</div>
                    </div>
                    <div className="mt-2 grid grid-cols-3 items-center gap-2 text-center text-xs text-neutral-200">
                      <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-3">Qualified</div>
                      <div className="text-neutral-400">→</div>
                      <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-3">Booking System</div>
                    </div>
                  </div>
                )}

                {activeTier === "recover" && (
                  <div className="rounded-2xl border border-white/15 bg-neutral-950/75 p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-neutral-400">Dashboard Preview</p>

                    <label className="mt-5 block text-sm text-neutral-300">How many calls per month?</label>
                    <input
                      type="number"
                      min={0}
                      value={callsPerMonth}
                      onChange={(e) => setCallsPerMonth(Number(e.target.value || 0))}
                      className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-white outline-none focus:border-purple-400"
                    />

                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-neutral-400">Recovered calls</p>
                        <p className="mt-2 text-xl font-semibold text-white">{recoveredCalls}</p>
                        <p className="mt-1 text-xs text-neutral-500">~34% recovery</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-neutral-400">Reviews generated</p>
                        <p className="mt-2 text-xl font-semibold text-white">{reviewsGenerated}</p>
                        <p className="mt-1 text-xs text-neutral-500">~18% conversion</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTier === "optimize" && (
                  <div className="relative overflow-hidden rounded-2xl border border-amber-300/30 bg-neutral-950/80 p-5">
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-[-35%] w-[30%] bg-gradient-to-r from-transparent via-amber-200/20 to-transparent"
                      animate={{ x: ["-120%", "420%"] }}
                      transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 4.8 }}
                    />

                    <p className="text-xs uppercase tracking-[0.14em] text-amber-100">Advanced Dashboard</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-neutral-400">Call volume</p>
                        <p className="mt-1 text-xl font-semibold text-white">2,480</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-neutral-400">Conversion %</p>
                        <p className="mt-1 text-xl font-semibold text-white">38.6%</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-neutral-400">Revenue captured</p>
                        <p className="mt-1 text-xl font-semibold text-white">$184,200</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-neutral-400">Routing map</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          <span className="h-2 w-2 rounded-full bg-blue-400" />
                          <span className="h-2 w-2 rounded-full bg-amber-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}
