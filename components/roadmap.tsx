"use client";

import React from "react";

const milestones = [
  {
    date: "Early November 2025",
    title: "Start of ACAI",
    description:
      "Experimenting, learning Retell AI, workflows, and internal tooling.",
  },
  {
    date: "Mid November 2025",
    title: "Forming the Company",
    description:
      "Filing ACAI as an LLC and formalizing operations.",
  },
  {
    date: "Early December 2025",
    title: "Partnering with XUNA AI",
    description:
      "Building on XUNA AI’s infrastructure and learning from their systems.",
  },
  {
    date: "Mid December 2025",
    title: "Website Launch",
    description:
      "Launching the ACAI website with platform overview and pricing.",
  },
  {
    date: "Late December 2025",
    title: "First Live Client",
    description:
      "Onboarding our first active customer into production.",
  },
];

export function Roadmap() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          Our Roadmap
        </h2>
        <p className="mt-4 text-center text-neutral-600 dark:text-neutral-400">
          A look at how ACAI is coming to life.
        </p>

        <div className="mt-16 overflow-hidden">
          <div className="flex gap-12 animate-scroll hover:[animation-play-state:paused]">
            {[...milestones, ...milestones].map((milestone, idx) => (
              <div
                key={idx}
                className="relative min-w-[280px] rounded-xl border border-neutral-800 bg-neutral-900/90 p-6 text-neutral-100 transition-all hover:scale-[1.03]"
              >
                <span className="inline-block mb-3 rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300">
                  {milestone.date}
                </span>
                <h3 className="text-lg font-semibold">{milestone.title}</h3>
                <p className="mt-2 text-sm text-neutral-400">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
