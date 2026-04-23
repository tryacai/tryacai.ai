"use client";

import { motion } from "framer-motion";
import TrustDeckSlideshow from "../_components/TrustDeckSlideshow";

export default function CallConfirmedPage() {
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
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs md:text-sm font-semibold tracking-wider uppercase text-white">
            BOOKING CONFIRMED — ONE LAST STEP
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
        <h1 className="text-3xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
          <span className="text-[#FFA340]">Congrats!</span> 🎉 Your call has been scheduled.
        </h1>
        <h2 className="text-lg md:text-2xl font-semibold text-white leading-snug mt-4 md:mt-6 max-w-3xl mx-auto">
          <span className="underline decoration-[#2DB4FF] decoration-4 underline-offset-4">
            LAST STEP:
          </span>{" "}
          Flip through the quick Pre-Call Preview below so you can get more context on your call.
        </h2>
        <p className="text-sm md:text-base italic text-[#FF4D6D] mt-4 max-w-2xl mx-auto">
          (Mandatory: your call will be cancelled if you don&apos;t review these — takes 20 seconds)
        </p>
      </motion.div>

      {/* D. Pre-call preview slideshow */}
      <motion.div
        className="w-full max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          <TrustDeckSlideshow />
        </div>
      </motion.div>

      {/* E. Confirmation instruction box */}
      <motion.div
        className="mt-8 md:mt-10 w-full max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <div className="bg-black/30 backdrop-blur-md border border-white/15 rounded-xl p-5 md:p-7 text-center">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2">Confirm your call</h3>
          <p className="text-sm md:text-base text-white/85 leading-relaxed">
            To confirm this call on our team&apos;s calendar, please make sure to respond to our email confirmation by replying with &quot;YES&quot;.
          </p>
          <p className="mt-4 text-sm md:text-base text-white/85">See you then 😊</p>
        </div>
      </motion.div>

      {/* F. Trust row */}
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

      {/* G. Footer */}
      <footer className="mt-16 py-8 w-full border-t border-white/10 text-center text-white/50 text-xs md:text-sm">
        © 2026 Mica Growth · Helping Florida epoxy companies scale.
      </footer>
    </div>
  );
}
