import { IndustryPlaceholderPage } from "@/components/industry-placeholder-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sewer and Drain Solutions | ACAI Marketing",
  description: "Lead conversion and follow-up automation for service businesses.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SewerDrainPage() {
  return <IndustryPlaceholderPage industryName="Sewer & Drain" />;
}
