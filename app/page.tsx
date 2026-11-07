"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Cpu, Server, BookOpen } from "lucide-react";

const Hero3DBackground = dynamic(() => import("../components/Hero3DBackground"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-[#0B0C10] via-[#1F2833] to-[#0B0C10]" />,
});

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-24">
      <Hero3DBackground />

      <div className="relative z-10 px-4 max-w-5xl mx-auto">
        <span className="mono mb-4 block text-[#D4AF37] font-semibold tracking-wider uppercase text-sm">Take Back Your Time</span>
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-extrabold tracking-tight leading-[1.1] text-[#F8F9FA]">
          Let AI Handle the Busywork.
        </h1>
        <p className="text-[clamp(1rem,2.2vw,1.25rem)] text-[#aab3bd] mt-6 mb-10 max-w-3xl mx-auto leading-relaxed">
          You started your business to do what you love, not to drown in admin, missed leads, and repetitive tasks. We build simple, reliable AI automations that work quietly in the background, so you can focus on growing your business.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#0B0C10] font-bold rounded-full hover:bg-[#E5C25A] transition-all duration-200 shadow-lg shadow-[#D4AF37]/20"
          >
            Book a Free 30-Minute Growth Call
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#D4AF37] text-[#F8F9FA] font-semibold rounded-full hover:bg-[#D4AF37]/10 transition-all duration-200"
          >
            See How It Works
          </Link>
        </div>

        {/* 3 Core Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="glass-tilt p-6 text-left">
            <Cpu className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Workflow Automation</h3>
            <p className="text-sm text-[#aab3bd]">
              Orchestrating full-scale operations and marketing automation through deterministic AI-driven workflows.
            </p>
          </div>
          <div className="glass-tilt p-6 text-left">
            <Server className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Web Infrastructure</h3>
            <p className="text-sm text-[#aab3bd]">
              High-performance web infrastructure with Nginx, Certbot, and DNS optimization.
            </p>
          </div>
          <div className="glass-tilt p-6 text-left">
            <BookOpen className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Living Documentation</h3>
            <p className="text-sm text-[#aab3bd]">
              Collaborating with AI agents for living documentation and technical storytelling.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-[#aab3bd] rounded-full">
        <div className="w-1 h-2 bg-[#D4AF37] rounded-full mx-auto mt-2 animate-bounce" />
      </div>
    </div>
  );
}