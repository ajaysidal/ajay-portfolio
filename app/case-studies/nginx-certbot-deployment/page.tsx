import Link from "next/link";
import MermaidChart from "@/components/MermaidChart";

export default function NginxCertbotDeployment() {
  return (
    <article className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="mono block mb-4">Architectural Blueprint</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#F8F9FA]">
          High-Performance Nginx/Certbot Deployment Blueprint
        </h1>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">The Challenge</h2>
        <div className="prose prose-lg max-w-none text-[#F8F9FA]">
          <p>
            TLS certificates expire, DNS records drift, and subdomains go
            unmanaged. In self-hosted infrastructure, certificate renewal becomes
            a monthly fire drill and DNS misconfigurations cause unexpected
            outages.
          </p>
          <p>
            Without automation, infrastructure teams spend hours on certificate
            management instead of improving system performance and reliability.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">The Sovereign Solution</h2>
        <div className="prose prose-lg max-w-none text-[#F8F9FA]">
          <p>
            We deployed Certbot with automated Let's Encrypt certificate
            management integrated with Nginx reverse proxy. The architecture
            handles ACME challenge validation, certificate retrieval, and web
            server reloading without human intervention.
          </p>
          <p>
            DNS automation pipelines ensure records are always synchronized with
            infrastructure state, preventing downtime from stale or missing
            records.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-[#0B0C10] border-l-4 border-[#D4AF37] p-6 rounded-lg">
          <h3 className="text-[#D4AF37] font-bold mb-3 text-sm uppercase tracking-wider">Measurable Outcome</h3>
          <p className="text-[#F8F9FA] text-lg">
            <strong>99.9% uptime, automated SSL renewal</strong>
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Architecture Diagram</h2>
        <MermaidChart
          chart={`graph TD
    A[Client HTTPS Request] --> B[Nginx Reverse Proxy]
    B --> C[Next.js Application]
    B --> D[Static Assets]
    C --> E[PostgreSQL Database]
    C --> F[Redis Cache]
    B --> G[Certbot ACME Client]
    G --> H[Let's Encrypt CA]
    G --> I[SSL Certificate Store]
    I --> B
    J[DNS Automation] --> K[DNS Provider]
    J --> B`}
        />
      </section>

      <section className="pt-8 border-t border-[#1F2833]">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/project-intake"
            className="px-8 py-3 bg-[#D4AF37] text-[#0B0C10] rounded-lg font-bold hover:bg-[#b8962e] transition-colors text-sm"
          >
            Submit Project Intake
          </Link>
          <Link
            href="/book"
            className="px-8 py-3 border border-[#D4AF37] rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors text-sm"
          >
            Book a Free Discovery Call
          </Link>
        </div>
      </section>
    </article>
  );
}
