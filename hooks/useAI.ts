"use client";

import { useState } from "react";

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chat = async (message: string, model?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ message, model }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "AI request failed");
      }
      
      return data.response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { chat, loading, error };
}