"use client";

import Balancer from "react-wrap-balancer";
import { Badge } from "./badge";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import { Link } from "next-view-transitions";

import { useRouter } from "next/navigation";

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

    const fullPhraseCall = "Never Miss a Lead Again";
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
        const fixedPhrase = "Never Miss a Lead Again";
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
              🎙 Voice Receptionist Example
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
            See how ACAI handles missed inbound calls, captures lead details, and keeps opportunities moving to booked jobs.
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
  subtitle?: string;
  large?: boolean;
  planLabel?: string;
}

const SecondaryDemoCard = ({
  title,
  subtitle,
  large = false,
  planLabel,
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
      className="flex w-full flex-col items-center justify-center"
    >
      <div className={`relative w-full p-[1.5px] rounded-xl bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] ${
        large ? "max-w-3xl" : "max-w-xl"
      }`}>
        <div className={`w-full bg-black/70 dark:bg-neutral-900/90 backdrop-blur-sm rounded-xl transition-all duration-300 ${
          large ? "p-7 md:p-8" : "p-5"
        } ${
          isLive ? "shadow-[0_0_30px_rgba(123,0,255,0.4)]" : "shadow-md"
        }`}>
          <h4 className={`${large ? "text-xl md:text-2xl" : "text-base"} font-semibold text-white mb-3 text-center`}>
            {title}
          </h4>
          {subtitle && (
            <p className="mb-5 text-center text-sm text-neutral-300 md:text-base">
              {subtitle}
            </p>
          )}
          {planLabel && (
            <div className="mb-5 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-200 transition-all duration-150 ease-out hover:border-white/35 hover:text-white"
              >
                {planLabel}
              </Link>
            </div>
          )}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <button
                onClick={handleMicClick}
                className={`${large ? "h-20 w-20" : "w-14 h-14"} rounded-full ${micStyle} flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-purple-500/50 active:scale-95 relative z-10`}
                aria-label={`Start ${title} demo`}
              >
                <Mic className={`${large ? "h-10 w-10" : "w-7 h-7"} text-white`} />
              </button>
              {isLive && <div className="absolute inset-0 rounded-full bg-green-500/30 blur-xl scale-150 animate-pulse" />}
            </div>
            <div className={`${large ? "text-sm" : "text-xs"} font-medium transition-all duration-150 ease-out ${statusColor}`}>
              {statusText}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Hero = () => {
  const router = useRouter();
  const [activeDemo, setActiveDemo] = useState<null | "main" | "plumbing" | "barber">(null);
  const [startSublineTyping, setStartSublineTyping] = useState(false);
  const [typingSyncCycle, setTypingSyncCycle] = useState(0);
  const [headlineCanDelete, setHeadlineCanDelete] = useState(false);
  const [headlineDeleteSignal, setHeadlineDeleteSignal] = useState(0);
  const terminatorsRef = useRef<Partial<Record<DemoId, () => Promise<void>>>>({});

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
    <div className="relative flex min-h-[76vh] flex-col overflow-hidden pt-20 md:min-h-[82vh] md:pt-36">
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
      <div className="relative z-10 mx-auto mt-7 w-full max-w-5xl px-4 text-center md:mt-10">
        <div className="pointer-events-none absolute inset-x-10 -top-6 h-[220px] rounded-full bg-black/45 blur-2xl md:inset-x-20 md:h-[260px]" />
        <div className="pointer-events-none absolute left-1/2 top-8 h-44 w-80 -translate-x-1/2 rounded-full bg-gradient-to-r from-red-500/14 via-purple-500/22 to-blue-500/14 blur-3xl" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 0.55, delay: 0.2 }}
          className="relative mt-2 text-4xl font-semibold leading-tight text-white md:text-6xl"
        >
          <span className="acai-247-sweep inline-block">24/7</span>{" "}
          <Balancer>Contractor Call Operations.</Balancer>
        </motion.h2>

        <div
          style={{
            width: "38%",
            height: "1.5px",
            background: "linear-gradient(to right, rgba(124,58,237,0.6), transparent)",
            marginBottom: "12px",
          }}
        />
      </div>

      <div className="h-5 md:h-6" />
    </div>
  );
};

export const OurVoiceAISection = () => {
  const [activeDemo, setActiveDemo] = useState<null | "main" | "plumbing" | "barber">(null);
  const terminatorsRef = useRef<Partial<Record<DemoId, () => Promise<void>>>>({});

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

  return (
    <section className="relative z-20 mt-14 w-full max-w-7xl px-4 md:mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto max-w-6xl"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/55 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_0_35px_rgba(96,70,255,0.18)] backdrop-blur-xl md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-500/6 via-purple-500/8 to-blue-500/6" />
          <div className="relative z-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-300/70 md:text-sm">OUR VOICE AI</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Our Voice AI</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg">
              ACAI answers when your team cannot get to the phone, captures lead information, qualifies the caller, and helps turn missed opportunities into booked customers.
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <PrimaryDemoCard
              delay={0.05}
              demoId="main"
              activeDemo={activeDemo}
              setActiveDemo={setActiveDemo}
              terminateOtherDemo={terminateOtherDemo}
              registerTerminator={registerTerminator}
            />

            <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
              <SecondaryDemoCard
                title="Epoxy Flooring Reception Demo"
                subtitle="Example: qualify floor size, project urgency, and timeline before routing to your calendar."
                planLabel="See Epoxy Plan"
                demoId="plumbing"
                delay={0.14}
                activeDemo={activeDemo}
                setActiveDemo={setActiveDemo}
                terminateOtherDemo={terminateOtherDemo}
                registerTerminator={registerTerminator}
              />
              <SecondaryDemoCard
                title="Garage Installation Reception Demo"
                subtitle="Example: capture build scope, confirm fit, and move the caller to a booked estimate faster."
                planLabel="See Garage Installation Plan"
                demoId="barber"
                delay={0.2}
                activeDemo={activeDemo}
                setActiveDemo={setActiveDemo}
                terminateOtherDemo={terminateOtherDemo}
                registerTerminator={registerTerminator}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
