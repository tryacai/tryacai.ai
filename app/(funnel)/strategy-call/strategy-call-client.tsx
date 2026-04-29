"use client";

import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  buildPostBookingRedirectUrl,
  isCalBookingSuccessMessage,
  isCalEmbedOrigin,
  readCalBookingDetails,
} from "@/lib/cal-booking";

const POST_BOOKING_PATH = "/post-bookingpage";

declare global {
  interface Window {
    Cal?: {
      (action: string, namespace: string, options?: Record<string, unknown>): void;
      ns?: Record<
        string,
        (action: string, options: Record<string, unknown>) => void
      >;
      loaded?: boolean;
    };
  }
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

  const calInitializedRef = useRef(false);

  const initializeCalEmbed = useCallback(() => {
    if (calInitializedRef.current) return;
    if (typeof window === "undefined" || !window.Cal) return;

    const calRoot = document.querySelector("#cal-booking-embed");
    if (!calRoot) return;

    calRoot.innerHTML = "";

    window.Cal("init", "15min", { origin: "https://cal.com" });

    const namespace = window.Cal.ns?.["15min"];
    if (!namespace) return;

    namespace("inline", {
      elementOrSelector: "#cal-booking-embed",
      config: { layout: "month_view" },
      calLink: "micagrowth/15min",
    });

    namespace("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    calInitializedRef.current = true;
  }, []);

  useEffect(() => {
    const handleCalEvent = (e: MessageEvent) => {
      if (!isCalEmbedOrigin(e.origin)) return;
      if (!isCalBookingSuccessMessage(e.data)) return;
      if (hasRedirectedRef.current) return;

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
    <div className="relative min-h-screen overflow-hidden bg-transparent text-white">
      <div className="fixed inset-0 -z-20 bg-[url('/epoxybackground.png')] bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed" />
      <div className="fixed inset-0 -z-10 bg-[rgba(0,0,0,0.68)]" />

      <Script
        src="https://app.cal.com/embed/embed.js"
        strategy="lazyOnload"
        onLoad={initializeCalEmbed}
      />

      <style jsx>{`
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.4); opacity: 1; }
        }

        @keyframes pulse-alert {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            transform: scale(1.04);
            box-shadow: 0 0 0 12px rgba(239, 68, 68, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }
      `}</style>

      <div className="mx-auto grid min-h-screen w-full max-w-[1400px] grid-cols-1 gap-8 px-4 py-6 md:px-8 md:py-8 lg:grid-cols-2 lg:items-center lg:gap-10 lg:py-10">
        <motion.section
          className="flex flex-col lg:h-[calc(100vh-80px)] lg:justify-center"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
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

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
            FLORIDA TERRITORY — LIMITED SPOTS
          </p>

          <h1 className="mt-3 text-[clamp(1.8rem,6vw,2.8rem)] md:text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-[1.1] text-white">
            You&apos;re in. Let&apos;s lock in
            <br />
            your <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">Florida</span> territory.
          </h1>

          <p className="mt-3 max-w-[420px] text-[15px] leading-[1.5] text-white/70">
            15–30 min. We confirm your city is open and show you exactly how the job pipeline works.
          </p>

          <ul className="mt-4 space-y-2.5 text-[14px] text-white/80">
            <li className="flex items-start gap-2.5">
              <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent font-bold">✦</span>
              <span>Your city availability confirmed on the call</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent font-bold">✦</span>
              <span>Live walkthrough of the booking system</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent font-bold">✦</span>
              <span>Straight answers — no pitch, no pressure</span>
            </li>
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-2.5 text-[14px] text-white/90">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400"
              style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }}
            />
            <span><strong>3 Florida spots remaining.</strong></span>
            <span
              className="inline-flex items-center rounded-full bg-red-500 px-3.5 py-1.5 text-[12px] font-bold text-white"
              style={{ animation: "pulse-alert 1.5s ease-in-out infinite" }}
            >
              3 SPOTS LEFT — FL
            </span>
          </div>

          <div className="mt-8 max-w-[460px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
              QUICK ANSWERS
            </p>

            <div className="mt-3 space-y-5">
              <div>
                <p className="text-[14px] font-bold text-white">Q: Is this free?</p>
                <p className="mt-1 text-[13px] text-white/65">A: Yes. No card, no contract. We only profit when we deliver booked jobs.</p>
              </div>
              <div>
                <p className="text-[14px] font-bold text-white">Q: What if my city is taken?</p>
                <p className="mt-1 text-[13px] text-white/65">A: We&apos;ll tell you straight on the call. No runaround.</p>
              </div>
              <div>
                <p className="text-[14px] font-bold text-white">Q: How long?</p>
                <p className="mt-1 text-[13px] text-white/65">A: 15–30 minutes. Tight and to the point.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="flex flex-col lg:h-[calc(100vh-80px)] lg:justify-center"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
        >
          <p className="mb-2 text-right text-[12px] italic text-white/45">
            Takes 30 seconds to lock in your spot.
          </p>
          <div className="h-[calc(100vh-100px)] min-h-[500px] overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-sm">
            <div id="cal-booking-embed" style={{ width: "100%", height: "100%", minHeight: "600px" }} />
          </div>
        </motion.section>
      </div>

      <footer className="pb-4 text-center text-[11px] text-white/35">
        © 2026 Mica Growth. All rights reserved.
      </footer>
    </div>
  );
}
