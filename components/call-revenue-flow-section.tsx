"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { useEffect, useMemo, useState } from "react";

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

const systemCards = [
  {
    title: "Web Funnel",
    body: "Captures leads from paid traffic and landing pages before they drop.",
    href: "/web-funnel",
  },
  {
    title: "Chat Widget",
    body: "Engages instantly when visitors have intent but hesitate to call.",
    href: "/chat-widget",
  },
  {
    title: "Voice AI",
    body: "Answers, qualifies, and handles callers when your team is unavailable.",
    href: "/voice-ai",
  },
  {
    title: "Automation Engine",
    body: "Routes qualified leads and books next steps without delay.",
    href: "/automation-engine",
  },
] as const;

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
  const [activeCard, setActiveCard] = useState(0);
  const [activeFunnelIndex, setActiveFunnelIndex] = useState(0);

  useEffect(() => {
    const rotation = setInterval(() => {
      setActiveCard((previous) => (previous + 1) % systemCards.length);
    }, 3200);

    return () => clearInterval(rotation);
  }, []);

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

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-300/70 md:text-sm">System Understanding</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-white md:text-4xl">
              One connected system that closes every gap
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-300 md:text-lg">
              ACAI combines your capture, response, qualification, and routing into one continuous flow.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {systemCards.map((card, index) => (
              <Link
                key={card.title}
                href={card.href}
                onMouseEnter={() => setActiveCard(index)}
                className={`group rounded-2xl border border-white/12 bg-black/50 p-4 transition-all duration-250 hover:scale-[1.02] hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500/20 hover:via-purple-500/20 hover:to-red-500/20 ${index === activeCard ? "border-transparent bg-gradient-to-r from-blue-500/18 via-purple-500/18 to-red-500/18" : ""}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/70">Product</p>
                <h4 className="mt-2 text-xl font-semibold text-white">{card.title}</h4>
                <p className="mt-2 text-sm text-neutral-300">{card.body}</p>
              </Link>
            ))}
            <div className="md:col-span-2 flex gap-2 pt-1">
              {systemCards.map((card, index) => (
                <span
                  key={card.title}
                  className={`h-1.5 flex-1 rounded-full transition ${index === activeCard ? "bg-gradient-to-r from-blue-400 via-purple-400 to-red-400" : "bg-white/20"}`}
                />
              ))}
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
