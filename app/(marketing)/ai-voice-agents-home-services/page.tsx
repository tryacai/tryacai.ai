import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Background } from "@/components/background";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Voice Agents for Home Services",
  description:
    "AI voice agents answer calls, qualify leads, and book appointments 24/7 for home service businesses. Never miss another call or job opportunity.",
};

export default function AiVoiceAgentsPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>
      <Container className="relative z-20 pb-24 pt-32 md:pt-40">
        <article className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            AI Voice Agents for Home Service Businesses
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-300">
            Home service businesses in Tampa and across Florida lose more revenue to missed calls than almost anything else. AI voice agents fix this by answering every call instantly, qualifying callers, and booking appointments — all without a human picking up the phone.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">What Is an AI Voice Agent?</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            An AI voice agent is an intelligent phone system that answers calls, has natural conversations with callers, asks qualifying questions, and takes action — like booking an appointment or routing to the right person. It sounds natural, responds instantly, and works around the clock.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            This is not an IVR menu or a generic answering service. It is a real AI that understands context, handles objections, and moves leads through your pipeline.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">Why Home Service Businesses Need This</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            If you run a plumbing, HVAC, epoxy, roofing, electrical, or any other home service business, your phone is your lifeline. Every missed call is a missed job. And the numbers are brutal:
          </p>
          <ul className="mt-4 space-y-3 text-base text-neutral-300">
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> Service businesses miss up to <strong className="text-white">60% of inbound calls</strong> during peak hours</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> <strong className="text-white">78% of customers</strong> choose the first business to respond</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> Average response time of 3-4 hours means most leads are already gone</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> Nobody leaves voicemails anymore — they just call the next company</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-white">How Mica Growth Voice AI Works</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            The Mica Growth voice agent plugs into your existing phone system and handles calls like a trained receptionist:
          </p>
          <ol className="mt-4 space-y-3 text-base text-neutral-300 list-decimal list-inside">
            <li>Customer calls your business number</li>
            <li>AI answers instantly — no hold music, no rings</li>
            <li>AI greets the caller naturally and asks about their service need</li>
            <li>AI qualifies: job type, timeline, budget, location</li>
            <li>If qualified, AI books the appointment directly on your calendar</li>
            <li>Caller gets a confirmation text. You get a notification.</li>
          </ol>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            The entire interaction takes 2-3 minutes. The caller feels heard. You get a booked job. Nobody had to stop what they were doing.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">24/7 Coverage Without the Overhead</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Hiring a full-time receptionist costs $3,000-4,000 per month — and they only cover business hours. An answering service costs $500-1,500 per month and delivers a generic experience that loses leads.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Mica Growth's voice AI runs 24/7/365. Nights. Weekends. Holidays. It costs a fraction of a human hire and never takes a sick day.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">Built for Tampa and Florida Service Businesses</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            We work with contractors, plumbers, HVAC companies, epoxy floor installers, landscapers, and more across Tampa, Brandon, Riverview, Clearwater, and all of Florida. The system is customized for your specific services, pricing, and scheduling.
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
              <Link href="/tampa-contractor-automation" className="text-sm text-purple-400 hover:underline">Tampa Contractor Automation</Link>
              <span className="text-neutral-600">·</span>
              <Link href="/blog/florida-service-businesses-lose-calls" className="text-sm text-purple-400 hover:underline">Why Florida Businesses Lose 60% of Calls</Link>
              <span className="text-neutral-600">·</span>
              <Link href="/florida-epoxy-lead-generation" className="text-sm text-purple-400 hover:underline">Florida Epoxy Lead Generation</Link>
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
}
