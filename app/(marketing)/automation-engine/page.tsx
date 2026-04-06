import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Link } from "next-view-transitions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automation Engine | ACAI AI",
  description:
    "ACAI Automation Engine connects capture, qualification, routing, and booking so your team can convert more leads without response delays.",
};

export default function AutomationEnginePage() {
  return (
    <div className="relative overflow-hidden py-24 md:py-0">
      <Background />
      <Container className="relative z-20 pb-24 md:pt-36">
        <section className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-300/70">Automation Engine</p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Route Faster. Book Faster. Recover Faster.</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg">
            ACAI Automation Engine connects lead capture to qualification and scheduling so no opportunity gets stuck in limbo.
          </p>
        </section>

        <section className="mx-auto mt-10 rounded-3xl border border-white/10 bg-black/50 p-7">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-white/5 p-4 text-sm text-neutral-200">Capture</div>
            <div className="rounded-xl bg-white/5 p-4 text-sm text-neutral-200">Qualify</div>
            <div className="rounded-xl bg-white/5 p-4 text-sm text-neutral-200">Route</div>
            <div className="rounded-xl bg-white/5 p-4 text-sm text-neutral-200">Book</div>
          </div>
        </section>

        <Link href="/ai" className="mt-10 inline-flex rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:border-white/35">
          Back to System Hub
        </Link>
      </Container>
    </div>
  );
}
