"use client";

import React from "react";
import { motion } from "framer-motion";

const problems = [
  "Stop Running to the Phone",
  "Stop Losing Emergency Calls",
  "Stop Missing High-Value Leads",
];

export const CoreProblem = () => {
  return (
    <section className="relative z-20 py-8 lg:py-16 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {problems.map((problem, index) => (
          <motion.div
            key={problem}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 px-6 py-6 text-center"
          >
            <div className="text-base md:text-lg font-semibold text-neutral-900 dark:text-white">
              {problem}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
