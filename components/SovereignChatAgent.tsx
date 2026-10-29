"use client";
import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

export default function SovereignChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "agent", text: "Hello! I'm Silas. How can I help?" }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "agent", text: "Thanks for your message!" }]);
    }, 500);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#D4AF37]">
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-[#1F2833] rounded-2xl p-4">
          <div className="space-y-2 mb-4">
            {messages.map((m, i) => (
              <div key={i} className={`p-2 rounded ${m.role === "user" ? "bg-[#D4AF37]" : "bg-[#0B0C10]"}`}>{m.text}</div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} className="flex-1 p-2 rounded bg-[#0B0C10]" />
            <button onClick={handleSend} className="p-2 bg-[#D4AF37] rounded"><Send size={18} /></button>
          </div>
        </div>
      )}
    </>
  );
}
