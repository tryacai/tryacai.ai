"use client";
import createGlobe from "cobe";
import { useEffect, useRef, useMemo } from "react";

type Vec3 = { x: number; y: number; z: number };

export const Globe = ({ className }: { className?: string }) => {
  const containerRef   = useRef<HTMLDivElement>(null);
  const globeCanvasRef = useRef<HTMLCanvasElement>(null);
  const fxCanvasRef    = useRef<HTMLCanvasElement>(null);
  const logoRef        = useRef<HTMLDivElement>(null);

  const rafRef            = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const sceneRef = useRef({ size: 760, center: 380, dpr: 2 });

  const phiRef           = useRef(1.2);
  const globeSpeedRef    = useRef(0.0062);
  const orbitalAngleRef  = useRef(0);
  const orbitPatternRef  = useRef(0);
  const patternTimerRef  = useRef(0);
  const trailRef         = useRef<Array<{ x: number; y: number; t: number }>>([]);

  const TRAIL_DECAY = 1300;

  const surfaceMarkers = useMemo(
    () => [
      { lat: 40.7128,  lon: -74.006 },
      { lat: 51.5072,  lon: -0.1276 },
      { lat: 35.6764,  lon: 139.65 },
      { lat: -33.8688, lon: 151.2093 },
    ],
    []
  );

  const rotateY = (v: Vec3, phi: number): Vec3 => ({
    x:  v.x * Math.cos(phi) + v.z * Math.sin(phi),
    y:  v.y,
    z: -v.x * Math.sin(phi) + v.z * Math.cos(phi),
  });

  useEffect(() => {
    const dpr      = 2;
    const fxCanvas = fxCanvasRef.current;
    const fxCtx    = fxCanvas?.getContext("2d");

    const syncSize = () => {
      const width = containerRef.current?.clientWidth || 760;
      const size  = Math.min(width, 920);
      sceneRef.current = { size, center: size / 2, dpr };

      if (globeCanvasRef.current) {
        globeCanvasRef.current.width        = size * dpr;
        globeCanvasRef.current.height       = size * dpr;
        globeCanvasRef.current.style.width  = `${size}px`;
        globeCanvasRef.current.style.height = `${size}px`;
      }

      if (fxCanvas) {
        fxCanvas.width        = size * dpr;
        fxCanvas.height       = size * dpr;
        fxCanvas.style.width  = `${size}px`;
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
      width:  sceneRef.current.size * dpr,
      height: sceneRef.current.size * dpr,
      phi: phiRef.current,
      theta: 0,
      dark: 1,
      diffuse: 1.15,
      mapSamples: 16000,
      mapBrightness: 5.1,
      baseColor:   [0.20, 0.20, 0.20],
      markerColor: [0.66, 0.24, 1],
      glowColor:   [0.5, 0.35, 1],
      markers: surfaceMarkers.map((m) => ({
        location: [m.lat, m.lon] as [number, number],
        size: 0.065,
      })),
      onRender: (state) => {
        phiRef.current += globeSpeedRef.current;
        state.phi = phiRef.current;
      },
    });

    const drawRim = (ctx: CanvasRenderingContext2D, now: number) => {
      const { size } = sceneRef.current;
      const r = size * 0.44; // perfectly aligned
      const c = size / 2;

      ctx.save();
      ctx.translate(c, c);

      const angleOffset = (now * 0.0006) % (Math.PI * 2);
      ctx.rotate(angleOffset);

      const segments = 60;
      for (let i = 0; i < segments; i++) {
        const a1 = (i / segments) * Math.PI * 2;
        const a2 = ((i + 1) / segments) * Math.PI * 2;
        const prog = i / segments;

        let red: number, grn: number, blu: number;
        if (prog < 0.33) {
          const p = prog / 0.33;
          red = Math.round(239 - p * 71);
          grn = Math.round(68  + p * 17);
          blu = Math.round(68  + p * 179);
        } else if (prog < 0.67) {
          const p = (prog - 0.33) / 0.34;
          red = Math.round(168 - p * 109);
          grn = Math.round(85  + p * 45);
          blu = Math.round(247 + p * 9);
        } else {
          const p = (prog - 0.67) / 0.33;
          red = Math.round(59  + p * 180);
          grn = Math.round(130 - p * 62);
          blu = Math.round(246 - p * 178);
        }

        ctx.beginPath();
        ctx.arc(0, 0, r + 2, a1, a2);
        ctx.strokeStyle = `rgba(${red},${grn},${blu},0.55)`; // softened luxury opacity
        ctx.lineWidth   = 4;
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
        const cur  = pts[i];
        const prog = i / pts.length;
        const age  = Math.max(0, 1 - (now - cur.t) / TRAIL_DECAY);
        if (age <= 0) continue;

        const alpha = Math.pow(age, 1.5) * (0.35 + prog * 0.75);

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(cur.x, cur.y);
        ctx.lineWidth   = 2 + prog * 5;
        ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
        ctx.shadowBlur  = 22;
        ctx.shadowColor = `rgba(168,85,247,${alpha * 0.9})`;
        ctx.lineCap     = "round";
        ctx.stroke();
      }

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

      orbitalAngleRef.current += 0.0195 + Math.sin(now * 0.0006) * 0.0008;

      patternTimerRef.current += 1;
      if (patternTimerRef.current > 1200) {
        patternTimerRef.current = 0;
        orbitPatternRef.current = (orbitPatternRef.current + 1) % 4;
      }

      const a = orbitalAngleRef.current;
      let wx = Math.cos(a);
      let wy = 0;
      let wz = Math.sin(a);

      switch (orbitPatternRef.current) {
        case 0: wy = 0; break;
        case 1: wy = Math.sin(a) * 0.65; break;
        case 2: wy = Math.cos(a) * 0.8; break;
        case 3: wy = Math.sin(a * 0.6) * 0.95; break;
      }

      const rotated = rotateY({ x: wx, y: wy, z: wz }, phiRef.current);

      const sx = c + rotated.x * r;
      const sy = c - rotated.y * r;
      const visible = rotated.z > -0.15;

      if (visible) {
        trailRef.current.push({ x: sx, y: sy, t: now });
      }

      while (trailRef.current.length && now - trailRef.current[0].t > TRAIL_DECAY) {
        trailRef.current.shift();
      }

      drawRim(fxCtx, now);
      drawTrail(fxCtx, now);

      const logoEl = logoRef.current;
      if (logoEl) {
        logoEl.style.opacity = visible ? "1" : "0.15";
        if (visible) {
          const depthScale = 0.72 + rotated.z * 0.20;
          logoEl.style.transform =
            `translate(${sx - 28}px, ${sy - 28}px) scale(${depthScale})`;
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
  }, [surfaceMarkers]);

  return (
    <div ref={containerRef} className={`relative ${className || ""}`}>
      <canvas ref={globeCanvasRef} style={{ width: "100%", height: "100%", aspectRatio: 1 }} />
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
              "radial-gradient(circle, rgba(168,85,247,0.85) 0%, rgba(59,130,246,0.6) 55%, transparent 100%)",
          }}
        />
        <div
          className="relative h-full w-full rounded-full border-2 border-purple-200/80"
          style={{
            backgroundImage: "url('/justlogowithoutwordsACAI.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow:
              "0 0 22px rgba(168,85,247,0.9), 0 0 44px rgba(59,130,246,0.6)",
          }}
        />
      </div>
    </div>
  );
};
