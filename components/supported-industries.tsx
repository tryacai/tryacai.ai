"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heading } from "./heading";
import {
  Home,
  Wrench,
  Car,
  Sparkles,
  Zap,
  Leaf,
  Bug,
  HeartPulse,
  Activity,
} from "lucide-react";

interface IndustryCardProps {
  title: string;
  icon: React.ReactNode;
  index: number;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ title, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all duration-300 group"
    >
      <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg group-hover:bg-gradient-to-br group-hover:from-purple-100 group-hover:to-blue-100 dark:group-hover:from-purple-900/30 dark:group-hover:to-blue-900/30 transition-all duration-300">
        {icon}
      </div>
      <h4 className="text-base font-semibold text-black dark:text-white">
        {title}
      </h4>
    </motion.div>
  );
};

export const SupportedIndustries = () => {
  const industries = [
    { title: "Roofers", icon: <Home className="w-6 h-6 text-neutral-700 dark:text-neutral-300" /> },
    { title: "Mechanics", icon: <Wrench className="w-6 h-6 text-neutral-700 dark:text-neutral-300" /> },
    { title: "Auto Detailing", icon: <Car className="w-6 h-6 text-neutral-700 dark:text-neutral-300" /> },
    { title: "Cleaning Services", icon: <Sparkles className="w-6 h-6 text-neutral-700 dark:text-neutral-300" /> },
    { title: "Electricians", icon: <Zap className="w-6 h-6 text-neutral-700 dark:text-neutral-300" /> },
    { title: "Landscaping", icon: <Leaf className="w-6 h-6 text-neutral-700 dark:text-neutral-300" /> },
    { title: "Pest Control", icon: <Bug className="w-6 h-6 text-neutral-700 dark:text-neutral-300" /> },
    { title: "Med Spas", icon: <HeartPulse className="w-6 h-6 text-neutral-700 dark:text-neutral-300" /> },
    { title: "Chiropractors", icon: <Activity className="w-6 h-6 text-neutral-700 dark:text-neutral-300" /> },
  ];

  return (
    <div className="relative z-20 py-10 lg:py-20">
      <Heading as="h2" size="md">More Industries We Support</Heading>
      <p className="text-center mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
        ACAI AI adapts to your industry's unique needs
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto px-4">
        {industries.map((industry, index) => (
          <IndustryCard
            key={industry.title}
            title={industry.title}
            icon={industry.icon}
            index={index}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-8"
      >
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Don't see your industry? <span className="text-purple-600 dark:text-purple-400 font-medium">Contact us</span> for custom solutions.
        </p>
      </motion.div>
    </div>
  );
};
