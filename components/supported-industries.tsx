"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heading } from "./heading";
import { Link } from "next-view-transitions";
import {
  Activity,
  Bug,
  Car,
  Droplets,
  HeartPulse,
  Home,
  Leaf,
  Scissors,
  Sparkles,
  Wind,
  Wrench,
  Zap,
  ChevronDown,
} from "lucide-react";

const industries = [
  {
    title: "Plumbing",
    slug: "/plumbing",
    description: "Handle emergency calls 24/7 and never miss urgent repair requests",
    icon: Droplets,
    features: [
      "Emergency call routing and prioritization",
      "Instant scheduling for urgent repairs",
      "Automatic follow-up for maintenance contracts",
    ],
  },
  {
    title: "HVAC",
    slug: "/hvac",
    description: "Keep systems running and appointments flowing automatically",
    icon: Wind,
    features: [
      "Seasonal maintenance booking automation",
      "Emergency service call management",
      "Customer reminders for filter changes",
    ],
  },
  {
    title: "Barbers",
    slug: "/barbers",
    description: "Fill your chair with automated booking and smart scheduling",
    icon: Scissors,
    features: [
      "Real-time appointment scheduling",
      "SMS reminders to reduce no-shows",
      "Recurring client booking automation",
    ],
  },
  {
    title: "Roofing",
    slug: "/roofing",
    description: "Capture storm leads fast and route high-value quotes instantly",
    icon: Home,
    features: [
      "Storm lead capture and qualification",
      "Insurance claim assistance coordination",
      "Quote follow-up automation",
    ],
  },
  {
    title: "Mechanics",
    slug: "/mechanics",
    description: "Keep bays full with qualified service appointments",
    icon: Wrench,
    features: [
      "Service appointment scheduling",
      "Repair status updates and notifications",
      "Maintenance reminder campaigns",
    ],
  },
  {
    title: "Detailing",
    slug: "/detailing",
    description: "Automated booking for busy weeks and seasonal rushes",
    icon: Car,
    features: [
      "Package selection and booking automation",
      "Mobile service coordination",
      "Subscription and recurring detail management",
    ],
  },
  {
    title: "Cleaning",
    slug: "/cleaning",
    description: "Recurring clients managed on autopilot with smart scheduling",
    icon: Sparkles,
    features: [
      "Recurring appointment automation",
      "Service area routing optimization",
      "Customer preference management",
    ],
  },
  {
    title: "Electricians",
    slug: "/electricians",
    description: "Prioritize urgent electrical calls and route them instantly",
    icon: Zap,
    features: [
      "Emergency vs. standard call routing",
      "Safety inspection scheduling",
      "Commercial project coordination",
    ],
  },
  {
    title: "Landscaping",
    slug: "/landscaping",
    description: "Schedule seasonal work ahead and manage recurring contracts",
    icon: Leaf,
    features: [
      "Seasonal service campaigns",
      "Recurring mowing and maintenance",
      "Quote management for larger projects",
    ],
  },
  {
    title: "Pest Control",
    slug: "/pest-control",
    description: "Recurring treatments stay on track with automated scheduling",
    icon: Bug,
    features: [
      "Treatment schedule automation",
      "Emergency pest call routing",
      "Service reminder notifications",
    ],
  },
  {
    title: "Med Spa",
    slug: "/med-spa",
    description: "Consultations booked and confirmed with personalized care",
    icon: HeartPulse,
    features: [
      "Consultation booking and preparation",
      "Treatment package management",
      "Post-treatment follow-up automation",
    ],
  },
  {
    title: "Chiropractor",
    slug: "/chiropractor",
    description: "New patient intake simplified and existing patients managed",
    icon: Activity,
    features: [
      "New patient intake and scheduling",
      "Recurring adjustment appointments",
      "Insurance verification coordination",
    ],
  },
];

export const SupportedIndustries = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="relative z-20 py-10 lg:py-20 w-full">
      <Heading as="h2" size="md">
        Industries We Support
      </Heading>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {industries.map((industry, index) => {
          const isExpanded = expandedIndex === index;
          const Icon = industry.icon;
          
          return (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`rounded-2xl border ${
                isExpanded 
                  ? 'border-transparent bg-gradient-to-br from-[#ff003c]/20 via-[#7b00ff]/20 to-[#0066ff]/20 shadow-[0_0_24px_rgba(168,85,247,0.3)]' 
                  : 'border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70'
              } transition-all duration-300 overflow-hidden`}
            >
              {/* Card Header */}
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="w-full px-6 py-6 text-left hover:bg-white/50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isExpanded 
                        ? 'bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff]' 
                        : 'bg-neutral-100 dark:bg-neutral-800'
                    } transition-all duration-300`}>
                      <Icon className={`h-5 w-5 ${
                        isExpanded ? 'text-white' : 'text-neutral-600 dark:text-neutral-300'
                      }`} />
                    </div>
                    <div className="text-base font-semibold text-neutral-900 dark:text-white">
                      {industry.title}
                    </div>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-neutral-500 dark:text-neutral-400 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {industry.description}
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 border-t border-neutral-200 dark:border-neutral-700 pt-4">
                      <ul className="space-y-2 mb-4">
                        {industry.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                            <span className="text-purple-500 mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex gap-3 mt-4">
                        <Link
                          href={industry.slug}
                          className="flex-1 inline-flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-700 dark:text-neutral-300 transition-all duration-200 hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                        >
                          Learn More
                        </Link>
                        <Link
                          href="/contact"
                          className="flex-1 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff1a1a] via-[#a100ff] to-[#004cff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-200 hover:shadow-lg hover:scale-105"
                        >
                          Get Started
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
