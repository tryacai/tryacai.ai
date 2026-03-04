"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  ClipboardCheck,
  FileText,
  Phone,
  PhoneCall,
  Route,
} from "lucide-react";

const featureItems = [
  {
    id: "answering",
    title: "24/7 Live Call Answering",
    description: "Real trained agents answering every contractor call.",
    icon: PhoneCall,
  },
  {
    id: "routing",
    title: "Emergency Call Routing",
    description: "After-hours and urgent calls prioritized instantly.",
    icon: AlertTriangle,
  },
  {
    id: "qualification",
    title: "High-Value Job Qualification",
    description: "Capture bigger jobs, not just missed voicemails.",
    icon: BadgeCheck,
  },
] as const;

const callFlowItems = [
  { label: "Answer", icon: Phone },
  { label: "Qualify", icon: ClipboardCheck },
  { label: "Route", icon: Route },
  { label: "Log", icon: FileText },
] as const;

export function ContractorConciergeSection() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeFeature = featureItems[activeFeatureIndex];
  const ActiveFeatureIcon = activeFeature.icon;

  const focusTab = (index: number) => {
    const nextIndex = (index + featureItems.length) % featureItems.length;
    setActiveFeatureIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="relative z-10 mt-0 w-full max-w-7xl px-4 md:mt-1">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.48, ease: "easeOut" }}
        className="relative mx-auto max-w-[860px] text-center"
      >
        <div className="mx-auto mb-6 max-w-6xl md:mb-7">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-400/45 to-transparent" />
        </div>
        <p className="relative text-xs font-semibold uppercase tracking-[0.26em] text-purple-300/70 md:text-sm">LIVE CONTRACTOR CONCIERGE</p>
        <h2 className="relative mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">Real People Behind Every Call.</h2>
      </motion.div>

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
                <section className="relative z-10 mt-0 w-full max-w-7xl overflow-hidden px-4 md:mt-1">
                  <motion.div
                    aria-hidden
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 0.28, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="pointer-events-none absolute -top-8 left-0 right-0 h-28 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px]"
                  />

                  <div className="mx-auto mb-6 max-w-6xl md:mb-7">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-400/45 to-transparent" />
                  </div>

                  <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
                    <div className="md:col-span-5">
                      <div className="space-y-1 md:space-y-2">
                        {[
                          { label: "24/7", gradient: true },
                          { label: "Contractor" },
                          { label: "Call" },
                          { label: "Operations" },
                        ].map((item, index) => (
                          <motion.h2
                            key={item.label}
                            initial={{ opacity: 0, x: -32, filter: "blur(4px)" }}
                            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, amount: 0.45 }}
                            transition={{ duration: 0.55, delay: 0.08 * index, ease: "easeOut" }}
                            className={`leading-[0.95] ${
                              item.gradient
                                ? "bg-gradient-to-r from-red-400 via-purple-300 to-blue-300 bg-clip-text text-6xl font-bold text-transparent md:text-8xl"
                                : "text-5xl font-semibold text-white/95 md:text-7xl"
                            }`}
                          >
                            {item.label}
                          </motion.h2>
                        ))}
              priority
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 26, x: 14, filter: "blur(6px)" }}
                      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.62, delay: 0.14, ease: "easeOut" }}
                      className="md:col-span-7 md:pt-4"
                    >
                      <p className="max-w-2xl text-base leading-relaxed text-neutral-200 md:text-lg">
                        Built exclusively for Plumbing & Mechanical Companies.
                      </p>
                      <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-300/85 md:text-lg">
                        Every call answered. Every emergency routed. Every job qualified.
                      </p>

                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
                        className="mt-8"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-purple-300/70 md:text-sm">LIVE CONTRACTOR CONCIERGE</p>
                        <h3 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">Real People Behind Every Call.</h3>
                      </motion.div>
                    </motion.div>
                  </div>
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),inset_0_0_120px_rgba(0,0,0,0.65)]" />
            <div className="acai-command-badge absolute right-4 top-4 rounded-lg border border-white/20 bg-black/55 px-3 py-1.5 text-xs font-medium text-neutral-100 backdrop-blur-md md:right-5 md:top-5">
              Emergency Routed
                    whileInView={{ opacity: 1, y: 0 }}
          </motion.div>
                    transition={{ duration: 0.6, ease: "easeOut" }}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ scale: 0.97, opacity: 0.85 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.45 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
                          y: {
                            duration: 7.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          scale: {
                            duration: 0.75,
                            ease: "easeOut",
                          },
                          opacity: {
                            duration: 0.65,
                            ease: "easeOut",
                          },
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3" role="tablist" aria-label="Concierge features">
              {featureItems.map((feature, index) => {
                const isActive = index === activeFeatureIndex;
                return (
                  <button
                    key={feature.id}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`feature-panel-${feature.id}`}
                    id={`feature-tab-${feature.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveFeatureIndex(index)}
                    onMouseEnter={() => setActiveFeatureIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight") {
                        event.preventDefault();
                        focusTab(index + 1);
                      }
                      if (event.key === "ArrowLeft") {
                        event.preventDefault();
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
