"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heading } from "./heading";
import { Link } from "next-view-transitions";
import {
  Building2,
  Droplets,
  Flame,
  Home,
  ShowerHead,
  Wind,
  Waves,
} from "lucide-react";

const industries = [
  {
    title: "Plumbing",
    slug: "/plumbing",
    description: "Capture emergency service calls around the clock.",
    icon: Droplets,
  },
  {
    title: "HVAC",
    slug: "/hvac",
    description: "Book urgent jobs and seasonal maintenance faster.",
    icon: Wind,
  },
  {
    title: "Sewer & Drain",
    slug: "/sewer-drain",
    description: "Route emergency clogs and backups to your dispatch fast.",
    icon: ShowerHead,
  },
  {
    title: "Septic",
    slug: "/septic",
    description: "Capture urgent septic issues and schedule service quickly.",
    icon: Waves,
  },
  {
    title: "Water Heater Services",
    slug: "/water-heater",
    description: "Prioritize no-hot-water calls and book replacements faster.",
    icon: Flame,
  },
  {
    title: "Residential Plumbing",
    slug: "/residential-plumbing",
    description: "Handle home service calls with clear booking and follow-up.",
    icon: Home,
  },
  {
    title: "Commercial Plumbing",
    slug: "/commercial-plumbing",
    description: "Support higher-volume facilities with reliable call coverage.",
    icon: Building2,
  },
];

export const SupportedIndustries = () => {
  return (
    <section className="relative z-20 py-10 lg:py-20 w-full">
      <div className="mx-auto max-w-6xl">
        <Heading as="h2" size="md" className="text-center">
          Contractor Services We Support
        </Heading>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-3">
        {industries.map((industry, index) => {
          const Icon = industry.icon;

          return (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group relative rounded-xl border border-white/10 bg-black/40 p-6 transition-all duration-300"
            >
              <div className="pointer-events-none absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
              <div className="pointer-events-none absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-[1px] rounded-[11px] bg-black/75" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{industry.title}</h3>
                </div>

                <p className="mt-3 text-sm text-neutral-300">{industry.description}</p>

                <div className="mt-5">
                  <Link
                    href={industry.slug}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-100 transition-all duration-300 hover:border-white/30"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
