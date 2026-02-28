import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { CTA } from "@/components/cta";
import { SectionDivider } from "@/components/section-divider";
import { SupportedIndustries } from "@/components/supported-industries";
import { SolutionSection } from "@/components/solution-section";
import { ScalingLadder } from "@/components/scaling-ladder";
import { InfrastructureSection } from "@/components/infrastructure-section";
import { HomeConciergeShowcase } from "@/components/home-concierge-showcase";
import { Link } from "next-view-transitions";

export default function Home() {
  return (
    <div className="relative">
      {/* Top background */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>

      <Container className="flex min-h-screen flex-col items-center justify-between">
        <Hero />

        <HomeConciergeShowcase />

        <section className="relative z-10 mx-auto mt-16 w-full max-w-6xl px-4 md:mt-20">
          <h2 className="text-center text-3xl font-semibold text-white md:text-5xl">Why Contractors Choose ACAI</h2>

          <div className="mt-10 space-y-4 md:space-y-5">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/45 p-6 pl-9 transition-all duration-300 hover:shadow-[0_14px_38px_rgba(59,130,246,0.16)]">
              <div className="pointer-events-none absolute bottom-5 left-4 top-5 w-[2px] rounded-full bg-gradient-to-b from-red-400/75 via-purple-400/80 to-blue-400/80" />
              <h3 className="text-2xl font-semibold text-white">Understands Contractor Workflows</h3>
              <p className="mt-3 text-lg leading-relaxed text-neutral-300">
                We know dispatch, emergencies, estimates, and after-hours calls.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/45 p-6 pl-9 transition-all duration-300 hover:shadow-[0_14px_38px_rgba(59,130,246,0.16)]">
              <div className="pointer-events-none absolute bottom-5 left-4 top-5 w-[2px] rounded-full bg-gradient-to-b from-red-400/75 via-purple-400/80 to-blue-400/80" />
              <h3 className="text-2xl font-semibold text-white">No Generic Script Readers</h3>
              <p className="mt-3 text-lg leading-relaxed text-neutral-300">
                Real agents trained specifically for plumbing & HVAC operations.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/45 p-6 pl-9 transition-all duration-300 hover:shadow-[0_14px_38px_rgba(59,130,246,0.16)]">
              <div className="pointer-events-none absolute bottom-5 left-4 top-5 w-[2px] rounded-full bg-gradient-to-b from-red-400/75 via-purple-400/80 to-blue-400/80" />
              <h3 className="text-2xl font-semibold text-white">Revenue-Focused Conversations</h3>
              <p className="mt-3 text-lg leading-relaxed text-neutral-300">
                We prioritize high-value jobs and urgent service calls.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button as={Link} href="/contact" variant="simple" className="rounded-full px-8 py-4 text-lg font-semibold">
              Book a Strategy Call
            </Button>
          </div>
        </section>

        <div className="h-20 w-full md:h-32" />

        <ScalingLadder />

        <SectionDivider />

        <SolutionSection />

        <SectionDivider />
        
        <SupportedIndustries />
        
        <SectionDivider />
        
        <InfrastructureSection />
      </Container>

      {/* Bottom section */}
      <div className="relative">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Background />
        </div>

        <CTA />
      </div>
    </div>
  );
}
