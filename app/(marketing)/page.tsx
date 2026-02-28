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
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative">
      {/* Top background */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>

      <Container className="flex min-h-screen flex-col items-center justify-between">
        <Hero />

        <section className="relative z-10 mt-2 w-screen">
          <div className="relative h-[360px] w-full md:h-[480px]">
            <Image
              src="/images/acai-callcenter.png"
              alt="ACAI live contractor concierge team"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/35 to-black" />
            <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.75)]" />
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <div className="max-w-4xl">
                <h2 className="text-3xl font-semibold text-white md:text-5xl">
                  Real People. Real Conversations. Real Revenue.
                </h2>
                <p className="mt-4 text-base text-neutral-200 md:text-xl">
                  Our 24/7 concierge team answers, qualifies, and routes every call so you never lose another job.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-14 w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/45 p-7 text-center backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-white">24/7 Live Call Answering</h3>
              <p className="mt-3 text-neutral-300">Real trained agents answering every contractor call.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/45 p-7 text-center backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-white">Emergency Call Routing</h3>
              <p className="mt-3 text-neutral-300">After-hours and urgent calls prioritized instantly.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/45 p-7 text-center backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-white">High-Value Job Qualification</h3>
              <p className="mt-3 text-neutral-300">Capture bigger jobs, not just missed voicemails.</p>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-16 w-full max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Built Specifically for Contractors.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-neutral-300 md:text-xl">
            We are not a generic answering service. We specialize in plumbing, HVAC, sewer, and mechanical contractors.
          </p>
          <Button as={Link} href="/contact" variant="simple" className="mt-8 rounded-full px-8 py-4 text-lg font-semibold">
            Book a Strategy Call
          </Button>
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
