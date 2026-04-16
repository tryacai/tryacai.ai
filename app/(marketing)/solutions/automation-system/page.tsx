import { Container } from "@/components/container";
import { Background } from "@/components/background";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Button } from "@/components/button";
import { Link } from "next-view-transitions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth Automation System | ACAI Marketing",
  description:
    "Automated follow-ups, review generation, and missed call texting to maximize every opportunity.",
  openGraph: {
    images: ["https://tryacai.ai/nevermissaleadpreviewimage.png"],
  },
};

export default function AutomationSystemPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <div className="inline-flex items-center rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700 dark:text-neutral-300 mb-6">
            Level 2
          </div>
          <Heading as="h1">Growth Automation System</Heading>
          <Subheading className="text-center">
            Turn one-time customers into repeat business automatically.
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
                  Everything from Level 1
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Instant lead response, qualification routing, and conversion workflows.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Automated Follow-Ups
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Smart SMS sequences that nurture leads and book appointments without manual outreach.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Review Automation
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Automatically request and collect 5-star reviews from happy customers at the perfect moment.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Missed Call Text Back
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Instantly text back anyone you couldn't answer, keeping the conversation alive.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Customer Re-engagement
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Bring back past customers with targeted campaigns for seasonal work or recurring services.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                Perfect For
              </h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400">
                <li>Growing teams ready to scale operations</li>
                <li>Businesses with repeat customers</li>
                <li>Service providers focused on customer retention</li>
                <li>Companies wanting to maximize lifetime value</li>
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
