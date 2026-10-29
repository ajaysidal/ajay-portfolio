"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  companyName: z.string().min(2, "Company name is required"),
  businessType: z.enum(["small_business", "enterprise", "non_profit", "startup"]),
  primaryPain: z.string().min(1, "Primary pain point is required"),
  budgetRange: z.enum(["under_5k", "5k_20k", "20k_50k", "over_50k"]),
  timeline: z.enum(["immediate", "1-3 months", "3-6 months", "6+ months"]),
});

interface BookingFormValues {
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  businessType: "small_business" | "enterprise" | "non_profit" | "startup";
  primaryPain: string;
  budgetRange: "under_5k" | "5k_20k" | "20k_50k" | "over_50k";
  timeline: "immediate" | "1-3 months" | "3-6 months" | "6+ months";
}

export default function BookConsultation() {
  const router = useRouter();
  const [formData, setFormData] = useState<BookingFormValues>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    businessType: "small_business",
    primaryPain: "",
    budgetRange: "under_5k",
    timeline: "immediate",
  });

  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      setError("Please fill in all required fields correctly.");
      return;
    }

try {
        const response = await fetch("/api/consultation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            companyName: formData.companyName,
            businessType: formData.businessType,
            primaryPain: formData.primaryPain,
            budgetRange: formData.budgetRange,
            timeline: formData.timeline,
            ipHash: Buffer.from((e.target as { remoteIp?: string }).remoteIp || "unknown").toString("base64"),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save consultation booking");
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error("Failed to save consultation booking");
        }

      setSuccess(true);
      setTimeout(() => setSubmitted(true), 3000);
    } catch (err) {
      console.error("Error saving booking:", err);
      setError("Failed to save consultation booking. Please try again.");
    }
  };

  if (submitted) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {success ? (
          <div className="p-8 border border-[#1F2833] rounded-xl bg-[#107C10]/10 text-[#C6F6C5]">
            <h2 className="text-xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-sm text-[#aab3bd] mb-4">
              Thank you for your consultation request. We will review your information within 48 hours and schedule a call.
            </p>
            <p className="text-sm text-[#aab3bd]">Reference: Your booking ID has been recorded securely.</p>
          </div>
        ) : (
          <>
            <span className="mono block mb-4">Book Consultation</span>
            <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tight mb-6">
              Schedule your free 30-minute consultation.
            </h2>
            <p className="text-[#aab3bd] text-lg mb-12">
              Tell us about your operational challenges and we&apos;ll recommend an approach tailored to your needs.
            </p>
          </>
        )}

        {error && (
          <div className="mb-4 p-4 bg-[#8B0000]/20 border-l-4 border-[#8B0000] text-[#F8F9FA] rounded text-sm">
            {error}
          </div>
        )}

        {!success && !submitted && (
          <form onSubmit={handleSubmit} className="glass-tilt p-8">
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#F8F9FA] mb-1">Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#F8F9FA] mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#F8F9FA] mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#F8F9FA] mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div>
                <label className="block text-sm text-[#F8F9FA] mb-1">Business Type</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="small_business">Small Business</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="non_profit">Non-Profit</option>
                  <option value="startup">Startup</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#F8F9FA] mb-1">Primary Pain Point</label>
                <textarea
                  name="primaryPain"
                  value={formData.primaryPain}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full px-4 py-2 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 px-8 py-4 bg-[#D4AF37] text-[#0B0C10] rounded-lg font-medium hover:bg-[#E5C25A] transition-colors"
            >
              Request Consultation
            </button>
          </form>
        )}
      </div>
    </section>
  );
}