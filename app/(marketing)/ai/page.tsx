"use client";

import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    number: "01",
    title: "Speed to Lead",
    description: "Responds to every inbound lead in seconds via call or text.",
    detail: "First response wins. ACAI makes sure that\u2019s always you.",
  },
  {
    number: "02",
    title: "Lead Qualification",
    description: "AI filters serious buyers automatically. Only hot leads reach you.",
    detail: "Budget, timeline, and intent scored before you ever pick up.",
  },
  {
    number: "03",
    title: "Auto Booking",
    description: "Appointments land on your calendar. No back-and-forth.",
    detail: "Qualified leads convert straight to confirmed bookings.",
  },
  {
    number: "04",
    title: "24/7 Voice Receptionist",
    description: "Never miss a call. Your AI answers, qualifies, and routes.",
    detail: "After hours, weekends, holidays \u2014 always covered.",
  },
] as const;

function PathwayNode({
  feature,
  index,
  isLast,
}: {
  feature: (typeof features)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      {index > 0 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className="mb-6 h-20 w-px origin-top md:h-28"
          style={{ background: "linear-gradient(to bottom, rgba(168,85,247,0.5), rgba(168,85,247,0.15))" }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
        className="group relative w-full max-w-lg cursor-default"
      >
        <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-purple-500/0 blur-2xl transition-all duration-500 group-hover:bg-purple-500/[0.07]" />

        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/50 px-7 py-7 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-purple-400/30 group-hover:shadow-[0_16px_48px_rgba(168,85,247,0.12)] md:px-10 md:py-9">
          <span className="pointer-events-none absolute right-5 top-3 select-none text-[5.5rem] font-black leading-none text-white/[0.03] transition-colors duration-300 group-hover:text-purple-400/[0.06] md:text-[7rem]">
            {feature.number}
          </span>

          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-400/70">
              {feature.number}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              {feature.title}
            </h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-neutral-300">
              {feature.description}
            </p>

            <div className="mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-4 group-hover:max-h-16 group-hover:opacity-100">
              <p className="text-sm leading-relaxed text-purple-200/60">
                {feature.detail}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          className="mt-6 h-20 w-px origin-top md:h-28"
          style={{ background: "linear-gradient(to bottom, rgba(168,85,247,0.15), rgba(168,85,247,0.5))" }}
        />
      )}
    </div>
  );
}

export default function AcaiSystemPage() {
  return (
    <div className="relative overflow-hidden py-24 md:py-0">
      <Background />
      <Container className="relative z-20 pb-24 md:pt-36">
        {/* Hero */}
        <section className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-semibold leading-tight text-white md:text-7xl"
          >
            The ACAI System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 text-xl font-medium text-neutral-200 md:text-2xl"
          >
            Everything Running. Nothing Missed.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-3 text-base text-neutral-400 md:text-lg"
          >
            Your full AI system from first response to booked job.
          </motion.p>
        </section>

        {/* Animated Pathway */}
        <section className="mx-auto mt-24 flex w-full max-w-2xl flex-col items-center md:mt-32">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-2 h-2.5 w-2.5 rounded-full bg-purple-500/50 shadow-[0_0_16px_rgba(168,85,247,0.5)]"
          />

          {features.map((feature, index) => (
            <PathwayNode
              key={feature.number}
              feature={feature}
              index={index}
              isLast={index === features.length - 1}
            />
          ))}

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-8 h-2.5 w-2.5 rounded-full bg-purple-500/50 shadow-[0_0_16px_rgba(168,85,247,0.5)]"
          />
        </section>
      </Container>
    </div>
  );
}
