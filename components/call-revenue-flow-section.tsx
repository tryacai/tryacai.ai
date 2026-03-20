"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "/images/plumberimage1.png",
  "/images/plumberimage2.png",
  "/images/plumberimage3.png",
  "/images/newplumber4.png",
];

const FADE_DURATION = 2500;
const PAUSE_ON_LAST = 1750;
const ARC_DURATION_MS = 5000;
const POOF_DURATION_MS = 1100;
const GLOW_DURATION_MS = 2500;

const SIGNS = [
  { baseAngle: 0, radius: 32, fontSize: 32 },
  { baseAngle: 60, radius: 26, fontSize: 28 },
  { baseAngle: 120, radius: 34, fontSize: 30 },
  { baseAngle: 180, radius: 28, fontSize: 34 },
  { baseAngle: 240, radius: 30, fontSize: 26 },
  { baseAngle: 300, radius: 24, fontSize: 30 },
] as const;

const POOF_COLORS = ["#22c55e", "#4ade80", "#86efac", "#bbf7d0"] as const;

type DollarSignProps = {
  fontSize: number;
  index: number;
  setRef: (element: HTMLSpanElement | null) => void;
};

function DollarSign({ fontSize, index, setRef }: DollarSignProps) {
  return (
    <span
      ref={setRef}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: "translate(0px, 0px)",
      }}
    >
      <motion.span
        style={{
          display: "block",
        color: "#22c55e",
        fontSize: `${fontSize}px`,
        fontWeight: 800,
        lineHeight: 1,
        opacity: 0.95,
        userSelect: "none",
        pointerEvents: "none",
        textShadow: "0 0 8px #22c55e, 0 0 18px #22c55e, 0 0 35px #16a34a",
      }}
      animate={{
        scale: [0.9, 1.15, 0.9],
        opacity: [0.9, 1, 0.9],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        delay: index * 0.2,
      }}
    >
      $
      </motion.span>
    </span>
  );
}

function PoofParticles({ x, y }: { x: number; y: number }) {
  return (
    <>
      {Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * 2 * Math.PI;
        const radius = 68 + (i % 6) * 4;
        const size = 3 + (i % 4) * 1.5;
        const color = POOF_COLORS[i % POOF_COLORS.length];
        const drop = 20 + (i % 5) * 7;
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
              x: Math.cos(angle) * (radius + 12),
              y: Math.sin(angle) * 90 + drop,
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
              fontSize: 36,
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
              scale: 2.5,
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
  const [showBubble, setShowBubble] = useState(false);
  const [showPoof, setShowPoof] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const imageAreaRef = useRef<HTMLDivElement>(null);
  const carrierRef = useRef<HTMLDivElement>(null);
  const signRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const orbitRef = useRef(0);

  const arcRef = useRef({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    peakHeight: 200,
  });

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
          setShowBubble(true);
          after(() => {
            setShowBubble(false);
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
    if (!showBubble || !sectionRef.current || !imageAreaRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const imageRect = imageAreaRef.current.getBoundingClientRect();

    const startX =
      imageRect.left - sectionRect.left + imageRect.width * 0.68;
    const startY = imageRect.top - sectionRect.top + imageRect.height * 0.2;
    const endX = sectionRect.width * 0.9;
    const endY = startY;
    const peakHeight = 200;

    arcRef.current = { startX, startY, endX, endY, peakHeight };

    if (carrierRef.current) {
      carrierRef.current.style.transform = `translate(${startX}px, ${startY}px)`;
    }
  }, [showBubble]);

  useEffect(() => {
    if (!showBubble) return;
    const duration = ARC_DURATION_MS;
    const start = performance.now();
    let raf = 0;

    const { startX, startY, endX, peakHeight } = arcRef.current;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const x = startX + (endX - startX) * ease;
      const y = startY - peakHeight * 4 * ease * (1 - ease);

      if (carrierRef.current) {
        carrierRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showBubble]);

  useEffect(() => {
    if (!showBubble) return;
    let raf = 0;
    orbitRef.current = 0;

    const updateOrbit = () => {
      SIGNS.forEach((sign, index) => {
        const element = signRefs.current[index];
        if (!element) return;
        const angle = (sign.baseAngle + orbitRef.current) * (Math.PI / 180);
        const x = Math.cos(angle) * sign.radius;
        const y = Math.sin(angle) * sign.radius;
        element.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    const spin = () => {
      orbitRef.current = (orbitRef.current + 0.4) % 360;
      updateOrbit();
      raf = requestAnimationFrame(spin);
    };

    updateOrbit();
    raf = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(raf);
  }, [showBubble]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-3 w-full max-w-7xl px-4 pb-2 pt-0 md:-mt-5 md:pb-3"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div
          ref={imageAreaRef}
          style={{
            position: "relative",
            width: "78%",
            marginLeft: "-2%",
            marginTop: "-4px",
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: "3 / 2",
              outline: "none",
              border: "none",
              boxShadow: "none",
              borderRadius: 0,
            }}
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
                  sizes="(min-width: 768px) 78vw, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}

            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                pointerEvents: "none",
                background:
                  "linear-gradient(to right, transparent 62%, black 100%), linear-gradient(to bottom, transparent 70%, black 100%), linear-gradient(to left, transparent 96%, black 100%)",
              }}
            />
          </div>
        </div>
      </motion.div>

      {showBubble && (
        <div
          ref={carrierRef}
          className="pointer-events-none"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            zIndex: 40,
            transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
          }}
        >
          <div className="relative h-0 w-0">
            {SIGNS.map((sign, index) => (
              <DollarSign
                key={index}
                fontSize={sign.fontSize}
                index={index}
                setRef={(element) => {
                  signRefs.current[index] = element;
                }}
              />
            ))}
          </div>
        </div>
      )}

      {showPoof && (
        <PoofParticles
          x={arcRef.current.endX}
          y={arcRef.current.endY}
        />
      )}

      {showGlow && (
        <div
          className="pointer-events-none absolute"
          style={{
            left: arcRef.current.endX - 60,
            top: arcRef.current.endY - 60,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)",
            zIndex: 38,
            animation: "fadeOut 2.5s ease-out forwards",
          }}
        />
      )}
    </section>
  );
}
