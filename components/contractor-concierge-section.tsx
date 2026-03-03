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
  Sparkles,
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
    <section className="relative z-10 -mt-2 w-full max-w-7xl px-4 md:-mt-3">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.48, ease: "easeOut" }}
        className="relative mx-auto max-w-[760px] text-center"
      >
        <div className="pointer-events-none absolute left-1/2 top-2 h-20 w-56 -translate-x-1/2 rounded-full bg-gradient-to-r from-red-500/10 via-purple-500/16 to-blue-500/10 blur-3xl" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.26em] text-purple-300/70 md:text-sm">LIVE CONTRACTOR CONCIERGE</p>
        <p className="relative mx-auto mt-3 max-w-[720px] text-sm leading-6 text-neutral-300 md:text-base">
          Every call answered. Every emergency routed. Every job qualified.
        </p>
      </motion.div>

      <div className="mt-5 grid grid-cols-1 gap-6 md:mt-6 lg:grid-cols-2 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-1 lg:-mt-6"
        >
          <div className="mb-4 md:mb-5">
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">Real People Behind Every Call.</h2>
            <h3 className="mt-2 text-xl font-medium leading-tight text-neutral-200 md:text-3xl">Built to Capture Revenue, Not Just Messages.</h3>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-5 rounded-[2.2rem] bg-gradient-to-r from-red-500/20 via-purple-500/30 to-blue-500/24 blur-2xl animate-pulse" />
            <motion.div
              whileHover={{ rotateX: 1.8, rotateY: -2.4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="group relative min-h-[340px] overflow-hidden rounded-3xl border border-white/20 bg-black/55 shadow-[0_24px_60px_rgba(20,20,40,0.55)] [transform-style:preserve-3d] md:min-h-[600px]"
            >
              <Image
                src="/NEWcallcenter.png"
                alt="ACAI live contractor concierge team"
                fill
                priority
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/12 to-black/60" />
              <div className="pointer-events-none absolute inset-0 acai-scan-overlay opacity-35" />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),inset_0_0_120px_rgba(0,0,0,0.65)]" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          className="order-2"
        >
          <div className="rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl md:p-5">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Concierge features">
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
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
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

            <div className="mt-4 min-h-[150px] rounded-2xl border border-white/12 bg-black/55 p-5" role="tabpanel" id={`feature-panel-${activeFeature.id}`} aria-labelledby={`feature-tab-${activeFeature.id}`}>
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

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/35 p-4">
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl border border-white/14 bg-black/55 p-6 text-center shadow-[0_20px_60px_rgba(20,20,40,0.45)] md:mt-10 md:p-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/16 to-blue-500/10" />
        <div className="pointer-events-none absolute inset-0 acai-cta-particles" />

        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-red-500/25 via-purple-500/25 to-blue-500/25 text-white"
        >
          <Sparkles className="h-5 w-5" />
        </motion.div>
        <h3 className="relative text-3xl font-semibold text-white md:text-4xl">Ready to See Concierge in Action?</h3>

        <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="acai-cta-shine relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 px-8 py-3 text-base font-semibold text-white"
          >
            <span className="relative z-10">Book a Strategy Call</span>
          </Link>
          <Link
            href="/ai"
            className="inline-flex items-center justify-center rounded-full border border-white/16 bg-black/45 px-6 py-3 text-sm font-medium text-neutral-200 transition-colors duration-200 hover:text-white"
          >
            See a Live Call Example
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
