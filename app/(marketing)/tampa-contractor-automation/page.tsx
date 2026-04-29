import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Background } from "@/components/background";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Automation for Tampa Contractors",
  description:
    "Tampa contractors are losing thousands in missed calls and slow follow-up. Mica Growth automates lead response, qualification, and booking so you never miss a job.",
};

export default function TampaContractorAutomationPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>
      <Container className="relative z-20 pb-24 pt-32 md:pt-40">
        <article className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            AI Automation for Tampa Contractors
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-300">
            Tampa contractors are losing thousands every month to one simple problem: slow response time. When a homeowner calls and nobody picks up, they call the next company. Your ad spend is gone. The job is gone. And you never even knew it happened.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-neutral-300">
            <strong className="text-white">Mica Growth is an AI-powered lead automation system built specifically for service businesses in Tampa, Brandon, Riverview, Clearwater, and across the bay area.</strong> It responds to every lead instantly, qualifies them automatically, and books appointments on your calendar — 24/7.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">The Problem Every Tampa Contractor Faces</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            You are on a job site. Your phone rings. You can not answer it. By the time you call back two hours later, that homeowner has already booked with one of the other five contractors they called.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            This happens 10, 15, even 20 times per week for busy contractors. At an average job value of $800-4,000, that is $30,000+ per month in lost revenue — just from missed calls and slow follow-up.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">How Mica Growth Fixes This</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Mica Growth plugs into your existing workflow and handles the gap between when a lead comes in and when it gets handled.
          </p>
          <ul className="mt-4 space-y-3 text-base text-neutral-300">
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> <strong className="text-white">Instant response</strong> — Every form fill, missed call, and chat gets a reply in under 60 seconds via call or text</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> <strong className="text-white">AI qualification</strong> — Asks about the job type, timeline, and budget to filter serious buyers</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> <strong className="text-white">Auto booking</strong> — Qualified leads land on your calendar without any back-and-forth</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> <strong className="text-white">24/7 voice AI</strong> — Your AI receptionist answers and routes calls around the clock</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-white">Built for Tampa Service Businesses</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Mica Growth is not a generic chatbot or call center. It is a full AI system designed for contractors, plumbers, HVAC techs, epoxy companies, roofers, and every other service business that depends on fast response to win jobs.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            We work with businesses across Tampa, Brandon, Riverview, Clearwater, St. Pete, and the surrounding areas. We understand the local market, the competition, and what it takes to win leads in this area.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">What This Means for Your Business</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Imagine every single lead that comes into your business getting a professional, instant response. No more missed calls. No more leads sitting in an inbox for hours. No more losing jobs to the competitor who just happened to pick up the phone first.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            That is what Mica Growth delivers. One system that captures, qualifies, and books — automatically.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90">
              Book a Demo
            </Link>
            <Link href="/ai" className="inline-flex rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/40">
              See The Mica Growth System
            </Link>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-sm text-neutral-500">Related:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link href="/ai-voice-agents-home-services" className="text-sm text-purple-400 hover:underline">AI Voice Agents for Home Services</Link>
              <span className="text-neutral-600">·</span>
              <Link href="/blog/ai-automation-tampa-contractors" className="text-sm text-purple-400 hover:underline">How Tampa Contractors Use AI</Link>
              <span className="text-neutral-600">·</span>
              <Link href="/garage-floor-lead-management" className="text-sm text-purple-400 hover:underline">Garage Floor Lead Management</Link>
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
}
