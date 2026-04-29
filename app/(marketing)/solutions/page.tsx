"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

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

const sectionItems: Record<SystemTier, string[]> = {
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

function AnimatedCount({ value, suffix = "" }: { value: number; suffix?: string }) {
  return (
    <motion.span
      key={`${value}${suffix}`}
      initial={{ opacity: 0.35, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {value}
      {suffix}
    </motion.span>
  );
}

export default function SolutionsPage() {
  const [activeTier, setActiveTier] = useState<SystemTier>("capture");
  const [callsPerMonth, setCallsPerMonth] = useState(120);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "capture" || hash === "recover" || hash === "optimize") {
      setActiveTier(hash);
    }
  }, []);

  const accentClass =
    activeTier === "capture"
      ? "from-red-500/30 via-purple-500/30 to-blue-500/30"
      : activeTier === "recover"
      ? "from-fuchsia-500/30 via-purple-500/30 to-indigo-500/30"
      : "from-amber-300/30 via-purple-500/30 to-blue-500/30";

  const simulatedRecoveredRate = 18;
  const simulatedReviews = 22;
  const simulatedFollowUps = useMemo(() => {
    if (callsPerMonth <= 0) return 0;
    return Math.max(46, Math.round(callsPerMonth * 0.38));
  }, [callsPerMonth]);

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-20 mx-auto w-full max-w-5xl py-10 text-center md:pt-40"
        >
          <Heading as="h1" className="tracking-[0.02em] md:tracking-[0.03em]">
            THE SIMPLE. YET SCALABLE. SYSTEM.
          </Heading>
          <Subheading className="mx-auto mt-4 max-w-3xl text-center">
            From answering your first call to orchestrating multi-location operations.
          </Subheading>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {tiers.map((tier) => {
              const isActive = tier.key === activeTier;

              return (
                <button
                  key={tier.key}
                  onClick={() => {
                    setActiveTier(tier.key);
                    window.history.replaceState(null, "", `/solutions#${tier.key}`);
                  }}
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
        </motion.div>

        <div id="capture" className="sr-only" aria-hidden="true" />
        <div id="recover" className="sr-only" aria-hidden="true" />
        <div id="optimize" className="sr-only" aria-hidden="true" />

        <div className="relative z-20 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-6 md:p-8">
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentClass} transition-all duration-500`} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTier}
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48 }}
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
                    <h2 className="text-3xl font-semibold text-white">Revenue Doesn’t Slip Through Cracks.</h2>
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
                  {sectionItems[activeTier].map((item) => (
                    <li key={item} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                {activeTier === "capture" && (
                  <>
                    <div className="rounded-2xl border border-white/15 bg-neutral-950/75 p-5">
                      <p className="text-xs uppercase tracking-[0.14em] text-neutral-400">Dashboard Preview</p>
                      <div className="mt-5 flex flex-col items-center gap-2">
                        {[
                          "Customer Call",
                          "AI Receptionist",
                          "Qualification Logic",
                          "Booking / Dispatch System",
                        ].map((step, index) => (
                          <div key={step} className="flex w-full max-w-xs flex-col items-center">
                            <div className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center text-xs text-neutral-100">
                              {step}
                            </div>
                            {index < 3 && <div className="h-5 w-[2px] bg-gradient-to-b from-purple-300/80 to-blue-300/50" />}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-black/45 p-4">
                        <p className="text-sm font-semibold text-white">Barbershop Basic — $49/month</p>
                        <ul className="mt-2 space-y-1 text-xs text-neutral-300">
                          <li>• 24/7 inbound call answering</li>
                          <li>• Sends Booksy link automatically</li>
                          <li>• Missed-call instant text back</li>
                          <li>• 60 AI minutes included</li>
                        </ul>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-black/45 p-4">
                        <p className="text-sm font-semibold text-white">Plumbing Basic — $299/month</p>
                        <ul className="mt-2 space-y-1 text-xs text-neutral-300">
                          <li>• 24/7 inbound call answering</li>
                          <li>• Urgency-based call qualification</li>
                          <li>• Missed-call instant text back</li>
                          <li>• Calendar + dispatch handoff</li>
                          <li>• 90 AI calls included</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {activeTier === "recover" && (
                  <>
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

                      <div className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <p className="text-neutral-400">Recovered Calls</p>
                          <p className="mt-2 text-xl font-semibold text-white">
                            <AnimatedCount value={simulatedRecoveredRate} suffix="%" />
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <p className="text-neutral-400">Reviews Generated</p>
                          <p className="mt-2 text-xl font-semibold text-white">
                            <AnimatedCount value={simulatedReviews} />
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <p className="text-neutral-400">Follow-Ups Sent</p>
                          <p className="mt-2 text-xl font-semibold text-white">
                            <AnimatedCount value={simulatedFollowUps} />
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-black/45 p-4">
                        <p className="text-sm font-semibold text-white">Barber Growth — $197/month</p>
                        <ul className="mt-2 space-y-1 text-xs text-neutral-300">
                          <li>• Rebooking text automation</li>
                          <li>• Review request sequencing</li>
                          <li>• Booking analytics visibility</li>
                        </ul>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-black/45 p-4">
                        <p className="text-sm font-semibold text-white">Plumbing Pro — $599/month</p>
                        <ul className="mt-2 space-y-1 text-xs text-neutral-300">
                          <li>• Missed-call recovery workflows</li>
                          <li>• Estimate follow-up automation</li>
                          <li>• Reputation-building review flows</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {activeTier === "optimize" && (
                  <>
                    <div className="relative overflow-hidden rounded-2xl border border-amber-300/30 bg-neutral-950/80 p-5">
                      <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-[-35%] w-[30%] bg-gradient-to-r from-transparent via-amber-200/20 to-transparent"
                        animate={{ x: ["-120%", "420%"] }}
                        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 4.8 }}
                      />

                      <p className="text-xs uppercase tracking-[0.14em] text-amber-100">Advanced Dashboard</p>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        {[
                          ["Call Volume", "2,480"],
                          ["Conversion %", "38.6%"],
                          ["Revenue Captured", "$184,200"],
                          ["Active Locations", "7"],
                        ].map(([label, value]) => (
                          <motion.div
                            key={label}
                            animate={{ opacity: [0.85, 1, 0.85] }}
                            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                            className="rounded-xl border border-white/10 bg-white/5 p-4"
                          >
                            <p className="text-neutral-400">{label}</p>
                            <p className="mt-1 text-xl font-semibold text-white">{value}</p>
                          </motion.div>
                        ))}
                        <div className="col-span-2 rounded-xl border border-white/10 bg-white/5 p-4">
                          <p className="text-neutral-400">Live Routing Map</p>
                          <div className="mt-3 flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-emerald-400/70 via-blue-400/70 to-amber-300/70" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-amber-300/30 bg-neutral-900/80 p-4">
                        <p className="text-sm font-semibold text-amber-100">Barber Enterprise — $799/month</p>
                        <p className="mt-2 text-xs text-neutral-200">Advanced routing and dedicated optimization support.</p>
                      </div>
                      <div className="rounded-xl border border-amber-300/30 bg-neutral-900/80 p-4">
                        <p className="text-sm font-semibold text-amber-100">Plumbing Enterprise — Starting at $1199/month</p>
                        <p className="mt-2 text-xs text-neutral-200">Multi-location orchestration with infrastructure-level support.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}
