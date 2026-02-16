"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heading } from "./heading";

const levels = [
  {
    level: "Level 1",
    title: "AI Receptionist",
  },
  {
    level: "Level 2",
    title: "Follow-Ups + Review Automation + Missed Call Text",
  },
  {
    level: "Level 3",
    title: "Full AI Infrastructure + Quote Routing + Multi Location",
  },
];

export const ScalingLadder = () => {
  return (
    <section className="relative z-20 py-10 lg:py-20 w-full">
      <Heading as="h2" size="md">
        Start Simple. Scale Fast.
      </Heading>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((item, index) => (
          <motion.div
            key={item.level}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.12 }}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 px-6 py-6"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              {item.level}
            </div>
            <div className="mt-3 text-base md:text-lg font-semibold text-neutral-900 dark:text-white leading-snug">
              {item.title}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
