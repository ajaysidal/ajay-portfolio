"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Minimize2, MessageCircle } from "lucide-react";

// Import the AI hook
import { useAI } from "../hooks/useAI";

// Message type guard
type SovereignChatAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "SEND_MESSAGE"; content: string }
  | { type: "MINIMIZE" }
  | { type: "MAXIMIZE" };

// Knowledge base import
const knowledgeBase = {
  identity: "Silas, the Personal AI of Ajay Sidal, Founder of Build With AI.",
  tone: "Hybrid-Formal, Founder-grade, Warm, Respectful, Mission-aligned. Never use slang or over-apologize.",
  services: [
    "AI Workflow Automation",
    "Web Infrastructure (Nginx, Certbot, DNS)",
    "Technical Storytelling & Living Documentation"
  ],
  emotional_triggers: {
    overwhelmed: "I understand that scaling operations can feel overwhelming. Ajay specializes in simplifying this through deterministic AI workflows. Would you like to book a free, no-pressure consultation to explore this?",
    pricing: "Because every infrastructure is unique, Ajay provides custom, transparent pricing after a brief discovery call or a detailed project intake. This ensures you only pay for exact value. Shall I link you to the Project Intake form?",
    trust: "Your data security is paramount. This platform is built on a Sovereign AI ethos, meaning your information is never sold or shared with third-party AI providers. You are in safe hands."
  },
  call_to_action: "Always guide the user gently toward booking a free consultation or submitting the project intake form."
};

// Type definitions
type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

// Sovereign Chat Agent message types for external communication
type ChatMessage =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "MINIMIZE" }
  | { type: "MAXIMIZE" };

export default function SovereignChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Welcome to Build With AI. I'm Silas, Ajay's Personal AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date("2020-01-01"),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(2);

  // AI chat hook - uses server-side /api/ai/chat endpoint (no localhost CORS issues)
  const { chat, loading: aiLoading } = useAI();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Removed client-side Ollama status check (http://localhost:11434/api/tags)
  // Ollama status is now managed server-side via /api/ai/health

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectEmotionalTrigger = (userMessage: string): string | null => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("scale") || lowerMessage.includes("overwhelm") || lowerMessage.includes("complex")) {
      return "overwhelmed";
    }

    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("budget")) {
      return "pricing";
    }

    if (lowerMessage.includes("secure") || lowerMessage.includes("trust") || lowerMessage.includes("data") || lowerMessage.includes("privacy")) {
      return "trust";
    }

    return null;
  };

  const getDeterministicResponse = (userMessage: string): string => {
    const trigger = detectEmotionalTrigger(userMessage);

    if (trigger) {
      const emotionKey = trigger as keyof typeof knowledgeBase.emotional_triggers;
      return knowledgeBase.emotional_triggers[emotionKey];
    }

    // FAQ responses
    if (userMessage.toLowerCase().includes("ai")) {
      return `Our AI Workflow Automation specializes in deterministic AI-driven workflows that reduce manual effort by 70%. We don't use hallucinations - only proven, reliable automation. ${knowledgeBase.call_to_action}`;
    }

    if (userMessage.toLowerCase().includes("nginx") || userMessage.toLowerCase().includes("infrastructure")) {
      return `Our Web Infrastructure service provides high-performance Nginx deployments with Certbot and DNS optimization. All solutions are self-hosted and SOC2-compliant. ${knowledgeBase.call_to_action}`;
    }

    if (userMessage.toLowerCase().includes("documentation") || userMessage.toLowerCase().includes("story") || userMessage.toLowerCase().includes("living")) {
      return `Our Technical Storytelling service collaborates with AI agents for living documentation and technical storytelling. We transform complex technical architecture into clear, actionable documentation. ${knowledgeBase.call_to_action}`;
    }

    if (userMessage.toLowerCase().includes("services")) {
      return `We provide three core services: AI Workflow Automation, Web Infrastructure & DevOps, and Technical Storytelling & Living Documentation. Which service interests you most? ${knowledgeBase.call_to_action}`;
    }

    // Default professional response
    return `Thank you for your question about ${knowledgeBase.identity}. This response follows our deterministic, professional guidelines. For detailed assistance, I'd recommend scheduling a free consultation or submitting the project intake form. ${knowledgeBase.call_to_action}`;
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: nextMessageId.current.toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    nextMessageId.current++;

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      let aiResponse: string;

      if (fallbackMode) {
        // Deterministic fallback mode
        aiResponse = getDeterministicResponse(userMessage.content);
      } else {
        // Use AI chat hook (calls /api/ai/chat server-side, no CORS issues)
        aiResponse = await chat(userMessage.content);
      }

      const aiMessage: Message = {
        id: nextMessageId.current.toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      nextMessageId.current++;

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: nextMessageId.current.toString(),
        content: "I apologize, I'm experiencing technical difficulties. Please try again or contact us directly at ajay@buildwithai.digital.",
        sender: "ai",
        timestamp: new Date(),
      };
      nextMessageId.current++;

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="mb-4 w-80 md:w-96 h-96 glass border border-[#1F2833] rounded-xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#1F2833] bg-[#0B0C10]/80 backdrop-blur-sm rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-[#0B0C10]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#F8F9FA]">Silas AI</h3>
                <p className="text-xs text-[#aab3bd]">Fallback Mode</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 text-[#aab3bd] hover:text-[#F8F9FA] transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#aab3bd] hover:text-[#F8F9FA] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${message.sender === "user" ? "bg-[#D4AF37] text-[#0B0C10]" : "bg-[#1F2833] text-[#F8F9FA]"}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#1F2833] text-[#F8F9FA] p-3 rounded-lg text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#aab3bd] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#aab3bd] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#aab3bd] rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#1F2833] bg-[#0B0C10]/80 rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about AI workflows, infrastructure..."
                className="flex-1 px-3 py-2 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37] text-sm"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="px-3 py-2 bg-[#D4AF37] text-[#0B0C10] rounded-lg hover:bg-[#E5C25A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 text-xs text-[#aab3bd]">{knowledgeBase.call_to_action}</div>
          </div>
        </div>
      )}

      {/* Minimized Chat */}
      {isMinimized && (
        <div className="mb-4 w-80 md:w-96 glass border border-[#1F2833] rounded-xl shadow-2xl p-4 cursor-pointer" onClick={() => setIsMinimized(false)}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-[#0B0C10]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F8F9FA]">Silas AI - Fallback</h3>
              <p className="text-xs text-[#aab3bd]">Click to resume conversation</p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      {!isOpen && !isMinimized && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 glass border border-[#1F2833] rounded-full shadow-lg hover:border-[#D4AF37] transition-all duration-200 hover:scale-105"
        >
          <MessageCircle className="w-6 h-6 text-[#D4AF37] mx-auto" />
        </button>
      )}
    </div>
  );
}