"use client";
import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

// https://github.com/shuding/cobe
export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    hoverRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    let phi = 0;
    let rotationSpeed = 0.009;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.65, 0.25, 1],
      glowColor: [0.5, 0.35, 1],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        const targetSpeed = hoverRef.current ? 0.0054 : 0.009;
        rotationSpeed += (targetSpeed - rotationSpeed) * 0.08;
        state.phi = phi;
        phi += rotationSpeed;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div
      className={`relative ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-10 rounded-full bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 blur-3xl" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        {Array.from({ length: 18 }).map((_, index) => {
          const top = ((index * 37) % 100);
          const left = ((index * 61) % 100);
          const size = (index % 3) + 1;
          return (
            <span
              key={`star-${index}`}
              className="absolute rounded-full bg-white/40"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animation: `pulse ${3 + (index % 4)}s ease-in-out ${index * 0.1}s infinite`,
              }}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-8 rounded-full border border-purple-400/20 transition-all duration-500 ease-out ${isHovered ? "animate-[spin_20s_linear_infinite]" : "animate-[spin_14s_linear_infinite]"}`} />
        <div className={`absolute inset-14 rounded-full border border-blue-400/20 transition-all duration-500 ease-out ${isHovered ? "animate-[spin_28s_linear_infinite_reverse]" : "animate-[spin_20s_linear_infinite_reverse]"}`} />
      </div>

      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
};
