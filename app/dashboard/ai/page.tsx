"use client";

import { useState, useEffect } from "react";
import { Send, Database, Activity, FileText, CheckCircle, XCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AgentTrace {
  agent: string;
  action: string;
  result: string;
  requiresApproval?: boolean;
}

interface ClientData {
  name: string;
  aiReadiness: number;
}

interface ContextData {
  client: ClientData | null;
  activeFiles: string[];
  recentSearches: string[];
}

export default function SilasPrimeDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentTrace, setAgentTrace] = useState<AgentTrace[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [contextData, setContextData] = useState<ContextData>({
    client: null,
    activeFiles: [],
    recentSearches: []
  });

  // Load session context on mount
  useEffect(() => {
    async function loadContext() {
      // Fetch client data, active files, etc.
      // Implementation: Call /api/dashboard/context
    }
    loadContext();
  }, []);

  // Send message to Silas Prime API
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setAgentTrace([]);

    try {
      const response = await fetch("http://localhost:8000/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SILAS_API_KEY || 'dev-key'}`
        },
        body: JSON.stringify({
          message: input,
          context: contextData,
          session_id: sessionId
        })
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      
      setSessionId(data.session_id);
      
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setAgentTrace(data.agent_trace || []);

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "I encountered an error. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#F8F9FA] flex">
      {/* LEFT PANE: Context & Memory */}
      <aside className="w-80 bg-[#0B0C10]/90 backdrop-blur-xl border-r border-[#F8F9FA]/10 flex flex-col fixed h-full">
        <div className="p-6 border-b border-[#F8F9FA]/10">
          <h2 className="text-lg font-bold text-[#D4AF37]">Context</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Client Profile */}
          <div className="glass-tilt p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-[#D4AF37] mb-2 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Active Client
            </h3>
            {contextData.client ? (
              <div className="text-sm text-[#aab3bd]">
                <p className="font-medium text-[#F8F9FA]">{contextData.client.name}</p>
                <p className="text-xs mt-1">AI Readiness: {contextData.client.aiReadiness}%</p>
              </div>
            ) : (
              <p className="text-xs text-[#aab3bd]">No active client selected</p>
            )}
          </div>

          {/* Active Files */}
          <div className="glass-tilt p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-[#D4AF37] mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Active Files
            </h3>
            <ul className="space-y-1 text-xs text-[#aab3bd]">
              {contextData.activeFiles.map((file: string, idx: number) => (
                <li key={idx} className="truncate">{file}</li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* CENTER PANE: The Canvas */}
      <main className="flex-1 ml-80 mr-80 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-2xl p-4 rounded-lg ${
                  msg.role === "user"
                    ? "bg-[#D4AF37] text-[#0B0C10]"
                    : "glass-tilt text-[#F8F9FA]"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <span className="text-xs opacity-60 mt-2 block">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="glass-tilt p-4 rounded-lg">
                <div className="flex items-center gap-2 text-[#aab3bd]">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-sm">Silas is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-[#F8F9FA]/10 p-4 bg-[#0B0C10]/90 backdrop-blur-xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask Silas anything..."
              className="flex-1 px-4 py-3 rounded-lg bg-[#1F2833] border border-[#F8F9FA]/10 text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37]"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="px-6 py-3 rounded-lg bg-[#D4AF37] text-[#0B0C10] font-medium hover:bg-[#D4AF37]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* RIGHT PANE: Telemetry & Human-in-the-Loop */}
      <aside className="w-80 bg-[#0B0C10]/90 backdrop-blur-xl border-l border-[#F8F9FA]/10 flex flex-col fixed right-0 h-full">
        <div className="p-6 border-b border-[#F8F9FA]/10">
          <h2 className="text-lg font-bold text-[#D4AF37]">Agent Telemetry</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {agentTrace.length === 0 ? (
            <p className="text-xs text-[#aab3bd] text-center mt-4">
              Agent activity will appear here
            </p>
          ) : (
            <div className="space-y-3">
              {agentTrace.map((trace, idx) => (
                <div key={idx} className="glass-tilt p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-3 h-3 text-[#D4AF37]" />
                    <span className="text-xs font-semibold text-[#D4AF37]">
                      {trace.agent}
                    </span>
                  </div>
                  <p className="text-xs text-[#aab3bd]">{trace.action}</p>
                  {trace.result && (
                    <p className="text-xs text-[#F8F9FA]/70 mt-1">{trace.result}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Approval Gateway */}
        {agentTrace.some(t => t.requiresApproval) && (
          <div className="border-t border-[#F8F9FA]/10 p-4 bg-[#1F2833]/50">
            <h3 className="text-sm font-semibold text-[#D4AF37] mb-3">
              Requires Approval
            </h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 rounded-lg bg-green-600/20 text-green-400 border border-green-600/50 hover:bg-green-600/30 transition-colors flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
              <button className="w-full px-4 py-2 rounded-lg bg-red-600/20 text-red-400 border border-red-600/50 hover:bg-red-600/30 transition-colors flex items-center justify-center gap-2 text-sm">
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
