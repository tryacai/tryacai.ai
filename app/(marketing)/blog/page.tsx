import type { Metadata } from "next";
import { Background } from "@/components/background";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Why ACAI",
  description:
    "ACAI was built to solve one core problem: service businesses losing revenue from slow response times and missed follow-ups.",
  openGraph: {
    images: ["https://tryacai.ai/opengraph-image.png"],
  },
};

export default function WhyAcaiPage() {
  return (
    <div className="relative overflow-hidden py-24 md:py-0">
      <Background />
      <Container className="relative z-20 pb-24 md:pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-300/70">Why ACAI</p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Why ACAI</h1>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-300 md:text-lg">
            <p>
              ACAI was built to solve one core problem: service businesses losing revenue due to slow response times and missed follow-ups.
            </p>
            <p>
              Most businesses do not lose leads at the ad. They lose them in the gap after the click.
            </p>
            <p>
              ACAI closes that gap with instant response, qualification, and routing.
            </p>
            <p>
              Based in Tampa, Florida, we work closely with service businesses that rely on speed and responsiveness to win jobs.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/50 p-5">
              <p className="text-sm text-neutral-400">Response Advantage</p>
              <p className="mt-2 text-2xl font-semibold text-white">78% of customers choose the first business to respond</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/50 p-5">
              <p className="text-sm text-neutral-400">Conversion Impact</p>
              <p className="mt-2 text-2xl font-semibold text-white">Up to <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">391%</span> increase in conversions with faster response</p>
            </div>
          </div>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="space-y-5 text-neutral-300">
            <p className="text-sm uppercase tracking-[0.22em] text-neutral-400">Why Us</p>
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">The A.C.A.I. Way</h2>
            <p className="text-xl text-white">Always connected. Always authentic. Always invested.</p>
            <p>If our clients are not winning, neither are we.</p>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-black/45 p-5 text-neutral-300">
            <p>Phone: 848-253-9552</p>
            <p className="mt-2">Email: support@tryacai.ai</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
