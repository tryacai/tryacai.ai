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

const project = (vec: Vec3, size: number) => {
  const center = size / 2;
  const radius = size * 0.44;
  const rawX = center + vec.x * radius;
  const rawY = center + vec.y * radius;
  const dx = rawX - center;
  const dy = rawY - center;
  const dist = Math.hypot(dx, dy);
  if (dist <= radius * 0.998) {
    return { x: rawX, y: rawY, radius, center };
  }
  const clamp = (radius * 0.998) / dist;
  return {
    x: center + dx * clamp,
    y: center + dy * clamp,
    radius,
    center,
  };
};

const dot = (a: Vec3, b: Vec3) => a.x * b.x + a.y * b.y + a.z * b.z;

const cross = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});

const length = (vec: Vec3) => Math.hypot(vec.x, vec.y, vec.z);

const normalize = (vec: Vec3): Vec3 => {
  const len = length(vec) || 1;
  return { x: vec.x / len, y: vec.y / len, z: vec.z / len };
};

const scale = (vec: Vec3, scalar: number): Vec3 => ({
  x: vec.x * scalar,
  y: vec.y * scalar,
  z: vec.z * scalar,
});

const add = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.x + b.x,
  y: a.y + b.y,
  z: a.z + b.z,
});

const slerp = (from: Vec3, to: Vec3, t: number): Vec3 => {
  const start = normalize(from);
  const end = normalize(to);
  const d = Math.max(-1, Math.min(1, dot(start, end)));
  const theta = Math.acos(d);

  if (theta < 1e-5) return start;

  const sinTheta = Math.sin(theta);
  const w1 = Math.sin((1 - t) * theta) / sinTheta;
  const w2 = Math.sin(t * theta) / sinTheta;
  return normalize({
    x: start.x * w1 + end.x * w2,
    y: start.y * w1 + end.y * w2,
    z: start.z * w1 + end.z * w2,
  });
};

const rotateAroundAxis = (vec: Vec3, axis: Vec3, angle: number): Vec3 => {
  const nAxis = normalize(axis);
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const crossTerm = cross(nAxis, vec);
  const dotTerm = dot(nAxis, vec);

  return normalize({
    x: vec.x * cosA + crossTerm.x * sinA + nAxis.x * dotTerm * (1 - cosA),
    y: vec.y * cosA + crossTerm.y * sinA + nAxis.y * dotTerm * (1 - cosA),
    z: vec.z * cosA + crossTerm.z * sinA + nAxis.z * dotTerm * (1 - cosA),
  });
};

const cubicBezierValue = (t: number, p1: number, p2: number) => {
  const mt = 1 - t;
  return 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t;
};

const cubicBezierDerivative = (t: number, p1: number, p2: number) => {
  const mt = 1 - t;
  return 3 * mt * mt * p1 + 6 * mt * t * (p2 - p1) + 3 * t * t * (1 - p2);
};

const cubicBezierEasing = (x: number, x1: number, y1: number, x2: number, y2: number) => {
  let t = x;
  for (let index = 0; index < 5; index += 1) {
    const xEstimate = cubicBezierValue(t, x1, x2);
    const derivative = cubicBezierDerivative(t, x1, x2);
    if (Math.abs(derivative) < 1e-5) break;
    t -= (xEstimate - x) / derivative;
    t = Math.min(1, Math.max(0, t));
  }
  return cubicBezierValue(t, y1, y2);
};

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

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
  const globeSpeedRef = useRef(0.0065);
  const targetPhiRef = useRef(0);
  const isPausedRef = useRef(false);

  const rafRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const sceneRef = useRef({
    size: 600,
    center: 300,
    dpr: 2,
  });

  const flightStateRef = useRef<{
    segmentIndex: number;
    phase: "flight" | "landing" | "hold" | "rebound";
    phaseStart: number;
    flightDuration: number;
    altitudeMax: number;
    fromLocation: { lat: number; lon: number; name: string };
    toLocation: { lat: number; lon: number; name: string };
    logoPos: { x: number; y: number };
    logoVisible: boolean;
    depthScale: number;
    points: Array<{ x: number; y: number; t: number }>;
    targetPhi: number;
  }>({
    segmentIndex: 0,
    phase: "flight",
    phaseStart: 0,
    flightDuration: 9000,
    altitudeMax: 0.24,
    fromLocation: { lat: 40.7128, lon: -74.0060, name: "New York" },
    toLocation: { lat: 51.5072, lon: -0.1276, name: "London" },
    logoPos: { x: 300, y: 300 },
    logoVisible: true,
    depthScale: 1,
    points: [],
    targetPhi: 0,
  });

  const surfacePositions = useMemo(
    () => [
      { lat: 40.7128, lon: -74.0060, name: "New York" },
      { lat: 51.5072, lon: -0.1276, name: "London" },
      { lat: -23.5505, lon: -46.6333, name: "São Paulo" },
      { lat: 35.6764, lon: 139.65, name: "Tokyo" },
      { lat: -33.8688, lon: 151.2093, name: "Sydney" },
    ],
    []
  );

  useEffect(() => {
    hoverRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const dpr = 2;
    const logoElement = logoRef.current;
    const pulseElement = pulseRef.current;
    const trailCanvas = trailCanvasRef.current;
    const trailCtx = trailCanvas?.getContext("2d");

    const syncCanvasSize = () => {
      const container = containerRef.current;
      const size = container?.clientWidth || 600;
      sceneRef.current = {
        size,
        center: size / 2,
        dpr,
      };

      if (trailCanvas) {
        trailCanvas.width = Math.round(size * dpr);
        trailCanvas.height = Math.round(size * dpr);
        trailCanvas.style.width = `${size}px`;
        trailCanvas.style.height = `${size}px`;
      }
    };

    syncCanvasSize();

    if (containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(syncCanvasSize);
      resizeObserverRef.current.observe(containerRef.current);
    }

    if (!canvasRef.current) return;

    const buildSegment = (segmentIndex: number) => {
      const fromLocation = surfacePositions[segmentIndex];
      const toLocation = surfacePositions[(segmentIndex + 1) % surfacePositions.length];

      const altitudeVariation = 0.9 + Math.random() * 0.2;

      const targetPhi = -degToRad(toLocation.lon);

      return {
        fromLocation,
        toLocation,
        targetPhi,
        flightDuration: 8000 + Math.random() * 2000,
        altitudeMax: 0.22 * altitudeVariation,
      };
    };

    const segment0 = buildSegment(0);
    const state = flightStateRef.current;
    state.segmentIndex = 0;
    state.phase = "flight";
    state.phaseStart = performance.now();
    state.fromLocation = segment0.fromLocation;
    state.toLocation = segment0.toLocation;
    state.flightDuration = segment0.flightDuration;
    state.altitudeMax = segment0.altitudeMax;
    state.targetPhi = segment0.targetPhi;
    targetPhiRef.current = segment0.targetPhi;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: 600 * dpr,
      height: 600 * dpr,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.28, 0.28, 0.28],
      markerColor: [0.66, 0.24, 1],
      glowColor: [0.47, 0.33, 1],
      markers: surfacePositions.map((position, index) => ({
        location: [position.lat, position.lon],
        size: index === 0 || index === 3 ? 0.07 : 0.06,
      })),
      onRender: (renderState) => {
        const baseSpeed = 0.0065;
        const hoverSpeed = baseSpeed * 0.67;
        const targetSpeed = isPausedRef.current ? 0 : hoverRef.current ? hoverSpeed : baseSpeed;
        globeSpeedRef.current += (targetSpeed - globeSpeedRef.current) * 0.08;

        const phiDelta = targetPhiRef.current - globeRotationRef.current;
        globeRotationRef.current += globeSpeedRef.current + phiDelta * (isPausedRef.current ? 0.06 : 0.015);
        renderState.phi = globeRotationRef.current;
      },
    });

    const drawTrail = (now: number) => {
      if (!trailCtx) return;
      const { size, dpr: localDpr } = sceneRef.current;

      trailCtx.save();
      trailCtx.setTransform(localDpr, 0, 0, localDpr, 0, 0);
      trailCtx.clearRect(0, 0, size, size);

      const points = flightStateRef.current.points;
      if (points.length > 1) {
        for (let index = 1; index < points.length; index += 1) {
          const previous = points[index - 1];
          const current = points[index];
          const progress = index / (points.length - 1);

          const age = Math.max(0, Math.min(1, 1 - (now - current.t) / 3200));
          const alpha = age * (0.25 + progress * 0.75) * 0.68;

          let red = 255;
          let green = 70;
          let blue = 75;

          if (progress < 0.5) {
            const p = progress / 0.5;
            red = Math.round(lerp(255, 160, p));
            green = Math.round(lerp(70, 68, p));
            blue = Math.round(lerp(75, 255, p));
          } else {
            const p = (progress - 0.5) / 0.5;
            red = Math.round(lerp(160, 60, p));
            green = Math.round(lerp(68, 125, p));
            blue = Math.round(lerp(255, 255, p));
          }

          trailCtx.beginPath();
          trailCtx.moveTo(previous.x, previous.y);
          trailCtx.lineTo(current.x, current.y);
          trailCtx.lineCap = "round";
          trailCtx.lineJoin = "round";
          trailCtx.lineWidth = 2.4 + progress * 5.8;
          trailCtx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
          trailCtx.shadowBlur = 14;
          trailCtx.shadowColor = `rgba(${red}, ${green}, ${blue}, ${alpha * 0.8})`;
          trailCtx.stroke();
        }
      }

      trailCtx.restore();
    };

    const animate = (now: number) => {
      const current = flightStateRef.current;
      const takeoffEase = (t: number) => cubicBezierEasing(t, 0.22, 0.78, 0.28, 1);
      const cruiseEase = (t: number) => cubicBezierEasing(t, 0.27, 0.15, 0.2, 1);
      const landingEase = (t: number) => cubicBezierEasing(t, 0.4, 0, 0.2, 1);

      let logoOffsetY = 0;

      if (current.phase === "flight") {
        isPausedRef.current = false;
        targetPhiRef.current = current.targetPhi;

        const progress = Math.min((now - current.phaseStart) / current.flightDuration, 1);

        const easedProgress =
          progress < 0.22
            ? takeoffEase(progress / 0.22) * 0.22
            : progress < 0.78
            ? 0.22 + cruiseEase((progress - 0.22) / 0.56) * 0.56
            : 0.78 + landingEase((progress - 0.78) / 0.22) * 0.22;

        const fromVec = latLonToVec3(current.fromLocation.lat, current.fromLocation.lon);
        const toVec = latLonToVec3(current.toLocation.lat, current.toLocation.lon);
        const slerpedVec = slerp(fromVec, toVec, easedProgress);

        const altitudeScale = Math.sin(Math.PI * easedProgress) * current.altitudeMax;
        const posVec = scale(normalize(slerpedVec), 1 + altitudeScale);

        const rotatedVec = rotateY(posVec, globeRotationRef.current);
        const sceneSize = sceneRef.current.size;
        const radius = sceneSize * 0.44;
        const screenX = sceneSize / 2 + rotatedVec.x * radius;
        const screenY = sceneSize / 2 - rotatedVec.y * radius;

        current.logoVisible = rotatedVec.z > 0;
        if (current.logoVisible) {
          current.logoPos = { x: screenX, y: screenY };
          current.points.push({ x: screenX, y: screenY, t: now });
        }
        while (current.points.length && now - current.points[0].t > 3200) {
          current.points.shift();
        }

        if (easedProgress < 0.3) {
          current.depthScale = lerp(1, 1.25, takeoffEase(easedProgress / 0.3));
        } else if (easedProgress < 0.75) {
          current.depthScale = 1.25;
        } else {
          current.depthScale = lerp(1.25, 1, landingEase((easedProgress - 0.75) / 0.25));
        }

        if (progress >= 1) {
          current.phase = "landing";
          current.phaseStart = now;
          isPausedRef.current = true;
          current.depthScale = 1;
        }
      } else if (current.phase === "landing") {
        isPausedRef.current = true;
        targetPhiRef.current = current.targetPhi;

        const landingProgress = Math.min((now - current.phaseStart) / 1200, 1);
        const damp = 1 - landingProgress;
        logoOffsetY = Math.sin(landingProgress * Math.PI * 6) * 1.6 * damp;

        if (landingProgress < 0.2) {
          current.depthScale = lerp(1, 0.97, landingEase(landingProgress / 0.2));
        } else {
          current.depthScale = lerp(0.97, 1, landingEase((landingProgress - 0.2) / 0.8));
        }

        while (current.points.length && now - current.points[0].t > 3200) {
          current.points.shift();
        }

        if (landingProgress >= 1) {
          current.phase = "hold";
          current.phaseStart = now;
        }
      } else if (current.phase === "hold") {
        isPausedRef.current = true;
        targetPhiRef.current = current.targetPhi;
        current.depthScale = 1;

        while (current.points.length && now - current.points[0].t > 3200) {
          current.points.shift();
        }

        if (now - current.phaseStart >= 1000) {
          current.phase = "rebound";
          current.phaseStart = now;
        }
      } else {
        isPausedRef.current = true;
        targetPhiRef.current = current.targetPhi;

        const reboundProgress = Math.min((now - current.phaseStart) / 700, 1);
        const reboundEase = cubicBezierEasing(reboundProgress, 0.2, 0.85, 0.2, 1);
        logoOffsetY = -Math.sin(reboundEase * Math.PI) * 6;
        current.depthScale = 1;

        if (reboundProgress >= 1) {
          const nextIndex = (current.segmentIndex + 1) % surfacePositions.length;
          const nextSegment = buildSegment(nextIndex);

          current.segmentIndex = nextIndex;
          current.phase = "flight";
          current.phaseStart = now;
          current.flightDuration = nextSegment.flightDuration;
          current.altitudeMax = nextSegment.altitudeMax;
          current.fromLocation = nextSegment.fromLocation;
          current.toLocation = nextSegment.toLocation;
          current.targetPhi = nextSegment.targetPhi;
          current.points = [];
          isPausedRef.current = false;
        }
      }

      if (logoElement) {
        if (!current.logoVisible) {
          logoElement.style.opacity = "0";
        } else {
          logoElement.style.opacity = "1";
          logoElement.style.transform = `translate(${current.logoPos.x - 20}px, ${current.logoPos.y - 20 + logoOffsetY}px) scale(${0.6 * current.depthScale})`;
        }
      }

      if (pulseElement) {
        if (current.phase === "landing") {
          const pulseProgress = Math.min((now - current.phaseStart) / 1200, 1);
          const eased = cubicBezierEasing(pulseProgress, 0.2, 0.7, 0.2, 1);
          const pulseScale = 0.4 + eased * 2.8;
          const opacity = 0.42 * (1 - pulseProgress);
          pulseElement.style.opacity = `${opacity}`;
          pulseElement.style.transform = `translate(${current.logoPos.x - 16}px, ${current.logoPos.y - 16}px) scale(${pulseScale})`;
        } else {
          pulseElement.style.opacity = "0";
        }
      }

      drawTrail(now);
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
  }, [surfacePositions]);

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
      <div className="absolute inset-10 rounded-full bg-gradient-to-r from-red-500/16 via-purple-500/18 to-blue-500/16 blur-3xl" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        {stars.map((star) => (
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
        ))}
      </div>

      <canvas ref={trailCanvasRef} className="absolute inset-0 pointer-events-none" />

      <div
        ref={pulseRef}
        className="absolute h-8 w-8 rounded-full border border-purple-300/45 shadow-[0_0_20px_rgba(168,85,247,0.28)] bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 pointer-events-none"
        style={{ opacity: 0, transformOrigin: "center" }}
      />

      <div ref={logoRef} className="absolute h-10 w-10 pointer-events-none">
        <div className="absolute inset-[-7px] rounded-full bg-gradient-to-r from-red-500/12 via-purple-500/14 to-blue-500/12 blur-md" />
        <div
          className="relative h-full w-full rounded-full border border-blue-300/55 shadow-[0_0_10px_rgba(59,130,246,0.24),0_0_8px_rgba(168,85,247,0.18)]"
          style={{
            backgroundImage: "url('/justlogowithoutwordsACAI.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
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
