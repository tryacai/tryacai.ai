"use client";

import React from "react";
import { Container } from "./container";

const milestones = [
  {
    date: "Early November 2025",
    title: "Start of ACAI",
    description:
      "Initial experimentation with Retell AI, workflows, and voice automation systems.",
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
    title: "XUNA AI Partnership",
    description:
      "Partnering with XUNA AI and building on top of their production-grade infrastructure.",
    position: "top",
  },
  {
    date: "Mid December 2025",
    title: "Website Launch",
    description:
      "Launching the ACAI website with systems overview and pricing.",
    position: "bottom",
  },
  {
    date: "Late December 2025",
    title: "First Live Client",
    description:
      "Onboarding our first active client into a live production environment.",
    position: "top",
  },
];

export function Roadmap() {
  return (
    <section className="relative py-24 overflow-hidden">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Our Journey
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
            Follow how ACAI came to life step by step.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-900 to-transparent" />

          {/* Scroll area */}
          <div className="overflow-hidden">
            <div className="roadmap-track flex gap-16 items-center py-16">
              {[...milestones, ...milestones].map((m, i) => (
                <div
                  key={i}
                  className={`relative w-80 flex-shrink-0 ${
                    m.position === "top" ? "mb-32" : "mt-32"
                  } group`}
                >
                  {/* Glow */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-900/40 via-red-800/20 to-blue-900/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Card */}
                  <div className="relative rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-md p-6 transition-all duration-300 group-hover:scale-[1.05] group-hover:border-red-900/50 group-hover:shadow-2xl group-hover:shadow-red-900/20">
                    <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-red-950/40 text-red-400 border border-red-900/40">
                      {m.date}
                    </span>

                    <h3 className="text-xl font-bold text-neutral-200 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {m.title}
                    </h3>

                    <p className="mt-2 text-sm text-neutral-400">
                      {m.description}
                    </p>

                    {/* Connector */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-red-900 to-transparent ${
                        m.position === "top"
                          ? "bottom-0 translate-y-full"
                          : "top-0 -translate-y-full"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .roadmap-track {
          animation: scroll 45s linear infinite;
        }

        .roadmap-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
