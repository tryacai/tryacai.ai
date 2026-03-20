"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Constants ─────────────────────────────────────────────────────────────────
const IMAGES = [
  "/images/plumberimage1.png",
  "/images/plumberimage2.png",
  "/images/plumberimage3.png",
  "/images/plumber4.png",
];

const FADE_DURATION   = 2500; // ms – shown per image
const PAUSE_ON_LAST   = 1750; // ms – extra hold on image 4 before arc fires
const ARC_DURATION    = 2.4;  // seconds – Framer Motion
const ARC_DURATION_MS = 2400;
const POOF_DURATION_MS = 900; // ms – particles dissipate before unmount

// Symmetric parabola: y(t) = 4 · peakY · t · (1-t)
// peakY is negative (up in CSS coords).  Nine evenly-chosen t values.
const ARC_T = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1.0] as const;

// Dollar sign cluster — 5 signs, sizes 35 % larger than the previous 13/21/15 set
// ox/oy are offsets (px) from the carrier's anchor point
const DOLLARS = [
  { size: 29, ox:  0,   oy:  0,   delay: 0,    color: "#22c55e" }, // center, largest
  { size: 21, ox: -20,  oy: -15,  delay: 0.13, color: "#4ade80" }, // upper-left
  { size: 19, ox:  18,  oy: -11,  delay: 0.08, color: "#16a34a" }, // upper-right
  { size: 23, ox: -13,  oy:  15,  delay: 0.19, color: "#4ade80" }, // lower-left
  { size: 17, ox:  17,  oy:  13,  delay: 0.06, color: "#86efac" }, // lower-right
] as const;

const POOF_COLORS = ["#22c55e", "#4ade80", "#86efac"] as const;

// ─── Sub-components ────────────────────────────────────────────────────────────

/** One floating $ sign — positioned relative to the arc carrier's origin */
function DollarSign({
  size,
  ox,
  oy,
  delay,
  color,
}: (typeof DOLLARS)[number]) {
  return (
    <motion.span
      style={{
        position: "absolute",
        left: ox,
        top: oy,
        color,
        fontSize: size,
        fontWeight: 700,
        lineHeight: 1,
        userSelect: "none",
        // textShadow gives the green glow
        textShadow: `0 0 10px ${color}, 0 0 26px ${color}66, 0 0 40px ${color}33`,
      }}
      animate={{
        x: [0, 2, 0, -2, 0],
        y: [0, -2, 0,  2, 0],
        opacity: [0.85, 1, 0.85, 1, 0.85],
      }}
      transition={{
        duration: 1.5 + delay * 0.7,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      $
    </motion.span>
  );
}

/** Burst of tiny green particles that scatter and fade — the "poof" on landing */
function PoofParticles({ x, y }: { x: number; y: number }) {
  return (
    <>
      {Array.from({ length: 14 }, (_, i) => {
        const angle  = (i / 14) * 2 * Math.PI;
        const radius = 20 + (i % 5) * 9;
        const sz     = 3 + (i % 3) * 2;
        const col    = POOF_COLORS[i % 3];
        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              // positioned from section's top-left:
              left: x,
              top:  y,
              width:  sz,
              height: sz,
              borderRadius: "50%",
              background: col,
              boxShadow: `0 0 ${sz * 2}px ${col}`,
              zIndex: 45,
              pointerEvents: "none",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              opacity: 0,
              scale:   0,
            }}
            transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.022 }}
          />
        );
      })}
    </>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function CallRevenueFlowSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showArc,     setShowArc]     = useState(false);
  const [showPoof,    setShowPoof]    = useState(false);

  // Arc geometry (pixel values relative to the section element)
  const [arcParams, setArcParams] = useState<{
    startX: number;
    startY: number;
    deltaX: number; // total horizontal travel
    peakY:  number; // negative = upward
  } | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const imageAreaRef = useRef<HTMLDivElement>(null);

  // ── Sequence timer ────────────────────────────────────────────────────────
  useEffect(() => {
    // Preload
    IMAGES.forEach((src) => { const img = new window.Image(); img.src = src; });

    let idx = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const after = (fn: () => void, ms: number) =>
      timers.push(setTimeout(fn, ms));

    const advance = () => {
      idx++;
      setActiveIndex(idx);

      if (idx < IMAGES.length - 1) {
        // Not the last image – advance after normal fade duration
        after(advance, FADE_DURATION);
      } else {
        // Image 4 (last): hold the extra pause, then fire arc
        after(() => {
          setShowArc(true);

          // Wait for arc to finish, then swap to poof
          after(() => {
            setShowArc(false);
            setShowPoof(true);

            // After poof dissipates, restart from image 1
            after(() => {
              setShowPoof(false);
              idx = 0;
              setActiveIndex(0);
              after(advance, FADE_DURATION);
            }, POOF_DURATION_MS + 300);
          }, ARC_DURATION_MS + 150);
        }, FADE_DURATION + PAUSE_ON_LAST);
      }
    };

    after(advance, FADE_DURATION);
    return () => timers.forEach(clearTimeout);
  }, []);

  // ── Measure arc geometry once the arc is triggered ────────────────────────
  useEffect(() => {
    if (!showArc || !sectionRef.current || !imageAreaRef.current) return;

    const sr = sectionRef.current.getBoundingClientRect();
    const ir = imageAreaRef.current.getBoundingClientRect();

    // Phone is in the upper-right area of image 4.
    // Using 65 % across and 20 % down as the visual anchor.
    const startX = (ir.left - sr.left) + ir.width  * 0.65;
    const startY = (ir.top  - sr.top)  + ir.height * 0.20;

    // Landing: right reserved zone, same vertical level
    const endX = sr.width * 0.87;

    setArcParams({
      startX,
      startY,
      deltaX: endX - startX,
      peakY:  -80, // pixels upward at the crown of the arc
    });
  }, [showArc]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative z-10 mt-5 w-full max-w-7xl px-4 md:mt-7"
    >
      {/* Scroll-in entrance — no box, blends into the dark background */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/*
          Image sequence
          ─ Left-aligned (no mx-auto / ml-auto)
          ─ 75 % of section on desktop, full width on mobile
          ─ Exact 3:2 aspect ratio matches the 1536×1024 source images →
            object-cover fills perfectly with zero letterboxing
        */}
        <div ref={imageAreaRef} className="w-full md:w-[75%]">
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ aspectRatio: "3 / 2" }}
          >
            {IMAGES.map((src, index) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`Plumber storyboard frame ${index + 1}`}
                  fill
                  sizes="(min-width: 768px) 75vw, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Dollar arc ── */}
      {showArc && arcParams && (
        <motion.div
          className="pointer-events-none"
          style={{
            position: "absolute",
            left: arcParams.startX,
            top:  arcParams.startY,
            zIndex: 40,
          }}
          // Parabolic arc: x travels linearly, y follows 4·peakY·t·(1-t)
          animate={{
            x: ARC_T.map((t) => t * arcParams.deltaX),
            y: ARC_T.map((t) => 4 * arcParams.peakY * t * (1 - t)),
          }}
          transition={{
            duration: ARC_DURATION,
            ease: "easeInOut",
            times: ARC_T as unknown as number[],
          }}
        >
          {DOLLARS.map((cfg, i) => (
            <DollarSign key={i} {...cfg} />
          ))}
        </motion.div>
      )}

      {/* ── Poof explosion at the landing point ── */}
      {showPoof && arcParams && (
        <PoofParticles
          x={arcParams.startX + arcParams.deltaX}
          y={arcParams.startY}
        />
      )}
    </section>
  );
}
