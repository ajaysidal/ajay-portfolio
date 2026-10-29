import Link from "next/link";
import { GitBranch, ArrowRight } from "lucide-react";

const caseStudies = [
  {
    id: "ai-driven-operations-automation",
    title: "AI-Driven Operations Automation",
    description: "Automated cross-industry operations workflows reducing manual effort by 70%.",
    repo: "https://github.com/ajaysidal/ai-operations-automation",
    tags: ["Python", "Automation", "Workflows"],
  },
  {
    id: "high-performance-nginx-certbot-deploy",
    title: "High-Performance Nginx/Certbot Deployment",
    description: "Sovereign web infrastructure with automated certificate management and load balancing.",
    repo: "https://github.com/ajaysidal/nginx-certbot-deploy",
    tags: ["Nginx", "Certbot", "DNS", "DevOps"],
  },
  {
    id: "living-docs-agent",
    title: "Living Documentation AI Agent",
    description: "AI-powered documentation system that maintains itself through agent collaboration.",
    repo: "https://github.com/ajaysidal/living-docs-agent",
    tags: ["AI", "Documentation", "Storytelling"],
  },
  {
    id: "sovereign-web-infra",
    title: "Sovereign Web Infrastructure",
    description: "Self-hosted, privacy-first web platform architecture with SOC2 compliance.",
    repo: "https://github.com/ajaysidal/sovereign-web-infra",
    tags: ["Next.js", "Prisma", "SQLite", "Security"],
  },
  {
    id: "marketing-funnel-automation",
    title: "Marketing Funnel Automation",
    description: "End-to-end marketing automation pipeline with deterministic lead routing.",
    repo: "https://github.com/ajaysidal/marketing-funnel-automation",
    tags: ["Marketing", "Automation", "CRM"],
  },
  {
    id: "cross-industry-tech-leadership",
    title: "Cross-Industry Tech Leadership",
    description: "Multi-sector technology strategy spanning banking, healthcare, and logistics.",
    repo: "https://github.com/ajaysidal/cross-industry-tech-leadership",
    tags: ["Leadership", "Strategy", "Architecture"],
  },
];

export default function CaseStudies() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="mono block mb-4">Case Studies</span>
          <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tight mb-6">
            Real repositories, real impact.
          </h2>
          <p className="text-[#aab3bd] max-w-2xl mx-auto">
            Six open-source repositories demonstrating the breadth and depth of engineering across AI, infrastructure, and leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="glass-tilt p-6 flex flex-col h-full"
            >
              <div className="flex items-center gap-2 mb-4">
                <GitBranch className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-xs text-[#aab3bd] mono">GitHub Repo</span>
              </div>
              <h3 className="text-lg font-bold mb-3">{study.title}</h3>
              <p className="text-[#aab3bd] text-sm mb-4 flex-grow">
                {study.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {study.tags.map((tag, tagIndex) => (
<span
                      key={tag}
                      className="text-xs px-2 py-1 rounded bg-[#1F2833] text-[#aab3bd]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={study.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#E5C25A] transition-colors text-sm font-medium"
              >
                View Repository
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}