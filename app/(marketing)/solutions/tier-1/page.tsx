"use client";

import { motion } from "framer-motion";
import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Link } from "next-view-transitions";

const solves = [
  "Missed calls",
  "After-hours voicemail",
  "Interruptions during jobs",
  "Basic qualification chaos",
];

const included = [
  "24/7 instant pickup",
  "Basic lead qualification",
  "Booking handoff",
  "After-hours coverage",
  "Missed-call protection baseline",
];

export default function TierOnePage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-20 mx-auto w-full max-w-4xl py-10 text-center md:pt-40"
        >
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300">
            Tier 1
          </div>
          <Heading as="h1" className="mt-6 text-center">
            AI Receptionist. Built to Capture Every Opportunity.
          </Heading>
          <Subheading className="mx-auto mt-4 max-w-2xl text-center">
            Simple, always-on call coverage for operators who need reliability without complexity.
          </Subheading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="relative z-20 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2"
        >
          <section className="rounded-2xl border border-white/10 bg-black/35 p-7">
            <h2 className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-2xl font-semibold text-transparent">
              What It Solves
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-neutral-300">
              {solves.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-black/35 p-7">
            <h2 className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-2xl font-semibold text-transparent">
              What&apos;s Included
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-neutral-300">
              {included.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="relative z-20 mt-12 w-full max-w-4xl rounded-2xl border border-white/10 bg-black/35 p-7 text-center"
        >
          <p className="text-lg font-medium text-white">Stop losing money to missed calls.</p>
          <p className="mt-2 text-sm text-neutral-300">Never let voicemail cost you jobs again.</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as={Link} href="/pricing" variant="simple" className="rounded-full">
              See Industry Pricing
            </Button>
            <Button as={Link} href="/schedule-demo" className="rounded-full">
              Schedule Demo
            </Button>
          </div>
        </motion.section>
      </Container>
    </div>
  );
}
