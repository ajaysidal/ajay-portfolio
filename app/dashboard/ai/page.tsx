'use client';

import SilasTerminal from '@/components/SilasTerminal';

export default function AIDashboardPage() {
  return (
    <main className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Silas Autonomous Agent
          </h1>
          <p className="text-gray-400 mt-2 font-mono text-sm">
            Sovereign AI infrastructure for codebase maintenance, analysis, and autonomous execution.
          </p>
        </div>
        <SilasTerminal />
      </div>
    </main>
  );
}
