import { IndustryPlaceholderPage } from "@/components/industry-placeholder-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Water Heater Solutions | ACAI AI",
  description: "Lead conversion and follow-up automation for service businesses.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WaterHeaterPage() {
  return <IndustryPlaceholderPage industryName="Water Heater Services" />;
}
