import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Link } from "next-view-transitions";

const tiers = [
  {
    label: "Tier 1",
    price: "$49/month",
    highlights: [
      "24/7 AI call answering",
      "Booksy link handoff",
      "Missed-call text recovery",
    ],
  },
  {
    label: "Tier 2",
    price: "$197/month",
    highlights: [
      "Automated rebooking texts",
      "Review generation automation",
      "Booking analytics dashboard",
    ],
  },
  {
    label: "Tier 3",
    price: "$799/month",
    highlights: [
      "Multi-barber routing",
      "Multi-location orchestration",
      "Dedicated optimization support",
    ],
  },
];

export default function BarbersPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center pb-20">
        <div className="relative z-20 mx-auto w-full max-w-4xl py-10 text-center md:pt-40">
          <Heading as="h1" className="text-center">
            Barbershop Automation That Scales With You
          </Heading>
          <Subheading className="mx-auto mt-4 max-w-2xl text-center">
            Clear tiering from starter coverage to full infrastructure.
          </Subheading>
        </div>

        <section className="relative z-20 mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as={Link} href="/pricing" variant="simple" className="rounded-full">
              See Industry Pricing
            </Button>
            <Button as={Link} href="/schedule-demo" className="rounded-full">
              Schedule Demo
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
