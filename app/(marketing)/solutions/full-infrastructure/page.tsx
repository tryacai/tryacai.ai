import { Container } from "@/components/container";
import { Background } from "@/components/background";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Button } from "@/components/button";
import { Link } from "next-view-transitions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full AI Infrastructure | ACAI AI",
  description:
    "Complete AI operations platform with quote routing, multi-location support, and advanced automation.",
  openGraph: {
    images: ["https://tryacai.ai/nevermissaleadpreviewimage.png"],
  },
};

export default function FullInfrastructurePage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <div className="inline-flex items-center rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700 dark:text-neutral-300 mb-6">
            Level 3
          </div>
          <Heading as="h1">Full AI Infrastructure</Heading>
          <Subheading className="text-center">
            Enterprise-level automation built for scaling service businesses.
          </Subheading>
        </div>

        <div className="relative z-20 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 px-8 py-10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
              What You Get
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Everything from Levels 1 & 2
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Full lead response automation, scheduling, follow-ups, and review automation.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Intelligent Quote Routing
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  AI automatically qualifies leads and routes high-value quotes to the right team members.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Multi-Location Support
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Centralized AI that routes calls and bookings across multiple locations intelligently.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Advanced CRM Integration
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Deep integration with your existing CRM, updating customer data in real-time.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Custom Workflows
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Tailored automation workflows built specifically for your business processes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Priority Support & Strategy
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Dedicated account manager and ongoing optimization to maximize ROI.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                Perfect For
              </h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400">
                <li>Multi-location service businesses</li>
                <li>Enterprise teams with complex operations</li>
                <li>Companies managing high call volumes</li>
                <li>Businesses ready for full automation</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button as={Link} href="/contact">
              Get Started
            </Button>
            <Button variant="simple" as={Link} href="/pricing">
              View Pricing
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
