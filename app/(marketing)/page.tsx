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
