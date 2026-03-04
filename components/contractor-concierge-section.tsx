"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const callJourneyStages = [
  {
    label: "Answer",
    description: "Your call is answered by a real trained concierge.",
  },
  {
    label: "Qualify",
    description: "We qualify the job type, urgency, and location.",
  },
  {
    label: "Route",
    description: "We route it directly to your technician’s calendar.",
  },
  {
    label: "Log",
    description: "Every call is logged, tagged, and attributed in your CRM.",
  },
] as const;

export function ContractorConciergeSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const journeyRef = useRef<HTMLDivElement | null>(null);
  const isJourneyInView = useInView(journeyRef, { amount: 0.45, once: false });

  useEffect(() => {
    if (!isJourneyInView) {
      return;
    }

    setActiveStageIndex(0);
    const interval = window.setInterval(() => {
      setActiveStageIndex((current) => (current + 1) % callJourneyStages.length);
    }, 1500);

    return () => {
      window.clearInterval(interval);
    };
  }, [isJourneyInView]);

  return (
    <section className="relative z-10 mt-0 w-full max-w-7xl px-4 md:mt-1">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto mt-8 max-w-6xl"
      >
        <div className="relative">
          <div className="acai-command-glow pointer-events-none absolute -inset-5 rounded-[2.2rem]" />
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 7.2,
              repeat: Infinity,
              ease: "easeInOut",
              type: "spring",
            }}
          >
            <section className="relative z-10 mt-0 w-full max-w-7xl overflow-hidden px-4 md:mt-1">
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-purple-300/70 md:text-sm">HOW EVERY CALL BECOMES REVENUE</p>

                  <div
                    ref={journeyRef}
                    className="relative mt-5 overflow-hidden rounded-2xl border border-white/15 bg-black/60 p-5 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_0_28px_rgba(96,70,255,0.18)] backdrop-blur-xl md:p-7"
                  >
                    <motion.div
                      aria-hidden
                      animate={{ opacity: [0.28, 0.42, 0.28] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-500/8 via-purple-500/12 to-blue-500/8"
                    />
                    <motion.div
                      aria-hidden
                      animate={{ x: ["-120%", "120%"] }}
                      transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
                      className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md"
                    />

                    <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 md:flex-nowrap md:gap-3">
                      {callJourneyStages.map((stage, index) => {
                        const isActive = index === activeStageIndex;
                        const isReached = index <= activeStageIndex;

                        return (
                          <div key={stage.label} className="flex w-full items-center justify-center md:w-auto">
                            <motion.div
                              animate={{
                                opacity: isActive ? 1 : 0.5,
                                scale: isActive ? 1.07 : 1,
                                boxShadow: isActive
                                  ? "0 0 0 1px rgba(255,255,255,0.2), 0 0 22px rgba(123,97,255,0.45), 0 0 35px rgba(59,130,246,0.24)"
                                  : "0 0 0 1px rgba(255,255,255,0.07)",
                              }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-black/65"
                            >
                              <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-red-500/90 via-purple-500/90 to-blue-500/90 p-[1px]">
                                <span className="block h-full w-full rounded-full bg-black/85" />
                              </span>
                              <motion.span
                                animate={{ opacity: isActive ? 1 : 0.65 }}
                                transition={{ duration: 0.28 }}
                                className="relative z-10 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                              >
                                {stage.label}
                              </motion.span>
                              {isActive && (
                                <motion.span
                                  aria-hidden
                                  initial={{ opacity: 0.4, scale: 0.8 }}
                                  animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.16, 1] }}
                                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                                  className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-r from-red-500/20 via-purple-500/25 to-blue-500/20 blur-md"
                                />
                              )}
                            </motion.div>

                            {index < callJourneyStages.length - 1 && (
                              <div className="relative mx-2 hidden h-px w-14 overflow-hidden rounded-full bg-white/15 md:block">
                                <motion.div
                                  animate={{ opacity: isReached ? 1 : 0.35 }}
                                  className="absolute inset-0 bg-gradient-to-r from-red-500/65 via-purple-500/65 to-blue-500/65"
                                />
                                {isActive && (
                                  <motion.span
                                    aria-hidden
                                    initial={{ x: "-100%", opacity: 0.5 }}
                                    animate={{ x: "440%", opacity: [0.35, 1, 0.35] }}
                                    transition={{ duration: 1.15, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-1.5 h-3 w-3 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="relative z-10 mt-7 rounded-xl border border-white/10 bg-black/45 p-5 md:p-6">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={callJourneyStages[activeStageIndex].label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.26, ease: "easeOut" }}
                          className="text-2xl font-medium leading-tight text-white md:text-3xl"
                        >
                          {callJourneyStages[activeStageIndex].description}
                        </motion.p>
                      </AnimatePresence>
                      <p className="mt-4 text-base leading-relaxed text-neutral-300 md:text-lg">
                        We handle everything from the first ring to the final payment.
                      </p>
                    </div>

                    <p className="relative z-10 mt-5 text-center text-sm text-neutral-400">Every call. Every emergency. Fully tracked.</p>
                  </div>
                  </div>
                        focusTab(index - 1);
                      }
                      if (event.key === "Home") {
                        event.preventDefault();
                        focusTab(0);
                      }
                      if (event.key === "End") {
                        event.preventDefault();
                        focusTab(featureItems.length - 1);
                      }
                    }}
                    className={`relative w-full rounded-full px-4 py-2.5 text-center text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                      isActive
                        ? "bg-gradient-to-r from-red-500/20 via-purple-500/24 to-blue-500/22 text-white"
                        : "border border-white/10 bg-black/40 text-neutral-300 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 p-[1px]">
                        <span className="block h-full w-full rounded-full bg-black/80" />
                      </span>
                    )}
                    <span className="relative z-10">{feature.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 min-h-[150px] rounded-2xl border border-white/12 bg-black/55 p-5" role="tabpanel" id={`feature-panel-${activeFeature.id}`} aria-labelledby={`feature-tab-${activeFeature.id}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-red-500/24 via-purple-500/24 to-blue-500/24 text-white"
                  >
                    <ActiveFeatureIcon className="h-5 w-5" />
                  </motion.div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{activeFeature.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-neutral-300">{activeFeature.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">What happens on every call</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-neutral-200 md:gap-3">
                {callFlowItems.map((item, index) => {
                  const StepIcon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-2">
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.28, delay: 0.06 * index }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/45 px-3 py-1.5"
                      >
                        <StepIcon className="h-3.5 w-3.5 text-purple-300" />
                        <span>{item.label}</span>
                      </motion.span>
                      {index < callFlowItems.length - 1 && <span className="text-neutral-500">→</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-white/12 bg-black/50 p-4 text-center shadow-[0_10px_28px_rgba(20,20,40,0.28)] md:mt-14 md:p-5"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-500/5 via-purple-500/8 to-blue-500/5" />
        <h3 className="relative text-3xl font-semibold text-white md:text-4xl">Ready to See Concierge in Action?</h3>

        <div className="relative mt-4 flex items-center justify-center">
          <Link
            href="/contact"
            className="acai-cta-shine relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 px-8 py-3 text-base font-semibold text-white shadow-[0_8px_24px_rgba(123,0,255,0.22)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(123,0,255,0.28)]"
          >
            <span className="relative z-10">Book a Strategy Call</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
