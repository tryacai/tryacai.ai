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
    arcHeight: number;
    lateralDrift: number;
    from: { x: number; y: number };
    to: { x: number; y: number };
    waypoint: { x: number; y: number };
    cp1: { x: number; y: number };
    cp2: { x: number; y: number };
    cp3: { x: number; y: number };
    cp4: { x: number; y: number };
    points: Array<{ x: number; y: number; t: number }>;
    logoPos: { x: number; y: number };
    targetPhi: number;
  }>({
    segmentIndex: 0,
    phase: "flight",
    phaseStart: 0,
    flightDuration: 9000,
    arcHeight: 0.2,
    lateralDrift: 0,
    from: { x: 0.33, y: 0.39 },
    to: { x: 0.4, y: 0.62 },
    waypoint: { x: 0.36, y: 0.47 },
    cp1: { x: 0.33, y: 0.31 },
    cp2: { x: 0.35, y: 0.41 },
    cp3: { x: 0.38, y: 0.55 },
    cp4: { x: 0.4, y: 0.7 },
    points: [],
    logoPos: { x: 198, y: 234 },
    targetPhi: 0.25,
  });

  const surfacePositions = useMemo(
    () => [
      { x: 0.33, y: 0.39, phi: 0.25 },
      { x: 0.4, y: 0.62, phi: 0.55 },
      { x: 0.52, y: 0.34, phi: 1.35 },
      { x: 0.66, y: 0.42, phi: 2.2 },
      { x: 0.54, y: 0.53, phi: 1.75 },
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

        const phiDelta = targetPhiRef.current - globeRotationRef.current;
        globeRotationRef.current += globeSpeedRef.current + phiDelta * (isPausedRef.current ? 0.06 : 0.02);
        state.phi = globeRotationRef.current;
      },
    });

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

    const cubicBezierPoint = (
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number },
      t: number
    ) => {
      const mt = 1 - t;
      return {
        x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
        y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
      };
    };

    const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

    const buildFlightControls = (segmentIndex: number) => {
      const fromSite = surfacePositions[segmentIndex];
      const toSite = surfacePositions[(segmentIndex + 1) % surfacePositions.length];
      const arcHeight = 0.22 * (0.9 + Math.random() * 0.2);
      const lateralDrift = (Math.random() * 2 - 1) * 0.03;
      const flightDuration = 8000 + Math.random() * 2000;

      const midX = (fromSite.x + toSite.x) / 2;
      const midY = (fromSite.y + toSite.y) / 2;
      const radialX = 0.5 - midX;
      const radialY = 0.5 - midY;
      const radialLen = Math.hypot(radialX, radialY) || 1;
      const outwardX = radialX / radialLen;
      const outwardY = radialY / radialLen;

      const perpX = -outwardY;
      const perpY = outwardX;

      const waypoint = {
        x: midX + outwardX * arcHeight + perpX * lateralDrift,
        y: midY + outwardY * arcHeight + perpY * lateralDrift,
      };

      const cp1 = {
        x: fromSite.x + outwardX * (arcHeight * 0.55),
        y: fromSite.y + outwardY * (arcHeight * 0.55),
      };
      const cp2 = {
        x: waypoint.x - outwardX * (arcHeight * 0.25),
        y: waypoint.y - outwardY * (arcHeight * 0.25),
      };
      const cp3 = {
        x: waypoint.x + outwardX * (arcHeight * 0.18),
        y: waypoint.y + outwardY * (arcHeight * 0.18),
      };
      const cp4 = {
        x: toSite.x + outwardX * (arcHeight * 0.5),
        y: toSite.y + outwardY * (arcHeight * 0.5),
      };

      return {
        fromSite,
        toSite,
        arcHeight,
        lateralDrift,
        flightDuration,
        waypoint,
        cp1,
        cp2,
        cp3,
        cp4,
      };
    };

    const startTime = performance.now();
    flightStateRef.current.phaseStart = startTime;
    flightStateRef.current.logoPos = {
      x: surfacePositions[0].x * sceneRef.current.size,
      y: surfacePositions[0].y * sceneRef.current.size,
    };

    const initialControls = buildFlightControls(0);
    flightStateRef.current.from = initialControls.fromSite;
    flightStateRef.current.to = initialControls.toSite;
    flightStateRef.current.waypoint = initialControls.waypoint;
    flightStateRef.current.arcHeight = initialControls.arcHeight;
    flightStateRef.current.lateralDrift = initialControls.lateralDrift;
    flightStateRef.current.flightDuration = initialControls.flightDuration;
    flightStateRef.current.cp1 = initialControls.cp1;
    flightStateRef.current.cp2 = initialControls.cp2;
    flightStateRef.current.cp3 = initialControls.cp3;
    flightStateRef.current.cp4 = initialControls.cp4;
    flightStateRef.current.targetPhi = initialControls.toSite.phi;
    targetPhiRef.current = initialControls.toSite.phi;

    const drawTrail = () => {
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

          const age = Math.max(0, Math.min(1, 1 - (performance.now() - current.t) / 1200));
          const brightness = 0.25 + progress * 0.75;
          const alpha = age * brightness * 0.55;

          let red = 255;
          let green = 70;
          let blue = 80;

          if (progress < 0.5) {
            const p = progress / 0.5;
            red = Math.round(lerp(255, 165, p));
            green = Math.round(lerp(70, 65, p));
            blue = Math.round(lerp(80, 255, p));
          } else {
            const p = (progress - 0.5) / 0.5;
            red = Math.round(lerp(165, 70, p));
            green = Math.round(lerp(65, 115, p));
            blue = Math.round(lerp(255, 255, p));
          }

          trailCtx.beginPath();
          trailCtx.moveTo(previous.x, previous.y);
          trailCtx.lineTo(current.x, current.y);
          trailCtx.lineWidth = 1.8 + progress * 4.2;
          trailCtx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
          trailCtx.shadowBlur = 10;
          trailCtx.shadowColor = `rgba(${red}, ${green}, ${blue}, ${alpha * 0.75})`;
          trailCtx.stroke();
        }
      }

      trailCtx.restore();
    };

    const animate = (now: number) => {
      const state = flightStateRef.current;
      const nextIndex = (state.segmentIndex + 1) % surfacePositions.length;
      const currentTo = surfacePositions[nextIndex];
      const sceneSize = sceneRef.current.size;

      const toPx = (point: { x: number; y: number }) => ({
        x: point.x * sceneSize,
        y: point.y * sceneSize,
      });

      const takeoffEase = (t: number) => cubicBezierEasing(t, 0.2, 0.75, 0.25, 1);
      const cruiseEase = (t: number) => cubicBezierEasing(t, 0.25, 0.15, 0.2, 1);
      const landingEase = (t: number) => cubicBezierEasing(t, 0.4, 0, 0.2, 1);

      let depthScale = 1;
      let logoOffsetY = 0;

      if (state.phase === "flight") {
        isPausedRef.current = false;
        targetPhiRef.current = state.targetPhi;
        const progress = Math.min((now - state.phaseStart) / state.flightDuration, 1);

        const easedPathProgress =
          progress < 0.25
            ? takeoffEase(progress / 0.25) * 0.25
            : progress < 0.75
            ? 0.25 + cruiseEase((progress - 0.25) / 0.5) * 0.5
            : 0.75 + landingEase((progress - 0.75) / 0.25) * 0.25;

        const pointNorm =
          easedPathProgress < 0.5
            ? cubicBezierPoint(
                state.from,
                state.cp1,
                state.cp2,
                state.waypoint,
                easedPathProgress * 2
              )
            : cubicBezierPoint(
                state.waypoint,
                state.cp3,
                state.cp4,
                state.to,
                (easedPathProgress - 0.5) * 2
              );

        const point = toPx(pointNorm);
        state.logoPos = point;

        state.points.push({ ...point, t: now });
        while (state.points.length && now - state.points[0].t > 1200) {
          state.points.shift();
        }

        if (progress < 0.25) {
          depthScale = lerp(1, 1.15, takeoffEase(progress / 0.25));
        } else if (progress < 0.75) {
          depthScale = 1.15;
        } else {
          depthScale = lerp(1.15, 1, landingEase((progress - 0.75) / 0.25));
        }

        if (progress >= 1) {
          state.phase = "landing";
          state.phaseStart = now;
          isPausedRef.current = true;
        }
      } else if (state.phase === "landing") {
        isPausedRef.current = true;
        targetPhiRef.current = state.targetPhi;

        const landingProgress = Math.min((now - state.phaseStart) / 1200, 1);
        const damp = 1 - landingProgress;
        const microShake = Math.sin(landingProgress * Math.PI * 5.5) * 1.8 * damp;
        logoOffsetY = microShake;

        if (landingProgress < 0.2) {
          depthScale = lerp(1, 0.97, landingEase(landingProgress / 0.2));
        } else {
          depthScale = lerp(0.97, 1, landingEase((landingProgress - 0.2) / 0.8));
        }

        while (state.points.length && now - state.points[0].t > 1200) {
          state.points.shift();
        }

        if (landingProgress >= 1) {
          state.phase = "hold";
          state.phaseStart = now;
        }
      } else if (state.phase === "hold") {
        isPausedRef.current = true;
        targetPhiRef.current = state.targetPhi;
        depthScale = 1;

        while (state.points.length && now - state.points[0].t > 1200) {
          state.points.shift();
        }

        if (now - state.phaseStart >= 1000) {
          state.phase = "rebound";
          state.phaseStart = now;
        }
      } else {
        isPausedRef.current = true;
        targetPhiRef.current = state.targetPhi;
        const reboundProgress = Math.min((now - state.phaseStart) / 700, 1);
        const reboundEase = cubicBezierEasing(reboundProgress, 0.2, 0.85, 0.2, 1);
        logoOffsetY = -Math.sin(reboundEase * Math.PI) * 6;
        depthScale = 1;

        if (reboundProgress >= 1) {
          state.segmentIndex = nextIndex;

          const controls = buildFlightControls(nextIndex);
          state.from = controls.fromSite;
          state.to = controls.toSite;
          state.waypoint = controls.waypoint;
          state.cp1 = controls.cp1;
          state.cp2 = controls.cp2;
          state.cp3 = controls.cp3;
          state.cp4 = controls.cp4;
          state.arcHeight = controls.arcHeight;
          state.lateralDrift = controls.lateralDrift;
          state.flightDuration = controls.flightDuration;
          state.targetPhi = controls.toSite.phi;

          state.phase = "flight";
          state.phaseStart = now;
          state.points = [];
          isPausedRef.current = false;
        }
      }

      if (logoElement) {
        logoElement.style.transform = `translate(${state.logoPos.x - 20}px, ${state.logoPos.y - 20 + logoOffsetY}px) scale(${0.6 * depthScale})`;
      }

      if (pulseElement) {
        if (state.phase === "landing") {
          const pulseProgress = Math.min((now - state.phaseStart) / 1200, 1);
          const eased = cubicBezierEasing(pulseProgress, 0.2, 0.7, 0.2, 1);
          const scale = 0.35 + eased * 2.8;
          const opacity = 0.4 * (1 - pulseProgress);
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
      if (resizeObserverRef.current && containerRef.current) {
        resizeObserverRef.current.unobserve(containerRef.current);
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
        className="absolute h-8 w-8 rounded-full border border-purple-300/45 shadow-[0_0_20px_rgba(168,85,247,0.28)] bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 pointer-events-none"
        style={{ opacity: 0, transformOrigin: "center" }}
      />

      <div
        ref={logoRef}
        className="absolute h-10 w-10 pointer-events-none"
      >
        <div className="absolute inset-[-7px] rounded-full bg-gradient-to-r from-red-500/14 via-purple-500/16 to-blue-500/14 blur-md" />
        <div
          className="relative h-full w-full rounded-full border border-blue-300/60 shadow-[0_0_10px_rgba(59,130,246,0.25),0_0_8px_rgba(168,85,247,0.2)]"
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
