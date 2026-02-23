"use client";

import { motion } from "framer-motion";
import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Link } from "next-view-transitions";

const whoFor = [
  "Multi-location operators",
  "High-volume dispatch teams",
  "Owners who value time over cost",
];

const different = [
  "Dedicated infrastructure specialist",
  "Custom SOP development",
  "Advanced quote routing",
  "Multi-location orchestration",
  "Ongoing optimization + QA",
];

export default function TierThreePage() {
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
          <div className="inline-flex items-center rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
            Tier 3
          </div>
          <Heading as="h1" className="mt-6 text-center">
            This Isn&apos;t Software. It&apos;s Infrastructure.
          </Heading>
          <Subheading className="mx-auto mt-4 max-w-2xl text-center">
            Premium, controlled, and built for operators who need strategic execution — not another DIY tool.
          </Subheading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="relative z-20 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2"
        >
          <section className="rounded-2xl border border-amber-300/30 bg-neutral-900 p-7">
            <h2 className="bg-gradient-to-r from-[#f6e6b4] via-[#d9bd7c] to-[#b8924c] bg-clip-text text-2xl font-semibold text-transparent">
              Who It&apos;s For
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-neutral-200">
              {whoFor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-amber-300/30 bg-neutral-900 p-7">
            <h2 className="bg-gradient-to-r from-[#f6e6b4] via-[#d9bd7c] to-[#b8924c] bg-clip-text text-2xl font-semibold text-transparent">
              What Makes It Different
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-neutral-200">
              {different.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="relative z-20 mt-12 w-full max-w-4xl rounded-2xl border border-amber-300/30 bg-neutral-900 p-7 text-center"
        >
          <p className="text-sm uppercase tracking-[0.14em] text-amber-100">Premium • Controlled • Confident</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as={Link} href="/schedule-demo" className="rounded-full bg-gradient-to-r from-[#ff1a1a] via-[#a100ff] to-[#004cff]">
              Request Priority Consultation
            </Button>
            <Button as={Link} href="/pricing" variant="simple" className="rounded-full border-neutral-600 text-white hover:border-neutral-300">
              See Industry Pricing
            </Button>
          </div>
        </motion.section>
      </Container>
    </div>
  );
}
