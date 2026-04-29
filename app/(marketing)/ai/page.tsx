"use client";

import { motion } from "framer-motion";
import { Link } from "next-view-transitions";

const systemSteps = [
  {
    number: "01",
    category: "ACQUISITION",
    categoryClass: "from-blue-500/80 to-blue-300/80",
    title: "PROJECT ACQUISITION FUNNELS",
    description:
      "We build funnels engineered to turn Florida traffic into scheduled floor-coating estimates — not form fills that ghost you after 48 hours.",
    bullets: [
      "Meta + Google funnels built for floor-coating buyers only",
      "Pre-qualification before any lead reaches your calendar",
      "Residential and commercial campaign separation",
      "Retargeting to capture missed demand from every click",
    ],
  },
  {
    number: "02",
    category: "TRAFFIC",
    categoryClass: "from-purple-500/80 to-fuchsia-400/80",
    title: "PAID TRAFFIC ENGINE (META + GOOGLE)",
    description:
      "We run ad systems targeting Florida homeowners and commercial buyers who are actively searching for floor-coating installs — not general audiences.",
    bullets: [
      "Google & Meta ads for epoxy flooring only — no generalist targeting",
      "Budget scaling tied to booked jobs, not impressions",
      "Pre-qualification filters before any lead reaches you",
      "Continuous optimization based on cost-per-booked-job",
    ],
  },
  {
    number: "03",
    category: "AUTOMATION",
    categoryClass: "from-amber-500/80 to-orange-400/80",
    title: "CRM, AUTOMATION & FOLLOW-UPS",
    description:
      "Every inbound lead gets an instant response via call or text — in seconds, not hours. AI filters serious buyers. Only hot leads reach you.",
    bullets: [
      "Responds to every lead in under 60 seconds automatically",
      "Missed-call text back fires before they dial a competitor",
      "Lead scoring filters tire-kickers before they reach your calendar",
      "Booking confirmations, reminders, and follow-ups all automated",
    ],
  },
  {
    number: "04",
    category: "AUTHORITY",
    categoryClass: "from-blue-500/80 via-purple-500/80 to-amber-400/80",
    title: "AUTHORITY, PROOF & CONVERSION ASSETS",
    description:
      "We turn your past jobs and installs into content that builds trust, increases close rates, and supports every paid traffic campaign running in your market.",
    bullets: [
      "Before/after systems for every completed floor-coating job",
      "Review generation and management built into your pipeline",
      "Social proof formatted for ads, sales calls, and your website",
      "Brand consistency across every platform your buyers see",
    ],
  },
] as const;

const badgePills = [
  "✦ Instant Response",
  "✦ 24/7 Coverage",
  "✦ No Missed Opportunities",
] as const;

export default function MicaGrowthSystemPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-24 pt-24 md:pt-28">
      <div className="fixed inset-0 -z-20 bg-[url('/epoxybackground.png')] bg-cover bg-center bg-no-repeat bg-fixed opacity-35" />
      <div className="fixed inset-0 -z-10 bg-[rgba(0,0,0,0.70)]" />

      <main className="relative z-20 px-4 md:px-6">
        <section className="mx-auto max-w-6xl pt-10 text-center md:pt-[120px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">
            THE MICA GROWTH SYSTEM
          </p>

          <h1 className="mt-5 text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-tight text-white">
            The Infrastructure Built to Deliver
          </h1>
          <p className="mt-2 bg-gradient-to-r from-blue-500 to-amber-400 bg-clip-text text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-tight text-transparent">
            15+ Booked Floor-Coating Projects Every Month
          </p>

          <p className="mx-auto mt-5 max-w-[720px] text-[17px] leading-[1.7] text-white/75">
            We combine positioning, conversion assets, paid traffic, and automation into one connected system — built specifically for Florida floor-coating contractors. Not leads. Booked jobs.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {badgePills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-white/12 bg-white/7 px-[18px] py-2 text-[13px] text-white"
              >
                {pill}
              </span>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-[1100px] md:mt-20">
          <div className="relative">
            <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-amber-400 md:block" />

            <div className="space-y-6 md:space-y-10">
              {systemSteps.map((step, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 28, x: isLeft ? -32 : 32 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
                    className="relative md:grid md:grid-cols-2 md:gap-10"
                  >
                    <div className={`${isLeft ? "md:col-start-1" : "md:col-start-2"}`}>
                      <article className="rounded-[20px] border border-white/7 bg-[rgba(10,10,10,0.80)] p-7 backdrop-blur-xl transition-all duration-200 hover:scale-[1.01] hover:border-white/15 md:p-10">
                        <div className="flex items-start gap-5">
                          <div className="relative mt-1 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3b82f6,#f59e0b)] text-[22px] font-bold text-white">
                            {step.number}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <h2 className="text-[22px] font-bold leading-tight text-white">{step.title}</h2>
                              <span className={`rounded-full bg-gradient-to-r px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white ${step.categoryClass}`}>
                                {step.category}
                              </span>
                            </div>

                            <p className="mt-3 max-w-[600px] text-[15px] leading-[1.6] text-white/70">
                              {step.description}
                            </p>

                            <ul className="mt-4 space-y-2.5">
                              {step.bullets.map((bullet) => (
                                <li key={bullet} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-white/65">
                                  <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text font-bold text-transparent">✦</span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </article>
                    </div>

                    <div className="pointer-events-none absolute left-1/2 top-10 hidden h-5 w-5 -translate-x-1/2 rounded-full border border-white/25 bg-[linear-gradient(135deg,#3b82f6,#f59e0b)] shadow-[0_0_14px_rgba(59,130,246,0.5)] md:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-[1000px] rounded-[24px] bg-[rgba(0,0,0,0.5)] px-4 py-12 md:mt-20 md:px-8 md:py-14">
          {/* Comparison section: keep this wrapper for easy future content swaps. */}
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
              THE DIFFERENCE
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight text-white">
              WHY THE MICA GROWTH SYSTEM
              <br />
              STANDS APART
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[16px] leading-relaxed text-white/65">
              Most agencies sell services. We install systems. Built specifically for Florida floor-coating contractors — not generic marketing retainers.
            </p>
          </div>

          <div className="relative mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5">
            <article className="rounded-2xl border border-red-500/20 bg-[rgba(20,10,10,0.9)] p-8">
              <div className="mb-5 rounded-lg bg-[#1a0a0a] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-red-300">
                TRADITIONAL APPROACH
              </div>
              <ul className="space-y-3 text-[14px] text-white">
                <li className="flex items-start gap-2.5"><span className="text-red-500">✕</span><span>Sells PPC, SEO, or ads as isolated services</span></li>
                <li className="flex items-start gap-2.5"><span className="text-red-500">✕</span><span>Focused on short-term campaigns and retainers</span></li>
                <li className="flex items-start gap-2.5"><span className="text-red-500">✕</span><span>No integration with real business systems</span></li>
                <li className="flex items-start gap-2.5"><span className="text-red-500">✕</span><span>Depends on theory, not measurable execution</span></li>
                <li className="flex items-start gap-2.5"><span className="text-red-500">✕</span><span>Clients rely on ads for temporary growth</span></li>
              </ul>
            </article>

            <div className="order-2 md:order-none">
              <div className="mb-3 flex justify-center md:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3b82f6,#f59e0b)] text-base font-bold text-white">
                  VS
                </div>
              </div>

              <article className="rounded-2xl border border-blue-500/30 bg-[rgba(10,15,25,0.9)] p-8">
                <div className="mb-5 rounded-lg bg-[linear-gradient(90deg,#3b82f6,#f59e0b)] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white">
                  MICA GROWTH SYSTEM
                </div>
                <ul className="space-y-3 text-[14px] text-white">
                  <li className="flex items-start gap-2.5"><span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">✓</span><span>End-to-end system: traffic → booking → closed job</span></li>
                  <li className="flex items-start gap-2.5"><span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">✓</span><span>Built specifically for Florida floor-coating contractors</span></li>
                  <li className="flex items-start gap-2.5"><span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">✓</span><span>Integrated CRM, automations, and follow-up</span></li>
                  <li className="flex items-start gap-2.5"><span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">✓</span><span>Focused on booked projects, not raw leads</span></li>
                  <li className="flex items-start gap-2.5"><span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">✓</span><span>Designed for long-term, scalable growth</span></li>
                </ul>
              </article>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3b82f6,#f59e0b)] text-base font-bold text-white md:flex">
              VS
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-5xl text-center md:mt-20">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight text-white">
            EVERYTHING YOUR FLORIDA FLOOR-COATING BUSINESS
            <br />
            NEEDS. ALL IN ONE SYSTEM.
          </h2>
          <p className="mx-auto mt-4 max-w-[580px] text-[16px] leading-relaxed text-white/65">
            15+ booked projects a month. Installed, managed, and optimized by our team. Limited availability — one contractor per territory.
          </p>

          <Link
            href="/strategy-call"
            className="mx-auto mt-8 inline-flex h-[60px] min-w-[300px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#f97316,#f59e0b)] px-10 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(245,158,11,0.4)]"
          >
            CLAIM YOUR FLORIDA TERRITORY →
          </Link>
          <p className="mt-3 text-xs text-white/40">
            Limited availability for exclusive Florida territories.
          </p>
        </section>
      </main>
    </div>
  );
}
