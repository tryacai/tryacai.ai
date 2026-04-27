"use client";

import { motion } from "framer-motion";

const callJourneyStages = [
  {
    label: "Answer",
    description: "Every inbound call gets an immediate response.",
  },
  {
    label: "Qualify",
    description: "Intent and job details are collected automatically.",
  },
  {
    label: "Route",
    description: "Qualified leads are routed to the right next action.",
  },
  {
    label: "Log",
    description: "Calls are logged for attribution and follow-up.",
  },
] as const;

export function ContractorConciergeSection() {
  return (
    <section className="relative z-10 mt-16 w-full px-4 md:mt-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-6xl"
      >
        <div className="grid grid-cols-1 items-center gap-8 rounded-[2rem] border border-white/10 bg-black/45 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_0_32px_rgba(88,65,185,0.2)] backdrop-blur-xl md:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-300/70 md:text-sm">How Every Call Becomes Revenue</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
              Move every conversation from first ring to booked work
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-300 md:text-lg">
              Mica Growth runs a consistent handoff sequence for each caller, so your team spends less time chasing details and more time closing jobs.
            </p>
          </div>

          <div className="relative rounded-2xl border border-white/12 bg-black/60 p-4 md:p-6">
            <div className="pointer-events-none absolute left-8 right-8 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-red-400/40 via-purple-400/50 to-blue-400/40 md:block" />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-8 top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.9),0_0_28px_rgba(96,70,255,0.7)] md:block"
              animate={{ x: [0, 360, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-2">
              {callJourneyStages.map((stage, index) => (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                  className="rounded-xl border border-white/10 bg-black/70 px-3 py-4 text-center"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white md:text-xs">{stage.label}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-300">{stage.description}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-neutral-400 md:mt-5">
              Answer → Qualify → Route → Log
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
