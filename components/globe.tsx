"use client";
import createGlobe from "cobe";
import { useEffect, useRef, useState, useMemo } from "react";

// https://github.com/shuding/cobe
export const Globe = ({ className }: { className?: string }) => {
  const containerRef   = useRef<HTMLDivElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef        = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(false);

  const globeRotationRef = useRef(0);
  const orbitalAngleRef  = useRef(0);
  const incPhaseRef      = useRef(0);

  const rafRef            = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const sceneRef          = useRef({ size: 600, center: 300, dpr: 2 });
  const trailPointsRef    = useRef<Array<{ x: number; y: number; t: number }>>([]);

  const TRAIL_DECAY = 3600;

  useEffect(() => { hoverRef.current = isHovered; }, [isHovered]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const dpr         = 2;
    const trailCanvas = trailCanvasRef.current;
    const trailCtx    = trailCanvas?.getContext("2d");

    const syncSize = () => {
      const size = containerRef.current?.clientWidth || 600;
      sceneRef.current = { size, center: size / 2, dpr };
      if (trailCanvas) {
        trailCanvas.width        = Math.round(size * dpr);
        trailCanvas.height       = Math.round(size * dpr);
        trailCanvas.style.width  = `${size}px`;
        trailCanvas.style.height = `${size}px`;
      }
    };
    syncSize();

    if (containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(syncSize);
      resizeObserverRef.current.observe(containerRef.current);
    }

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width:  600 * dpr,
      height: 600 * dpr,
      phi: 0, theta: 0,
      dark: 1, diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor:   [0.28, 0.28, 0.28],
      markerColor: [0.66, 0.24, 1],
      glowColor:   [0.47, 0.33, 1],
      // Purple dots at key cities
      markers: [
        { location: [34.0522,  -118.2437] as [number, number], size: 0.06 }, // LA
        { location: [40.7128,   -74.0060] as [number, number], size: 0.06 }, // NY
        { location: [51.5072,    -0.1276] as [number, number], size: 0.06 }, // London
        { location: [35.6764,   139.6500] as [number, number], size: 0.06 }, // Tokyo
        { location: [-33.8688,  151.2093] as [number, number], size: 0.06 }, // Sydney
      ],
      onRender: (state) => {
        const base  = 0.0072;
        const speed = hoverRef.current ? base * 0.7 : base;
        globeRotationRef.current += speed;
        state.phi = globeRotationRef.current;
      },
    });

    const drawTrail = (now: number) => {
      if (!trailCtx) return;
      const { size, dpr: d } = sceneRef.current;
      trailCtx.save();
      trailCtx.setTransform(d, 0, 0, d, 0, 0);
      trailCtx.clearRect(0, 0, size, size);

      // Hard clip — trail never leaves globe
      trailCtx.beginPath();
      trailCtx.arc(size / 2, size / 2, size * 0.44, 0, Math.PI * 2);
      trailCtx.clip();

      const pts = trailPointsRef.current;
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const cur  = pts[i];
        const prog = i / (pts.length - 1); // 0=tail 1=head
        const age  = Math.max(0, 1 - (now - cur.t) / TRAIL_DECAY);
        const alpha = age * (0.25 + prog * 0.9) * 0.85;

        // Vivid gradient: red→purple→blue
        let r: number, g: number, b: number;
        if (prog < 0.5) {
          const p = prog / 0.5;
          r = Math.round(255 - p * 95);
          g = Math.round(50  + p * 10);
          b = Math.round(100 + p * 155);
        } else {
          const p = (prog - 0.5) / 0.5;
          r = Math.round(160 - p * 110);
          g = Math.round(60  + p * 80);
          b = 255;
        }

        trailCtx.beginPath();
        trailCtx.moveTo(prev.x, prev.y);
        trailCtx.lineTo(cur.x,  cur.y);
        trailCtx.lineCap     = "round";
        trailCtx.lineJoin    = "round";
        trailCtx.lineWidth   = 2.5 + prog * 8;   // thick near logo
        trailCtx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        trailCtx.shadowBlur  = 22;
        trailCtx.shadowColor = `rgba(${r},${g},${b},${alpha * 0.85})`;
        trailCtx.stroke();
      }
      trailCtx.restore();
    };

    const animate = (now: number) => {
      // Faster orbit — wraps around in ~3.5s visible, ~1s behind
      orbitalAngleRef.current += 0.022;
      // Inclination slowly oscillates — flat → tilted → flat
      incPhaseRef.current += 0.0007;
      const inc = 0.2 + 0.38 * Math.sin(incPhaseRef.current);

      const a   = orbitalAngleRef.current;
      const wx  = Math.cos(a);
      const wy  = Math.sin(a) * Math.sin(inc);
      const wz  = Math.sin(a) * Math.cos(inc);

      // Project to screen using live globe rotation
      const phi = globeRotationRef.current;
      const rx  =  wx * Math.cos(phi) + wz * Math.sin(phi);
      const ry  =  wy;
      const rz  = -wx * Math.sin(phi) + wz * Math.cos(phi);

      const { size, center } = sceneRef.current;
      const radius = size * 0.44;
      const sx = center + rx * radius;
      const sy = center - ry * radius;

      // rz > 0 = front face (visible)
      const visible = rz > 0;

      if (logoRef.current) {
        logoRef.current.style.opacity = visible ? "1" : "0";
        if (visible) {
          // Logo size: 44px base, slight depth scale
          const depthScale = 0.82 + rz * 0.14;
          logoRef.current.style.transform =
            `translate(${sx - 22}px, ${sy - 22}px) scale(${depthScale})`;
        }
      }

      if (visible) {
        trailPointsRef.current.push({ x: sx, y: sy, t: now });
      }
      while (
        trailPointsRef.current.length &&
        now - trailPointsRef.current[0].t > TRAIL_DECAY
      ) {
        trailPointsRef.current.shift();
      }

      drawTrail(now);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      if (resizeObserverRef.current) { resizeObserverRef.current.disconnect(); resizeObserverRef.current = null; }
      globe.destroy();
    };
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id:      `star-${i}`,
        top:     (i * 29) % 100,
        left:    (i * 53) % 100,
        size:    (i % 3) + 1,
        opacity: 0.12 + (i % 5) * 0.04,
      })),
    []
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient energy ring — replaces static blue ring */}
      <div
        className="absolute inset-6 rounded-full opacity-25 blur-2xl animate-[spin_14s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg, #ef4444, #a855f7, #3b82f6, #a855f7, #ef4444)",
        }}
      />

      {/* Subtle ambient glow */}
      <div className="absolute inset-12 rounded-full bg-gradient-to-r from-red-500/10 via-purple-500/14 to-blue-500/10 blur-3xl" />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-white/50"
            style={{
              top:     `${s.top}%`,
              left:    `${s.left}%`,
              width:   `${s.size}px`,
              height:  `${s.size}px`,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* Trail canvas */}
      <canvas ref={trailCanvasRef} className="absolute inset-0 pointer-events-none" />

      {/* ACAI logo — 44×44, orbits continuously */}
      <div
        ref={logoRef}
        className="absolute pointer-events-none"
        style={{
          width:  44,
          height: 44,
          willChange: "transform, opacity",
        }}
      >
        {/* Glow halo behind logo */}
        <div
          className="absolute rounded-full blur-md"
          style={{
            inset: -8,
            background:
              "radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(59,130,246,0.3) 60%, transparent 100%)",
          }}
        />
        {/* Logo image */}
        <div
          className="relative h-full w-full rounded-full border-2 border-purple-300/70"
          style={{
            backgroundImage:    "url('/justlogowithoutwordsACAI.jpeg')",
            backgroundSize:     "cover",
            backgroundPosition: "center",
            boxShadow:
              "0 0 16px rgba(168,85,247,0.7), 0 0 32px rgba(59,130,246,0.4)",
          }}
        />
      </div>

      {/* Cobe globe */}
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
};
