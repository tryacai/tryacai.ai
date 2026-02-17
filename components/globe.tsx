"use client";

import createGlobe from "cobe";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Vec3 = { x: number; y: number; z: number };

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const degToRad = (deg: number) => (deg * Math.PI) / 180;

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

const rotateVec = (v: Vec3, phi: number, theta: number): Vec3 => {
  // yaw around Y (phi)
  const cosP = Math.cos(phi);
  const sinP = Math.sin(phi);
  const x1 = v.x * cosP + v.z * sinP;
  const y1 = v.y;
  const z1 = -v.x * sinP + v.z * cosP;

  // pitch around X (theta)
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  return {
    x: x1,
    y: y1 * cosT - z1 * sinT,
    z: y1 * sinT + z1 * cosT,
  };
};

export const Globe = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeCanvasRef = useRef<HTMLCanvasElement>(null);

  // We use ONE overlay canvas for rim + hover glow + trail so alignment is perfect.
  const fxCanvasRef = useRef<HTMLCanvasElement>(null);

  const logoRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(false);

  const [zoomOpen, setZoomOpen] = useState(false);

  const rafRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Scene
  const sceneRef = useRef({ size: 780, center: 390, dpr: 2 });

  // Pointer inside globe
  const pointerRef = useRef({
    xN: 0,
    yN: 0,
    sx: 0,
    sy: 0,
    inside: false,
    dist01: 0, // 0 center, 1 edge
  });

  // Globe orientation + velocity
  const phiRef = useRef(0);
  const thetaRef = useRef(0);
  const vPhiRef = useRef(0);
  const vThetaRef = useRef(0);

  // Autopilot base
  const AUTO_PHI = 0.0038;
  const AUTO_THETA_RETURN = 0.02;

  // Hover feel
  const DEADZONE = 0.08;
  const MAX_PHI = 0.028;
  const MAX_THETA = 0.020;
  const RESPONSE = 0.22;
  const FRICTION = 0.88;

  // Logo sizing
  const LOGO_SIZE = 52;
  const LOGO_HALF = LOGO_SIZE / 2;

  // Trail
  const trailPointsRef = useRef<Array<{ x: number; y: number; t: number }>>([]);
  const TRAIL_DECAY = 1900; // shorter, more natural

  // Logo orbit when not hovering
  const orbitalAngleRef = useRef(0);
  const incPhaseRef = useRef(0);

  // Marker system for Newark demo
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

  const markerVecs = useMemo(
    () => markers.map((m) => ({ ...m, vec: latLonToVec3(m.lat, m.lon) })),
    [markers]
  );

  const hoveredMarkerRef = useRef<string | null>(null);
  const [tooltip, setTooltip] = useState<null | { title: string; subtitle: string }>(null);

  useEffect(() => {
    hoverRef.current = isHovered;
  }, [isHovered]);

  // Helper: project world vec to screen using current phi/theta, shared by hover detection and logo orbit
  const projectWorld = (world: Vec3) => {
    const { size, center } = sceneRef.current;
    const radius = size * 0.46; // slightly larger so globe visually fills more
    const r = rotateVec(world, phiRef.current, thetaRef.current);
    return {
      sx: center + r.x * radius,
      sy: center - r.y * radius,
      z: r.z,
      radius,
      center,
    };
  };

  useEffect(() => {
    const dpr = 2;
    const fxCanvas = fxCanvasRef.current;
    const fxCtx = fxCanvas?.getContext("2d");

    const syncSize = () => {
      const container = containerRef.current;
      const w = container?.clientWidth || 780;

      // Make the globe bigger: allow up to 920 if the section gives room
      const size = Math.min(w, 920);

      sceneRef.current = { size, center: size / 2, dpr };

      if (fxCanvas) {
        fxCanvas.width = Math.round(size * dpr);
        fxCanvas.height = Math.round(size * dpr);
        fxCanvas.style.width = `${size}px`;
        fxCanvas.style.height = `${size}px`;
      }

      const globeCanvas = globeCanvasRef.current;
      if (globeCanvas) {
        globeCanvas.width = Math.round(size * dpr);
        globeCanvas.height = Math.round(size * dpr);
        globeCanvas.style.width = `${size}px`;
        globeCanvas.style.height = `${size}px`;
      }
    };

    syncSize();

    if (containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(syncSize);
      resizeObserverRef.current.observe(containerRef.current);
    }

    if (!globeCanvasRef.current) return;

    // Start with a nice angle
    if (phiRef.current === 0) phiRef.current = 1.2;

    const globe = createGlobe(globeCanvasRef.current, {
      devicePixelRatio: dpr,
      width: sceneRef.current.size * dpr,
      height: sceneRef.current.size * dpr,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: 1,
      diffuse: 1.15,
      mapSamples: 16000,
      mapBrightness: 5.2,
      baseColor: [0.22, 0.22, 0.22], // black/white feel
      markerColor: [0.66, 0.24, 1],
      glowColor: [0.18, 0.18, 0.18], // subdued default, we tint via overlay glow
      markers: markers.map((m) => ({
        location: [m.lat, m.lon] as [number, number],
        size: m.name.includes("Newark") ? 0.078 : 0.06,
      })),
      onRender: (state) => {
        // Zoom mode locks control to target orientation
        if (zoomOpen) {
          const newark = markerVecs.find((m) => m.name.includes("Newark"));
          if (newark) {
            // Center marker by setting phi to -lon, theta to +lat (approx)
            const targetPhi = -degToRad(newark.lon);
            const targetTheta = degToRad(newark.lat) * 0.55;

            phiRef.current += (targetPhi - phiRef.current) * 0.06;
            thetaRef.current += (targetTheta - thetaRef.current) * 0.06;

            vPhiRef.current *= 0.85;
            vThetaRef.current *= 0.85;
          }
        } else {
          const hovering = hoverRef.current && pointerRef.current.inside;

          if (hovering) {
            const { xN, yN, dist01 } = pointerRef.current;

            // distance-based speed: center stop, edge fast
            const ax = Math.abs(xN);
            const ay = Math.abs(yN);
            const dx = ax < DEADZONE ? 0 : (ax - DEADZONE) / (1 - DEADZONE);
            const dy = ay < DEADZONE ? 0 : (ay - DEADZONE) / (1 - DEADZONE);

            // shape it to feel natural
            const curve = (v: number) => v * v;

            const speedBoost = 0.35 + 0.65 * dist01;

            const targetVPhi =
              Math.sign(xN) *
              (AUTO_PHI * 0.15 + curve(dx) * (MAX_PHI - AUTO_PHI * 0.15)) *
              speedBoost;

            // IMPORTANT: moving cursor UP should rotate UP (no inversion)
            const targetVTheta = Math.sign(yN) * curve(dy) * MAX_THETA * speedBoost;

            vPhiRef.current += (targetVPhi - vPhiRef.current) * RESPONSE;
            vThetaRef.current += (targetVTheta - vThetaRef.current) * RESPONSE;

            // friction near center
            if (dx === 0) vPhiRef.current *= FRICTION;
            if (dy === 0) vThetaRef.current *= FRICTION;

            phiRef.current += vPhiRef.current;
            thetaRef.current += vThetaRef.current;

            // soft poles (no hard stop)
            const SOFT_LIMIT = Math.PI / 2 - 0.05;
            const SOFT_ZONE = 0.22;
            const absT = Math.abs(thetaRef.current);
            const poleStart = SOFT_LIMIT - SOFT_ZONE;
            if (absT > poleStart) {
              const prox = clamp((absT - poleStart) / SOFT_ZONE, 0, 1);
              vThetaRef.current *= 1 - 0.55 * prox;
            }
            if (absT > SOFT_LIMIT) {
              const sign = Math.sign(thetaRef.current) || 1;
              const over = absT - SOFT_LIMIT;
              thetaRef.current = sign * (SOFT_LIMIT + over * 0.25);
              vThetaRef.current *= 0.65;
            }
          } else {
            // autopilot continues from wherever you left it, no snapping
            vPhiRef.current += (AUTO_PHI - vPhiRef.current) * 0.06;
            vThetaRef.current *= 0.90;
            thetaRef.current += (0 - thetaRef.current) * AUTO_THETA_RETURN;

            phiRef.current += vPhiRef.current;
            thetaRef.current += vThetaRef.current;
          }
        }

        state.phi = phiRef.current;
        state.theta = thetaRef.current;
      },
    });

    const drawRim = (ctx: CanvasRenderingContext2D, size: number, radius: number) => {
      // Thin rim that hugs globe exactly using the same radius math
      const cx = size / 2;
      const cy = size / 2;

      ctx.save();
      ctx.translate(cx, cy);

      // draw many small arc segments to fake an angular gradient
      const segments = 180;
      const outer = radius + 2.5;
      const inner = radius - 2.5;

      for (let i = 0; i < segments; i += 1) {
        const t0 = (i / segments) * Math.PI * 2;
        const t1 = ((i + 1) / segments) * Math.PI * 2;

        // red -> purple -> blue -> purple -> red
        const p = i / (segments - 1);
        let r = 239,
          g = 68,
          b = 68;
        if (p < 0.25) {
          const q = p / 0.25;
          r = Math.round(lerp(239, 168, q));
          g = Math.round(lerp(68, 85, q));
          b = Math.round(lerp(68, 247, q));
        } else if (p < 0.5) {
          const q = (p - 0.25) / 0.25;
          r = Math.round(lerp(168, 59, q));
          g = Math.round(lerp(85, 130, q));
          b = Math.round(lerp(247, 246, q));
        } else if (p < 0.75) {
          const q = (p - 0.5) / 0.25;
          r = Math.round(lerp(59, 168, q));
          g = Math.round(lerp(130, 85, q));
          b = Math.round(lerp(246, 247, q));
        } else {
          const q = (p - 0.75) / 0.25;
          r = Math.round(lerp(168, 239, q));
          g = Math.round(lerp(85, 68, q));
          b = Math.round(lerp(247, 68, q));
        }

        ctx.beginPath();
        ctx.arc(0, 0, (outer + inner) / 2, t0, t1);
        ctx.strokeStyle = `rgba(${r},${g},${b},0.65)`;
        ctx.lineWidth = 5.0;
        ctx.shadowBlur = 18;
        ctx.shadowColor = `rgba(${r},${g},${b},0.30)`;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawHoverGlow = (ctx: CanvasRenderingContext2D, now: number) => {
      const { size } = sceneRef.current;
      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.46;

      const pointer = pointerRef.current;
      const active = hoverRef.current && pointer.inside && !zoomOpen;

      if (!active) return;

      // Clip to globe
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // Soft “region glow” that tints the dot-map underneath (screen blend)
      const gx = pointer.sx;
      const gy = pointer.sy;

      // subtle pulse for life
      const pulse = 0.88 + 0.12 * Math.sin(now / 220);

      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius * 0.52);
      grad.addColorStop(0, `rgba(239,68,68,${0.22 * pulse})`);
      grad.addColorStop(0.35, `rgba(168,85,247,${0.20 * pulse})`);
      grad.addColorStop(0.62, `rgba(59,130,246,${0.14 * pulse})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");

      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Add some “dot pop” sparkle near cursor (cinematic, feels like dots react)
      ctx.globalCompositeOperation = "lighter";
      const sparkCount = 16;
      for (let i = 0; i < sparkCount; i += 1) {
        const a = (i / sparkCount) * Math.PI * 2 + (now / 1400);
        const rr = radius * (0.10 + 0.18 * (i % 3) / 2) * pulse;
        const sx = gx + Math.cos(a) * rr;
        const sy = gy + Math.sin(a) * rr * 0.75;

        ctx.beginPath();
        ctx.arc(sx, sy, 1.2 + (i % 3) * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.18)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(168,85,247,0.30)";
        ctx.fill();
      }

      ctx.restore();
      ctx.globalCompositeOperation = "source-over";
    };

    const drawTrail = (ctx: CanvasRenderingContext2D, now: number) => {
      const { size } = sceneRef.current;
      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.46;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      const pts = trailPointsRef.current;
      if (pts.length < 2) {
        ctx.restore();
        return;
      }

      for (let i = 1; i < pts.length; i += 1) {
        const prev = pts[i - 1];
        const cur = pts[i];
        const prog = i / (pts.length - 1);
        const age = Math.max(0, 1 - (now - cur.t) / TRAIL_DECAY);
        const alpha = age * (0.22 + prog * 0.9) * 0.9;

        let r = 255,
          g = 70,
          b = 75;
        if (prog < 0.5) {
          const p = prog / 0.5;
          r = Math.round(lerp(255, 160, p));
          g = Math.round(lerp(70, 68, p));
          b = Math.round(lerp(75, 255, p));
        } else {
          const p = (prog - 0.5) / 0.5;
          r = Math.round(lerp(160, 60, p));
          g = Math.round(lerp(68, 125, p));
          b = 255;
        }

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(cur.x, cur.y);

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Slightly thicker near head, shorter natural trail
        ctx.lineWidth = 2.2 + prog * 6.0;

        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.shadowBlur = 22;
        ctx.shadowColor = `rgba(${r},${g},${b},${alpha * 0.75})`;
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = (now: number) => {
      if (!fxCtx) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const { size, dpr: dd } = sceneRef.current;
      const cx = size / 2;
      const radius = size * 0.46;

      fxCtx.save();
      fxCtx.setTransform(dd, 0, 0, dd, 0, 0);
      fxCtx.clearRect(0, 0, size, size);

      // Figure out logo position
      const pointer = pointerRef.current;
      const inside = hoverRef.current && pointer.inside && !zoomOpen;

      let logoX = cx;
      let logoY = cx;
      let logoVisible = true;
      let depthScale = 1;

      if (inside) {
        logoX = pointer.sx;
        logoY = pointer.sy;
        depthScale = 1;
      } else {
        // autopilot orbit, continuous, never resets
        orbitalAngleRef.current += 0.0105; // slower than before
        incPhaseRef.current += 0.00045;

        const inc = 0.18 + 0.42 * Math.sin(incPhaseRef.current);
        const a = orbitalAngleRef.current;

        const orbitVec: Vec3 = {
          x: Math.cos(a),
          y: Math.sin(a) * Math.sin(inc),
          z: Math.sin(a) * Math.cos(inc),
        };

        const p = projectWorld(orbitVec);
        logoVisible = p.z > 0;
        depthScale = 0.90 + p.z * 0.12;

        // clamp to circle edge to keep it clean
        const dx = p.sx - p.center;
        const dy = p.sy - p.center;
        const dist = Math.hypot(dx, dy);
        const maxR = p.radius * 0.998;

        if (dist > maxR && dist !== 0) {
          logoX = p.center + (dx / dist) * maxR;
          logoY = p.center + (dy / dist) * maxR;
        } else {
          logoX = p.sx;
          logoY = p.sy;
        }
      }

      // Trail always active when logo is visible (auto or hover)
      if (logoVisible) {
        trailPointsRef.current.push({ x: logoX, y: logoY, t: now });
      }
      while (trailPointsRef.current.length && now - trailPointsRef.current[0].t > TRAIL_DECAY) {
        trailPointsRef.current.shift();
      }

      // Marker hover detection for Newark tooltip (only while hovering, front face only)
      if (inside) {
        let nearest = 18;
        let hovered: string | null = null;

        for (const m of markerVecs) {
          const p = projectWorld(m.vec);
          if (p.z <= 0) continue;
          const d = Math.hypot(pointer.sx - p.sx, pointer.sy - p.sy);
          if (d <= nearest) {
            nearest = d;
            hovered = m.name;
          }
        }

        const isNewark = hovered?.includes("Newark") ?? false;

        if (isNewark && hoveredMarkerRef.current !== "Newark, NJ") {
          hoveredMarkerRef.current = "Newark, NJ";
          setTooltip({
            title: "Newark Barbershop",
            subtitle: "Demo referral: ACAI is handling calls and bookings here.",
          });
        }

        if (!isNewark && hoveredMarkerRef.current !== null) {
          hoveredMarkerRef.current = null;
          setTooltip(null);
        }
      } else {
        if (hoveredMarkerRef.current !== null) {
          hoveredMarkerRef.current = null;
          setTooltip(null);
        }
      }

      // FX order: rim -> hover glow -> trail (trail reads better above glow)
      drawRim(fxCtx, size, radius);
      drawHoverGlow(fxCtx, now);
      drawTrail(fxCtx, now);

      fxCtx.restore();

      // Update logo DOM
      const logoEl = logoRef.current;
      if (logoEl) {
        logoEl.style.opacity = logoVisible ? "1" : "0";
        if (logoVisible) {
          logoEl.style.transform = `translate(${logoX - LOGO_HALF}px, ${logoY - LOGO_HALF}px) scale(${depthScale})`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;

      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;

      globe.destroy();
    };
  }, [markers, markerVecs, zoomOpen]);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;

    const { size, center } = sceneRef.current;
    const radius = size * 0.46;

    const localX = (px / rect.width) * size;
    const localY = (py / rect.height) * size;

    const dx = localX - center;
    const dy = localY - center;

    const dist = Math.hypot(dx, dy);
    const inside = dist <= radius;

    const clampedDist = Math.min(dist, radius);
    const nx = dist === 0 ? 0 : dx / dist;
    const ny = dist === 0 ? 0 : dy / dist;

    const sx = center + nx * clampedDist;
    const sy = center + ny * clampedDist;

    const xN = clamp(dx / radius, -1, 1);
    const yN = clamp(dy / radius, -1, 1);

    // dist01 should feel like speed, so use clamped distance
    const dist01 = clamp(clampedDist / radius, 0, 1);

    pointerRef.current = { xN, yN, sx, sy, inside, dist01 };
  };

  const onPointerLeave = () => {
    const { center } = sceneRef.current;
    pointerRef.current = { xN: 0, yN: 0, sx: center, sy: center, inside: false, dist01: 0 };
    hoveredMarkerRef.current = null;
    setTooltip(null);
  };

  const onClick = () => {
    // Zoom is a client referral interaction, so only open zoom when Newark is hovered.
    const hovered = hoveredMarkerRef.current;
    if (hovered && hovered.includes("Newark")) {
      setZoomOpen(true);
    }
  };

  return (
    <div className={`relative ${className || ""}`}>
      <div
        ref={containerRef}
        className="relative mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          onPointerLeave();
        }}
        onPointerMove={onPointerMove}
        onClick={onClick}
        style={{ touchAction: "none" }}
      >
        {/* Stars background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
          {Array.from({ length: 24 }).map((_, i) => {
            const top = (i * 29) % 100;
            const left = (i * 53) % 100;
            const size = (i % 3) + 1;
            const opacity = 0.16 + (i % 5) * 0.04;
            return (
              <span
                key={`star-${i}`}
                className="absolute rounded-full bg-white/50"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                }}
              />
            );
          })}
        </div>

        {/* Globe canvas */}
        <canvas
          ref={globeCanvasRef}
          style={{
            width: sceneRef.current.size,
            height: sceneRef.current.size,
            maxWidth: "100%",
            aspectRatio: "1 / 1",
            display: "block",
          }}
        />

        {/* FX canvas (rim + glow + trail), perfectly aligned */}
        <canvas ref={fxCanvasRef} className="absolute inset-0 pointer-events-none" />

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

        {/* Hover tooltip for Newark only */}
        {tooltip && !zoomOpen && (
          <div
            className="absolute left-1/2 top-6 z-20 w-[330px] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/70 p-4 text-white shadow-2xl backdrop-blur"
            style={{
              boxShadow: "0 0 26px rgba(168,85,247,0.18), 0 0 44px rgba(59,130,246,0.12)",
            }}
          >
            <div className="text-sm font-semibold">{tooltip.title}</div>
            <div className="mt-1 text-sm text-white/75">{tooltip.subtitle}</div>
            <div className="mt-2 text-xs text-white/50">Click Newark to zoom in.</div>
          </div>
        )}

        {/* Zoom modal */}
        {zoomOpen && (
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
            <div className="relative w-[min(92%,740px)] rounded-3xl border border-white/10 bg-black/80 p-6 text-white shadow-2xl">
              <button
                onClick={() => setZoomOpen(false)}
                className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 hover:bg-white/10"
              >
                X
              </button>

              <div className="text-lg font-semibold">Newark, New Jersey</div>
              <div className="mt-1 text-sm text-white/70">
                Demo referral card. This is where you’ll show a real client story, photos, metrics, and a booking CTA.
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">Newark Barbershop</div>
                <div className="mt-1 text-sm text-white/70">
                  ACAI answers calls, routes inquiries, and keeps bookings moving so the chair stays full.
                </div>
              </div>

              <div className="mt-4 text-xs text-white/45">
                Exit to return to the globe. Globe will resume from the exact orientation it was at.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
