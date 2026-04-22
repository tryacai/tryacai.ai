"use client";

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
    <div className="flex flex-col items-center px-4 md:px-6 pb-16">
      {/* A. Top brand strip */}
      <div className="pt-6 md:pt-10 text-center">
        <span className="text-2xl md:text-3xl font-semibold tracking-tight">
          <span className="text-white">Mica</span>
          <span className="text-[#2DB4FF]"> Growth</span>
        </span>
      </div>

      {/* B. Progress bar */}
      <div className="mt-6 md:mt-10 w-full max-w-3xl mx-auto">
        <div className="relative h-9 md:h-11 rounded-full bg-white/10 backdrop-blur-sm overflow-hidden border border-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#FFA340] via-[#FF3B8C] to-[#2DB4FF]"
            initial={{ width: "0%" }}
            animate={{ width: "50%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs md:text-sm font-semibold tracking-wider uppercase text-white">
            STEP 2/2 — Schedule Your Strategy Call
          </div>
        </div>
      </div>

      {/* C. Hero headline block */}
      <motion.div
        className="py-10 md:py-14 text-center w-full max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-lg md:text-2xl font-semibold text-white/90 leading-snug mb-4 md:mb-6 max-w-3xl mx-auto">
          Thanks! The system determined we don&apos;t work with anyone in your area.
        </h2>
        <h1 className="text-3xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
          <span className="text-[#FF4D6D]">Step 2/2</span>
          {" — "}Schedule Your{" "}
          <span className="underline decoration-[#FF3B8C] decoration-4 underline-offset-4">
            Free
          </span>{" "}
          Strategy Call With Our Team
        </h1>
      </motion.div>

      {/* D. Cal.com embed card */}
      <motion.div
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden p-2 md:p-4">
          <iframe
            src={calEmbedUrl}
            title="Schedule your strategy call"
            className="w-full border-0 rounded-xl"
            style={{ height: "680px", overflow: "scroll" }}
          />
        </div>
      </motion.div>

      {/* E. Trust row */}
      <motion.div
        className="mt-8 md:mt-12 w-full max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-10 text-white/85 text-sm md:text-base font-medium">
          <span>
            <span className="text-[#FFA340] mr-2">✓</span>Florida-based team
          </span>
          <span>
            <span className="text-[#FFA340] mr-2">✓</span>Epoxy &amp; polyaspartic specialists
          </span>
          <span>
            <span className="text-[#FFA340] mr-2">✓</span>One partner per service area
          </span>
        </div>
      </motion.div>

      {/* F. Footer */}
      <footer className="mt-16 py-8 w-full border-t border-white/10 text-center text-white/50 text-xs md:text-sm">
        © 2026 Mica Growth · Helping Florida epoxy companies scale.
      </footer>
    </div>
  );
}
