"use client";

import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Link } from "next-view-transitions";
import { useRetellVoiceDemo } from "@/components/RetellVoiceDemo";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { ScalingLadder } from "@/components/scaling-ladder";

export default function AiPage() {
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
            ACAI AI Voice System
          </Heading>
          <Subheading className="mx-auto mt-4 max-w-3xl text-center">
            Preview how our AI assistant handles contractor calls.
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

        <section className="relative z-20 mx-auto mt-16 w-full max-w-5xl px-4">
          <h2 className="text-center text-3xl font-bold text-white md:text-4xl">Why Add AI?</h2>
          <ul className="mx-auto mt-8 max-w-3xl space-y-3 text-lg text-neutral-200">
            <li>• Lower cost than traditional per-minute call centers</li>
            <li>• Handles overflow and after-hours</li>
            <li>• Works alongside our live concierge team</li>
            <li>• Fully customized to your operations</li>
          </ul>
        </section>

        <section className="relative z-20 mx-auto mt-16 w-full max-w-6xl px-4">
          <h2 className="mb-6 text-center text-3xl font-bold text-white md:text-4xl">Traditional Call Centers vs ACAI AI</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-red-900/30 bg-gradient-to-br from-red-950/30 to-black/50 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-center text-2xl font-bold text-red-400">Traditional Call Centers</h3>
              <ul className="space-y-3 text-neutral-300">
                <li className="flex items-start gap-3"><span className="mt-1 text-red-400">✗</span><span>Per-minute billing</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 text-red-400">✗</span><span>Script readers</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 text-red-400">✗</span><span>No intelligent routing</span></li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-purple-950/30 via-blue-950/30 to-black/50 p-8 backdrop-blur-sm">
              <h3 className="mb-6 bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-center text-2xl font-bold text-transparent">
                ACAI AI
              </h3>
              <ul className="space-y-3 text-neutral-200">
                <li className="flex items-start gap-3"><span className="mt-1 text-green-400">✓</span><span className="font-medium">Fixed monthly structure</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 text-green-400">✓</span><span className="font-medium">Intelligent job classification</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 text-green-400">✓</span><span className="font-medium">Integrated with dispatch and CRM</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto mt-12 w-full max-w-7xl px-4 md:mt-16">
          <ScalingLadder />
        </section>

        <section className="relative z-20 mx-auto mt-16 w-full max-w-4xl text-center">
          <Button as={Link} href="/contact" variant="simple" className="rounded-full px-8 py-4 text-lg font-semibold">
            Book a Strategy Call
          </Button>
        </section>
      </Container>
    </div>
  );
}
