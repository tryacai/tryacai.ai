"use client";

import createGlobe from "cobe";
import { useEffect, useMemo, useRef, useState } from "react";

type Vec3 = { x: number; y: number; z: number };

const degToRad = (degrees: number) => (degrees * Math.PI) / 180;

const latLonToVec3 = (lat: number, lon: number): Vec3 => {
  const latRad = degToRad(lat);
  const lonRad = degToRad(lon);
  const cosLat = Math.cos(latRad);
  return {
    x: cosLat * Math.cos(lonRad),
    y: Math.sin(latRad),
    z: cosLat * Math.sin(lonRad),
  };
};

const rotateY = (vec: Vec3, phi: number): Vec3 => {
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  return {
    x: vec.x * cosPhi + vec.z * sinPhi,
    y: vec.y,
    z: -vec.x * sinPhi + vec.z * cosPhi,
  };
};

const normalize = (v: Vec3): Vec3 => {
  const l = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / l, y: v.y / l, z: v.z / l };
};

const dot = (a: Vec3, b: Vec3) => a.x * b.x + a.y * b.y + a.z * b.z;

const slerp = (from: Vec3, to: Vec3, t: number): Vec3 => {
  const a = normalize(from);
  const b = normalize(to);
  const d = Math.max(-1, Math.min(1, dot(a, b)));
  const theta = Math.acos(d);
  if (theta < 1e-5) return a;
  const sinTheta = Math.sin(theta);
  const w1 = Math.sin((1 - t) * theta) / sinTheta;
  const w2 = Math.sin(t * theta) / sinTheta;
  return normalize({
    x: a.x * w1 + b.x * w2,
    y: a.y * w1 + b.y * w2,
    z: a.z * w1 + b.z * w2,
  });
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const Globe = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  const globeRotationRef = useRef(1.3);
  const globeSpeedRef = useRef(0.006);
  const targetPhiRef = useRef(1.3);
  const isPausedRef = useRef(false);

  const rafRef = useRef<number | null>(null);

  const surfacePositions = useMemo(
    () => [
      { lat: 40.7128, lon: -74.006, name: "New York" },
      { lat: -23.5505, lon: -46.6333, name: "São Paulo" },
      { lat: 51.5072, lon: -0.1276, name: "London" },
      { lat: 35.6764, lon: 139.65, name: "Tokyo" },
      { lat: -33.8688, lon: 151.2093, name: "Sydney" },
    ],
    []
  );

  const stateRef = useRef({
    segmentIndex: 0,
    phase: "flight" as "flight" | "landing" | "hold",
    phaseStart: 0,
    duration: 9000,
    altitude: 0.25,
    from: surfacePositions[0],
    to: surfacePositions[1],
    logoPos: { x: 300, y: 300 },
    visible: true,
    scale: 1,
    trail: [] as { x: number; y: number; t: number }[],
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    const dpr = 2;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: 600 * dpr,
      height: 600 * dpr,
      phi: globeRotationRef.current,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.28, 0.28, 0.28],
      markerColor: [0.66, 0.24, 1],
      glowColor: [0.47, 0.33, 1],
      markers: surfacePositions.map((p) => ({
        location: [p.lat, p.lon] as [number, number],
        size: 0.07,
      })),
      onRender: (renderState) => {
        const base = 0.006;
        const hover = base * 0.7;
        const targetSpeed = isPausedRef.current ? 0 : isHovered ? hover : base;
        globeSpeedRef.current += (targetSpeed - globeSpeedRef.current) * 0.08;

        const delta = targetPhiRef.current - globeRotationRef.current;
        globeRotationRef.current += globeSpeedRef.current + delta * 0.015;

        renderState.phi = globeRotationRef.current;
      },
    });

    const trailCtx = trailCanvasRef.current?.getContext("2d");

    const buildNext = () => {
      const nextIndex =
        (stateRef.current.segmentIndex + 1) % surfacePositions.length;
      const from = surfacePositions[stateRef.current.segmentIndex];
      const to = surfacePositions[nextIndex];

      stateRef.current.segmentIndex = nextIndex;
      stateRef.current.from = from;
      stateRef.current.to = to;
      stateRef.current.duration = 8000 + Math.random() * 2000;
      stateRef.current.altitude = 0.22 + Math.random() * 0.08;
      stateRef.current.phase = "flight";
      stateRef.current.phaseStart = performance.now();
      stateRef.current.trail = [];
      targetPhiRef.current = 1.3 - degToRad(to.lon);
    };

    stateRef.current.phaseStart = performance.now();
    targetPhiRef.current = 1.3 - degToRad(surfacePositions[1].lon);

    const animate = (now: number) => {
      const s = stateRef.current;
      const progress = Math.min(
        (now - s.phaseStart) / s.duration,
        1
      );

      const fromVec = latLonToVec3(s.from.lat, s.from.lon);
      const toVec = latLonToVec3(s.to.lat, s.to.lon);

      const pathVec = slerp(fromVec, toVec, progress);
      const altitude =
        1 + s.altitude * Math.sin(Math.PI * progress);
      const world = {
        x: pathVec.x * altitude,
        y: pathVec.y * altitude,
        z: pathVec.z * altitude,
      };

      const rotated = rotateY(world, globeRotationRef.current);

      const size = 600;
      const radius = size * 0.44;
      const cx = size / 2;
      const x = cx + rotated.x * radius;
      const y = cx - rotated.y * radius;

      s.visible = rotated.z > 0;

      if (s.visible) {
        s.logoPos = { x, y };
        s.trail.push({ x, y, t: now });
      }

      while (s.trail.length && now - s.trail[0].t > 3000) {
        s.trail.shift();
      }

      if (progress >= 1) {
        buildNext();
      }

      if (logoRef.current) {
        logoRef.current.style.opacity = s.visible ? "1" : "0";
        logoRef.current.style.transform = `translate(${s.logoPos.x - 20}px, ${s.logoPos.y - 20}px) scale(0.8)`;
      }

      if (trailCtx) {
        trailCtx.clearRect(0, 0, size, size);
        trailCtx.beginPath();
        trailCtx.arc(cx, cx, radius, 0, Math.PI * 2);
        trailCtx.clip();

        for (let i = 1; i < s.trail.length; i++) {
          const p = s.trail[i - 1];
          const c = s.trail[i];
          const t = i / s.trail.length;
          trailCtx.beginPath();
          trailCtx.moveTo(p.x, p.y);
          trailCtx.lineTo(c.x, c.y);
          trailCtx.lineWidth = 2 + t * 5;
          trailCtx.strokeStyle = `rgba(255,100,200,${0.4 * t})`;
          trailCtx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      globe.destroy();
    };
  }, [surfacePositions, isHovered]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={trailCanvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div
        ref={logoRef}
        className="absolute h-10 w-10 pointer-events-none"
        style={{
          backgroundImage: "url('/justlogowithoutwordsACAI.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          width: 600,
          height: 600,
          maxWidth: "100%",
          aspectRatio: 1,
        }}
      />
    </div>
  );
};
