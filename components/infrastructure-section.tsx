"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { Globe } from "./globe";

export const InfrastructureSection = () => {
  return (
    <section className="relative z-20 py-10 lg:py-20 w-full">
      <Heading as="h2" size="md">
        Built on Reliable, Seamless Infrastructure
      </Heading>
      <Subheading className="text-center max-w-2xl mx-auto">
        Secure. Scalable. Designed to fit your workflow.
      </Subheading>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 flex flex-col items-center"
      >
        <Globe className="mx-auto" />
        <div className="mt-8 text-center text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-lg">
          <p>ACAI integrates directly into your existing systems. No rigid platforms. No forced changes.</p>
        </div>
      </motion.div>
    </section>
  );
};
