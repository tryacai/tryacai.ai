"use client";

import React from "react";

const milestones = [
  {
    date: "Early Nov 2025",
    title: "Start of ACAI",
    description:
      "Early experimentation with Retell AI, workflows, and voice automation systems.",
    highlight: false,
  },
  {
    date: "Mid Nov 2025",
    title: "Forming the Company",
    description:
      "Filed ACAI as an LLC and established the business as a legal entity.",
    highlight: false,
  },
  {
    date: "Early Dec 2025",
    title: "XUNA AI Partnership",
    description:
      "Partnered with XUNA AI and began building on top of their production-grade infrastructure.",
    highlight: true,
  },
  {
    date: "Mid Dec 2025",
    title: "Website Launch",
    description:
      "Launched the ACAI website to showcase systems, pricing, and live demos.",
    highlight: false,
  },
  {
    date: "Late Dec 2025",
    title: "First Live Client",
    description:
      "Onboarded and supported our first active customer using ACAI in production.",
    highlight: false,
  },
];

export function Roadmap() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-white">
          Our Roadmap
        </h2>
        <p className="mt-3 text-center text-neutral-400 max-w-2xl mx-auto">
          A look at how ACAI came together and where we’re heading.
        </p>
      </div>

      <div className="mt-16 overflow-hidden">
        <div className="flex gap-12 animate-scroll hover:[animation-play-state:paused] px-12">
          {[...milestones, ...milestones].map((m, i) => (
            <div
              key={i}
              className={`relative min-w-[280px] rounded-xl border backdrop-blur-md p-6 transition-all duration-300 ${
                m.highlight
                  ? "border-red-500/50 bg-neutral-900 scale-105 shadow-2xl"
                  : "border-neutral-800 bg-neutral-900/80"
              }`}
            >
              <span className="text-xs text-red-400 font-medium">
                {m.date}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {m.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scroll 40s linear infinite;
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
