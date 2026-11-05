import Link from "next/link";
import MermaidChart from "@/components/MermaidChart";

export default function SovereignWebInfrastructure() {
  return (
    <article className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="mono block mb-4">Architectural Blueprint</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#F8F9FA]">
          Sovereign Web Infrastructure Blueprint
        </h1>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">The Challenge</h2>
        <div className="prose prose-lg max-w-none text-[#F8F9FA]">
          <p>
            Cloud vendor lock-in creates data sovereignty risks, unpredictable
            pricing, and compliance challenges. Organizations lose control over
            their data residency and face vendor-driven pricing increases.
          </p>
          <p>
            Compliance requirements like SOC2 demand audit trails, access
            controls, and data residency guarantees that public cloud providers
            struggle to deliver cost-effectively.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">The Sovereign Solution</h2>
        <div className="prose prose-lg max-w-none text-[#F8F9FA]">
          <p>
            We architected a self-hosted, privacy-first web platform using
            Next.js, Prisma, and SQLite on sovereign infrastructure. Every
            component is containerized, auditable, and under the organization's
            direct control.
          </p>
          <p>
            The platform implements SOC2-aligned practices including access
            controls, audit logging, and data encryption, ensuring compliance
            without vendor dependency.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-[#0B0C10] border-l-4 border-[#D4AF37] p-6 rounded-lg">
          <h3 className="text-[#D4AF37] font-bold mb-3 text-sm uppercase tracking-wider">Measurable Outcome</h3>
          <p className="text-[#F8F9FA] text-lg">
            <strong>100% data sovereignty, SOC2 aligned</strong>
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Architecture Diagram</h2>
        <MermaidChart
          chart={`graph TD
    A[End User] --> B[Nginx Load Balancer]
    B --> C[Next.js Application]
    C --> D[Prisma ORM]
    D --> E[SQLite Database]
    C --> F[File Storage]
    C --> G[Audit Log Service]
    G --> H[SOC2 Compliance Report]
    I[Admin Dashboard] --> C
    J[Backup Service] --> E
    J --> K[Offsite Storage]`}
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
