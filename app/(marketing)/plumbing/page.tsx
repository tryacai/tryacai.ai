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

const realProblem = [
  "Speed-to-lead decay",
  "Technicians interrupted",
  "No differentiation between $200 and $15,000 jobs",
  "Software fatigue",
];

const whyAcai = [
  "Speed-to-Lead SLA",
  "Zero Implementation Drag",
  "High-Ticket Qualification Logic",
  "Continuous QA & Optimization",
];

const tiers = [
  {
    label: "Tier 1",
    price: "$299/month",
    highlights: [
      "24/7 call answering",
      "Basic lead triage",
      "Booking handoff",
      "After-hours coverage",
    ],
  },
  {
    label: "Tier 2",
    price: "$599/month",
    highlights: [
      "Missed-call text recovery",
      "Automated estimate follow-up",
      "Review request automation",
      "Retention sequences",
    ],
  },
  {
    label: "Tier 3",
    price: "Starting at $1199/month",
    highlights: [
      "Advanced quote routing",
      "Multi-location orchestration",
      "Dedicated optimization support",
      "Priority workflows",
    ],
  },
];

export default function PlumbingPage() {
  const { toggleConversation, isConversationActive, isLoading } = useRetellVoiceDemo('plumbing');

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
            Stop Losing Plumbing Jobs to Missed Calls.
          </Heading>
          <Subheading className="mx-auto mt-4 max-w-2xl text-center">
            White-glove voice agent built to turn missed calls into booked jobs.
          </Subheading>
        </div>

        {/* Plumbing & HVAC Live Demo */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
          className="relative z-20 mx-auto mt-8 w-full max-w-3xl px-4"
        >
          <div className="relative w-full p-[2px] rounded-2xl bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] animate-gradient-flow">
            <div className={`w-full bg-black/70 backdrop-blur-sm rounded-2xl p-8 md:p-10 transition-all duration-300 ${
              isConversationActive ? "shadow-[0_0_60px_rgba(123,0,255,0.6)]" : "shadow-lg"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                  🔧 Plumbing & HVAC Live Demo
                </h3>
                {isConversationActive && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.6)]"
                  >
                    <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                    LIVE
                  </motion.span>
                )}
              </div>
              <p className="text-base md:text-lg text-neutral-300 mb-8">
                Experience our AI receptionist handling emergency plumbing calls, scheduling repairs, and capturing high-value leads 24/7.
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <button
                    onClick={toggleConversation}
                    disabled={isLoading}
                    className={`w-24 h-24 rounded-full ${micStyle} flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-150 ease-out focus:outline-none focus:ring-4 focus:ring-purple-500/50 active:scale-95 relative z-10 disabled:opacity-50 disabled:cursor-not-allowed`}
                    aria-label="Start plumbing voice demo"
                  >
                    <Mic className="w-12 h-12 text-white" />
                  </button>
                  {isConversationActive && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-pulse scale-125" />
                      <div className="absolute inset-0 rounded-full bg-green-500/30 blur-2xl scale-150 animate-pulse" />
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

        {/* Revenue Loss Section */}
        <section className="relative z-20 mx-auto mt-16 w-full max-w-5xl text-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Plumbers Lose Revenue Every Single Day.
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto">
              Missed calls. Outdated call centers. Complicated phone menus. Customers hang up.
            </p>
          </motion.div>

          {/* Stat Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm p-8 text-center"
            >
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                <Phone className="w-7 h-7 text-red-400" />
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-3">
                1 in 3
              </div>
              <p className="text-lg font-semibold text-white mb-3">
                Plumbing & HVAC calls go unanswered during peak hours.
              </p>
              <p className="text-sm text-neutral-400">
                Industry estimates show missed calls are one of the top causes of lost service revenue.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm p-8 text-center"
            >
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-green-400" />
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3">
                $800+
              </div>
              <p className="text-lg font-semibold text-white mb-3">
                Average emergency plumbing job value.
              </p>
              <p className="text-sm text-neutral-400">
                One missed after-hours call can mean thousands lost per week.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm p-8 text-center"
            >
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-yellow-400" />
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent mb-3">
                70%
              </div>
              <p className="text-lg font-semibold text-white mb-3">
                Customers hang up if they hit an automated phone maze.
              </p>
              <p className="text-sm text-neutral-400">
                No one wants to &quot;Press 1 for this. Press 2 for that.&quot;
              </p>
            </motion.div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="relative z-20 mx-auto mt-16 w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Outdated Call Centers */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-red-900/30 bg-gradient-to-br from-red-950/30 to-black/50 backdrop-blur-sm p-8"
            >
              <h3 className="text-2xl font-bold text-red-400 mb-6 text-center">
                Outdated Call Centers
              </h3>
              <ul className="space-y-3 text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Per-minute pricing that adds up fast</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Overseas agents reading scripts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>No emergency prioritization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>No real customization for your services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Customers stuck in phone menus</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Slow message relays</span>
                </li>
              </ul>
            </motion.div>

            {/* ACAI Plumbing System */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/20 bg-gradient-to-br from-purple-950/30 via-blue-950/30 to-black/50 backdrop-blur-sm p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent pointer-events-none" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-transparent mb-6 text-center relative z-10">
                ACAI Plumbing Concierge System
              </h3>
              <ul className="space-y-3 text-neutral-200 relative z-10">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="font-medium">24/7 live + AI hybrid answering</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="font-medium">Emergency vs standard call routing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="font-medium">Custom-built for YOUR services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="font-medium">Real-time text alerts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="font-medium">Seamless CRM logging</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="font-medium">Designed specifically for plumbing companies</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Closing CTA Section */}
        <motion.section
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-20 mx-auto mt-16 w-full max-w-4xl text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Stop paying for outdated answering services.<br />
            Start capturing every emergency, every estimate, every opportunity.
          </h3>
          <Button
            as="a"
            href="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            variant="simple"
            className="mt-6 rounded-full px-8 py-4 text-lg font-semibold"
          >
            See How It Works
          </Button>
        </motion.section>

        {/* Spacer for visual */}
        <div className="h-24" />

        <section className="relative z-20 mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/10 bg-black/35 p-7">
          <h2 className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-2xl font-semibold text-transparent">
            The Real Problem
          </h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 text-sm text-neutral-300 md:grid-cols-2">
            {realProblem.map((item) => (
              <li key={item} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3">• {item}</li>
            ))}
          </ul>
        </section>

        <section className="relative z-20 mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/10 bg-black/35 p-7">
          <h2 className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-2xl font-semibold text-transparent">
            Why ACAI
          </h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 text-sm text-neutral-200 md:grid-cols-2">
            {whyAcai.map((item) => (
              <li key={item} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-medium">{item}</li>
            ))}
          </ul>
        </section>

        <section className="relative z-20 mx-auto mt-8 w-full max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">
            Tier Breakdown for Plumbing
          </h2>
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

        <section className="relative z-20 mx-auto mt-10 w-full max-w-5xl rounded-2xl border border-white/10 bg-black/35 p-7 text-center">
          <h2 className="text-2xl font-semibold text-white">Powered by the ACAI System</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            Capture inbound demand fast, recover missed opportunities automatically,
            and optimize routing for higher-value plumbing jobs.
          </p>
          <div className="mt-6 flex justify-center">
            <Button as={Link} href="/solutions" variant="simple" className="rounded-full">
              Explore Capture → Recover → Optimize
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
