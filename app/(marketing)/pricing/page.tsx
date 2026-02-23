import { Container } from "@/components/container";
import { Background } from "@/components/background";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Pricing } from "@/components/pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - ACAI AI",
  description:
    "Industry-specific ACAI pricing plans built to convert calls into booked jobs.",
  openGraph: {
    images: ["https://tryacai.ai/V2websitepreviewimage.png"],
  },
};

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <Heading as="h1">Simple pricing. Tailored by industry.</Heading>
          <Subheading className="text-center">
            Choose your industry to see tier names, feature ladders, and links
            built for your business model.
          </Subheading>
        </div>
        <Pricing />
      </Container>
    </div>
  );
}
