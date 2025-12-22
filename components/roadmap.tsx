"use client";

import React from "react";
import { Container } from "./container";

export const Roadmap = () => {
  const milestones = [
    {
      date: "Early November 2025",
      title: "Start of ACAI",
      description: "Initial experimentation. Learning Retell AI, workflows, and voice automation systems while exploring how AI receptionists operate in real-world scenarios.",
      position: "top"
    },
    {
      date: "Mid November 2025",
      title: "Legal Formation",
      description: "Filing ACAI as an LLC and establishing the business as an official legal entity with proper business structure and compliance.",
      position: "bottom"
    },
    {
      date: "Late November 2025",
      title: "First Working Prototype",
      description: "Building and testing initial AI receptionist prototype with core calling capabilities and basic conversation handling.",
      position: "top"
    },
    {
      date: "Early December 2025",
      title: "Beta Testing Phase",
      description: "Rolling out beta versions to select plumbers and HVAC businesses for real-world testing and feedback collection.",
      position: "bottom"
    },
    {
      date: "Mid December 2025",
      title: "Public Launch",
      description: "Official launch of ACAI AI receptionist platform with full feature set and customer onboarding systems.",
      position: "top"
    },
    {
      date: "Q1 2026",
      title: "Scale & Growth",
      description: "Expanding market reach, adding advanced features, and building partnerships with industry leaders.",
      position: "bottom"
    },
  ];

  return (
    <section className="py-20 w-full relative z-20 overflow-hidden">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Our Journey
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Follow our roadmap as we build the future of AI solutions for businesses
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden py-12">
            <div className="flex gap-12 animate-scroll group items-center">
              {/* Render milestones twice for seamless loop */}
              {[...milestones, ...milestones].map((milestone, index) => (
                <div
                  key={index}
                  className={`roadmap-card flex-shrink-0 w-80 ${
                    milestone.position === "top" ? "mt-0 mb-24" : "mt-24 mb-0"
                  }`}
                >
                  <div className="relative group">
                    {/* Glow effect container with more red */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:duration-200"></div>
                    
                    {/* Particle effects - more particles with red */}
                    <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-1/4 w-1.5 h-1.5 bg-red-400 rounded-full animate-float"></div>
                      <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-float-delayed"></div>
                      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-float"></div>
                      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-red-400 rounded-full animate-float-delayed-2"></div>
                      <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-float"></div>
                      <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-purple-400 rounded-full animate-float-delayed"></div>
                      <div className="absolute bottom-1/2 left-1/2 w-1.5 h-1.5 bg-red-400 rounded-full animate-float-delayed-2"></div>
                    </div>
                    
                    {/* Card content */}
                    <div className="relative p-6 rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-md group-hover:border-neutral-700 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
                      {/* Date badge with more red */}
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-500/20 via-blue-500/20 to-purple-500/20 border border-red-500/30 text-red-300 mb-3">
                        {milestone.date}
                      </div>
                      
                      {/* Title with gradient featuring more red */}
                      <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-red-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-red-300 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300">
                        {milestone.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                        {milestone.description}
                      </p>
                      
                      {/* Connection line */}
                      <div className={`absolute ${milestone.position === "top" ? "bottom-0 translate-y-full" : "top-0 -translate-y-full"} left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-neutral-700 to-transparent`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Timeline base line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent"></div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-320px * 6 - 48px * 6));
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-15px) translateX(-10px);
            opacity: 1;
          }
        }

        @keyframes float-delayed-2 {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-18px) translateX(8px);
            opacity: 1;
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 2.5s ease-in-out infinite 0.5s;
        }

        .animate-float-delayed-2 {
          animation: float-delayed-2 2.2s ease-in-out infinite 1s;
        }
      `}</style>
    </section>
  );
};
