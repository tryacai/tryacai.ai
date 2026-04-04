"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useState } from "react";

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
  },
  {
    title: "Chat Widget",
    body: "Engages instantly when visitors have intent but hesitate to call.",
  },
  {
    title: "Voice AI",
    body: "Answers, qualifies, and handles callers when your team is unavailable.",
  },
  {
    title: "Automation Engine",
    body: "Routes qualified leads and books next steps without delay.",
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
  const [lossEstimate, setLossEstimate] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  useEffect(() => {
    const rotation = setInterval(() => {
      setActiveCard((previous) => (previous + 1) % systemCards.length);
    }, 3200);

    return () => clearInterval(rotation);
  }, []);

  const formattedLoss = useMemo(() => {
    if (lossEstimate === null) {
      return "$0";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(lossEstimate);
  }, [lossEstimate]);

  const onRoiSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const monthlyLeads = Number(roiValues.monthlyLeads) || 0;
    const averageJobValue = Number(roiValues.averageJobValue) || 0;
    const missedCallPercent = Number(roiValues.missedCallPercent) || 0;

    const estimate = monthlyLeads * averageJobValue * Math.min(Math.max(missedCallPercent, 0), 100) / 100;
    setLossEstimate(estimate);
  };

  const onLeadAnalysisSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingForm(true);
    setFormError(null);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    try {
      const response = await fetch("https://formspree.io/f/maqyarlv", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Unable to submit right now. Please try again.");
      }

      setFormSubmitted(true);
      formElement.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit right now. Please try again.";
      setFormError(message);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <section className="relative z-20 mx-auto mt-12 w-full max-w-6xl px-4 md:mt-16">
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

            <form onSubmit={onRoiSubmit} className="mt-7 grid gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 md:grid-cols-3 md:p-5">
              <label className="text-sm text-neutral-300">
                Monthly leads
                <input
                  type="number"
                  min={0}
                  value={roiValues.monthlyLeads}
                  onChange={(event) => setRoiValues((previous) => ({ ...previous, monthlyLeads: Number(event.target.value) }))}
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-white outline-none transition focus:border-purple-400/60"
                />
              </label>
              <label className="text-sm text-neutral-300">
                Average job value
                <input
                  type="number"
                  min={0}
                  value={roiValues.averageJobValue}
                  onChange={(event) => setRoiValues((previous) => ({ ...previous, averageJobValue: Number(event.target.value) }))}
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-white outline-none transition focus:border-purple-400/60"
                />
              </label>
              <label className="text-sm text-neutral-300">
                Missed call %
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={roiValues.missedCallPercent}
                  onChange={(event) => setRoiValues((previous) => ({ ...previous, missedCallPercent: Number(event.target.value) }))}
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-white outline-none transition focus:border-purple-400/60"
                />
              </label>
              <div className="md:col-span-3 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Calculate Revenue Loss
                </button>
                <p className="text-sm text-neutral-300">
                  You could be losing <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text font-semibold text-transparent">{formattedLoss}/month</span> in missed opportunities.
                </p>
              </div>
            </form>
          </div>

          <div className="relative">
            <div className="absolute inset-x-10 top-8 h-40 rounded-full bg-gradient-to-r from-blue-500/15 via-purple-500/25 to-red-500/15 blur-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-black/55 p-4 md:p-6">
              <div className="pointer-events-none absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-blue-400/70 via-purple-400/55 to-red-400/70" />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.9),0_0_30px_rgba(96,70,255,0.65)]"
                animate={{ y: [0, 355, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
                    <div className="rounded-xl border border-white/10 bg-black/65 px-3 py-2.5 text-center">
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

          <div className="relative h-44">
            <AnimatePresence mode="wait">
              <motion.div
                key={systemCards[activeCard].title}
                initial={{ opacity: 0, y: 24, rotate: -1.8 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -18, rotate: 1.5 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="absolute inset-0 rounded-2xl border border-white/12 bg-black/55 p-6 shadow-[0_12px_28px_rgba(0,0,0,0.34)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/70">System Card</p>
                <h4 className="mt-3 text-2xl font-semibold text-white">{systemCards[activeCard].title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-neutral-300 md:text-base">{systemCards[activeCard].body}</p>
              </motion.div>
            </AnimatePresence>
            <div className="absolute -bottom-4 left-4 right-4 flex gap-2">
              {systemCards.map((card, index) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setActiveCard(index)}
                  className={`h-1.5 flex-1 rounded-full transition ${index === activeCard ? "bg-gradient-to-r from-blue-400 via-purple-400 to-red-400" : "bg-white/20"}`}
                  aria-label={`Show ${card.title} card`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-8 border-t border-white/10 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
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
          </div>

          <div id="contact-form" className="scroll-mt-28 rounded-2xl border border-white/10 bg-black/50 p-5 md:p-6">
            {formSubmitted ? (
              <div className="space-y-3 py-8 text-center">
                <h4 className="text-2xl font-semibold text-white">Thanks, your analysis request is in.</h4>
                <p className="text-sm text-neutral-300">Our team will review your details and reach out with next steps.</p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/35"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={onLeadAnalysisSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <label className="text-sm text-neutral-300">
                  Name
                  <input required name="name" className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-white outline-none transition focus:border-purple-400/60" />
                </label>
                <label className="text-sm text-neutral-300">
                  Email
                  <input required type="email" name="email" className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-white outline-none transition focus:border-purple-400/60" />
                </label>
                <label className="text-sm text-neutral-300">
                  Phone
                  <input required name="phone" className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-white outline-none transition focus:border-purple-400/60" />
                </label>
                <label className="text-sm text-neutral-300">
                  Company
                  <input required name="company" className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-white outline-none transition focus:border-purple-400/60" />
                </label>
                <label className="text-sm text-neutral-300">
                  Industry
                  <input required name="industry" className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-white outline-none transition focus:border-purple-400/60" />
                </label>
                <label className="text-sm text-neutral-300">
                  Call volume
                  <input required name="call_volume" className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-white outline-none transition focus:border-purple-400/60" />
                </label>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmittingForm}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmittingForm ? "Submitting..." : "Get My Lead Analysis"}
                  </button>
                  {formError && <p className="mt-2 text-sm text-red-300">{formError}</p>}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
