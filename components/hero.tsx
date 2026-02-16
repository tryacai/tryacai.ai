"use client";

import Balancer from "react-wrap-balancer";
import { Button } from "./button";
import { HiArrowRight } from "react-icons/hi2";
import { Badge } from "./badge";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
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
      className="text-2xl md:text-4xl lg:text-8xl font-semibold max-w-6xl mx-auto text-center mt-6 relative z-10 whitespace-nowrap"
    >
      {/* Render prefix in solid white and suffix with one continuous gradient span */}
      {(() => {
        const base = "Never Miss a ";
        const baseLen = base.length;
        const prefix = text.slice(0, Math.min(text.length, baseLen)).replace(/ /g, "\u00A0");
        const suffix = text.length > baseLen ? text.slice(baseLen).replace(/ /g, "\u00A0") : "";
        return (
          <span>
            <span className="text-white inline-block">{prefix}</span>
            {suffix && (
              <span
                className="inline-block bg-gradient-to-r from-red-500 via-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                style={{
                  filter:
                    "blur(0.4px) drop-shadow(0 0 8px rgba(239, 68, 68, 0.3)) drop-shadow(0 0 12px rgba(168, 85, 247, 0.2)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.1))",
                }}
              >
                {suffix}
              </span>
            )}
            <motion.span
              className="inline-block ml-1 align-baseline"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            >
              |
            </motion.span>
          </span>
        );
      })()}
    </motion.h1>
  );
};

// Primary Demo Card Component
interface PrimaryDemoCardProps {
  delay: number;
}

const PrimaryDemoCard = ({ delay }: PrimaryDemoCardProps) => {
  const { toggleConversation, isConversationActive, isLoading, callState } = useRetellVoiceDemo('acai');
  
  // Mic button state colors
  const getMicButtonStyle = () => {
    if (callState === 'active') return 'bg-green-500';
    if (callState === 'connecting') return 'bg-yellow-500 animate-pulse';
    if (callState === 'stopping') return 'bg-red-500';
    return 'bg-neutral-600'; // idle
  };

  const getStatusText = () => {
    if (callState === 'active') return 'LIVE';
    if (callState === 'connecting') return 'Connecting...';
    if (callState === 'stopping') return 'Ending...';
    return 'Click to start call';
  };

  const getStatusColor = () => {
    if (callState === 'active') return 'text-green-400';
    if (callState === 'connecting') return 'text-yellow-400';
    if (callState === 'stopping') return 'text-red-400';
    return 'text-neutral-400';
  };

  return (
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
        delay,
      }}
      className="flex flex-col items-center justify-center max-w-2xl mx-auto w-full px-4"
    >
      {/* Animated gradient border wrapper */}
      <div className="relative w-full p-[2px] rounded-2xl bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] animate-gradient-flow">
        {/* Inner card with dark background */}
        <div className={`w-full bg-black/70 dark:bg-neutral-900/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 transition-all duration-300 ${
          isConversationActive ? 'shadow-[0_0_60px_rgba(123,0,255,0.6)]' : 'shadow-lg'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              🎙 Experience the ACAI Concierge™
            </h3>
            {isConversationActive && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.6)]"
              >
                <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                LIVE
              </motion.span>
            )}
          </div>
          <p className="text-base md:text-lg text-neutral-300 dark:text-neutral-400 mb-8">
            This is our live AI receptionist handling real-time conversations. No scripts. Books directly into our calendar.
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <button
                onClick={toggleConversation}
                disabled={isLoading}
                className={`w-24 h-24 rounded-full ${getMicButtonStyle()} flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-500/50 active:scale-95 relative z-10 ${
                  isLoading ? 'cursor-not-allowed' : ''
                }`}
                aria-label="Start ACAI voice demo"
              >
                <Mic className="w-12 h-12 text-white" />
              </button>
              {isConversationActive && (
                <>
                  <div className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-pulse scale-125" />
                  <div className="absolute inset-0 rounded-full bg-green-500/30 blur-2xl scale-150 animate-pulse" />
                </>
              )}
            </div>
            <div className={`text-center font-semibold transition-all duration-300 ${getStatusColor()}`}>
              {getStatusText()}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Secondary Demo Card Component (Triangle Layout)
interface SecondaryDemoCardProps {
  title: string;
  scenario: 'plumbing' | 'barber';
  delay: number;
}

const SecondaryDemoCard = ({ title, scenario, delay }: SecondaryDemoCardProps) => {
  const { toggleConversation, isConversationActive, isLoading, callState } = useRetellVoiceDemo(scenario);
  
  const getMicButtonStyle = () => {
    if (callState === 'active') return 'bg-green-500';
    if (callState === 'connecting') return 'bg-yellow-500 animate-pulse';
    if (callState === 'stopping') return 'bg-red-500';
    return 'bg-neutral-600';
  };

  const getStatusText = () => {
    if (callState === 'active') return 'LIVE';
    if (callState === 'connecting') return 'Connecting...';
    return 'Click to start';
  };

  const getStatusColor = () => {
    if (callState === 'active') return 'text-green-400';
    if (callState === 'connecting') return 'text-yellow-400';
    return 'text-neutral-400';
  };

  return (
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
        delay,
      }}
      className="flex flex-col items-center justify-center"
    >
      <div className="relative w-full p-[1.5px] rounded-xl bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff]">
        <div className={`w-full bg-black/70 dark:bg-neutral-900/90 backdrop-blur-sm rounded-xl p-5 transition-all duration-300 ${
          isConversationActive ? 'shadow-[0_0_30px_rgba(123,0,255,0.4)]' : 'shadow-md'
        }`}>
          <h4 className="text-base font-semibold text-white mb-3 text-center">
            {title}
          </h4>
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <button
                onClick={toggleConversation}
                disabled={isLoading}
                className={`w-14 h-14 rounded-full ${getMicButtonStyle()} flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 active:scale-95 relative z-10`}
                aria-label={`Start ${title} demo`}
              >
                <Mic className="w-7 h-7 text-white" />
              </button>
              {isConversationActive && (
                <div className="absolute inset-0 rounded-full bg-green-500/30 blur-xl scale-150 animate-pulse" />
              )}
            </div>
            <div className={`text-xs font-medium transition-all duration-300 ${getStatusColor()}`}>
              {getStatusText()}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Hero = () => {
  const router = useRouter();
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
          Reliable AI-powered solutions for service businesses.
        </Balancer>
      </motion.p>

      {/* Primary Demo - Centered and Large */}
      <div className="mt-12 relative z-10 w-full">
        <PrimaryDemoCard delay={0.25} />
      </div>

      {/* Secondary Demos - Triangle Layout */}
      <div className="mt-8 relative z-10 max-w-3xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SecondaryDemoCard
            title="Plumbing & HVAC Demo"
            scenario="plumbing"
            delay={0.3}
          />
          <SecondaryDemoCard
            title="Barbershop Demo"
            scenario="barber"
            delay={0.35}
          />
        </div>
        <p className="text-xs text-neutral-500 mt-4 text-center italic">
          Initial connection may take 3–5 seconds. Only one demo can be active at a time.
        </p>
      </div>

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
        className="flex items-center gap-4 justify-center mt-10 relative z-10"
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
    </div>
  );
};
