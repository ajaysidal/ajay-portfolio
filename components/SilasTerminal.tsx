'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Terminal, Cpu, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type SilasEvent = { 
  type: 'init' | 'action' | 'result' | 'final' | 'error'; 
  message?: string; 
  tool?: string; 
  args?: Record<string, unknown>; 
  output?: string; 
  fallback?: boolean 
};

type ActionLog = {
  type: 'action' | 'result' | 'error';
  tool?: string;
  output?: string;
  message?: string;
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions: ActionLog[];
  timestamp: Date;
};

export default function SilasTerminal() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentActions, setCurrentActions] = useState<ActionLog[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentActions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      actions: [],
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);
    setCurrentActions([]);

    try {
      const response = await fetch('https://api.buildwithai.digital/api/silas/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: input }),
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let finalMessage = '';
      const collectedActions: ActionLog[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const event: SilasEvent = JSON.parse(line.slice(6));
              
              if (event.type === 'action') {
                const newAction: ActionLog = {
                  type: 'action',
                  tool: event.tool,
                  output: JSON.stringify(event.args, null, 2),
                };
                collectedActions.push(newAction);
                setCurrentActions([...collectedActions]);
              } else if (event.type === 'result') {
                const newAction: ActionLog = {
                  type: 'result',
                  tool: event.tool,
                  output: event.output,
                };
                collectedActions.push(newAction);
                setCurrentActions([...collectedActions]);
              } else if (event.type === 'final') {
                finalMessage = event.message || '';
              } else if (event.type === 'error') {
                const newAction: ActionLog = {
                  type: 'error',
                  message: event.message,
                };
                collectedActions.push(newAction);
                setCurrentActions([...collectedActions]);
              }
            } catch (error) {
              console.error('Parse error:', error, line);
            }
          }
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: finalMessage,
        actions: collectedActions,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setCurrentActions([]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Connection failed: ${error}`,
        actions: [],
        timestamp: new Date(),
      }]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-5xl mx-auto bg-linear-to-br from-gray-900 via-gray-950 to-black rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            {isStreaming && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse ring-2 ring-black" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Silas</h2>
            <p className="text-xs text-gray-400 font-mono">
              {isStreaming ? 'Processing autonomously...' : 'Ready for execution'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full">
          <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-emerald-500 animate-pulse' : 'bg-gray-600'}`} />
          <span className="text-xs text-gray-400 font-mono">{isStreaming ? 'ACTIVE' : 'IDLE'}</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {messages.length === 0 && !isStreaming && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
              <Terminal className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Welcome to Silas</h3>
              <p className="text-gray-400 text-sm max-w-md">
                Your sovereign AI agent for autonomous codebase maintenance, analysis, and execution.
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === 'user' 
                ? 'bg-linear-to-br from-blue-500 to-purple-500' 
                : 'bg-linear-to-br from-emerald-500 to-cyan-500'
            }`}>
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Message Content */}
            <div className={`flex-1 max-w-[80%] space-y-3 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              {/* Action Logs (for assistant messages) */}
              {message.actions.length > 0 && (
                <div className="space-y-2">
                  {message.actions.map((action, idx) => (
                    <div key={idx} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 text-left">
                      <div className="flex items-center gap-2 mb-2">
                        {action.type === 'action' && (
                          <>
                            <Cpu className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                            <span className="text-xs font-mono text-yellow-400">
                              Executing: {action.tool}
                            </span>
                          </>
                        )}
                        {action.type === 'result' && (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-xs font-mono text-emerald-400">
                              Result: {action.tool}
                            </span>
                          </>
                        )}
                        {action.type === 'error' && (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                            <span className="text-xs font-mono text-red-400">Error</span>
                          </>
                        )}
                      </div>
                      {action.output && (
                        <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap break-all max-h-32 overflow-y-auto bg-black/30 rounded p-2">
                          {action.output}
                        </pre>
                      )}
                      {action.message && (
                        <p className="text-xs text-gray-400">{action.message}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Main Message */}
              {message.content && (
                <div className={`inline-block px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-linear-to-br from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-800/70 text-gray-100 border border-gray-700/50'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              )}

              {/* Timestamp */}
              <div className="text-xs text-gray-500 font-mono">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {/* Streaming Actions */}
        {isStreaming && currentActions.length > 0 && (
          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 max-w-[80%] space-y-2">
              {currentActions.map((action, idx) => (
                <div key={idx} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    {action.type === 'action' && (
                      <>
                        <Cpu className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                        <span className="text-xs font-mono text-yellow-400">
                          Executing: {action.tool}
                        </span>
                      </>
                    )}
                    {action.type === 'result' && (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-xs font-mono text-emerald-400">
                          Result: {action.tool}
                        </span>
                      </>
                    )}
                  </div>
                  {action.output && (
                    <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap break-all max-h-32 overflow-y-auto bg-black/30 rounded p-2">
                      {action.output}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Streaming Indicator */}
        {isStreaming && currentActions.length === 0 && (
          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/70 rounded-2xl border border-gray-700/50">
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
              <span className="text-sm text-gray-300">Silas is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-800 bg-black/50 backdrop-blur-sm p-4">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Silas to analyze, fix, or execute..."
            disabled={isStreaming}
            className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="bg-linear-to-br from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            {isStreaming ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}