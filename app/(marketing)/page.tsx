import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Background } from "@/components/background";
import { CTA } from "@/components/cta";
import { SectionDivider } from "@/components/section-divider";
import { SupportedIndustries } from "@/components/supported-industries";
import { SolutionSection } from "@/components/solution-section";
import { InfrastructureSection } from "@/components/infrastructure-section";
import { ContractorConciergeSection } from "@/components/contractor-concierge-section";
import { RevenueIntelligenceDashboard } from "@/components/revenue-intelligence-dashboard";

export default function Home() {
  return (
    <div className="relative">
      {/* Top background */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>

      <Container className="flex min-h-screen flex-col items-center">
        <Hero />

        <ContractorConciergeSection />

        <RevenueIntelligenceDashboard preview />

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
