"use client";

import { useState } from "react";
import { publishToCms } from "@/app/actions/publishToCms";

export default function AIAgentPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [publishStatus, setPublishStatus] = useState<string>("");
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setPublishStatus(""); // Clear previous publish status

    // Create a placeholder for the assistant's streaming response
    const assistantMessage = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("API request failed");
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.message?.content) {
                assistantMessage.content += data.message.content;
                // Update the state to trigger a re-render with the new text
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = { ...assistantMessage };
                  return newMessages;
                });
              }
            } catch (e) {
              // Ignore parse errors for incomplete JSON chunks
            }
          }
        }
      }
    } catch (error) {
      console.error("[AI ERROR]", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "Error: Failed to get response. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async (content: string) => {
    setIsPublishing(true);
    setPublishStatus("Publishing to Directus CMS...");
    
    // Extract JSON from the AI's response (in case it includes markdown code blocks)
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/({[\s\S]*})/);
    const jsonString = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;

    const result = await publishToCms(jsonString);
    
    if (result.success) {
      setPublishStatus(`✅ Success! Published: "${result.data.title}"`);
    } else {
      setPublishStatus(`❌ Failed: ${result.error}`);
    }
    setIsPublishing(false);
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
            <p className="text-sm mt-2">Ask me to draft content, analyze workflows, or generate SMB strategies.</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
            <div className={`max-w-[80%] p-4 rounded-lg ${
              msg.role === "user"
                ? "bg-[#D4AF37] text-[#0B0C10] font-medium"
                : "bg-[#1F2833] text-[#F8F9FA] border border-[#F8F9FA]/10"
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
            
            {/* Publish Button for Assistant Messages containing JSON */}
            {msg.role === "assistant" && (msg.content.includes("{") || msg.content.includes("```json")) && (
              <div className="mt-2 ml-2">
                <button
                  onClick={() => handlePublish(msg.content)}
                  disabled={isPublishing}
                  className="text-xs px-3 py-1.5 rounded bg-[#D4AF37] hover:bg-[#B8941F] text-[#0B0C10] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  {isPublishing ? "Publishing..." : "🚀 Publish to Directus CMS"}
                </button>
                {publishStatus && <p className="text-xs text-[#aab3bd] mt-1">{publishStatus}</p>}
              </div>
            )}
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
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
