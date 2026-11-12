"use client";

import Link from "next/link";
import { ArrowRight, Cpu, Server, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-24">
      <div className="relative z-10 px-4 max-w-5xl mx-auto">
        <span className="mono mb-4 block text-gold font-semibold tracking-wider uppercase text-sm">
          Take Back Your Time
        </span>
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-extrabold tracking-tight leading-[1.1] text-text-primary">
          Let AI Handle the Busywork.
        </h1>
        <p className="text-[clamp(1rem,2.2vw,1.25rem)] text-text-secondary mt-6 mb-10 max-w-3xl mx-auto leading-relaxed">
          You started your business to do what you love, not to drown in admin, missed leads, and repetitive tasks. We build simple, reliable AI automations that work quietly in the background, so you can focus on growing your business.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-bg-primary font-bold rounded-full hover:bg-[#E5C25A] transition-all duration-200 shadow-lg shadow-gold/20"
          >
            Book a Free 30-Minute Growth Call
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 border border-gold text-text-primary font-semibold rounded-full hover:bg-gold/10 transition-all duration-200"
          >
            See How It Works
          </Link>
        </div>

        {/* 3 Core Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="glass-tilt p-6 text-left">
            <Cpu className="w-8 h-8 text-gold mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Workflow Automation</h3>
            <p className="text-sm text-text-secondary">
              Orchestrating full-scale operations and marketing automation through deterministic AI-driven workflows.
            </p>
          </div>
          <div className="glass-tilt p-6 text-left">
            <Server className="w-8 h-8 text-gold mb-4" />
            <h3 className="text-lg font-semibold mb-2">Web Infrastructure</h3>
            <p className="text-sm text-text-secondary">
              High-performance web infrastructure with Nginx, Certbot, and DNS optimization.
            </p>
          </div>
          <div className="glass-tilt p-6 text-left">
            <BookOpen className="w-8 h-8 text-gold mb-4" />
            <h3 className="text-lg font-semibold mb-2">Living Documentation</h3>
            <p className="text-sm text-text-secondary">
              Collaborating with AI agents for living documentation and technical storytelling.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-text-secondary rounded-full">
        <div className="w-1 h-2 bg-gold rounded-full mx-auto mt-2 animate-bounce" />
      </div>
    </div>
  );
}