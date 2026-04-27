import { IndustryPlaceholderPage } from "@/components/industry-placeholder-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Solutions",
  description: "Lead conversion and follow-up automation for service businesses.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CommercialPlumbingPage() {
  return <IndustryPlaceholderPage industryName="Commercial Plumbing" />;
}
