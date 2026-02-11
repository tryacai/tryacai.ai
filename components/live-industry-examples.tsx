"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { Heading } from "./heading";
import { useRetellVoiceDemo, RetellScenario } from "./RetellVoiceDemo";
import { Wrench, Scissors } from "lucide-react";

interface IndustryDemoCardProps {
  title: string;
  description: string;
  scenario: RetellScenario;
  icon: React.ReactNode;
}

const IndustryDemoCard: React.FC<IndustryDemoCardProps> = ({
  title,
  description,
  scenario,
  icon,
}) => {
  const { toggleConversation, isConversationActive, isLoading } = useRetellVoiceDemo(scenario);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              {title}
            </h3>
            {isConversationActive && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                LIVE
              </motion.span>
            )}
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={toggleConversation}
          disabled={isLoading}
          className={`w-14 h-14 rounded-full bg-gradient-to-r from-[#ff1a1a] via-[#a100ff] to-[#004cff] flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#a100ff] focus:ring-offset-2 active:scale-95 relative ${
            isConversationActive ? 'animate-pulse' : ''
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={`Try ${title} demo`}
        >
          <Mic className="w-7 h-7 text-white" />
          {isConversationActive && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff1a1a] via-[#a100ff] to-[#004cff] opacity-30 animate-pulse scale-125" />
          )}
        </button>
        <div className="flex-1">
          <p className={`text-sm font-medium transition-colors duration-300 ${
            isConversationActive
              ? 'text-green-600 dark:text-green-400'
              : isLoading
              ? 'text-orange-600 dark:text-orange-400'
              : 'text-neutral-600 dark:text-neutral-400'
          }`}>
            {isLoading ? 'Connecting...' : isConversationActive ? 'Call is live' : 'Click to start call'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const LiveIndustryExamples = () => {
  return (
    <div className="relative z-20 py-10 lg:py-20">
      <Heading as="h2" size="md">Built for Service Businesses</Heading>
      <p className="text-center mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
        Experience our AI receptionists in action across different industries
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto px-4">
        <IndustryDemoCard
          title="Plumbing & HVAC"
          description="AI receptionist handling emergency calls, scheduling repairs, and managing service requests 24/7."
          scenario="plumbing"
          icon={<Wrench className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
        />
        <IndustryDemoCard
          title="Barbershops & Salons"
          description="Smart booking system managing appointments, handling walk-ins, and confirming schedules automatically."
          scenario="barber"
          icon={<Scissors className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
        />
      </div>
    </div>
  );
};
