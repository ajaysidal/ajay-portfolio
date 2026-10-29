import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Build With AI",
  description: "Privacy policy compliant with NZ Privacy Act 2020 and GDPR. Sovereign data handling — no third-party AI sharing.",
  openGraph: {
    title: "Privacy Policy - Build With AI",
    description: "Privacy policy compliant with NZ Privacy Act 2020 and GDPR. Sovereign data handling.",
    url: "https://ajay-portfolio.vercel.app/privacy",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy - Build With AI",
  },
};

export default function PrivacyPolicy() {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <span className="mono block mb-4">Privacy Policy</span>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-[#aab3bd]">Last updated: October 2026 · GDPR &amp; NZ Privacy Act 2020 Compliant</p>
      </div>

      <div className="space-y-8 text-[#F8F9FA]">
        <h2 className="text-2xl font-bold mb-4 text-[#D4AF37]">1. Introduction</h2>
        <p>
          This privacy policy outlines how Ajay Sidal (Build With AI) collects, uses, stores, and protects your personal information when you contact us for a consultation or submit a project intake form.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">2. Sovereign Data Handling</h2>
        <p>
          <strong>Build With AI operates on a Sovereign AI ethos.</strong> This means your data is never sold or shared with third-party AI providers. All data is stored locally using SQLite on a sovereign server with SOC2-compliant security measures.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">3. Data We Collect</h2>
        <ul className="list-disc list-inside space-y-2 text-[#aab3bd]">
          <li><strong>Consultation Bookings:</strong> Full name, email, phone, company name, business type, pain points, desired outcomes, budget range, and timeline.</li>
          <li><strong>Project Intakes:</strong> Company info, current tech stack, pain points, desired outcomes, budget range, timeline, and scope of work.</li>
          <li><strong>Audit Trail:</strong> IP hashes (not raw IPs) for SOC2 compliance logging only.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">4. How Data Is Protected</h2>
        <ul className="list-disc list-inside space-y-2 text-[#aab3bd]">
          <li>Local SQLite database with SOC2 security measures</li>
          <li>IP hashes instead of raw IP addresses (privacy-preserving)</li>
          <li>Strict Security Headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)</li>
          <li>Zod-validated form inputs to prevent XSS and injection attacks</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">5. Your Rights</h2>
        <p>Under the NZ Privacy Act 2020 and GDPR, you have the right to:</p>
        <ul className="list-disc list-inside space-y-2 text-[#aab3bd]">
          <li>Access your personal data</li>
          <li>Request corrections</li>
          <li>Delete your data upon request</li>
          <li>Complain to the Information Commissioner&apos;s Office (ICO)</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">6. Contact for Concerns</h2>
        <p>For privacy concerns or data requests, please contact via email at <a href="/contact" className="text-[#D4AF37] underline">ajay@buildwithai.digital</a>.</p>
      </div>
    </section>
  );
}
