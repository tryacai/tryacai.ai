import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Background } from "@/components/background";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Epoxy Lead Generation in Florida | ACAI",
  description:
    "Florida epoxy and garage floor companies are losing leads to slow follow-up. ACAI automates instant response and booking so you close more jobs.",
};

export default function FloridaEpoxyLeadGenerationPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>
      <Container className="relative z-20 pb-24 pt-32 md:pt-40">
        <article className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Epoxy Lead Generation in Florida
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-300">
            Florida epoxy lead generation is competitive. Homeowners searching for epoxy garage floors in Tampa, Clearwater, Brandon, and Riverview are ready to buy — but they go with whoever responds first. If your leads sit for hours, you are paying for someone else's next job.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">Why Epoxy Leads Require Speed</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Epoxy flooring is a high-intent purchase. When someone searches "epoxy garage floor near me," they are not browsing. They want a quote and a date. These leads go cold in minutes, not hours.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Most epoxy companies in Florida respond in 2-4 hours. By then, the customer has already spoken to two other companies and booked the one who called back first.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">The Cost of Slow Follow-Up</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            A typical Florida epoxy company gets 30-50 leads per month with an average job value of $3,000-4,500. Losing even 30% of those leads to slow response time means <strong className="text-white">$27,000-67,000 per month in lost revenue</strong>.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            That is not a marketing problem. Your ads are working. Your leads are real. The problem is what happens after the lead comes in.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">How ACAI Captures More Epoxy Leads</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            ACAI is an AI-powered lead automation system that responds to every epoxy lead the moment it comes in. Here is how it works:
          </p>
          <ul className="mt-4 space-y-3 text-base text-neutral-300">
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> Lead comes in from Google Ads, Facebook, website form, or phone call</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> AI responds in under 60 seconds via text or outbound call</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> AI qualifies — garage size, coating type, timeline, budget</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> Qualified leads get booked directly on your calendar</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> Runs 24/7 — even nights, weekends, and holidays</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-white">Serving All of Florida</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            We work with epoxy and garage floor companies across Tampa, Clearwater, St. Petersburg, Brandon, Riverview, Lakeland, Sarasota, and throughout Florida. Wherever you operate, ACAI handles your leads the same way — instantly, consistently, and professionally.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-white">Stop Losing Leads. Start Booking Jobs.</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            If you are running ads and not responding to leads within minutes, you are funding your competition. ACAI makes sure every lead gets a response, every qualified buyer gets booked, and you never miss another opportunity.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90">
              Book a Demo
            </Link>
            <Link href="/contact" className="inline-flex rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/40">
              Get Free Audit
            </Link>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-sm text-neutral-500">Related:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link href="/ai" className="text-sm text-purple-400 hover:underline">The ACAI System</Link>
              <span className="text-neutral-600">·</span>
              <Link href="/garage-floor-lead-management" className="text-sm text-purple-400 hover:underline">Garage Floor Lead Management</Link>
              <span className="text-neutral-600">·</span>
              <Link href="/blog/ai-epoxy-companies-book-more-jobs" className="text-sm text-purple-400 hover:underline">AI for Epoxy Companies</Link>
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
}
