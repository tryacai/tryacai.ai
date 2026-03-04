import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { RevenueIntelligenceDashboard } from "@/components/revenue-intelligence-dashboard";

export default function RevenueIntelligencePage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>

      <Container className="flex min-h-screen flex-col items-center">
        <RevenueIntelligenceDashboard />
      </Container>
    </div>
  );
}
