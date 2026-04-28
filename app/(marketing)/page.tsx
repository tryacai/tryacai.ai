import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Background } from "@/components/background";
import { CallRevenueFlowSection } from "@/components/call-revenue-flow-section";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <h1 className="sr-only">Mica Growth — Floor Coating Marketing Agency</h1>
      <p className="sr-only">
        Mica Growth is the #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs, AI-powered lead follow-up, and results in your first month.
      </p>

        <Hero />
      {/* Marquee banner is now inside the Hero component */}

      {/* Next section starts after marquee */}
      <Container className="relative z-20 flex flex-col pb-24">
        <CallRevenueFlowSection />
  </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
}
