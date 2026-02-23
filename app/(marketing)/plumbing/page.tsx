import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Link } from "next-view-transitions";

const realProblem = [
  "Speed-to-lead decay",
  "Technicians interrupted",
  "No differentiation between $200 and $15,000 jobs",
  "Software fatigue",
];

const whyAcai = [
  "Speed-to-Lead SLA",
  "Zero Implementation Drag",
  "High-Ticket Qualification Logic",
  "Continuous QA & Optimization",
];

const tiers = [
  {
    label: "Tier 1",
    price: "$299/month",
    highlights: [
      "24/7 call answering",
      "Basic lead triage",
      "Booking handoff",
      "After-hours coverage",
    ],
  },
  {
    label: "Tier 2",
    price: "$599/month",
    highlights: [
      "Missed-call text recovery",
      "Automated estimate follow-up",
      "Review request automation",
      "Retention sequences",
    ],
  },
  {
    label: "Tier 3",
    price: "Starting at $1199/month",
    highlights: [
      "Advanced quote routing",
      "Multi-location orchestration",
      "Dedicated optimization support",
      "Priority workflows",
    ],
  },
];

export default function PlumbingPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center pb-20">
        <div className="relative z-20 mx-auto w-full max-w-4xl py-10 text-center md:pt-40">
          <Heading as="h1" className="text-center">
            Stop Losing Plumbing Jobs to Missed Calls.
          </Heading>
          <Subheading className="mx-auto mt-4 max-w-2xl text-center">
            White-glove voice agent built to turn missed calls into booked jobs.
          </Subheading>
        </div>

        <section className="relative z-20 mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/10 bg-black/35 p-7">
          <h2 className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-2xl font-semibold text-transparent">
            The Real Problem
          </h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 text-sm text-neutral-300 md:grid-cols-2">
            {realProblem.map((item) => (
              <li key={item} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3">• {item}</li>
            ))}
          </ul>
        </section>

        <section className="relative z-20 mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/10 bg-black/35 p-7">
          <h2 className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-2xl font-semibold text-transparent">
            Why ACAI
          </h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 text-sm text-neutral-200 md:grid-cols-2">
            {whyAcai.map((item) => (
              <li key={item} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-medium">{item}</li>
            ))}
          </ul>
        </section>

        <section className="relative z-20 mx-auto mt-8 w-full max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">
            Tier Breakdown for Plumbing
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
              See Full Pricing Page
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
