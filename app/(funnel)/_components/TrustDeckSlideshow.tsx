"use client";

import { useEffect, useState } from "react";

const slides = [
  "/Screenshot 2026-04-22 095505.png",
  "/Screenshot 2026-04-22 095512.png",
  "/Screenshot 2026-04-22 095518.png",
  "/Screenshot 2026-04-22 095524.png",
  "/Screenshot 2026-04-22 095531.png",
];

export default function TrustDeckSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeSlide]);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      <div className="relative w-full aspect-video bg-[#0A0E42] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== activeSlide}
          >
            <div
              className="absolute inset-0 bg-cover"
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
                background:
                  "radial-gradient(ellipse at bottom right, rgba(10,14,66,0.95) 0%, rgba(10,14,66,0.75) 38%, rgba(10,14,66,0) 100%)",
              }}
            />
          </div>
        ))}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
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
  );
}