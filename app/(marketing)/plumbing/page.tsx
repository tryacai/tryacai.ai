import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Button } from "@/components/button";
import { Link } from "next-view-transitions";

export default function PlumbingPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40 max-w-5xl mx-auto text-center">
          <Heading as="h1">
            AI Receptionist &amp; Automation Built for Plumbing Companies
          </Heading>
          <Subheading className="text-center">
            Capture emergency calls, book jobs instantly, and automate
            follow-ups without hiring more office staff.
          </Subheading>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button as={Link} href="/contact" className="rounded-full">
              Get Started
            </Button>
            <Button
              as={Link}
              href="/schedule-demo"
              variant="simple"
              className="rounded-full"
            >
              Schedule Demo
            </Button>
          </div>
        </div>

        <section className="relative z-20 w-full max-w-5xl mx-auto mt-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">
            The Real Problem Plumbers Face
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Missed emergency calls = lost revenue.",
              "Technicians answering phones instead of fixing jobs.",
              "Dispatch delays that frustrate customers.",
              "Estimates that never get properly followed up.",
              "Inconsistent review generation after completed jobs.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 p-5"
              >
                <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-20 w-full max-w-5xl mx-auto mt-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">
            How ACAI Solves It
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                24/7 Emergency Call Capture
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>- Answer calls instantly</li>
                <li>- Qualify urgency</li>
                <li>- Route to correct tech</li>
                <li>- Book directly on calendar</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Missed Call Recovery
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>- Instant SMS text-back</li>
                <li>- Capture job details automatically</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Estimate Follow-Up Automation
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>- Automatic follow-ups until job converts</li>
                <li>- Reminder messages</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Review &amp; Retention Automation
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>- Trigger review request after completed job</li>
                <li>- Reactivation campaigns for past customers</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="relative z-20 w-full max-w-5xl mx-auto mt-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">
            Tier Breakdown for Plumbing Teams
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 p-6">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                Basic – $299.99
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                For small plumbing teams.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>- 90 calls per month</li>
                <li>- Emergency capture</li>
                <li>- Calendar booking</li>
                <li>- Missed call recovery</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 p-6">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                Pro – $599.99
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                For growing plumbing companies.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>- 220 calls</li>
                <li>- Follow-up automation</li>
                <li>- Review automation</li>
                <li>- Higher call volume handling</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 p-6">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                Enterprise – $1199.99
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                For multi-crew operations.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>- 420 calls</li>
                <li>- Dispatch coordination</li>
                <li>- Peak demand scaling</li>
                <li>- Multi-location routing</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="relative z-20 w-full max-w-5xl mx-auto mt-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">
            Our Setup Process
          </h2>
          <ul className="mt-6 space-y-3 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
            <li>- We connect to your calendar</li>
            <li>- Map your service types</li>
            <li>- Configure emergency routing logic</li>
            <li>- Launch live</li>
            <li>- 14-day Proof of Value pilot</li>
          </ul>
        </section>

        <section className="relative z-20 w-full max-w-5xl mx-auto mt-16 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-neutral-900 dark:text-white">
            Stop Losing Plumbing Jobs to Missed Calls.
          </h2>
          <div className="mt-6">
            <Button as={Link} href="/contact" className="rounded-full">
              Get Started
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
