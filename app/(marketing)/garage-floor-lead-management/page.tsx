import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Background } from "@/components/background";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Garage Floor Lead Management | ACAI",
  description:
    "Automated lead management for garage floor coating and epoxy companies. Capture, qualify, and book more garage floor jobs with AI-powered automation.",
};

export default function GarageFloorLeadManagementPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>
      <Container className="relative z-20 pb-24 pt-32 md:pt-40">
        <article className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Garage Floor Lead Management
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-300">
            Garage floor coating is one of the fastest-growing home service niches in Florida. But growth brings a problem: more leads than you can handle manually. Without a solid lead management system, you bleed money on every quote request that slips through the cracks.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">The Garage Floor Lead Problem</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Garage floor coating companies — whether you do polyurea, epoxy, or polyaspartic — share a common challenge. You're running ads, getting referrals, and generating leads. But here's where jobs get lost:
          </p>
          <ul className="mt-4 space-y-3 text-base text-neutral-300">
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> Leads come in from 5+ sources: website forms, Google Ads, Facebook, phone calls, text messages</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> You're on the job site and can't answer calls or respond to form fills instantly</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> By the time you respond — sometimes hours or a day later — the homeowner already booked another company</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> No system to track which leads are hot, which need follow-up, which are dead</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> Revenue gets left on the table every single week</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-white">How ACAI Automates Garage Floor Leads</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            ACAI's automation engine consolidates every lead source into one pipeline, then works them automatically:
          </p>
          <ol className="mt-4 space-y-3 text-base text-neutral-300 list-decimal list-inside">
            <li><strong className="text-white">Instant capture</strong> — Form fills, calls, and messages flow into one dashboard instantly</li>
            <li><strong className="text-white">AI qualification</strong> — The system asks about square footage, coating type, timeline, and budget</li>
            <li><strong className="text-white">Speed to lead</strong> — Qualified leads get a call-back or text within 60 seconds</li>
            <li><strong className="text-white">Smart booking</strong> — AI books the estimate appointment on your calendar</li>
            <li><strong className="text-white">Automated follow-up</strong> — Unresponsive leads get drip sequences via text and email</li>
            <li><strong className="text-white">Pipeline tracking</strong> — See every lead's stage from first touch to closed job</li>
          </ol>

          <h2 className="mt-12 text-2xl font-semibold text-white">Why Speed Wins in Garage Floor Coating</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Garage floor jobs are high-ticket ($2,000-8,000+) and homeowners usually get 2-3 quotes. The company that responds first books the estimate. The company that follows up consistently closes the job. This is not theory — it's what the data shows across hundreds of service businesses.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            With ACAI, your business responds in under a minute, qualifies the lead, and gets an estimate on the calendar while your competitor is still on a job site with their phone in the truck.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">Serving Epoxy & Coating Companies Across Florida</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            We work with garage floor coating companies across Tampa, Brandon, Riverview, Lakeland, Orlando, Jacksonville, and the entire state of Florida. Whether you're a one-truck operation or running multiple crews, ACAI scales with your business.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90">
              Book a Demo
            </Link>
            <Link href="/ai" className="inline-flex rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/40">
              See The ACAI System
            </Link>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-sm text-neutral-500">Related:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link href="/florida-epoxy-lead-generation" className="text-sm text-purple-400 hover:underline">Florida Epoxy Lead Generation</Link>
              <span className="text-neutral-600">·</span>
              <Link href="/blog/garage-floor-automate-lead-management" className="text-sm text-purple-400 hover:underline">Automate Garage Floor Lead Management</Link>
              <span className="text-neutral-600">·</span>
              <Link href="/blog/ai-epoxy-companies-book-more-jobs" className="text-sm text-purple-400 hover:underline">AI Helps Epoxy Companies Book More Jobs</Link>
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
}
