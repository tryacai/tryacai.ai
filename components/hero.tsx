"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  buildCalEmbedUrl,
  buildPostBookingRedirectUrl,
  isCalBookingSuccessMessage,
  isCalEmbedOrigin,
  readCalBookingDetails,
} from "@/lib/cal-booking";

// ─── "GUARANTEED" with diamond sparkle star animation ───
const GuaranteedText = () => {
  const word = "GUARANTEED";
  const [sparkles, setSparkles] = useState<Array<{ id: number; leftPct: number; topPct: number; size: number; rotation: number }>>([]);
  const sparkleIdRef = useRef(0);
  const recentLettersRef = useRef<number[]>([]);

  useEffect(() => {
    const letterCount = word.length;
    let timeoutId: NodeJS.Timeout;
    let mounted = true;

    const spawnSparkle = () => {
      if (!mounted) return;
      const recent = new Set(recentLettersRef.current);
      const available = Array.from({ length: letterCount }, (_, i) => i).filter(i => !recent.has(i));
      const pool = available.length > 0 ? available : Array.from({ length: letterCount }, (_, i) => i);
      const letterPos = pool[Math.floor(Math.random() * pool.length)];

      recentLettersRef.current.push(letterPos);
      if (recentLettersRef.current.length > 4) recentLettersRef.current.shift();

      const id = sparkleIdRef.current++;
      const letterCenterPct = ((letterPos + 0.5) / letterCount) * 100;
      const offsetX = (Math.random() - 0.5) * (100 / letterCount) * 0.5;
      const leftPct = Math.max(2, Math.min(98, letterCenterPct + offsetX));
      const edgeBias = Math.random();
      const topPct = edgeBias < 0.35 ? Math.random() * 20 : edgeBias < 0.7 ? 80 + Math.random() * 20 : 20 + Math.random() * 60;
      const size = 0.2 + Math.random() * 0.15;
      const rotation = Math.random() * 45;

      setSparkles(prev => [...prev, { id, leftPct, topPct, size, rotation }]);
      setTimeout(() => {
        if (mounted) setSparkles(prev => prev.filter(s => s.id !== id));
      }, 700);
      timeoutId = setTimeout(spawnSparkle, 150 + Math.random() * 200);
    };

    timeoutId = setTimeout(spawnSparkle, 100);
    return () => { mounted = false; clearTimeout(timeoutId); };
  }, []);

  return (
    <span className="relative inline-block">
      <span
        className="font-black uppercase tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 bg-clip-text text-transparent"
        style={{
          filter: "drop-shadow(0 0 24px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 48px rgba(168, 85, 247, 0.3)) drop-shadow(0 0 72px rgba(239, 68, 68, 0.2))",
        }}
      >
        GUARANTEED
      </span>
      {/* Diamond sparkle stars — scattered across random letters */}
      {sparkles.map(sparkle => (
        <motion.span
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${sparkle.leftPct}%`,
            top: `${sparkle.topPct}%`,
            width: `${sparkle.size}em`,
            height: `${sparkle.size}em`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: sparkle.rotation }}
          animate={{
            opacity: [0, 1, 0.9, 0],
            scale: [0, 1.6, 1.1, 0],
            rotate: [sparkle.rotation, sparkle.rotation + 20],
          }}
          transition={{ duration: 0.6, times: [0, 0.15, 0.5, 1], ease: "easeOut" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="white"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.95)) drop-shadow(0 0 8px rgba(255,255,255,0.6))" }}
          >
            <path d="M12 0L13.8 9.2L24 12L13.8 14.8L12 24L10.2 14.8L0 12L10.2 9.2Z" />
          </svg>
        </motion.span>
      ))}
    </span>
  );
};

// ─── Glass Card Widget ───
const GlassCard = ({ title, description, delay }: { title: string; description: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02 }}
    className="group rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5 p-6 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all hover:border-white/20 cursor-default"
  >
    <p className="text-sm font-bold uppercase bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 bg-clip-text text-transparent tracking-wider">
      {title}
    </p>
    <p className="mt-3 text-white/80 text-base font-medium leading-relaxed">
      {description}
    </p>
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

const CAL_URL = "https://cal.com/micagrowth/30min";

function fireFbq(eventName: string) {
  if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).fbq) {
    (window as unknown as { fbq: (...args: unknown[]) => void }).fbq("track", eventName);
    console.log(`[Meta Pixel] Fired: ${eventName}`);
  }
}

const QualificationModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const router = useRouter();
  const hasRedirectedRef = useRef(false);

  const [step, setStep] = useState<ModalStep>("qualify");
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calEmbedUrl = (() => {
    return buildCalEmbedUrl(CAL_URL, {
      fullName,
      businessEmail,
      phoneNumber,
      companyName,
    });
  })();

  const buildPayload = () => ({
    sheet_name: "Website_Leads",
    submitted_at: new Date().toISOString(),
    qualification_status: "new",
    company_name: companyName.trim(),
    full_name: fullName.trim(),
    business_email: businessEmail.trim(),
    phone_number: phoneNumber.replace(/\D/g, ""),
    sms_consent: smsConsent,
    source: "website",
    campaign_name: "",
    ad_set_name: "",
    ad_name: "",
    notes: "",
  });

  useEffect(() => {
    if (step !== "booking") return;

    function handleCalMessage(event: MessageEvent) {
      if (!isCalEmbedOrigin(event.origin)) return;
      if (!isCalBookingSuccessMessage(event.data)) return;
      if (hasRedirectedRef.current) return;

      const booking = readCalBookingDetails(event.data);
      const callDate = booking?.startTime || "";

      const redirectUrl = buildPostBookingRedirectUrl("/post-bookingpage", {
        callDate,
        eventId: booking?.eventId || "",
        fullName: fullName.trim(),
        businessEmail: businessEmail.trim(),
        phoneNumber: phoneNumber.replace(/\D/g, ""),
        companyName: companyName.trim(),
      });

      if (process.env.NODE_ENV !== "production") {
        console.log("[HeroBooking] Cal booking success detected", {
          booking,
          redirectUrl,
        });
      }

      hasRedirectedRef.current = true;
      router.push(redirectUrl);
    }

    window.addEventListener("message", handleCalMessage);
    return () => window.removeEventListener("message", handleCalMessage);
  }, [step, companyName, fullName, businessEmail, phoneNumber, router]);

  const handleNotNow = async () => {
    setIsSubmitting(true);
    setStep("submitting");

    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      });
      fireFbq("Lead");
      console.log("[Meta Pixel] Lead fired after non-booking submission");
    } catch (err) {
      console.error("[submit-lead] Submission failed:", err);
    }
    setIsSubmitting(false);
    setStep("thank_you");
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep("qualify");
      setCompanyName("");
      setFullName("");
      setBusinessEmail("");
      setPhoneNumber("");
      setSmsConsent(false);
    }, 300);
  };

  const inputClass =
    "mt-2 block w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3.5 text-white text-base placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500";
  const labelClass = "block text-sm font-medium text-neutral-300";

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
            <button onClick={resetAndClose} className="absolute right-4 top-4 text-neutral-400 hover:text-white text-xl leading-none">&times;</button>

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
                    placeholder="Name"
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
                    placeholder="Your business email"
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
                <div className="mt-3 mb-3 flex flex-col gap-1">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      id="sms-consent-checkbox"
                      type="checkbox"
                      defaultChecked={false}
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-purple-500 cursor-pointer"
                    />
                    <span className="text-xs text-neutral-400 leading-relaxed">
                      By checking this box, I agree to receive SMS messages from ACAI Enterprises LLC (Mica Growth) regarding my inquiry. Message and data rates may apply. Message frequency varies. Reply STOP to unsubscribe at any time. Reply HELP for assistance. Consent is not a condition of any purchase or service.
                    </span>
                  </label>
                  <div className="pl-5 text-xs text-neutral-500">
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-300 transition-colors">Privacy Policy</a>
                    {" | "}
                    <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-300 transition-colors">Terms of Service</a>
                  </div>
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

            {(step === "submitting" || isSubmitting) && step !== "booking" && step !== "urgency" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-purple-500" />
                <p className="mt-4 text-sm text-neutral-400">Submitting your information...</p>
              </motion.div>
            )}

            {step === "thank_you" && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-4">
                <p className="text-2xl font-semibold text-white">Thanks! ✅</p>
                <p className="text-base text-neutral-300">We received your info and will follow up shortly.</p>
                <button onClick={resetAndClose} className="mt-2 rounded-xl border border-white/15 bg-neutral-900 px-8 py-3 text-sm font-medium text-neutral-300 hover:text-white transition">
                  Close
                </button>
              </motion.div>
            )}

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

export const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#contact") {
        setModalOpen(true);
        window.history.replaceState(null, "", window.location.pathname);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  return (
    <div className="relative flex flex-col overflow-hidden pt-24 md:pt-28 min-h-screen">
      {/* Background Image with Opacity Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/epoxybackground.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.35,
        }}
      />
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col">
        {/* Hero Section with padding to push content down */}
        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
            className="w-full max-w-4xl text-center"
          >
            {/* Line 1 — GUARANTEED */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none font-black">
              <GuaranteedText />
            </h1>

            {/* Line 2 — EPOXY JOBS / CONTROL YOUR FLORIDA MARKET */}
            <p className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-tight">
              EPOXY JOBS<br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl underline decoration-2 underline-offset-4 decoration-purple-500">
                CONTROL YOUR FLORIDA MARKET
              </span>
            </p>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 text-lg sm:text-xl md:text-2xl text-white/90 font-normal leading-relaxed max-w-2xl mx-auto"
            >
              We give you <span className="font-bold">booked floor-coating jobs</span> delivered straight to your calendar. <span className="font-bold">15+ ready-to-quote projects</span> every month.
            </motion.p>

            {/* Secondary guarantee line */}
            <p className="mt-4 text-base sm:text-lg md:text-xl font-semibold text-neutral-300">
              <span>$0 Set up Fee.</span>
            </p>
          </motion.div>
        </div>

        {/* 4-Column Glass Card Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-10 mx-auto mt-16 md:mt-20 w-full max-w-5xl px-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <GlassCard
              title="We Give You Work"
              description="Just show up."
              delay={0}
            />
            <GlassCard
              title="Performance-Based Pay"
              description="Pay only when we deliver."
              delay={0.1}
            />
            <GlassCard
              title="24/7 Support"
              description="Call us anytime."
              delay={0.2}
            />
            <GlassCard
              title="SMS Chatbots Included"
              description="Your leads never wait on hold."
              delay={0.3}
            />
          </div>
        </motion.div>

        {/* Credibility Strip — Harvard / Speed-to-Lead */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative z-10 mx-auto mt-16 md:mt-20 w-full max-w-5xl px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Harvard Card */}
            <div className="text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
                Harvard Business Review
              </p>
              <p
                className="text-5xl md:text-6xl font-black tracking-tight mb-4"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ef4444 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 12px rgba(168, 85, 247, 0.3))",
                }}
              >
                391%
              </p>
              <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium mb-2">
                More conversions when you respond inside 60 seconds.
              </p>
              <p className="text-base md:text-lg text-white/70 italic font-normal">
                We handle that for you.
              </p>
            </div>

            {/* Speed-to-Lead Card */}
            <div className="text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
                Speed-to-Lead Research
              </p>
              <p
                className="text-5xl md:text-6xl font-black tracking-tight mb-4"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 12px rgba(168, 85, 247, 0.3))",
                }}
              >
                78%
              </p>
              <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium mb-2">
                Of homeowners hire whoever calls back first.
              </p>
              <p className="text-base md:text-lg text-white/70 italic font-normal">
                That&apos;s us, working for you.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Button Below Credibility Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative z-10 mx-auto mt-16 md:mt-20 w-full max-w-2xl px-4 flex flex-col items-center"
        >
          <button
            onClick={() => setModalOpen(true)}
            className="group relative w-full sm:w-auto px-10 py-5 rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] active:scale-[0.98] overflow-hidden"
          >
            <span className="block text-lg font-bold tracking-wide">
              Claim Your Free 15-Min Strategy Call →
            </span>
            <span className="block mt-1 text-xs font-medium text-white/70">
              Spots for this month closing — book now.
            </span>
          </button>
        </motion.div>
      </div>

      {/* Marquee Banner Below Hero */}
      <div className="relative z-10 mt-auto w-full bg-black border-t border-white/10">
        <style>{`
          @keyframes scroll-marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .marquee-track {
            animation: scroll-marquee 30s linear infinite;
          }

          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        
        <div className="overflow-hidden py-4">
          <div className="marquee-track flex whitespace-nowrap gap-10">
            {/* Duplicate content for seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-10 font-medium text-white/80 text-base uppercase tracking-wider">
                <span>Missed-lead follow-up in seconds</span>
                <span>◆</span>
                <span>Full visibility into every interaction</span>
                <span>◆</span>
                <span>24/7/365 AI coverage</span>
                <span>◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Qualification Modal */}
      <QualificationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};
