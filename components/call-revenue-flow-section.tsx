"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const IMAGES = [
  "/images/plumberimage1.png",
  "/images/plumberimage2.png",
  "/images/plumberimage3.png",
  "/images/plumber4.png",
];

const FADE_DURATION = 2500;
const PAUSE_ON_LAST = 1750;
const ARC_DURATION = 1.8;
const ARC_DURATION_MS = 1800;
const POOF_DURATION_MS = 1100;
const GLOW_DURATION_MS = 1500;
const ARC_T = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1] as const;

const DOLLARS = [
  { angle: 0, size: 32, radius: 20, delay: 0 },
  { angle: 60, size: 26, radius: 18, delay: 0.04 },
  { angle: 120, size: 24, radius: 22, delay: 0.08 },
  { angle: 180, size: 29, radius: 20, delay: 0.12 },
  { angle: 240, size: 22, radius: 19, delay: 0.16 },
  { angle: 300, size: 27, radius: 21, delay: 0.2 },
] as const;

const POOF_COLORS = ["#22c55e", "#4ade80", "#86efac", "#bbf7d0"] as const;

type ArcVars = CSSProperties & {
  [key: `--arc-x-${number}`]: string;
  [key: `--arc-y-${number}`]: string;
};

function OrbitingDollar({
  angle,
  size,
  radius,
  delay,
}: (typeof DOLLARS)[number]) {
  return (
    <motion.span
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        color: "#22c55e",
        fontSize: size,
        fontWeight: 700,
        lineHeight: 1,
        userSelect: "none",
        transform: `rotate(${angle}deg) translateX(${radius}px)`,
        transformOrigin: "center",
        textShadow:
          "0 0 10px rgba(34,197,94,0.95), 0 0 24px rgba(34,197,94,0.65), 0 0 42px rgba(74,222,128,0.35)",
      }}
      animate={{
        scale: [0.9, 1.1, 0.9],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      $
    </motion.span>
  );
}

function PoofParticles({ x, y }: { x: number; y: number }) {
  return (
    <>
      {Array.from({ length: 22 }, (_, i) => {
        const angle = (i / 22) * 2 * Math.PI;
        const radius = 60 + (i % 5) * 5;
        const size = 3 + (i % 4) * 1.5;
        const color = POOF_COLORS[i % POOF_COLORS.length];
        const drop = 18 + (i % 4) * 7;
        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 ${size * 3}px ${color}`,
              zIndex: 45,
              pointerEvents: "none",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius + drop,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.95, ease: "easeOut", delay: i * 0.03 }}
          />
        );
      })}

      {Array.from({ length: 4 }, (_, i) => {
        const angle = (-0.75 + i * 0.5) * Math.PI;
        const radius = 32 + i * 10;
        return (
          <motion.span
            key={`echo-${i}`}
            style={{
              position: "absolute",
              left: x,
              top: y,
              color: "#4ade80",
              fontSize: 28 + i * 2,
              fontWeight: 700,
              lineHeight: 1,
              textShadow:
                "0 0 12px rgba(34,197,94,0.95), 0 0 26px rgba(34,197,94,0.55)",
              zIndex: 46,
              pointerEvents: "none",
            }}
            initial={{ x: 0, y: 0, opacity: 0.95, scale: 0.9 }}
            animate={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius + 22,
              opacity: 0,
              scale: 1.5,
            }}
            transition={{ duration: 0.95, ease: "easeOut", delay: i * 0.03 }}
          >
            $
          </motion.span>
        );
      })}
    </>
  );
}

export function CallRevenueFlowSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showArc, setShowArc] = useState(false);
  const [showPoof, setShowPoof] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [arcParams, setArcParams] = useState<{
    startX: number;
    startY: number;
    endX: number;
    peakHeight: number;
    cssVars: ArcVars;
  } | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const imageAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    IMAGES.forEach((src) => { const img = new window.Image(); img.src = src; });

    let idx = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const after = (fn: () => void, ms: number) =>
      timers.push(setTimeout(fn, ms));

    const advance = () => {
      idx++;
      setActiveIndex(idx);

      if (idx < IMAGES.length - 1) {
        after(advance, FADE_DURATION);
      } else {
        after(() => {
          setShowArc(true);
          after(() => {
            setShowArc(false);
            setShowPoof(true);
            setShowGlow(true);

            after(() => {
              setShowPoof(false);
            }, POOF_DURATION_MS);

            after(() => {
              setShowGlow(false);
              idx = 0;
              setActiveIndex(0);
              after(advance, FADE_DURATION);
            }, GLOW_DURATION_MS);
          }, ARC_DURATION_MS);
        }, FADE_DURATION + PAUSE_ON_LAST);
      }
    };

    after(advance, FADE_DURATION);
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!showArc || !sectionRef.current || !imageAreaRef.current) return;

    const sr = sectionRef.current.getBoundingClientRect();
    const ir = imageAreaRef.current.getBoundingClientRect();

    const startX = ir.left - sr.left + ir.width * 0.58;
    const startY = ir.top - sr.top + ir.height * 0.18;
    const endX = sr.width * 0.865;
    const peakHeight = Math.min(160, Math.max(120, sr.width * 0.14));

    const cssVars = ARC_T.reduce((vars, t, index) => {
      const x = (endX - startX) * t;
      const y = -peakHeight * 4 * t * (1 - t);
      vars[`--arc-x-${index}`] = `${x}px`;
      vars[`--arc-y-${index}`] = `${y}px`;
      return vars;
    }, {} as ArcVars);

    setArcParams({
      startX,
      startY,
      endX,
      peakHeight,
      cssVars,
    });
  }, [showArc]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 mt-1 w-full max-w-7xl px-4 pb-2 md:mt-2 md:pb-3"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="h-px w-[40%] min-w-[180px] max-w-[420px] bg-[#7c3aed]/50" />

        <div ref={imageAreaRef} className="mt-2 w-full md:w-[60%]">
          <div
            className="relative overflow-hidden"
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
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}

            <div className="call-revenue-image-blend pointer-events-none absolute inset-0" />
          </div>
        </div>
      </motion.div>

      {showArc && arcParams && (
        <div
          className="call-revenue-arc-carrier pointer-events-none"
          style={{
            position: "absolute",
            left: arcParams.startX,
            top: arcParams.startY,
            zIndex: 40,
            ...arcParams.cssVars,
          }}
        >
          <motion.div
            className="relative h-0 w-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: ARC_DURATION,
              ease: "linear",
            }}
          >
            {DOLLARS.map((cfg, index) => (
              <OrbitingDollar key={index} {...cfg} />
            ))}
          </motion.div>
        </div>
      )}

      {showPoof && arcParams && (
        <PoofParticles
          x={arcParams.endX}
          y={arcParams.startY}
        />
      )}

      {showGlow && arcParams && (
        <motion.div
          className="pointer-events-none absolute"
          style={{
            left: arcParams.endX - 40,
            top: arcParams.startY - 40,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)",
            zIndex: 38,
          }}
          initial={{ opacity: 0.9, scale: 0.85 }}
          animate={{ opacity: 0, scale: 1.18 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      )}
    </section>
  );
}
