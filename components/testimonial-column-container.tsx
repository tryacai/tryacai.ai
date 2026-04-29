"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function TestimonialColumnContainer({
  className,
  shift = 0,
  children,
  isPaused = false,
}: {
  className?: string;
  shift?: number;
  children: React.ReactNode;
  isPaused?: boolean;
}) {
  let columnRef = useRef<React.ElementRef<"div">>(null);
  let [columnHeight, setColumnHeight] = useState(0);
  let duration = `${columnHeight * shift}ms`;

  useEffect(() => {
    if (!columnRef.current) {
      return;
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ 
        "--marquee-duration": duration,
        animationPlayState: isPaused ? "paused" : "running"
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
