"use client";

import { motion } from "framer-motion";
import { BadgeCheck, CalendarCheck2, CircleDollarSign, FileText, MousePointerClick, Zap } from "lucide-react";

const funnelStages = [
  {
    title: "Ad Clicked",
    description: "A prospect taps your ad and lands on your offer.",
    icon: MousePointerClick,
  },
  {
    title: "Form Filled",
    description: "Lead details are submitted and captured instantly.",
    icon: FileText,
  },
  {
    title: "Instant Follow Up",
    description: "ACAI responds fast with voice + workflow automation.",
    icon: Zap,
  },
  {
    title: "Lead Qualified",
    description: "Intent, fit, and urgency are filtered before handoff.",
    icon: BadgeCheck,
  },
  {
    title: "Appointment Booked",
    description: "Qualified leads get routed directly to scheduling.",
    icon: CalendarCheck2,
  },
  {
    title: "Paying Customer",
    description: "More ad spend turns into revenue with less leakage.",
    icon: CircleDollarSign,
  },
] as const;

export function CallRevenueFlowSection() {
  return (
    <section className="relative z-20 mt-6 w-full max-w-7xl px-4 md:mt-8">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-6xl"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/55 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_0_40px_rgba(96,70,255,0.15)] backdrop-blur-xl md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-500/6 via-purple-500/10 to-blue-500/6" />
          <div className="pointer-events-none absolute -left-24 top-6 h-44 w-44 rounded-full bg-red-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-6 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-300/75 md:text-sm">
              LEAD CONVERSION FUNNEL
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
              Turn Every Click Into Revenue
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg">
              Most businesses lose leads after the click, not before it. ACAI helps you respond faster, qualify instantly, and convert more of the demand you already paid for.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="relative z-10 mx-auto mt-7 max-w-3xl overflow-hidden rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-5 py-4 text-center shadow-[0_0_0_1px_rgba(16,185,129,0.22),0_0_28px_rgba(16,185,129,0.16)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200/90">Harvard Insight</p>
            <p className="mt-2 text-lg font-medium leading-snug text-white md:text-2xl">
              Companies that respond to leads within an hour can see up to a <span className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text font-bold text-transparent">391% increase in conversions.</span>
            </p>
          </motion.div>

          <div className="relative z-10 mt-8 grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-3">
            {funnelStages.map((stage, index) => {
              const Icon = stage.icon;
              const isLast = index === funnelStages.length - 1;
              return (
                <motion.div
                  key={stage.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group relative"
                >
                  <div className="relative flex h-full min-h-[178px] flex-col rounded-2xl border border-white/10 bg-black/55 p-4 shadow-[0_8px_20px_rgba(0,0,0,0.28)] transition-all duration-300 group-hover:border-white/25 group-hover:shadow-[0_12px_30px_rgba(68,40,168,0.28)]">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-red-500/10 via-purple-500/12 to-blue-500/10" />
                    <div className="relative z-10">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-white md:text-lg">{stage.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-300">{stage.description}</p>
                    </div>
                  </div>

                  {!isLast && (
                    <>
                      <div className="pointer-events-none absolute -bottom-3 left-1/2 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-purple-400/80 to-blue-400/30 lg:hidden" />
                      <div className="pointer-events-none absolute right-[-10px] top-1/2 hidden h-[2px] w-5 -translate-y-1/2 overflow-hidden rounded-full bg-gradient-to-r from-purple-400/90 to-blue-400/50 lg:block">
                        <motion.span
                          className="absolute inset-y-0 left-0 w-1/2 bg-white/90"
                          animate={{ x: ["-130%", "260%"] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: index * 0.1 }}
                        />
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="relative z-10 mt-7 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-200">
              See Epoxy Plan
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-200">
              See Garage Installation Plan
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
