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
let connectionTimeout: NodeJS.Timeout | null = null;
let prewarmedToken: { scenario: RetellScenario; token: string; timestamp: number } | null = null;

// Pre-warm function to get token before user clicks
async function prewarmAgent(scenario: RetellScenario) {
  // Only prewarm if we don't already have a recent token
  if (prewarmedToken && prewarmedToken.scenario === scenario && Date.now() - prewarmedToken.timestamp < 30000) {
    console.log("[Frontend] Using existing prewarmed token for", scenario);
    return;
  }

  try {
    console.log("[Frontend] Pre-warming agent for scenario:", scenario);
    const response = await fetch("/api/retell/create-web-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scenario }),
    });

    if (response.ok) {
      const data = await response.json();
      prewarmedToken = {
        scenario,
        token: data.access_token,
        timestamp: Date.now(),
      };
      console.log("[Frontend] Agent prewarmed successfully for", scenario);
    }
  } catch (error) {
    console.error("[Frontend] Pre-warming failed:", error);
  }
}

export function useRetellVoiceDemo(scenario: RetellScenario = 'acai') {
  const [callState, setCallState] = useState<CallState>('idle');
  const [activeScenario, setActiveScenario] = useState<RetellScenario | null>(null);
  const isInitializing = useRef(false);

  // Initialize global client once
  useEffect(() => {
    if (!globalRetellClient) {
      console.log("[Frontend] Initializing Retell client");
      const client = new RetellWebClient();
      globalRetellClient = client;

      // Set up global event listeners
      client.on("call_started", () => {
        console.log("[Frontend] Call started event - Audio stream confirmed");
        if (connectionTimeout) {
          clearTimeout(connectionTimeout);
          connectionTimeout = null;
        }
        setCallState('active');
      });

      client.on("call_ended", () => {
        console.log("[Frontend] Call ended event");
        if (connectionTimeout) {
          clearTimeout(connectionTimeout);
          connectionTimeout = null;
        }
        setCallState('idle');
        currentScenario = null;
        setActiveScenario(null);
      });

      client.on("error", (error) => {
        console.error("[Frontend] Retell client error:", error);
        if (connectionTimeout) {
          clearTimeout(connectionTimeout);
          connectionTimeout = null;
        }
        setCallState('idle');
        currentScenario = null;
        setActiveScenario(null);
      });
    }

    // Pre-warm the agent for this scenario on mount
    prewarmAgent(scenario);

    return () => {
      // Cleanup on unmount - clear any hanging timeouts
      if (connectionTimeout) {
        clearTimeout(connectionTimeout);
        connectionTimeout = null;
      }
    };
  }, [scenario]);

  const stopCurrentCall = useCallback(async () => {
    if (!globalRetellClient || callState === 'idle') return;

    try {
      setCallState('stopping');
      console.log("[Frontend] Stopping current call...");
      
      if (connectionTimeout) {
        clearTimeout(connectionTimeout);
        connectionTimeout = null;
      }
      
      // Destroy previous listeners to prevent leaks
      globalRetellClient.stopCall();
      currentScenario = null;
      setActiveScenario(null);
      
      // Wait for cleanup
      await new Promise(resolve => setTimeout(resolve, 300));
      setCallState('idle');
      console.log("[Frontend] Call stopped successfully");
    } catch (error) {
      console.error("[Frontend] Error stopping call:", error);
      setCallState('idle');
      currentScenario = null;
      setActiveScenario(null);
    }
  }, [callState]);

  const startConversation = useCallback(async (targetScenario: RetellScenario) => {
    // Prevent double initialization
    if (isInitializing.current) {
      console.log("[Frontend] Already initializing, please wait...");
      return;
    }

    const client = globalRetellClient;
    if (!client) {
      console.error("[Frontend] Retell client not initialized");
      return;
    }

    // Prevent starting if already connecting
    if (callState === 'connecting') {
      console.log("[Frontend] Already connecting, please wait...");
      return;
    }

    try {
      isInitializing.current = true;

      // If there's an active call with a different scenario, stop it first
      if (callState === 'active' && currentScenario !== targetScenario) {
        console.log(`[Frontend] Switching from ${currentScenario} to ${targetScenario}`);
        await stopCurrentCall();
      }

      // If already active with the same scenario, don't restart
      if (callState === 'active' && currentScenario === targetScenario) {
        console.log("[Frontend] Call already active with this scenario");
        isInitializing.current = false;
        return;
      }

      setCallState('connecting');
      console.log(`[Frontend] Starting call with scenario: ${targetScenario}`);
      
      // Set 8 second safety timeout (increased for better reliability)
      connectionTimeout = setTimeout(() => {
        console.error("[Frontend] Connection timeout - resetting state");
        setCallState('idle');
        currentScenario = null;
        setActiveScenario(null);
        isInitializing.current = false;
        alert("Connection timeout. Please try again.");
      }, 8000);
      
      let accessToken: string;

      // Check if we have a prewarmed token for this scenario
      if (prewarmedToken && prewarmedToken.scenario === targetScenario && Date.now() - prewarmedToken.timestamp < 45000) {
        console.log("[Frontend] Using prewarmed token");
        accessToken = prewarmedToken.token;
        prewarmedToken = null; // Clear it after use
        
        // Start pre-warming the next token in the background
        setTimeout(() => prewarmAgent(targetScenario), 100);
      } else {
        console.log("[Frontend] Fetching fresh token");
        const response = await fetch("/api/retell/create-web-call", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ scenario: targetScenario }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("[Frontend] API error:", errorData);
          throw new Error(errorData.error || "Failed to fetch access token");
        }

        const data = await response.json();
        accessToken = data?.access_token;

        if (!accessToken) {
          throw new Error("Missing access_token in response");
        }
      }

      console.log("[Frontend] Received access token, initializing call...");
      
      await client.startCall({ accessToken });
      currentScenario = targetScenario;
      setActiveScenario(targetScenario);
      console.log("[Frontend] Call initialization request sent, waiting for audio stream confirmation...");
      // State will be set to 'active' by the call_started event when audio stream is confirmed
    } catch (error) {
      console.error("[Frontend] Frontend call error:", error);
      
      // Clear timeout on error
      if (connectionTimeout) {
        clearTimeout(connectionTimeout);
        connectionTimeout = null;
      }
      
      setCallState('idle');
      currentScenario = null;
      setActiveScenario(null);
      
      // Show specific error message
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(errorMessage || "Call failed. Check console.");
    } finally {
      isInitializing.current = false;
    }
  }, [callState, stopCurrentCall]);

  const toggleConversation = useCallback(async () => {
    // Prevent action while connecting or stopping
    if (callState === 'connecting' || callState === 'stopping') {
      console.log("[Frontend] Action blocked - currently in:", callState);
      return;
    }

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
