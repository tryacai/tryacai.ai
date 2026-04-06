"use client";

import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Link } from "next-view-transitions";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Calculator, Clock3, Play, ShieldCheck, Wallet, X, Smartphone, CheckCircle2, RotateCcw, Activity, PhoneCall, Zap } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";

const stats = [
  "391% increase in conversions with <5 min response",
  "60% of leads choose the first responder",
  "Companies lose $14,520/month in missed opportunities",
];

const chatScript = [
  {
    user: "Do you install same week?",
    ai: "Yes. I can check availability now and pre-qualify your project in under 30 seconds.",
  },
  {
    user: "Can you text me pricing options?",
    ai: "Absolutely. I can send a range instantly and route your request to the right specialist.",
  },
  {
    user: "I need this done fast.",
    ai: "Got it. I am flagging this as urgent and opening priority follow-up now.",
  },
] as const;

const transcriptMoments = [
  { t: 3, label: "Qualification", text: "Great, what timeline are you working with?" },
  { t: 9, label: "Booking", text: "I can lock a consultation tomorrow at 11:30 AM." },
  { t: 15, label: "Handoff", text: "Perfect, I have sent your details to the account manager." },
] as const;

const flowSteps = [
  "Lead comes in (form/call/chat)",
  "AI responds in <60 seconds",
  "AI pre-qualifies budget, timeline, and project type",
  "AI books consultation or escalates to human",
  "You show up to warm, qualified lead",
] as const;

function DemoPreview() {
  const [stage, setStage] = useState<"before" | "rewind" | "after" | "result">("before");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (stage === "before") {
            setStage("rewind");
            return 0;
          }
          if (stage === "rewind") {
            setStage("after");
            return 0;
          }
          if (stage === "after") {
            setStage("result");
            return 0;
          }
          if (stage === "result") {
            setStage("before");
            return 0;
          }
        }
        return prev + (stage === "rewind" ? 10 : 0.8);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-xl border border-white/10 bg-black/80 font-sans">
      <AnimatePresence mode="wait">
        {stage === "before" && (
          <motion.div
            key="before"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full flex-col items-center justify-center p-6 text-center"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-red-500/20 flex items-center justify-center border border-red-500/30">
                <Smartphone className="h-6 w-6 text-red-400" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">Before ACAI</p>
                <p className="text-sm text-white font-medium">Customer Clicks Ad</p>
              </div>
            </div>
            <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-red-500" 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-4 text-sm text-neutral-400">Waiting for response... <span className="text-red-400 font-mono">2 hours later</span></p>
            <p className="mt-2 text-xs text-red-400/70 italic">"I'll just call the other company..."</p>
          </motion.div>
        )}

        {stage === "rewind" && (
          <motion.div
            key="rewind"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full flex-col items-center justify-center bg-blue-600/20 backdrop-blur-sm"
          >
            <RotateCcw className="h-12 w-12 text-blue-400 animate-spin" />
            <p className="mt-4 text-xl font-bold text-white italic tracking-tighter uppercase">Rewinding with ACAI...</p>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/vhs.png')] opacity-30 pointer-events-none" />
          </motion.div>
        )}

        {stage === "after" && (
          <motion.div
            key="after"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full flex-col items-center justify-center p-6 text-center"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="relative">
                <div className="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40">
                  <Activity className="h-7 w-7 text-blue-400 animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <Zap className="h-3 w-3 text-white fill-white" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">ACAI System Active</p>
                <p className="text-lg text-white font-bold">Instant Lead Response</p>
              </div>
            </div>
            
            <div className="flex gap-2 mb-4">
              {[0, 1, 2].map((i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: progress > (i * 33) ? 1 : 0.3 }}
                  className="h-1.5 w-16 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
              <PhoneCall className="h-4 w-4 animate-bounce" />
              <span>Triggering Outbound Voice AI... <span className="font-mono text-white">0.4s</span></span>
            </div>
          </motion.div>
        )}

        {stage === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex h-full flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-600/10"
          >
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 mb-4">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
            <h4 className="text-xl font-bold text-white">Lead Qualified & Booked</h4>
            <p className="mt-2 text-sm text-neutral-300">Epoxy Flooring Project: <span className="text-white font-semibold">$4,200 Job</span></p>
            <div className="mt-4 px-4 py-1.5 rounded-full bg-blue-500 text-xs font-bold text-white uppercase tracking-widest">
              391% ROI Increase
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Progress Bar at Bottom */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-white/5">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
    </div>
  );
}

export default function AiPage() {
  const [metricIndex, setMetricIndex] = useState(0);
  const [timelinePlayhead, setTimelinePlayhead] = useState(0);

  const [demoName, setDemoName] = useState("");
  const [demoEmail, setDemoEmail] = useState("");
  const [webFunnelSubmitted, setWebFunnelSubmitted] = useState(false);
  const [webFunnelLoading, setWebFunnelLoading] = useState(false);

  const [chatInput, setChatInput] = useState("");
  const [chatThread, setChatThread] = useState<Array<{ from: "user" | "ai"; text: string }>>([
    { from: "ai", text: "Hi, I can qualify your lead and route the right next step instantly." },
  ]);
  const [chatTyping, setChatTyping] = useState(false);

  const [voicePlaying, setVoicePlaying] = useState(false);
  const [voiceProgress, setVoiceProgress] = useState(0);

  const [leadsPerMonth, setLeadsPerMonth] = useState(150);
  const [avgDealValue, setAvgDealValue] = useState(1200);
  const [responseMinutes, setResponseMinutes] = useState(95);
  const [comparison, setComparison] = useState(35);

  const [videoEmail, setVideoEmail] = useState("");
  const [videoSubmitted, setVideoSubmitted] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setMetricIndex((previous) => (previous + 1) % stats.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimelinePlayhead((previous) => (previous + 1) % 3);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!voicePlaying) {
      return;
    }

    const timer = setInterval(() => {
      setVoiceProgress((previous) => {
        if (previous >= 18) {
          setVoicePlaying(false);
          return 0;
        }
        return previous + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [voicePlaying]);

  useEffect(() => {
    const onMouseLeave = (event: MouseEvent) => {
      if (exitIntentShown) {
        return;
      }
      if (event.clientY <= 0) {
        setShowExitIntent(true);
        setExitIntentShown(true);
      }
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [exitIntentShown]);

  const estimatedLoss = useMemo(() => {
    const responsePenalty = Math.min(responseMinutes / 120, 1);
    return Math.round(leadsPerMonth * avgDealValue * (0.08 + responsePenalty * 0.22));
  }, [avgDealValue, leadsPerMonth, responseMinutes]);

  const formattedLoss = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(estimatedLoss),
    [estimatedLoss],
  );

  const activeTranscript = useMemo(() => {
    return transcriptMoments.findLast((entry) => voiceProgress >= entry.t) ?? transcriptMoments[0];
  }, [voiceProgress]);

  const flowActiveStep = Math.min(Math.floor((timelinePlayhead + voiceProgress / 6) % flowSteps.length), flowSteps.length - 1);

  const webFunnelSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWebFunnelLoading(true);
    setWebFunnelSubmitted(false);
    window.setTimeout(() => {
      setWebFunnelLoading(false);
      setWebFunnelSubmitted(true);
    }, 1200);
  };

  const sendChat = () => {
    if (!chatInput.trim()) {
      return;
    }
    const nextInput = chatInput.trim();
    setChatThread((previous) => [...previous, { from: "user", text: nextInput }]);
    setChatInput("");
    setChatTyping(true);

    window.setTimeout(() => {
      const response = chatScript[chatThread.length % chatScript.length].ai;
      setChatTyping(false);
      setChatThread((previous) => [...previous, { from: "ai", text: response }]);
    }, 900);
  };

  const statsSources = [
    "Source: Harvard Business Review, lead response speed benchmarks",
    "Source: Industry sales response behavior studies",
    "Source: ACAI internal opportunity-loss modeling",
  ];

  return (
    <div className="relative overflow-hidden py-24 md:py-0">
      <Background />
      <Container className="relative z-20 pb-24 md:pt-36">
        <section className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-purple-300/70 md:text-sm">ACAI System</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-center text-4xl font-semibold leading-tight text-white md:text-6xl">
            Your Leads Are Choosing Whoever Responds First. Here&apos;s How to Win That Race.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-neutral-300 md:text-lg">
            Lead response automation, instant follow up system logic, and qualification flows that help you convert more leads.
          </p>

          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-white/12 bg-black/45 px-5 py-4 text-center backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.p
                key={metricIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-sm font-semibold text-transparent md:text-base"
              >
                {stats[metricIndex]}
              </motion.p>
            </AnimatePresence>
            <p className="mt-1 text-[11px] text-neutral-500">{statsSources[metricIndex]}</p>
          </div>
        </section>

        <section className="mx-auto mt-10 grid w-full max-w-6xl gap-6 rounded-3xl border border-white/10 bg-black/45 p-5 backdrop-blur-sm md:p-8">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Response Time Timeline</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <motion.div
              animate={{ opacity: timelinePlayhead >= 0 ? 1 : 0.45, y: timelinePlayhead === 0 ? -3 : 0 }}
              className="rounded-2xl border border-white/12 bg-black/55 p-4"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">2:00:00 PM</p>
              <p className="mt-2 text-sm text-white">Customer fills out form</p>
            </motion.div>
            <motion.div
              animate={{ opacity: timelinePlayhead >= 1 ? 1 : 0.4, y: timelinePlayhead === 1 ? -3 : 0 }}
              className="rounded-2xl border border-red-400/25 bg-red-500/8 p-4"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-red-300/80">5:30:00 PM</p>
              <p className="mt-2 text-sm text-white">Competitor responds 3.5 hours later</p>
            </motion.div>
            <motion.div
              animate={{ opacity: timelinePlayhead >= 2 ? 1 : 0.4, y: timelinePlayhead === 2 ? -3 : 0 }}
              className="rounded-2xl border border-blue-400/25 bg-blue-500/10 p-4"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-blue-200">2:00:04 PM</p>
              <p className="mt-2 text-sm text-white">ACAI responds in 4 seconds</p>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
          <article className="group relative flex h-full min-h-[420px] flex-col rounded-3xl border border-white/12 bg-black/55 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-300/35 hover:shadow-[0_20px_45px_rgba(56,96,255,0.16)]">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/15 via-purple-500/12 to-indigo-500/15 opacity-90" />
            <h3 className="text-2xl font-semibold text-white">Web Funnel</h3>
            <p className="mt-2 text-sm text-neutral-300">Try it yourself: Fill out this form ↓</p>

            <form onSubmit={webFunnelSubmit} className="mt-4 space-y-3">
              <input
                value={demoName}
                onChange={(event) => setDemoName(event.target.value)}
                placeholder="Name"
                className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-blue-300/50"
                required
              />
              <input
                type="email"
                value={demoEmail}
                onChange={(event) => setDemoEmail(event.target.value)}
                placeholder="Business email"
                className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-blue-300/50"
                required
              />
              <button
                disabled={webFunnelLoading || webFunnelSubmitted}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
              >
                {webFunnelLoading ? "Sending..." : webFunnelSubmitted ? "Lead Captured" : "Test Response Speed"}
              </button>
            </form>

            <AnimatePresence>
              {webFunnelSubmitted && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">System Pulse</p>
                  <p className="mt-1 text-sm text-white">Lead routed to Voice AI engine. Expect call in &lt;10s.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>

          <div className="rounded-3xl border border-white/12 bg-black/55 p-5 md:p-7">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-400">
              <Clock3 className="h-4 w-4" /> Calculator
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-white">ROI Opportunity</h2>
            <div className="mt-6 space-y-5">
              <label className="block">
                <div className="flex justify-between text-sm text-neutral-300">
                  <span>Monthly Leads</span>
                  <span className="text-white">{leadsPerMonth}</span>
                </div>
                <input type="range" min={20} max={1000} step={10} value={leadsPerMonth} onChange={(event) => setLeadsPerMonth(Number(event.target.value))} className="mt-2 w-full" />
              </label>
              <label className="block">
                <div className="flex justify-between text-sm text-neutral-300">
                  <span>Avg Deal Value</span>
                  <span className="text-white">${avgDealValue}</span>
                </div>
                <input type="range" min={500} max={10000} step={100} value={avgDealValue} onChange={(event) => setAvgDealValue(Number(event.target.value))} className="mt-2 w-full" />
              </label>
              <label className="block">
                <div className="flex justify-between text-sm text-neutral-300">
                  <span>Avg Response (min)</span>
                  <span className="text-white">{responseMinutes}m</span>
                </div>
                <input type="range" min={1} max={240} step={1} value={responseMinutes} onChange={(event) => setResponseMinutes(Number(event.target.value))} className="mt-2 w-full" />
              </label>
            </div>

            <p className="mt-5 rounded-xl border border-white/12 bg-black/45 p-3 text-sm text-neutral-200">
              You&apos;re losing <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-lg font-semibold text-transparent">{formattedLoss}/month</span> to response delays.
            </p>
          </div>

          <div className="rounded-3xl border border-white/12 bg-black/55 p-5 md:p-7">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-400">
              <Clock3 className="h-4 w-4" /> Before vs After ACAI
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-white">Drag to compare your pipeline</h2>
            <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/12 bg-black/60 p-4">
              <div className="absolute inset-y-0 left-0 bg-red-500/14" style={{ width: `${comparison}%` }} />
              <div className="absolute inset-y-0 right-0 bg-blue-500/14" style={{ width: `${100 - comparison}%` }} />
              <div className="relative grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-red-300/25 bg-black/40 p-3 text-neutral-200">
                  <p className="font-semibold text-red-200">Before ACAI</p>
                  <p className="mt-1">Slow follow-up, dropped leads, unqualified handoffs.</p>
                </div>
                <div className="rounded-lg border border-blue-300/25 bg-black/40 p-3 text-neutral-200">
                  <p className="font-semibold text-blue-100">After ACAI</p>
                  <p className="mt-1">Instant response, automated qualification, faster booking.</p>
                </div>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={comparison}
              onChange={(event) => setComparison(Number(event.target.value))}
              className="mt-4 w-full"
              aria-label="Comparison slider"
            />
          </div>
        </section>

        <section className="mx-auto mt-12 w-full max-w-6xl rounded-3xl border border-white/12 bg-black/55 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">See It In Action</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-black/70 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-indigo-500/18" />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-neutral-300"><Play className="h-3.5 w-3.5" /> Demo Player</div>
                <p className="mt-3 text-lg font-semibold text-white">2-minute demo: How Tampa Garage Company went from 23% to 41% close rate</p>
                <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/25">
                  <Play className="h-4 w-4" /> Watch Preview
                </button>
              </div>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                setVideoSubmitted(true);
              }}
              className="rounded-2xl border border-white/12 bg-black/65 p-5"
            >
              <p className="text-sm text-neutral-300">Enter email to watch full case study</p>
              <input
                type="email"
                value={videoEmail}
                onChange={(event) => setVideoEmail(event.target.value)}
                placeholder="Business email"
                className="mt-3 w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-blue-300/50"
                required
              />
              <button className="mt-3 w-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white">
                Unlock Case Study
              </button>
              {videoSubmitted && <p className="mt-3 text-xs text-emerald-300">Access granted. Check your inbox in under 1 minute.</p>}
            </form>
          </div>
        </section>

        <section className="mx-auto mt-12 w-full max-w-6xl rounded-3xl border border-white/12 bg-black/60 p-6 text-center md:p-8">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Try It Free - 100% Money-Back Guarantee</h2>
          <p className="mx-auto mt-3 max-w-3xl text-neutral-300">
            No credit card required. Cancel anytime. 100% refund if no results in 14 days.
          </p>

          <Link href="/contact" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 px-8 py-3 text-base font-semibold text-white transition hover:opacity-90">
            Start 30-Day Free Pilot
          </Link>

          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-black/45 px-3 py-2 text-sm text-neutral-200"><ShieldCheck className="h-4 w-4 text-blue-200" /> Secure Setup</div>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-black/45 px-3 py-2 text-sm text-neutral-200"><Wallet className="h-4 w-4 text-blue-200" /> Money-Back</div>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-black/45 px-3 py-2 text-sm text-neutral-200"><BadgeCheck className="h-4 w-4 text-blue-200" /> Local Tampa Team</div>
          </div>
        </section>
      </Container>

      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-black/90 p-6"
            >
              <button
                onClick={() => setShowExitIntent(false)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full border border-white/20 p-1 text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Before you go</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Wait - see the ACAI System in action</h3>
              <div className="mt-4">
                <DemoPreview />
              </div>
              <Link href="/contact" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white">
                Get free audit of your current lead response time
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
