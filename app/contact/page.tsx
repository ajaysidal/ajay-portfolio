"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, ArrowRight, Send } from "lucide-react";
import { contactFormSchema } from "@/lib/schemas";

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormValues>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...result.data,
          ipHash: "contact-submission",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess(true);
      setTimeout(() => setSubmitted(true), 3000);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again or email us directly.");
    }
  };

  if (submitted) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="mono block mb-4">Contact</span>
        <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tight mb-6">
          Let&apos;s build.
        </h2>
        <p className="text-[#aab3bd] max-w-2xl mx-auto mb-12">
          Ready to transform your operations? Send us a message or book a consultation.
        </p>

        {success ? (
          <div className="p-8 border border-[#1F2833] rounded-xl bg-[#107C10]/10 text-[#C6F6C5]">
            <h2 className="text-xl font-bold mb-2">Message Sent!</h2>
            <p className="text-sm text-[#aab3bd] mb-4">
              Thank you for reaching out. We&apos;ll review your message and respond within 24 hours.
            </p>
            <p className="text-sm text-[#aab3bd]">
              Or email us directly at <a href="mailto:ajay@buildwithai.digital" className="text-[#D4AF37] underline">ajay@buildwithai.digital</a>
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 p-4 bg-[#8B0000]/20 border-l-4 border-[#8B0000] text-[#F8F9FA] rounded text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="glass-tilt p-8">
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-[#F8F9FA] mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                    className="w-full px-4 py-3 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#F8F9FA] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                    className="w-full px-4 py-3 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#F8F9FA] mb-2">Company (optional)</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="w-full px-4 py-3 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#F8F9FA] mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#F8F9FA] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#D4AF37] text-[#0B0C10] rounded-lg font-medium hover:bg-[#b8962e] transition-colors"
              >
                <Send className="w-4 h-4 mr-2" /> Send Message
              </button>
            </form>
          </>
        )}

        <div className="mt-20 pt-8 border-t border-[#1F2833]">
          <h3 className="text-lg font-bold mb-6 text-[#F8F9FA]">Other ways to reach us</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a
              href="mailto:ajay@buildwithai.digital"
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#D4AF37] rounded-lg text-[#F8F9FA] hover:bg-[#D4AF37] hover:text-[#0B0C10] transition-all duration-200"
            >
              <Mail className="w-5 h-5" />
              ajay@buildwithai.digital
            </a>
            <a
              href="tel:+64223260583"
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#1F2833] rounded-lg text-[#F8F9FA] hover:border-[#D4AF37] transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              +64 22 326 0583
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#E5C25A] transition-colors text-sm font-medium"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/project-intake"
              className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#E5C25A] transition-colors text-sm font-medium"
            >
              Submit Project Intake
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-[#1F2833]">
            <div className="flex items-center justify-center gap-2 text-[#aab3bd] text-sm">
              <MapPin className="w-4 h-4" />
              Auckland 1021, New Zealand
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
