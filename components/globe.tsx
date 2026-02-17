"use client";
import createGlobe from "cobe";
import { useEffect, useMemo, useRef, useState } from "react";

type Vec3 = { x: number; y: number; z: number };

const degToRad = (d: number) => (d * Math.PI) / 180;

export const Globe = ({ className }: { className?: string }) => {
  const containerRef   = useRef<HTMLDivElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef        = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(false);

  const globeRotationRef = useRef(0);
  const globeSpeedRef    = useRef(0.006);
  const orbitalAngleRef  = useRef(0);

  const rafRef = useRef<number | null>(null);
  const sceneRef = useRef({ size: 600, center: 300, dpr: 2 });

  const TRAIL_DECAY = 2800;

  const trailPointsRef = useRef<Array<{ x: number; y: number; t: number }>>([]);

  useEffect(() => {
    hoverRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const dpr = 2;
    const trailCanvas = trailCanvasRef.current;
    const trailCtx = trailCanvas?.getContext("2d");

    const syncSize = () => {
      const size = containerRef.current?.clientWidth || 600;
      sceneRef.current = { size, center: size / 2, dpr };
      if (trailCanvas) {
        trailCanvas.width = size * dpr;
        trailCanvas.height = size * dpr;
        trailCanvas.style.width = `${size}px`;
        trailCanvas.style.height = `${size}px`;
      }
    };

    syncSize();

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
      onRender: (state) => {
        const base = 0.006;
        const speed = hoverRef.current ? base * 0.7 : base;

        globeSpeedRef.current += (speed - globeSpeedRef.current) * 0.05;
        globeRotationRef.current += globeSpeedRef.current;

        state.phi = globeRotationRef.current;
      },
    });

    const project = (vec: Vec3) => {
      const { size, center } = sceneRef.current;
      const phi = globeRotationRef.current;

      const rx =  vec.x * Math.cos(phi) + vec.z * Math.sin(phi);
      const ry =  vec.y;
      const rz = -vec.x * Math.sin(phi) + vec.z * Math.cos(phi);

      return {
        x: center + rx * size * 0.44,
        y: center - ry * size * 0.44,
        z: rz,
      };
    };

    const drawTrail = (now: number) => {
      if (!trailCtx) return;
      const { size, dpr } = sceneRef.current;

      trailCtx.save();
      trailCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      trailCtx.clearRect(0, 0, size, size);

      // clip to globe
      trailCtx.beginPath();
      trailCtx.arc(size/2, size/2, size*0.44, 0, Math.PI*2);
      trailCtx.clip();

      const pts = trailPointsRef.current;

      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const cur  = pts[i];

        const prog = i / (pts.length - 1);
        const age  = Math.max(0, 1 - (now - cur.t) / TRAIL_DECAY);
        const alpha = age * (0.2 + prog * 0.8);

        trailCtx.beginPath();
        trailCtx.moveTo(prev.x, prev.y);
        trailCtx.lineTo(cur.x, cur.y);
        trailCtx.lineCap = "round";
        trailCtx.lineWidth = 2 + prog * 5;

        // red → purple → blue
        const r = 150 + Math.sin(prog * Math.PI) * 80;
        const g = 60;
        const b = 255 - prog * 120;

        trailCtx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        trailCtx.shadowBlur = 12;
        trailCtx.shadowColor = `rgba(${r},${g},${b},${alpha})`;
        trailCtx.stroke();
      }

      trailCtx.restore();
    };

    const animate = (now: number) => {

      // Continuous orbital motion
      orbitalAngleRef.current += 0.012;

      const angle = orbitalAngleRef.current;

      // Slowly oscillating orbital inclination
      const inclination = degToRad(30 + Math.sin(now * 0.0003) * 20);

      const vec: Vec3 = {
        x: Math.cos(angle),
        y: Math.sin(angle) * Math.sin(inclination),
        z: Math.sin(angle) * Math.cos(inclination),
      };

      const projected = project(vec);

      const logo = logoRef.current;

      const visible = projected.z > 0;

      if (logo) {
        logo.style.opacity = visible ? "1" : "0";
        if (visible) {
          logo.style.transform = `translate(${projected.x - 18}px, ${projected.y - 18}px) scale(0.7)`;
        }
      }

      if (visible) {
        trailPointsRef.current.push({ x: projected.x, y: projected.y, t: now });
      }

      while (
        trailPointsRef.current.length &&
        now - trailPointsRef.current[0].t > TRAIL_DECAY
      ) {
        trailPointsRef.current.shift();
      }

      drawTrail(now);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      globe.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={trailCanvasRef} className="absolute inset-0 pointer-events-none" />

      <div
        ref={logoRef}
        className="absolute h-9 w-9 pointer-events-none"
        style={{
          backgroundImage: "url('/acai-logo-color.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          boxShadow: "0 0 18px rgba(150,90,255,0.6)",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
};
