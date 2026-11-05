import Link from "next/link";
import {
  ArrowRight,
  Target,
  Map,
  Handshake,
  CheckCircle2,
} from "lucide-react";

export default function Pricing() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="mono block mb-4">Pricing</span>
          <h1 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tight mb-6 text-[#F8F9FA]">
            Transparent, Outcome-Driven Pricing.
          </h1>
          <p className="text-[#aab3bd] max-w-2xl mx-auto mb-16 text-lg">
            Because every enterprise infrastructure and AI automation challenge
            is unique, we do not offer one-size-fits-all packages. Pricing is
            determined on a case-by-case basis to ensure precise alignment with
            your operational needs, security requirements, and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Strategic Discovery Call (Primary/Recommended) */}
          <div
            className="glass-tilt p-8 text-left rounded-2xl border-[#D4AF37]/30 bg-[#1F2833]/30 relative group"
          >
            <div className="absolute -top-4 left-8 bg-[#0B0C10] px-3 py-0.5 rounded text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Recommended
            </div>
            <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 border border-[#D4AF37]/20">
              <Target className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <h2 className="text-xl font-bold mb-3 text-[#F8F9FA]">
              Complimentary 30-Minute Strategic Discovery Call
            </h2>
            <p className="text-[#aab3bd] text-sm mb-8 leading-relaxed">
              No sales pressure. Just a focused conversation to understand your
              bottlenecks and explore how deterministic AI can solve them.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-sm text-[#aab3bd]">
                <Target className="w-5 h-5 text-[#D4AF37] mt-0.5 shrink-0" />
                <span>
                  <strong className="text-[#F8F9FA]">Current State:</strong>{" "}
                  A brief review of your existing tech stack and primary pain
                  points.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#aab3bd]">
                <Map className="w-5 h-5 text-[#D4AF37] mt-0.5 shrink-0" />
                <span>
                  <strong className="text-[#F8F9FA]">High-Level Roadmap:</strong>{" "}
                  Initial thoughts on how a sovereign, automated workflow could
                  be architected for your team.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#aab3bd]">
                <Handshake className="w-5 h-5 text-[#D4AF37] mt-0.5 shrink-0" />
                <span>
                  <strong className="text-[#F8F9FA]">Fit Assessment:</strong>{" "}
                  A mutual determination of whether our expertise aligns with
                  your goals.
                </span>
              </li>
            </ul>
            <Link
              href="/book"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0B0C10] rounded-lg font-bold hover:bg-[#b8962e] transition-all duration-200 text-sm"
            >
              Book Your Free Discovery Call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Direct Project Intake (Secondary) */}
          <div className="glass-tilt p-8 text-left rounded-2xl border-[#1F2833] bg-[#0B0C10]/30">
            <div className="w-14 h-14 rounded-xl bg-[#1F2833] flex items-center justify-center mb-6 border border-[#D4AF37]/20">
              <CheckCircle2 className="w-7 h-7 text-[#aab3bd]" />
            </div>
            <h2 className="text-xl font-bold mb-3 text-[#F8F9FA]">
              Direct Project Intake
            </h2>
            <p className="text-[#aab3bd] text-sm mb-8 leading-relaxed">
              Already know your requirements? Submit a detailed project brief,
              and we will return a precise, custom proposal within 48 hours.
            </p>
            <Link
              href="/project-intake"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#D4AF37] rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-200 text-sm font-medium"
            >
              Submit Project Brief
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
