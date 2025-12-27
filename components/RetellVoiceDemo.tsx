"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";

export function useRetellVoiceDemo() {
  const clientRef = useRef<RetellWebClient | null>(null);
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Create the client once. Do NOT start audio here.
    const client = new RetellWebClient();
    clientRef.current = client;

    // Set up event listeners
    client.on("call_started", () => {
      console.log("Call started");
      setIsConversationActive(true);
      setIsLoading(false);
    });

    client.on("call_ended", () => {
      console.log("Call ended");
      setIsConversationActive(false);
      setIsLoading(false);
    });

    client.on("error", (error) => {
      console.error("Retell error:", error);
      setIsConversationActive(false);
      setIsLoading(false);
    });

    return () => {
      try {
        client.stopCall();
      } catch {}
      clientRef.current = null;
    };
  }, []);

  const startConversation = useCallback(async () => {
    const client = clientRef.current;
    if (!client) {
      console.error("Retell client not initialized");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Fetching access token...");
      
      const response = await fetch("/api/retell/create-web-call", {
        method: "POST",
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
      // State will be set by the event listener
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setIsLoading(false);
      setIsConversationActive(false);
      alert("Failed to start call. Please check console for details.");
    }
  }, []);

  const stopConversation = useCallback(() => {
    const client = clientRef.current;
    if (!client) return;

    try {
      console.log("Stopping call...");
      client.stopCall();
      // State will be set by the event listener
    } catch (error) {
      console.error("Error stopping call:", error);
      setIsConversationActive(false);
      setIsLoading(false);
    }
  }, []);

  const toggleConversation = useCallback(async () => {
    if (isConversationActive) {
      stopConversation();
    } else {
      await startConversation();
    }
  }, [isConversationActive, startConversation, stopConversation]);

  return {
    isConversationActive,
    isLoading,
    toggleConversation,
  };
}
