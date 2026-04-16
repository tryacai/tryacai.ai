import { Background } from "@/components/background";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SMS Consent | ACAI Marketing",
  description: "SMS consent disclosure for ACAI Enterprises LLC.",
};

export default function SMSConsentPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-4 py-20 dark:bg-black md:px-20">
      <Background />
      <div className="relative z-20 flex min-h-screen items-center justify-center">
        <article className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-black/40 p-6 text-white backdrop-blur-md sm:p-8">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold md:text-6xl">SMS Consent</h1>
          </header>

          <section className="space-y-6 text-center">
            <p className="text-base leading-relaxed text-neutral-200 md:text-lg">
              ACAI Enterprises LLC communicates with business owners via SMS regarding demo scheduling, onboarding updates, and product notifications.
            </p>

            <p className="text-base leading-relaxed text-neutral-200 md:text-lg">
              By submitting a form on tryacai.ai and selecting the SMS consent checkbox, you consent to receive SMS messages from ACAI Enterprises LLC.
            </p>

            <ul className="list-disc space-y-2 pl-6 text-left text-neutral-200">
              <li>Message frequency varies</li>
              <li>Message and data rates may apply</li>
              <li>
                Reply <strong className="text-white">STOP</strong> to opt out at any time
              </li>
              <li>
                Reply <strong className="text-white">HELP</strong> for assistance
              </li>
            </ul>

            <nav aria-label="SMS legal links" className="pt-2 text-sm text-neutral-200">
              <p>
                Privacy Policy: <Link href="/privacy-policy" className="underline hover:text-white">Privacy Policy</Link>
              </p>
              <p>
                Terms and Conditions: <Link href="/terms" className="underline hover:text-white">Terms and Conditions</Link>
              </p>
            </nav>
          </section>
        </article>
      </div>
    </main>
  );
}
