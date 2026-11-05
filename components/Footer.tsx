"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import Logo from "@/components/Logo";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsletterEmail(e.target.value);
    setNewsletterError(null);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = newsletterSchema.safeParse({ email: newsletterEmail });
    if (!result.success) {
      setNewsletterError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: result.data.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setNewsletterSubmitted(true);
      setNewsletterEmail("");
    } catch (err) {
      console.error("Newsletter signup error:", err);
      setNewsletterError("Failed to subscribe. Please try again.");
    }
  };

  return (
    <footer className="border-t border-[#F8F9FA]/10 bg-[#0B0C10]/70 backdrop-blur-xl py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6">
          <Link href="/" className="text-2xl font-bold text-[#F8F9FA] tracking-tight">
            <Logo variant="full" />
          </Link>
          <p className="text-[#aab3bd] text-sm max-w-md">
            Technology &amp; Operations Leader | Creative Technologist
          </p>

          {/* Newsletter Signup */}
          <div className="w-full max-w-md space-y-4">
            {newsletterSubmitted ? (
              <div className="p-4 border border-[#1F2833] rounded-xl bg-[#107C10]/10 text-[#C6F6C5] text-center">
                <h3 className="text-sm font-bold mb-2">Subscribed!</h3>
                <p className="text-xs text-[#aab3bd]">Thank you for joining our newsletter.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  name="email"
                  value={newsletterEmail}
                  onChange={handleNewsletterChange}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37] text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D4AF37] text-[#0B0C10] rounded-lg font-medium hover:bg-[#b8962e] transition-colors text-sm"
                >
                  Subscribe
                </button>
                {newsletterError && (
                  <span className="text-xs text-red-400">{newsletterError}</span>
                )}
              </form>
            )}
          </div>

          <div className="flex gap-6 text-sm">
            <a
              href="mailto:ajay@buildwithai.digital"
              className="text-[#D4AF37] hover:text-[#F8F9FA] transition-colors"
            >
              ajay@buildwithai.digital
            </a>
            <a
              href="tel:+64223260583"
              className="text-[#D4AF37] hover:text-[#F8F9FA] transition-colors"
            >
              +64 22 326 0583
            </a>
          </div>
          <div className="flex gap-6 text-sm">
            <a
              href="https://www.linkedin.com/in/ajay-sidal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#aab3bd] hover:text-[#D4AF37] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ajaysidal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#aab3bd] hover:text-[#D4AF37] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.nzbn.govt.nz/mynzbn/search/9429047928589/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#aab3bd] hover:text-[#D4AF37] transition-colors"
            >
              NZBN
            </a>
          </div>
          <div className="pt-6 border-t border-[#F8F9FA]/10 w-full">
            <p className="text-[#aab3bd] text-xs">
              Auckland 1021, New Zealand · Built on a Sovereign AI ethos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
