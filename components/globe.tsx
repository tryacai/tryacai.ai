"use client";
import createGlobe from "cobe";
import { useEffect, useMemo, useRef, useState } from "react";

// https://github.com/shuding/cobe
export const Globe = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(false);

  const globeRotationRef = useRef(0);
  const globeSpeedRef = useRef(0.0068);
  const isPausedRef = useRef(false);

  const rafRef = useRef<number | null>(null);

  const flightStateRef = useRef<{
    segmentIndex: number;
    phase: "flight" | "landed";
    phaseStart: number;
    trailOpacity: number;
    points: Array<{ x: number; y: number }>;
    logoPos: { x: number; y: number };
  }>({
    segmentIndex: 0,
    phase: "flight",
    phaseStart: 0,
    trailOpacity: 1,
    points: [],
    logoPos: { x: 300, y: 300 },
  });

  const surfacePositions = useMemo(
    () => [
      { x: 210, y: 250 },
      { x: 280, y: 180 },
      { x: 380, y: 220 },
      { x: 340, y: 330 },
      { x: 235, y: 320 },
    ],
    []
  );

  useEffect(() => {
    hoverRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const size = 600;
    const dpr = 2;

    const logoElement = logoRef.current;
    const pulseElement = pulseRef.current;
    const trailCanvas = trailCanvasRef.current;
    const trailCtx = trailCanvas?.getContext("2d");

    if (trailCanvas) {
      trailCanvas.width = size * dpr;
      trailCanvas.height = size * dpr;
      trailCanvas.style.width = `${size}px`;
      trailCanvas.style.height = `${size}px`;
    }

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.28, 0.28, 0.28],
      markerColor: [0.66, 0.24, 1],
      glowColor: [0.47, 0.33, 1],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        const baseSpeed = 0.0068;
        const hoverSpeed = baseSpeed * 0.7;
        const targetSpeed = isPausedRef.current ? 0 : hoverRef.current ? hoverSpeed : baseSpeed;
        globeSpeedRef.current += (targetSpeed - globeSpeedRef.current) * 0.08;
        globeRotationRef.current += globeSpeedRef.current;
        state.phi = globeRotationRef.current;
      },
    });

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const quadraticBezier = (
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      t: number
    ) => {
      const mt = 1 - t;
      return {
        x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
        y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
      };
    };

    const startTime = performance.now();
    flightStateRef.current.phaseStart = startTime;
    flightStateRef.current.logoPos = surfacePositions[0];

    const drawTrail = () => {
      if (!trailCtx) return;

      trailCtx.save();
      trailCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      trailCtx.clearRect(0, 0, size, size);

      const points = flightStateRef.current.points;
      if (points.length > 1) {
        const tail = points[0];
        const head = points[points.length - 1];

        const gradient = trailCtx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        gradient.addColorStop(0, "rgba(255, 60, 60, 0.10)");
        gradient.addColorStop(0.55, "rgba(160, 0, 255, 0.34)");
        gradient.addColorStop(1, "rgba(0, 102, 255, 0.65)");

        trailCtx.beginPath();
        trailCtx.moveTo(points[0].x, points[0].y);
        for (let index = 1; index < points.length; index += 1) {
          trailCtx.lineTo(points[index].x, points[index].y);
        }

        trailCtx.strokeStyle = gradient;
        trailCtx.lineWidth = 3;
        trailCtx.globalAlpha = flightStateRef.current.trailOpacity;
        trailCtx.shadowBlur = 12;
        trailCtx.shadowColor = "rgba(123, 0, 255, 0.45)";
        trailCtx.stroke();
      }

      trailCtx.restore();
    };

    const animate = (now: number) => {
      const state = flightStateRef.current;
      const currentFrom = surfacePositions[state.segmentIndex];
      const nextIndex = (state.segmentIndex + 1) % surfacePositions.length;
      const currentTo = surfacePositions[nextIndex];

      if (state.phase === "flight") {
        isPausedRef.current = false;
        const progress = Math.min((now - state.phaseStart) / 5000, 1);
        const easedProgress = easeInOutCubic(progress);

        const midX = (currentFrom.x + currentTo.x) / 2;
        const midY = (currentFrom.y + currentTo.y) / 2;
        const centerX = size / 2;
        const centerY = size / 2;

        const radialX = centerX - midX;
        const radialY = centerY - midY;
        const radialLen = Math.hypot(radialX, radialY) || 1;

        const curveDepth = 42 + (state.segmentIndex % 2) * 10;
        const controlPoint = {
          x: midX + (radialX / radialLen) * curveDepth,
          y: midY + (radialY / radialLen) * curveDepth,
        };

        const point = quadraticBezier(currentFrom, controlPoint, currentTo, easedProgress);
        state.logoPos = point;

        state.points.push(point);
        if (state.points.length > 40) {
          state.points.shift();
        }

        state.trailOpacity = 1;

        if (progress >= 1) {
          state.phase = "landed";
          state.phaseStart = now;
          isPausedRef.current = true;
        }
      } else {
        isPausedRef.current = true;
        const landedElapsed = now - state.phaseStart;
        state.trailOpacity = Math.max(0, state.trailOpacity - 0.06);

        if (landedElapsed >= 1000) {
          state.segmentIndex = nextIndex;
          state.phase = "flight";
          state.phaseStart = now;
          state.points = [];
          state.trailOpacity = 1;
          isPausedRef.current = false;
        }
      }

      if (logoElement) {
        logoElement.style.transform = `translate(${state.logoPos.x - 16}px, ${state.logoPos.y - 16}px)`;
      }

      if (pulseElement) {
        if (state.phase === "landed") {
          const pulseProgress = Math.min((now - state.phaseStart) / 800, 1);
          const eased = easeInOutCubic(pulseProgress);
          const scale = 0.35 + eased * 2.15;
          const opacity = 0.35 * (1 - pulseProgress);
          pulseElement.style.opacity = `${opacity}`;
          pulseElement.style.transform = `translate(${state.logoPos.x - 16}px, ${state.logoPos.y - 16}px) scale(${scale})`;
        } else {
          pulseElement.style.opacity = "0";
        }
      }

      drawTrail();
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      globe.destroy();
    };
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, index) => {
        const top = (index * 29) % 100;
        const left = (index * 53) % 100;
        const size = (index % 3) + 1;
        const opacity = 0.14 + ((index % 5) * 0.04);
        return { id: `star-${index}`, top, left, size, opacity };
      }),
    []
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-10 rounded-full bg-gradient-to-r from-red-500/18 via-purple-500/20 to-blue-500/18 blur-3xl" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        {stars.map((star) => {
          return (
            <span
              key={star.id}
              className="absolute rounded-full bg-white/40"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
              }}
            />
          );
        })}
      </div>

      <canvas
        ref={trailCanvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div
        ref={pulseRef}
        className="absolute h-8 w-8 rounded-full border border-purple-300/50 shadow-[0_0_20px_rgba(168,85,247,0.35)] pointer-events-none"
        style={{ opacity: 0, transformOrigin: "center" }}
      />

      <div
        ref={logoRef}
        className="absolute h-8 w-8 rounded-full border border-blue-300/70 bg-neutral-950/85 text-[8px] font-semibold tracking-wide text-white flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.45),0_0_8px_rgba(168,85,247,0.35)] pointer-events-none"
      >
        ACAI
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-8 rounded-full border border-purple-400/20 transition-all duration-500 ease-out ${isHovered ? "animate-[spin_22s_linear_infinite]" : "animate-[spin_15s_linear_infinite]"}`} />
        <div className={`absolute inset-14 rounded-full border border-blue-400/20 transition-all duration-500 ease-out ${isHovered ? "animate-[spin_30s_linear_infinite_reverse]" : "animate-[spin_21s_linear_infinite_reverse]"}`} />
      </div>

      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
};
