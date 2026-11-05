import Link from "next/link";
import { GitBranch, ArrowRight } from "lucide-react";

const caseStudies = [
  {
    id: "ai-driven-operations-automation",
    title: "AI-Driven Operations Automation",
    description: "Automated cross-industry operations workflows reducing manual effort by 70%.",
    measurableOutcome: "70% reduction in manual effort, 100% auditability",
    route: "/case-studies/ai-operations-automation",
    tags: ["Python", "Automation", "Workflows"],
  },
  {
    id: "high-performance-nginx-certbot-deploy",
    title: "High-Performance Nginx/Certbot Deployment",
    description: "Sovereign web infrastructure with automated certificate management and load balancing.",
    measurableOutcome: "99.9% uptime, automated SSL renewal",
    route: "/case-studies/nginx-certbot-deployment",
    tags: ["Nginx", "Certbot", "DNS", "DevOps"],
  },
  {
    id: "living-docs-agent",
    title: "Living Documentation AI Agent",
    description: "AI-powered documentation system that maintains itself through agent collaboration.",
    measurableOutcome: "Documentation auto-maintained, 0 manual doc debt",
    route: "/case-studies/living-documentation-agent",
    tags: ["AI", "Documentation", "Storytelling"],
  },
  {
    id: "sovereign-web-infra",
    title: "Sovereign Web Infrastructure",
    description: "Self-hosted, privacy-first web platform architecture with SOC2 compliance.",
    measurableOutcome: "100% data sovereignty, SOC2 aligned",
    route: "/case-studies/sovereign-web-infrastructure",
    tags: ["Next.js", "Prisma", "SQLite", "Security"],
  },
  {
    id: "marketing-funnel-automation",
    title: "Marketing Funnel Automation",
    description: "End-to-end marketing automation pipeline with deterministic lead routing.",
    measurableOutcome: "Deterministic lead routing, 48-hour proposal turnaround",
    route: "/case-studies/marketing-funnel-automation",
    tags: ["Marketing", "Automation", "CRM"],
  },
  {
    id: "cross-industry-tech-leadership",
    title: "Cross-Industry Tech Leadership",
    description: "Multi-sector technology strategy spanning banking, healthcare, and logistics.",
    measurableOutcome: "Architecture patterns reusable across 3+ industries",
    route: "/case-studies/cross-industry-tech-leadership",
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
            Architectural Blueprints
          </h2>
          <p className="text-[#aab3bd] max-w-2xl mx-auto">
            Six sovereign architecture deep-dives demonstrating measurable outcomes across AI, infrastructure, and leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="glass-tilt p-6 flex flex-col h-full border border-[#1F2833]/30 hover:border-[#D4AF37]/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <GitBranch className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-xs text-[#aab3bd] mono">Architecture Blueprint</span>
              </div>
              <h3 className="text-lg font-bold mb-3">{study.title}</h3>
              <p className="text-[#aab3bd] text-sm mb-4 flex-grow line-clamp-3">
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
              <div className="bg-[#0B0C10]/30 border border-[#D4AF37]/10 rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#D4AF37] text-xs font-bold">Measurable Outcome</span>
                </div>
                <p className="text-[#aab3bd] text-xs italic">{study.measurableOutcome}</p>
              </div>
              <Link
                href={study.route}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#D4AF37] rounded-lg text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0C10] transition-all duration-200 text-sm font-medium w-full text-center"
              >
                View Architecture Blueprint
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
