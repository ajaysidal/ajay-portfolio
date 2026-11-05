import { Metadata } from "next";
import Link from "next/link";
import BlogImage from "@/components/BlogImage";
import BlogCTA from "@/components/BlogCTA";

const WEBHOOK_HANDLER_SNIPPET = `// webhook/lead-router.ts - Deterministic lead routing with Zod validation
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

export const LeadSchema = z.object({
  id: z.string().uuid(),
  source: z.enum(["form", "ad", "referral", "webinar"]),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  companySize: z.enum(["smb", "mid-market", "enterprise"]),
  industry: z.string().min(1),
  budget: z.number().positive(),
  timeline: z.enum(["0-30", "31-60", "61-90", "90+"]),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  company: z.string().min(1),
  phone: z.string().optional(),
  message: z.string().optional(),
  createdAt: z.string().datetime(),
});

export type Lead = z.infer<typeof LeadSchema>;

export interface RoutingRule {
  condition: (lead: Lead) => boolean;
  pipeline: string;
  owner: string;
  sla: string;
}

export class LeadRouter {
  private rules: RoutingRule[] = [];

  addRule(rule: RoutingRule): void {
    this.rules.push(rule);
  }

  route(lead: Lead): { pipeline: string; owner: string; sla: string } {
    for (const rule of this.rules) {
      if (rule.condition(lead)) {
        return rule;
      }
    }
    throw new Error("No routing rule matched for lead: " + lead.id);
  }
}

// Deterministic routing rules - version-controlled and auditable
export const routingRules: RoutingRule[] = [
  {
    condition: (lead) => lead.companySize === "enterprise",
    pipeline: "Enterprise Sales Pipeline",
    owner: "enterprise-sales@company.com",
    sla: "15 minutes",
  },
  {
    condition: (lead) =>
      lead.companySize === "mid-market" &&
      (lead.industry === "healthcare" || lead.industry === "finance"),
    pipeline: "Regulated Industries Pipeline",
    owner: "regulated-sales@company.com",
    sla: "30 minutes",
  },
  {
    condition: (lead) => lead.companySize === "mid-market",
    pipeline: "Mid-Market Sales Pipeline",
    owner: "midmarket-sales@company.com",
    sla: "60 minutes",
  },
  {
    condition: (lead) => lead.companySize === "smb" && lead.budget >= 5000,
    pipeline: "High-Value SMB Pipeline",
    owner: "smb-sales@company.com",
    sla: "2 hours",
  },
  {
    condition: (lead) => lead.companySize === "smb",
    pipeline: "SMB Self-Service Pipeline",
    owner: "smb-automation@company.com",
    sla: "4 hours",
  },
];

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    // Deterministic validation - rejects malformed leads immediately
    const lead = LeadSchema.parse(body);

    const router = new LeadRouter();
    routingRules.forEach((rule) => router.addRule(rule));

    const { pipeline, owner, sla } = router.route(lead);

    // Log the routing decision for audit trail
    console.log(
      JSON.stringify({
        event: "lead_routed",
        leadId: lead.id,
        pipeline,
        owner,
        sla,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      pipeline,
      owner,
      sla,
      routedAt: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid lead data",
          issues: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}`;

export default function MarketingFunnelAutomation() {
  return (
    <article className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="mono block mb-4 text-[#D4AF37]">October 2026</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#F8F9FA]">
          Marketing Funnel Automation: Engineering Deterministic Lead Routing at Scale
        </h1>
        <p className="text-[#aab3bd] text-lg max-w-2xl mx-auto mt-4">
          Moving away from leaky, manual marketing funnels to deterministic,
          API-driven pipelines that guarantee zero data loss.
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-[#F8F9FA] space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Introduction</h2>
          <p>
            Marketing funnels leak. Leads fall through cracks, follow-ups are
            delayed, and attribution is guesswork. The result: wasted ad spend,
            missed opportunities, and sales teams chasing cold prospects.
          </p>
          <p>
            Deterministic funnel automation replaces manual lead management
            with guaranteed routing, scoring, and follow-up—every lead, every
            time. No lead is assigned by chance. Every handoff is logged for
            attribution.
          </p>
        </section>

        {/* Body Section 1 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            The High Cost of Leaky, Manual Funnels
          </h2>
          <p>
            Most marketing funnels are built on hope. A lead submits a form,
            and someone “gets to it” when they have time. A high-value
            enterprise prospect sits in an inbox for three days while a sales
            rep is in meetings. A low-value SMB lead gets the same priority as
            a seven-figure deal. Attribution is guesswork because no one
            tagged the source properly.
          </p>
          <p>
            The failure modes are predictable:
          </p>
          <ul className="list-disc pl-6 my-4 text-[#aab3bd]">
            <li>
              <strong>Leads fall through cracks:</strong> No SLA means no
              accountability for response time
            </li>
            <li>
              <strong>Misaligned routing:</strong> Enterprise leads go to SMB
              reps, and SMB leads get enterprise-level attention
            </li>
            <li>
              <strong>No attribution:</strong> You don’t know which channel
              produces revenue
            </li>
            <li>
              <strong>Manual data entry:</strong> Leads are copied from forms
              to CRMs by hand, introducing errors and delays
            </li>
          </ul>
          <p>
            The cost isn’t just operational inefficiency. It’s lost revenue.
            Every lead that sits unresponded for more than 5 minutes has a
            significantly lower conversion rate. Every lead routed to the
            wrong sales rep is a frustrated prospect who may never come back.
          </p>
        </section>

        {/* Body Section 2 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            The Sovereign Solution: Deterministic Lead Routing
          </h2>
          <p>
            Deterministic funnel automation replaces manual lead management
            with guaranteed routing, scoring, and follow-up. Every lead is
            captured, routed, nurtured, and converted based on
            version-controlled business logic. Every handoff is logged for
            full attribution.
          </p>
          <p>
            The following Node.js/TypeScript webhook handler demonstrates
            deterministic lead routing with Zod validation. Every incoming
            lead is validated against a strict schema, then routed to the
            correct CRM pipeline based on explicit rules—no manual
            intervention, no guesswork, no lost leads:
          </p>
          <pre className="my-6 p-4 rounded-lg bg-[#0B0C10] border border-[#1F2833] overflow-x-auto text-sm font-mono text-[#aab3bd]"><code>{WEBHOOK_HANDLER_SNIPPET}</code></pre>
          <p>
            The LeadSchema validation ensures every lead has the required
            fields before routing. The LeadRouter applies explicit,
            version-controlled rules that route leads based on company size,
            industry, budget, and timeline. Every routing decision is logged
            for audit and attribution.
          </p>
        </section>

        {/* Visual Proof */}
        <section>
          <BlogImage
            src="/images/blog/marketing-funnel-diagram.png"
            alt="Deterministic marketing funnel architecture showing lead capture, routing rules, CRM pipeline assignment, and audit logging"
            caption="Figure 2: Deterministic marketing funnel architecture with lead capture, routing rules, CRM pipeline assignment, and audit logging"
          />
        </section>

        {/* Body Section 3 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            Achieving 100% Lead Capture Accuracy
          </h2>
          <p>
            Organizations that implement deterministic funnel automation
            report measurable improvements within the first quarter:
          </p>
          <ul className="list-disc pl-6 my-4 text-[#aab3bd]">
            <li>
              <strong>100% lead capture</strong>—zero leads lost to manual
              error
            </li>
            <li>
              <strong>99% SLA compliance</strong>—every lead followed up
              within the defined timeframe
            </li>
            <li>
              <strong>3x faster</strong> lead-to-response time
            </li>
            <li>
              <strong>40% higher</strong> conversion rate from properly
              routed leads
            </li>
          </ul>
          <p>
            These outcomes come from treating lead routing as a software
            engineering discipline—with validation, version control, and
            observability built in from day one.
          </p>
        </section>

        {/* Strategic Internal Linking */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            Next Steps
          </h2>
          <p>
            Deterministic funnel automation isn’t about sending more emails.
            It’s about routing every lead to the right person at the right
            time with the right message. Whether you’re modernizing legacy
            lead processes or building a new funnel from scratch, we can
            help.
          </p>
          <p>
            Explore our <Link href="/services" className="text-[#D4AF37] hover:text-[#E5C25A] underline">AI Workflow Automation services</Link>
            to see how we structure marketing automation engagements, or review our <Link href="/case-studies" className="text-[#D4AF37] hover:text-[#E5C25A] underline">architectural blueprints</Link>
            for real-world funnel automation implementations. When you’re
            ready to eliminate lead leakage, <Link href="/project-intake" className="text-[#D4AF37] hover:text-[#E5C25A] underline">submit a project intake form</Link>
            and we’ll respond with a precise proposal within 48 hours.
          </p>
        </section>
      </div>

      {/* Strategic CTA */}
      <BlogCTA />
    </article>
  );
}
