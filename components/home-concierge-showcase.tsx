"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const featureCards = [
  {
    title: "24/7 Live Call Answering",
    description: "Real trained agents answering every contractor call.",
  },
  {
    title: "Emergency Call Routing",
    description: "After-hours and urgent calls prioritized instantly.",
  },
  {
    title: "High-Value Job Qualification",
    description: "Capture bigger jobs, not just missed voicemails.",
  },
];

const tickerItems = [
  "Emergency – Water Heater",
  "New Call – Main Line Clog",
  "After Hours – No Heat",
  "Dispatch – Leak Response",
  "Urgent – Sewer Backup",
];

export function HomeConciergeShowcase() {
  return (
    <section className="relative z-10 mt-8 w-full max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
        <div className="lg:col-span-3">
          <div className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-black/50 md:min-h-[560px]">
            <Image
              src="/images/acai-call-center.png"
              alt="ACAI live contractor concierge team"
              fill
              priority
              className="object-cover"
            />

            <div className="pointer-events-none absolute inset-0 acai-premium-glow" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/65" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.8)]" />
            <div className="pointer-events-none absolute inset-0 acai-vignette-soft" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="acai-light-streak acai-light-streak-one" />
              <div className="acai-light-streak acai-light-streak-two" />
              <span className="acai-float-particle left-[14%] top-[30%]" />
              <span className="acai-float-particle left-[32%] top-[62%]" />
              <span className="acai-float-particle left-[58%] top-[36%]" />
              <span className="acai-float-particle left-[78%] top-[54%]" />
              <span className="acai-float-particle left-[88%] top-[28%]" />
            </div>

            <div className="pointer-events-none absolute left-0 right-0 top-4 overflow-hidden px-4">
              <div className="acai-ticker-track flex min-w-max items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-neutral-200/35 sm:text-xs">
                {[...tickerItems, ...tickerItems].map((item, index) => (
                  <span key={`${item}-${index}`} className="whitespace-nowrap">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="acai-logo-shimmer text-5xl font-semibold tracking-[0.35em] text-white/20 md:text-7xl">
                ACAI
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex h-full flex-col justify-between gap-5">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-2xl bg-black/45 p-[1px] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/45 via-purple-500/45 to-blue-500/45 opacity-55 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative rounded-2xl border border-white/10 bg-black/65 p-6 pl-8 backdrop-blur-xl transition-all duration-300 group-hover:shadow-[0_16px_45px_rgba(59,130,246,0.22)]">
                  <div className="pointer-events-none absolute bottom-5 left-3 top-5 w-[2px] rounded-full bg-gradient-to-b from-red-400/70 via-purple-400/80 to-blue-400/70 opacity-70 blur-[0.4px] transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_14px_rgba(123,0,255,0.6)]" />
                  <h3 className="text-2xl font-semibold tracking-wide text-white">{card.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-neutral-300">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mx-auto mt-20 max-w-4xl text-center"
      >
        <h2 className="text-4xl font-semibold leading-[1.45] tracking-[0.16em] text-white md:text-6xl md:leading-[1.6]">
          <span className="block">Real People.</span>
          <span className="block">Real Conversations.</span>
          <span className="block">Real Revenue.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-3xl text-lg font-light leading-9 text-neutral-300 md:text-2xl md:leading-10">
          Our 24/7 concierge team answers, qualifies, and routes every call so you never lose another job.
        </p>
      </motion.div>
    </section>
  );
}
