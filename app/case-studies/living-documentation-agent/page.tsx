import Link from "next/link";
import MermaidChart from "@/components/MermaidChart";

export default function LivingDocsAgent() {
  return (
    <article className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="mono block mb-4">Architectural Blueprint</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#F8F9FA]">
          Living Documentation AI Agent Blueprint
        </h1>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">The Challenge</h2>
        <div className="prose prose-lg max-w-none text-[#F8F9FA]">
          <p>
            Documentation rots the moment it is written. API endpoints change,
            architecture diagrams become outdated, and onboarding new engineers
            requires archaeology through stale README files.
          </p>
          <p>
            Teams prioritize shipping features over updating documentation,
            creating a growing gap between system reality and documented state.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">The Sovereign Solution</h2>
        <div className="prose prose-lg max-w-none text-[#F8F9FA]">
          <p>
            We built an AI-powered documentation system that maintains itself
            through agent collaboration. AI agents continuously scan
            repositories, CI/CD pipelines, and infrastructure configurations to
            generate and update documentation automatically.
          </p>
          <p>
            The result is documentation that always reflects the current state
            of the system, reducing onboarding time and eliminating tribal
            knowledge dependency.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-[#0B0C10] border-l-4 border-[#D4AF37] p-6 rounded-lg">
          <h3 className="text-[#D4AF37] font-bold mb-3 text-sm uppercase tracking-wider">Measurable Outcome</h3>
          <p className="text-[#F8F9FA] text-lg">
            <strong>Documentation auto-maintained, 0 manual doc debt</strong>
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Architecture Diagram</h2>
        <MermaidChart
          chart={`graph TD
    A[Source Code Repository] --> B[AI Documentation Agent]
    B --> C[CI/CD Pipeline Scanner]
    C --> D[Infrastructure State Scanner]
    B --> E[Documentation Generator]
    E --> F[Markdown Output]
    F --> G[Git Commit]
    G --> H[Documentation Site]
    I[Developer] --> H
    J[API Changes] --> B
    K[Config Changes] --> D`}
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
