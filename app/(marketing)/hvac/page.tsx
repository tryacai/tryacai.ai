import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Link } from "next-view-transitions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Solutions | ACAI AI",
  description:
    "Lead conversion and follow-up automation for service businesses.",
  robots: {
    index: false,
    follow: false,
  },
};

const tiers = [
  {
    label: "Tier 1",
    price: "$299/month",
    highlights: [
      "24/7 call answering",
      "Urgency triage intake",
      "Service booking handoff",
    ],
  },
  {
    label: "Tier 2",
    price: "$599/month",
    highlights: [
      "Missed-call text recovery",
      "Estimate follow-up automation",
      "Review request sequencing",
    ],
  },
  {
    label: "Tier 3",
    price: "Starting at $1199/month",
    highlights: [
      "Advanced routing logic",
      "Multi-team orchestration",
      "Dedicated optimization support",
    ],
  },
];

export default function HVACPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center pb-20">
        <div className="relative z-20 mx-auto w-full max-w-4xl py-10 text-center md:pt-40">
          <Heading as="h1" className="text-center">
            HVAC Call Handling Built for Fast Dispatch
          </Heading>
          <Subheading className="mx-auto mt-4 max-w-2xl text-center">
            Keep urgent inbound calls from slipping while your team focuses on active jobs.
          </Subheading>
        </div>

        <section className="relative z-20 mx-auto w-full max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">
            Tier Breakdown for HVAC
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.label} className="rounded-2xl border border-white/10 bg-black/35 p-5 text-left">
                <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">{tier.label}</p>
                <p className="mt-2 text-xl font-bold text-white">{tier.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                  {tier.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button as={Link} href="/pricing" variant="simple" className="rounded-full">
              See Industry Pricing
            </Button>
          </div>
        </section>

        <section className="relative z-20 mx-auto mt-10 w-full max-w-5xl rounded-2xl border border-white/10 bg-black/35 p-7 text-center">
          <h2 className="text-2xl font-semibold text-white">Powered by the ACAI System</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            Capture high-intent service calls, recover missed opportunities, and optimize dispatch routing with one system.
          </p>
          <div className="mt-6 flex justify-center">
            <Button as={Link} href="/solutions" variant="simple" className="rounded-full">
              Explore Capture → Recover → Optimize
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
