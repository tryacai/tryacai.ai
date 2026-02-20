import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Link } from "next-view-transitions";

type IndustryPlaceholderPageProps = {
  industryName: string;
};

const placeholderCards = [
  {
    title: "24/7 Call Handling",
    text: "Capture inbound calls and route requests automatically.",
  },
  {
    title: "Smart Follow-Ups",
    text: "Keep prospects engaged with consistent automated outreach.",
  },
  {
    title: "Faster Booking Flow",
    text: "Turn more inquiries into scheduled customer appointments.",
  },
];

const pricingCards = ["Starter", "Growth", "Scale"];

const setupSteps = [
  "Connect your call workflow",
  "Map your service requests",
  "Configure automation rules",
  "Go live with your team",
];

export function IndustryPlaceholderPage({ industryName }: IndustryPlaceholderPageProps) {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center pb-20">
        <div className="relative z-20 mx-auto w-full max-w-4xl py-10 text-center md:pt-40">
          <Heading as="h1" className="text-center">
            AI Receptionist Built for {industryName} Businesses
          </Heading>
          <Subheading className="mx-auto mt-4 max-w-2xl text-center">
            Automation tailored for your workflow.
          </Subheading>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as={Link} href="/contact" className="rounded-full">
              Get Started
            </Button>
            <Button as={Link} href="/pricing" variant="simple" className="rounded-full">
              View Pricing
            </Button>
          </div>
        </div>

        <section className="relative z-20 mx-auto mt-8 w-full max-w-4xl text-center">
          <h2 className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
            Workflow Highlights
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {placeholderCards.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-black/40 p-5 text-left">
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-20 mx-auto mt-14 w-full max-w-4xl text-center">
          <h2 className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
            Pricing Snapshot
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {pricingCards.map((tier) => (
              <div key={tier} className="rounded-2xl border border-white/10 bg-black/40 p-5 text-left">
                <h3 className="text-base font-semibold text-white">{tier}</h3>
                <p className="mt-2 text-sm text-neutral-300">Flexible package options for your team.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-20 mx-auto mt-14 w-full max-w-4xl text-center">
          <h2 className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
            Setup Process
          </h2>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
            <ul className="space-y-3 text-sm text-neutral-300">
              {setupSteps.map((step) => (
                <li key={step}>- {step}</li>
              ))}
            </ul>
          </div>
        </section>
      </Container>
    </div>
  );
}
