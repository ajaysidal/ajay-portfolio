"use client";

import Hero3DBackground from "../../components/Hero3DBackground";

export default function About() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#1F2833]">
              <Hero3DBackground />
            </div>
          </div>
          <div>
            <span className="mono block mb-4">About</span>
            <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tight mb-6">
              Systems, operations, and AI.
            </h2>
            <div className="space-y-4 text-[#F8F9FA]">
              <p>
                <span className="hl font-semibold">12+ years</span> of cross-industry experience across banking, healthcare, logistics, and automotive.
              </p>
              <p>
                Expert in web development, system infrastructure, and orchestrating full-scale operations and marketing automation through <span className="hl2 font-semibold">AI-driven workflows</span>.
              </p>
              <p>
                A data-driven strategist skilled in optimizing workflows, troubleshooting complex technical architecture, and leading high-performing teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}