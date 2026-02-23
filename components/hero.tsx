"use client";

import Balancer from "react-wrap-balancer";
import { Button } from "./button";
import { HiArrowRight } from "react-icons/hi2";
import { Badge } from "./badge";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { RetellWebClient } from "retell-client-js-sdk";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";

type DemoId = "main" | "plumbing" | "barber";

type DemoScenario = "acai" | "plumbing" | "barber";

type DemoConfig = {
  scenario: DemoScenario;
  agentId: string;
  voiceId: string;
  promptConfig: string;
};

const demoConfigs: Record<DemoId, DemoConfig> = {
  main: {
    scenario: "acai",
    agentId: process.env.NEXT_PUBLIC_RETELL_AGENT_ID_ACAI || "acai-agent",
    voiceId: "acai-concierge-voice",
    promptConfig: "acai-concierge",
  },
  plumbing: {
    scenario: "plumbing",
    agentId: process.env.NEXT_PUBLIC_RETELL_AGENT_ID_PLUMBING || "plumbing-agent",
    voiceId: "plumbing-hvac-voice",
    promptConfig: "plumbing-hvac",
  },
  barber: {
    scenario: "barber",
    agentId: process.env.NEXT_PUBLIC_RETELL_AGENT_ID_BARBER || "barber-agent",
    voiceId: "barbershop-voice",
    promptConfig: "barbershop",
  },
};

const TypewriterText = ({
  syncCycle,
  deleteSignal,
  onWithAcaiHoldComplete,
}: {
  syncCycle: number;
  deleteSignal: number;
  onWithAcaiHoldComplete: () => void;
}) => {
  const [text, setText] = useState("");
  const secondaryPhrases = ["24/7 AI Call Answering", "Instant Scheduling", "Guaranteed ROI"];
  const [phase, setPhase] = useState<
    | "typing-with-acai"
    | "holding-with-acai"
    | "waiting-delete"
    | "deleting-with-acai"
    | "typing-secondary"
    | "holding-secondary"
    | "deleting-secondary"
  >("typing-with-acai");
  const [secondaryPhraseIndex, setSecondaryPhraseIndex] = useState(0);
  const lastDeleteSignalRef = useRef(deleteSignal);
  const lastCycleRef = useRef(syncCycle);

  useEffect(() => {
    if (lastCycleRef.current !== syncCycle) {
      lastCycleRef.current = syncCycle;
      setText("");
      setPhase("typing-with-acai");
      setSecondaryPhraseIndex(0);
    }

    if (lastDeleteSignalRef.current !== deleteSignal && phase === "waiting-delete") {
      lastDeleteSignalRef.current = deleteSignal;
      setPhase("deleting-with-acai");
    }
  }, [syncCycle, deleteSignal, phase]);

  useEffect(() => {
    const withAcai = "With ACAI";
    const secondaryPhrase = secondaryPhrases[secondaryPhraseIndex];
    const withAcaiTypingSpeed = 105;
    const normalTypingSpeed = 125;
    const deletingSpeed = 90;
    const withAcaiHold = 3500;
    const secondaryHold = 1000;

    let timer: NodeJS.Timeout;

    if (phase === "typing-with-acai") {
      if (text.length < withAcai.length) {
        timer = setTimeout(
          () => setText(withAcai.slice(0, text.length + 1)),
          withAcaiTypingSpeed
        );
      } else {
        timer = setTimeout(() => {
          setPhase("holding-with-acai");
        }, withAcaiHold);
      }
    } else if (phase === "holding-with-acai") {
      onWithAcaiHoldComplete();
      setPhase("waiting-delete");
    } else if (phase === "deleting-with-acai") {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
      } else {
        setPhase("typing-secondary");
      }
    } else if (phase === "typing-secondary") {
      if (text.length < secondaryPhrase.length) {
        timer = setTimeout(
          () => setText(secondaryPhrase.slice(0, text.length + 1)),
          normalTypingSpeed
        );
      } else {
        timer = setTimeout(() => setPhase("holding-secondary"), secondaryHold);
      }
    } else if (phase === "holding-secondary") {
      setPhase("deleting-secondary");
    } else if (phase === "deleting-secondary") {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
      } else {
        const nextIdx = (secondaryPhraseIndex + 1) % secondaryPhrases.length;
        setSecondaryPhraseIndex(nextIdx);
        setPhase("typing-secondary");
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [
    phase,
    secondaryPhraseIndex,
    text,
    onWithAcaiHoldComplete,
    secondaryPhrases,
  ]);

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

const TypewriterHeadline = ({
  canDelete,
  onWordTyped,
  onDeleteStarted,
}: {
  canDelete: boolean;
  onWordTyped: () => void;
  onDeleteStarted: () => void;
}) => {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<
    "typing-call" |
    "pause-call" |
    "waiting-delete-call" |
    "deleting-call" |
    "typing-job" |
    "pause-job" |
    "waiting-delete-job" |
    "deleting-job"
  >("typing-call");

  useEffect(() => {
    const typingSpeed = 120;
    const deletingSpeed = 95;
    const pauseAfterTyping = 2500;

    const fullPhraseCall = "Never Miss a Call Again";
    const fullPhraseJob = "Never Miss a Job Again";
    const basePhrase = "Never Miss a ";

    let timer: NodeJS.Timeout;

    if (phase === "typing-call") {
      if (text.length < fullPhraseCall.length) {
        timer = setTimeout(
          () => setText(fullPhraseCall.slice(0, text.length + 1)),
          typingSpeed
        );
      } else {
        onWordTyped();
        timer = setTimeout(() => setPhase("pause-call"), pauseAfterTyping);
      }
    } else if (phase === "pause-call") {
      setPhase("waiting-delete-call");
    } else if (phase === "waiting-delete-call") {
      if (canDelete) {
        onDeleteStarted();
        setPhase("deleting-call");
      }
    } else if (phase === "deleting-call") {
      if (text.length > basePhrase.length) {
        timer = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
      } else {
        setPhase("typing-job");
      }
    } else if (phase === "typing-job") {
      if (text.length < fullPhraseJob.length) {
        timer = setTimeout(
          () => setText(fullPhraseJob.slice(0, text.length + 1)),
          typingSpeed
        );
      } else {
        onWordTyped();
        timer = setTimeout(() => setPhase("pause-job"), pauseAfterTyping);
      }
    } else if (phase === "pause-job") {
      setPhase("waiting-delete-job");
    } else if (phase === "waiting-delete-job") {
      if (canDelete) {
        onDeleteStarted();
        setPhase("deleting-job");
      }
    } else if (phase === "deleting-job") {
        if (text.length > 0) {
        if (text.length > basePhrase.length) {
          timer = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
        } else {
          setPhase("typing-call");
        }
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [text, phase, canDelete, onWordTyped, onDeleteStarted]);

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
      className="text-2xl md:text-4xl lg:text-8xl font-semibold max-w-6xl mx-auto text-center mt-6 relative z-10 whitespace-nowrap min-h-[1.2em]"
    >
      {/* Render prefix in solid white and suffix with one continuous gradient span */}
      {(() => {
        const base = "Never Miss a ";
        const baseLen = base.length;
        const fixedPhrase = "Never Miss a Call Again";
        const prefix = text.slice(0, Math.min(text.length, baseLen)).replace(/ /g, "\u00A0");
        const suffix = text.length > baseLen ? text.slice(baseLen).replace(/ /g, "\u00A0") : "";
        return (
          <span className="relative inline-block">
            <span className="invisible inline-block">{fixedPhrase.replace(/ /g, "\u00A0")}</span>
            <span className="absolute left-0 top-0">
              <span className="text-white inline-block">{prefix}</span>
              {suffix && (
                <span
                  className="inline-block bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
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
          </span>
        );
      })()}
    </motion.h1>
  );
};

type EnergyPathProps = {
  d: string;
  active: boolean;
  pulseDuration: number;
};

const EnergyPath = ({ d, active, pulseDuration }: EnergyPathProps) => {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke="rgba(37,99,235,0.26)"
        strokeWidth={active ? 11 : 9}
        strokeLinecap="round"
        className="transition-all duration-300"
      />
      <motion.path
        d={d}
        fill="none"
        stroke="url(#energyGradient)"
        strokeWidth={active ? 5.4 : 4.2}
        strokeLinecap="round"
        animate={{ opacity: active ? [0.85, 1, 0.85] : [0.62, 0.82, 0.62] }}
        transition={{ duration: active ? 1.1 : 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.72)"
        strokeWidth={active ? 1.9 : 1.2}
        strokeLinecap="round"
        animate={{ opacity: active ? [0.2, 0.65, 0.2] : [0.06, 0.25, 0.06] }}
        transition={{ duration: active ? 0.9 : 1.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <g>
        <circle r={active ? 2.8 : 2.2} fill="#ffffff" opacity={active ? 0.95 : 0.75}>
          <animateMotion dur={`${pulseDuration}s`} repeatCount="indefinite" path={d} />
        </circle>
        <circle r={active ? 6.6 : 5.1} fill="url(#energyGradient)" opacity={active ? 0.28 : 0.18}>
          <animateMotion dur={`${pulseDuration}s`} repeatCount="indefinite" path={d} />
        </circle>
      </g>
    </>
  );
};

type UseIsolatedDemoParams = {
  demoId: DemoId;
  activeDemo: DemoId | null;
  setActiveDemo: (demo: DemoId | null) => void;
  terminateOtherDemo: (demo: DemoId) => Promise<void>;
  registerTerminator: (demo: DemoId, terminateFn: (() => Promise<void>) | null) => void;
};

const useIsolatedDemo = ({
  demoId,
  activeDemo,
  setActiveDemo,
  terminateOtherDemo,
  registerTerminator,
}: UseIsolatedDemoParams) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const sessionRef = useRef<{ accessToken: string; startedAt: number } | null>(null);
  const audioStreamRef = useRef<{ startedAt: number; state: "streaming" | "stopped" } | null>(null);
  const clientRef = useRef<RetellWebClient | null>(null);
  const connectAbortRef = useRef<AbortController | null>(null);
  const connectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prewarmedTokenRef = useRef<{ token: string; timestamp: number } | null>(null);

  const config = demoConfigs[demoId];

  const clearConnectionTimeout = useCallback(() => {
    if (connectTimeoutRef.current) {
      clearTimeout(connectTimeoutRef.current);
      connectTimeoutRef.current = null;
    }
  }, []);

  const resetLocalState = useCallback(() => {
    setIsConnecting(false);
    setIsLive(false);
    setIsMuted(false);
    sessionRef.current = null;
    audioStreamRef.current = null;
    clearConnectionTimeout();
    if (connectAbortRef.current) {
      connectAbortRef.current.abort();
      connectAbortRef.current = null;
    }
  }, [clearConnectionTimeout]);

  const prewarmSession = useCallback(async () => {
    if (
      prewarmedTokenRef.current &&
      Date.now() - prewarmedTokenRef.current.timestamp < 45000
    ) {
      return;
    }

    try {
      const response = await fetch("/api/retell/create-web-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: config.scenario,
        }),
      });

      if (!response.ok) return;
      const data: { access_token?: string } = await response.json();
      if (data.access_token) {
        prewarmedTokenRef.current = {
          token: data.access_token,
          timestamp: Date.now(),
        };
      }
    } catch {
      return;
    }
  }, [config.scenario]);

  const ensureClient = useCallback(() => {
    if (clientRef.current) return clientRef.current;

    const client = new RetellWebClient();
    clientRef.current = client;

    client.on("call_started", () => {
      clearConnectionTimeout();
      setIsConnecting(false);
      setIsLive(true);
      setHasEnded(false);
      audioStreamRef.current = { startedAt: Date.now(), state: "streaming" };
    });

    client.on("call_ended", () => {
      setHasEnded(true);
      resetLocalState();
      if (activeDemo === demoId) {
        setActiveDemo(null);
      }
    });

    client.on("error", () => {
      setHasEnded(true);
      resetLocalState();
      if (activeDemo === demoId) {
        setActiveDemo(null);
      }
    });

    return client;
  }, [activeDemo, clearConnectionTimeout, demoId, resetLocalState, setActiveDemo]);

  const terminate = useCallback(async () => {
    const client = clientRef.current;
    if (client) {
      try {
        client.stopCall();
      } catch {
        // no-op
      }
    }
    setHasEnded(true);
    resetLocalState();
    if (activeDemo === demoId) {
      setActiveDemo(null);
    }
  }, [activeDemo, demoId, resetLocalState, setActiveDemo]);

  const startConnection = useCallback(async () => {
    if (isConnecting || isLive) return;

    setHasEnded(false);
    if (activeDemo && activeDemo !== demoId) {
      await terminateOtherDemo(demoId);
    }

    setActiveDemo(demoId);
    setIsConnecting(true);

    try {
      const client = ensureClient();
      connectTimeoutRef.current = setTimeout(() => {
        setHasEnded(true);
        resetLocalState();
        if (activeDemo === demoId) setActiveDemo(null);
      }, 7000);

      let accessToken = prewarmedTokenRef.current?.token;
      const isPrewarmedFresh =
        !!prewarmedTokenRef.current &&
        Date.now() - prewarmedTokenRef.current.timestamp < 45000;

      if (!isPrewarmedFresh || !accessToken) {
        const abortController = new AbortController();
        connectAbortRef.current = abortController;

        const response = await fetch("/api/retell/create-web-call", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: abortController.signal,
          body: JSON.stringify({
            scenario: config.scenario,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to start call session");
        }

        const data: { access_token?: string } = await response.json();
        if (!data.access_token) {
          throw new Error("Missing access token");
        }
        accessToken = data.access_token;
      }

      sessionRef.current = { accessToken, startedAt: Date.now() };
      connectAbortRef.current = null;

      await client.startCall({ accessToken });

      prewarmedTokenRef.current = null;
      void prewarmSession();
    } catch {
      setHasEnded(true);
      resetLocalState();
      if (activeDemo === demoId) {
        setActiveDemo(null);
      }
    }
  }, [
    activeDemo,
    config.scenario,
    demoId,
    ensureClient,
    isConnecting,
    isLive,
    prewarmSession,
    resetLocalState,
    setActiveDemo,
    terminateOtherDemo,
  ]);

  const cancelConnecting = useCallback(async () => {
    setHasEnded(true);
    resetLocalState();
    const client = clientRef.current;
    if (client) {
      try {
        client.stopCall();
      } catch {
        // no-op
      }
    }
    if (activeDemo === demoId) {
      setActiveDemo(null);
    }
  }, [activeDemo, demoId, resetLocalState, setActiveDemo]);

  const handleMicClick = useCallback(async () => {
    if (isLive) {
      await terminate();
      return;
    }
    if (isConnecting) {
      await cancelConnecting();
      return;
    }
    await startConnection();
  }, [cancelConnecting, isConnecting, isLive, startConnection, terminate]);

  useEffect(() => {
    void prewarmSession();
  }, [prewarmSession]);

  useEffect(() => {
    registerTerminator(demoId, terminate);
    return () => {
      registerTerminator(demoId, null);
      const client = clientRef.current;
      if (client) {
        try {
          client.stopCall();
        } catch {
          // no-op
        }
      }
      resetLocalState();
    };
  }, [demoId, registerTerminator, resetLocalState, terminate]);

  return {
    isConnecting,
    isLive,
    isMuted,
    setIsMuted,
    hasEnded,
    sessionRef,
    audioStreamRef,
    handleMicClick,
  };
};

type BaseDemoCardProps = {
  demoId: DemoId;
  delay: number;
  activeDemo: DemoId | null;
  setActiveDemo: (demo: DemoId | null) => void;
  terminateOtherDemo: (demo: DemoId) => Promise<void>;
  registerTerminator: (demo: DemoId, terminateFn: (() => Promise<void>) | null) => void;
};

type PrimaryDemoCardProps = BaseDemoCardProps;

const PrimaryDemoCard = ({
  delay,
  demoId,
  activeDemo,
  setActiveDemo,
  terminateOtherDemo,
  registerTerminator,
}: PrimaryDemoCardProps) => {
  const { isConnecting, isLive, hasEnded, handleMicClick } = useIsolatedDemo({
    demoId,
    activeDemo,
    setActiveDemo,
    terminateOtherDemo,
    registerTerminator,
  });

  const micStyle = isLive
    ? "bg-green-500 shadow-[0_0_24px_rgba(34,197,94,0.45)]"
    : isConnecting
    ? "bg-yellow-500 animate-pulse"
    : hasEnded
    ? "bg-neutral-700 ring-2 ring-red-500"
    : "bg-neutral-600";

  const statusText = isLive ? "LIVE" : isConnecting ? "Connecting..." : hasEnded ? "Ended" : "Click to start call";
  const statusColor = isLive
    ? "text-green-400"
    : isConnecting
    ? "text-yellow-400"
    : hasEnded
    ? "text-red-400"
    : "text-neutral-400";

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5, delay }}
      className="flex flex-col items-center justify-center max-w-2xl mx-auto w-full px-4"
    >
      <div className="relative w-full p-[2px] rounded-2xl bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] animate-gradient-flow">
        <div className={`w-full bg-black/70 dark:bg-neutral-900/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 transition-all duration-300 ${
          isLive ? "shadow-[0_0_60px_rgba(123,0,255,0.6)]" : "shadow-lg"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              🎙 Experience the ACAI Concierge™
            </h3>
            {isLive && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.6)]"
              >
                <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                LIVE
              </motion.span>
            )}
          </div>
          <p className="text-base md:text-lg text-neutral-300 dark:text-neutral-400 mb-8">
            This live AI receptionist demonstrates all three pain points in one call flow: instant call pickup, emergency intent routing, and high-value lead capture with immediate booking.
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <button
                onClick={handleMicClick}
                className={`w-24 h-24 rounded-full ${micStyle} flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-150 ease-out focus:outline-none focus:ring-4 focus:ring-purple-500/50 active:scale-95 relative z-10`}
                aria-label="Start ACAI voice demo"
              >
                <Mic className="w-12 h-12 text-white" />
              </button>
              {isLive && (
                <>
                  <div className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-pulse scale-125" />
                  <div className="absolute inset-0 rounded-full bg-green-500/30 blur-2xl scale-150 animate-pulse" />
                </>
              )}
            </div>
            <div className={`text-center font-semibold transition-all duration-150 ease-out ${statusColor}`}>{statusText}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface SecondaryDemoCardProps extends BaseDemoCardProps {
  title: string;
}

const SecondaryDemoCard = ({
  title,
  demoId,
  delay,
  activeDemo,
  setActiveDemo,
  terminateOtherDemo,
  registerTerminator,
}: SecondaryDemoCardProps) => {
  const { isConnecting, isLive, hasEnded, handleMicClick } = useIsolatedDemo({
    demoId,
    activeDemo,
    setActiveDemo,
    terminateOtherDemo,
    registerTerminator,
  });

  const micStyle = isLive
    ? "bg-green-500 shadow-[0_0_18px_rgba(34,197,94,0.45)]"
    : isConnecting
    ? "bg-yellow-500 animate-pulse"
    : hasEnded
    ? "bg-neutral-700 ring-2 ring-red-500"
    : "bg-neutral-600";

  const statusText = isLive ? "LIVE" : isConnecting ? "Connecting..." : hasEnded ? "Ended" : "Click to start";
  const statusColor = isLive
    ? "text-green-400"
    : isConnecting
    ? "text-yellow-400"
    : hasEnded
    ? "text-red-400"
    : "text-neutral-400";

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5, delay }}
      className="flex flex-col items-center justify-center"
    >
      <div className="relative w-full p-[1.5px] rounded-xl bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff]">
        <div className={`w-full bg-black/70 dark:bg-neutral-900/90 backdrop-blur-sm rounded-xl p-5 transition-all duration-300 ${
          isLive ? "shadow-[0_0_30px_rgba(123,0,255,0.4)]" : "shadow-md"
        }`}>
          <h4 className="text-base font-semibold text-white mb-3 text-center">{title}</h4>
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <button
                onClick={handleMicClick}
                className={`w-14 h-14 rounded-full ${micStyle} flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-purple-500/50 active:scale-95 relative z-10`}
                aria-label={`Start ${title} demo`}
              >
                <Mic className="w-7 h-7 text-white" />
              </button>
              {isLive && <div className="absolute inset-0 rounded-full bg-green-500/30 blur-xl scale-150 animate-pulse" />}
            </div>
            <div className={`text-xs font-medium transition-all duration-150 ease-out ${statusColor}`}>{statusText}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Hero = () => {
  const router = useRouter();
  const [activeDemo, setActiveDemo] = useState<null | "main" | "plumbing" | "barber">(null);
  const [hoveredPainPoint, setHoveredPainPoint] = useState<number | null>(null);
  const [startSublineTyping, setStartSublineTyping] = useState(false);
  const [typingSyncCycle, setTypingSyncCycle] = useState(0);
  const [headlineCanDelete, setHeadlineCanDelete] = useState(false);
  const [headlineDeleteSignal, setHeadlineDeleteSignal] = useState(0);
  const terminatorsRef = useRef<Partial<Record<DemoId, () => Promise<void>>>>({});
  const painPoints = [
    "Stop Running to the Phone",
    "Stop Losing Emergency Calls",
    "Stop Missing High-Value Leads",
  ];

  const registerTerminator = useCallback((demo: DemoId, terminateFn: (() => Promise<void>) | null) => {
    if (terminateFn) {
      terminatorsRef.current[demo] = terminateFn;
      return;
    }
    delete terminatorsRef.current[demo];
  }, []);

  const terminateOtherDemo = useCallback(
    async (selectedDemo: DemoId) => {
      if (!activeDemo || activeDemo === selectedDemo) return;
      const terminateActive = terminatorsRef.current[activeDemo];
      if (terminateActive) {
        await terminateActive();
      }
    },
    [activeDemo]
  );

  const handleHeadlineWordTyped = useCallback(() => {
    setTypingSyncCycle((previous) => previous + 1);
    setHeadlineCanDelete(false);
    if (!startSublineTyping) {
      setStartSublineTyping(true);
    }
  }, [startSublineTyping]);

  const handleWithAcaiHoldComplete = useCallback(() => {
    setHeadlineCanDelete(true);
  }, []);

  const handleHeadlineDeleteStarted = useCallback(() => {
    setHeadlineDeleteSignal((previous) => previous + 1);
    setHeadlineCanDelete(false);
  }, []);

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
      <TypewriterHeadline
        canDelete={headlineCanDelete}
        onWordTyped={handleHeadlineWordTyped}
        onDeleteStarted={handleHeadlineDeleteStarted}
      />
      {startSublineTyping && (
        <TypewriterText
          syncCycle={typingSyncCycle}
          deleteSignal={headlineDeleteSignal}
          onWithAcaiHoldComplete={handleWithAcaiHoldComplete}
        />
      )}
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

      <div className="mt-10 relative z-10 w-full max-w-5xl px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {painPoints.map((problem, index) => (
            (() => {
              const cardDelay = 0.18 + index * 0.3;
              const settleDuration = 0.9;
              const glowDelay = cardDelay + settleDuration - 0.05;
              const branchDelay = cardDelay + settleDuration + 0.12;

              return (
            <motion.div
              key={problem}
              initial={{ opacity: 0, x: -260, scale: 0.97 }}
              animate={{ opacity: [0, 1, 1], x: [-260, 16, 0], scale: [0.97, 1.015, 1] }}
              transition={{
                duration: settleDuration,
                delay: cardDelay,
                ease: [0.2, 0.9, 0.2, 1],
              }}
              onMouseEnter={() => setHoveredPainPoint(index)}
              onMouseLeave={() => setHoveredPainPoint(null)}
              className="relative rounded-2xl border border-white/25 bg-black/55 backdrop-blur-sm px-6 py-5 text-center shadow-[0_0_16px_rgba(59,130,246,0.22)]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10" />

              <motion.div
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: [0, 0.75, 0], scale: [0.93, 1.04, 1.08] }}
                transition={{ duration: 0.8, delay: glowDelay, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 rounded-2xl border border-purple-300/45"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.55, 0] }}
                transition={{ duration: 0.8, delay: glowDelay + 0.04, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/15 via-purple-500/18 to-blue-500/15"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: [0, 0.38, 0], scale: [0.96, 1.08, 1.12] }}
                transition={{ duration: 0.8, delay: glowDelay + 0.02, ease: "easeOut" }}
                className="pointer-events-none absolute -inset-2 rounded-[1.05rem] bg-gradient-to-r from-red-500/10 via-purple-500/12 to-blue-500/10 blur-[8px]"
              />

              <motion.span
                initial={{ opacity: 0, y: 3, x: -6 }}
                animate={{ opacity: [0, 0.7, 0], y: [3, -2, -5], x: [-6, -2, 0] }}
                transition={{ duration: 0.7, delay: glowDelay + 0.06, ease: "easeOut" }}
                className="pointer-events-none absolute left-[24%] top-[42%] h-1 w-1 rounded-full bg-red-300/80"
              />
              <motion.span
                initial={{ opacity: 0, y: 2, x: 0 }}
                animate={{ opacity: [0, 0.75, 0], y: [2, -3, -7], x: [0, 3, 5] }}
                transition={{ duration: 0.72, delay: glowDelay + 0.09, ease: "easeOut" }}
                className="pointer-events-none absolute left-[49%] top-[39%] h-1 w-1 rounded-full bg-purple-300/80"
              />
              <motion.span
                initial={{ opacity: 0, y: 3, x: 5 }}
                animate={{ opacity: [0, 0.7, 0], y: [3, -2, -6], x: [5, 1, -1] }}
                transition={{ duration: 0.7, delay: glowDelay + 0.12, ease: "easeOut" }}
                className="pointer-events-none absolute left-[72%] top-[43%] h-1 w-1 rounded-full bg-blue-300/80"
              />

              <div className="relative z-10 text-base md:text-lg font-semibold text-white">{problem}</div>
              <motion.div
                initial={{ opacity: 0, scaleY: 0.1, y: -8 }}
                animate={{ opacity: hoveredPainPoint === index ? 1 : 0.85, scaleY: 1, y: 0 }}
                transition={{ duration: 0.46, delay: branchDelay, ease: [0.22, 1, 0.36, 1] }}
                className="hidden md:block absolute left-1/2 -bottom-8 h-8 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-red-400/90 via-purple-400/90 to-blue-400/0 origin-top"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: [0, 0.45, 0], scale: [0.86, 1.05, 1.1] }}
                transition={{ duration: 0.8, delay: branchDelay + 0.04, ease: "easeOut" }}
                className="pointer-events-none hidden md:block absolute left-1/2 -bottom-4 h-6 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-red-400/30 via-purple-400/40 to-blue-400/30 blur-[4px]"
              />
            </motion.div>
              );
            })()
          ))}
        </div>

        <div className="hidden md:block relative mt-1 h-24 pointer-events-none">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="52%" stopColor="#7b00ff" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <EnergyPath d="M16 2 C16 30, 28 52, 50 95" active={hoveredPainPoint === 0} pulseDuration={2.3} />
            <EnergyPath d="M50 2 C50 36, 50 62, 50 95" active={hoveredPainPoint === 1} pulseDuration={2.45} />
            <EnergyPath d="M84 2 C84 30, 72 52, 50 95" active={hoveredPainPoint === 2} pulseDuration={2.6} />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.72 }}
          className="mx-auto mt-7 w-fit rounded-full border border-white/15 bg-black/35 px-5 py-2 text-xs md:text-sm text-neutral-200"
        >
          Watch how ACAI handles it live.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.82 }}
          className="mx-auto mt-4 flex w-fit flex-col items-center pointer-events-none"
        >
          <div className="h-10 w-[3px] rounded-full bg-gradient-to-b from-purple-400/70 via-blue-400/80 to-transparent" />
          <motion.div
            animate={{ y: [0, 4, 0], opacity: [0.65, 1, 0.65], scale: [1, 1.08, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="-mt-1 text-lg text-blue-300"
          >
            ↓
          </motion.div>
          <motion.div
            animate={{ opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-7 w-28 rounded-full bg-gradient-to-r from-red-500/15 via-purple-500/25 to-blue-500/15 blur-md"
          />
        </motion.div>
      </div>

      {/* Primary Demo - Centered and Large */}
      <div className="mt-12 relative z-10 w-full">
        <PrimaryDemoCard
          demoId="main"
          delay={0.25}
          activeDemo={activeDemo}
          setActiveDemo={setActiveDemo}
          terminateOtherDemo={terminateOtherDemo}
          registerTerminator={registerTerminator}
        />
      </div>

      {/* Secondary Demos - Triangle Layout */}
      <div className="mt-8 relative z-10 max-w-3xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SecondaryDemoCard
            title="Plumbing & HVAC Demo"
            demoId="plumbing"
            delay={0.3}
            activeDemo={activeDemo}
            setActiveDemo={setActiveDemo}
            terminateOtherDemo={terminateOtherDemo}
            registerTerminator={registerTerminator}
          />
          <SecondaryDemoCard
            title="Barbershop Demo"
            demoId="barber"
            delay={0.35}
            activeDemo={activeDemo}
            setActiveDemo={setActiveDemo}
            terminateOtherDemo={terminateOtherDemo}
            registerTerminator={registerTerminator}
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
