import { Container } from "@/components/container";
import { Background } from "@/components/background";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Pricing } from "@/components/pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | ACAI AI",
  description:
    "Flexible ACAI plans built to improve lead response speed, automate follow up, and convert more demand into booked revenue.",
  openGraph: {
    images: ["https://tryacai.ai/nevermissaleadpreviewimage.png"],
  },
};

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <p className="mb-3 text-center text-sm font-medium text-neutral-300 md:text-base">
            Built specifically for plumbing & mechanical service contractors.
          </p>
          <Heading as="h1">Simple pricing. Tailored for contractors.</Heading>
          <Subheading className="text-center">
            Choose your contractor service to see tier details built for call handling,
            emergency routing, dispatch workflows, and CRM-ready operations.
          </Subheading>
        </div>
        <Pricing />
      </Container>
    </div>
  );
}
