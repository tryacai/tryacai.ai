import { IndustryPlaceholderPage } from "@/components/industry-placeholder-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Septic Solutions",
  description: "Lead conversion and follow-up automation for service businesses.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SepticPage() {
  return <IndustryPlaceholderPage industryName="Septic" />;
}
