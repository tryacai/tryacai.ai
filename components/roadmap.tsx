"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container } from "./container";

export const Roadmap = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const milestones = [
    {
      date: "Early November 2025",
      title: "Start of ACAI",
      description: "Initial experimentation. Learning Retell AI, workflows, and voice automation systems while exploring real-world receptionist use cases.",
      position: "top" as const
    },
    {
      date: "Mid November 2025",
      title: "Legal Formation",
      description: "Filing ACAI as an LLC and establishing the company as an official legal business entity.",
      position: "bottom" as const
    },
    {
      date: "Early December 2025",
      title: "Partnership with XUNA AI",
      description: "Partnering with XUNA AI and building on top of their reliable, production-grade infrastructure while learning from their systems.",
      position: "top" as const
    },
    {
      date: "Mid December 2025",
      title: "Website Platform Launch",
      description: "Launching the ACAI website so users can review our platform, systems, workflows, and pricing.",
      position: "bottom" as const
    },
    {
      date: "Late December 2025",
      title: "First Live Client",
      description: "Onboarding and supporting our first real, active client using ACAI's AI receptionist.",
      position: "top" as const
    },
  ];

  const duplicatedMilestones = [...milestones, ...milestones, ...milestones];

  return (
    <Container>
      <div className="py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-16 text-neutral-200">
          Follow our roadmap as we build the future of AI solutions for businesses
        </h2>
        
        <div className="relative overflow-hidden py-32">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-red-900/20 via-red-600/40 to-blue-900/20 z-0" />
          
          <div
            ref={scrollRef}
            className="flex gap-16 relative"
            style={{
              animation: isPaused ? 'none' : 'scroll 25s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {duplicatedMilestones.map((milestone, index) => (
              <div
                key={`milestone-${index}`}
                className={`roadmap-card flex-shrink-0 w-80 relative ${
                  milestone.position === "top" ? "-mt-40" : "mt-40"
                }`}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  setIsPaused(true);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setIsPaused(false);
                }}
              >
                <div
                  className={`absolute ${
                    milestone.position === "top" ? "bottom-0 left-1/2" : "top-0 left-1/2"
                  } w-0.5 h-16 bg-gradient-to-b ${
                    milestone.position === "top"
                      ? "from-red-600/40 to-transparent"
                      : "from-transparent to-blue-600/40"
                  } -translate-x-1/2 z-0`}
                />
                
                <div
                  className={`relative p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                    hoveredIndex === index
                      ? "bg-neutral-900/90 border-red-600/50 shadow-lg shadow-red-900/20 scale-105"
                      : "bg-neutral-900/50 border-neutral-800/50"
                  }`}
                  style={{
                    boxShadow: hoveredIndex === index 
                      ? '0 0 30px rgba(220, 38, 38, 0.3), 0 0 60px rgba(30, 58, 138, 0.2)'
                      : 'none'
                  }}
                >
                  {hoveredIndex === index && (
                    <>
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={`particle-${i}`}
                          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                          style={{
                            background: i % 2 === 0 ? '#DC2626' : '#3B82F6',
                            left: `${15 + (i * 12)}%`,
                            animation: `float${i % 3} 2s ease-in-out infinite`,
                            animationDelay: `${i * 0.2}s`,
                            top: milestone.position === "top" ? '-20px' : 'auto',
                            bottom: milestone.position === "bottom" ? '-20px' : 'auto',
                          }}
                        />
                      ))}
                    </>
                  )}
                  
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                    hoveredIndex === index
                      ? "bg-gradient-to-r from-red-900/30 to-blue-900/30 border border-red-600/30 text-red-300"
                      : "bg-red-950/20 border border-red-900/30 text-red-400"
                  }`}>
                    {milestone.date}
                  </div>
                  
                  <h3 className={`text-lg font-semibold mb-2 transition-all duration-300 ${
                    hoveredIndex === index
                      ? "bg-gradient-to-r from-red-400 via-red-300 to-blue-400 bg-clip-text text-transparent"
                      : "text-neutral-300"
                  }`}>
                    {milestone.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                    hoveredIndex === index ? "text-neutral-300" : "text-neutral-500"
                  }`}>
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-320px * ${milestones.length} - 64px * ${milestones.length}));
          }
        }
        
        @keyframes float0 {
          0%, 100% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(-15px); opacity: 1; }
        }
        
        @keyframes float1 {
          0%, 100% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(-20px); opacity: 1; }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); opacity: 0.7; }
          50% { transform: translateY(-18px); opacity: 1; }
        }
      `}</style>
    </Container>
  );
};
