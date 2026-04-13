"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

// ─── Typewriter: "Booked Jobs." line ───
const TypewriterBookedJobs = () => {
  const phrase = "Booked Jobs.";
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    const typingSpeed = 105;
    const deletingSpeed = 90;
    const holdDuration = 3500;
    let timer: NodeJS.Timeout;

    if (phase === "typing") {
      if (text.length < phrase.length) {
        timer = setTimeout(() => setText(phrase.slice(0, text.length + 1)), typingSpeed);
      } else {
        timer = setTimeout(() => setPhase("holding"), holdDuration);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), 200);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
      } else {
        setPhase("typing");
      }
    }

    return () => { if (timer) clearTimeout(timer); };
  }, [text, phase]);

  return (
    <span className="inline-block bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
      style={{
        filter: "blur(0.4px) drop-shadow(0 0 8px rgba(239, 68, 68, 0.3)) drop-shadow(0 0 12px rgba(168, 85, 247, 0.2)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.1))",
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          style={{ marginLeft: char === " " ? "0.5em" : undefined }}
          whileHover={{ y: -4, scale: 1.1, transition: { duration: 0.2 } }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        |
      </motion.span>
    </span>
  );
};

// ─── Pain-point orbs (flow right, fade/shrink at right edge) ───
const painPoints = [
  "Wasting Budget on Ads That Don\u2019t Convert",
  "Chasing Low-Quality Leads That Ghost You",
  "Losing Jobs to Competitors Who Reply Faster",
];

const PainPointOrbs = () => (
  <div className="relative mt-8 flex flex-col gap-4 md:gap-3">
    {painPoints.map((text, i) => (
      <motion.div
        key={text}
        initial={{ x: -40, opacity: 0, scale: 0.92 }}
        animate={{ x: [0, 60, 120], opacity: [1, 0.85, 0], scale: [1, 0.95, 0.7] }}
        transition={{
          duration: 5,
          delay: i * 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center gap-3"
      >
        <span className="shrink-0 h-3 w-3 rounded-full bg-gradient-to-r from-red-500 to-purple-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
        <span className="text-sm md:text-base text-neutral-300 font-medium whitespace-nowrap">{text}</span>
      </motion.div>
    ))}
  </div>
);

// ─── Harvard stats bubbles ───
const StatBubble = ({ icon, source, quote, delay }: { icon: string; source: string; quote: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className="relative flex-1 min-w-[260px] rounded-2xl p-[1px] bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"
  >
    {/* Speech-bubble pointer */}
    <div className="absolute -top-2 left-8 h-4 w-4 rotate-45 bg-gradient-to-br from-red-500/60 to-purple-500/60" />
    <div className="relative rounded-2xl bg-black/80 backdrop-blur-sm p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-purple-300/80 mb-2">
        {icon} {source}
      </p>
      <p className="text-sm text-neutral-200 leading-relaxed">&ldquo;{quote}&rdquo;</p>
    </div>
  </motion.div>
);

// ─── Qualification Modal ───
type QualStep = 1 | 2 | 3;

const industryOptions = ["Plumbing", "HVAC", "Roofing", "Electrical", "Restoration", "Landscaping", "Pest Control", "Cleaning", "Other"] as const;
const jobsPerMonthOptions = ["Under 20", "20\u201350", "50\u2013100", "100+"] as const;
const adStatusOptions = ["Yes", "No", "Planning to"] as const;
const adSpendOptions = ["Not yet", "Under $1K", "$1K\u2013$3K", "$3K\u2013$7K", "$7K\u2013$15K", "$15K+"] as const;
const foundFromOptions = ["Google", "Facebook Ad", "Instagram", "Referral", "Cold Outreach", "Other"] as const;

const CAL_URL = "https://cal.com/tryacai.ai/30min";

const QualificationModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<QualStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Step 1
  const [industry, setIndustry] = useState("");
  const [jobsPerMonth, setJobsPerMonth] = useState("");
  // Step 2
  const [runningAds, setRunningAds] = useState("");
  const [adSpend, setAdSpend] = useState("");
  // Step 3
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [challenge, setChallenge] = useState("");
  const [foundFrom, setFoundFrom] = useState("");
  // Honeypot
  const [honeypot, setHoneypot] = useState("");

  const canAdvance1 = industry && jobsPerMonth;
  const canAdvance2 = runningAds && adSpend;
  const canSubmit = fullName && phone && email && companyName;

  const handleSubmit = async () => {
    if (honeypot) return;
    setIsSubmitting(true);
    try {
      const payload = {
        full_name: fullName.trim(),
        business_email: email.trim(),
        phone_number: phone.replace(/\D/g, ""),
        company_name: companyName.trim(),
        industry,
        biggest_lead_bottleneck: challenge.trim(),
        systems_interested_in: runningAds,
        message: challenge.trim(),
        source: "hero-cta",
        found_from: foundFrom,
        booked_call: false,
        call_date: "",
        sms_consent: false,
        jobs_per_month: jobsPerMonth,
        ad_spend: adSpend,
      };

      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Fire Facebook Pixel
      if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).fbq) {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq("track", "Lead");
      }

      setSubmitted(true);
    } catch {
      // Silently handle — redirect anyway
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        window.open(CAL_URL, "_blank", "noopener,noreferrer");
        onClose();
        setStep(1);
        setSubmitted(false);
        setIndustry("");
        setJobsPerMonth("");
        setRunningAds("");
        setAdSpend("");
        setFullName("");
        setPhone("");
        setEmail("");
        setCompanyName("");
        setChallenge("");
        setFoundFrom("");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [submitted, onClose]);

  const inputClass = "mt-1.5 block w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-2.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm";
  const selectClass = inputClass;
  const labelClass = "block text-sm font-medium text-neutral-200";

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close */}
            <button onClick={onClose} className="absolute right-4 top-4 text-neutral-400 hover:text-white text-xl leading-none">&times;</button>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${s <= step ? "bg-gradient-to-r from-red-500 via-purple-500 to-blue-500" : "bg-white/10"}`} />
                ))}
              </div>
              <p className="mt-2 text-xs text-neutral-400">Step {step} of 3</p>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <p className="text-2xl font-semibold text-white mb-2">You&apos;re in! 🎯</p>
                <p className="text-sm text-neutral-300">Redirecting you to book your strategy session...</p>
              </div>
            ) : step === 1 ? (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-white">Tell us about your business</h3>
                <div>
                  <label className={labelClass}>What type of service business do you run?</label>
                  <select value={industry} onChange={(e) => setIndustry(e.target.value)} className={selectClass}>
                    <option value="">Select industry</option>
                    {industryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>How many jobs/month are you currently booking?</label>
                  <select value={jobsPerMonth} onChange={(e) => setJobsPerMonth(e.target.value)} className={selectClass}>
                    <option value="">Select range</option>
                    {jobsPerMonthOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <button disabled={!canAdvance1} onClick={() => setStep(2)}
                  className="w-full mt-2 rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed">
                  Continue →
                </button>
              </div>
            ) : step === 2 ? (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-white">Your ad spend</h3>
                <div>
                  <label className={labelClass}>Are you currently running paid ads?</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {adStatusOptions.map((o) => (
                      <button key={o} type="button" onClick={() => setRunningAds(o)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${runningAds === o ? "border-transparent bg-gradient-to-r from-red-500/35 via-purple-500/35 to-blue-500/35 text-white shadow-[0_0_14px_rgba(168,85,247,0.32)]" : "border-white/20 bg-neutral-950 text-neutral-200 hover:border-white/35"}`}>
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>What&apos;s your current monthly ad spend?</label>
                  <select value={adSpend} onChange={(e) => setAdSpend(e.target.value)} className={selectClass}>
                    <option value="">Select range</option>
                    {adSpendOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => setStep(1)} className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-medium text-neutral-300 hover:text-white transition">&larr; Back</button>
                  <button disabled={!canAdvance2} onClick={() => setStep(3)} className="flex-1 rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed">Continue →</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Contact info</h3>
                {/* Honeypot */}
                <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} placeholder="John Smith" />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} className={inputClass} placeholder="5551234567" inputMode="numeric" />
                  </div>
                  <div>
                    <label className={labelClass}>Business Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className={labelClass}>Company Name</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={inputClass} placeholder="Your Company LLC" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>What&apos;s your biggest challenge right now?</label>
                  <textarea value={challenge} onChange={(e) => setChallenge(e.target.value)} rows={3} maxLength={300} className={inputClass} placeholder="E.g. leads come in but we can't follow up fast enough..." />
                </div>
                <div>
                  <label className={labelClass}>How did you hear about us?</label>
                  <select value={foundFrom} onChange={(e) => setFoundFrom(e.target.value)} className={selectClass}>
                    <option value="">Select (optional)</option>
                    {foundFromOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => setStep(2)} className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-medium text-neutral-300 hover:text-white transition">&larr; Back</button>
                  <button disabled={!canSubmit || isSubmitting} onClick={handleSubmit}
                    className="flex-1 rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed">
                    {isSubmitting ? "Submitting..." : "Claim My Strategy Session \u2192"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Main Hero export ───
export const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative flex flex-col overflow-hidden pt-20 md:pt-32">
      {/* ── Two-column hero ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col order-2 md:order-1">

          {/* Headline */}
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-white leading-tight">
              Turn Your Ad Spend Into
            </h1>
            <div className="text-3xl md:text-4xl lg:text-6xl font-semibold mt-1 min-h-[1.3em]">
              <TypewriterBookedJobs />
            </div>
            <p className="mt-2 text-lg md:text-2xl font-medium bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
              style={{
                filter: "blur(0.4px) drop-shadow(0 0 8px rgba(239, 68, 68, 0.3)) drop-shadow(0 0 12px rgba(168, 85, 247, 0.2))",
              }}
            >
              Fill Your Calendar With ACAI
            </p>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.55, delay: 0.2 }}
            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-neutral-300"
          >
            Custom marketing systems built for service companies &mdash; not cookie-cutter campaigns.
            We fill your calendar with high-quality leads using your existing ad budget.
          </motion.p>

          {/* Pain-point orbs */}
          <PainPointOrbs />

          {/* Harvard Stats */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:-mr-3">
            <StatBubble
              icon="📊"
              source="Harvard Business Review"
              quote="Companies that respond to leads within 60 seconds see a 391% increase in sales conversions."
              delay={0.1}
            />
            <StatBubble
              icon="⚡"
              source="Speed-to-Lead Research"
              quote="78% of buyers choose the first business that responds. Reply instantly — or lose the job."
              delay={0.25}
            />
          </div>

          {/* CTA Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }}
            className="mt-10"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="w-full md:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white text-lg font-bold transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] active:scale-[0.98]"
            >
              Claim Your Free Strategy Session &rarr;
            </button>
            <p className="mt-3 text-sm text-neutral-400 max-w-md">
              No contracts. No retainers. We only get paid when you get results.
            </p>

            {/* Trust icons */}
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-300">
              <span className="flex items-center gap-1.5">✅ Performance-Based Only</span>
              <span className="flex items-center gap-1.5">✅ No Results = Deposit Back</span>
              <span className="flex items-center gap-1.5">✅ Custom-Built, Not Cookie-Cutter</span>
            </div>
          </motion.div>

          {/* Risk reversal badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 max-w-md rounded-xl border border-white/10 bg-black/50 px-5 py-4 backdrop-blur"
          >
            <p className="text-sm text-neutral-200 leading-relaxed">
              🛡️ <span className="font-semibold text-white">Zero-Risk Guarantee:</span> If we don&apos;t book you more qualified
              jobs in your pilot, you get your deposit back. No questions asked.
            </p>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — Hero Image ── */}
        <div className="relative flex items-start justify-center order-1 md:order-2 md:sticky md:top-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.25),0_0_80px_rgba(239,68,68,0.15)]"
          >
            <div className="absolute inset-0 rounded-2xl ring-2 ring-inset ring-purple-500/30 pointer-events-none z-10" />
            <Image
              src="/mainlandingpagehero.png"
              alt="ACAI AI marketing funnel for service businesses"
              width={600}
              height={800}
              priority
              className="w-full h-auto object-cover rounded-2xl"
              style={{ aspectRatio: "3/4" }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Social proof bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 mx-auto mt-14 w-full max-w-5xl px-4 text-center"
      >
        <p className="text-xs md:text-sm text-neutral-400 tracking-wide leading-relaxed">
          Powered by the same speed-to-lead principles trusted by enterprise sales teams &mdash; now built for local service businesses.
        </p>
      </motion.div>

      <div className="h-4 md:h-6" />

      {/* Qualification Modal */}
      <QualificationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};
