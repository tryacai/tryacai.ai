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

// ─── Qualification Modal (Floor Coating Only) ───

type ModalStep =
  | "qualify"
  | "disqualified"
  | "company_name"
  | "full_name"
  | "business_email"
  | "phone_number"
  | "urgency"
  | "booking"
  | "submitting"
  | "thank_you"
  | "booked";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby6UXqt3SZxDEHNR6hUCgTwDuo7Ii6Er1AJ91jJ10E9svxuMsPJwHakE7x4ECln9r02mQ/exec";
const CAL_URL = "https://cal.com/tryacai.ai/30min";

/** Fire a Meta Pixel event if fbq is available */
function fireFbq(eventName: string) {
  if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).fbq) {
    (window as unknown as { fbq: (...args: unknown[]) => void }).fbq("track", eventName);
    console.log(`[Meta Pixel] Fired: ${eventName}`);
  }
}

/** Detect Cal.com booking success from postMessage */
function isBookingSuccessfulCalEvent(rawData: unknown): boolean {
  let data: Record<string, unknown> = {};
  if (typeof rawData === "string") {
    try { data = JSON.parse(rawData); } catch { return false; }
  } else if (rawData && typeof rawData === "object") {
    data = rawData as Record<string, unknown>;
  } else {
    return false;
  }
  const candidates = [
    data.event, data.eventType, data.type,
    ...(data.payload && typeof data.payload === "object" ? [
      (data.payload as Record<string, unknown>).event,
      (data.payload as Record<string, unknown>).eventType,
      (data.payload as Record<string, unknown>).type,
    ] : []),
    ...(data.data && typeof data.data === "object" ? [
      (data.data as Record<string, unknown>).event,
      (data.data as Record<string, unknown>).eventType,
      (data.data as Record<string, unknown>).type,
    ] : []),
  ].filter(Boolean).map(String);
  return candidates.some((v) => v === "bookingSuccessful");
}

/** Extract call_date from Cal.com postMessage */
function extractCallDate(rawData: unknown): string {
  let data: Record<string, unknown> = {};
  if (typeof rawData === "string") {
    try { data = JSON.parse(rawData); } catch { return ""; }
  } else if (rawData && typeof rawData === "object") {
    data = rawData as Record<string, unknown>;
  } else {
    return "";
  }
  const payload = (data.payload || data.data || data) as Record<string, unknown>;
  const booking = (payload.booking || payload) as Record<string, unknown>;
  return String(booking.startTime || booking.start_time || booking.start || booking.startsAt || "");
}

/** Submit lead payload to Google Apps Script */
async function submitToAppsScript(payload: Record<string, unknown>): Promise<boolean> {
  try {
    // Do NOT set Content-Type: application/json — that triggers a CORS preflight
    // that Apps Script cannot handle. Sending as text/plain avoids the preflight,
    // and Apps Script can still read the JSON body via e.postData.contents.
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("[Apps Script] Non-OK response:", res.status);
      return false;
    }
    console.log("[Apps Script] Submission confirmed, status:", res.status);
    return true;
  } catch (err) {
    console.error("[Apps Script] Submission failed:", err);
    return false;
  }
}

const QualificationModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<ModalStep>("qualify");
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Build the Cal.com iframe URL with prefilled data
  const calEmbedUrl = (() => {
    const params = new URLSearchParams();
    if (fullName) params.set("name", fullName);
    if (businessEmail) params.set("email", businessEmail);
    if (phoneNumber) params.set("phone", phoneNumber);
    // Cal.com supports "notes" or "metadata" for custom fields — pass company name in notes
    if (companyName) params.set("notes", `Company: ${companyName}`);
    return `${CAL_URL}?embed=true&${params.toString()}`;
  })();

  const buildPayload = (bookedCall: boolean, callDate: string) => ({
    submitted_at: new Date().toISOString(),
    qualification_status: "qualified",
    company_name: companyName.trim(),
    full_name: fullName.trim(),
    business_email: businessEmail.trim(),
    phone_number: phoneNumber.replace(/\D/g, ""),
    source: "claim-free-strategy-session",
    booked_call: bookedCall,
    call_date: callDate,
  });

  // Listen for Cal.com booking confirmation
  useEffect(() => {
    if (step !== "booking") return;

    function handleCalMessage(event: MessageEvent) {
      if (!event.origin?.includes("cal.com")) return;
      if (!isBookingSuccessfulCalEvent(event.data)) return;

      const callDate = extractCallDate(event.data);

      // Submit to Apps Script with booked_call = true
      setIsSubmitting(true);
      setStep("submitting");

      submitToAppsScript(buildPayload(true, callDate)).then((success) => {
        if (success) {
          fireFbq("Lead");
          fireFbq("Schedule");
          console.log("[Meta Pixel] Lead + Schedule fired after booking confirmation");
        }
        setIsSubmitting(false);
        setStep("booked");
      });
    }

    window.addEventListener("message", handleCalMessage);
    return () => window.removeEventListener("message", handleCalMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, companyName, fullName, businessEmail, phoneNumber]);

  // Handle "Not now" — submit without booking
  const handleNotNow = async () => {
    setIsSubmitting(true);
    setStep("submitting");

    const success = await submitToAppsScript(buildPayload(false, ""));
    if (success) {
      fireFbq("Lead");
      console.log("[Meta Pixel] Lead fired after non-booking submission");
    }
    setIsSubmitting(false);
    setStep("thank_you");
  };

  const resetAndClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep("qualify");
      setCompanyName("");
      setFullName("");
      setBusinessEmail("");
      setPhoneNumber("");
    }, 300);
  };

  const inputClass =
    "mt-2 block w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3.5 text-white text-base placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500";
  const labelClass = "block text-sm font-medium text-neutral-300";

  // Progress calculation
  const stepOrder: ModalStep[] = ["qualify", "company_name", "full_name", "business_email", "phone_number", "urgency"];
  const progressIndex = stepOrder.indexOf(step);
  const progressPercent = progressIndex >= 0 ? Math.round(((progressIndex + 1) / stepOrder.length) * 100) : 100;

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) resetAndClose(); }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button onClick={resetAndClose} className="absolute right-4 top-4 text-neutral-400 hover:text-white text-xl leading-none">&times;</button>

            {/* Progress bar — only show during input steps */}
            {progressIndex >= 0 && (
              <div className="mb-6">
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* ── Step: Qualify ── */}
            {step === "qualify" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center py-4">
                <h3 className="text-2xl font-semibold text-white">Are you a floor coating business?</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep("company_name")}
                    className="flex-1 rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 py-4 text-lg font-bold text-white transition hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(168,85,247,0.35)]"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setStep("disqualified")}
                    className="flex-1 rounded-xl border border-white/15 bg-neutral-900 py-4 text-lg font-semibold text-neutral-300 transition hover:border-white/30 hover:text-white"
                  >
                    No
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step: Disqualified ── */}
            {step === "disqualified" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center py-8">
                <p className="text-lg text-neutral-200 leading-relaxed">
                  At the moment, we only work with floor coating companies.<br />Thank you for your interest.
                </p>
                <button onClick={resetAndClose} className="rounded-xl border border-white/15 bg-neutral-900 px-8 py-3 text-sm font-medium text-neutral-300 hover:text-white transition">
                  Close
                </button>
              </motion.div>
            )}

            {/* ── Step: Company Name ── */}
            {step === "company_name" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h3 className="text-xl font-semibold text-white">What&apos;s your company name?</h3>
                <div>
                  <label className={labelClass}>Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={inputClass}
                    placeholder="E.g. Elite Floor Coatings LLC"
                    autoFocus
                    onKeyDown={(e) => { if (e.key === "Enter" && companyName.trim()) setStep("full_name"); }}
                  />
                </div>
                <button
                  disabled={!companyName.trim()}
                  onClick={() => setStep("full_name")}
                  className="w-full rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              </motion.div>
            )}

            {/* ── Step: Full Name ── */}
            {step === "full_name" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h3 className="text-xl font-semibold text-white">What&apos;s your full name?</h3>
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputClass}
                    placeholder="Chris Moreno"
                    autoFocus
                    onKeyDown={(e) => { if (e.key === "Enter" && fullName.trim()) setStep("business_email"); }}
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep("company_name")} className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-medium text-neutral-300 hover:text-white transition">← Back</button>
                  <button
                    disabled={!fullName.trim()}
                    onClick={() => setStep("business_email")}
                    className="flex-1 rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step: Business Email ── */}
            {step === "business_email" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h3 className="text-xl font-semibold text-white">What&apos;s your email?</h3>
                <div>
                  <label className={labelClass}>Business Email</label>
                  <input
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    className={inputClass}
                    placeholder="chris@yourcompany.com"
                    autoFocus
                    onKeyDown={(e) => { if (e.key === "Enter" && businessEmail.includes("@")) setStep("phone_number"); }}
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep("full_name")} className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-medium text-neutral-300 hover:text-white transition">← Back</button>
                  <button
                    disabled={!businessEmail.includes("@")}
                    onClick={() => setStep("phone_number")}
                    className="flex-1 rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step: Phone Number ── */}
            {step === "phone_number" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h3 className="text-xl font-semibold text-white">What&apos;s your phone number?</h3>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    className={inputClass}
                    placeholder="5551234567"
                    inputMode="numeric"
                    autoFocus
                    onKeyDown={(e) => { if (e.key === "Enter" && phoneNumber.replace(/\D/g, "").length >= 10) setStep("urgency"); }}
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep("business_email")} className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-medium text-neutral-300 hover:text-white transition">← Back</button>
                  <button
                    disabled={phoneNumber.replace(/\D/g, "").length < 10}
                    onClick={() => setStep("urgency")}
                    className="flex-1 rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step: Urgency + Book? ── */}
            {step === "urgency" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center py-4">
                <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-5">
                  <p className="text-sm text-neutral-200 leading-relaxed">
                    🚀 We&apos;re launching this cohort at the end of this week. Book your free call now for priority access.
                    After this round, the next opening may not be until next month.
                  </p>
                </div>
                <h3 className="text-xl font-semibold text-white">Would you like to book your free 15-minute call now?</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep("booking")}
                    className="flex-1 rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 py-4 text-lg font-bold text-white transition hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(168,85,247,0.35)]"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleNotNow}
                    className="flex-1 rounded-xl border border-white/15 bg-neutral-900 py-4 text-base font-semibold text-neutral-300 transition hover:border-white/30 hover:text-white"
                  >
                    Not now
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step: Cal.com Booking Embed ── */}
            {step === "booking" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="text-xl font-semibold text-white text-center">Pick a time that works</h3>
                <p className="text-sm text-neutral-400 text-center">Select your preferred date &amp; time below.</p>
                <div className="rounded-xl overflow-hidden border border-white/10" style={{ minHeight: 450 }}>
                  <iframe
                    src={calEmbedUrl}
                    className="w-full border-0"
                    style={{ height: 500, colorScheme: "dark" }}
                    title="Book your free strategy call"
                  />
                </div>
                <button onClick={handleNotNow} className="w-full rounded-xl border border-white/10 py-3 text-sm font-medium text-neutral-400 hover:text-white transition">
                  Skip — submit without booking
                </button>
              </motion.div>
            )}

            {/* ── Step: Submitting ── */}
            {(step === "submitting" || isSubmitting) && step !== "booking" && step !== "urgency" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-purple-500" />
                <p className="mt-4 text-sm text-neutral-400">Submitting your information...</p>
              </motion.div>
            )}

            {/* ── Step: Thank You (no booking) ── */}
            {step === "thank_you" && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-4">
                <p className="text-2xl font-semibold text-white">Thanks! ✅</p>
                <p className="text-base text-neutral-300">We received your info and will follow up shortly.</p>
                <button onClick={resetAndClose} className="mt-2 rounded-xl border border-white/15 bg-neutral-900 px-8 py-3 text-sm font-medium text-neutral-300 hover:text-white transition">
                  Close
                </button>
              </motion.div>
            )}

            {/* ── Step: Booked confirmation ── */}
            {step === "booked" && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-4">
                <p className="text-2xl font-semibold text-white">Your call is booked! 📅</p>
                <p className="text-base text-neutral-300">Check your email for confirmation.</p>
                <button onClick={resetAndClose} className="mt-2 rounded-xl border border-white/15 bg-neutral-900 px-8 py-3 text-sm font-medium text-neutral-300 hover:text-white transition">
                  Close
                </button>
              </motion.div>
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
