import { Container } from "@/components/container";
import { Background } from "@/components/background";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Pricing } from "@/components/pricing";
import { Companies } from "@/components/companies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - ACAI AI",
  description:
    "Simple pricing built around results. Every engagement is customized based on setup complexity, ongoing support, and value delivered.",
  openGraph: {
    images: ["https://ai-saas-template-aceternity.vercel.app/banner.png"],
  },
};

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <Heading as="h1">Simple pricing. Built around results.</Heading>
          <Subheading className="text-center">
            Every engagement is customized. Pricing reflects setup complexity,
            ongoing support, and the value delivered.
          </Subheading>
        </div>
        <Pricing />
        <Companies />
      </Container>
    </div>
  );
}
