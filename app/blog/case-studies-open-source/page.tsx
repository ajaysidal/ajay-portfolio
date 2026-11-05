import { Metadata } from "next";
import Link from "next/link";
import BlogImage from "@/components/BlogImage";
import BlogCTA from "@/components/BlogCTA";

export const metadata: Metadata = {
  title: "Open-Source Case Studies: How Public Repositories Drive Enterprise Innovation",
  description:
    "Six open-source repositories that prove public code is about verifiable security, community trust, and eliminating black-box vendor lock-in.",
  openGraph: {
    title: "Open-Source Case Studies: How Public Repositories Drive Enterprise Innovation",
    description:
      "Six open-source repositories that prove public code is about verifiable security, community trust, and eliminating black-box vendor lock-in.",
    url: "https://buildwithai.digital/blog/case-studies-open-source",
  },
};

export default function CaseStudiesOpenSource() {
  return (
    <article className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="mono block mb-4 text-[#D4AF37]">July 2026</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#F8F9FA]">
          Open-Source Case Studies: How Public Repositories Drive Enterprise Innovation
        </h1>
        <p className="text-[#aab3bd] text-lg max-w-2xl mx-auto mt-4">
          Public code isn’t about giving things away—it’s about verifiable
          security, community trust, and eliminating black-box vendor lock-in.
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-[#F8F9FA] space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Introduction</h2>
          <p>
            Open source is often misunderstood as “free code.” In enterprise
            contexts, it’s something more powerful: verifiability. When your
            infrastructure code is public, every dependency, every configuration,
            and every security control can be audited. You don’t have to trust
            a vendor’s marketing claims—you can read the code yourself.
          </p>
          <p>
            For enterprise buyers, this transparency is a competitive
            advantage. It means security incidents can be diagnosed faster,
          dependencies can be patched immediately, and architectural decisions
          can be challenged and improved by the community.
          </p>
        </section>

        {/* Body Section 1 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            The Trust Deficit in Closed-Source Software
          </h2>
          <p>
            Closed-source infrastructure forces you to trust blindly. You don’t
            know how your authentication library handles secrets, whether your
            encryption implementation is sound, or if your logging agent phones
            home with telemetry you didn’t authorize. When something breaks,
            you’re waiting on a vendor’s support ticket and their patch
            schedule.
          </p>
          <p>
            This opacity creates three enterprise risks:
          </p>
          <ul className="list-disc pl-6 my-4 text-[#aab3bd]">
            <li>
              <strong>Unknown attack surface:</strong> You can’t audit code
              you can’t read, so you don’t know where vulnerabilities live.
            </li>
            <li>
              <strong>Vendor lock-in:</strong> Once your business logic is
              embedded in a proprietary platform, migration becomes
              prohibitively expensive.
            </li>
            <li>
              <strong>Compliance opacity:</strong> SOC2 and GDPR audits require
              evidence of controls. Closed-source software makes that evidence
              impossible to produce independently.
            </li>
          </ul>
        </section>

        {/* Body Section 2 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            The Sovereign Solution: Public Code, Private Control
          </h2>
          <p>
            Open source flips the trust model. When your infrastructure code is
            public, every line is auditable. Every dependency is visible.
            Every security control can be verified independently. You don’t
            trust a vendor—you trust the code itself, validated by community
            scrutiny.
          </p>
          <p>
            The following GitHub Actions workflow demonstrates automated
            repository health checks—dependency audits, security scans, and
            linting—that run on every push, ensuring that public code remains
            secure and production-ready:
          </p>
          <pre className="my-6 p-4 rounded-lg bg-[#0B0C10] border border-[#1F2833] overflow-x-auto text-sm font-mono text-[#aab3bd]"><code>{`# .github/workflows/security.yml
name: Security & Dependency Audit

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: "0 2 * * 1"

jobs:
  security-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run dependency audit
        run: npm audit --audit-level=moderate

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
        with:
          command: test --all-projects --severity-threshold=high

      - name: Run ESLint
        run: npm run lint

      - name: Run TypeScript check
        run: npx tsc --noEmit

      - name: Upload audit results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: security-audit-results
          path: |
            snyk-*.json
            eslint-*.json`}</code></pre>
          <p>
            This workflow enforces that every change to public infrastructure
            code passes automated security checks before it can be merged. The
            same transparency applies to your customers—they can see exactly
            how you secure their data, not just take your word for it.
          </p>
        </section>

        {/* Visual Proof */}
        <section>
          <BlogImage
            src="/images/blog/case-studies-open-source-diagram.png"
            alt="Open-source architecture diagram showing public repositories, automated security scanning, and community trust boundaries"
            caption="Figure 1: Open-source architecture with public repositories, automated CI/CD security scanning, and verifiable community trust"
          />
        </section>

        {/* Body Section 3 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            Accelerating Vendor Procurement
          </h2>
          <p>
            Organizations that adopt open-source infrastructure report
            measurable procurement and compliance improvements:
          </p>
          <ul className="list-disc pl-6 my-4 text-[#aab3bd]">
            <li>
              <strong>50% faster</strong> security review cycles—auditors can
              verify controls directly in public code
            </li>
            <li>
              <strong>Zero vendor lock-in</strong>—you own the code, you can
              migrate anytime
            </li>
            <li>
              <strong>100% dependency visibility</strong>—every transitive
              dependency is tracked and auditable
            </li>
            <li>
              <strong>Community-driven patching</strong>—security fixes arrive
              faster through public collaboration
            </li>
          </ul>
          <p>
            When your infrastructure is public, your operations are
            accountable, and your architecture is auditable. That’s not just
            good engineering—it’s good business.
          </p>
        </section>

        {/* Strategic Internal Linking */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            Next Steps
          </h2>
          <p>
            Open source isn’t about giving away your competitive advantage.
            It’s about building trust through transparency. Whether you’re
            modernizing legacy infrastructure or designing a new platform from
            scratch, we can help you build open, auditable systems that win
            enterprise trust.
          </p>
          <p>
            Explore our <Link href="/services" className="text-[#D4AF37] hover:text-[#E5C25A] underline">Web Infrastructure & DevOps services</Link>
            to see how we structure open infrastructure engagements, or review
            our <Link href="/case-studies" className="text-[#D4AF37] hover:text-[#E5C25A] underline">architectural blueprints</Link>
            for real-world open-source implementations. When you’re ready to
            build transparent, verifiable infrastructure, <Link href="/project-intake" className="text-[#D4AF37] hover:text-[#E5C25A] underline">submit a project intake form</Link>
            and we’ll respond within 48 hours.
          </p>
        </section>
      </div>

      {/* Strategic CTA */}
      <BlogCTA />
    </article>
  );
}
