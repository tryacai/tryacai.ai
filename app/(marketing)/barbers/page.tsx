import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { industryConfig, tierOrder } from "@/constants/pricing-config";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { Link } from "next-view-transitions";

const barbersConfig = industryConfig.barbers;

export default function BarbersPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center pb-20">
        <div className="relative z-20 mx-auto w-full max-w-4xl py-10 text-center md:pt-40">
          <Heading as="h1" className="text-center">
            Barber Automation That Scales With Your Shop
          </Heading>
          <Subheading className="mx-auto mt-4 max-w-2xl text-center">
            Capture every call, automate rebooking and reminders, and move from
            basic booking support to full growth infrastructure.
          </Subheading>
          <p className="mt-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Built to scale beyond basic booking tools.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as={Link} href="/contact" className="rounded-full">
              Get Started
            </Button>
            <Button as={Link} href="/pricing" variant="simple" className="rounded-full">
              See Full Pricing
            </Button>
          </div>
        </div>

        <section className="relative z-20 mx-auto mt-10 w-full max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">
            Tier Breakdown for Barbers
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {tierOrder.map((tierKey) => {
              const tier = barbersConfig.tiers[tierKey];
              const isGrowth = tierKey === "growth";
              const isEnterprise = tierKey === "enterprise";

              return (
                <div
                  key={tierKey}
                  id={tierKey}
                  className={`relative rounded-2xl p-[1px] ${
                    isEnterprise
                      ? "bg-gradient-to-r from-amber-300/50 via-yellow-200/60 to-amber-300/50"
                      : "bg-transparent"
                  }`}
                >
                  <div
                    className={`h-full rounded-2xl border p-5 text-left ${
                      isEnterprise
                        ? "border-amber-300/40 bg-neutral-900"
                        : isGrowth
                        ? "border-purple-400/40 bg-neutral-900"
                        : "border-white/10 bg-black/40"
                    }`}
                  >
                    {tier.badge && (
                      <span
                        className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                          isEnterprise
                            ? "border border-amber-300/60 bg-amber-300/20 text-amber-100"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        {tier.badge}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                    <p className="mt-1 text-xl font-bold text-white">{tier.price}</p>
                    <p className="mt-2 text-sm font-medium text-neutral-300">{tier.bestFor}</p>

                    <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <IconCircleCheckFilled
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              isEnterprise ? "text-amber-200" : "text-purple-300"
                            }`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative z-20 mx-auto mt-14 w-full max-w-4xl text-center">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Scale Beyond Booking
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
            ACAI helps barbershops automate rebooking, reminder workflows,
            review generation, and intelligent routing so growth doesn&apos;t depend
            on manual follow-up.
          </p>
          <div className="mt-6">
            <Button as={Link} href="/schedule-demo" className="rounded-full">
              Book a Demo
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
