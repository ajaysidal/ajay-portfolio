"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogCTA() {
  return (
    <section className="my-12 px-6 rounded-2xl border-2 border-[#D4AF37] bg-[#0B0C10] text-center p-8 md:p-12">
      <h2 className="text-2xl font-bold text-[#F8F9FA] mb-4">
        Ready to Architect Your Sovereign Infrastructure?
      </h2>
      <p className="text-[#aab3bd] text-lg max-w-2xl mx-auto mb-8">
        Stop relying on manual processes or unpredictable AI. Let's build a
        deterministic, enterprise-grade workflow tailored to your stack.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/project-intake"
          className="px-6 py-3 bg-[#D4AF37] text-[#0B0C10] font-bold rounded-lg hover:bg-[#b8962e] transition-colors text-sm"
        >
          Submit Project Intake
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
        <Link
          href="/book"
          className="px-6 py-3 border border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-sm"
        >
          Book a Free Discovery Call
        </Link>
      </div>
    </section>
  );
}
