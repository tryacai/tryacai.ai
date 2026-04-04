"use client";

import { motion } from "framer-motion";

const funnelStages = [
  {
    title: "Ad Clicked",
    description: "Paid demand lands on your page.",
  },
  {
    title: "Form Filled",
    description: "Lead details are captured in real time.",
  },
  {
    title: "Instant Follow Up",
    description: "ACAI follows up before intent cools.",
  },
  {
    title: "Lead Qualified",
    description: "Fit and urgency are screened automatically.",
  },
  {
    title: "Appointment Booked",
    description: "Qualified prospects are routed to schedule.",
  },
  {
    title: "Paying Customer",
    description: "More clicks become real revenue.",
  },
] as const;

const stageWidths = ["100%", "92%", "84%", "76%", "68%", "60%"];

export function CallRevenueFlowSection() {
  return (
    <section className="relative z-20 mt-10 w-full px-4 md:mt-14">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-6xl"
      >
        <div className="grid grid-cols-1 items-center gap-8 rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_0_36px_rgba(96,70,255,0.16)] backdrop-blur-xl md:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-500/6 via-purple-500/10 to-blue-500/6" />

          <div className="relative z-10 max-w-xl text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-300/75 md:text-sm">
              LEAD CONVERSION FUNNEL
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
              Turn Every Click Into Revenue
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-300 md:text-lg">
              Most companies don&apos;t lose demand at the ad. They lose it in the gap after the click. ACAI closes that gap with immediate response, qualification, and routing.
            </p>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-xl">
            <div className="relative rounded-2xl border border-white/10 bg-black/55 p-4 md:p-6">
              <div className="pointer-events-none absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-blue-400/70 via-purple-400/55 to-red-400/70" />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9),0_0_34px_rgba(96,70,255,0.65)]"
                animate={{ y: [0, 360, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative flex flex-col items-center gap-3 md:gap-4">
            {funnelStages.map((stage, index) => {
              return (
                <motion.div
                  key={stage.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
                      className="relative"
                      style={{ width: stageWidths[index] }}
                >
                  <div className="rounded-xl border border-white/10 bg-black/70 px-4 py-3 text-center shadow-[0_8px_18px_rgba(0,0,0,0.24)] backdrop-blur-sm">
                    <h3 className="text-sm font-semibold text-white md:text-base">{stage.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-300 md:text-sm">{stage.description}</p>
                  </div>
                </motion.div>
              );
            })}
              </div>
          </div>
            <div className="mt-4 flex items-center justify-between px-3 text-[11px] uppercase tracking-[0.2em] text-neutral-400 md:px-6">
              <span>Top of Funnel</span>
              <span>Revenue</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
