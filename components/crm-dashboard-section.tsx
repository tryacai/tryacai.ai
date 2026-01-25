"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "./container";
import { Scissors, Car, Droplets, Wrench, Sparkles } from "lucide-react";
import { DashboardDemo } from "./dashboard-demo";

export const CRMDashboardSection = () => {
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
    <section className="py-12 md:py-20 relative z-10">
      <Container>
        {/* Industry Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-3">
            Built for Service Businesses
          </h2>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            ACAI's AI automation is customized to fit the unique needs of service industries
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
              <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${industry.color} flex items-center justify-center transition-transform duration-300 group-hover:rotate-12`}
                >
                  <industry.icon className="w-4 h-4 text-white" />
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
          className="text-center mb-8 max-w-3xl mx-auto"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white mb-3">
            AI Receptionists with Full CRM Access
          </h3>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            Every client receives their own GoHighLevel CRM with AI receptionists that manage calls, track opportunities, and organize contacts—all in one place. Never miss a call, always stay organized.
          </p>
        </motion.div>

        {/* Dashboard Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <DashboardDemo />
        </motion.div>
      </Container>
    </section>
  );
};
