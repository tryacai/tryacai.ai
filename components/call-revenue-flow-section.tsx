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

export function CallRevenueFlowSection() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    plumberStoryImages.forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });

    const interval = window.setInterval(() => {
      setActiveImageIndex((previousIndex) => (previousIndex + 1) % plumberStoryImages.length);
    }, 2500);

    return () => window.clearInterval(interval);
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

        <div className="relative h-48 rounded-2xl bg-black/70 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition duration-500 ease-out hover:scale-[1.02] hover:brightness-105 md:h-56">
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
      </motion.div>
    </section>
  );
}
