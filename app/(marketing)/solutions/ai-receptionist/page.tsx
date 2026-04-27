import { Container } from "@/components/container";
import { Background } from "@/components/background";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Button } from "@/components/button";
import { Link } from "next-view-transitions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Response System",
  description:
    "Lead response automation that captures inbound demand, qualifies opportunities, and books next steps faster.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AIReceptionistPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <div className="inline-flex items-center rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700 dark:text-neutral-300 mb-6">
            Level 1
          </div>
          <Heading as="h1">AI Receptionist</Heading>
          <Subheading className="text-center">
            Your first step into AI automation. Never miss another call.
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
                  24/7 Call Answering
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Every call gets answered immediately, day or night. No voicemail. No missed opportunities.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Instant Appointment Scheduling
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Your AI receptionist books directly into your calendar based on your availability.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Natural Conversations
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Trained specifically for service businesses. Handles common questions and objections naturally.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Call Summaries
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Every interaction logged and summarized so you know exactly what happened.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                Perfect For
              </h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400">
                <li>Solo operators looking to scale</li>
                <li>Small teams overwhelmed by phone calls</li>
                <li>Businesses losing revenue to missed calls</li>
                <li>Service providers working in the field</li>
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
