import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Build With AI",
  description: "Standard terms of service for Build With AI consultancy services.",
};

export default function Terms() {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <span className="mono block mb-4">Terms</span>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
      </div>

      <div className="space-y-8 text-[#F8F9FA]">
        <h2 className="text-2xl font-bold mb-4 text-[#D4AF37]">1. Acceptance of Terms</h2>
        <p>By submitting a consultation request, project intake, or otherwise interacting with Build With AI, you agree to these Terms. Continued use of the site constitutes acceptance.</p>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">2. Services</h2>
        <p>Build With AI provides technology and operations consultancy including AI workflow automation, web infrastructure deployment, technical storytelling, and living documentation. Services are delivered on a case-by-case basis.</p>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">3. Limitation of Liability</h2>
        <p>Build With AI makes no warranties regarding the accuracy of information provided, the suitability of services for specific purposes, or the results achieved. Neither Build With AI nor its agents shall be liable for indirect, incidental, special, or consequential damages arising out of these terms.</p>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">4. Governing Law</h2>
        <p>These terms are governed by New Zealand law. Any disputes shall be resolved through NZ jurisdiction.</p>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">5. Contact</h2>
        <p>For questions or concerns, contact <a href="/contact" className="text-[#D4AF37] underline">ajay@buildwithai.digital</a>.</p>
      </div>
    </section>
  );
}