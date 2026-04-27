import { Background } from "@/components/background";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SMS Consent",
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
              By submitting a form on micagrowth.co and selecting the SMS consent checkbox, you consent to receive SMS messages from ACAI Enterprises LLC.
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

            {/* ── Opt-in form preview ── */}
            <div className="pt-6 flex flex-col items-center gap-3">
              <p className="text-xs text-neutral-500 uppercase tracking-widest">
                Opt-in form preview — as shown on micagrowth.co
              </p>

              <div className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-2xl text-left">
                {/* Mock phone input */}
                <label className="block text-sm font-medium text-neutral-300 mb-1">Phone Number</label>
                <div className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3.5 text-neutral-500 text-base select-none">
                  Your phone number
                </div>

                {/* SMS consent block — identical to hero.tsx */}
                <div className="mt-3 mb-3 flex flex-col gap-1">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      disabled
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-purple-500"
                      aria-label="SMS consent preview (display only)"
                    />
                    <span className="text-xs text-neutral-400 leading-relaxed">
                      By checking this box, I agree to receive SMS messages from ACAI Enterprises LLC (Mica Growth) regarding my inquiry. Message and data rates may apply. Message frequency varies. Reply STOP to unsubscribe at any time. Reply HELP for assistance. Consent is not a condition of any purchase or service.
                    </span>
                  </label>
                  <div className="pl-5 text-xs text-neutral-500">
                    <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-300 transition-colors">Privacy Policy</Link>
                    {" | "}
                    <Link href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-300 transition-colors">Terms of Service</Link>
                  </div>
                </div>

                {/* Mock Continue button */}
                <div className="flex gap-3">
                  <div className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-medium text-neutral-500 text-center select-none">
                    ← Back
                  </div>
                  <div className="flex-1 rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 py-3.5 text-sm font-semibold text-white text-center select-none opacity-40">
                    Continue →
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-500 max-w-md text-center">
                The checkbox is unchecked by default. Submitting the form does not require SMS consent.
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
