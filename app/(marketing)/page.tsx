import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Background } from "@/components/background";
import { ContractorConciergeSection } from "@/components/contractor-concierge-section";
import { CallRevenueFlowSection } from "@/components/call-revenue-flow-section";
import { ContactForm } from "@/components/contact";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Top background */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>

      <Container className="relative z-20 flex min-h-screen flex-col pb-24">
        <Hero />

        <CallRevenueFlowSection />

        <section className="mx-auto mt-16 w-full max-w-4xl px-4 md:mt-24">
          <div className="rounded-2xl border border-white/15 bg-black/45 px-6 py-8 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_0_28px_rgba(78,64,170,0.16)] md:px-10">
            <p className="text-lg font-medium leading-relaxed text-neutral-200 md:text-2xl">
              Companies that respond to leads within an hour can see up to a{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text font-semibold text-transparent">
                391%
              </span>{" "}
              increase in conversions.
            </p>
          </div>
        </section>

        <ContractorConciergeSection />

        <section className="relative z-20 mx-auto mt-20 w-full max-w-6xl px-4 md:mt-28">
          <div className="grid grid-cols-1 items-start gap-10 rounded-[2rem] border border-white/10 bg-black/45 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_0_34px_rgba(76,54,186,0.2)] backdrop-blur-xl md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-300/70 md:text-sm">Next Step</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
                See how many leads you&apos;re missing
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-300 md:text-lg">
                We&apos;ll map your inbound process, show exactly where revenue is leaking, and build a practical automation plan around your team.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-200 md:text-base">
                <li>Response speed and handoff bottlenecks</li>
                <li>Qualification and booking leakage points</li>
                <li>Clear path to more booked jobs from existing demand</li>
              </ul>
            </div>

            <div id="contact-form" className="scroll-mt-28">
              <ContactForm />
            </div>
          </div>
        </section>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
}
