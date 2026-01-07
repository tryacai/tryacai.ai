"use client";

import Balancer from "react-wrap-balancer";
import { Button } from "./button";
import { HiArrowRight } from "react-icons/hi2";
import { Badge } from "./badge";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { DashboardDemo } from "./dashboard-demo";
import { useState, useEffect } from "react";
import { useRetellVoiceDemo } from "@/components/RetellVoiceDemo";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";

const TypewriterText = () => {
  const [text, setText] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const phrases = [
    "With ACAI",
    "24/7 AI Call Answering",
    "Instant Scheduling",
    "Guaranteed ROI",
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = 250; // Slightly faster typing speed for better readability
    const deletingSpeed = 100; // Faster deletion
    const pauseAfterTyping = 2000; // Pause for 2 seconds after typing completes
    const pauseAfterDeleting = 500; // Brief pause after deletion before next phrase

    const typeOrDelete = () => {
      if (!isDeleting) {
        // Typing
        if (text.length < currentPhrase.length) {
          setText(currentPhrase.slice(0, text.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseAfterTyping);
          return;
        }
      } else {
        // Deleting
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTimeout(() => {
            // Small pause before typing next phrase
          }, pauseAfterDeleting);
          return;
        }
      }
    };

    const timer = setTimeout(
      typeOrDelete,
      currentPhraseIndex === 0 && text === "" ? 1000 : (isDeleting ? deletingSpeed : typingSpeed)
    );

    return () => {
      clearTimeout(timer);
    };
  }, [text, isDeleting, currentPhraseIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="text-center mt-4 relative z-10 px-4"
    >
      <p className="text-xl md:text-3xl lg:text-5xl font-semibold inline-block max-w-full mx-auto tracking-wider bg-gradient-to-r from-red-500 via-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent whitespace-normal md:whitespace-nowrap"
        style={{
          filter: "blur(0.4px) drop-shadow(0 0 8px rgba(239, 68, 68, 0.3)) drop-shadow(0 0 12px rgba(168, 85, 247, 0.2)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.1))",
        }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            style={{
              marginLeft: char === " " ? "0.5em" : undefined,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{
              y: -4,
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
          >
            {char}
          </motion.span>
        ))}
        <motion.span
          className="inline-block ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          |
        </motion.span>
      </p>
    </motion.div>
  );
};

const TypewriterHeadline = () => {
  const [text, setText] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<"typing-call" | "pause-call" | "deleting" | "typing-job" | "pause-job">("typing-call");

  useEffect(() => {
    const typingSpeed = 250; // Match existing typewriter speed
    const deletingSpeed = 100; // Match existing deletion speed
    const pauseAfterTyping = 2000; // Pause for 2 seconds after typing completes
    const pauseBeforeDeleting = 500; // Brief pause before starting to delete

    const fullPhraseCall = "Never Miss a Call Again";
    const fullPhraseJob = "Never Miss a Job Again";
    const basePhrase = "Never Miss a ";

    const animate = () => {
      switch (phase) {
        case "typing-call":
          if (text.length < fullPhraseCall.length) {
            setText(fullPhraseCall.slice(0, text.length + 1));
          } else {
            setTimeout(() => setPhase("pause-call"), pauseAfterTyping);
            return;
          }
          break;

        case "pause-call":
          setTimeout(() => setPhase("deleting"), pauseBeforeDeleting);
          return;

        case "deleting":
          if (text.length > basePhrase.length) {
            setText(text.slice(0, -1));
          } else {
            setPhase("typing-job");
            return;
          }
          break;

        case "typing-job":
          if (text.length < fullPhraseJob.length) {
            setText(fullPhraseJob.slice(0, text.length + 1));
          } else {
            setTimeout(() => setPhase("pause-job"), pauseAfterTyping);
            return;
          }
          break;

        case "pause-job":
          setTimeout(() => {
            setText(basePhrase);
            setPhase("typing-call");
          }, pauseAfterTyping);
          return;
      }
    };

    const timer = setTimeout(
      animate,
      phase === "deleting" ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [text, phase]);

  return (
    <motion.h1
      initial={{
        y: 40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        ease: "easeOut",
        duration: 0.5,
      }}
      className="text-2xl md:text-4xl lg:text-8xl font-semibold max-w-6xl mx-auto text-center mt-6 relative z-10"
    >
      <span className="bg-gradient-to-r from-red-500 via-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
        style={{
          filter: "blur(0.4px) drop-shadow(0 0 8px rgba(239, 68, 68, 0.3)) drop-shadow(0 0 12px rgba(168, 85, 247, 0.2)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.1))",
        }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={`${phase}-${index}`}
            className="inline-block"
            style={{
              marginLeft: char === " " ? "0.2em" : undefined,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{
              y: -4,
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
        <motion.span
          className="inline-block ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          |
        </motion.span>
      </span>
    </motion.h1>
  );
};

export const Hero = () => {
  const router = useRouter();
  const { toggleConversation, isConversationActive } = useRetellVoiceDemo();
  return (
    <div className="flex flex-col min-h-screen pt-20 md:pt-40 relative overflow-hidden">
      <motion.div
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
        }}
        className="flex justify-center"
      >
        <Badge onClick={() => router.push("/blog/top-5-llm-of-all-time")}>
          <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-semibold blur-[0.3px]">
            Meet the ACAI Team
          </span>
        </Badge>
      </motion.div>
      <TypewriterHeadline />
      <TypewriterText />
      <motion.p
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
          delay: 0.2,
        }}
        className="text-center mt-6 text-base md:text-xl text-muted dark:text-muted-dark max-w-3xl mx-auto relative z-10"
      >
        <Balancer>
          Reliable AI-powered solutions for plumbing and HVAC businesses.
        </Balancer>
      </motion.p>
      <motion.p
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
          delay: 0.25,
        }}
        className="text-center mt-4 text-sm md:text-base max-w-2xl mx-auto relative z-10 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-medium"
      >
        Test one of our active clients&apos; AI receptionists in real time.
      </motion.p>
      <motion.div
        initial={{
          y: 60,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
          delay: 0.3,
        }}
        className="flex flex-col items-center justify-center mt-6 relative z-10 gap-3"
      >
        <div className="relative">
          <button
            onClick={toggleConversation}
            className={`w-16 h-16 rounded-full bg-gradient-to-r from-[#ff1a1a] via-[#a100ff] to-[#004cff] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#a100ff] focus:ring-offset-2 active:scale-95 relative z-10 ${
              isConversationActive ? 'animate-pulse' : ''
            }`}
            aria-label="Voice demo"
          >
            <Mic className="w-8 h-8 text-white" />
          </button>
          {isConversationActive && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff1a1a] via-[#a100ff] to-[#004cff] opacity-30 animate-pulse scale-125" />
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
            isConversationActive
              ? 'text-green-600 dark:text-green-400 italic'
              : 'text-neutral-400 dark:text-neutral-400'
          }`}
        >
          {isConversationActive ? '(call is NOW live)' : 'Try out live call'}
        </motion.div>
        {isConversationActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="text-xs text-neutral-500 dark:text-neutral-400"
          >
            (press again to turn off call)
          </motion.div>
        )}
      </motion.div>
      <motion.div
        initial={{
          y: 80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
          delay: 0.4,
        }}
        className="flex items-center gap-4 justify-center mt-6 relative z-10"
      >
        <Button>Get started</Button>
        <Button
          variant="simple"
          as={Link}
          href="/contact"
          className="flex space-x-2 items-center group"
        >
          <span>Contact us</span>
          <HiArrowRight className="text-muted group-hover:translate-x-1 stroke-[1px] h-3 w-3 transition-transform duration-200 dark:text-muted-dark" />
        </Button>
      </motion.div>
      <div className="p-4 border border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 rounded-[32px] mt-20 relative">
        <div className="absolute inset-x-0 bottom-0 h-40 w-full bg-gradient-to-b from-transparent via-white to-white dark:via-black/50 dark:to-black scale-[1.1] pointer-events-none" />
        <div className="p-2 bg-white dark:bg-black dark:border-neutral-700 border border-neutral-200 rounded-[24px]">
          <DashboardDemo />
        </div>
      </div>
    </div>
  );
};
