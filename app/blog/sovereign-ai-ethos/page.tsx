import { Metadata } from "next";
import Link from "next/link";
import MermaidChart from "@/components/MermaidChart";
import BlogCTA from "@/components/BlogCTA";

const SOVEREIGN_AI_ETHOS_DIAGRAM = `graph TD
    User[Enterprise User] -->|Secure Request| Gateway[Internal API Gateway]
    subgraph Sovereign Stack [Self-Hosted Environment]
        Gateway --> Orchestrator[AI Orchestrator]
        Orchestrator -->|Local Inference| Ollama[(Ollama)]
        Ollama -->|Loads Model| LLM[Llama 3 / Mistral]
        Orchestrator --> DB[(Local Vector DB)]
    end
    LLM -->|JSON Output| Orchestrator
    Orchestrator -->|Response| User
    classDef sovereign fill:#1F2833,stroke:#D4AF37,stroke-width:2px,color:#F8F9FA;
    class Sovereign Stack,Ollama,LLM,DB sovereign;`;

export const metadata: Metadata = {
  title: "The Sovereign AI Ethos: Why Self-Hosted Data Is the Future of Trust",
  description: "Exploring privacy-first, self-hosted AI architecture that never shares your data with third-party providers.",
  openGraph: {
    title: "The Sovereign AI Ethos: Why Self-Hosted Data Is the Future of Trust",
    description: "Exploring privacy-first, self-hosted AI architecture that never shares your data with third-party providers.",
    url: "https://buildwithai.digital/blog/sovereign-ai-ethos",
  },
};

export default function SovereignAIEthos() {
  return (
    <article className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="mono block mb-4 text-[#D4AF37]">September 2025</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#F8F9FA]">
          The Sovereign AI Ethos: Why Self-Hosted Data Is the Future of Enterprise Trust
        </h1>
        <p className="text-[#aab3bd] text-lg max-w-2xl mx-auto mt-4">
          Privacy-first, self-hosted AI architecture that never shares your
          data with third-party providers.
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-[#F8F9FA] space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Introduction</h2>
          <p>
            Every time you send customer data to a third-party AI API, you lose
            control of it. Training data, proprietary business logic, and
            sensitive customer information leave your infrastructure and enter
            systems you cannot audit, govern, or delete.
          </p>
          <p>
            The Sovereign AI ethos represents a fundamental shift: keep every
            byte of data self-hosted and in-house. Complete data privacy is not
            a feature—it is a prerequisite for trust, compliance, and
            competitive advantage in regulated industries.
          </p>
        </section>

        {/* Body Section 1 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            The Hidden Risks of Third-Party AI APIs
          </h2>
          <p>
            When you send your data to a public AI provider, you surrender
            sovereignty. Your prompts become training data. Your proprietary
            logic becomes model weights. Your customer conversations become
            someone else's competitive intelligence.
          </p>
          <p>
            The compliance implications are severe. Under the NZ Privacy Act
            2020 and GDPR, you remain responsible for personal data regardless
            of where it is processed. If your AI provider trains on customer
            data without consent, you are liable—not them. Data residency
            requirements mean certain information simply cannot leave your
            jurisdiction, yet cloud AI providers route requests through
            unpredictable geographic paths.
          </p>
          <p>
            Vendor lock-in compounds the risk. Once your business logic is
            embedded in a third-party model's context window or fine-tuned
            weights, migration becomes prohibitively expensive. You are no
            longer in control of your own AI capability.
          </p>
        </section>

        {/* Body Section 2 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            The Sovereign Solution: Local Inference with Ollama
          </h2>
          <p>
            Sovereign AI means running models on infrastructure you control.
            Data never leaves your network. Inference happens locally.
            Compliance is automatic because data residency is enforced by
            network topology, not by a vendor's terms of service.
          </p>
          <p>
            The following Docker Compose configuration deploys a local Ollama
            instance for self-hosted LLM inference, with no external API calls
            and no data leaving your environment:
          </p>
          <pre className="my-6 p-4 rounded-lg bg-[#0B0C10] border border-[#1F2833] overflow-x-auto text-sm font-mono text-[#aab3bd]"><code>{`# docker-compose.yml
version: "3.8"

services:
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama-data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    restart: unless-stopped

  sovereign-ai-app:
    build: .
    container_name: sovereign-ai-app
    depends_on:
      - ollama
    environment:
      - OLLAMA_HOST=http://ollama:11434
      - DATA_RESIDENCY=local
      - NO_EXTERNAL_API_CALLS=true
    restart: unless-stopped

volumes:
  ollama-data:`}</code></pre>
          <p>
            With this architecture, every inference request stays within your
            network boundary. No data is transmitted to third-party AI
            providers. No training occurs on your proprietary information. Your
            compliance obligations under NZ Privacy Act 2020 and GDPR are met
            by design—not by promise.
          </p>
        </section>

        {/* Visual Proof */}
        <section>
          <MermaidChart
            chart={SOVEREIGN_AI_ETHOS_DIAGRAM}
            caption="Figure 1: Sovereign AI architecture with local Ollama inference, data residency enforcement, and zero external data transmission"
          />
        </section>

        {/* Body Section 3 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            Achieving 100% Data Sovereignty
          </h2>
          <p>
            Organizations that adopt sovereign AI infrastructure report
            measurable compliance and operational improvements:
          </p>
          <ul className="list-disc pl-6 my-4 text-[#aab3bd]">
            <li>
              <strong>100% data residency compliance</strong>—no customer data
              leaves your infrastructure
            </li>
            <li>
              <strong>Zero third-party data sharing</strong>—no model training
              on your proprietary information
            </li>
            <li>
              <strong>GDPR and NZ Privacy Act 2020 alignment</strong>—data
              residency enforced by architecture, not policy
            </li>
            <li>
              <strong>Eliminated vendor lock-in</strong>—you own your models,
              your weights, and your inference pipeline
            </li>
          </ul>
          <p>
            Sovereignty is not a luxury. It is the foundation of trust in the
            AI era. When your customers ask where their data goes, you should
            be able to answer: it never left.
          </p>
        </section>

        {/* Strategic Internal Linking */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            Next Steps
          </h2>
          <p>
            Building sovereign AI infrastructure requires deliberate
            architecture—from model selection to network boundaries to
            compliance documentation. Whether you are modernizing existing AI
            workloads or designing a new self-hosted platform from scratch, we
            can help.
          </p>
          <p>
            Explore our <Link href="/services" className="text-[#D4AF37] hover:text-[#E5C25A] underline">AI Workflow Automation services</Link>
            to see how we structure sovereign AI engagements, or review our <Link href="/case-studies" className="text-[#D4AF37] hover:text-[#E5C25A] underline">open-source architectural blueprints</Link>
            for real-world self-hosted AI patterns. When you are ready to
            discuss your data sovereignty requirements, <Link href="/project-intake" className="text-[#D4AF37] hover:text-[#E5C25A] underline">submit a project intake form</Link>
            and we will respond with a precise proposal within 48 hours.
          </p>
        </section>
      </div>

      {/* Strategic CTA */}
      <BlogCTA />
    </article>
  );
}
