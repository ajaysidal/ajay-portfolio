"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function SovereignChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Silas, Your AI Business Assistant. How can I help you scale your business with ethical, open-source AI today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: "qwen2.5:7b"
        }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.message?.content) {
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMsg = newMessages[newMessages.length - 1];
                  if (lastMsg.role === "assistant") {
                    lastMsg.content += data.message.content;
                  }
                  return newMessages;
                });
              }
            } catch {
              // Ignore parse errors
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting to my sovereign servers right now. Please try again in a moment."
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-gold to-[#B8962E] text-bg-primary shadow-lg shadow-gold/20 hover:scale-105 transition-all duration-300"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-95 max-w-[calc(100vw-3rem)] h-125 bg-bg-secondary/95 backdrop-blur-xl rounded-2xl border border-gold/20 shadow-2xl flex flex-col overflow-hidden">

          <div className="p-4 border-b border-gold/10 bg-bg-primary/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-gold to-[#B8962E] flex items-center justify-center">
              <Bot className="w-4 h-4 text-bg-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Silas</h3>
              <p className="text-xs text-text-secondary">Your AI Business Assistant</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent">
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              const isLastAndLoading = idx === messages.length - 1 && isLoading;
              const bubbleClass = isUser
                ? "bg-linear-to-br from-gold to-[#B8962E] text-bg-primary rounded-br-sm"
                : "bg-bg-primary border border-gold/10 text-text-primary rounded-bl-sm";

              return (
                <div
                  key={idx}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${bubbleClass}`}>
                    {msg.content ? (
                      msg.content
                    ) : isLastAndLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-gold" />
                    ) : null}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-gold/10 bg-bg-primary/50"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about AI workflows, infrastructure..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 rounded-lg bg-bg-secondary border border-gold/20 text-text-primary text-sm placeholder-text-secondary focus:outline-none focus:border-gold disabled:opacity-50 transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-lg bg-gold text-bg-primary hover:bg-[#B8962E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}