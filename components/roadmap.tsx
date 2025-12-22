"use client";

import React from "react";

const milestones = [
  {
    date: "Early Nov 2025",
    title: "Start of ACAI",
    description:
      "Experimenting, learning, and building early workflows around Retell AI and automation systems.",
  },
  {
    date: "Mid Nov 2025",
    title: "Legal Formation",
    description:
      "Filing as an LLC and officially establishing ACAI as a legal business entity.",
  },
  {
    date: "Early Dec 2025",
    title: "XUNA AI Partnership",
    description:
      "Partnering with XUNA AI and building on top of their production-grade infrastructure.",
  },
  {
    date: "Mid Dec 2025",
    title: "Website Launch",
    description:
      "Launching the ACAI website so businesses can explore our systems, pricing, and vision.",
  },
  {
    date: "Late Dec 2025",
    title: "First Live Client",
    description:
      "Onboarding our first active customer using ACAI in a real production environment.",
  },
];

export function Roadmap() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl text-center mb-12">
        <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          Our Journey
        </h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          A look at how ACAI is coming to life.
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex gap-12 animate-scroll hover:[animation-play-state:paused] px-12">
          {[...milestones, ...milestones].map((milestone, index) => (
            <div
              key={index}
              className="relative min-w-[320px] max-w-[320px]"
            >
              {/* glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-600/20 to-blue-600/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500" />

              <div className="relative rounded-xl border border-neutral-800 bg-neutral-900 p-6 transition-transform duration-300 hover:scale-105">
                <span className="inline-block mb-3 text-xs font-semibold text-red-400">
                  {milestone.date}
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {milestone.title}
                </h3>
                <p className="text-sm text-neutral-400">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 45s linear infinite;
        }
      `}</style>
    </section>
  );
}
