import Link from "next/link";
import { Metadata } from "next";
import { Clock } from "lucide-react";

const blogPosts = [
  {
    title: "Building AI Workflows That Actually Scale: A Practical Guide",
    date: "March 2025",
    readTime: "8 min read",
    summary: "Learn how to design deterministic AI workflows that reduce manual effort by up to 70%.",
    tags: ["AI", "Workflow Automation"],
    cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e943c?w=800&q=80",
    slug: "ai-workflows-guide",
  },
  {
    title: "Nginx Uptime Secrets: Designing Self-Hosted Infrastructure That Never Breaks",
    date: "June 2025",
    readTime: "6 min read",
    summary: "Understand high-performance Nginx deployments with Certbot DNS automation.",
    tags: ["Nginx", "Infrastructure"],
    cover: "https://images.unsplash.com/photo-1551434678-e076c223a6ff?w=800&q=80",
    slug: "nginx-uptime-secrets",
  },
  {
    title: "The Sovereign AI Ethos: Why Self-Hosted Data Is the Future of Trust",
    date: "September 2025",
    readTime: "10 min read",
    summary: "Exploring privacy-first, self-hosted AI architecture that never shares your data with third-party providers.",
    tags: ["Sovereign AI", "Privacy"],
    cover: "https://images.unsplash.com/photo-1558494949-ef7d57d6f369?w=800&q=80",
    slug: "sovereign-ai-ethos",
  },
  {
    title: "Operational Automation: From Manual Bots to Deterministic Agents",
    date: "December 2025",
    readTime: "9 min read",
    summary: "Transforming operations through deterministic automation vs. AI hallucinations.",
    tags: ["Automation", "Operations"],
    cover: "https://images.unsplash.com/photo-1551288049-bebda080c5ff?w=800&q=80",
    slug: "operational-automation",
  },
  {
    title: "Certbot & DNS Automation: The Stack That Keeps Your Site Live",
    date: "March 2026",
    readTime: "5 min read",
    summary: "Complete breakdown of Certbot certificate management and DNS automation pipelines.",
    tags: ["DevOps", "Certificate Management"],
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    slug: "certbot-dns-automation",
  },
  {
    title: "Technical Storytelling: How Living Documentation Transforms Technical Teams",
    date: "May 2026",
    readTime: "7 min read",
    summary: "Moving beyond static docs to living documentation maintained by AI agents.",
    tags: ["Documentation", "AI"],
    cover: "https://images.unsplash.com/photo-1517053178593-a979e86e780a?w=800&q=80",
    slug: "living-documentation-storytelling",
  },
  {
    title: "Case Studies: Six Open-Source Repositories That Changed Our Approach",
    date: "July 2026",
    readTime: "12 min read",
    summary: "Deep dives into six real projects spanning AI, infrastructure, and leadership.",
    tags: ["Case Studies", "Open Source"],
    cover: "https://images.unsplash.com/photo-1521737544346-1c78329e5a95?w=800&q=80",
    slug: "case-studies-open-source",
  },
  {
    title: "SOC2 Compliance for Small Teams: What It Actually Requires",
    date: "September 2026",
    readTime: "6 min read",
    summary: "Real-world compliance implementation steps that do not require enterprise resources.",
    tags: ["Compliance", "Security"],
    cover: "https://images.unsplash.com/photo-1451187580454-4381ba9ea493?w=800&q=80",
    slug: "soc2-compliance-for-small-teams",
  },
  {
    title: "Cross-Industry Tech Leadership: Banking to Healthcare to Logistics",
    date: "November 2026",
    readTime: "11 min read",
    summary: "How leading technology strategies span multiple industries effectively.",
    tags: ["Leadership", "Strategy"],
    cover: "https://images.unsplash.com/photo-1574722164784-f7d7db59940e?w=800&q=80",
    slug: "cross-industry-tech-leadership",
  },
  {
    title: "The Marketing Funnel Automation Playbook: End-to-End Efficiency",
    date: "October 2026",
    readTime: "8 min read",
    summary: "Deterministic lead routing that converts attention into action reliably.",
    tags: ["Marketing", "Automation"],
    cover: "https://images.unsplash.com/photo-1484723091739-51d248e4a23b?w=800&q=80",
    slug: "marketing-funnel-automation",
  },
];

export default function Blog() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="mono block mb-4">Blog</span>
          <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tight mb-6">
            Insights, strategies, and infrastructure.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-tilt p-6 h-full group flex flex-col"
            >
              <div className="flex items-center gap-2 text-xs text-[#aab3bd] mb-4">
                <Clock className="w-3 h-3" />
                {post.date} · {post.readTime}
              </div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-3">
                {post.title}
              </h3>
              <p className="text-[#aab3bd] text-sm mb-4 flex-grow line-clamp-3">
                {post.summary}
              </p>
              <div className="flex flex-wrap gap-2 flex-grow mb-4">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded bg-[#1F2833] text-[#aab3bd]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-[#D4AF37] text-sm group-hover:underline cursor-pointer">
                Read →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}