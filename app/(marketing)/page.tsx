import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Background } from "@/components/background";
import { CallRevenueFlowSection } from "@/components/call-revenue-flow-section";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <h1 className="sr-only">Try ACAI Marketing | Floor Coating Marketing Agency</h1>
      <p className="sr-only">
        ACAI Marketing is the #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs, AI-powered lead follow-up, and results in your first month.
      </p>

      {/* Top background */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>

      <Container className="relative z-20 flex min-h-screen flex-col pb-24">
        <Hero />

        <section className="relative z-20 mx-auto mt-1 w-full max-w-6xl px-4 md:mt-2">
          <div className="overflow-hidden rounded-full border border-white/10 bg-black/35">
            <div className="acai-signal-bg" aria-hidden />
            <div className="acai-pulse-banner-track flex min-w-max items-center gap-10 px-5 py-2">
              {["24/7/365 AI coverage", "Under 1 second response time", "Instant lead recovery", "Missed-lead follow-up in seconds", "Full visibility into every interaction", "24/7/365 AI coverage", "Under 1 second response time", "Instant lead recovery", "Missed-lead follow-up in seconds", "Full visibility into every interaction"].map((item, index) => (
                <div key={`${item}-${index}`} className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-neutral-200 md:text-sm">
                  <span className="acai-voice-wave" aria-hidden>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CallRevenueFlowSection />
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
}
