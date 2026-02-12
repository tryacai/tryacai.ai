"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Scissors,
  Car,
  Droplets,
  Wind,
  Sparkles,
  Home,
  Wrench,
  Zap,
  Leaf,
  Bug,
  HeartPulse,
  Activity,
} from "lucide-react";

export const IndustryBlogHero = () => {
  const industries = [
    {
      name: "Plumbing",
      icon: Droplets,
      color: "from-red-500 via-purple-500 to-blue-500",
      position: "top-8 left-8",
    },
    {
      name: "HVAC",
      icon: Wind,
      color: "from-red-500 via-purple-500 to-blue-500",
      position: "top-8 right-8",
    },
    {
      name: "Barbershops & Salons",
      icon: Scissors,
      color: "from-red-500 via-purple-500 to-blue-500",
      position: "top-32 left-32",
    },
    {
      name: "Auto Detailing",
      icon: Car,
      color: "from-red-500 via-purple-500 to-blue-500",
      position: "top-32 right-32",
    },
    {
      name: "Cleaning",
      icon: Sparkles,
      color: "from-red-500 via-purple-500 to-blue-500",
      position: "bottom-32 left-32",
    },
    {
      name: "Roofers",
      icon: Home,
      color: "from-red-500 via-purple-500 to-blue-500",
      position: "bottom-32 right-32",
    },
    {
      name: "Mechanics",
      icon: Wrench,
      color: "from-red-500 via-purple-500 to-blue-500",
      position: "bottom-8 left-8",
    },
    {
      name: "Electricians",
      icon: Zap,
      color: "from-red-500 via-purple-500 to-blue-500",
      position: "bottom-8 right-8",
    },
    {
      name: "Landscaping",
      icon: Leaf,
      color: "from-red-500 via-purple-500 to-blue-500",
      position: "top-1/2 left-8",
    },
    {
      name: "Pest Control",
      icon: Bug,
      color: "from-red-500 via-purple-500 to-blue-500",
      position: "top-1/2 right-8",
    },
    {
      name: "Med Spas",
      icon: HeartPulse,
      color: "from-red-500 via-purple-500 to-blue-500",
      position: "top-48 left-16",
    },
    {
      name: "Chiropractors",
      icon: Activity,
      color: "from-red-500 via-purple-500 to-blue-500",
      position: "top-48 right-16",
    },
  ];

  return (
    <div className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950"></div>

      {/* Center heading */}
      <div className="relative z-10 flex items-center justify-center min-h-[400px] md:min-h-[500px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            <span className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-transparent">
              Powering Service Businesses
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-neutral-400">
            Across all industries
          </p>
        </motion.div>

        {/* Floating industry widgets - Desktop only */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2 + index * 0.2,
              }}
              className={`absolute ${industry.position}`}
              style={{
                animation: `float ${3 + index * 0.3}s ease-in-out infinite`,
              }}
            >
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 shadow-lg">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${industry.color} flex items-center justify-center`}
                >
                  <industry.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">
                  {industry.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile & Tablet: Industry tags below heading */}
        <div className="lg:hidden relative z-10 mt-12 flex flex-wrap justify-center gap-3 px-4">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 hover:border-neutral-600 transition-all duration-300 shadow-lg">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${industry.color} flex items-center justify-center`}
                >
                  <industry.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-medium text-white">
                  {industry.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};
