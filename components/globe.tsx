"use client";
import createGlobe from "cobe";
import { useEffect, useMemo, useRef, useState } from "react";

type Vec3 = { x: number; y: number; z: number };

export const Globe = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Hover + pointer control
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(false);
  const pointerRef = useRef({ xN: 0, yN: 0 }); // normalized -1..1 within globe circle-ish
  const [focusCard, setFocusCard] = useState<null | {
    title: string;
    subtitle: string;
  }>(null);

  // Scene sizing
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const sceneRef = useRef({ size: 720, center: 360, dpr: 2 });

  // Globe rotation state (phi/theta) and velocities
  const phiRef = useRef(0);
  const thetaRef = useRef(0);
  const velPhiRef = useRef(0);
  const velThetaRef = useRef(0);

  // Orbiting logo state
  const orbitalAngleRef = useRef(0);
  const incPhaseRef = useRef(0);
  const trailPointsRef = useRef<Array<{ x: number; y: number; t: number }>>([]);

  const rafRef = useRef<number | null>(null);

  // Tunables
  const TRAIL_DECAY = 3600;

  // Autopilot
  const AUTO_PHI_SPEED = 0.0048; // slower default than before
  const AUTO_LOGO_SPEED = 0.0165;

  // Hover control feel
  const DEADZONE = 0.08; // near center, stop
  const MAX_PHI_SPEED = 0.020; // fast edge
  const MAX_THETA_SPEED = 0.014;
  const FRICTION = 0.88; // hover release smoothing
  const RESPONSE = 0.22; // how quickly velocity approaches target

  // Visual sizes
  const LOGO_SIZE = 52; // larger
  const LOGO_HALF = LOGO_SIZE / 2;

  // Markers (purple dots)
  const markers = useMemo(
    () => [
      { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
      { name: "Newark, NJ", lat: 40.7357, lon: -74.1724 }, // NJ example
      { name: "London", lat: 51.5072, lon: -0.1276 },
      { name: "Tokyo", lat: 35.6764, lon: 139.65 },
      { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    ],
    []
  );

  useEffect(() => {
    hoverRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const dpr = 2;
    const trailCanvas = trailCanvasRef.current;
    const trailCtx = trailCanvas?.getContext("2d");

    const syncSize = () => {
      const container = containerRef.current;
      const size = container?.clientWidth ? Math.min(container.clientWidth, 760) : 720;
      sceneRef.current = { size, center: size / 2, dpr };
      if (trailCanvas) {
        trailCanvas.width = Math.round(size * dpr);
        trailCanvas.height = Math.round(size * dpr);
        trailCanvas.style.width = `${size}px`;
        trailCanvas.style.height = `${size}px`;
      }
    };

    syncSize();

    if (containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(syncSize);
      resizeObserverRef.current.observe(containerRef.current);
    }

    if (!canvasRef.current) return;

    // Globe: keep grayscale feel
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: 600 * dpr,
      height: 600 * dpr,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.15,
      mapSamples: 16000,
      mapBrightness: 5.2,
      baseColor: [0.25, 0.25, 0.25],
      markerColor: [0.66, 0.24, 1],
      glowColor: [0.22, 0.22, 0.22], // subdued so it stays mostly grayscale
      markers: markers.map((m) => ({
        location: [m.lat, m.lon] as [number, number],
        size: m.name.includes("Newark") ? 0.075 : 0.06,
      })),
      onRender: (state) => {
        // Velocity target based on hover cursor position (center stop, edge faster)
        const hovering = hoverRef.current;
        const { xN, yN } = pointerRef.current;

        // deadzone shaping
        const ax = Math.abs(xN);
        const ay = Math.abs(yN);
        const dx = ax < DEADZONE ? 0 : (ax - DEADZONE) / (1 - DEADZONE);
        const dy = ay < DEADZONE ? 0 : (ay - DEADZONE) / (1 - DEADZONE);

        // smooth curve for natural acceleration
        const curve = (v: number) => v * v; // quadratic

        const targetPhiVel = hovering
          ? Math.sign(xN) * (AUTO_PHI_SPEED * 0.25 + curve(dx) * (MAX_PHI_SPEED - AUTO_PHI_SPEED * 0.25))
          : AUTO_PHI_SPEED;

        const targetThetaVel = hovering
          ? -Math.sign(yN) * (curve(dy) * MAX_THETA_SPEED)
          : 0;

        // approach target smoothly
        velPhiRef.current += (targetPhiVel - velPhiRef.current) * RESPONSE;
        velThetaRef.current += (targetThetaVel - velThetaRef.current) * RESPONSE;

        // when not hovering, damp extra wobble
        if (!hovering) {
          velThetaRef.current *= 0.86;
          // relax back toward theta=0
          thetaRef.current += (0 - thetaRef.current) * 0.03;
        }

        // integrate
        phiRef.current += velPhiRef.current;

        thetaRef.current += velThetaRef.current;
        // clamp theta so it never flips aggressively
        const THETA_CLAMP = Math.PI * 0.35;
        if (thetaRef.current > THETA_CLAMP) thetaRef.current = THETA_CLAMP;
        if (thetaRef.current < -THETA_CLAMP) thetaRef.current = -THETA_CLAMP;

        // extra friction when hovering stops near center
        if (hovering && targetPhiVel === 0) velPhiRef.current *= FRICTION;

        state.phi = phiRef.current;
        state.theta = thetaRef.current;
      },
    });

    const project = (wx: number, wy: number, wz: number) => {
      const { size, center } = sceneRef.current;
      const radius = size * 0.44;

      // rotate world vec by current globe phi (same as cobe)
      const phi = phiRef.current;
      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);
      const rx = wx * cosP + wz * sinP;
      const ry = wy;
      const rz = -wx * sinP + wz * cosP;

      return {
        sx: center + rx * radius,
        sy: center - ry * radius,
        z: rz,
        radius,
        center,
      };
    };

    const drawTrail = (now: number) => {
      if (!trailCtx) return;
      const { size, dpr: d } = sceneRef.current;

      trailCtx.save();
      trailCtx.setTransform(d, 0, 0, d, 0, 0);
      trailCtx.clearRect(0, 0, size, size);

      // Hard clip to the globe circle
      trailCtx.beginPath();
      trailCtx.arc(size / 2, size / 2, size * 0.44, 0, Math.PI * 2);
      trailCtx.clip();

      const pts = trailPointsRef.current;
      if (pts.length < 2) {
        trailCtx.restore();
        return;
      }

      const drawPass = (alphaMul: number, widthAdd: number, blur: number) => {
        for (let i = 1; i < pts.length; i++) {
          const prev = pts[i - 1];
          const cur = pts[i];
          const prog = i / (pts.length - 1); // 0 tail, 1 head
          const age = Math.max(0, 1 - (now - cur.t) / TRAIL_DECAY);
          const alpha = age * (0.22 + prog * 0.9) * 0.85 * alphaMul;

          // red -> purple -> blue
          let r: number, g: number, b: number;
          if (prog < 0.5) {
            const p = prog / 0.5;
            r = Math.round(255 - p * 95);
            g = Math.round(50 + p * 10);
            b = Math.round(100 + p * 155);
          } else {
            const p = (prog - 0.5) / 0.5;
            r = Math.round(160 - p * 110);
            g = Math.round(60 + p * 80);
            b = 255;
          }

          trailCtx.beginPath();
          trailCtx.moveTo(prev.x, prev.y);
          trailCtx.lineTo(cur.x, cur.y);
          trailCtx.lineCap = "round";
          trailCtx.lineJoin = "round";
          trailCtx.lineWidth = 3.0 + prog * 9.5 + widthAdd;
          trailCtx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          trailCtx.shadowBlur = blur;
          trailCtx.shadowColor = `rgba(${r},${g},${b},${alpha * 0.9})`;
          trailCtx.stroke();
        }
      };

      // bloom pass then main pass
      drawPass(0.30, 4, 34);
      drawPass(1.0, 0, 26);

      trailCtx.restore();
    };

    const animate = (now: number) => {
      const logoEl = logoRef.current;
      const hovering = hoverRef.current;

      // Logo movement rule:
      // - Not hovering: logo orbits automatically (autopilot)
      // - Hovering: logo "stays put" (freezes its orbital angle), globe moves under it
      if (!hovering) {
        orbitalAngleRef.current += AUTO_LOGO_SPEED;
        incPhaseRef.current += 0.00055;
      } else {
        // keep inclination slowly breathing even on hover (subtle life)
        incPhaseRef.current += 0.00035;
      }

      const inc = 0.18 + 0.42 * Math.sin(incPhaseRef.current);
      const a = orbitalAngleRef.current;

      // orbit vec on unit sphere
      const wx = Math.cos(a);
      const wy = Math.sin(a) * Math.sin(inc);
      const wz = Math.sin(a) * Math.cos(inc);

      const { sx, sy, z, radius, center } = project(wx, wy, wz);

      // visibility
      const visible = z > 0;

      // clamp to circle edge just in case
      const dx = sx - center;
      const dy = sy - center;
      const dist = Math.hypot(dx, dy);
      const maxR = radius * 0.998;
      const clamped =
        dist <= maxR || dist === 0
          ? { x: sx, y: sy }
          : { x: center + (dx / dist) * maxR, y: center + (dy / dist) * maxR };

      // Update logo
      if (logoEl) {
        logoEl.style.opacity = visible ? "1" : "0";
        if (visible) {
          const depthScale = 0.92 + z * 0.12;
          logoEl.style.transform = `translate(${clamped.x - LOGO_HALF}px, ${clamped.y - LOGO_HALF}px) scale(${depthScale})`;
        }
      }

      // Trail points only when visible
      if (visible) {
        trailPointsRef.current.push({ x: clamped.x, y: clamped.y, t: now });
      }
      while (trailPointsRef.current.length && now - trailPointsRef.current[0].t > TRAIL_DECAY) {
        trailPointsRef.current.shift();
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
  }, [markers]);

  // Pointer mapping: normalized -1..1 relative to the globe circle
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { size, center } = sceneRef.current;
    const localX = (x / rect.width) * size;
    const localY = (y / rect.height) * size;

    const dx = (localX - center) / (size * 0.44);
    const dy = (localY - center) / (size * 0.44);

    // clamp to -1..1
    const xN = Math.max(-1, Math.min(1, dx));
    const yN = Math.max(-1, Math.min(1, dy));
    pointerRef.current = { xN, yN };
  };

  const onPointerLeave = () => {
    // reset to center so it stops influencing after hover
    pointerRef.current = { xN: 0, yN: 0 };
  };

  // Click demo: show a placeholder referral card
  const onClick = () => {
    // For now: click anywhere on globe toggles a Newark demo card
    // Later: you’ll raycast / detect which marker was clicked.
    setFocusCard((prev) =>
      prev
        ? null
        : {
            title: "Newark Barbershop",
            subtitle: "ACAI is handling calls and bookings here (demo placeholder).",
          }
    );
  };

  const stars = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: `star-${i}`,
        top: (i * 29) % 100,
        left: (i * 53) % 100,
        size: (i % 3) + 1,
        opacity: 0.18 + (i % 5) * 0.04,
      })),
    []
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        onPointerLeave();
      }}
      onPointerMove={onPointerMove}
      onClick={onClick}
      style={{ touchAction: "none" }}
    >
      {/* Thin rim only (no wash over the globe) */}
      <div
        className="absolute inset-3 rounded-full pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(239,68,68,0.9), rgba(168,85,247,0.9), rgba(59,130,246,0.9), rgba(168,85,247,0.9), rgba(239,68,68,0.9))",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 60%, black 64%, black 100%)",
          maskImage: "radial-gradient(circle, transparent 60%, black 64%, black 100%)",
          opacity: isHovered ? 0.55 : 0.35,
          filter: "blur(0.8px)",
          transform: "translateZ(0)",
        }}
      />

      {/* Hover “liquid” spotlight (only on hover, only on the globe surface area) */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 200ms ease",
          WebkitMaskImage: "radial-gradient(circle, black 62%, transparent 66%)",
          maskImage: "radial-gradient(circle, black 62%, transparent 66%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(239,68,68,0.0) 0%, rgba(239,68,68,0.0) 25%, rgba(0,0,0,0) 60%)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            width: 220,
            height: 220,
            transform: `translate(calc(-50% + ${pointerRef.current.xN * 120}px), calc(-50% + ${pointerRef.current.yN * 120}px))`,
            background:
              "radial-gradient(circle, rgba(239,68,68,0.28) 0%, rgba(168,85,247,0.22) 45%, rgba(59,130,246,0.14) 70%, transparent 100%)",
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-white/60"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* Trail canvas */}
      <canvas ref={trailCanvasRef} className="absolute inset-0 pointer-events-none" />

      {/* ACAI logo */}
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
              "radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(59,130,246,0.26) 55%, rgba(239,68,68,0.14) 80%, transparent 100%)",
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

      {/* Tooltip card demo */}
      {focusCard && (
        <div
          className="absolute left-1/2 top-6 z-20 w-[320px] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/70 p-4 text-white shadow-2xl backdrop-blur"
          style={{
            boxShadow:
              "0 0 24px rgba(168,85,247,0.18), 0 0 42px rgba(59,130,246,0.12)",
          }}
        >
          <div className="text-sm font-semibold">{focusCard.title}</div>
          <div className="mt-1 text-sm text-white/75">{focusCard.subtitle}</div>
          <div className="mt-3 text-xs text-white/50">
            Click the globe again to close. Next step is making markers clickable.
          </div>
        </div>
      )}

      {/* Globe canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: 720,
          height: 720,
          maxWidth: "100%",
          aspectRatio: 1,
        }}
      />
    </div>
  );
};
