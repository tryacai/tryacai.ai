"use client";

import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Headphones,
  MessageSquare,
  Phone,
  PhoneIncoming,
  Shield,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const steps = [
  {
    number: "01",
    title: "Speed to Lead",
    description: "Responds to every inbound lead in seconds via call or text.",
  },
  {
    number: "02",
    title: "Lead Qualification",
    description: "AI filters serious buyers automatically. Only hot leads reach you.",
  },
  {
    number: "03",
    title: "Auto Booking",
    description: "Appointments land on your calendar. No back-and-forth.",
  },
  {
    number: "04",
    title: "24/7 Voice Receptionist",
    description: "Never miss a call. Your AI answers, qualifies, and routes.",
  },
] as const;

const modules = [
  {
    label: "AI Receptionist",
    heading: "Every call answered instantly",
    body: "Your AI picks up, qualifies, and routes — 24/7.",
  },
  {
    label: "Smart Scheduling",
    heading: "Calendar fills itself",
    body: "Qualified leads get booked without back-and-forth.",
  },
  {
    label: "Lead Qualification",
    heading: "Only hot leads reach you",
    body: "Budget, timeline, and intent scored automatically.",
  },
  {
    label: "CRM Sync",
    heading: "Everything in one place",
    body: "Leads, calls, and status flow into your pipeline.",
  },
] as const;

const MODULE_ROTATE_MS = 3500;

/* ------------------------------------------------------------------ */
/*  MINI UI PANELS (right-side product previews for each step)         */
/* ------------------------------------------------------------------ */

function SpeedToLeadUI() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2">
        <PhoneIncoming className="h-4 w-4 text-emerald-400" />
        <span className="text-xs text-emerald-300">Incoming Call — Tampa, FL</span>
        <span className="ml-auto text-[10px] text-emerald-400/70">Just now</span>
      </div>
      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
        <p className="text-[11px] text-neutral-500">AI Response</p>
        <p className="mt-1 text-xs text-white">&quot;Hi! Thanks for calling. How can I help you today?&quot;</p>
      </div>
      <div className="flex items-center gap-2 text-[10px] text-neutral-500">
        <Zap className="h-3 w-3 text-purple-400" />
        <span>Responded in <span className="text-white font-medium">0.8s</span></span>
      </div>
    </div>
  );
}

function QualificationUI() {
  const tags = [
    { label: "Budget: $3,200", ok: true },
    { label: "Timeline: This week", ok: true },
    { label: "Service: AC Repair", ok: true },
  ];
  return (
    <div className="space-y-2.5">
      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
        <p className="text-[11px] text-neutral-500">Lead says</p>
        <p className="mt-1 text-xs text-neutral-300">&quot;My AC went out, I need someone ASAP.&quot;</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span key={t.label} className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-2 py-0.5 text-[10px] text-emerald-300">
            <CheckCircle2 className="h-2.5 w-2.5" /> {t.label}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-500/[0.06] px-3 py-1.5 text-[10px] text-purple-300">
        <Shield className="h-3 w-3" /> Qualified — Routing to team
      </div>
    </div>
  );
}

function BookingUI() {
  const slots = ["9:00 AM", "11:30 AM", "2:00 PM"];
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 text-[11px] text-neutral-400">
        <Calendar className="h-3.5 w-3.5 text-purple-400" /> Tomorrow — May 14
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {slots.map((s, i) => (
          <div
            key={s}
            className={`rounded-lg border px-2 py-1.5 text-center text-[10px] transition ${
              i === 1
                ? "border-purple-500/40 bg-purple-500/10 text-white"
                : "border-white/[0.06] bg-white/[0.02] text-neutral-400"
            }`}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 text-[10px] text-emerald-300">
        <CheckCircle2 className="h-3 w-3" /> Booked — 11:30 AM confirmed
      </div>
    </div>
  );
}

function VoiceUI() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Headphones className="h-4 w-4 text-purple-300" />
          </div>
          <div>
            <p className="text-xs text-white font-medium">Mica Growth Voice AI</p>
            <p className="text-[10px] text-emerald-400">Active — 24/7</p>
          </div>
        </div>
        <span className="text-[10px] text-neutral-500">02:41</span>
      </div>
      <div className="flex items-end gap-[3px] h-8 px-1">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-purple-400/60"
            animate={{ height: [4, 8 + Math.random() * 16, 4] }}
            transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.04 }}
          />
        ))}
      </div>
      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[10px] text-neutral-400">
        <span className="text-white">AI:</span> &quot;I&apos;ve scheduled a technician for tomorrow at 11:30 AM.&quot;
      </div>
    </div>
  );
}

const stepVisuals = [SpeedToLeadUI, QualificationUI, BookingUI, VoiceUI];

/* ------------------------------------------------------------------ */
/*  MODULE TAB PANELS                                                  */
/* ------------------------------------------------------------------ */

function ReceptionistPanel() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/15 border border-purple-500/20">
          <Phone className="h-5 w-5 text-purple-300" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-white font-medium">Incoming — (813) 555-0142</p>
          <p className="text-xs text-emerald-400">Connected · AI Handling</p>
        </div>
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-neutral-500">Live Transcript</p>
        <div className="space-y-1.5 text-xs">
          <p className="text-neutral-400"><span className="text-purple-300">AI:</span> Thanks for calling! What service do you need?</p>
          <p className="text-neutral-400"><span className="text-white">Caller:</span> My water heater is leaking.</p>
          <p className="text-neutral-400"><span className="text-purple-300">AI:</span> I can get a technician out tomorrow. Let me check availability.</p>
        </div>
      </div>
    </div>
  );
}

function SchedulingPanel() {
  const days = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((d, i) => (
          <div key={d} className={`rounded-lg border p-2 text-center text-[10px] ${i === 2 ? "border-purple-500/30 bg-purple-500/10 text-white" : "border-white/[0.06] bg-white/[0.02] text-neutral-500"}`}>
            {d}
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white font-medium">Wed May 14 — 11:30 AM</span>
          <span className="text-emerald-400 text-[10px]">Auto-booked</span>
        </div>
        <p className="text-xs text-neutral-400">AC Repair · John M. · Tampa, FL</p>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-300">
          <CheckCircle2 className="h-3 w-3" /> Confirmation sent via SMS
        </div>
      </div>
    </div>
  );
}

function QualPanel() {
  const leads = [
    { name: "Sarah K.", score: 92, status: "Qualified", color: "emerald" },
    { name: "Mike T.", score: 45, status: "Nurture", color: "yellow" },
    { name: "David R.", score: 88, status: "Qualified", color: "emerald" },
  ];
  return (
    <div className="space-y-2">
      {leads.map((l) => (
        <div key={l.name} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5">
          <div className="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] text-white font-medium">{l.name.split(" ").map(w => w[0]).join("")}</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white font-medium">{l.name}</p>
            <p className={`text-[10px] ${l.color === "emerald" ? "text-emerald-400" : "text-yellow-400"}`}>{l.status}</p>
          </div>
          <div className="text-right">
            <p className={`text-sm font-semibold ${l.score >= 80 ? "text-emerald-400" : "text-yellow-400"}`}>{l.score}</p>
            <p className="text-[9px] text-neutral-500">Score</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CRMPanel() {
  const stages = [
    { name: "New Lead", count: 12, w: "w-full" },
    { name: "Qualified", count: 8, w: "w-4/5" },
    { name: "Booked", count: 5, w: "w-3/5" },
    { name: "Closed", count: 3, w: "w-2/5" },
  ];
  return (
    <div className="space-y-2.5">
      {stages.map((s, i) => (
        <div key={s.name} className="space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-neutral-400">{s.name}</span>
            <span className="text-white font-medium">{s.count}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/[0.04]">
            <motion.div
              className={`h-full rounded-full ${s.w}`}
              style={{ background: `linear-gradient(90deg, rgba(96,165,250,${0.6 - i * 0.1}), rgba(168,85,247,${0.6 - i * 0.1}))` }}
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            />
          </div>
        </div>
      ))}
      <div className="mt-1 flex items-center gap-2 text-[10px] text-neutral-500">
        <CheckCircle2 className="h-3 w-3 text-purple-400" /> Synced 2 min ago
      </div>
    </div>
  );
}

const modulePanels = [ReceptionistPanel, SchedulingPanel, QualPanel, CRMPanel];

/* ------------------------------------------------------------------ */
/*  FLOW STEP COMPONENT                                                */
/* ------------------------------------------------------------------ */

function FlowStep({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Visual = stepVisuals[index];
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* connector line */}
      {index > 0 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute left-1/2 -top-12 h-12 w-px origin-top -translate-x-1/2 md:-top-16 md:h-16"
          style={{ background: "linear-gradient(to bottom, rgba(168,85,247,0.1), rgba(168,85,247,0.4))" }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className={`grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10 ${!isEven ? "md:direction-rtl" : ""}`}
        style={!isEven ? { direction: "rtl" } : undefined}
      >
        {/* Text */}
        <div style={{ direction: "ltr" }}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-400/70">{step.number}</p>
          <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{step.title}</h3>
          <p className="mt-3 max-w-md text-base leading-relaxed text-neutral-300">{step.description}</p>
        </div>

        {/* Visual card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ direction: "ltr" }}
          className="relative rounded-2xl border border-white/[0.08] bg-neutral-950/80 p-4 backdrop-blur-sm"
        >
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-purple-500/[0.06] to-transparent" />
          <div className="relative">
            <Visual />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function AcaiSystemPage() {
  const pathRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pathRef, offset: ["start end", "end start"] });
  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [activeModule, setActiveModule] = useState(0);
  const [isModuleHovered, setIsModuleHovered] = useState(false);

  useEffect(() => {
    if (isModuleHovered) return;
    const timer = setInterval(() => setActiveModule((p) => (p + 1) % modules.length), MODULE_ROTATE_MS);
    return () => clearInterval(timer);
  }, [isModuleHovered]);

  const ActiveModulePanel = modulePanels[activeModule];

  return (
    <div className="relative overflow-hidden py-24 md:py-0">
      <Background />
      <Container className="relative z-20 pb-24 md:pt-36">

        {/* ── HERO ── */}
        <section className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-semibold leading-tight text-white md:text-7xl"
          >
            The Mica Growth System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 text-xl font-medium text-neutral-200 md:text-2xl"
          >
            Everything Running. Nothing Missed.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-3 text-base text-neutral-400 md:text-lg"
          >
            Your full AI system from first response to booked job.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { icon: Zap, text: "Instant response" },
              { icon: Clock, text: "24/7 coverage" },
              { icon: Shield, text: "No missed opportunities" },
            ].map((b) => (
              <span key={b.text} className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-neutral-300">
                <b.icon className="h-3.5 w-3.5 text-purple-400" /> {b.text}
              </span>
            ))}
          </motion.div>
        </section>

        {/* ── SECTION 1: SYSTEM FLOW ── */}
        <section ref={pathRef} className="relative mx-auto mt-28 w-full max-w-5xl md:mt-36">
          {/* Scroll-drawing purple line */}
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/[0.04]">
            <motion.div className="w-full origin-top" style={{ height: pathHeight, background: "linear-gradient(to bottom, rgba(168,85,247,0.6), rgba(168,85,247,0.15))" }} />
          </div>

          <div className="relative space-y-20 md:space-y-28">
            {steps.map((step, i) => (
              <FlowStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </section>

        {/* ── SECTION 2: YOUR AI FRONT DESK ── */}
        <section className="mx-auto mt-32 w-full max-w-5xl md:mt-40">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-semibold text-white md:text-5xl"
            >
              Your AI Front Desk. Fully Running.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-base text-neutral-400 md:text-lg"
            >
              Every call answered. Every lead handled. Every opportunity captured.
            </motion.p>
          </div>

          {/* Dashboard mock */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mt-14"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-purple-500/[0.05] blur-3xl" />

            <div className="relative rounded-2xl border border-white/[0.08] bg-neutral-950/80 p-5 backdrop-blur-sm md:p-8">
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-medium text-white">Mica Growth Dashboard</span>
                  <span className="text-[10px] text-neutral-500">Live</span>
                </div>
                <span className="text-[10px] text-neutral-500">Today · 3:42 PM</span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Card 1: Call handled */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-500">
                    <Phone className="h-3 w-3 text-purple-400" /> Incoming Call
                  </div>
                  <p className="mt-2 text-sm text-white font-medium">(813) 555-0142</p>
                  <p className="mt-1 text-xs text-neutral-400">Water heater replacement</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" /> Handled Automatically
                  </div>
                </div>

                {/* Card 2: Booking */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-500">
                    <Calendar className="h-3 w-3 text-purple-400" /> Appointment
                  </div>
                  <p className="mt-2 text-sm text-white font-medium">Tomorrow · 11:30 AM</p>
                  <p className="mt-1 text-xs text-neutral-400">AC Repair — John M.</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 text-[10px] text-purple-300">
                    <Calendar className="h-3 w-3" /> Booked & Confirmed
                  </div>
                </div>

                {/* Card 3: Lead tagged */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-500">
                    <MessageSquare className="h-3 w-3 text-purple-400" /> Lead Status
                  </div>
                  <p className="mt-2 text-sm text-white font-medium">Sarah K.</p>
                  <p className="mt-1 text-xs text-neutral-400">Epoxy Flooring · $4,200</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-[10px] text-blue-300">
                    <Zap className="h-3 w-3" /> Qualified · Score 94
                  </div>
                </div>
              </div>
            </div>

            {/* Floating indicators */}
            {[
              { text: "Call Answered in 2.1s", x: "-left-4 md:-left-12", y: "top-12" },
              { text: "Appointment Booked", x: "-right-4 md:-right-12", y: "top-24" },
              { text: "Lead Qualified", x: "-left-4 md:-left-8", y: "bottom-16" },
              { text: "No Missed Calls", x: "-right-4 md:-right-8", y: "bottom-6" },
            ].map((f, i) => (
              <motion.div
                key={f.text}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.12 }}
                className={`absolute ${f.x} ${f.y} hidden md:block`}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="rounded-full border border-white/[0.08] bg-neutral-950/90 px-3 py-1.5 text-[10px] text-neutral-300 backdrop-blur-sm"
                >
                  <CheckCircle2 className="mr-1.5 inline h-3 w-3 text-emerald-400" />
                  {f.text}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Value strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-[0.16em] text-neutral-500"
          >
            {["14 Day Proof of Value", "Instant Results", "Cancel Anytime", "Built to Replace Missed Calls"].map((v) => (
              <span key={v} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-purple-400/50" />
                {v}
              </span>
            ))}
          </motion.div>
        </section>

        {/* ── SECTION 3: INTERACTIVE SYSTEM MODULES ── */}
        <section className="mx-auto mt-32 w-full max-w-5xl md:mt-40">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-semibold text-white md:text-5xl"
            >
              One System. Multiple Engines Working Together.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-base text-neutral-400 md:text-lg"
            >
              Everything runs together to capture, convert, and book your leads automatically.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-12"
            onMouseEnter={() => setIsModuleHovered(true)}
            onMouseLeave={() => setIsModuleHovered(false)}
          >
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {modules.map((m, i) => (
                <button
                  key={m.label}
                  type="button"
                  onMouseEnter={() => setActiveModule(i)}
                  onClick={() => setActiveModule(i)}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    i === activeModule
                      ? "border-purple-400/40 bg-purple-500/10 text-white shadow-[0_0_16px_rgba(168,85,247,0.15)]"
                      : "border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:text-white hover:border-white/10"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Active progress bar */}
            <div className="mx-auto mt-4 flex max-w-md gap-1.5">
              {modules.map((_, i) => (
                <div key={i} className="h-0.5 flex-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-purple-400"
                    initial={{ width: "0%" }}
                    animate={{ width: i === activeModule ? "100%" : i < activeModule ? "100%" : "0%" }}
                    transition={i === activeModule ? { duration: MODULE_ROTATE_MS / 1000, ease: "linear" } : { duration: 0.3 }}
                  />
                </div>
              ))}
            </div>

            {/* Content panel — only one visible at a time */}
            <div className="relative mt-8 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-white/[0.08] bg-neutral-950/80 p-6 backdrop-blur-sm md:p-8"
                >
                  <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_1.2fr]">
                    <div>
                      <h3 className="text-xl font-semibold text-white md:text-2xl">
                        {modules[activeModule].heading}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                        {modules[activeModule].body}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-black/40 p-4">
                      <ActiveModulePanel />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

      </Container>
    </div>
  );
}
