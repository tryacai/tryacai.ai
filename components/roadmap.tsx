"use client";

import React from "react";

const milestones = [
  {
    date: "Early November 2025",
    title: "Start of ACAI",
    description:
      "Initial experimentation with Retell AI, workflows, and voice automation systems.",
  },
  {
    date: "Mid November 2025",
    title: "Forming the Company",
    description:
      "ACAI officially formed as an LLC and structured as a legal business.",
  },
  {
    date: "Early December 2025",
    title: "XUNA AI Partnership",
    description:
      "Partnered with XUNA AI and began building on top of their production-grade infrastructure.",
  },
  {
    date: "Mid December 2025",
    title: "Website Launch",
    description:
      "Launched the ACAI website showcasing systems, pricing, and platform vision.",
  },
  {
    date: "Late December 2025",
    title: "First Live Client",
    description:
      "Onboarded our first active customer using ACAI in a real production environment.",
  },
];

export function Roadmap() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-white">
          Our Roadmap
        </h2>
        <p className="mt-3 text-center text-neutral-400 max-w-2xl mx-auto">
          How ACAI came together and what we’ve built step by step.
        </p>
      </div>

      <div className="mt-20 overflow-hidden">
        <div className="flex gap-16 animate-scroll hover:[animation-play-state:paused] px-12">
          {[...milestones, ...milestones].map((m, i) => {
            const isTop = i % 2 === 0;

            return (
              <div
                key={i}
                className={`relative min-w-[300px] transition-all duration-300 ${
                  isTop ? "mt-0" : "mt-20"
                } group`}
              >
                {/* Glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-600/30 via-purple-600/30 to-blue-600/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-md p-6 transition-all duration-300 group-hover:scale-[1.04] group-hover:border-neutral-600">
                  <span className="inline-block mb-3 rounded-full px-3 py-1 text-xs font-medium bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 text-neutral-200">
                    {m.date}
                  </span>

                  <h3 className="text-lg font-semibold text-white">
                    {m.title}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-400">
                    {m.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scroll 45s linear infinite;
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
