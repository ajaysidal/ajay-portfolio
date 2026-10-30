"use client";

import { useState } from "react";

export default function AIAgentPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Error: Failed to get response from Sovereign AI." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: Network failure." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-[#F8F9FA]">Sovereign AI Agent</h1>
        <p className="text-[#aab3bd] mt-2">Local, private, and deterministic LLM inference.</p>
      </div>

      {/* Chat Display */}
      <div className="flex-1 glass-tilt p-6 rounded-lg overflow-y-auto space-y-4 border border-[#F8F9FA]/10">
        {messages.length === 0 && (
          <div className="text-center text-[#aab3bd] mt-20">
            <p className="text-lg">Ready for deterministic workflows.</p>
            <p className="text-sm mt-2">Ask me to draft a consultation response, analyze project intakes, or generate system documentation.</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-4 rounded-lg ${
              msg.role === "user" 
                ? "bg-[#D4AF37] text-[#0B0C10] font-medium" 
                : "bg-[#1F2833] text-[#F8F9FA] border border-[#F8F9FA]/10"
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#1F2833] text-[#F8F9FA] border border-[#F8F9FA]/10 p-4 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-[#aab3bd] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#aab3bd] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-[#aab3bd] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your prompt for the Sovereign AI..."
          className="flex-1 px-4 py-3 rounded-lg bg-[#1F2833] border border-[#F8F9FA]/10 text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37] transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#B8941F] text-[#0B0C10] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}
