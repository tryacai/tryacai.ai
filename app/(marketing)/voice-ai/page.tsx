"use client";

import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { useRetellVoiceDemo } from "@/components/RetellVoiceDemo";
import { Link } from "next-view-transitions";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export default function VoiceAiPage() {
  const { toggleConversation, isConversationActive, isLoading } = useRetellVoiceDemo("acai");

  const statusText = isConversationActive ? "Live call simulation active" : isLoading ? "Connecting concierge..." : "Try the ACAI Concierge";

  return (
    <div className="relative overflow-hidden py-24 md:py-0">
      <Background />
      <Container className="relative z-20 pb-24 md:pt-36">
        <section className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-300/70">Voice AI</p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Try the ACAI Concierge™</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg">
            Simulate a real inbound call experience and see how ACAI answers, qualifies, and routes opportunities instantly.
          </p>
        </section>

        <section className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-black/50 p-7">
            <p className="text-sm uppercase tracking-[0.16em] text-neutral-400">Call Simulation UI</p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-xl bg-white/5 p-4 text-neutral-200">Caller intent detected</div>
              <div className="rounded-xl bg-white/5 p-4 text-neutral-200">Qualification logic running</div>
              <div className="rounded-xl bg-white/5 p-4 text-neutral-200">Routing recommendation prepared</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-black/55 p-7"
          >
            <p className="text-sm uppercase tracking-[0.16em] text-neutral-400">Interactive Demo</p>
            <div className="mt-8 flex flex-col items-center gap-5">
              <button
                onClick={toggleConversation}
                disabled={isLoading}
                className={`relative flex h-24 w-24 items-center justify-center rounded-full text-white transition ${isConversationActive ? "bg-green-500 shadow-[0_0_24px_rgba(34,197,94,0.5)]" : "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 shadow-[0_0_28px_rgba(122,88,255,0.4)]"}`}
                aria-label="Try ACAI Concierge demo"
              >
                <Mic className="h-10 w-10" />
              </button>
              <p className="text-center text-sm text-neutral-200">{statusText}</p>
            </div>
          </motion.div>
        </section>

        <Link href="/ai" className="mt-10 inline-flex rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:border-white/35">
          Back to System Hub
        </Link>
      </Container>
    </div>
  );
}
