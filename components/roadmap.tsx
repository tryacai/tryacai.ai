"use client";

import React from "react";
import { Container } from "./container";

export const Roadmap = () => {
  const milestones = [
    {
      date: "Q3 2024",
      title: "Internal Alpha",
      description: "Initial testing and development phase with internal team."
    },
    {
      date: "Q4 2024",
      title: "Live Client Demos",
      description: "Real-world demonstrations with select service businesses."
    },
    {
      date: "Q1 2025",
      title: "Expanded Integrations",
      description: "Enhanced connectivity with industry-standard tools and platforms."
    },
    {
      date: "Q2 2025",
      title: "AI Receptionist v2",
      description: "Next generation features and improved performance capabilities."
    },
  ];

  return (
    <section className="py-16 w-full relative z-20 overflow-hidden">
      <Container>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-scroll hover:[animation-play-state:paused]">
              {/* Render milestones twice for seamless loop */}
              {[...milestones, ...milestones].map((milestone, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-72 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 backdrop-blur-sm"
                >
                  <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                    {milestone.date}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-288px * 4 - 24px * 4));
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};
