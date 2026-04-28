"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Filter, Star, X, Zap } from "lucide-react";
import { Link } from "next-view-transitions";

const painPoints = [
  {
    title: "YOU'RE LOSING JOBS TO GUYS WITH WORSE WORK",
    body: "They respond first. You do better floors. Speed wins every time in Florida.",
  },
  {
    title: "YOUR PHONE RINGS WHILE YOU'RE ON A JOB",
    body: "You miss it. They call the next guy. That's $3,000-$8,000 gone before you knew it rang.",
  },
  {
    title: "THE SLOW SEASON DRAINS YOUR PIPELINE EVERY YEAR",
    body: "No system to stay booked through summer rain or the January dip. Just hope.",
  },
  {
    title: "YOU QUOTED 10 JOBS LAST MONTH AND CLOSED 3",
    body: "Without a qualification and follow-up system, you're doing free estimates for tire-kickers.",
  },
] as const;

const systemCards = [
  {
    pill: "ACQUISITION",
    pillClass: "from-blue-500/30 to-sky-400/30 text-blue-100",
    title: "PROJECT ACQUISITION FUNNELS",
    body: "Funnels engineered to convert Florida traffic into scheduled coating estimates - not form fills that ghost you.",
    Icon: Filter,
    iconClass: "text-blue-400",
    widget: "lead",
  },
  {
    pill: "TRAFFIC",
    pillClass: "from-purple-500/30 to-fuchsia-400/30 text-purple-100",
    title: "PAID TRAFFIC ENGINE (META + GOOGLE)",
    body: "Ad systems targeting Florida floor-coating buyers who are ready to book - residential garage floors, commercial spaces, and metallic installs.",
    Icon: BarChart3,
    iconClass: "text-purple-400",
    widget: "traffic",
  },
  {
    pill: "AUTOMATION",
    pillClass: "from-amber-500/30 to-orange-400/30 text-amber-50",
    title: "CRM, AUTOMATION & FOLLOW-UPS",
    body: "AI follow-ups, missed-call text back, lead pipelines, booking confirmations, and reminders. Every lead touched. Nothing falls through.",
    Icon: Zap,
    iconClass: "text-amber-400",
    widget: "automation",
  },
  {
    pill: "AUTHORITY",
    pillClass: "from-blue-500/30 via-purple-500/30 to-amber-400/30 text-white",
    title: "AUTHORITY, PROOF & CONVERSION ASSETS",
    body: "Reviews, before/afters, and credibility systems built to increase your close rate and justify premium pricing in your Florida market.",
    Icon: Star,
    iconClass: "text-amber-300",
    widget: "authority",
  },
] as const;

function AcquisitionWidget() {
  return (
    <div className="mt-4 rounded-xl border border-white/6 bg-[#0f0f0f] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      {/* Animated widget: swap this lead-routing mock with live lead feed data later. */}
      <div className="flex items-center justify-between text-[12px] text-white/70">
        <div className="flex items-center gap-2">
          <span className="lead-dot inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="font-semibold text-white">New Lead - Tampa, FL</span>
        </div>
        <span>Just now</span>
      </div>
      <p className="mt-3 text-sm text-white/90">&quot;I want to redo my garage floor.&quot;</p>
      <p className="mt-3 overflow-hidden whitespace-nowrap border-r border-blue-300/70 pr-1 text-sm text-blue-300 typing-route">
        Routing to qualification...
      </p>
    </div>
  );
}

function TrafficWidget() {
  return (
    <div className="mt-4 rounded-xl border border-white/6 bg-[#0f0f0f] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      {/* Animated widget: replace this ad ticker with real campaign metrics later. */}
      <p className="text-sm font-semibold text-white">Meta Campaign - FL Garage Floors</p>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-white/80 sm:grid-cols-4">
        <div>
          <p className="text-white/45">CTR</p>
          <p className="metric-pulse font-semibold text-white">4.2% <span className="text-emerald-400">↑</span></p>
        </div>
        <div>
          <p className="text-white/45">CPL</p>
          <p className="metric-pulse font-semibold text-white">$18.40 <span className="text-emerald-400">↓</span></p>
        </div>
        <div>
          <p className="text-white/45">Leads today</p>
          <p className="metric-pulse font-semibold text-white">7</p>
        </div>
        <div>
          <p className="text-white/45">Booked</p>
          <p className="metric-pulse font-semibold text-white">3</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="h-2 overflow-hidden rounded-full bg-white/8">
          <div className="traffic-progress h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-amber-400" />
        </div>
        <p className="mt-2 text-sm text-white/60">[████████░░] Optimizing...</p>
      </div>
    </div>
  );
}

function AutomationWidget() {
  return (
    <div className="mt-4 rounded-xl border border-white/6 bg-[#0f0f0f] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      {/* Animated widget: replace this SMS thread simulation with live CRM messaging data later. */}
      <div className="rounded-lg bg-white/[0.03] p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-white">Mica Growth AI</span>
          <span className="text-white/50">0.8s ago</span>
        </div>
        <p className="mt-2 text-sm text-white/80">&quot;Hey! Saw you were interested in garage floor coating. Still looking?&quot;</p>
      </div>
      <div className="automation-reply mt-3 rounded-lg border border-emerald-400/20 bg-emerald-400/8 p-3 opacity-0">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-white">Lead replied</span>
          <span className="text-white/50">Just now</span>
        </div>
        <p className="mt-2 text-sm text-white/90">&quot;Yes! Can we book this week?&quot;</p>
        <p className="mt-2 text-sm text-emerald-300">→ Booking link sent automatically</p>
      </div>
    </div>
  );
}

function AuthorityWidget() {
  return (
    <div className="mt-4 rounded-xl border border-white/6 bg-[#0f0f0f] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      {/* Animated widget: replace this review notification mock with live reputation events later. */}
      <div className="authority-review rounded-lg border border-white/8 bg-white/[0.03] p-3 opacity-0">
        <p className="text-sm font-semibold text-white">⭐⭐⭐⭐⭐ New Review - Google</p>
        <p className="mt-2 text-sm text-white/85">&quot;Best garage floor in Tampa. Done in one day, looked amazing.&quot;</p>
        <p className="mt-2 text-sm text-white/55">- James T., Riverview FL</p>
        <p className="mt-3 text-sm text-amber-300">+1 to your authority score ✓</p>
      </div>
    </div>
  );
}

function SystemWidget({ type }: { type: (typeof systemCards)[number]["widget"] }) {
  if (type === "lead") return <AcquisitionWidget />;
  if (type === "traffic") return <TrafficWidget />;
  if (type === "automation") return <AutomationWidget />;
  return <AuthorityWidget />;
}

export function CallRevenueFlowSection() {
  return (
    <>
      <style jsx>{`
        @keyframes lead-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.18); opacity: 1; }
        }

        @keyframes typing-route {
          0%, 12% { width: 0; }
          35%, 62% { width: 26ch; }
          85%, 100% { width: 0; }
        }

        @keyframes progress-fill {
          0%, 100% { width: 42%; }
          50% { width: 86%; }
        }

        @keyframes metric-float {
          0%, 100% { opacity: 0.78; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-1px); }
        }

        @keyframes reply-fade {
          0%, 25% { opacity: 0; transform: translateY(8px); }
          38%, 82% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(8px); }
        }

        @keyframes review-rise {
          0%, 20% { opacity: 0; transform: translateY(12px); }
          35%, 84% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(12px); }
        }

        .lead-dot {
          animation: lead-pulse 1.5s ease-in-out infinite;
        }

        .typing-route {
          animation: typing-route 4.8s steps(26, end) infinite;
        }

        .traffic-progress {
          animation: progress-fill 4.6s ease-in-out infinite;
        }

        .metric-pulse {
          animation: metric-float 2.8s ease-in-out infinite;
        }

        .automation-reply {
          animation: reply-fade 4s ease-in-out infinite;
        }

        .authority-review {
          animation: review-rise 5s ease-in-out infinite;
        }
      `}</style>

      <section className="w-full bg-[#080808] px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black uppercase tracking-tight text-white">
              TIRED OF MARKETING
            </h2>
            <p className="mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-400 bg-clip-text text-[clamp(2.5rem,5vw,4rem)] font-black uppercase tracking-tight text-transparent">
              THAT DOESN'T GET FLOOR COATING?
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="rounded-[14px] border border-white/[0.06] bg-[#111111] p-8"
            >
              <div className="space-y-6">
                {painPoints.map((point) => (
                  <div key={point.title} className="flex items-start gap-4 border-b border-white/6 pb-6 last:border-b-0 last:pb-0">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                      <X className="h-4 w-4 text-red-500" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold uppercase tracking-[0.04em] text-white">{point.title}</h3>
                      <p className="mt-2 max-w-[34rem] text-[13px] leading-relaxed text-white/55">{point.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
              className="rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-amber-400 p-px"
            >
              <div className="h-full rounded-2xl bg-[rgba(255,255,255,0.03)] p-10 backdrop-blur-md">
                <div className="flex justify-end">
                  <p className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-[13px] font-bold uppercase tracking-[0.12em] text-transparent">
                    WE FIX THIS
                  </p>
                </div>

                <h3 className="mt-6 bg-[linear-gradient(135deg,#3b82f6,#f59e0b)] bg-clip-text text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold uppercase leading-tight text-transparent">
                  WE GET FLOOR COATING.
                  <br />
                  WE GET FLORIDA.
                </h3>

                <p className="mt-4 text-[15px] leading-[1.7] text-white/85">
                  We understand your buyers, your market, your slow seasons, and what it costs when a lead goes cold. We built Mica Growth specifically for Florida floor-coating contractors - so your phone rings, your calendar fills, and you just show up and coat.
                </p>

                <Link
                  href="/#contact"
                  className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#f97316_0%,#f59e0b_68%,#ec4899_100%)] px-6 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_0_24px_rgba(249,115,22,0.28)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_34px_rgba(249,115,22,0.4)]"
                >
                  SPEAK WITH A FLORIDA EPOXY EXPERT <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative isolate w-full overflow-hidden px-4 py-20 md:px-6 md:py-24">
        {/* Epoxy background layering for the Mica Growth System section. */}
        <div className="absolute inset-0 -z-20 bg-[url('/epoxybackground.png')] bg-cover bg-center bg-no-repeat opacity-40" />
        <div className="absolute inset-0 -z-10 bg-[rgba(0,0,0,0.65)]" />

        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/55">
              THE MICA GROWTH SYSTEM
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-black uppercase leading-tight text-white">
              THE INFRASTRUCTURE BEHIND
            </h2>
            <p className="mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400 bg-clip-text text-[clamp(2rem,4.5vw,3.5rem)] font-black uppercase leading-tight text-transparent">
              SCALABLE GROWTH
            </p>
            <p className="mx-auto mt-5 max-w-[680px] text-[17px] leading-[1.6] text-white/70">
              This is not pieced-together marketing. Every component is engineered to attract qualified Florida floor-coating buyers, increase conversion rates, and create predictable booked jobs - month after month.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-5 md:grid-cols-2">
            {systemCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
                className="rounded-[18px] border border-white/8 bg-[rgba(10,10,10,0.75)] p-8 backdrop-blur-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.18)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/8 bg-black/45">
                    <card.Icon className={`h-5 w-5 ${card.iconClass}`} />
                  </div>
                  <span className={`rounded-full bg-gradient-to-r px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${card.pillClass}`}>
                    {card.pill}
                  </span>
                </div>

                <h3 className="mt-5 text-[20px] font-bold uppercase leading-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/70">{card.body}</p>

                <SystemWidget type={card.widget} />
              </motion.article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-white/60">
              One system. Built for Florida floor-coating contractors. Nothing pieced together.
            </p>
            <Link
              href="/ai"
              className="mx-auto mt-5 inline-flex h-14 w-full max-w-[320px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#f97316_0%,#f59e0b_68%,#ec4899_100%)] px-7 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_0_26px_rgba(249,115,22,0.28)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(249,115,22,0.4)]"
            >
              SEE HOW THE SYSTEM WORKS <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
