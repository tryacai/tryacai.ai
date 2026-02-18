"use client";

import createGlobe from "cobe";
import { useEffect, useMemo, useRef } from "react";

type Vec3 = { x: number; y: number; z: number };
type TrailPoint = { x: number; y: number; t: number };
type Scene = {
  outerSize: number;
  size: number;
  radius: number;
  center: number;
  offset: number;
  dpr: number;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

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

const drawRim = (
  ctx: CanvasRenderingContext2D,
  now: number,
  centerX: number,
  centerY: number,
  radius: number
) => {
  const segments = 60;
  const rotation = now * 0.0002;
  const pulse = 0.6 + Math.sin(now * 0.002) * 0.2;

  ctx.save();
  ctx.lineWidth = 4.5;
  ctx.lineCap = "round";

  for (let segment = 0; segment < segments; segment++) {
    const t0 = segment / segments;
    const t1 = (segment + 1) / segments;
    const a0 = t0 * Math.PI * 2 + rotation;
    const a1 = t1 * Math.PI * 2 + rotation;
    const wave = 0.5 + 0.5 * Math.sin(now * 0.0008 + segment * 0.26);
    const red = Math.round(226 - wave * 55);
    const green = Math.round(82 + wave * 42);
    const blue = Math.round(248 - wave * 26);

    ctx.strokeStyle = `rgba(${red},${green},${blue},${pulse})`;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, a0, a1);
    ctx.stroke();
  }

  ctx.restore();
};

export const Globe = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const sceneRef = useRef<Scene>({
    outerSize: 720,
    size: 720,
    radius: 316.8,
    center: 360,
    offset: 0,
    dpr: 2,
  });

  const phiRef = useRef(0);
  const thetaRef = useRef(0);
  const orbitStartRef = useRef(0);
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const rafRef = useRef<number | null>(null);

  const TRAIL_DECAY = 1400;
  const AUTO_PHI_SPEED = 0.0036;
  const LOGO_SIZE = 52;
  const LOGO_HALF = LOGO_SIZE / 2;

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
        [49, -123], [39, -98], [28, -82], [19, -99], [-23, -46], [-34, -58],
        [52, 10], [46, 2], [41, 29], [31, 35], [30, 31], [6, 3],
        [-1, 36], [-26, 28], [55, 37], [23, 78], [35, 104], [1, 104],
        [36, 139], [14, 121], [-6, 107], [-33, 151], [64, -20], [-41, 174],
      ] as Array<[number, number]>,
    []
  );

  useEffect(() => {
    const dpr = 2;
    const globeCanvas = canvasRef.current;
    const trailCanvas = trailCanvasRef.current;
    if (!globeCanvas || !trailCanvas) return;

    const trailCtx = trailCanvas.getContext("2d");
    if (!trailCtx) return;

    const toWorld = (lat: number, lon: number): Vec3 => {
      const latR = (lat * Math.PI) / 180;
      const lonR = (lon * Math.PI) / 180;
      const cosLat = Math.cos(latR);
      return {
        x: cosLat * Math.cos(lonR),
        y: Math.sin(latR),
        z: cosLat * Math.sin(lonR),
      };
    };

    const continentVectors = continentDots.map(([lat, lon]) => toWorld(lat, lon));

    const orbitPatterns: Array<(time: number) => Vec3> = [
      (time) => ({
        x: Math.cos(time * 0.62),
        y: 0.52 * Math.sin(time * 0.44),
        z: Math.sin(time * 0.62),
      }),
      (time) => ({
        x: Math.cos(time * 0.54 + 0.8),
        y: 0.46 * Math.sin(time * 0.68),
        z: Math.sin(time * 0.54 + 0.8),
      }),
      (time) => ({
        x: 0.88 * Math.cos(time * 0.49),
        y: 0.58 * Math.sin(time * 0.42 + 0.6),
        z: Math.sin(time * 0.49 + 0.35),
      }),
      (time) => ({
        x: Math.cos(time * 0.57 - 0.35),
        y: 0.42 * Math.sin(time * 0.86),
        z: Math.sin(time * 0.57 - 0.35),
      }),
      (time) => ({
        x: 0.9 * Math.cos(time * 0.52 + 1.2),
        y: 0.5 * Math.sin(time * 0.38 + 1.4),
        z: Math.sin(time * 0.52 + 1.2),
      }),
      (time) => ({
        x: Math.cos(time * 0.47 - 1.1),
        y: 0.6 * Math.sin(time * 0.34 + 0.3),
        z: Math.sin(time * 0.47 - 1.1),
      }),
    ];

    const patternDurations = [18.2, 19.7, 21.1, 20.4, 22.0, 18.8];
    const cycleDuration = patternDurations.reduce((sum, duration) => sum + duration, 0);

    const getOrbitVector = (elapsedS: number): Vec3 => {
      let cursor = ((elapsedS % cycleDuration) + cycleDuration) % cycleDuration;
      let index = 0;

      while (index < patternDurations.length - 1 && cursor > patternDurations[index]) {
        cursor -= patternDurations[index];
        index += 1;
      }

      const segmentDuration = patternDurations[index];
      const segmentProgress = cursor / segmentDuration;
      const nextIndex = (index + 1) % orbitPatterns.length;

      const current = orbitPatterns[index](elapsedS);
      const next = orbitPatterns[nextIndex](elapsedS);
      const blend = smoothStep(0.82, 1, segmentProgress);
      const blended = mixVec(current, next, blend);

      const wx = blended.x;
      let wy = blended.y;
      const wz = blended.z;

      wy = Math.max(-0.9, Math.min(0.9, wy));
      return normalize({ x: wx, y: wy, z: wz });
    };

    const project = (world: Vec3) => {
      const { radius, center, offset } = sceneRef.current;

      const phi = phiRef.current;
      const theta = thetaRef.current;

      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);
      const x1 = world.x * cosP + world.z * sinP;
      const y1 = world.y;
      const z1 = -world.x * sinP + world.z * cosP;

      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      const rx = x1;
      const ry = y1 * cosT - z1 * sinT;
      const rz = y1 * sinT + z1 * cosT;

      return {
        sx: offset + center + rx * radius,
        sy: offset + center - ry * radius,
        rotated: { x: rx, y: ry, z: rz },
      };
    };

    const clampToCircle = (x: number, y: number) => {
      const { radius, center, offset } = sceneRef.current;
      const centerX = offset + center;
      const centerY = offset + center;
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.hypot(dx, dy);
      if (distance <= radius || distance === 0) return { x, y };
      return {
        x: centerX + (dx / distance) * radius,
        y: centerY + (dy / distance) * radius,
      };
    };

    const drawTrailAndFx = (now: number) => {
      const { outerSize, radius, center, offset, dpr: sceneDpr } = sceneRef.current;
      const points = trailPointsRef.current;
      const centerX = offset + center;
      const centerY = offset + center;

      trailCtx.save();
      trailCtx.setTransform(sceneDpr, 0, 0, sceneDpr, 0, 0);
      trailCtx.clearRect(0, 0, outerSize, outerSize);

      trailCtx.beginPath();
      trailCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      trailCtx.clip();

      if (points.length > 1) {
        for (let index = 1; index < points.length; index++) {
          const prev = points[index - 1];
          const cur = points[index];
          const lead = points[Math.max(0, index - 2)];
          const prog = index / (points.length - 1);
          const age = Math.max(0, 1 - (now - cur.t) / TRAIL_DECAY);
          const alpha = Math.pow(age, 1.4) * (0.4 + prog * 0.8);

          const red = Math.round(230 - prog * 96);
          const green = Math.round(64 + prog * 58);
          const blue = Math.round(158 + prog * 94);

          const cpX = prev.x + (cur.x - lead.x) * 0.25;
          const cpY = prev.y + (cur.y - lead.y) * 0.25;

          trailCtx.beginPath();
          trailCtx.moveTo(prev.x, prev.y);
          trailCtx.quadraticCurveTo(cpX, cpY, cur.x, cur.y);
          trailCtx.lineCap = "round";
          trailCtx.lineJoin = "round";
          trailCtx.lineWidth = 4 + prog * 10;
          trailCtx.strokeStyle = `rgba(${red},${green},${blue},${alpha})`;
          trailCtx.shadowBlur = 40;
          trailCtx.shadowColor = `rgba(${red},${green},${blue},${alpha * 0.9})`;
          trailCtx.stroke();
        }
      }

      const recentTrail = points.slice(-26);
      for (const dot of continentVectors) {
        const projectedDot = project(dot);
        if (projectedDot.rotated.z <= 0) continue;

        let glow = 0;
        for (const trailPoint of recentTrail) {
          const distance = Math.hypot(trailPoint.x - projectedDot.sx, trailPoint.y - projectedDot.sy);
          const age = Math.max(0, 1 - (now - trailPoint.t) / TRAIL_DECAY);
          const influence = Math.exp(-(distance * distance) / (2 * 20 * 20)) * Math.pow(age, 1.2);
          glow = Math.max(glow, influence);
        }

        const glowClamped = clamp(glow, 0, 1);
        const baseAlpha = 0.12 + glowClamped * 0.24;

        if (glowClamped > 0.03) {
          const gradient = trailCtx.createRadialGradient(
            projectedDot.sx,
            projectedDot.sy,
            0,
            projectedDot.sx,
            projectedDot.sy,
            12 + glowClamped * 12
          );
          gradient.addColorStop(0, `rgba(168,85,247,${0.26 * glowClamped})`);
          gradient.addColorStop(0.58, `rgba(59,130,246,${0.2 * glowClamped})`);
          gradient.addColorStop(1, "rgba(59,130,246,0)");
          trailCtx.fillStyle = gradient;
          trailCtx.beginPath();
          trailCtx.arc(projectedDot.sx, projectedDot.sy, 12 + glowClamped * 12, 0, Math.PI * 2);
          trailCtx.fill();
        }

        trailCtx.beginPath();
        trailCtx.arc(projectedDot.sx, projectedDot.sy, 1.8 + glowClamped * 1.6, 0, Math.PI * 2);
        trailCtx.fillStyle = `rgba(168,176,196,${baseAlpha})`;
        trailCtx.fill();
      }

      trailCtx.restore();

      trailCtx.save();
      trailCtx.setTransform(sceneDpr, 0, 0, sceneDpr, 0, 0);
      drawRim(trailCtx, now, centerX, centerY, radius);
      trailCtx.restore();
    };

    const syncSize = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const size = Math.min(containerWidth, 820);
      const radius = size * 0.44;
      const center = size / 2;
      const offset = (containerWidth - size) / 2;
      sceneRef.current = {
        outerSize: containerWidth,
        size,
        radius,
        center,
        offset,
        dpr,
      };

      const pixelSize = Math.round(containerWidth * dpr);
      globeCanvas.width = pixelSize;
      globeCanvas.height = pixelSize;
      globeCanvas.style.width = `${containerWidth}px`;
      globeCanvas.style.height = `${containerWidth}px`;

      trailCanvas.width = pixelSize;
      trailCanvas.height = pixelSize;
      trailCanvas.style.width = `${containerWidth}px`;
      trailCanvas.style.height = `${containerWidth}px`;

      if (logoRef.current) {
        const centerX = offset + center;
        const centerY = offset + center;
        logoRef.current.style.transform = `translate(${centerX - LOGO_HALF}px, ${centerY - LOGO_HALF}px)`;
      }
    };

    syncSize();

    resizeObserverRef.current = new ResizeObserver(syncSize);
    if (containerRef.current) {
      resizeObserverRef.current.observe(containerRef.current);
    }

    orbitStartRef.current = performance.now();

    const globe = createGlobe(globeCanvas, {
      devicePixelRatio: dpr,
      width: sceneRef.current.outerSize * dpr,
      height: sceneRef.current.outerSize * dpr,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.15,
      mapSamples: 16000,
      mapBrightness: 5.2,
      baseColor: [0.25, 0.25, 0.25],
      markerColor: [0.66, 0.24, 1],
      glowColor: [0.22, 0.22, 0.22],
      markers: markers.map((marker) => ({
        location: [marker.lat, marker.lon] as [number, number],
        size: marker.name.includes("Newark") ? 0.075 : 0.06,
      })),
      onRender: (state) => {
        const now = performance.now();
        const elapsedS = (now - orbitStartRef.current) / 1000;

        phiRef.current += AUTO_PHI_SPEED;
        const thetaTarget = Math.sin(elapsedS * 0.28) * 0.18;
        thetaRef.current += (thetaTarget - thetaRef.current) * 0.04;

        state.phi = phiRef.current;
        state.theta = thetaRef.current;
        state.width = sceneRef.current.outerSize * sceneRef.current.dpr;
        state.height = sceneRef.current.outerSize * sceneRef.current.dpr;
        state.devicePixelRatio = sceneRef.current.dpr;
      },
    });

    const animate = (now: number) => {
      const logo = logoRef.current;
      const elapsedS = (now - orbitStartRef.current) / 1000;
      const world = getOrbitVector(elapsedS);
      const projected = project(world);
      const clampedProjected = clampToCircle(projected.sx, projected.sy);
      const visible = projected.rotated.z > -0.35;

      if (logo) {
        logo.style.opacity = visible ? "1" : "0";
        logo.style.transform = `translate(${clampedProjected.x - LOGO_HALF}px, ${clampedProjected.y - LOGO_HALF}px)`;
      }

      trailPointsRef.current.push({
        x: clampedProjected.x,
        y: clampedProjected.y,
        t: now,
      });

      while (
        trailPointsRef.current.length &&
        now - trailPointsRef.current[0].t > TRAIL_DECAY
      ) {
        trailPointsRef.current.shift();
      }

      if (trailPointsRef.current.length > 240) {
        trailPointsRef.current.splice(0, trailPointsRef.current.length - 240);
      }

      drawTrailAndFx(now);
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
    <div
      ref={containerRef}
      className={`relative aspect-square w-full max-w-[900px] mx-auto ${className || ""}`}
    >
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

      <canvas ref={trailCanvasRef} className="absolute inset-0 pointer-events-none" />

      <div
        ref={logoRef}
        className="absolute pointer-events-none"
        style={{
          width: LOGO_SIZE,
          height: LOGO_SIZE,
          willChange: "transform, opacity",
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
            boxShadow:
              "0 0 20px rgba(168,85,247,0.9), 0 0 40px rgba(59,130,246,0.5), 0 0 60px rgba(239,68,68,0.2)",
          }}
        />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
};
