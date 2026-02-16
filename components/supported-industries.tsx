"use client";

import React from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

const industries = [
  {
    title: "Plumbing",
    slug: "/plumbing",
    description: "Emergency calls routed instantly.",
    icon: Droplets,
  },
  {
    title: "HVAC",
    slug: "/hvac",
    description: "Schedule repairs without delays.",
    icon: Wind,
  },
  {
    title: "Barbers",
    slug: "/barbers",
    description: "Keep chairs booked automatically.",
    icon: Scissors,
  },
  {
    title: "Roofing",
    slug: "/roofing",
    description: "Capture storm leads fast.",
    icon: Home,
  },
  {
    title: "Mechanics",
    slug: "/mechanics",
    description: "Fill bays with qualified calls.",
    icon: Wrench,
  },
  {
    title: "Detailing",
    slug: "/detailing",
    description: "Automated booking for busy weeks.",
    icon: Car,
  },
  {
    title: "Cleaning",
    slug: "/cleaning",
    description: "Recurring clients on autopilot.",
    icon: Sparkles,
  },
  {
    title: "Electricians",
    slug: "/electricians",
    description: "Prioritize urgent electrical calls.",
    icon: Zap,
  },
  {
    title: "Landscaping",
    slug: "/landscaping",
    description: "Seasonal work scheduled ahead.",
    icon: Leaf,
  },
  {
    title: "Pest Control",
    slug: "/pest-control",
    description: "Recurring treatments stay on track.",
    icon: Bug,
  },
  {
    title: "Med Spa",
    slug: "/med-spa",
    description: "Consultations booked and confirmed.",
    icon: HeartPulse,
  },
  {
    title: "Chiropractor",
    slug: "/chiropractor",
    description: "New patient intake simplified.",
    icon: Activity,
  },
];

export const SupportedIndustries = () => {
  return (
    <section className="relative z-20 py-10 lg:py-20 w-full">
      <Heading as="h2" size="md">
        Industries We Support
      </Heading>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {industries.map((industry, index) => (
          <motion.div
            key={industry.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 px-6 py-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <industry.icon className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              </div>
              <div className="text-base font-semibold text-neutral-900 dark:text-white">
                {industry.title}
              </div>
            </div>
            <div className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
              {industry.description}
            </div>
            <Link
              href={industry.slug}
              className="mt-4 inline-flex items-center rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700 dark:text-neutral-300 transition hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            >
              Learn More
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
