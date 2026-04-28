"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  buildCalEmbedUrl,
  buildPostBookingRedirectUrl,
  isCalBookingSuccessMessage,
  isCalEmbedOrigin,
  readCalBookingDetails,
} from "@/lib/cal-booking";

const CAL_URL = "https://cal.com/micagrowth/30min";
const POST_BOOKING_PATH = "/post-bookingpage";

function FaqStrip() {
  return (
    // FAQ section wrapper: replace this entire section with VSL embed later.
    <section className="mt-16 md:mt-20 w-full max-w-6xl">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
        COMMON QUESTIONS
      </p>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
          <h3 className="text-base font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Is this call really free?
          </h3>
          <p className="mt-3 text-sm text-white/85 leading-relaxed">
            Yes. No credit card, no contract. We only make money when we deliver booked jobs into your schedule.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
          <h3 className="text-base font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            What if my area is already taken?
          </h3>
          <p className="mt-3 text-sm text-white/85 leading-relaxed">
            We will let you know on the call. If your city is gone, we will tell you straight with no runaround.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
          <h3 className="text-base font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            How long is the call?
          </h3>
          <p className="mt-3 text-sm text-white/85 leading-relaxed">
            15-30 minutes. You are running a business, so we keep it tight and to the point.
          </p>
        </article>
      </div>
    </section>
  );
}

function ThreeStepStrip() {
  return (
    <section className="mt-12 w-full max-w-6xl">
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 text-center">
        <div className="hidden md:block absolute left-[16.66%] right-[16.66%] top-6 h-px bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow-[0_0_22px_rgba(99,102,241,0.35)]">
            1
          </span>
          <p className="mt-3 text-[15px] text-white">
            Pick your time - choose any open slot below
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <span className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow-[0_0_22px_rgba(99,102,241,0.35)]">
            2
          </span>
          <p className="mt-3 text-[15px] text-white">
            We confirm your territory - quick check your city is still available
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <span className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow-[0_0_22px_rgba(99,102,241,0.35)]">
            3
          </span>
          <p className="mt-3 text-[15px] text-white">
            System goes live - leads start hitting your phone within 7 days
          </p>
        </div>
      </div>
    </section>
  );
}

export default function StrategyCallClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasRedirectedRef = useRef(false);

  const leadContext = useMemo(() => {
    return {
      fullName: searchParams.get("full_name") || searchParams.get("name") || "",
      businessEmail: searchParams.get("business_email") || searchParams.get("email") || "",
      phoneNumber: searchParams.get("phone_number") || searchParams.get("phone") || "",
      companyName: searchParams.get("company_name") || searchParams.get("company") || "",
    };
  }, [searchParams]);

  const calEmbedUrl = useMemo(() => {
    return buildCalEmbedUrl(CAL_URL, {
      fullName: leadContext.fullName,
      businessEmail: leadContext.businessEmail,
      phoneNumber: leadContext.phoneNumber,
      companyName: leadContext.companyName,
    });
  }, [leadContext]);

  const themedCalEmbedUrl = useMemo(() => {
    const url = new URL(calEmbedUrl);
    url.searchParams.set("theme", "dark");
    url.searchParams.set("primaryColor", "6366f1");
    return url.toString();
  }, [calEmbedUrl]);

  useEffect(() => {
    const handleCalEvent = (e: MessageEvent) => {
      if (!isCalEmbedOrigin(e.origin)) {
        return;
      }

      if (!isCalBookingSuccessMessage(e.data)) {
        return;
      }

      if (hasRedirectedRef.current) {
        return;
      }

      const booking = readCalBookingDetails(e.data);
      const redirectUrl = buildPostBookingRedirectUrl(POST_BOOKING_PATH, {
        callDate: booking?.startTime || "",
        eventId: booking?.eventId || "",
        fullName: leadContext.fullName,
        businessEmail: leadContext.businessEmail,
        phoneNumber: leadContext.phoneNumber,
        companyName: leadContext.companyName,
      });

      if (process.env.NODE_ENV !== "production") {
        console.log("[StrategyCall] Cal booking success detected", {
          booking,
          redirectUrl,
        });
      }

      hasRedirectedRef.current = true;
      router.push(redirectUrl);
    };

    window.addEventListener("message", handleCalEvent);
    return () => window.removeEventListener("message", handleCalEvent);
  }, [leadContext, router]);

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background overlay layering: epoxy image + dark mask for legibility. */}
      <div className="fixed inset-0 -z-20 bg-[url('/epoxybackground.png')] bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed" />
      <div className="fixed inset-0 -z-10 bg-[rgba(0,0,0,0.65)]" />

      <style jsx>{`
        /* Pulsing scarcity dot animation. */
        @keyframes pulse-dot {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 pb-14 pt-8 md:pt-10">
        <header className="flex justify-center">
          <div className="relative h-[44px] w-[170px]">
            <Image
              src="/Micalogo.png"
              alt="Mica Growth"
              fill
              sizes="170px"
              className="object-contain"
              priority
            />
          </div>
        </header>

        <motion.section
          className="mt-8 md:mt-10 text-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/80">
            FLORIDA TERRITORY - LIMITED SPOTS THIS MONTH
          </p>

          <h1 className="mt-4 text-balance text-white font-extrabold leading-tight text-[clamp(1.9rem,6vw,3.8rem)] md:text-[clamp(2.2rem,6vw,4rem)]">
            You&apos;re in. Let&apos;s lock in your <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">Florida</span> territory.
          </h1>

          <p className="mt-5 mx-auto max-w-[680px] text-[18px] text-white leading-[1.6]">
            We&apos;ll spend 15-30 minutes showing you exactly how we book floor-coating jobs straight into your calendar every month - and confirm your city hasn&apos;t been claimed yet.
          </p>

          <article className="mt-7 mx-auto max-w-[580px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-7 text-left">
            <p className="text-center text-[11px] uppercase tracking-[0.16em] text-white/60 font-semibold">
              IN 15-30 MINUTES YOU&apos;LL KNOW:
            </p>

            <ul className="mt-4 space-y-3 text-[15px] text-white leading-relaxed">
              <li className="flex gap-2.5">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">✦</span>
                <span>Whether your city is still open (we only take one contractor per area)</span>
              </li>
              <li className="flex gap-2.5">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">✦</span>
                <span>Exactly how many jobs we project for your market</span>
              </li>
              <li className="flex gap-2.5">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">✦</span>
                <span>How the system works - live walkthrough, no fluff</span>
              </li>
              <li className="flex gap-2.5">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">✦</span>
                <span>If we&apos;re a fit - if not, we&apos;ll tell you straight and point you somewhere better</span>
              </li>
            </ul>
          </article>

          <div className="mt-5 flex items-center justify-center gap-2 text-white text-[16px]">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-full bg-green-400"
              style={{ animation: "pulse-dot 1.5s infinite" }}
            />
            <p>
              🟢 <span className="font-bold">3 Florida spots remaining this month.</span> Tampa, Orlando, and one additional city.
            </p>
          </div>
        </motion.section>

        <motion.section
          className="mt-10 md:mt-12 w-full max-w-[760px] mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        >
          <p className="mb-3 text-center text-[13px] italic text-white/65">
            Pick a time below - takes 30 seconds to lock in your spot.
          </p>

          <div className="rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_40px_rgba(99,102,241,0.2)] bg-black/25 backdrop-blur-sm">
            <iframe
              src={themedCalEmbedUrl}
              title="Schedule your strategy call"
              className="w-full border-0"
              style={{ height: "700px", overflow: "scroll", colorScheme: "dark" }}
            />
          </div>
        </motion.section>

        <FaqStrip />

        <ThreeStepStrip />

        <footer className="mt-14 text-center text-xs text-[rgba(255,255,255,0.4)]">
          © 2026 Mica Growth. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
