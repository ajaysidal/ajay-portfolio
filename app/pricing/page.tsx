import Link from "next/link";
import { ArrowRight, Calendar, FileText } from "lucide-react";

export default function Pricing() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="mono block mb-4">Pricing</span>
        <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tight mb-6">
          Transparent, case-by-case pricing.
        </h2>
        <p className="text-[#aab3bd] max-w-2xl mx-auto mb-16 text-lg">
          Pricing is determined on a case-by-case basis to ensure precise alignment with your unique operational needs. No one-size-fits-all packages.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-tilt p-8 text-left">
            <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6">
              <Calendar className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Option 1: Free Consultation</h3>
            <p className="text-[#aab3bd] text-sm mb-6">
              Start with a free 30-minute consultation. We&apos;ll discuss your challenges, define scope, and create a clear roadmap.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#D4AF37] rounded-lg text-[#F8F9FA] hover:bg-[#D4AF37] hover:text-[#0B0C10] transition-all duration-200 text-sm font-medium"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-tilt p-8 text-left">
            <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6">
              <FileText className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Option 2: Project Intake</h3>
            <p className="text-[#aab3bd] text-sm mb-6">
              Submit a detailed project intake form. We&apos;ll review your requirements and provide a precise, custom proposal.
            </p>
            <Link
              href="/project-intake"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#1F2833] rounded-lg text-[#F8F9FA] hover:border-[#D4AF37] transition-all duration-200 text-sm font-medium"
            >
              Submit Intake Form
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}