"use client";
import createGlobe from "cobe";
import { useEffect, useMemo, useRef, useState } from "react";

type Vec3 = { x: number; y: number; z: number };

const degToRad = (d: number) => (d * Math.PI) / 180;

const latLonToVec3 = (lat: number, lon: number): Vec3 => {
  const lr = degToRad(lat), lo = degToRad(lon), cl = Math.cos(lr);
  return { x: cl * Math.cos(lo), y: Math.sin(lr), z: cl * Math.sin(lo) };
};

const normalize = (v: Vec3): Vec3 => {
  const l = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / l, y: v.y / l, z: v.z / l };
};

const slerp = (a: Vec3, b: Vec3, t: number): Vec3 => {
  const na = normalize(a), nb = normalize(b);
  const d = Math.max(-1, Math.min(1, na.x*nb.x + na.y*nb.y + na.z*nb.z));
  const th = Math.acos(d);
  if (th < 1e-5) return na;
  const s = Math.sin(th);
  const w1 = Math.sin((1-t)*th)/s, w2 = Math.sin(t*th)/s;
  return normalize({ x: na.x*w1+nb.x*w2, y: na.y*w1+nb.y*w2, z: na.z*w1+nb.z*w2 });
};

const slerpEast = (fl: number, flo: number, tl: number, tlo: number, t: number): Vec3 => {
  let dLon = tlo - flo;
  if (dLon < 0) dLon += 360;
  const fv = latLonToVec3(fl, flo);
  const tv = latLonToVec3(tl, tlo);
  if (dLon <= 180) return slerp(fv, tv, t);
  const mid = normalize(latLonToVec3((fl+tl)/2, flo+dLon/2));
  return t < 0.5 ? slerp(fv, mid, t*2) : slerp(mid, tv, (t-0.5)*2);
};

const lerp = (a: number, b: number, t: number) => a + (b-a)*t;

export const Globe = ({ className }: { className?: string }) => {
  const containerRef   = useRef<HTMLDivElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef        = useRef<HTMLDivElement>(null);
  const pulseRef       = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(false);

  const globeRotationRef = useRef(0);
  const globeSpeedRef    = useRef(0.0065);
  const targetSpeedRef   = useRef(0.0065);

  const rafRef            = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const sceneRef          = useRef({ size: 600, center: 300, dpr: 2 });

  const surfacePositions = useMemo(() => [
    { lat: 34.0522,  lon: -118.2437 },
    { lat: 40.7128,  lon:  -74.0060 },
    { lat: 51.5072,  lon:   -0.1276 },
    { lat: 35.6764,  lon:  139.6500 },
    { lat: -33.8688, lon:  151.2093 },
  ], []);

  const flightStateRef = useRef({
    segmentIndex: 0,
    phase: "flight" as "flight" | "landing" | "hold" | "rebound",
    phaseStart: 0,
    fromLat: 34.0522, fromLon: -118.2437,
    toLat:   40.7128, toLon:   -74.006,
    landingVec: latLonToVec3(40.7128, -74.006),
    points: [] as Array<{ x: number; y: number; t: number }>,
    logoPos: { x: 300, y: 300 },
    logoVisible: false,
    depthScale: 1,
  });

  const FLIGHT_DURATION  = 6000;
  const ALTITUDE_MAX     = 0.22;
  const HOLD_DURATION    = 3000;
  const LANDING_DURATION = 1000;
  const REBOUND_DURATION = 600;
  const TRAIL_DECAY      = 3200;
  const BASE_SPEED       = 0.0065;
  const LAND_SPEED       = 0;

  useEffect(() => { hoverRef.current = isHovered; }, [isHovered]);

  useEffect(() => {

    const dpr = 2;
    const logoElement  = logoRef.current;
    const pulseElement = pulseRef.current;
    const trailCanvas  = trailCanvasRef.current;
    const trailCtx     = trailCanvas?.getContext("2d");

    const syncCanvasSize = () => {
      const size = containerRef.current?.clientWidth || 600;
      sceneRef.current = { size, center: size/2, dpr };
      if (trailCanvas) {
        trailCanvas.width  = Math.round(size*dpr);
        trailCanvas.height = Math.round(size*dpr);
        trailCanvas.style.width  = `${size}px`;
        trailCanvas.style.height = `${size}px`;
      }
    };

    syncCanvasSize();
    if (containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(syncCanvasSize);
      resizeObserverRef.current.observe(containerRef.current);
    }
    if (!canvasRef.current) return;

    const projectLive = (wx: number, wy: number, wz: number) => {
      const { size, center } = sceneRef.current;
      const phi = globeRotationRef.current;
      const rx =  wx*Math.cos(phi) + wz*Math.sin(phi);
      const ry =  wy;
      const rz = -wx*Math.sin(phi) + wz*Math.cos(phi);
      return {
        sx: center + rx*size*0.44,
        sy: center - ry*size*0.44,
        z:  rz,
      };
    };

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: 600*dpr, height: 600*dpr,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.28,0.28,0.28],
      markerColor: [0.66,0.24,1],
      glowColor: [0.47,0.33,1],
      markers: surfacePositions.map(p => ({
        location: [p.lat, p.lon] as [number,number],
        size: 0.06,
      })),
      onRender: state => {
        const hoverFactor = hoverRef.current ? 0.7 : 1;
        const target = targetSpeedRef.current * hoverFactor;
        globeSpeedRef.current += (target - globeSpeedRef.current) * 0.06;
        globeRotationRef.current += globeSpeedRef.current;
        state.phi = globeRotationRef.current;
      }
    });

    const buildSegment = (idx: number) => {
      const from = surfacePositions[idx];
      const to   = surfacePositions[(idx+1) % surfacePositions.length];
      return {
        fromLat: from.lat,
        fromLon: from.lon,
        toLat:   to.lat,
        toLon:   to.lon,
        landingVec: latLonToVec3(to.lat, to.lon)
      };
    };

    const seg0 = buildSegment(0);
    Object.assign(flightStateRef.current, { ...seg0, phaseStart: performance.now() });

    const drawTrail = (now: number) => {
      if (!trailCtx) return;
      const { size, dpr } = sceneRef.current;
      trailCtx.save();
      trailCtx.setTransform(dpr,0,0,dpr,0,0);
      trailCtx.clearRect(0,0,size,size);
      trailCtx.beginPath();
      trailCtx.arc(size/2,size/2,size*0.44,0,Math.PI*2);
      trailCtx.clip();

      const pts = flightStateRef.current.points;
      for (let i=1;i<pts.length;i++){
        const prev = pts[i-1];
        const cur  = pts[i];
        const prog = i/(pts.length-1);
        const age  = Math.max(0,1-(now-cur.t)/TRAIL_DECAY);
        const alpha = age*(0.2+prog*0.8)*0.7;

        trailCtx.beginPath();
        trailCtx.moveTo(prev.x,prev.y);
        trailCtx.lineTo(cur.x,cur.y);
        trailCtx.lineCap="round";
        trailCtx.lineJoin="round";
        trailCtx.lineWidth=2+prog*6;
        trailCtx.strokeStyle=`rgba(150,90,255,${alpha})`;
        trailCtx.shadowBlur=14;
        trailCtx.shadowColor=`rgba(150,90,255,${alpha})`;
        trailCtx.stroke();
      }
      trailCtx.restore();
    };

    const animate = (now: number) => {
      const s = flightStateRef.current;
      let logoOffsetY = 0;

      if (s.phase === "flight") {

        targetSpeedRef.current = BASE_SPEED;

        const raw = Math.min((now - s.phaseStart)/FLIGHT_DURATION,1);
        const sv  = slerpEast(s.fromLat,s.fromLon,s.toLat,s.toLon,raw);
        const alt = 1 + ALTITUDE_MAX*Math.sin(Math.PI*raw);
        const { sx,sy,z } = projectLive(sv.x*alt,sv.y*alt,sv.z*alt);

        // --- LANDING ALIGNMENT FIX ---
        if (raw > 0.85) {
          const targetPhi = -degToRad(s.toLon);
          const delta = targetPhi - globeRotationRef.current;
          globeRotationRef.current += delta * 0.04;
        }

        s.logoVisible = z>0;
        if (s.logoVisible){
          s.logoPos={x:sx,y:sy};
          s.points.push({x:sx,y:sy,t:now});
        }
        while(s.points.length && now-s.points[0].t>TRAIL_DECAY) s.points.shift();

        s.depthScale = 1 + 0.25*Math.sin(Math.PI*raw);

        if (raw>=1){
          s.phase="landing";
          s.phaseStart=now;
          targetSpeedRef.current = LAND_SPEED;
        }

      } else if (s.phase==="landing"){
        const {sx,sy,z}=projectLive(s.landingVec.x,s.landingVec.y,s.landingVec.z);
        s.logoVisible=z>0;
        s.logoPos={x:sx,y:sy};
        const lp=Math.min((now-s.phaseStart)/LANDING_DURATION,1);
        logoOffsetY=Math.sin(lp*Math.PI*5)*(1-lp)*2;
        if(lp>=1){s.phase="hold";s.phaseStart=now;}
      }
      else if(s.phase==="hold"){
        targetSpeedRef.current=LAND_SPEED;
        const {sx,sy,z}=projectLive(s.landingVec.x,s.landingVec.y,s.landingVec.z);
        s.logoVisible=z>0;
        s.logoPos={x:sx,y:sy};
        if(now-s.phaseStart>=HOLD_DURATION){s.phase="rebound";s.phaseStart=now;}
      }
      else{
        const rp=Math.min((now-s.phaseStart)/REBOUND_DURATION,1);
        logoOffsetY=-Math.sin(rp*Math.PI)*6;
        if(rp>=1){
          targetSpeedRef.current=BASE_SPEED;
          const next=(s.segmentIndex+1)%surfacePositions.length;
          const seg=buildSegment(next);
          Object.assign(s,{segmentIndex:next,...seg,phase:"flight",phaseStart:now,points:[]});
        }
      }

      if(logoElement){
        logoElement.style.opacity=s.logoVisible?"1":"0";
        if(s.logoVisible){
          logoElement.style.transform=`translate(${s.logoPos.x-20}px,${s.logoPos.y-20+logoOffsetY}px) scale(${0.6*s.depthScale})`;
        }
      }

      drawTrail(now);
      rafRef.current=requestAnimationFrame(animate);
    };

    rafRef.current=requestAnimationFrame(animate);

    return ()=>{
      if(rafRef.current) cancelAnimationFrame(rafRef.current);
      if(resizeObserverRef.current) resizeObserverRef.current.disconnect();
      globe.destroy();
    };

  },[surfacePositions]);

  return (
    <div ref={containerRef} className={`relative ${className||""}`}>
      <canvas ref={trailCanvasRef} className="absolute inset-0 pointer-events-none" />
      <div ref={logoRef} className="absolute h-10 w-10 pointer-events-none">
        <div
          className="h-full w-full rounded-full"
          style={{
            backgroundImage:"url('/justlogowithoutwordsACAI.jpeg')",
            backgroundSize:"cover",
            backgroundPosition:"center",
          }}
        />
      </div>
      <canvas ref={canvasRef} style={{width:600,height:600,maxWidth:"100%",aspectRatio:1}}/>
    </div>
  );
};
