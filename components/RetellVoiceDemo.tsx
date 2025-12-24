"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";

export function useRetellVoiceDemo() {
  const clientRef = useRef<RetellWebClient | null>(null);
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Create the client once. Do NOT start audio here.
    clientRef.current = new RetellWebClient();

    return () => {
      try {
        clientRef.current?.stopCall();
      } catch {}
      clientRef.current = null;
    };
  }, []);

  const startConversation = useCallback(async () => {
    const client = clientRef.current;
    if (!client) return;

    setIsLoading(true);
    const response = await fetch("/api/retell/create-web-call", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch access token");
    }

    const data = await response.json();
    const accessToken = data?.access_token;

    if (!accessToken) {
      throw new Error("Missing access_token");
    }

    try {
      await client.startCall({ accessToken });
      setIsConversationActive(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopConversation = useCallback(() => {
    const client = clientRef.current;
    if (!client) return;

    try {
      client.stopCall();
    } finally {
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
