"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heading } from "./heading";
import { Link } from "next-view-transitions";

const levels = [
  {
    level: "TIER 1",
    title: "AI Receptionist",
    slug: "/solutions/ai-receptionist",
    anchor: "#receptionist",
  },
  {
    level: "TIER 2",
    title: "Follow-Ups + Review Automation + Missed Call Text",
    slug: "/solutions/automation-system",
    anchor: "#automation",
  },
  {
    level: "TIER 3",
    title: "Full AI Infrastructure + Quote Routing + Multi Location",
    slug: "/solutions/full-infrastructure",
    anchor: "#infrastructure",
  },
];

export const ScalingLadder = () => {
  return (
    <section className="relative z-20 py-10 lg:py-20 w-full">
      <Heading as="h2" size="md">
        The ACAI Growth Ladder
      </Heading>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((item, index) => (
          <motion.div
            key={item.level}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.12 }}
            whileHover={{ 
              y: -4,
              transition: { duration: 0.2 }
            }}
            className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 px-6 py-6 hover:border-transparent hover:shadow-[0_0_18px_rgba(168,85,247,0.24)] hover:bg-gradient-to-br hover:from-[#ff003c]/10 hover:via-[#7b00ff]/10 hover:to-[#0066ff]/10 transition-all duration-200 ease-out relative overflow-hidden"
          >
            {/* Gradient glow border on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] p-[1px]">
              <div className="h-full w-full rounded-2xl bg-white dark:bg-neutral-900" />
            </div>
            
            <div className="relative z-10">
              <div className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:via-purple-500 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-200 ease-out">
                {item.level}
              </div>
              <div className="mt-3 text-base md:text-lg font-semibold text-neutral-900 dark:text-white leading-snug min-h-[3.5rem]">
                {item.title}
              </div>
              
              {/* Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={`/blog/powering-service-businesses${item.anchor}`}
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-700 dark:text-neutral-300 transition-all duration-150 ease-out hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:scale-105"
                >
                  Learn More
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff1a1a] via-[#a100ff] to-[#004cff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-150 ease-out hover:shadow-lg hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
