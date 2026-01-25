import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Background } from "@/components/background";
import { Features } from "@/components/features";
import { Companies } from "@/components/companies";
import { GridFeatures } from "@/components/grid-features";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";
import { IndustrySupport } from "@/components/industry-support";

export default function Home() {
  return (
    <div className="relative">
      {/* Top background */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>

      <Container className="flex min-h-screen flex-col items-center justify-between">
        <Hero />
        <Companies />
        <Features />
        <IndustrySupport />
        <GridFeatures />
        <Testimonials />
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
