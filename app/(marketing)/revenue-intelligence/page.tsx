import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { RevenueIntelligenceDashboard } from "@/components/revenue-intelligence-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revenue Intelligence",
  description:
    "Measure response speed, qualification quality, and booking outcomes with Mica Growth Revenue Intelligence for service businesses.",
};

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
