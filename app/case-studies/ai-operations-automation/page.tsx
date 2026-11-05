import Link from "next/link";
import MermaidChart from "@/components/MermaidChart";

export default function AIOperationsAutomation() {
  return (
    <article className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="mono block mb-4">Architectural Blueprint</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#F8F9FA]">
          AI-Driven Operations Automation Blueprint
        </h1>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">The Challenge</h2>
        <div className="prose prose-lg max-w-none text-[#F8F9FA]">
          <p>
            Manual operations are the silent killer of scaling businesses. Every
            repetitive task, every copy-paste, every human handoff introduces
            latency, error, and cost. Teams spend 70% of their time on
            low-value operational tasks that could be automated.
          </p>
          <p>
            Existing automation tools break the moment a UI changes or an API
            shifts, creating brittle workflows that require constant human
            intervention and never truly scale.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">The Sovereign Solution</h2>
        <div className="prose prose-lg max-w-none text-[#F8F9FA]">
          <p>
            We implemented a deterministic automation architecture using Python-based
            workflow engines, event-driven routing, and sovereign infrastructure.
            Every workflow is version-controlled, auditable, and fails safely when
            exceptions occur.
          </p>
          <p>
            AI is used for extraction and classification, never for deciding
            business logic. This ensures deterministic outputs with full
            traceability at every step.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-[#0B0C10] border-l-4 border-[#D4AF37] p-6 rounded-lg">
          <h3 className="text-[#D4AF37] font-bold mb-3 text-sm uppercase tracking-wider">Measurable Outcome</h3>
          <p className="text-[#F8F9FA] text-lg">
            <strong>70% reduction in manual effort, 100% auditability</strong>
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Architecture Diagram</h2>
        <MermaidChart
          chart={`graph TD
    A[Client Request] --> B[Workflow Trigger]
    B --> C[Deterministic Router]
    C --> D[Python Automation Engine]
    D --> E[API Integration Layer]
    D --> F[Data Transformation]
    E --> G[Target Systems]
    F --> H[Result Store]
    G --> I[Notification Service]
    H --> J[Audit Log]
    I --> K[User Dashboard]
    J --> K`}
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
