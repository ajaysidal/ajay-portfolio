import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - Build With AI",
  description: "Cookie policy explaining the minimal, privacy-first tracking used on Build With AI.",
};

export default function Cookies() {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <span className="mono block mb-4">Cookies</span>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Cookie Policy</h1>
      </div>

      <div className="space-y-8 text-[#F8F9FA]">
        <h2 className="text-2xl font-bold mb-4 text-[#D4AF37]">1. Minimal Cookie Usage</h2>
        <p>
          Build With AI uses minimal, privacy-first cookies to ensure you get the best experience. We do not use third-party tracking, analytics, or advertising cookies.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">2. Cookies We Use</h2>
        <ul className="list-disc list-inside space-y-2 text-[#aab3bd]">
          <li>
            <strong>Essential Cookies:</strong> These are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility features. These cookies do not store any personally identifiable information.
          </li>
          <li>
            <strong>Cookie Consent Preferences:</strong> A lightweight cookie stored in localStorage (not sent to server) to remember your consent choice for the cookie consent banner. This expires after 90 days.
          </li>
          <li>
            <strong>Security Cookies:</strong> Used for SOC2 compliance audit logging via IP hashes only. These are stored server-side and contain no personally identifiable information.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">3. No Third-Party Tracking</h2>
        <p>
          We do not use Google Analytics, Facebook Pixel, or any other third-party tracking services. No advertising networks place cookies on this site. All data processing occurs locally.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">4. Data Privacy</h2>
        <p>
          The cookie consent banner respects the NZ Privacy Act 2020 and GDPR. No non-essential scripts are loaded until you accept cookies. You can decline at any time, and your preference is stored locally.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">5. Your Choices</h2>
        <ul className="list-disc list-inside space-y-2 text-[#aab3bd]">
          <li>Accept all minimal privacy-first cookies</li>
          <li>Decline all non-essential cookies</li>
          <li>Update your preferences via the cookie consent banner at the bottom of the page</li>
          <li>Clear browser cookies to remove stored preferences</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-[#D4AF37]">6. Contact</h2>
        <p>For questions about this Cookie Policy, contact via <a href="/contact" className="text-[#D4AF37] underline">ajay@buildwithai.digital</a>.</p>
      </div>
    </section>
  );
}