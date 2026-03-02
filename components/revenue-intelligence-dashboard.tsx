"use client";

import { motion, useInView } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BadgeAlert,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Home,
  PhoneCall,
  PhoneForwarded,
  ShieldCheck,
  ShieldX,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "next-view-transitions";

function CountUp({ value, suffix = "", prefix = "", duration = 1200 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const start = performance.now();

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [duration, isInView, value]);

  return <span ref={ref}>{`${prefix}${displayValue.toLocaleString()}${suffix}`}</span>;
}

const callPerformance = [
  { label: "Total Calls", value: 486, icon: PhoneCall, trend: "+6%" },
  { label: "Calls Answered", value: 442, icon: CheckCircle2, trend: "+4%" },
  { label: "Missed Calls Recovered", value: 31, icon: PhoneForwarded, trend: "+9%" },
  { label: "Spam Calls Blocked", value: 28, icon: ShieldX, trend: "+3%" },
  { label: "Average Answer Time", value: 24, suffix: "s", icon: Clock3, trend: "-8%" },
  { label: "After Hours Calls", value: 67, icon: BadgeAlert, trend: "+12%" },
] as const;

const revenueBars = [
  { label: "Booked Jobs", value: 54, amount: "$78k" },
  { label: "Emergency Jobs", value: 19, amount: "$41k" },
  { label: "Saved Calls", value: 23, amount: "$26k" },
  { label: "High Value", value: 12, amount: "$37k" },
] as const;

const funnelStages = [
  { stage: "Call Received", value: 486 },
  { stage: "Qualified", value: 338 },
  { stage: "Booked", value: 214 },
  { stage: "In Progress", value: 187 },
  { stage: "Completed", value: 171 },
  { stage: "Invoiced", value: 160 },
  { stage: "Paid", value: 148 },
] as const;

const stageDistribution = [
  { label: "Residential", value: 42, color: "from-purple-500 to-blue-500", icon: Home },
  { label: "Commercial", value: 21, color: "from-cyan-500 to-blue-500", icon: Building2 },
  { label: "High Value Property", value: 14, color: "from-amber-400 to-orange-500", icon: Sparkles },
  { label: "Repeat Caller", value: 11, color: "from-emerald-500 to-green-500", icon: CalendarCheck2 },
  { label: "Unqualified", value: 8, color: "from-zinc-400 to-zinc-500", icon: AlertTriangle },
  { label: "Spam", value: 4, color: "from-red-500 to-rose-500", icon: ShieldCheck },
] as const;

export function RevenueIntelligenceDashboard() {
  const emergencyProgress = 72;

  const donutBackground = useMemo(() => {
    const stops: string[] = [];
    let current = 0;

    stageDistribution.forEach((item) => {
      const start = current;
      const end = current + item.value;
      current = end;

      const hex =
        item.label === "Residential"
          ? "#8b5cf6"
          : item.label === "Commercial"
            ? "#06b6d4"
            : item.label === "High Value Property"
              ? "#f59e0b"
              : item.label === "Repeat Caller"
                ? "#10b981"
                : item.label === "Unqualified"
                  ? "#71717a"
                  : "#f43f5e";

      stops.push(`${hex} ${start}% ${end}%`);
    });

    return `conic-gradient(${stops.join(", ")})`;
  }, []);

  return (
    <section className="relative z-20 w-full py-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-purple-300/70">Revenue Intelligence Report</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">ACAI Revenue Intelligence Dashboard™</h2>
          <p className="mt-4 text-xl font-medium text-neutral-100 md:text-2xl">Know Exactly What Every Call Is Worth.</p>
          <p className="mx-auto mt-3 max-w-3xl text-base text-neutral-300 md:text-lg">
            Every call. Every emergency. Every booked job. Fully tracked and attributed.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-3xl border border-white/12 bg-black/50 p-5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(10,10,30,0.45)] xl:col-span-4"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">Call Performance</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {callPerformance.map((metric) => {
                const MetricIcon = metric.icon;
                const trendUp = !metric.trend.startsWith("-");
                return (
                  <div key={metric.label} className="rounded-xl border border-white/10 bg-black/45 p-3 transition-all duration-200 hover:border-purple-400/40 hover:bg-black/60">
                    <div className="flex items-center justify-between">
                      <MetricIcon className="h-4 w-4 text-purple-300" />
                      <span className={`inline-flex items-center gap-1 text-xs ${trendUp ? "text-emerald-300" : "text-amber-300"}`}>
                        {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {metric.trend}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-neutral-400">{metric.label}</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      <CountUp value={metric.value} suffix={"suffix" in metric ? metric.suffix : ""} />
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl border border-white/12 bg-black/50 p-5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(10,10,30,0.45)] xl:col-span-5"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">Revenue Intelligence</h3>
            <div className="space-y-4">
              {revenueBars.map((bar) => (
                <div key={bar.label}>
                  <div className="mb-1 flex items-center justify-between text-xs text-neutral-300">
                    <span>{bar.label}</span>
                    <span className="font-medium text-white">{bar.amount}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.value}%` }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff]"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/12 bg-black/55 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Total Influenced Revenue</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                <CountUp value={182000} prefix="$" />
              </p>
              <p className="mt-1 text-xs text-emerald-300">From booked calls, saved calls, and emergency captures.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-white/12 bg-black/50 p-5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(10,10,30,0.45)] xl:col-span-3"
          >
            <h3 className="mb-5 text-lg font-semibold text-white">Emergency Visibility</h3>
            <div className="mx-auto mb-4 flex h-36 w-36 items-center justify-center rounded-full border border-white/12 bg-black/40">
              <div
                className="relative flex h-28 w-28 items-center justify-center rounded-full"
                style={{ background: `conic-gradient(#ef4444 0 ${emergencyProgress}%, rgba(255,255,255,0.12) ${emergencyProgress}% 100%)` }}
              >
                <div className="h-20 w-20 rounded-full bg-black/85" />
                <p className="absolute text-xl font-semibold text-white">
                  <CountUp value={emergencyProgress} suffix="%" />
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-neutral-300">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3 py-2">
                <span>Emergency Calls This Week</span>
                <span className="font-semibold text-white"><CountUp value={19} /></span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3 py-2">
                <span>Emergency Response Time</span>
                <span className="font-semibold text-white"><CountUp value={2} suffix="m" /></span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3 py-2">
                <span>After Hours Dispatch Count</span>
                <span className="font-semibold text-white"><CountUp value={11} /></span>
              </div>
            </div>
            <motion.div
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-200"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              Active emergency monitoring enabled
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-3xl border border-white/12 bg-black/50 p-5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(10,10,30,0.45)] xl:col-span-7"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">Plumbing Operations Funnel</h3>
            <div className="space-y-3">
              {funnelStages.map((item) => {
                const width = Math.max((item.value / funnelStages[0].value) * 100, 28);
                return (
                  <div key={item.stage}>
                    <div className="mb-1 flex items-center justify-between text-sm text-neutral-300">
                      <span>{item.stage}</span>
                      <span className="font-semibold text-white">{item.value}</span>
                    </div>
                    <div className="h-10 overflow-hidden rounded-xl border border-white/10 bg-black/35 px-2 py-1">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${width}%` }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                        className="flex h-full items-center rounded-lg bg-gradient-to-r from-red-500/60 via-purple-500/60 to-blue-500/60 px-3 text-xs font-medium text-white"
                      >
                        {item.stage}
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl border border-white/12 bg-black/50 p-5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(10,10,30,0.45)] xl:col-span-5"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">Stage Distribution</h3>
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-white/12 bg-black/40" style={{ background: donutBackground }}>
                <div className="h-28 w-28 rounded-full bg-black/85" />
              </div>

              <div className="grid flex-1 grid-cols-1 gap-2 text-xs text-neutral-300">
                {stageDistribution.map((item) => {
                  const StageIcon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/35 px-3 py-2">
                      <span className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${item.color}`} />
                        <StageIcon className="h-3.5 w-3.5 text-neutral-400" />
                        {item.label}
                      </span>
                      <span className="font-semibold text-white">{item.value}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/12 bg-black/45 p-4">
              <h4 className="text-sm font-semibold text-white">Qualification Metrics</h4>
              <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-neutral-300 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-black/35 px-3 py-2">Qualified vs Unqualified: <span className="text-white">81% / 19%</span></div>
                <div className="rounded-lg border border-white/10 bg-black/35 px-3 py-2">Commercial vs Residential: <span className="text-white">33% / 67%</span></div>
                <div className="rounded-lg border border-white/10 bg-black/35 px-3 py-2">Repeat Callers: <span className="text-white">11%</span></div>
                <div className="rounded-lg border border-white/10 bg-black/35 px-3 py-2">High Value Property Flags: <span className="text-white">14%</span></div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mt-5 rounded-3xl border border-white/12 bg-black/55 p-6 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(10,10,30,0.45)]"
        >
          <h3 className="text-2xl font-semibold text-white">Built to Work With Your Existing System.</h3>
          <p className="mt-3 max-w-3xl text-neutral-300">
            ACAI integrates with your existing CRM and dispatch system. Or we provide a structured tracking layer if you don’t have one.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {[
              "ServiceTitan",
              "Housecall Pro",
              "Jobber",
              "FieldEdge",
            ].map((logo) => (
              <div key={logo} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium tracking-wide text-neutral-400 grayscale transition-colors duration-200 hover:text-neutral-200">
                {logo}
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-neutral-300">
              <p className="font-semibold text-white">If you use one of these systems:</p>
              <p className="mt-2">We sync call outcomes and booked jobs directly into your workflow.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-neutral-300">
              <p className="font-semibold text-white">If you don’t:</p>
              <p className="mt-2">We provide the ACAI Pipeline — structured, tagged, and revenue-attributed.</p>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(123,0,255,0.35)]"
            >
              <Activity className="h-4 w-4" />
              See How ACAI Syncs With Your Workflow
            </Link>
          </div>
        </motion.div>

        <p className="mx-auto mt-6 max-w-4xl text-center text-sm text-neutral-400 md:text-base">
          Whether powered by AI or live agents, ACAI tracks, qualifies, and attributes every call.
        </p>
      </div>
    </section>
  );
}
