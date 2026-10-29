import Link from "next/link";
import { ArrowRight, Bot, Server, FileText } from "lucide-react";

const services = [
  {
    id: "ai-workflow-automation",
    icon: Bot,
    title: "AI Workflow Automation",
    description: "Orchestrating full-scale operations and marketing automation through deterministic AI-driven workflows. Reduce manual effort, eliminate errors, and scale your operations intelligently.",
    cta1: "/book",
    cta1Label: "Book Free Consultation",
    cta2: "/project-intake",
    cta2Label: "Ask Silas",
  },
  {
    id: "web-infrastructure-devops",
    icon: Server,
    title: "Web Infrastructure & DevOps",
    description: "High-performance web infrastructure with Nginx, Certbot, and DNS optimization. Self-hosted, sovereign, and SOC2-compliant architecture for maximum security and uptime.",
    cta1: "/book",
    cta1Label: "Book Free Consultation",
    cta2: "/project-intake",
    cta2Label: "Ask Silas",
  },
  {
    id: "technical-storytelling",
    icon: FileText,
    title: "Technical Storytelling",
    description: "Living documentation and technical storytelling through AI agent collaboration. Transform complex technical architecture into clear, actionable documentation.",
    cta1: "/book",
    cta1Label: "Book Free Consultation",
    cta2: "/project-intake",
    cta2Label: "Ask Silas",
  },
];

export default function Services() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="mono block mb-4">Services</span>
          <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tight mb-6">
            What I deliver.
          </h2>
          <p className="text-[#aab3bd] max-w-2xl mx-auto">
            Three core service pillars designed to transform your operations through technology, infrastructure, and intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="glass-tilt p-8 flex flex-col h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-[#aab3bd] text-sm mb-8 flex-grow">
                  {service.description}
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                  <Link
                    href={service.cta1}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#D4AF37] rounded-lg text-[#F8F9FA] hover:bg-[#D4AF37] hover:text-[#0B0C10] transition-all duration-200 text-sm font-medium"
                  >
                    {service.cta1Label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={service.cta2}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#1F2833] rounded-lg text-[#F8F9FA] hover:border-[#D4AF37] transition-all duration-200 text-sm font-medium"
                  >
                    {service.cta2Label}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}