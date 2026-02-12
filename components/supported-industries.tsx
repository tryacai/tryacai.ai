"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heading } from "./heading";
import { Link } from "next-view-transitions";
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
  Droplets,
  ChevronDown,
  Wind,
  Scissors,
} from "lucide-react";

interface Industry {
  title: string;
  icon: React.ReactNode;
  slug: string;
  intro: string;
  microcopy: string;
  bullets: string[];
}

interface IndustryAccordionProps {
  industry: Industry;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const IndustryAccordion: React.FC<IndustryAccordionProps> = ({
  industry,
  isOpen,
  onToggle,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{ y: -4 }}
      className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? 'bg-neutral-900/90' : 'bg-neutral-900/60'
      }`}
    >
      {/* Gradient border effect when active */}
      {isOpen && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] opacity-100"></div>
      )}
      
      {/* Card content */}
      <div className={`relative ${isOpen ? 'm-[2px] rounded-xl bg-neutral-900/95' : ''}`}>
        {/* Clickable header */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-800/30 transition-colors duration-200"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-neutral-800/90 to-neutral-900/90 border border-neutral-700 flex-shrink-0">
              {industry.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-transparent">
                {industry.title}
              </h3>
              <p className="text-sm text-white italic font-normal mt-0.5">
                {industry.microcopy}
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-neutral-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2 border-t border-neutral-800">
                <p className="text-sm text-white mb-4 leading-relaxed">
                  {industry.intro}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {industry.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="text-white mt-1 flex-shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/blog/powering-service-businesses#${industry.slug}`}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] text-white text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    See How It Works
                  </Link>
                  <Link
                    href="/contact"
                    className="px-4 py-2 rounded-lg border border-neutral-700 text-neutral-300 text-sm font-medium hover:border-purple-500 hover:text-white transition-all duration-200"
                  >
                    Book a Strategy Call
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const SupportedIndustries = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const industries: Industry[] = [
    {
      title: "Plumbing",
      icon: <Droplets className="w-6 h-6 text-neutral-300 stroke-[1.5]" />,
      slug: "plumbing",
      microcopy: "Stop losing emergency calls.",
      intro: "ACAI handles after-hours emergencies, qualifies urgent requests, and books service appointments instantly so you never miss a high-value lead.",
      bullets: [
        "Emergency call prioritization and routing",
        "Insurance claim call handling and documentation",
        "Estimate scheduling with real-time availability"
      ]
    },
    {
      title: "HVAC",
      icon: <Wind className="w-6 h-6 text-neutral-300 stroke-[1.5]" />,
      slug: "hvac",
      microcopy: "Book more installs.",
      intro: "ACAI qualifies system replacement leads, schedules maintenance appointments, and handles emergency repair requests to keep your technicians busy year-round.",
      bullets: [
        "Emergency repair call prioritization",
        "System replacement lead qualification",
        "Seasonal maintenance scheduling automation"
      ]
    },
    {
      title: "Barbershops & Salons",
      icon: <Scissors className="w-6 h-6 text-neutral-300 stroke-[1.5]" />,
      slug: "barbers-salons",
      microcopy: "Keep chairs filled.",
      intro: "ACAI manages appointment bookings, sends reminders, and handles last-minute cancellations so you can focus on delivering exceptional service to every client.",
      bullets: [
        "Appointment booking and rescheduling",
        "No-show reduction with automated reminders",
        "New client intake and service preferences"
      ]
    },
    {
      title: "Roofers",
      icon: <Home className="w-6 h-6 text-neutral-300 stroke-[1.5]" />,
      slug: "roofers",
      microcopy: "Turn quote requests into booked jobs.",
      intro: "ACAI qualifies storm damage leads, routes insurance calls, and schedules estimates automatically while you focus on completing projects.",
      bullets: [
        "Storm damage intake qualification",
        "Insurance claim call routing",
        "Estimate scheduling automation"
      ]
    },
    {
      title: "Mechanics",
      icon: <Wrench className="w-6 h-6 text-neutral-300 stroke-[1.5]" />,
      slug: "mechanics",
      microcopy: "Keep bays full.",
      intro: "ACAI manages service reminders, automates diagnostic intake, and confirms parts availability to maximize shop utilization and customer satisfaction.",
      bullets: [
        "Service appointment reminders and booking",
        "Diagnostic intake automation",
        "Parts availability confirmation workflows"
      ]
    },
    {
      title: "Auto Detailing",
      icon: <Car className="w-6 h-6 text-neutral-300 stroke-[1.5]" />,
      slug: "auto-detailing",
      microcopy: "Book appointments while you detail.",
      intro: "ACAI handles package selection, schedules detailing appointments, and sends service reminders so you can focus on delivering premium results.",
      bullets: [
        "Package selection and upsell prompts",
        "Appointment scheduling and reminders",
        "Follow-up for recurring maintenance bookings"
      ]
    },
    {
      title: "Cleaning Services",
      icon: <Sparkles className="w-6 h-6 text-neutral-300 stroke-[1.5]" />,
      slug: "cleaning-services",
      microcopy: "Scale without adding staff.",
      intro: "ACAI automates recurring bookings, handles quote requests, and sends service reminders so your team can focus on delivering spotless results.",
      bullets: [
        "Recurring service scheduling and reminders",
        "Quote request intake and qualification",
        "No-show reduction with automated confirmations"
      ]
    },
    {
      title: "Electricians",
      icon: <Zap className="w-6 h-6 text-neutral-300 stroke-[1.5]" />,
      slug: "electricians",
      microcopy: "Never miss an emergency call.",
      intro: "ACAI prioritizes emergency requests, manages panel upgrade bookings, and coordinates permit scheduling so you can deliver safe, timely service.",
      bullets: [
        "Emergency call prioritization",
        "Panel upgrade booking and qualification",
        "Permit scheduling workflows"
      ]
    },
    {
      title: "Landscaping",
      icon: <Leaf className="w-6 h-6 text-neutral-300 stroke-[1.5]" />,
      slug: "landscaping",
      microcopy: "Fill your schedule year-round.",
      intro: "ACAI manages seasonal service reminders, automates recurring maintenance bookings, and follows up on quotes to keep your crews busy.",
      bullets: [
        "Seasonal service reminders",
        "Recurring maintenance booking",
        "Quote follow-up automation"
      ]
    },
    {
      title: "Pest Control",
      icon: <Bug className="w-6 h-6 text-neutral-300 stroke-[1.5]" />,
      slug: "pest-control",
      microcopy: "Maximize recurring revenue.",
      intro: "ACAI schedules recurring treatments, automates inspection bookings, and sends service agreement reminders to increase customer lifetime value.",
      bullets: [
        "Recurring treatment scheduling",
        "Inspection booking automation",
        "Service agreement reminders"
      ]
    },
    {
      title: "Med Spas",
      icon: <HeartPulse className="w-6 h-6 text-neutral-300 stroke-[1.5]" />,
      slug: "med-spas",
      microcopy: "Fill treatment rooms.",
      intro: "ACAI handles consultation bookings, package follow-ups, and no-show reduction so you can deliver exceptional patient experiences.",
      bullets: [
        "Treatment consultation booking",
        "Package follow-up automation",
        "No-show reduction reminders"
      ]
    },
    {
      title: "Chiropractors",
      icon: <Activity className="w-6 h-6 text-neutral-300 stroke-[1.5]" />,
      slug: "chiropractors",
      microcopy: "Improve patient retention.",
      intro: "ACAI automates new patient intake, schedules recurring adjustments, and routes insurance verification to keep your practice running smoothly.",
      bullets: [
        "New patient intake automation",
        "Recurring adjustment scheduling",
        "Insurance verification routing"
      ]
    }
  ];

  return (
    <div className="relative z-20 py-16 lg:py-24">
      <Heading as="h2" size="md">More Industries We Support</Heading>
      <p className="text-center mt-6 text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4">
        <span className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-transparent font-semibold">
          ACAI
        </span>
        {" "}adapts to your industry's unique workflow.
      </p>

      {/* Grid layout with accordion */}
      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {industries.map((industry, index) => (
          <IndustryAccordion
            key={industry.slug}
            industry={industry}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
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
