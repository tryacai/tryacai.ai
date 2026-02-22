"use client";

import createGlobe from "cobe";
import { useEffect, useMemo, useRef, useState } from "react";

type Vec3 = { x: number; y: number; z: number };
type TrailPoint = { x: number; y: number; t: number };
type ClientPin = {
  id: string;
  businessName: string;
  industry: string;
  lat: number;
  lon: number;
  quote: string;
  metrics: string[];
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const smoothStep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

const normalize = (vector: Vec3): Vec3 => {
  const len = Math.hypot(vector.x, vector.y, vector.z) || 1;
  return { x: vector.x / len, y: vector.y / len, z: vector.z / len };
};

const mixVec = (a: Vec3, b: Vec3, t: number): Vec3 => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  z: a.z + (b.z - a.z) * t,
});

const rotateY = (v: Vec3, phi: number): Vec3 => {
  const cosP = Math.cos(phi);
  const sinP = Math.sin(phi);
  return {
    x: v.x * cosP + v.z * sinP,
    y: v.y,
    z: -v.x * sinP + v.z * cosP,
  };
};

const rotateX = (v: Vec3, theta: number): Vec3 => {
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  return {
    x: v.x,
    y: v.y * cosT - v.z * sinT,
    z: v.y * sinT + v.z * cosT,
  };
};

const latLonToWorld = (lat: number, lon: number): Vec3 => {
  const latR = (lat * Math.PI) / 180;
  const lonR = (lon * Math.PI) / 180;
  const cosLat = Math.cos(latR);
  return {
    x: cosLat * Math.cos(lonR),
    y: Math.sin(latR),
    z: cosLat * Math.sin(lonR),
  };
};

const drawRim = (ctx: CanvasRenderingContext2D, now: number, cx: number, cy: number, r: number) => {
  const segments = 60;
  const rotation = now * 0.00022;
  const pulse = 0.52 + Math.sin(now * 0.002) * 0.16;

  ctx.save();
  ctx.lineWidth = 4.5;
  ctx.lineCap = "round";

  for (let i = 0; i < segments; i += 1) {
    const t0 = i / segments;
    const t1 = (i + 1) / segments;

    const a0 = t0 * Math.PI * 2 + rotation;
    const a1 = t1 * Math.PI * 2 + rotation;

    // red -> purple -> blue -> purple -> red
    const prog = t0;
    let red = 239;
    let green = 68;
    let blue = 68;

    if (prog < 0.33) {
      const p = prog / 0.33;
      red = Math.round(239 - p * 71);
      green = Math.round(68 + p * 17);
      blue = Math.round(68 + p * 179);
    } else if (prog < 0.67) {
      const p = (prog - 0.33) / 0.34;
      red = Math.round(168 - p * 109);
      green = Math.round(85 + p * 45);
      blue = Math.round(247 + p * 9);
    } else {
      const p = (prog - 0.67) / 0.33;
      red = Math.round(59 + p * 180);
      green = Math.round(130 - p * 62);
      blue = Math.round(246 - p * 178);
    }

    ctx.strokeStyle = `rgba(${red},${green},${blue},${pulse})`;
    ctx.beginPath();
    ctx.arc(cx, cy, r, a0, a1);
    ctx.stroke();
  }

  ctx.restore();
};

export const Globe = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeCanvasRef = useRef<HTMLCanvasElement>(null);
  const fxCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number | null>(null);
  const logoParticleRef = useRef({
    persistent: true,
    priority: 999,
    invalidFrameCount: 0,
    lastValid: { x: 0, y: 0 },
  });
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

  const sceneRef = useRef({
    size: 720,
    center: 360,
    radius: 316.8, // size * 0.44
    dpr: 2,
  });

  const phiRef = useRef(0);
  const thetaRef = useRef(0);

  const orbitStartRef = useRef(0);
  const trailRef = useRef<TrailPoint[]>([]);

  const LOGO_SIZE = 52;
  const LOGO_HALF = LOGO_SIZE / 2;

  const TRAIL_DECAY = 1400;
  const TRAIL_MAX_POINTS = 220;

  // Slower, smoother
  const AUTO_PHI_SPEED = 0.0034;

  const clientPins = useMemo<ClientPin[]>(
    () => [
      {
        id: "atl-plumbing",
        businessName: "Peachtree Plumbing Co.",
        industry: "Plumbing",
        lat: 33.749,
        lon: -84.388,
        quote: "ACAI captures every emergency call overnight and books priority dispatch before competitors call back.",
        metrics: ["612 calls handled/month", "148 bookings/month", "31% faster dispatch response"],
      },
      {
        id: "chi-hvac",
        businessName: "Lakefront HVAC",
        industry: "HVAC",
        lat: 41.8781,
        lon: -87.6298,
        quote: "Missed-call recovery alone paid for ACAI in our first two weeks.",
        metrics: ["487 calls handled/month", "122 recovered missed calls", "24% lift in booked estimates"],
      },
      {
        id: "lon-medspa",
        businessName: "Harbor Med Spa",
        industry: "Med Spa",
        lat: 51.5072,
        lon: -0.1276,
        quote: "Our front desk stays focused while ACAI books consultations around the clock.",
        metrics: ["355 calls handled/month", "96 consult bookings/month", "18% reactivation rate uplift"],
      },
      {
        id: "sao-roofing",
        businessName: "Prime Peak Roofing",
        industry: "Roofing",
        lat: -23.5505,
        lon: -46.6333,
        quote: "Storm spikes no longer overwhelm us—ACAI triages every inbound lead instantly.",
        metrics: ["740 calls handled/month", "201 inspections booked", "43% fewer abandoned calls"],
      },
      {
        id: "jhb-pest",
        businessName: "Urban Shield Pest",
        industry: "Pest Control",
        lat: -26.2041,
        lon: 28.0473,
        quote: "We stopped losing high-intent callers after hours and now convert them automatically.",
        metrics: ["298 calls handled/month", "89 service bookings/month", "27% conversion lift"],
      },
      {
        id: "sin-barber",
        businessName: "Crownline Barbers",
        industry: "Barbers",
        lat: 1.3521,
        lon: 103.8198,
        quote: "Walk-ins are great, but ACAI keeps our chairs full with always-on phone booking.",
        metrics: ["264 calls handled/month", "173 appointments booked", "22% fewer no-shows"],
      },
      {
        id: "syd-detailing",
        businessName: "Harbor Auto Detailing",
        industry: "Detailing",
        lat: -33.8688,
        lon: 151.2093,
        quote: "Our estimate follow-up runs itself now, so our team can stay in the bay.",
        metrics: ["221 calls handled/month", "72 estimate follow-ups automated", "19% booking increase"],
      },
    ],
    []
  );

  const selectedPin = useMemo(
    () => clientPins.find((pin) => pin.id === selectedPinId) ?? null,
    [clientPins, selectedPinId]
  );

  const markers = useMemo(
    () => [
      { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
      { name: "Newark, NJ", lat: 40.7357, lon: -74.1724 },
      { name: "London", lat: 51.5072, lon: -0.1276 },
      { name: "Tokyo", lat: 35.6764, lon: 139.65 },
      { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    ],
    []
  );

  const continentDots = useMemo(
    () =>
      [
        [49, -123],
        [39, -98],
        [28, -82],
        [19, -99],
        [-23, -46],
        [-34, -58],
        [52, 10],
        [46, 2],
        [41, 29],
        [31, 35],
        [30, 31],
        [6, 3],
        [-1, 36],
        [-26, 28],
        [55, 37],
        [23, 78],
        [35, 104],
        [1, 104],
        [36, 139],
        [14, 121],
        [-6, 107],
        [-33, 151],
        [64, -20],
        [-41, 174],
      ] as Array<[number, number]>,
    []
  );

  useEffect(() => {
    const globeCanvas = globeCanvasRef.current;
    const fxCanvas = fxCanvasRef.current;
    const container = containerRef.current;
    if (!globeCanvas || !fxCanvas || !container) return;

    const fxCtx = fxCanvas.getContext("2d");
    if (!fxCtx) return;

    const syncSize = () => {
      const w = container.clientWidth || 720;

      // Keep it big but not full screen
      const size = Math.min(w, 820);

      const dpr = 2;
      const center = size / 2;
      const radius = size * 0.44;

      sceneRef.current = { size, center, radius, dpr };

      const px = Math.round(size * dpr);

      globeCanvas.width = px;
      globeCanvas.height = px;
      globeCanvas.style.width = `${size}px`;
      globeCanvas.style.height = `${size}px`;

      fxCanvas.width = px;
      fxCanvas.height = px;
      fxCanvas.style.width = `${size}px`;
      fxCanvas.style.height = `${size}px`;
    };

    syncSize();

    resizeObserverRef.current = new ResizeObserver(syncSize);
    resizeObserverRef.current.observe(container);

    orbitStartRef.current = performance.now();

    const globe = createGlobe(globeCanvas, {
      devicePixelRatio: sceneRef.current.dpr,
      width: sceneRef.current.size * sceneRef.current.dpr,
      height: sceneRef.current.size * sceneRef.current.dpr,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.15,
      mapSamples: 16000,
      mapBrightness: 5.2,
      baseColor: [0.25, 0.25, 0.25],
      markerColor: [0.66, 0.24, 1],
      glowColor: [0.5, 0.35, 1],
      markers: markers.map((m) => ({
        location: [m.lat, m.lon] as [number, number],
        size: m.name.includes("Newark") ? 0.075 : 0.06,
      })),
      onRender: (state) => {
        // continuous, no resets
        phiRef.current += AUTO_PHI_SPEED;

        const now = performance.now();
        const elapsedS = (now - orbitStartRef.current) / 1000;

        const thetaTarget = Math.sin(elapsedS * 0.28) * 0.16;
        thetaRef.current += (thetaTarget - thetaRef.current) * 0.04;

        state.phi = phiRef.current;
        state.theta = thetaRef.current;

        // keep cobe in sync with current scene each frame
        state.width = sceneRef.current.size * sceneRef.current.dpr;
        state.height = sceneRef.current.size * sceneRef.current.dpr;
        state.devicePixelRatio = sceneRef.current.dpr;
      },
    });

    const continentVecs = continentDots.map(([lat, lon]) => latLonToWorld(lat, lon));
    const pinVectors = clientPins.map((pin) => ({
      id: pin.id,
      world: latLonToWorld(pin.lat, pin.lon),
    }));

    // 6 smooth patterns, blended at end of each segment
    const orbitPatterns: Array<(t: number) => Vec3> = [
      (t) => ({ x: Math.cos(t * 0.62), y: 0.38 * Math.sin(t * 0.44), z: Math.sin(t * 0.62) }),
      (t) => ({ x: Math.cos(t * 0.54 + 0.8), y: 0.34 * Math.sin(t * 0.68), z: Math.sin(t * 0.54 + 0.8) }),
      (t) => ({ x: 0.9 * Math.cos(t * 0.49), y: 0.44 * Math.sin(t * 0.42 + 0.6), z: Math.sin(t * 0.49 + 0.35) }),
      (t) => ({ x: Math.cos(t * 0.57 - 0.35), y: 0.3 * Math.sin(t * 0.86), z: Math.sin(t * 0.57 - 0.35) }),
      (t) => ({ x: 0.92 * Math.cos(t * 0.52 + 1.2), y: 0.36 * Math.sin(t * 0.38 + 1.4), z: Math.sin(t * 0.52 + 1.2) }),
      (t) => ({ x: Math.cos(t * 0.47 - 1.1), y: 0.46 * Math.sin(t * 0.34 + 0.3), z: Math.sin(t * 0.47 - 1.1) }),
    ];
    const patternDurations = [18.2, 19.7, 21.1, 20.4, 22.0, 18.8];
    const cycleDuration = patternDurations.reduce((a, b) => a + b, 0);

    const getOrbitWorld = (elapsedS: number): Vec3 => {
      let cursor = ((elapsedS % cycleDuration) + cycleDuration) % cycleDuration;
      let index = 0;

      while (index < patternDurations.length - 1 && cursor > patternDurations[index]) {
        cursor -= patternDurations[index];
        index += 1;
      }

      const segDur = patternDurations[index];
      const segProgress = cursor / segDur;
      const nextIndex = (index + 1) % orbitPatterns.length;

      const current = orbitPatterns[index](elapsedS);
      const next = orbitPatterns[nextIndex](elapsedS);

      const blend = smoothStep(0.82, 1, segProgress);
      const blended = mixVec(current, next, blend);

      const wy = clamp(blended.y, -0.9, 0.9);
      return normalize({ x: blended.x, y: wy, z: blended.z });
    };

    const project = (world: Vec3) => {
      // rotate by current globe phi and theta to match the globe rendering
      const afterY = rotateY(world, phiRef.current);
      const afterX = rotateX(afterY, thetaRef.current);

      const { radius, center } = sceneRef.current;
      const sx = center + afterX.x * radius;
      const sy = center - afterX.y * radius;

      return { sx, sy, rotated: afterX };
    };

    const drawFx = (now: number) => {
      const { size, dpr, radius, center } = sceneRef.current;

      fxCtx.save();
      fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fxCtx.clearRect(0, 0, size, size);

      // clip to globe
      fxCtx.beginPath();
      fxCtx.arc(center, center, radius, 0, Math.PI * 2);
      fxCtx.clip();

      // trail
      const pts = trailRef.current;
      if (pts.length > 1) {
        for (let i = 1; i < pts.length; i += 1) {
          const prev = pts[i - 1];
          const cur = pts[i];
          const prog = i / (pts.length - 1);
          const age = Math.max(0, 1 - (now - cur.t) / TRAIL_DECAY);
          if (age <= 0) continue;

          const alpha = Math.pow(age, 1.35) * (0.38 + prog * 0.85);

          // thicker, more visible
          fxCtx.beginPath();
          fxCtx.moveTo(prev.x, prev.y);
          fxCtx.lineTo(cur.x, cur.y);
          fxCtx.lineCap = "round";
          fxCtx.lineJoin = "round";
          fxCtx.lineWidth = 5 + prog * 10;
          fxCtx.strokeStyle = `rgba(168,85,247,${alpha})`;
          fxCtx.shadowBlur = 44;
          fxCtx.shadowColor = `rgba(59,130,246,${alpha * 0.85})`;
          fxCtx.stroke();
        }
      }

      // dot glow as trail passes
      const recent = pts.slice(-28);
      for (const dot of continentVecs) {
        const projected = project(dot);
        if (projected.rotated.z <= 0) continue;

        let glow = 0;
        for (const tp of recent) {
          const dist = Math.hypot(tp.x - projected.sx, tp.y - projected.sy);
          const age = Math.max(0, 1 - (now - tp.t) / TRAIL_DECAY);
          const influence = Math.exp(-(dist * dist) / (2 * 22 * 22)) * Math.pow(age, 1.2);
          glow = Math.max(glow, influence);
        }

        const g = clamp(glow, 0, 1);
        const baseAlpha = 0.14 + g * 0.28;

        if (g > 0.04) {
          const grad = fxCtx.createRadialGradient(projected.sx, projected.sy, 0, projected.sx, projected.sy, 18 + g * 18);
          grad.addColorStop(0, `rgba(168,85,247,${0.34 * g})`);
          grad.addColorStop(0.55, `rgba(59,130,246,${0.26 * g})`);
          grad.addColorStop(1, "rgba(59,130,246,0)");
          fxCtx.fillStyle = grad;
          fxCtx.beginPath();
          fxCtx.arc(projected.sx, projected.sy, 18 + g * 18, 0, Math.PI * 2);
          fxCtx.fill();
        }

        fxCtx.beginPath();
        fxCtx.arc(projected.sx, projected.sy, 1.9 + g * 2.0, 0, Math.PI * 2);
        fxCtx.fillStyle = `rgba(205,214,230,${baseAlpha})`;
        fxCtx.fill();
      }

      fxCtx.restore();

      // rim on top (not clipped)
      fxCtx.save();
      fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawRim(fxCtx, now, center, center, radius);
      fxCtx.restore();
    };

    const animate = (now: number) => {
      const elapsedS = (now - orbitStartRef.current) / 1000;

      // orbit point in world space
      const world = getOrbitWorld(elapsedS);
      const projected = project(world);

      const logoParticle = logoParticleRef.current;
      const isInvalidLogoPoint =
        !Number.isFinite(projected.sx) ||
        !Number.isFinite(projected.sy) ||
        projected.sx < -sceneRef.current.size ||
        projected.sx > sceneRef.current.size * 2 ||
        projected.sy < -sceneRef.current.size ||
        projected.sy > sceneRef.current.size * 2;

      let logoScreenX = projected.sx;
      let logoScreenY = projected.sy;

      if (isInvalidLogoPoint) {
        logoParticle.invalidFrameCount += 1;
        if (logoParticle.invalidFrameCount > 2) {
          const fallbackProjected = project(latLonToWorld(20, -30));
          logoScreenX = Number.isFinite(fallbackProjected.sx)
            ? fallbackProjected.sx
            : sceneRef.current.center;
          logoScreenY = Number.isFinite(fallbackProjected.sy)
            ? fallbackProjected.sy
            : sceneRef.current.center;
          logoParticle.invalidFrameCount = 0;
        } else {
          logoScreenX = logoParticle.lastValid.x || sceneRef.current.center;
          logoScreenY = logoParticle.lastValid.y || sceneRef.current.center;
        }
      } else {
        logoParticle.lastValid = { x: projected.sx, y: projected.sy };
        logoParticle.invalidFrameCount = 0;
      }

      // trail keeps running and stays cinematic
      trailRef.current.push({ x: projected.sx, y: projected.sy, t: now });
      while (trailRef.current.length && now - trailRef.current[0].t > TRAIL_DECAY) {
        trailRef.current.shift();
      }
      if (trailRef.current.length > TRAIL_MAX_POINTS) {
        trailRef.current.splice(0, trailRef.current.length - TRAIL_MAX_POINTS);
      }

      // logo follows same projected point
      const logoEl = logoRef.current;
      if (logoEl) {
        logoEl.dataset.persistent = String(logoParticle.persistent);
        logoEl.dataset.priority = String(logoParticle.priority);
        logoEl.style.opacity = "1";
        logoEl.style.transform = `translate(${logoScreenX - LOGO_HALF}px, ${logoScreenY - LOGO_HALF}px)`;
      }

      for (const pin of pinVectors) {
        const pinEl = pinRefs.current[pin.id];
        if (!pinEl) continue;
        const pinProjected = project(pin.world);
        const pinVisible = pinProjected.rotated.z > 0.08;

        pinEl.style.opacity = pinVisible ? "1" : "0";
        pinEl.style.pointerEvents = pinVisible ? "auto" : "none";
        pinEl.style.transform = `translate(${pinProjected.sx - 9}px, ${pinProjected.sy - 9}px)`;
      }

      drawFx(now);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      globe.destroy();
    };
  }, [continentDots, markers]);

  const stars = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, index) => ({
        id: `star-${index}`,
        top: (index * 29) % 100,
        left: (index * 53) % 100,
        size: (index % 3) + 1,
        opacity: 0.18 + (index % 5) * 0.04,
      })),
    []
  );

  return (
    <div ref={containerRef} className={`relative aspect-square w-full max-w-[900px] mx-auto ${className || ""}`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white/60"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Globe at the bottom */}
      <canvas ref={globeCanvasRef} className="absolute inset-0" style={{ zIndex: 0 }} />

      {/* FX above globe */}
      <canvas ref={fxCanvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }} />

      {clientPins.map((pin) => {
        const isHovered = hoveredPinId === pin.id;
        return (
          <button
            key={pin.id}
            ref={(el) => {
              pinRefs.current[pin.id] = el;
            }}
            onMouseEnter={() => setHoveredPinId(pin.id)}
            onMouseLeave={() => setHoveredPinId((current) => (current === pin.id ? null : current))}
            onFocus={() => setHoveredPinId(pin.id)}
            onBlur={() => setHoveredPinId((current) => (current === pin.id ? null : current))}
            onClick={() => setSelectedPinId(pin.id)}
            className="absolute h-[18px] w-[18px] rounded-full border border-purple-300/80 bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_18px_rgba(168,85,247,0.8)] transition-transform duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-purple-400"
            style={{ zIndex: 30, opacity: 0, transform: "translate(-9999px,-9999px)" }}
            aria-label={`${pin.businessName} testimonial pin`}
          >
            <span className="absolute inset-0 rounded-full bg-purple-400/50 animate-ping" />
            <span className="absolute inset-[3px] rounded-full bg-white/90" />
            {isHovered && (
              <span className="absolute left-1/2 top-[-10px] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-white/10 bg-neutral-950/95 px-3 py-1 text-[11px] text-neutral-100 shadow-lg">
                {pin.businessName} · {pin.industry}
              </span>
            )}
          </button>
        );
      })}

      {/* Logo above everything */}
      <div
        ref={logoRef}
        className="absolute pointer-events-none"
        style={{
          width: LOGO_SIZE,
          height: LOGO_SIZE,
          willChange: "transform, opacity",
          zIndex: 50,
        }}
      >
        <div
          className="absolute rounded-full blur-md"
          style={{
            inset: -10,
            background:
              "radial-gradient(circle, rgba(168,85,247,0.48) 0%, rgba(59,130,246,0.2) 58%, rgba(239,68,68,0.1) 82%, transparent 100%)",
          }}
        />
        <div
          className="relative h-full w-full rounded-full border-2 border-purple-300/70"
          style={{
            backgroundImage: "url('/justlogowithoutwordsACAI.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 0 20px rgba(168,85,247,0.9), 0 0 40px rgba(59,130,246,0.5), 0 0 60px rgba(239,68,68,0.2)",
          }}
        />
      </div>

      {selectedPin && (
        <div
          className="absolute inset-0 z-[60] flex items-center justify-center bg-black/55 px-4"
          onClick={() => setSelectedPinId(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-950/95 p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-purple-300">{selectedPin.industry}</p>
                <h3 className="text-lg font-semibold text-white">{selectedPin.businessName}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-semibold text-white flex items-center justify-center">
                {selectedPin.businessName
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </div>
            </div>

            <p className="mt-4 text-sm text-neutral-300">“{selectedPin.quote}”</p>

            <div className="mt-4 space-y-2">
              {selectedPin.metrics.map((metric) => (
                <p key={metric} className="text-sm text-neutral-200">
                  • {metric}
                </p>
              ))}
            </div>

            <button
              className="mt-6 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10"
              onClick={() => setSelectedPinId(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
