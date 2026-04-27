import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Link } from "next-view-transitions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Funnel",
  description:
    "Capture more inbound demand with Mica Growth Web Funnel, an instant follow up system that prioritizes intent and routes qualified leads faster.",
};

export default function WebFunnelPage() {
  return (
    <div className="relative overflow-hidden py-24 md:py-0">
      <Background />
      <Container className="relative z-20 pb-24 md:pt-36">
        <section className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-300/70">Web Funnel</p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Convert More Clicks Into Qualified Jobs</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg">
            Mica Growth Web Funnel captures, prioritizes, and routes leads instantly so your team can focus on closing revenue.
          </p>
        </section>

        <section className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/50 p-5">Traffic captured in real time</div>
          <div className="rounded-2xl border border-white/10 bg-black/50 p-5">Intent scored before handoff</div>
          <div className="rounded-2xl border border-white/10 bg-black/50 p-5">Lead status synced continuously</div>
        </section>

        <Link href="/ai" className="mt-10 inline-flex rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:border-white/35">
          Back to System Hub
        </Link>
      </Container>
    </div>
  );
}
