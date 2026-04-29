"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scissors, Car, Droplets, Wrench, Sparkles } from "lucide-react";
import { DashboardDemo } from "./dashboard-demo";

export const IndustryDashboard = () => {
  const industries = [
    {
      name: "Barbershops",
      icon: Scissors,
      color: "from-red-500 to-pink-500",
    },
    {
      name: "Auto Detailing",
      icon: Car,
      color: "from-purple-500 to-violet-500",
    },
    {
      name: "Salons",
      icon: Sparkles,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Cleaning Services",
      icon: Droplets,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Plumbing & HVAC",
      icon: Wrench,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="w-full py-10 md:py-16 relative z-10">
      {/* Industry Support Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-3">
          Our Specialty: Service Businesses
        </h2>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Mica Growth's AI automation is customized to fit the unique needs of service industries
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
        {industries.map((industry, index) => (
          <motion.div
            key={industry.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg">
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-br ${industry.color} flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}
              >
                <industry.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {industry.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CRM Integration Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mb-8 max-w-3xl mx-auto px-4"
      >
        <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white mb-3">
          AI Receptionists with Full CRM Access
        </h3>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
          Every client receives their own GoHighLevel CRM with AI receptionists that manage calls, track opportunities, and organize contacts—all in one place. Never miss a call, always stay organized.
        </p>
      </motion.div>

      {/* Dashboard Demo with border container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="px-4"
      >
        <div className="p-4 border border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 rounded-[32px] relative max-w-6xl mx-auto">
          <div className="absolute inset-x-0 bottom-0 h-40 w-full bg-gradient-to-b from-transparent via-white to-white dark:via-black/50 dark:to-black scale-[1.1] pointer-events-none" />
          <div className="p-2 bg-white dark:bg-black dark:border-neutral-700 border border-neutral-200 rounded-[24px]">
            <DashboardDemo />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
