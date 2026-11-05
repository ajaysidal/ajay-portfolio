import { Metadata } from "next";
import Link from "next/link";
import MermaidChart from "@/components/MermaidChart";
import BlogCTA from "@/components/BlogCTA";

const SOC2_COMPLIANCE_DIAGRAM = `graph TD
    A[Scheduled Cron Job] --> B[Compliance Agent]
    B --> C{Check UFW Status}
    B --> D{Check SSH Config}
    B --> E{Check Auditd Logs}
    C --> F[Generate Evidence JSON]
    D --> F
    E --> F
    F --> G[(Secure Evidence DB)]
    G --> H[Auditor Dashboard]
    classDef sovereign fill:#1F2833,stroke:#D4AF37,stroke-width:2px,color:#F8F9FA;
    class B,F sovereign;`;

const BASH_COMPLIANCE_SCRIPT = `# compliance-evidence.sh - Automated SOC 2 evidence collection
# Run weekly via cron and store output in /var/log/compliance/

LOG_DIR="/var/log/compliance"
TIMESTAMP=\$(date +%Y%m%d_%H%M%S)
LOG_FILE="\${LOG_DIR}/compliance_\${TIMESTAMP}.log"

mkdir -p "\${LOG_DIR}"

echo "============================================" | tee -a "\${LOG_FILE}"
echo "SOC 2 Compliance Evidence Collection" | tee -a "\${LOG_FILE}"
echo "Timestamp: \${TIMESTAMP}" | tee -a "\${LOG_FILE}"
echo "============================================" | tee -a "\${LOG_FILE}"

echo ""
echo "--- SSH Authentication (Should be key-only) ---" | tee -a "\${LOG_FILE}"
SSH_CONFIG="/etc/ssh/sshd_config"
if grep -q "^PasswordAuthentication yes" "\${SSH_CONFIG}"; then
    echo "FAIL: Password authentication is enabled" | tee -a "\${LOG_FILE}"
else
    echo "PASS: Password authentication is disabled" | tee -a "\${LOG_FILE}"
fi

if grep -q "^PubkeyAuthentication yes" "\${SSH_CONFIG}"; then
    echo "PASS: Public key authentication is enabled" | tee -a "\${LOG_FILE}"
else
    echo "FAIL: Public key authentication is disabled" | tee -a "\${LOG_FILE}"
fi

echo ""
echo "--- Firewall Status (UFW) ---" | tee -a "\${LOG_FILE}"
if command -v ufw &> /dev/null; then
    UFW_STATUS=\$(ufw status)
    echo "\${UFW_STATUS}" | tee -a "\${LOG_FILE}"
    if echo "\${UFW_STATUS}" | grep -q "Status: active"; then
        echo "PASS: UFW firewall is active" | tee -a "\${LOG_FILE}"
    else
        echo "FAIL: UFW firewall is not active" | tee -a "\${LOG_FILE}"
    fi
else
    echo "WARNING: UFW not installed" | tee -a "\${LOG_FILE}"
fi

echo ""
echo "--- Failed SSH Attempts ---" | tee -a "\${LOG_FILE}"
if [ -f /var/log/auth.log ]; then
    FAILED_COUNT=\$(grep "Failed password" /var/log/auth.log | wc -l)
    echo "Failed password attempts: \${FAILED_COUNT}" | tee -a "\${LOG_FILE}"
else
    echo "INFO: /var/log/auth.log not found" | tee -a "\${LOG_FILE}"
fi

echo ""
echo "--- Root Login (Should be disabled) ---" | tee -a "\${LOG_FILE}"
if grep -q "^PermitRootLogin yes" "\${SSH_CONFIG}"; then
    echo "FAIL: Root login is enabled" | tee -a "\${LOG_FILE}"
else
    echo "PASS: Root login is disabled" | tee -a "\${LOG_FILE}"
fi

echo ""
echo "Compliance evidence collection complete." | tee -a "\${LOG_FILE}"
echo "Log saved to: \${LOG_FILE}" | tee -a "\${LOG_FILE}"
`;

export const metadata: Metadata = {
  title: "SOC 2 Compliance for Small Teams: Demystifying Enterprise Security on a Startup Budget",
  description:
    "Real-world SOC 2 implementation steps that small teams can follow without enterprise overhead. Process and discipline over expensive tools.",
  openGraph: {
    title: "SOC 2 Compliance for Small Teams: Demystifying Enterprise Security on a Startup Budget",
    description:
      "Real-world SOC 2 implementation steps that small teams can follow without enterprise overhead. Process and discipline over expensive tools.",
    url: "https://buildwithai.digital/blog/soc2-compliance-for-small-teams",
  },
};

export default function Soc2ComplianceSmallTeams() {
  return (
    <article className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="mono block mb-4 text-[#D4AF37]">September 2026</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#F8F9FA]">
          SOC 2 Compliance for Small Teams: Demystifying Enterprise Security on a Startup Budget
        </h1>
        <p className="text-[#aab3bd] text-lg max-w-2xl mx-auto mt-4">
          SOC 2 isn’t about expensive consultants or enterprise tools—it’s
          about process, discipline, and audit trails you can actually produce.
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-[#F8F9FA] space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Introduction</h2>
          <p>
            SOC 2 compliance is often portrayed as an enterprise-only pursuit,
            requiring expensive consultants, months of preparation, and six-figure
            budgets. For small teams serving B2B customers, SOC 2 isn’t optional
            anymore—it’s a sales requirement. Prospects ask for your SOC 2 report
            before they’ll sign a contract.
          </p>
          <p>
            The good news: you can achieve SOC 2 without enterprise overhead.
            Compliance isn’t about buying the right tools—it’s about building the
            right processes and maintaining the right evidence. This guide shows
            you how.
          </p>
        </section>

        {/* Body Section 1 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            The Enterprise Compliance Bottleneck
          </h2>
          <p>
            Small teams face a catch-22: you need SOC 2 to win enterprise
            customers, but you don’t have the budget or headcount of an enterprise
            security team. The typical paths—hiring a Big Four consultant for
            $100,000+, or buying a GRC platform that costs more than your
            engineering budget—don’t fit.
          </p>
          <p>
            The result is that compliance gets deferred. Teams ship features
            instead of documenting controls. They implement security measures
            but don’t collect the evidence auditors need. When a prospect asks
            for a SOC 2 report, they have nothing to show.
          </p>
          <p>
            SOC 2 evaluates five Trust Service Criteria: Security, Availability,
            Processing Integrity, Confidentiality, and Privacy. For most small
            teams, Security is the primary focus—with Availability and
            Confidentiality close behind. The controls aren’t complex. They’re
            just disciplined:
          </p>
          <ul className="list-disc pl-6 my-4 text-[#aab3bd]">
            <li>
              Access controls: who can touch production, and how do you know?
            </li>
            <li>
              Change management: who approved that production deploy, and when?
            </li>
            <li>
              Incident response: if something breaks at 2 AM, who fixes it, and
              how is it documented?
            </li>
            <li>
              Monitoring: are you alerted before your customers notice?
            </li>
          </ul>
        </section>

        {/* Body Section 2 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            The Sovereign Solution: Process and Discipline
          </h2>
          <p>
            SOC 2 compliance isn’t about buying tools. It’s about building
            processes that generate audit evidence automatically. The Sovereign
            Stack ethos—self-hosted, transparent, auditable—aligns perfectly
            with SOC 2 because both value control over dependency.
          </p>
          <p>
            The following Bash script demonstrates automated compliance evidence
            collection: verifying SSH key-only authentication, checking UFW
            firewall status, and logging the output for audit trails. This is
            exactly the kind of evidence an auditor wants to see—automated,
            timestamped, and repeatable.
          </p>
          <pre className="my-6 p-4 rounded-lg bg-[#0B0C10] border border-[#1F2833] overflow-x-auto text-sm font-mono text-[#aab3bd]"><code>{BASH_COMPLIANCE_SCRIPT}</code></pre>
          <p>
            Run this script weekly via cron and store the output in your
            compliance evidence repository. When an auditor asks for evidence
            of access controls or system hardening, you have timestamped,
            automated logs—not a consultant’s PowerPoint deck.
          </p>
        </section>

        {/* Visual Proof */}
        <section>
          <MermaidChart
            chart={SOC2_COMPLIANCE_DIAGRAM}
            caption="Figure 1: SOC 2 compliance architecture with automated evidence collection, access controls, and audit trail storage"
          />
        </section>

        {/* Body Section 3 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            Achieving Audit-Readiness in Weeks, Not Months
          </h2>
          <p>
            Small teams that adopt process-first compliance report measurable
            improvements:
          </p>
          <ul className="list-disc pl-6 my-4 text-[#aab3bd]">
            <li>
              <strong>6-8 weeks</strong> to SOC 2 readiness vs. 6-12 months
              with consultants
            </li>
            <li>
              <strong>90% cost reduction</strong> vs. Big Four consulting firms
            </li>
            <li>
              <strong>Automated evidence collection</strong>—audit logs
              generated weekly without manual effort
            </li>
            <li>
              <strong>Continuous compliance</strong>—controls are verified
              weekly, not annually
            </li>
          </ul>
          <p>
            Compliance isn’t a destination—it’s an operating discipline. Build
            the process once, automate the evidence, and you’ll be audit-ready
            whenever a prospect asks.
          </p>
        </section>

        {/* Strategic Internal Linking */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            Next Steps
          </h2>
          <p>
            SOC 2 compliance is achievable for small teams with the right
            approach: automate what you can, document what you must, and
            monitor continuously. Whether you’re preparing for your first audit
            or strengthening your existing controls, we can help.
          </p>
          <p>
            Explore our <Link href="/services" className="text-[#D4AF37] hover:text-[#E5C25A] underline">Web Infrastructure & DevOps services</Link>
            to see how we structure compliance-ready infrastructure
            engagements, or review our <Link href="/case-studies" className="text-[#D4AF37] hover:text-[#E5C25A] underline">open-source architectural blueprints</Link>
            for real-world security implementations. When you’re ready to
            discuss your compliance roadmap, <Link href="/book" className="text-[#D4AF37] hover:text-[#E5C25A] underline">book a free discovery call</Link>
            and we’ll assess your current state in 30 minutes.
          </p>
        </section>
      </div>

      {/* Strategic CTA */}
      <BlogCTA />
    </article>
  );
}
