import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Link } from "next-view-transitions";

const hubCards = [
  {
    title: "Web Funnel",
    description: "Capture demand the moment it lands and move every lead into a guided conversion path.",
    href: "/web-funnel",
    visual: "from-blue-500/25 via-purple-500/20 to-red-500/25",
  },
  {
    title: "Chat Widget",
    description: "Engage site visitors instantly with context-aware prompts and qualification logic.",
    href: "/chat-widget",
    visual: "from-red-500/20 via-purple-500/25 to-blue-500/20",
  },
  {
    title: "Voice AI",
    description: "Answer, qualify, and route inbound calls in seconds with ACAI Concierge.",
    href: "/voice-ai",
    visual: "from-blue-500/20 via-purple-500/30 to-red-500/20",
  },
  {
    title: "Automation Engine",
    description: "Connect capture, qualification, and booking into one operating system.",
    href: "/automation-engine",
    visual: "from-purple-500/24 via-blue-500/20 to-red-500/24",
  },
] as const;

export default function AiPage() {
  return (
    <div className="relative overflow-hidden py-24 md:py-0">
      <Background />
      <Container className="relative z-20 pb-24 md:pt-36">
        <section className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-300/70 md:text-sm">System Hub</p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Explore the ACAI Product System</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg">
            Every module is designed to close response-time gaps and convert more of the demand you already paid for.
          </p>
        </section>

        <section className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
          {hubCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-7 transition-all duration-300 hover:scale-[1.01] hover:border-white/20"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.visual} opacity-70`} />
              <div className="pointer-events-none absolute -right-14 top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl transition-transform duration-300 group-hover:scale-110" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white md:text-3xl">{card.title}</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-200 md:text-base">{card.description}</p>
                <span className="mt-6 inline-block rounded-full bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-100 ring-1 ring-white/20">
                  Learn More
                </span>
              </div>
            </Link>
          ))}
        </section>
      </Container>
    </div>
  );
}
