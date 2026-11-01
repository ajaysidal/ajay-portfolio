'use client';

import { useTina } from 'tinacms/dist/react';
import Link from "next/link";
import { ArrowRight, Bot, Server, FileText } from "lucide-react";

function getServiceIcon(slug: string) {
  if (slug?.includes('automation') || slug?.includes('ai')) return Bot;
  if (slug?.includes('infrastructure') || slug?.includes('devops') || slug?.includes('web')) return Server;
  return FileText;
}

// Explicitly define the query to avoid generated client TS typing issues
const SERVICES_QUERY = `
  query ServicesConnection($first: Int) {
    servicesConnection(first: $first) {
      edges {
        node {
          _sys {
            filename
          }
          title
          slug
          description
          status
          _tina {
            fieldProps {
              title
              description
            }
          }
        }
      }
    }
  }
`;

export default function ServicesList({ initialServices }: { initialServices: any[] }) {
  const { data } = useTina({
    query: SERVICES_QUERY,
    variables: { first: 100 },
    data: { 
      servicesConnection: { 
        edges: initialServices.map((s: any) => ({ node: s })) 
      } 
    },
  });

  const services = (data.servicesConnection?.edges || [])
    .map((edge: any) => edge.node)
    .filter((node: any) => node && node.status === "published");

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
          {services.map((service: any) => {
            const Icon = getServiceIcon(service.slug);
            return (
              <div
                key={service._sys?.filename || service.slug}
                className="glass-tilt p-8 flex flex-col h-full relative group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#D4AF37]" />
                </div>

                <h3 className="text-xl font-bold mb-4" {...service._tina?.fieldProps?.title}>
                  {service.title}
                </h3>

                <div className="text-[#aab3bd] text-sm mb-8 flex-grow prose prose-invert max-w-none" {...service._tina?.fieldProps?.description}>
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
