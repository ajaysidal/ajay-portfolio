import Link from "next/link";
import MermaidChart from "@/components/MermaidChart";

export default function MarketingFunnelAutomation() {
  return (
    <article className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="mono block mb-4">Architectural Blueprint</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#F8F9FA]">
          Marketing Funnel Automation Blueprint
        </h1>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">The Challenge</h2>
        <div className="prose prose-lg max-w-none text-[#F8F9FA]">
          <p>
            Marketing funnels leak. Leads fall through cracks, follow-ups are
            delayed, and attribution is guesswork. The result is wasted ad spend,
            missed opportunities, and sales teams chasing cold prospects.
          </p>
          <p>
            Without deterministic routing, every lead enters the funnel by
            chance, and conversion rates remain unpredictable.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">The Sovereign Solution</h2>
        <div className="prose prose-lg max-w-none text-[#F8F9FA]">
          <p>
            We implemented deterministic funnel automation with explicit routing
            rules, automated lead scoring, and guaranteed SLA follow-up. Every
            lead is captured, routed, nurtured, and converted based on
            version-controlled business logic.
          </p>
          <p>
            Every handoff is logged for full attribution, and every lead
            receives a follow-up within the defined service level agreement.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-[#0B0C10] border-l-4 border-[#D4AF37] p-6 rounded-lg">
          <h3 className="text-[#D4AF37] font-bold mb-3 text-sm uppercase tracking-wider">Measurable Outcome</h3>
          <p className="text-[#F8F9FA] text-lg">
            <strong>Deterministic lead routing, 48-hour proposal turnaround</strong>
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Architecture Diagram</h2>
        <MermaidChart
          chart={`graph TD
    A[Lead Capture Form] --> B[Lead Ingestion Service]
    B --> C[Lead Scoring Engine]
    C --> D[Routing Rules Engine]
    D --> E[Sales Team Assignment]
    D --> F[Nurture Sequence]
    F --> G[Automated Email Series]
    G --> H[Lead Qualification]
    H --> I[Sales Follow-Up]
    I --> J[CRM Record]
    E --> J
    H --> K[Proposal Generation]
    K --> L[Client Conversion]`}
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
