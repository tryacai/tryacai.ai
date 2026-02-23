import { Container } from "@/components/container";
import { Background } from "@/components/background";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Metadata } from "next";
import { IconCircleCheckFilled } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Pricing - ACAI AI",
  description:
    "Barber-focused pricing with a simple entry plan and a premium enterprise tier.",
  openGraph: {
    images: ["https://tryacai.ai/V2websitepreviewimage.png"],
  },
};

const basicPlanFeatures = [
  "AI receptionist that answers calls",
  "Directs customers to Booksy",
  "Answers basic service questions",
  "60 minutes of AI call time included",
  "$0.25 per additional AI minute",
];

const enterprisePlanFeatures = [
  "Multi-location support",
  "Multiple barber routing",
  "Advanced booking logic",
  "Priority support",
  "Custom workflow automation",
  "Dedicated onboarding",
  "1-on-1 optimization calls",
  "High-volume call handling",
];

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden py-20">
      <Background />
      <Container className="relative z-20 flex flex-col items-center pb-20">
        <div className="py-10 md:pt-28">
          <Heading as="h1">Barber Pricing That Scales With You</Heading>
          <Subheading className="text-center">
            Start lean at $49.99/month, then move to Enterprise when your
            operation is ready for advanced automation.
          </Subheading>
        </div>

        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Plan 1 — Basic</p>
              <p className="mt-3 text-4xl font-bold text-white">$49.99<span className="text-lg font-medium text-neutral-400">/month</span></p>
            </div>
            <ul className="space-y-3">
              {basicPlanFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-neutral-300">
                  <IconCircleCheckFilled className="mt-0.5 h-5 w-5 flex-none text-neutral-200" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl border border-fuchsia-500/30 bg-neutral-900 p-8 shadow-2xl ring-1 ring-fuchsia-400/30">
            <span className="absolute right-6 top-6 rounded-full border border-fuchsia-300/40 bg-fuchsia-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fuchsia-100">
              Premium
            </span>
            <div className="mb-6 pr-20">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-200">Plan 2 — Enterprise</p>
              <p className="mt-3 text-4xl font-bold text-white">$499<span className="text-lg font-medium text-fuchsia-100/70">/month</span></p>
            </div>
            <ul className="space-y-3">
              {enterprisePlanFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-fuchsia-50/90">
                  <IconCircleCheckFilled className="mt-0.5 h-5 w-5 flex-none text-fuchsia-200" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
