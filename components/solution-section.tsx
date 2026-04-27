"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heading } from "./heading";

const featureBlocks = [
  {
    title: "24/7 Call Answering",
    description: "Never miss another opportunity",
  },
  {
    title: "Instant Scheduling",
    description: "Books appointments automatically",
  },
  {
    title: "Service-Specific",
    description: "Built for service businesses",
  },
];

const messages = [
  { from: "client", text: "Hi, do you have openings this week?" },
  { from: "acai", text: "Yes. Want Tuesday at 2:30 PM?" },
  { from: "client", text: "That works." },
  { from: "acai", text: "Booked. Sending confirmation now." },
];

export const SolutionSection = () => {
  return (
    <section className="relative z-20 py-10 lg:py-20 w-full">
      <Heading as="h2" size="md">
        The System That Handles It For You
      </Heading>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-4">
          {featureBlocks.map((block, index) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 px-6 py-5 backdrop-blur-sm"
            >
              <div className="text-base md:text-lg font-semibold text-neutral-900 dark:text-white">
                {block.title}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {block.description}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-sm">
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] opacity-70 blur-lg" />
            <div className="relative rounded-[2.5rem] border border-neutral-700/60 bg-neutral-950/90 p-4 shadow-2xl">
              <div className="flex items-center justify-between px-2 pb-3">
                <div className="h-2 w-20 rounded-full bg-neutral-800" />
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-neutral-700" />
                  <span className="h-2 w-2 rounded-full bg-neutral-700" />
                </div>
              </div>

              <div className="rounded-[2rem] bg-neutral-900/90 border border-neutral-800 p-4">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
                  <span>Mica Growth SMS Automation</span>
                  <span>Now</span>
                </div>

                <div className="space-y-2">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.text}-${index}`}
                      className={`flex ${
                        message.from === "client" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs md:text-sm leading-relaxed ${
                          message.from === "client"
                            ? "bg-white text-neutral-900"
                            : "bg-neutral-800 text-white"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-neutral-600" />
                  <span className="text-xs text-neutral-500">Message sent automatically</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
