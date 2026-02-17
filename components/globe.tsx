"use client";
import createGlobe from "cobe";
import { useEffect, useRef, useMemo } from "react";

type Vec3 = { x: number; y: number; z: number };

const degToRad = (d: number) => (d * Math.PI) / 180;

const latLonToVec3 = (lat: number, lon: number): Vec3 => {
  const latR = degToRad(lat);
  const lonR = degToRad(lon);
  const cosLat = Math.cos(latR);
  return {
    x: cosLat * Math.cos(lonR),
    y: Math.sin(latR),
    z: cosLat * Math.sin(lonR),
  };
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const easeInOut = (t: number) => {
  const x = clamp01(t);
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

export const Globe = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeCanvasRef = useRef<HTMLCanvasElement>(null);
  const fxCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Bigger default
  const sceneRef = useRef({ size: 960, center: 480, dpr: 2 });

  const phiRef = useRef(1.2);

  // Slower, smoother globe spin
  const globeSpeedRef = useRef(0.0048);

  // Slower orbit motion
  const orbitalAngleRef = useRef(0);

  // 6 patterns, smoothly blended
  const orbitPatternRef = useRef(0);
  const patternTimerRef = useRef(0);

  const trailRef = useRef<Array<{ x: number; y: number; t: number }>>([]);

  // Slightly shorter, cleaner trail
  const TRAIL_DECAY = 1250;

  const surfaceMarkers = useMemo(
    () => [
      { name: "New York", lat: 40.7128, lon: -74.006 },
      { name: "Newark, NJ", lat: 40.7357, lon: -74.1724 },
      { name: "London", lat: 51.5072, lon: -0.1276 },
      { name: "Tokyo", lat: 35.6764, lon: 139.65 },
      { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    ],
    []
  );

  const markerVecs = useMemo(
    () =>
      surfaceMarkers.map((m) => ({
        ...m,
        vec: latLonToVec3(m.lat, m.lon),
      })),
    [surfaceMarkers]
  );

  const rotateY = (v: Vec3, phi: number): Vec3 => ({
    x: v.x * Math.cos(phi) + v.z * Math.sin(phi),
    y: v.y,
    z: -v.x * Math.sin(phi) + v.z * Math.cos(phi),
  });

  useEffect(() => {
    const dpr = 2;
    const fxCanvas = fxCanvasRef.current;
    const fxCtx = fxCanvas?.getContext("2d");

    const syncSize = () => {
      const width = containerRef.current?.clientWidth || 960;

      // Let it grow a lot bigger
      const size = Math.min(width, 1100);

      sceneRef.current = { size, center: size / 2, dpr };

      if (globeCanvasRef.current) {
        globeCanvasRef.current.width = size * dpr;
        globeCanvasRef.current.height = size * dpr;
        globeCanvasRef.current.style.width = `${size}px`;
        globeCanvasRef.current.style.height = `${size}px`;
      }

      if (fxCanvas) {
        fxCanvas.width = size * dpr;
        fxCanvas.height = size * dpr;
        fxCanvas.style.width = `${size}px`;
        fxCanvas.style.height = `${size}px`;
      }
    };

    syncSize();

    if (containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(syncSize);
      resizeObserverRef.current.observe(containerRef.current);
    }

    if (!globeCanvasRef.current) return;

    const globe = createGlobe(globeCanvasRef.current, {
      devicePixelRatio: dpr,
      width: sceneRef.current.size * dpr,
      height: sceneRef.current.size * dpr,
      phi: phiRef.current,
      theta: 0,
      dark: 1,
      diffuse: 1.12,
      mapSamples: 16000,
      mapBrightness: 5.0,

      // Make the planet grayscale and remove the “purple ring” look from COBE
      baseColor: [0.18, 0.18, 0.18],
      glowColor: [0.10, 0.10, 0.10],

      markerColor: [0.75, 0.35, 1.0],
      markers: surfaceMarkers.map((m) => ({
        location: [m.lat, m.lon] as [number, number],
        size: m.name.includes("Newark") ? 0.075 : 0.062,
      })),

      onRender: (state) => {
        phiRef.current += globeSpeedRef.current;
        state.phi = phiRef.current;
      },
    });

    const drawRim = (ctx: CanvasRenderingContext2D, now: number) => {
      const { size } = sceneRef.current;

      // EXACTLY match the visible globe radius
      const r = size * 0.44;
      const c = size / 2;

      ctx.save();
      ctx.translate(c, c);

      const angleOffset = (now * 0.00055) % (Math.PI * 2);
      ctx.rotate(angleOffset);

      const segments = 72;
      for (let i = 0; i < segments; i++) {
        const a1 = (i / segments) * Math.PI * 2;
        const a2 = ((i + 1) / segments) * Math.PI * 2;
        const prog = i / segments;

        // Red -> purple -> blue -> purple -> red
        let red: number, grn: number, blu: number;
        if (prog < 0.33) {
          const p = prog / 0.33;
          red = Math.round(239 - p * 71);
          grn = Math.round(68 + p * 17);
          blu = Math.round(68 + p * 179);
        } else if (prog < 0.67) {
          const p = (prog - 0.33) / 0.34;
          red = Math.round(168 - p * 109);
          grn = Math.round(85 + p * 45);
          blu = Math.round(247 + p * 9);
        } else {
          const p = (prog - 0.67) / 0.33;
          red = Math.round(59 + p * 180);
          grn = Math.round(130 - p * 62);
          blu = Math.round(246 - p * 178);
        }

        ctx.beginPath();
        ctx.arc(0, 0, r + 1.8, a1, a2);
        ctx.strokeStyle = `rgba(${red},${grn},${blu},0.60)`;
        ctx.lineWidth = 3.6;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${red},${grn},${blu},0.22)`;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawTrail = (ctx: CanvasRenderingContext2D, now: number) => {
      const { size } = sceneRef.current;
      const r = size * 0.44;
      const c = size / 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.clip();

      const pts = trailRef.current;
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const cur = pts[i];
        const prog = i / pts.length;

        const age = Math.max(0, 1 - (now - cur.t) / TRAIL_DECAY);
        if (age <= 0) continue;

        const alpha = Math.pow(age, 1.55) * (0.28 + prog * 0.78);

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(cur.x, cur.y);

        ctx.lineWidth = 2.0 + prog * 4.8;
        ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
        ctx.shadowBlur = 22;
        ctx.shadowColor = `rgba(168,85,247,${alpha * 0.85})`;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawMarkerPulse = (
      ctx: CanvasRenderingContext2D,
      sx: number,
      sy: number,
      intensity: number
    ) => {
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 26);
      g.addColorStop(0, `rgba(168,85,247,${0.55 * intensity})`);
      g.addColorStop(0.55, `rgba(59,130,246,${0.28 * intensity})`);
      g.addColorStop(1, "rgba(0,0,0,0)");

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(sx, sy, 26, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = (now: number) => {
      if (!fxCtx) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const { size, dpr } = sceneRef.current;
      const c = size / 2;
      const r = size * 0.44;

      fxCtx.save();
      fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fxCtx.clearRect(0, 0, size, size);

      // Orbit speed, smoother, slower
      orbitalAngleRef.current += 0.0125;
      patternTimerRef.current += 1;

      // Cycle patterns slower, and crossfade
      const PATTERN_LENGTH = 1500; // about 25s at 60fps
      const TRANSITION = 260;      // about 4.3s blend

      if (patternTimerRef.current > PATTERN_LENGTH) {
        patternTimerRef.current = 0;
        orbitPatternRef.current = (orbitPatternRef.current + 1) % 6;
      }

      const a = orbitalAngleRef.current;

      const currentIndex = orbitPatternRef.current;
      const nextIndex = (currentIndex + 1) % 6;

      const tRaw = clamp01((patternTimerRef.current - (PATTERN_LENGTH - TRANSITION)) / TRANSITION);
      const tBlend = easeInOut(tRaw);

      const pattern = (index: number) => {
        let wx = Math.cos(a);
        let wy = 0;
        let wz = Math.sin(a);

        switch (index) {
          case 0: // Equator clean
            wy = Math.sin(a * 0.35) * 0.10;
            break;
          case 1: // Gentle north sweep
            wy = Math.sin(a) * 0.55;
            break;
          case 2: // Diagonal
            wy = Math.cos(a) * 0.65;
            break;
          case 3: // Wide cinematic arc
            wy = Math.sin(a * 0.6) * 0.82;
            break;
          case 4: // Softer vertical loop
            wy = Math.sin(a * 0.9) * 0.62;
            break;
          case 5: // Swoop with slow roll
            wy = Math.cos(a * 0.5) * 0.78;
            break;
        }

        return { wx, wy, wz };
      };

      const p0 = pattern(currentIndex);
      const p1 = pattern(nextIndex);

      // Blend between patterns so it never “turns rigidly”
      const wx = p0.wx + (p1.wx - p0.wx) * tBlend;
      const wy = p0.wy + (p1.wy - p0.wy) * tBlend;
      const wz = p0.wz + (p1.wz - p0.wz) * tBlend;

      const rotated = rotateY({ x: wx, y: wy, z: wz }, phiRef.current);

      const sx = c + rotated.x * r;

      // IMPORTANT: Fix logo being stuck at bottom by flipping projection sign
      const sy = c + rotated.y * r;

      // Come back faster from behind
      const visible = rotated.z > -0.06;

      if (visible) {
        trailRef.current.push({ x: sx, y: sy, t: now });
      }

      while (trailRef.current.length && now - trailRef.current[0].t > TRAIL_DECAY) {
        trailRef.current.shift();
      }

      drawRim(fxCtx, now);
      drawTrail(fxCtx, now);

      // Brighten dots when logo passes nearby (cinematic “activations”)
      if (visible) {
        for (const m of markerVecs) {
          const mv = rotateY(m.vec, phiRef.current);
          if (mv.z <= 0) continue;

          const mx = c + mv.x * r;
          const my = c + mv.y * r;

          const dist = Math.hypot(mx - sx, my - sy);
          const influence = clamp01(1 - dist / 110);

          if (influence > 0.05) {
            drawMarkerPulse(fxCtx, mx, my, influence);
          }
        }
      }

      // Logo position and aura
      const logoEl = logoRef.current;
      if (logoEl) {
        logoEl.style.opacity = visible ? "1" : "0.12";
        if (visible) {
          const depthScale = 0.78 + rotated.z * 0.16;
          logoEl.style.transform = `translate(${sx - 28}px, ${sy - 28}px) scale(${depthScale})`;
        }
      }

      fxCtx.restore();
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      globe.destroy();
    };
  }, [surfaceMarkers, markerVecs]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className || ""}`}
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <canvas
        ref={globeCanvasRef}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "1 / 1",
          display: "block",
        }}
      />

      <canvas ref={fxCanvasRef} className="absolute inset-0 pointer-events-none" />

      <div
        ref={logoRef}
        className="absolute pointer-events-none"
        style={{ width: 56, height: 56, willChange: "transform, opacity" }}
      >
        <div
          className="absolute rounded-full blur-2xl"
          style={{
            inset: -18,
            background:
              "radial-gradient(circle, rgba(168,85,247,0.80) 0%, rgba(59,130,246,0.55) 55%, transparent 100%)",
          }}
        />
        <div
          className="relative h-full w-full rounded-full border-2 border-purple-200/80"
          style={{
            backgroundImage: "url('/justlogowithoutwordsACAI.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 0 22px rgba(168,85,247,0.9), 0 0 44px rgba(59,130,246,0.6)",
          }}
        />
      </div>
    </div>
  );
};
