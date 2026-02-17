"use client";
import createGlobe from "cobe";
import { useEffect, useMemo, useRef, useState } from "react";

// https://github.com/shuding/cobe
export const Globe = ({ className }: { className?: string }) => {
  const containerRef   = useRef<HTMLDivElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef        = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(false);

  // Globe rotation — always spinning east, constant speed
  const globePhiRef    = useRef(0);

  // Logo orbit angle — advances independently of globe
  const orbitAngleRef  = useRef(0);

  // Orbit inclination slowly oscillates so the path tilts over time
  const incAngleRef    = useRef(0);

  const rafRef            = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const sceneRef          = useRef({ size: 600, center: 300, dpr: 2 });

  // Trail points — always following logo
  const trailPointsRef = useRef<Array<{ x: number; y: number; t: number }>>([]);
  const logoPosRef     = useRef({ x: 300, y: 300 });
  const logoVisRef     = useRef(true);

  useEffect(() => { hoverRef.current = isHovered; }, [isHovered]);

  useEffect(() => {
    const dpr         = 2;
    const logoEl      = logoRef.current;
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
    if (!canvasRef.current) return;

    // ── Cobe globe ────────────────────────────────────────────────────────
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
      markers: [
        { location: [34.0522,  -118.2437] as [number, number], size: 0.06 },
        { location: [40.7128,   -74.0060] as [number, number], size: 0.06 },
        { location: [51.5072,    -0.1276] as [number, number], size: 0.06 },
        { location: [35.6764,   139.6500] as [number, number], size: 0.06 },
        { location: [-33.8688,  151.2093] as [number, number], size: 0.06 },
      ],
      onRender: (state) => {
        // Globe always spins east at constant speed — hover slows slightly
        const speed = hoverRef.current ? 0.0045 : 0.0060;
        globePhiRef.current += speed;
        state.phi = globePhiRef.current;
      },
    });

    const TRAIL_DECAY = 2800; // ms trail lasts
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // ── Trail renderer ────────────────────────────────────────────────────
    const drawTrail = (now: number) => {
      if (!trailCtx) return;
      const { size, dpr: d } = sceneRef.current;
      trailCtx.save();
      trailCtx.setTransform(d, 0, 0, d, 0, 0);
      trailCtx.clearRect(0, 0, size, size);

      // Always clipped to globe circle
      trailCtx.beginPath();
      trailCtx.arc(size / 2, size / 2, size * 0.44, 0, Math.PI * 2);
      trailCtx.clip();

      const pts = trailPointsRef.current;
      if (pts.length < 2) { trailCtx.restore(); return; }

      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const cur  = pts[i];
        const prog = i / (pts.length - 1); // 0=tail 1=head
        const age  = Math.max(0, 1 - (now - cur.t) / TRAIL_DECAY);
        const alpha = age * (0.15 + prog * 0.85) * 0.75;

        // Red(tail) → purple(mid) → blue(head)
        let r = 255, g = 70, b = 80;
        if (prog < 0.5) {
          const p = prog / 0.5;
          r = Math.round(lerp(255, 160, p));
          g = Math.round(lerp(70,  60,  p));
          b = Math.round(lerp(80,  255, p));
        } else {
          const p = (prog - 0.5) / 0.5;
          r = Math.round(lerp(160, 55,  p));
          g = Math.round(lerp(60,  120, p));
          b = 255;
        }

        trailCtx.beginPath();
        trailCtx.moveTo(prev.x, prev.y);
        trailCtx.lineTo(cur.x,  cur.y);
        trailCtx.lineCap     = "round";
        trailCtx.lineJoin    = "round";
        trailCtx.lineWidth   = 1.5 + prog * 6.5;
        trailCtx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        trailCtx.shadowBlur  = 16;
        trailCtx.shadowColor = `rgba(${r},${g},${b},${alpha * 0.7})`;
        trailCtx.stroke();
      }
      trailCtx.restore();
    };

    // ── Animation loop ────────────────────────────────────────────────────
    const animate = (now: number) => {
      const { size, center } = sceneRef.current;
      const radius = size * 0.44;

      // Advance orbit angle — logo travels around globe slightly faster
      // than the globe itself spins, so it visibly laps the surface
      orbitAngleRef.current  += 0.0095;

      // Inclination oscillates slowly between ~10° and ~55°
      // This makes the orbit path tilt over time — flat → diagonal → flat
      incAngleRef.current += 0.0008;
      const inc = 0.18 + 0.37 * Math.sin(incAngleRef.current); // radians ~10°–55°

      const oa = orbitAngleRef.current;

      // ── Logo world-space position on inclined orbit ───────────────────
      // Orbit is a unit circle tilted by `inc` from the equatorial plane.
      // x = cos(angle)     — horizontal
      // y = sin(angle)*sin(inc)  — vertical (latitude)
      // z = sin(angle)*cos(inc)  — depth
      const wx = Math.cos(oa);
      const wy = Math.sin(oa) * Math.sin(inc);
      const wz = Math.sin(oa) * Math.cos(inc);

      // ── Project to screen using LIVE globe phi ────────────────────────
      // rotateY matches Cobe's phi rotation
      const phi = globePhiRef.current;
      const rx  =  wx * Math.cos(phi) + wz * Math.sin(phi);
      const ry  =  wy;
      const rz  = -wx * Math.sin(phi) + wz * Math.cos(phi);

      const sx = center + rx * radius;
      const sy = center - ry * radius;

      // rz > 0 = front of globe (visible); rz <= 0 = behind globe (hidden)
      const visible = rz > 0;
      logoVisRef.current  = visible;
      logoPosRef.current  = { x: sx, y: sy };

      // Only push trail points when logo is on the front face
      if (visible) {
        trailPointsRef.current.push({ x: sx, y: sy, t: now });
      }

      // Trim old trail points
      while (
        trailPointsRef.current.length > 0 &&
        now - trailPointsRef.current[0].t > TRAIL_DECAY
      ) {
        trailPointsRef.current.shift();
      }

      // ── Update logo DOM ───────────────────────────────────────────────
      if (logoEl) {
        logoEl.style.opacity = visible ? "1" : "0";
        if (visible) {
          // Scale slightly larger when in "front" (rz near 1) — depth cue
          const depthScale = 0.55 + rz * 0.12;
          logoEl.style.transform = `translate(${sx - 20}px, ${sy - 20}px) scale(${depthScale})`;
          logoEl.style.zIndex    = "10";
        }
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
        opacity: 0.14 + (i % 5) * 0.04,
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
      {/* Glow behind globe */}
      <div className="absolute inset-10 rounded-full bg-gradient-to-r from-red-500/16 via-purple-500/18 to-blue-500/16 blur-3xl" />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-white/40"
            style={{ top: `${s.top}%`, left: `${s.left}%`, width: `${s.size}px`, height: `${s.size}px`, opacity: s.opacity }}
          />
        ))}
      </div>

      {/* Trail canvas */}
      <canvas ref={trailCanvasRef} className="absolute inset-0 pointer-events-none" />

      {/* ACAI logo — orbits continuously */}
      <div
        ref={logoRef}
        className="absolute h-10 w-10 pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="absolute inset-[-7px] rounded-full bg-gradient-to-r from-red-500/14 via-purple-500/16 to-blue-500/14 blur-md" />
        <div
          className="relative h-full w-full rounded-full border border-blue-300/60 shadow-[0_0_12px_rgba(59,130,246,0.3),0_0_8px_rgba(168,85,247,0.22)]"
          style={{
            backgroundImage:    "url('/justlogowithoutwordsACAI.jpeg')",
            backgroundSize:     "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Orbital rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-8 rounded-full border border-purple-400/20 ${isHovered ? "animate-[spin_22s_linear_infinite]" : "animate-[spin_15s_linear_infinite]"}`} />
        <div className={`absolute inset-14 rounded-full border border-blue-400/20 ${isHovered ? "animate-[spin_30s_linear_infinite_reverse]" : "animate-[spin_21s_linear_infinite_reverse]"}`} />
      </div>

      {/* Cobe globe canvas */}
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
};
