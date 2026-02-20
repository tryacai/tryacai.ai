import { Background } from "@/components/background";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SMS Consent - ACAI AI",
  description: "SMS consent disclosure for ACAI Enterprises LLC.",
};

export default function SMSConsentPage() {
  return (
    <main className="relative overflow-hidden bg-white px-4 py-20 dark:bg-black md:px-20">
      <Background />
      <article className="relative z-20 mx-auto max-w-4xl text-white">
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">SMS Consent</h1>
        </header>

        <section className="space-y-6 text-center md:text-left">
          <p className="text-base leading-relaxed text-neutral-200 md:text-lg">
            ACAI Enterprises LLC communicates with business owners via SMS regarding demo scheduling, onboarding updates, and product notifications.
          </p>

          <p className="text-base leading-relaxed text-neutral-200 md:text-lg">
            By providing your phone number or texting <strong className="text-white">START</strong> to <strong className="text-white">(813) 253-9552</strong>, you agree to receive SMS messages from ACAI Enterprises LLC.
          </p>

          <ul className="list-disc space-y-2 pl-6 text-neutral-200">
            <li>Message frequency varies</li>
            <li>Message and data rates may apply</li>
            <li>
              Reply <strong className="text-white">STOP</strong> to opt out at any time
            </li>
            <li>
              Reply <strong className="text-white">HELP</strong> for assistance
            </li>
          </ul>

          <p className="text-sm text-neutral-300">
            Alternate support line: <strong className="text-white">(813) 535-4103</strong>
          </p>

          <nav aria-label="SMS legal links" className="pt-2 text-sm text-neutral-200">
            <p>
              Privacy Policy: <Link href="/privacy-policy" className="underline hover:text-white">/privacy-policy</Link>
            </p>
            <p>
              Terms and Conditions: <Link href="/terms" className="underline hover:text-white">/terms</Link>
            </p>
          </nav>
        </section>
      </article>
    </main>
  );
}
