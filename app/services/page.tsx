import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Server, FileText } from "lucide-react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata: Metadata = {
  title: "Services — Ajay Sidal",
  description: "Core service pillars designed to transform your operations through technology, infrastructure, and intelligent automation.",
};

function getServiceIcon(slug: string) {
  if (slug?.includes('automation') || slug?.includes('ai')) return Bot;
  if (slug?.includes('infrastructure') || slug?.includes('devops') || slug?.includes('web')) return Server;
  return FileText;
}

interface Service {
  title: string;
  slug: string;
  description: string;
  status: string;
  filename: string;
}

function getServices(): Service[] {
  const servicesDir = path.join(process.cwd(), "content/services");
  const files = fs.readdirSync(servicesDir).filter((f) => f.endsWith(".mdx"));
  
  return files
    .map((file) => {
      const filePath = path.join(servicesDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const { data, content: description } = matter(content);
      return {
        title: data.title,
        slug: data.slug,
        description: description.trim(),
        status: data.status || "published",
        filename: file,
      };
    })
    .filter((s) => s.status === "published");
}

export default function ServicesPage() {
  const services = getServices();

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="mono block mb-4">Services</span>
          <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tight mb-6">
            What I deliver.
          </h2>
          <p className="text-[#aab3bd] max-w-2xl mx-auto">
            Core service pillars designed to transform your operations through technology, infrastructure, and intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = getServiceIcon(service.slug);
            return (
              <div
                key={service.filename}
                className="glass-tilt p-8 flex flex-col h-full relative group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#D4AF37]" />
                </div>

                <h3 className="text-xl font-bold mb-4">{service.title}</h3>

                <div className="text-[#aab3bd] text-sm mb-8 flex-grow prose prose-invert max-w-none">
                  <p>{service.description}</p>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#D4AF37] rounded-lg text-[#F8F9FA] hover:bg-[#D4AF37] hover:text-[#0B0C10] transition-all duration-200 text-sm font-medium"
                  >
                    Book Free Consultation <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/project-intake"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#1F2833] rounded-lg text-[#F8F9FA] hover:border-[#D4AF37] transition-all duration-200 text-sm font-medium"
                  >
                    Ask Silas
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