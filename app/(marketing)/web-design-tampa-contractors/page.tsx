import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Background } from "@/components/background";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Design for Tampa Contractors | ACAI",
  description:
    "High-converting contractor websites built to capture leads, rank locally, and integrate with AI automation. Purpose-built for Tampa and Florida service businesses.",
};

export default function WebDesignTampaPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>
      <Container className="relative z-20 pb-24 pt-32 md:pt-40">
        <article className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Web Design for Tampa Contractors
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-300">
            Most contractor websites look the same: stock photos, a phone number, and a contact form nobody uses. That's not a lead engine — it's a digital business card. Tampa contractors need websites that actually convert visitors into booked jobs.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">Why Your Website Is Losing You Jobs</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Your website is the first impression most customers get, and most contractor sites fail at the basic job of converting traffic into leads. Here's what typically goes wrong:
          </p>
          <ul className="mt-4 space-y-3 text-base text-neutral-300">
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> No clear call to action — visitors don't know what to do next</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> Slow load times — anything over 3 seconds loses half your visitors</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> No mobile optimization — 70%+ of local searches happen on phones</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> Generic templates that don't differentiate you from competitors</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> No automated follow-up — form submissions sit in an inbox for hours</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-white">What a High-Converting Contractor Website Looks Like</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            The best contractor websites in Tampa don't just look good — they're engineered to convert. Every page element has a purpose: build trust, demonstrate expertise, and make it brain-dead easy for someone to book a service.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Key elements that drive conversions:
          </p>
          <ul className="mt-4 space-y-3 text-base text-neutral-300">
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> <strong className="text-white">Speed-optimized pages</strong> load in under 2 seconds on mobile</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> <strong className="text-white">Service-specific landing pages</strong> that rank for local search terms</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> <strong className="text-white">Social proof</strong> — real reviews, ratings, and before/after photos</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> <strong className="text-white">One-tap call/book buttons</strong> prominent on every page</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> <strong className="text-white">AI chat and voice integration</strong> so visitors get instant answers</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-white">Web Design + AI Automation = More Jobs</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            A great website alone isn't enough. When you connect it to ACAI's automation engine, every lead gets qualified and booked instantly. A visitor lands on your roofing page, fills out a form, and within 30 seconds gets a call from your AI agent to schedule an estimate — before they even check your competitor's site.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            That's the difference between a website and a lead engine. The website captures intent. The AI converts it.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">Local SEO for Tampa, Brandon, Riverview & Beyond</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            We build contractor websites optimized for local search. That means proper schema markup, Google Business Profile integration, location-specific pages, and content strategies that help you rank for high-intent keywords like "plumber near me" or "epoxy floor installer Tampa."
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Serving contractors across Tampa, Brandon, Riverview, Clearwater, St. Petersburg, and all of the Tampa Bay metro area.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90">
              Get a Free Website Audit
            </Link>
            <Link href="/ai" className="inline-flex rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/40">
              See The ACAI System
            </Link>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-sm text-neutral-500">Related:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link href="/tampa-contractor-automation" className="text-sm text-purple-400 hover:underline">Tampa Contractor Automation</Link>
              <span className="text-neutral-600">·</span>
              <Link href="/ai-voice-agents-home-services" className="text-sm text-purple-400 hover:underline">AI Voice Agents for Home Services</Link>
              <span className="text-neutral-600">·</span>
              <Link href="/blog/ai-automation-tampa-contractors" className="text-sm text-purple-400 hover:underline">AI Automation for Tampa Contractors</Link>
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
}
