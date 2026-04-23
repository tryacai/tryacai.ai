"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  "/MicaGrowth_PreCall_Deck (1).png",
  "/MicaGrowth_PreCall_Deck (2).png",
  "/MicaGrowth_PreCall_Deck (3).png",
  "/MicaGrowth_PreCall_Deck (4).png",
  "/MicaGrowth_PreCall_Deck (5).png",
  "/MicaGrowth_PreCall_Deck.png",
];

const SLIDE_DURATION = 7000;
const LAST_SLIDE = slides.length - 1;

function fireConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const colors = ["#FFA340", "#2DB4FF", "#C93D7F", "#FFFFFF", "#FFA340"];
  const particles: {
    x: number; y: number; vx: number; vy: number;
    color: string; size: number; alpha: number; rotation: number; rotationSpeed: number;
  }[] = [];

  for (let i = 0; i < 150; i++) {
    const angle = (Math.random() * Math.PI) + Math.PI; // upward hemisphere
    const speed = 3 + Math.random() * 6;
    particles.push({
      x: canvas.width / 2,
      y: 0,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 5 + Math.random() * 7,
      alpha: 1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
    });
  }

  const startTime = performance.now();
  const duration = 2500;

  function draw(now: number) {
    const elapsed = now - startTime;
    if (elapsed > duration) {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.vy += 0.18; // gravity
      p.x += p.vx;
      p.y += p.vy;
      p.alpha = Math.max(0, 1 - elapsed / duration);
      p.rotation += p.rotationSpeed;

      ctx!.save();
      ctx!.globalAlpha = p.alpha;
      ctx!.fillStyle = p.color;
      ctx!.translate(p.x, p.y);
      ctx!.rotate((p.rotation * Math.PI) / 180);
      ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
      ctx!.restore();
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

export default function TrustDeckSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [completed, setCompleted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerCompletion = useCallback(() => {
    if (completed) return;
    setCompleted(true);
    if (canvasRef.current) fireConfetti(canvasRef.current);
  }, [completed]);

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(index);
    if (index === LAST_SLIDE) triggerCompletion();
  }, [triggerCompletion]);

  const goPrev = () => {
    setActiveSlide((prev) => {
      const next = prev === 0 ? 0 : prev - 1;
      return next;
    });
  };

  const goNext = useCallback(() => {
    setActiveSlide((prev) => {
      const next = prev === LAST_SLIDE ? LAST_SLIDE : prev + 1;
      if (next === LAST_SLIDE) triggerCompletion();
      return next;
    });
  }, [triggerCompletion]);

  // Auto-advance
  useEffect(() => {
    if (completed) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => {
        if (prev === LAST_SLIDE) {
          triggerCompletion();
          return prev;
        }
        return prev + 1;
      });
    }, SLIDE_DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeSlide, completed, triggerCompletion]);

  const progressPercent = Math.round(((activeSlide + 1) / slides.length) * 100);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Progress bar */}
      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden mb-3">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#FFA340] to-[#2DB4FF] transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Slide container */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <div className="relative w-full bg-[#0A0E42] overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {/* Confetti canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          />

          {slides.map((slide, index) => (
            <div
              key={slide}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={index !== activeSlide}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${slide}')`,
                  backgroundPosition: "center 10%",
                  backgroundSize: "cover",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#FFA340]/15 mix-blend-overlay" />
              <div
                className="absolute bottom-0 right-0 pointer-events-none"
                style={{
                  width: "160px",
                  height: "60px",
                  background: "radial-gradient(ellipse at bottom right, rgba(10,14,66,0.95) 0%, rgba(10,14,66,0.75) 38%, rgba(10,14,66,0) 100%)",
                }}
              />
            </div>
          ))}

          {/* Left arrow */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            disabled={activeSlide === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white hover:bg-black/60 transition disabled:opacity-25"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            disabled={activeSlide === LAST_SLIDE}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white hover:bg-black/60 transition disabled:opacity-25"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
                className={`transition-all ${
                  index === activeSlide
                    ? "w-6 h-2 rounded-full bg-[#FFA340]"
                    : "w-2 h-2 rounded-full bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-black/30 backdrop-blur-md border border-white/15 rounded-2xl p-6 mt-6 text-center"
          >
            <p className="text-2xl md:text-3xl font-bold text-white">You&apos;re ready for your call! 😊</p>
            <p className="text-base text-white/75 mt-2">See you then — we&apos;re looking forward to it.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}