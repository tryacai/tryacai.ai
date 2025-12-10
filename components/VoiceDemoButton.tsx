"use client";
import React from "react";
import { cn } from "@/lib/utils";

export interface VoiceDemoButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  enableLiveAgent?: boolean;
  className?: string;
}

export const VoiceDemoButton: React.FC<VoiceDemoButtonProps> = ({
  onClick,
  children = "Try ACAI",
  enableLiveAgent = false,
  className,
}) => {
  const handleClick = () => {
    console.log("Voice demo button clicked");
    
    // Check if live agent connection is available and enabled
    if (enableLiveAgent && typeof window !== "undefined") {
      const connectLiveAgent = (window as any).connectLiveAgent;
      if (typeof connectLiveAgent === "function") {
        connectLiveAgent();
      }
    }
    
    // Call custom onClick handler if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Try ACAI voice demo"
      data-live-agent={enableLiveAgent}
      className={cn(
        "relative z-10 px-8 py-3 rounded-full font-medium text-white text-sm md:text-base",
        "bg-gradient-to-r from-[#ff1a1a] via-[#a100ff] to-[#004cff]",
        "transition-all duration-200",
        "hover:shadow-lg hover:scale-105",
        "focus:outline-none focus:ring-2 focus:ring-[#a100ff] focus:ring-offset-2",
        "active:scale-95",
        "shadow-md",
        className
      )}
    >
      {children}
    </button>
  );
};
