"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const plumberStoryImages = [
  "/images/plumberimage1.png",
  "/images/plumberimage2.png",
  "/images/plumberimage3.png",
  "/images/plumber4.png",
];

const FADE_DURATION = 2500;   // 2.5 s per image
const PAUSE_ON_LAST = 1750;   // extra pause on image 4 before bubble
const BUBBLE_TRAVEL_MS = 2750; // must match bubbleFlyArc duration in globals.css

function FloatingDollar({
  size,
  delay,
  color,
}: {
  size: number;
  delay: number;
  color: string;
}) {
  return (
    <motion.span
      animate={{ y: [-2, 2, -2], opacity: [0.75, 1, 0.75] }}
      transition={{
        duration: 1.3 + delay * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      style={{
        color,
        fontSize: size,
        textShadow: `0 0 10px ${color}`,
        display: "inline-block",
        lineHeight: 1,
        fontWeight: 700,
      }}
    >
      $
    </motion.span>
  );
}

export function CallRevenueFlowSection() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    plumberStoryImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    let currentIndex = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timers.push(t);
    };

    const showNext = () => {
      currentIndex++;
      setActiveImageIndex(currentIndex);

      if (currentIndex < plumberStoryImages.length - 1) {
        // Not the last image — advance normally after FADE_DURATION
        later(showNext, FADE_DURATION);
      } else {
        // Last image — show for full FADE_DURATION + PAUSE_ON_LAST, then trigger bubble
        later(() => {
          setShowBubble(true);
          // After the bubble animation completes, restart the cycle
          later(() => {
            setShowBubble(false);
            currentIndex = 0;
            setActiveImageIndex(0);
            later(showNext, FADE_DURATION);
          }, BUBBLE_TRAVEL_MS + 800);
        }, FADE_DURATION + PAUSE_ON_LAST);
      }
    };

    later(showNext, FADE_DURATION);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative z-10 mt-5 w-full max-w-7xl px-4 md:mt-7">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto overflow-hidden rounded-[1.7rem] border border-white/12 bg-black/55 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_38px_rgba(80,70,255,0.18)] backdrop-blur-lg md:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.2),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.12),transparent_62%)]" />

        {/* Image container — larger and shifted to the right */}
        <div className="relative ml-auto w-full md:w-[92%]">
          <div className="relative h-64 rounded-2xl bg-black/70 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition duration-500 ease-out hover:scale-[1.02] hover:brightness-105 md:h-[340px]">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              {plumberStoryImages.map((imageSrc, index) => (
                <div
                  key={imageSrc}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    activeImageIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={imageSrc}
                    alt={`Plumber storyboard frame ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 70vw, 100vw"
                    className="object-contain object-center"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Thought bubble — outside overflow:hidden, positioned relative to the section */}
      {showBubble && (
        <div
          className="bubble-fly-arc pointer-events-none absolute"
          style={{ left: "8%", top: "32%", zIndex: 30 }}
        >
          {/* Trailing cloud dots */}
          <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-end gap-1">
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 0 6px rgba(168,85,247,0.3)",
              }}
            />
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.055)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>
          {/* Main cloud body */}
          <div
            className="flex items-center gap-[6px] px-5 py-3"
            style={{
              borderRadius: "50px",
              background: "rgba(255, 255, 255, 0.07)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 0 20px rgba(168, 85, 247, 0.28), 0 0 48px rgba(168, 85, 247, 0.12), inset 0 0 14px rgba(255,255,255,0.04)",
            }}
          >
            <FloatingDollar size={13} delay={0} color="#4ade80" />
            <FloatingDollar size={21} delay={0.18} color="#22c55e" />
            <FloatingDollar size={15} delay={0.1} color="#86efac" />
          </div>
        </div>
      )}
    </section>
  );
}
