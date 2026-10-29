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
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <Hero3DBackground />

      <div className="relative z-10 px-4 max-w-5xl mx-auto">
        <span className="mono mb-6 block">Auckland, New Zealand</span>
        <h1 className="text-[clamp(3.2rem,12vw,9rem)] font-extrabold tracking-tight leading-[1.05]">
          Ajay Sidal
        </h1>
        <p className="text-[clamp(1rem,2.6vw,1.5rem)] text-[#aab3bd] mt-6 mb-10 font-medium">
          Technology &amp; Operations Leader | Creative Technologist
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#D4AF37] rounded-full text-[#F8F9FA] hover:bg-[#D4AF37] hover:text-[#0B0C10] transition-all duration-200"
          >
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#1F2833] rounded-full text-[#F8F9FA] hover:border-[#D4AF37] transition-all duration-200"
          >
            Explore Services
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