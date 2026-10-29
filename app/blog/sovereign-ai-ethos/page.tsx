import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Sovereign AI Ethos: Why Self-Hosted Data Is the Future of Trust",
  description: "Exploring privacy-first, self-hosted AI architecture that never shares your data with third-party providers.",
  openGraph: {
    title: "The Sovereign AI Ethos: Why Self-Hosted Data Is the Future of Trust",
    description: "Exploring privacy-first, self-hosted AI architecture that never shares your data with third-party providers.",
    url: "https://ajay-portfolio.vercel.app/blog/sovereign-ai-ethos",
  },
};

export default function SovereignAIEthos() {
  return (
    <article className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="mono block mb-4">September 2025</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4">The Sovereign AI Ethos: Why Self-Hosted Data Is the Future of Trust</h1>
      </div>

      <div className="prose prose-lg max-w-none text-[#F8F9FA]">
        <p>Exploring privacy-first, self-hosted AI architecture that never shares your data with third-party providers.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Introduction</h2>
        <p>The Sovereign AI ethos represents a fundamental shift in how we approach artificial intelligence. By keeping everything self-hosted and in-house, we ensure complete data privacy and control.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Core Principles</h2>
        <ul>
          <li>No data sharing with third-party AI providers</li>
          <li>Complete sovereignty over your AI models and data</li>
          <li>Enhanced security and compliance</li>
          <li>Unlimited customization and control</li>
        </ul>
      </div>
    </article>
  );
}
