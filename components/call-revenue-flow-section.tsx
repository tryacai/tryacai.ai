"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type MoneyToken = {
  id: number;
  sizeClass: string;
  delay: number;
  drift: number;
  glow: string;
};

const moneyTokens: MoneyToken[] = [
  { id: 1, sizeClass: "text-base", delay: 0, drift: -6, glow: "0 0 14px rgba(168,85,247,0.55)" },
  { id: 2, sizeClass: "text-lg", delay: 0.45, drift: 8, glow: "0 0 16px rgba(56,189,248,0.55)" },
  { id: 3, sizeClass: "text-sm", delay: 0.9, drift: -9, glow: "0 0 12px rgba(129,140,248,0.55)" },
  { id: 4, sizeClass: "text-base", delay: 1.35, drift: 6, glow: "0 0 16px rgba(167,139,250,0.58)" },
  { id: 5, sizeClass: "text-lg", delay: 1.8, drift: -8, glow: "0 0 18px rgba(59,130,246,0.58)" },
  { id: 6, sizeClass: "text-sm", delay: 2.2, drift: 7, glow: "0 0 12px rgba(192,132,252,0.5)" },
];

export function CallRevenueFlowSection() {
  const [isHovered, setIsHovered] = useState(false);

  const sectionDuration = useMemo(() => (isHovered ? 3.1 : 4.3), [isHovered]);
  const path = useMemo(() => "path('M 70 210 C 235 110, 520 305, 880 145')", []);

  return (
    <section className="relative z-10 mt-5 w-full max-w-7xl px-4 md:mt-7">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative mx-auto overflow-hidden rounded-[1.7rem] border border-white/12 bg-black/55 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_38px_rgba(80,70,255,0.18)] backdrop-blur-lg md:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.2),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.12),transparent_62%)]" />

        <div className="relative grid items-center gap-4 md:grid-cols-[1fr_1.8fr_1fr] md:gap-5">
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [0, -0.5, 0.5, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-40 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-indigo-950/75 p-4 md:h-52"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.22),transparent_45%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <p className="text-[10px] uppercase tracking-[0.2em] text-red-200/80">Missed Call Side</p>
              <div className="rounded-xl border border-dashed border-white/35 bg-black/40 p-4 text-center">
                <p className="text-sm font-medium text-white/85">Plumber Image Placeholder</p>
              </div>
            </div>
          </motion.div>

          <div className="relative h-48 rounded-2xl border border-white/10 bg-black/40 md:h-56">
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 960 320" aria-hidden>
              <defs>
                <linearGradient id="flowTrail" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(167,139,250,0.28)" />
                  <stop offset="50%" stopColor="rgba(59,130,246,0.36)" />
                  <stop offset="100%" stopColor="rgba(125,211,252,0.24)" />
                </linearGradient>
              </defs>
              <path d="M 70 210 C 235 110, 520 305, 880 145" stroke="url(#flowTrail)" strokeWidth="2" fill="none" strokeDasharray="5 10" />
            </svg>

            {moneyTokens.map((token) => (
              <motion.div
                key={token.id}
                className={`absolute left-0 top-0 will-change-transform ${token.sizeClass}`}
                style={{
                  offsetPath: path,
                  WebkitOffsetPath: path,
                  filter: "drop-shadow(0 0 8px rgba(147,197,253,0.45))",
                }}
                animate={{
                  offsetDistance: ["0%", "8%", "4%", "14%", "47%", "77%", "100%"],
                  opacity: [0, 1, 1, 1, 1, 1, 0],
                  y: [0, token.drift, -token.drift * 0.5, 0, token.drift * 0.3, 0, 0],
                  scale: [0.7, 1, 0.94, 1, 1.05, 1.1, 0.85],
                }}
                transition={{
                  duration: sectionDuration,
                  delay: token.delay,
                  repeat: Infinity,
                  ease: [0.42, 0, 0.58, 1],
                }}
              >
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-indigo-400/45 via-blue-400/45 to-cyan-300/45 font-bold text-white"
                  style={{ boxShadow: token.glow }}
                >
                  $
                </span>
              </motion.div>
            ))}

            {Array.from({ length: 7 }).map((_, index) => (
              <motion.span
                key={`particle-${index}`}
                aria-hidden
                className="absolute h-1.5 w-1.5 rounded-full bg-blue-200/90"
                style={{
                  left: `${16 + index * 11}%`,
                  top: `${30 + (index % 3) * 15}%`,
                  filter: "blur(0.8px)",
                }}
                animate={{
                  opacity: [0.2, 0.9, 0.2],
                  scale: [0.8, 1.2, 0.8],
                  x: [0, 10, -4, 0],
                  y: [0, -7, 5, 0],
                }}
                transition={{
                  duration: isHovered ? 1.8 : 2.5,
                  delay: index * 0.18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            <motion.div
              aria-hidden
              className="pointer-events-none absolute right-[9%] top-[31%] h-14 w-14 rounded-full bg-gradient-to-r from-violet-400/35 via-blue-400/40 to-cyan-300/35 blur-md"
              animate={{ scale: [0.88, 1.16, 0.92], opacity: [0.4, 0.95, 0.45] }}
              transition={{ duration: isHovered ? 0.92 : 1.28, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute right-[10.5%] top-[35.5%] h-7 w-7 rounded-full border border-white/35"
              animate={{ scale: [0.75, 1.36, 0.8], opacity: [0.3, 0.95, 0.3] }}
              transition={{ duration: isHovered ? 0.92 : 1.28, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, 0.6, -0.5, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-40 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-sky-950/70 p-4 md:h-52"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.24),transparent_50%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-200/85">Captured Call Side</p>
              <div className="rounded-xl border border-dashed border-white/35 bg-black/40 p-4 text-center">
                <p className="text-sm font-medium text-white/85">Call Agent Image Placeholder</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
