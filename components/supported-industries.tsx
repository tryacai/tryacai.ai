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
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group relative"
    >
      {/* Card container with glass effect */}
      <div className="relative flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-neutral-900/60 dark:bg-neutral-900/60 border border-neutral-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] hover:border-purple-500/50">
        
        {/* Icon container with perfect centering */}
        <div className="relative flex items-center justify-center h-20 w-20 rounded-xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 border border-neutral-700 transition-all duration-300 group-hover:border-purple-500/30 group-hover:shadow-lg">
          <div className="flex items-center justify-center">
            {icon}
          </div>
        </div>
        
        {/* Title with better typography */}
        <h4 className="text-sm font-semibold text-white text-center leading-tight">
          {title}
        </h4>
      </div>
    </motion.div>
  );
};

export const SupportedIndustries = () => {
  const industries = [
    { title: "Roofers", icon: <Home className="w-7 h-7 text-neutral-300 stroke-[1.5]" /> },
    { title: "Mechanics", icon: <Wrench className="w-7 h-7 text-neutral-300 stroke-[1.5]" /> },
    { title: "Auto Detailing", icon: <Car className="w-7 h-7 text-neutral-300 stroke-[1.5]" /> },
    { title: "Cleaning Services", icon: <Sparkles className="w-7 h-7 text-neutral-300 stroke-[1.5]" /> },
    { title: "Electricians", icon: <Zap className="w-7 h-7 text-neutral-300 stroke-[1.5]" /> },
    { title: "Landscaping", icon: <Leaf className="w-7 h-7 text-neutral-300 stroke-[1.5]" /> },
    { title: "Pest Control", icon: <Bug className="w-7 h-7 text-neutral-300 stroke-[1.5]" /> },
    { title: "Med Spas", icon: <HeartPulse className="w-7 h-7 text-neutral-300 stroke-[1.5]" /> },
    { title: "Chiropractors", icon: <Activity className="w-7 h-7 text-neutral-300 stroke-[1.5]" /> },
  ];

  return (
    <div className="relative z-20 py-16 lg:py-24">
      <Heading as="h2" size="md">More Industries We Support</Heading>
      <p className="text-center mt-6 text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4">
        ACAI AI adapts to your industry's unique needs
      </p>

      {/* Improved grid with better spacing */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto px-4">
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
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mt-12"
      >
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Don't see your industry?{" "}
          <a href="/contact" className="text-purple-500 dark:text-purple-400 font-medium hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
            Contact us
          </a>
          {" "}for custom solutions.
        </p>
      </motion.div>
    </div>
  );
};
