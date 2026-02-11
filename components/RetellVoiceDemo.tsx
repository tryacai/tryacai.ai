"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";

// Scenario types
export type RetellScenario = 'acai' | 'plumbing' | 'barber';

// State machine states
type CallState = 'idle' | 'connecting' | 'active' | 'stopping';

// Global singleton instance manager
let globalRetellClient: RetellWebClient | null = null;
let currentScenario: RetellScenario | null = null;

export function useRetellVoiceDemo(scenario: RetellScenario = 'acai') {
  const [callState, setCallState] = useState<CallState>('idle');
  const [activeScenario, setActiveScenario] = useState<RetellScenario | null>(null);
  const isInitializing = useRef(false);

  // Initialize global client once
  useEffect(() => {
    if (!globalRetellClient) {
      const client = new RetellWebClient();
      globalRetellClient = client;

      // Set up global event listeners
      client.on("call_started", () => {
        console.log("Call started");
        setCallState('active');
      });

      client.on("call_ended", () => {
        console.log("Call ended");
        setCallState('idle');
        currentScenario = null;
        setActiveScenario(null);
      });

      client.on("error", (error) => {
        console.error("Retell error:", error);
        setCallState('idle');
        currentScenario = null;
        setActiveScenario(null);
      });
    }

    return () => {
      // Don't destroy the global client on unmount
      // It should persist across component lifecycles
    };
  }, []);

  const stopCurrentCall = useCallback(async () => {
    if (!globalRetellClient || callState === 'idle') return;

    try {
      setCallState('stopping');
      console.log("Stopping current call...");
      globalRetellClient.stopCall();
      currentScenario = null;
      setActiveScenario(null);
      // Wait a bit for cleanup
      await new Promise(resolve => setTimeout(resolve, 300));
      setCallState('idle');
    } catch (error) {
      console.error("Error stopping call:", error);
      setCallState('idle');
      currentScenario = null;
      setActiveScenario(null);
    }
  }, [callState]);

  const startConversation = useCallback(async (targetScenario: RetellScenario) => {
    if (isInitializing.current) {
      console.log("Already initializing, please wait...");
      return;
    }

    const client = globalRetellClient;
    if (!client) {
      console.error("Retell client not initialized");
      return;
    }

    try {
      isInitializing.current = true;

      // If there's an active call with a different scenario, stop it first
      if (callState === 'active' && currentScenario !== targetScenario) {
        console.log(`Switching from ${currentScenario} to ${targetScenario}`);
        await stopCurrentCall();
      }

      // If already active with the same scenario, don't restart
      if (callState === 'active' && currentScenario === targetScenario) {
        console.log("Call already active with this scenario");
        isInitializing.current = false;
        return;
      }

      setCallState('connecting');
      console.log(`Fetching access token for scenario: ${targetScenario}...`);
      
      const response = await fetch("/api/retell/create-web-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scenario: targetScenario }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error(errorData.error || "Failed to fetch access token");
      }

      const data = await response.json();
      const accessToken = data?.access_token;

      if (!accessToken) {
        throw new Error("Missing access_token in response");
      }

      console.log("Starting call with access token...");
      await client.startCall({ accessToken });
      currentScenario = targetScenario;
      setActiveScenario(targetScenario);
      // State will be set to 'active' by the event listener
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setCallState('idle');
      currentScenario = null;
      setActiveScenario(null);
      alert("Failed to start call. Please check console for details.");
    } finally {
      isInitializing.current = false;
    }
  }, [callState, stopCurrentCall]);

  const toggleConversation = useCallback(async () => {
    if (callState === 'active' && currentScenario === scenario) {
      // Stop the current call
      await stopCurrentCall();
    } else if (callState === 'idle') {
      // Start a new call with this scenario
      await startConversation(scenario);
    } else if (callState === 'active' && currentScenario !== scenario) {
      // Switch to a different scenario
      await startConversation(scenario);
    }
  }, [callState, scenario, startConversation, stopCurrentCall]);

  return {
    isConversationActive: callState === 'active' && activeScenario === scenario,
    isConnecting: callState === 'connecting',
    isLoading: callState === 'connecting' || callState === 'stopping',
    callState,
    activeScenario,
    toggleConversation,
    startConversation: () => startConversation(scenario),
    stopConversation: stopCurrentCall,
  };
}
