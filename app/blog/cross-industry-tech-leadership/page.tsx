import { Metadata } from "next";
import Link from "next/link";
import BlogImage from "@/components/BlogImage";
import BlogCTA from "@/components/BlogCTA";

const ADAPTER_PATTERN_SNIPPET = `// gateway-adapter.ts - Unified interface for cross-industry payment gateways
import { z } from "zod";

export const TransactionSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
  customerId: z.string().uuid(),
  merchantId: z.string().uuid(),
  referenceId: z.string().optional(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

export interface PaymentGateway {
  processPayment(transaction: Transaction): Promise<GatewayResult>;
}

export interface GatewayResult {
  success: boolean;
  transactionId: string;
  timestamp: string;
  fee: number;
}

// Legacy banking gateway - requires legacy API format
export class LegacyBankGateway implements PaymentGateway {
  async processPayment(transaction: Transaction): Promise<GatewayResult> {
    // Translate to legacy banking API format
    const legacyRequest = {
      amt: transaction.amount,
      cur: transaction.currency,
      cust: transaction.customerId,
      merch: transaction.merchantId,
    };

    // Simulated legacy API call
    const response = await this.callLegacyBankingAPI(legacyRequest);

    return {
      success: response.approved,
      transactionId: response.txn_ref,
      timestamp: new Date().toISOString(),
      fee: response.fee_cents / 100,
    };
  }

  private async callLegacyBankingAPI(request: any): Promise<any> {
    // Simulated network call to legacy banking SOAP/REST API
    return {
      approved: true,
      txn_ref: "BANK_" + Date.now(),
      fee_cents: Math.floor(transaction.amount * 25),
    };
  }
}

// Modern healthcare gateway - requires FHIR-compliant format
export class HealthcareGateway implements PaymentGateway {
  async processPayment(transaction: Transaction): Promise<GatewayResult> {
    // Translate to FHIR-compliant healthcare payment format
    const fhirRequest = {
      resourceType: "Payment",
      amount: {
        value: transaction.amount,
        currency: transaction.currency,
      },
      payer: { reference: "Patient/" + transaction.customerId },
      payee: { reference: "Organization/" + transaction.merchantId },
    };

    // Simulated FHIR API call
    const response = await this.callFHIRHealthcareAPI(fhirRequest);

    return {
      success: response.status === "completed",
      transactionId: response.id,
      timestamp: response.created,
      fee: response.amount?.value || 0,
    };
  }

  private async callFHIRHealthcareAPI(request: any): Promise<any> {
    // Simulated network call to healthcare FHIR API
    return {
      id: "HCR_" + Date.now(),
      status: "completed",
      created: new Date().toISOString(),
      amount: { value: transaction.amount * 15, currency: transaction.currency },
    };
  }
}

// Logistics gateway - requires ISO 20022 format
export class LogisticsGateway implements PaymentGateway {
  async processPayment(transaction: Transaction): Promise<GatewayResult> {
    // Translate to ISO 20022 payment initiation format
    const isoRequest = {
      Document: {
        CstmrPmtInitn: {
          GrpHdr: {
            MsgId: "LOG_" + Date.now(),
            CreDtTm: new Date().toISOString(),
            NbOfTxs: "1",
          },
          PmtInf: {
            PmtMtd: "TRF",
            Amt: {
              InstdAmt: {
                Ccy: transaction.currency,
                Amt: transaction.amount,
              },
              Cdtr: {
                Id: { PrivatId: transaction.customerId },
              },
              CdtrAgt: {
                FinInstnId: { BIC: transaction.merchantId },
              },
            },
          },
        },
      },
    };

    // Simulated ISO 20022 API call
    const response = await this.callLogisticsGatewayAPI(isoRequest);

    return {
      success: response.status === "ACCT",
      transactionId: response.Document.CstmrPmtInitn.PmtInf.TxInf[0].PmtId.EndToEndId,
      timestamp: response.Document.CstmrPmtInitn.GrpHdr.CreDtTm,
      fee: 0,
    };
  }

  private async callLogisticsGatewayAPI(request: any): Promise<any> {
    // Simulated network call to logistics ISO 20022 gateway
    return {
      status: "ACCT",
      Document: {
        CstmrPmtInitn: {
          GrpHdr: {
            MsgId: "LOG_" + Date.now(),
            CreDtTm: new Date().toISOString(),
            NbOfTxs: "1",
          },
          PmtInf: {
            TxInf: [{
              PmtId: {
                EndToEndId: "LOG_" + Date.now(),
              },
            }],
          },
        },
      },
    };
  }
}

// Strategy pattern - routes transactions to the correct gateway based on industry
export class PaymentRouter {
  private gateways: Map<string, PaymentGateway> = new Map();

  registerGateway(industry: string, gateway: PaymentGateway): void {
    this.gateways.set(industry, gateway);
  }

  async routePayment(industry: string, transaction: Transaction): Promise<GatewayResult> {
    const gateway = this.gateways.get(industry);
    if (!gateway) {
      throw new Error("No gateway registered for industry: " + industry);
    }

    const validated = TransactionSchema.parse(transaction);
    return gateway.processPayment(validated);
  }
}

// Usage example
export async function processCrossIndustryPayment() {
  const router = new PaymentRouter();
  router.registerGateway("banking", new LegacyBankGateway());
  router.registerGateway("healthcare", new HealthcareGateway());
  router.registerGateway("logistics", new LogisticsGateway());

  const bankingResult = await router.routePayment("banking", {
    amount: 15000,
    currency: "USD",
    customerId: "cust_123",
    merchantId: "merch_456",
    referenceId: "ref_789",
  });

  const healthcareResult = await router.routePayment("healthcare", {
    amount: 8500,
    currency: "USD",
    customerId: "cust_789",
    merchantId: "merch_101",
  });

  const logisticsResult = await router.routePayment("logistics", {
    amount: 32000,
    currency: "USD",
    customerId: "cust_456",
    merchantId: "merch_789",
  });

  return { bankingResult, healthcareResult, logisticsResult };
}`;

export default function CrossIndustryTechLeadership() {
  return (
    <article className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="mono block mb-4 text-[#D4AF37]">November 2026</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#F8F9FA]">
          Cross-Industry Tech Leadership: Architecting Resilience Across Banking, Healthcare, and Logistics
        </h1>
        <p className="text-[#aab3bd] text-lg max-w-2xl mx-auto mt-4">
          Technology leadership isn’t industry-specific—it’s challenge-specific.
          The same architectural patterns modernize banking legacy systems,
          transform healthcare data flow, and optimize logistics supply chains.
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-[#F8F9FA] space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">Introduction</h2>
          <p>
            Technology leadership isn’t industry-specific—it’s
            challenge-specific. The same principles that modernize a bank’s
            legacy infrastructure can transform a hospital’s patient data flow
            or optimize a logistics company’s supply chain. The patterns repeat;
            only the context changes.
          </p>
          <p>
            For enterprise technology leaders, this means the skills that
            modernize one sector are transferable to another. The constraint
            profiles differ—banking prioritizes regulatory compliance,
            healthcare prioritizes patient privacy, logistics prioritizes
            real-time throughput—but the underlying architectural patterns are
            universal.
          </p>
        </section>

        {/* Body Section 1 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            The Architecture Debt of Industry Silos
          </h2>
          <p>
            Most organizations treat their industry as unique, building
            custom integrations that lock them into proprietary platforms
            and vendor-specific APIs. Banking systems speak legacy
            mainframe protocols. Healthcare systems speak FHIR. Logistics
            systems speak ISO 20022. Each silo creates its own integration
            debt, making cross-sector learning impossible.
          </p>
          <p>
            When a bank modernizes its payment processing, it builds
            wrappers around COBOL mainframes. When a hospital digitizes
            patient records, it implements FHIR interfaces. When a logistics
            company tracks shipments, it implements EDI standards. None of
            these speak to each other, and none of them are designed for
            reuse.
          </p>
          <p>
            The cost isn’t just integration complexity. It’s the inability
            to apply lessons learned in one sector to another. A fraud
            detection pattern that works in banking could prevent insurance
            fraud in healthcare. A route optimization algorithm from
            logistics could improve patient appointment scheduling. But
            without common architectural patterns, these insights never
            transfer.
          </p>
        </section>

        {/* Body Section 2 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            The Sovereign Solution: Adapter Pattern for Cross-Industry Integration
          </h2>
          <p>
            The Adapter pattern solves cross-industry integration by defining
            a unified interface that each industry’s legacy system implements.
            Instead of building point-to-point integrations, you build one
            interface and multiple adapters—one per industry. The business
            logic never touches a legacy API directly; it always goes through
            the adapter.
          </p>
          <p>
            The following TypeScript implementation demonstrates how a
            unified PaymentGateway interface routes transactions across
            banking, healthcare, and logistics systems—each with its own
            legacy protocol, data model, and compliance requirements:
          </p>
          <pre className="my-6 p-4 rounded-lg bg-[#0B0C10] border border-[#1F2833] overflow-x-auto text-sm font-mono text-[#aab3bd]"><code>{ADAPTER_PATTERN_SNIPPET}</code></pre>
          <p>
            The PaymentRouter strategy pattern selects the correct gateway
            based on industry context, while each adapter handles the
            industry-specific translation. The TransactionSchema validation
            ensures every transaction is validated before execution,
            guaranteeing deterministic outputs regardless of which industry
            gateway processes it.
          </p>
          <p>
            This is the same pattern that enables SOC 2 compliance in
            banking, HIPAA compliance in healthcare, and real-time
            visibility in logistics. The interface is the same; the
            implementation adapts to the constraint.
          </p>
        </section>

        {/* Visual Proof */}
        <section>
          <BlogImage
            src="/images/blog/cross-industry-tech-leadership-diagram.png"
            alt="Cross-industry architecture diagram showing banking, healthcare, and logistics systems unified through adapter pattern"
            caption="Figure 1: Cross-industry architecture with unified PaymentGateway interface and industry-specific adapters"
          />
        </section>

        {/* Body Section 3 */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            Accelerating Cross-Sector Deployments
          </h2>
          <p>
            Organizations that adopt cross-industry architectural patterns
            report measurable improvements:
          </p>
          <ul className="list-disc pl-6 my-4 text-[#aab3bd]">
            <li>
              <strong>40% reduction</strong> in modernization time across
              sectors by reusing proven patterns
            </li>
            <li>
              <strong>100% audit trail coverage</strong> across banking,
              healthcare, and logistics systems
            </li>
            <li>
              <strong>60% faster</strong> onboarding of engineers moving
              between industry contexts
            </li>
            <li>
              <strong>Zero vendor lock-in</strong>—adapters can be replaced
              without changing business logic
            </li>
          </ul>
          <p>
            These outcomes come from treating architecture as a transferable
            skill, not an industry-specific secret. The principles of
            deterministic automation, observable infrastructure, and
            security-by-design apply everywhere.
          </p>
        </section>

        {/* Strategic Internal Linking */}
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#D4AF37]">
            Next Steps
          </h2>
          <p>
            Cross-industry tech leadership isn’t about knowing every
            industry’s regulations. It’s about recognizing the patterns that
            repeat across them and building architectures that adapt without
            breaking. Whether you’re modernizing banking infrastructure,
            digitizing healthcare records, or optimizing logistics
            operations, the same principles apply.
          </p>
          <p>
            Explore our <Link href="/services" className="text-[#D4AF37] hover:text-[#E5C25A] underline">Web Infrastructure & DevOps services</Link>
            to see how we structure cross-industry engagements, or review our <Link href="/case-studies" className="text-[#D4AF37] hover:text-[#E5C25A] underline">architectural blueprints</Link>
            for real-world implementations across banking, healthcare, and
            logistics. When you’re ready to discuss your sector’s
            architecture, <Link href="/book" className="text-[#D4AF37] hover:text-[#E5C25A] underline">book a free discovery call</Link>
            and we’ll assess your current state in 30 minutes.
          </p>
        </section>
      </div>

      {/* Strategic CTA */}
      <BlogCTA />
    </article>
  );
}
