"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heading } from "./heading";

const stats = [
  { label: "1 in 3 service calls go unanswered", value: "33%" },
  { label: "85% of customers won’t call back if unanswered", value: "85%" },
  { label: "Emergency calls convert 2.5x higher", value: "2.5x" },
  { label: "Up to 40% of high-ticket jobs come after hours", value: "40%" },
];

export const MissedCallStats = () => {
  const [missedCalls, setMissedCalls] = useState(17);
  const [lostRevenue, setLostRevenue] = useState(4300);

  // Subtle animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMissedCalls((prev) => (prev >= 25 ? 17 : prev + 1));
      setLostRevenue((prev) => (prev >= 6500 ? 4300 : prev + 250));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-20 py-10 lg:py-16 w-full">
      <Heading as="h2" size="md">
        Every Missed Call Is Lost Revenue.
      </Heading>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 px-6 py-6 text-center hover:-translate-y-1 hover:shadow-[0_0_16px_rgba(255,0,150,0.18)] transition-all duration-200 ease-out"
          >
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2 relative overflow-hidden">
              {stat.value}
              <span className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-700" />
            </div>
            <div className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dramatic Counter Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 max-w-xl mx-auto rounded-2xl border-2 border-red-500/30 bg-gradient-to-br from-red-950/20 via-neutral-900/90 to-neutral-950/90 backdrop-blur-sm px-8 py-8 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
      >
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <div className="text-sm uppercase tracking-wider text-neutral-400 mb-2">
              Calls Missed This Month
            </div>
            <motion.div
              key={missedCalls}
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-red-500"
            >
              {missedCalls}
            </motion.div>
          </div>
          <div>
            <div className="text-sm uppercase tracking-wider text-neutral-400 mb-2">
              Potential Revenue Lost
            </div>
            <motion.div
              key={lostRevenue}
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-red-500"
            >
              ${lostRevenue.toLocaleString()}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
