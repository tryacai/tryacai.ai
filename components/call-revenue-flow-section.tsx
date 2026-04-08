"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Filter, MessageSquareText, Mic, Settings2, type LucideIcon } from "lucide-react";

const funnelStages = [
  {
    title: "Ad Clicked",
    description: "Traffic lands with intent.",
  },
  {
    title: "Form Filled",
    description: "Lead details are captured.",
  },
  {
    title: "Instant Follow Up",
    description: "Response starts in seconds.",
  },
  {
    title: "Lead Qualified",
    description: "Fit and urgency are scored.",
  },
  {
    title: "Appointment Booked",
    description: "Qualified leads move to calendar.",
  },
  {
    title: "Paying Customer",
    description: "Revenue closes the loop.",
  },
] as const;

const stageWidths = ["100%", "92%", "84%", "76%", "68%", "60%"];

type SystemCard = {
  title: string;
  body: string;
  href: string;
  Icon: LucideIcon;
  accent: string;
};

const systemCards = [
  {
    title: "Automation Engine",
    body: "Routes qualified leads and books next steps.",
    href: "/automation-engine",
    Icon: Settings2,
    accent: "Flow Core",
  },
  {
    title: "Chat Widget",
    body: "Engages visitors the moment intent appears.",
    href: "/chat-widget",
    Icon: MessageSquareText,
    accent: "Intent Signal",
  },
  {
    title: "Voice AI",
    body: "Answers and qualifies when your team can’t.",
    href: "/voice-ai",
    Icon: Mic,
    accent: "Live Response",
  },
  {
    title: "Web Funnel",
    body: "Captures paid traffic before it drops.",
    href: "/web-funnel",
    Icon: Filter,
    accent: "Capture Layer",
  },
] as const satisfies readonly SystemCard[];

const SYSTEM_ROTATE_MS = 3500;

type RoiValues = {
  monthlyLeads: number;
  averageJobValue: number;
  missedCallPercent: number;
};

const initialRoiValues: RoiValues = {
  monthlyLeads: 120,
  averageJobValue: 550,
  missedCallPercent: 22,
};

export function CallRevenueFlowSection() {
  const [roiValues, setRoiValues] = useState<RoiValues>(initialRoiValues);
  const [displayLoss, setDisplayLoss] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [activeFunnelIndex, setActiveFunnelIndex] = useState(0);

  useEffect(() => {
    if (isCardHovered) return;
    const rotation = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % systemCards.length);
    }, SYSTEM_ROTATE_MS);
    return () => clearInterval(rotation);
  }, [isCardHovered]);

  useEffect(() => {
    const ticker = setInterval(() => {
      setActiveFunnelIndex((previous) => (previous + 1) % funnelStages.length);
    }, 1300);

    return () => clearInterval(ticker);
  }, []);

  const lossEstimate = useMemo(() => {
    const monthlyLeads = Number(roiValues.monthlyLeads) || 0;
    const averageJobValue = Number(roiValues.averageJobValue) || 0;
    const missedCallPercent = Number(roiValues.missedCallPercent) || 0;
    return monthlyLeads * averageJobValue * Math.min(Math.max(missedCallPercent, 0), 100) / 100;
  }, [roiValues]);

  useEffect(() => {
    const duration = 380;
    const startValue = displayLoss;
    const delta = lossEstimate - startValue;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayLoss(startValue + delta * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [lossEstimate]);

  const formattedLoss = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(displayLoss);
  }, [displayLoss]);

  return (
    <section className="relative z-20 mx-auto mt-5 w-full max-w-6xl px-4 md:mt-7">
      <div className="rounded-[2.2rem] border border-white/10 bg-black/45 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_0_38px_rgba(78,60,170,0.16)] backdrop-blur-xl md:p-10">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-300/70 md:text-sm">Awareness</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-white md:text-5xl">
              How much revenue are you losing from slow response time?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-300 md:text-lg">
              Most companies don&apos;t lose demand at the ad. They lose it in the gap after the click.
            </p>

            <div className="mt-7 grid gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 md:p-5">
              <label className="text-sm text-neutral-300">
                <div className="mb-2 flex items-center justify-between">
                  <span>Monthly Leads</span>
                  <span className="text-white">{roiValues.monthlyLeads}</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={1000}
                  step={5}
                  value={roiValues.monthlyLeads}
                  onChange={(event) => setRoiValues((previous) => ({ ...previous, monthlyLeads: Number(event.target.value) }))}
                  className="acai-slider"
                />
              </label>

              <label className="text-sm text-neutral-300">
                <div className="mb-2 flex items-center justify-between">
                  <span>Average Job Value</span>
                  <span className="text-white">${roiValues.averageJobValue}</span>
                </div>
                <input
                  type="range"
                  min={150}
                  max={3500}
                  step={25}
                  value={roiValues.averageJobValue}
                  onChange={(event) => setRoiValues((previous) => ({ ...previous, averageJobValue: Number(event.target.value) }))}
                  className="acai-slider"
                />
              </label>

              <label className="text-sm text-neutral-300">
                <div className="mb-2 flex items-center justify-between">
                  <span>Missed Calls %</span>
                  <span className="text-white">{roiValues.missedCallPercent}%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={70}
                  step={1}
                  value={roiValues.missedCallPercent}
                  onChange={(event) => setRoiValues((previous) => ({ ...previous, missedCallPercent: Number(event.target.value) }))}
                  className="acai-slider"
                />
              </label>

              <p className="pt-2 text-sm text-neutral-300 md:text-base">
                You could be losing <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">{formattedLoss}</span>/month in missed opportunities.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-10 top-8 h-40 rounded-full bg-gradient-to-r from-blue-500/15 via-purple-500/25 to-red-500/15 blur-3xl" />
            <div className="relative rounded-2xl bg-black/55 p-4 md:p-6">
              <div className="pointer-events-none absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-blue-400/70 via-purple-400/55 to-red-400/70" />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.9),0_0_30px_rgba(96,70,255,0.65)]"
                animate={{ y: activeFunnelIndex * 63 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />

              <div className="relative flex flex-col items-center gap-3 md:gap-4">
                {funnelStages.map((stage, index) => (
                  <motion.div
                    key={stage.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                    className="relative"
                    style={{ width: stageWidths[index] }}
                  >
                    <div
                      className={`rounded-xl px-3 py-2.5 text-center transition-all duration-300 ${
                        index === activeFunnelIndex
                          ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-red-500/20 shadow-[0_0_20px_rgba(122,88,255,0.25)]"
                          : index < activeFunnelIndex
                            ? "bg-black/45 opacity-70"
                            : "bg-black/35 opacity-95"
                      }`}
                    >
                      <h3 className="text-sm font-semibold text-white md:text-base">{stage.title}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-neutral-300 md:text-sm">{stage.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.6fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400 md:text-sm">System Flow</p>
            <h3 className="mt-2 text-xl font-semibold leading-tight text-white md:text-2xl">
              One connected system that closes every gap
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400 md:text-base">
              Capture, response, qualification, and routing in one continuous flow.
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/8 via-purple-500/8 to-red-500/8 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 md:p-6"
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
              aria-label="ACAI System cards"
            >
              <AnimatePresence mode="wait">
                {systemCards.map((card, index) => {
                  if (index !== activeCardIndex) return null;
                  return (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, x: 40, scale: 0.97 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -40, scale: 0.97 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-500/10">
                        <card.Icon className="h-5 w-5 text-purple-300" strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400/60">{card.accent}</p>
                        <h4 className="mt-0.5 text-lg font-semibold text-white">{card.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-neutral-400">{card.body}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <div className="mt-4 flex gap-2">
                {systemCards.map((card, index) => (
                  <button
                    key={card.title}
                    onClick={() => setActiveCardIndex(index)}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${index === activeCardIndex ? "bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]" : "bg-white/10 hover:bg-white/20"}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <Link
                href="/ai"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-purple-400/30 bg-gradient-to-r from-purple-600/20 via-purple-500/15 to-blue-500/20 px-8 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300 hover:border-purple-400/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:scale-[1.03] md:px-10 md:py-4 md:text-base"
              >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/20 to-red-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">Explore The ACAI System</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-8 border-t border-white/10 pt-10 lg:gap-10">
          <div>
            <p className="text-lg leading-relaxed text-neutral-200 md:text-xl">
              Companies that respond to leads within an hour can see up to a <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text font-semibold text-transparent">391%</span> increase in conversions.
            </p>

            <h3 className="mt-10 text-3xl font-semibold leading-tight text-white md:text-5xl">
              See how ACAI captures this for you
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-300 md:text-lg">
              We&apos;ll map your process and show exactly where revenue is leaking.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-neutral-200 md:text-base">
              <li>Lead response speed diagnostics</li>
              <li>Qualification and routing bottleneck map</li>
              <li>Actionable recovery plan for your team</li>
            </ul>
            <div className="mt-7">
              <Link href="/contact" className="inline-flex rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                Get My Lead Analysis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
