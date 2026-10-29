import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building AI Workflows That Actually Scale",
  description: "Learn how to design deterministic AI workflows that reduce manual effort by up to 70%.",
  openGraph: {
    title: "Building AI Workflows That Actually Scale",
    description: "Learn how to design deterministic AI workflows that reduce manual effort by up to 70%.",
    url: "https://ajay-portfolio.vercel.app/blog/ai-workflows-guide",
  },
};

export default function AIWorkflowsGuide() {
  return (
    <article className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="mono block mb-4">March 2025</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Building AI Workflows That Actually Scale</h1>
      </div>

      <div className="prose prose-lg max-w-none text-[#F8F9FA]">
        <p>Learn how to design deterministic AI workflows that reduce manual effort by up to 70%.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Introduction</h2>
        <p>Building scalable AI workflows requires more than just throwing models together. The key is determinism - ensuring that the same inputs always produce the same outputs, even at massive scale.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Key Principles</h2>
        <ul>
          <li>Deterministic logic at every step</li>
          <li>Clear error handling and recovery mechanisms</li>
          <li>Scalable architecture that maintains consistency</li>
          <li>Comprehensive monitoring and observability</li>
        </ul>
      </div>
    </article>
  );
}
