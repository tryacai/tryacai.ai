"use client";
import { Container } from "@/components/container";
import { Background } from "@/components/background";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Button } from "@/components/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "next-view-transitions";

const faqs = [
  {
    question: "How fast can I get started with Mica Growth?",
    answer: "You can get started within a few days. After an onboarding call, we'll work with you to train your AI on your specific services and service areas. Once everything is configured, calls will be instantly routed to your Mica Growth assistant.",
  },
  {
    question: "What does it cost?",
    answer: "We offer flexible pricing based on your call volume, so you'll see ROI quickly. We'll provide a custom quote, and most clients find that just a couple of saved jobs cover the cost. We also have month-to-month plans with no long-term commitments—you can cancel anytime if it's not the right fit.",
  },
  {
    question: "Can customers book appointments directly?",
    answer: "Yes! Mica Growth integrates with popular calendar systems like Google Calendar and ServiceTitan, checking real-time availability to book appointments without double bookings or back-and-forth hassle.",
  },
  {
    question: "What if someone wants to speak to a real person?",
    answer: "If a caller needs a human, Mica Growth can transfer the call to you in real-time and notify you immediately. You'll always have the option to jump in and speak with the client directly.",
  },
  {
    question: "Does the AI know my pricing and services?",
    answer: "During onboarding, we train your Mica Growth assistant with all your service details, pricing, and any special instructions so it can respond just like your best employee would.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40 max-w-4xl mx-auto">
          <Heading as="h1">Frequently Asked Questions</Heading>
          <Subheading className="text-center">
            Everything you need to know about Mica Growth and how it can help your business.
          </Subheading>
        </div>

        <div className="relative z-20 w-full max-w-3xl mx-auto space-y-4 mt-10">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-neutral-900"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 pt-2 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="relative z-20 mt-16 text-center max-w-2xl mx-auto">
          <p className="text-neutral-700 dark:text-neutral-300 text-lg mb-6">
            Have any further questions?{" "}
            <Button 
              as={Link} 
              href="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 hover:from-blue-600 hover:via-purple-600 hover:to-red-600 text-white"
            >
              Contact us here
            </Button>
            {" "}and a member of our team will reach back within 24 hours.
          </p>
        </div>
      </Container>
    </div>
  );
}
