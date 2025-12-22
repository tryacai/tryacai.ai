"use client";

import React, { useState } from "react";
import { Container } from "./container";

const milestones = [
  {
    date: "Early November 2025",
    title: "Start of ACAI",
    description:
      "Initial experimentation. Learning Retell AI, workflows, and voice automation systems.",
    position: "top",
  },
  {
    date: "Mid November 2025",
    title: "Legal Formation",
    description:
      "Filing ACAI as an LLC and establishing the company as a legal entity.",
    position: "bottom",
  },
  {
    date: "Early December 2025",
    title: "Partnership with XUNA AI",
    description:
      "Partnering with XUNA AI and building on top of their production-grade infrastructure.",
    position: "top",
  },
  {
    date: "Mid December 2025",
    title: "Website Platform Launch",
    description:
      "Launching the ACAI website so users can review our platform and pricing.",
    position: "bottom",
  },
  {
    date: "Late December 2025",
    title: "First Live Client",
    description:
      "Onboarding and supporting our first real, active client in production.",
    position: "top",
  },
];

export function Roadmap() {
  const [paused, setPaused] = useState(false);
  const duplicated = [...milestones, ...milestones];

  return (
    <section className="relative py-24 overflow-hidden">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Our Roadmap
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
            Follow how ACAI came to life.
          </p>
        </div>
      </Container>

      {/* Timeline base */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-900 to-transparent" />

      {/* Scroll area */}
      <div className="overflow-hidden">
        <div
          className="roadmap-track flex gap-12 py-20"
          style={{
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {duplicated.map((m, i) => (
            <div
              key={i}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className={`relative w-80 flex-shrink-0 group ${
                m.position === "top" ? "-mt-32" : "mt-32"
              }`}
            >
              {/* Connector */}
              <div
                className={`absolute left-1/2 w-px bg-gradient-to-b from-red-900 to-transparent -translate-x-1/2 ${
                  m.position === "top"
                    ? "top-full h-32"
                    : "bottom-full h-32"
                }`}
              />

              {/* Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-900/50 via-red-800/20 to-blue-900/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card */}
              <div className="relative rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-md p-6 transition-all duration-300 group-hover:scale-105 group-hover:border-red-700/50 group-hover:shadow-2xl group-hover:shadow-red-900/30">
                <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-red-950/40 text-red-400 border border-red-900/40">
                  {m.date}
                </span>

                <h3 className="text-xl font-bold text-neutral-200 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {m.title}
                </h3>

                <p className="mt-2 text-sm text-neutral-400">
                  {m.description}
                </p>

                {/* Hover particles */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {[...Array(7)].map((_, idx) => (
                    <span
                      key={idx}
                      className={`absolute w-1.5 h-1.5 rounded-full ${
                        idx % 2 === 0 ? "bg-red-500" : "bg-blue-500"
                      } particle`}
                      style={{
                        left: `${15 + (idx * 12) % 70}%`,
                        top: `${20 + (idx * 15) % 60}%`,
                        animationDelay: `${idx * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .roadmap-track {
          animation: scroll 22s linear infinite;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .particle {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          50% {
            transform: translate(10px, -20px);
            opacity: 1;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
