import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Background } from "@/components/background";
import { CTA } from "@/components/cta";
import { SectionDivider } from "@/components/section-divider";
import { SupportedIndustries } from "@/components/supported-industries";
import { SolutionSection } from "@/components/solution-section";
import { ScalingLadder } from "@/components/scaling-ladder";
import { InfrastructureSection } from "@/components/infrastructure-section";
import { ContractorConciergeSection } from "@/components/contractor-concierge-section";

export default function Home() {
  return (
    <div className="relative">
      {/* Top background */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>

      <Container className="flex min-h-screen flex-col items-center justify-between">
        <Hero />

        <ContractorConciergeSection />

        <div className="h-12 w-full md:h-16" />

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
