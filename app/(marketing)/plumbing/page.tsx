"use client";

import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Link } from "next-view-transitions";
import { useRetellVoiceDemo } from "@/components/RetellVoiceDemo";
import { motion } from "framer-motion";
import { Mic, Phone, DollarSign, AlertTriangle } from "lucide-react";

const tiers = [
  {
    label: "Tier 1",
    price: "$299/month",
    highlights: [
      "24/7 call handling",
      "Emergency call screening",
      "Missed call recovery text-back",
      "CRM logging and service notes",
    ],
  },
  {
    label: "Tier 2",
    price: "$599/month",
    highlights: [
      "Everything in Tier 1",
      "Emergency routing by urgency",
      "Dispatch integration handoff",
      "Follow-up automation for open jobs",
    ],
  },
  {
    label: "Tier 3",
    price: "Starting at $1299/month",
    highlights: [
      "Everything in Tier 2",
      "Priority emergency escalation",
      "Advanced dispatch logic",
      "Deep CRM logging + reporting",
    ],
  },
];

export default function PlumbingPage() {
  const { toggleConversation, isConversationActive, isLoading } = useRetellVoiceDemo("plumbing");

  const micStyle = isConversationActive
    ? "bg-green-500 shadow-[0_0_24px_rgba(34,197,94,0.45)]"
    : isLoading
    ? "bg-yellow-500 animate-pulse"
    : "bg-neutral-600";

  const statusText = isConversationActive
    ? "LIVE"
    : isLoading
    ? "Connecting..."
    : "Click to start call";

  const statusColor = isConversationActive
    ? "text-green-400"
    : isLoading
    ? "text-yellow-400"
    : "text-neutral-400";

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center pb-20">
        <div className="relative z-20 mx-auto w-full max-w-4xl py-10 text-center md:pt-40">
          <Heading as="h1" className="text-center">
            The 24/7 Plumbing Concierge Built to Book More Jobs.
          </Heading>
          <Subheading className="mx-auto mt-4 max-w-3xl text-center">
            Answer every call, route emergencies fast, and keep your dispatch board full without adding front desk overhead.
          </Subheading>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
          className="relative z-20 mx-auto mt-6 w-full max-w-3xl px-4"
        >
          <div className="relative w-full rounded-2xl bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] p-[2px] animate-gradient-flow">
            <div
              className={`w-full rounded-2xl bg-black/70 p-8 backdrop-blur-sm transition-all duration-300 md:p-10 ${
                isConversationActive ? "shadow-[0_0_60px_rgba(123,0,255,0.6)]" : "shadow-lg"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-2xl font-bold text-white md:text-3xl">
                  🔧 Plumbing & HVAC Live Demo
                </h3>
                {isConversationActive && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(34,197,94,0.6)]"
                  >
                    <span className="h-3 w-3 rounded-full bg-white animate-pulse"></span>
                    LIVE
                  </motion.span>
                )}
              </div>
              <p className="mb-8 text-base text-neutral-300 md:text-lg">
                This sample call flow shows emergency handling, job qualification, and booking logic for plumbing teams.
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <button
                    onClick={toggleConversation}
                    disabled={isLoading}
                    className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-full ${micStyle} shadow-xl transition-all duration-150 ease-out hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50`}
                    aria-label="Start plumbing voice demo"
                  >
                    <Mic className="h-12 w-12 text-white" />
                  </button>
                  {isConversationActive && (
                    <>
                      <div className="absolute inset-0 scale-125 animate-pulse rounded-full bg-green-500 opacity-30" />
                      <div className="absolute inset-0 scale-150 animate-pulse rounded-full bg-green-500/30 blur-2xl" />
                    </>
                  )}
                </div>
                <div className={`text-center font-semibold transition-all duration-150 ease-out ${statusColor}`}>
                  {statusText}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <section className="relative z-20 mx-auto mt-16 w-full max-w-5xl text-center">
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Plumbers Lose Revenue Every Day.</h2>
          <p className="mx-auto max-w-3xl text-lg text-neutral-400 md:text-xl">
            Missed calls and slow follow-up cost booked jobs. ACAI keeps intake moving 24/7.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/50 p-8 text-center backdrop-blur-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20">
                <Phone className="h-7 w-7 text-red-400" />
              </div>
              <div className="mb-3 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-5xl font-bold text-transparent">
                1 in 3
              </div>
              <p className="mb-3 text-lg font-semibold text-white">Service calls go unanswered during peak hours.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/50 p-8 text-center backdrop-blur-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                <DollarSign className="h-7 w-7 text-green-400" />
              </div>
              <div className="mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-5xl font-bold text-transparent">
                $800+
              </div>
              <p className="mb-3 text-lg font-semibold text-white">Average emergency plumbing job value.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/50 p-8 text-center backdrop-blur-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-500/20">
                <AlertTriangle className="h-7 w-7 text-yellow-400" />
              </div>
              <div className="mb-3 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-5xl font-bold text-transparent">
                70%
              </div>
              <p className="mb-3 text-lg font-semibold text-white">Callers hang up when intake is too slow.</p>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto mt-16 w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-red-900/30 bg-gradient-to-br from-red-950/30 to-black/50 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-center text-2xl font-bold text-red-400">Outdated Call Centers</h3>
              <ul className="space-y-3 text-neutral-300">
                <li className="flex items-start gap-3"><span className="mt-1 text-red-400">✗</span><span>Per-minute pricing that spikes costs</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 text-red-400">✗</span><span>No true emergency routing</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 text-red-400">✗</span><span>Delayed callbacks and weak follow-up</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 text-red-400">✗</span><span>Little dispatch or CRM context</span></li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-purple-950/30 via-blue-950/30 to-black/50 p-8 backdrop-blur-sm">
              <h3 className="relative z-10 mb-6 bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-center text-2xl font-bold text-transparent">
                ACAI Plumbing System
              </h3>
              <ul className="relative z-10 space-y-3 text-neutral-200">
                <li className="flex items-start gap-3"><span className="mt-1 text-green-400">✓</span><span className="font-medium">24/7 call handling and booking</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 text-green-400">✓</span><span className="font-medium">Emergency routing by urgency</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 text-green-400">✓</span><span className="font-medium">Missed call recovery that drives callbacks</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 text-green-400">✓</span><span className="font-medium">Dispatch-ready notes with CRM logging</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto mt-16 w-full max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">Tier Breakdown</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.label} className="rounded-2xl border border-white/10 bg-black/35 p-5 text-left">
                <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">{tier.label}</p>
                <p className="mt-2 text-xl font-bold text-white">{tier.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                  {tier.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button as={Link} href="/pricing" variant="simple" className="rounded-full">
              See Full Pricing Page
            </Button>
          </div>
        </section>

        <motion.section
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-20 mx-auto mt-16 w-full max-w-4xl text-center"
        >
          <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Stop losing plumbing jobs to missed calls.
            <br />
            Start booking more emergencies and estimates with ACAI.
          </h3>
          <Button as={Link} href="/contact" variant="simple" className="mt-6 rounded-full px-8 py-4 text-lg font-semibold">
            Book a Demo
          </Button>
        </motion.section>
      </Container>
    </div>
  );
}
