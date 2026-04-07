import { Link } from "next-view-transitions";

const relatedLinks = [
  { title: "The ACAI System", href: "/ai" },
  { title: "Tampa Contractor Automation", href: "/tampa-contractor-automation" },
  { title: "AI Voice Agents for Home Services", href: "/ai-voice-agents-home-services" },
];

export function BlogCTA() {
  return (
    <div className="mt-16 space-y-10 border-t border-neutral-200 pt-10 dark:border-neutral-800">
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center dark:border-neutral-800 dark:bg-neutral-900/50 md:p-8">
        <p className="text-lg font-semibold text-neutral-800 dark:text-white">
          Want to see how this would work for your business?
        </p>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Book a quick demo and we&apos;ll walk you through it.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Book Demo
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Get Free Audit
          </Link>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Explore More
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-neutral-200 px-4 py-1.5 text-sm text-neutral-600 transition hover:border-purple-400/40 hover:text-purple-500 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-purple-400/40 dark:hover:text-purple-300"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
