import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Link } from "next-view-transitions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Widget",
  description:
    "Mica Growth Chat Widget helps service businesses convert more leads with instant engagement, qualification, and routing into booked workflows.",
};

export default function ChatWidgetPage() {
  return (
    <div className="relative overflow-hidden py-24 md:py-0">
      <Background />
      <Container className="relative z-20 pb-24 md:pt-36">
        <section className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-300/70">Chat Widget</p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Engage Instantly, Qualify Before They Bounce</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg">
            Mica Growth Chat Widget turns passive visits into conversations and routes high-intent prospects to your team fast.
          </p>
        </section>

        <section className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/50 p-6">
            <h2 className="text-xl font-semibold text-white">Adaptive Prompts</h2>
            <p className="mt-2 text-neutral-300">Prompts adjust based on visitor behavior and service intent.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/50 p-6">
            <h2 className="text-xl font-semibold text-white">Instant Routing</h2>
            <p className="mt-2 text-neutral-300">Qualified leads are passed to booking or live team workflows instantly.</p>
          </div>
        </section>

        <Link href="/ai" className="mt-10 inline-flex rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:border-white/35">
          Back to System Hub
        </Link>
      </Container>
    </div>
  );
}
