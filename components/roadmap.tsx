"use client";

import React from "react";
import { Container } from "./container";

export const Roadmap = () => {
  const milestones = [
    {
      date: "Early November 2025",
      title: "Start of ACAI",
      description: "Initial experimentation. Learning Retell AI, workflows, and voice automation systems while exploring real-world receptionist use cases.",
      position: "top"
    },
    {
      date: "Mid November 2025",
      title: "Legal Formation",
      description: "Filing ACAI as an LLC and establishing the company as an official legal business entity.",
      position: "bottom"
    },
    {
      date: "Early December 2025",
      title: "Partnership with XUNA AI",
      description: "Partnering with XUNA AI and building on top of their reliable, production-grade infrastructure while learning from their systems.",
      position: "top"
    },
    {
      date: "Mid December 2025",
      title: "Website Platform Launch",
      description: "Launching the ACAI website so users can review our platform, systems, workflows, and pricing.",
      position: "bottom"
    },
    {
      date: "Late December 2025",
      title: "First Live Client",
      description: "Onboarding and supporting our first real, active client using ACAI's AI receptionist.",
      position: "top"
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
            <div className="flex gap-12 animate-scroll items-center">
              {/* Render milestones twice for seamless loop */}
              {[...milestones, ...milestones].map((milestone, index) => (
                <div
                  key={index}
                  className={`roadmap-card flex-shrink-0 w-80 ${
                    milestone.position === "top" ? "mt-0 mb-24" : "mt-24 mb-0"
                  } group`}
                >
                  <div className="relative">
                    {/* Glow effect container - dark red and blue, only on active card */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-900/30 via-blue-900/20 to-red-900/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:duration-200"></div>
                    
                    {/* Particle effects - only on active card */}
                    <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-1/4 w-1.5 h-1.5 bg-red-500 rounded-full animate-float"></div>
                      <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-float-delayed"></div>
                      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-red-600 rounded-full animate-float"></div>
                      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-red-500 rounded-full animate-float-delayed-2"></div>
                      <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-blue-500 rounded-full animate-float"></div>
                      <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-red-600 rounded-full animate-float-delayed"></div>
                      <div className="absolute bottom-1/2 left-1/2 w-1.5 h-1.5 bg-red-500 rounded-full animate-float-delayed-2"></div>
                    </div>
                    
                    {/* Card content - neutral by default, highlighted on hover */}
                    <div className="relative p-6 rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-md transition-all duration-300 group-hover:border-red-900/50 group-hover:bg-neutral-900 group-hover:scale-[1.05] group-hover:shadow-2xl group-hover:shadow-red-900/20">
                      {/* Date badge - dark red theme, more visible on hover */}
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-neutral-800/50 border border-neutral-700 text-neutral-400 mb-3 group-hover:bg-gradient-to-r group-hover:from-red-950/40 group-hover:via-blue-950/30 group-hover:to-red-950/40 group-hover:border-red-900/40 group-hover:text-red-400 transition-all duration-300">
                        {milestone.date}
                      </div>
                      
                      {/* Title - neutral by default, gradient on hover */}
                      <h3 className="text-xl font-bold mb-3 text-neutral-300 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:via-blue-500 group-hover:to-red-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {milestone.title}
                      </h3>
                      
                      {/* Description - slightly dimmed by default, brighter on hover */}
                      <p className="text-sm text-neutral-500 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
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
            transform: translateX(calc(-320px * 5 - 48px * 5));
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
