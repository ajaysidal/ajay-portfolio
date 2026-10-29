"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

// Schema for project intake form validation
const projectIntakeSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  companyWebsite: z.string().url("Please enter a valid URL").optional(),
  currentTechStack: z.string().min(1, "Current tech stack is required"),
  primaryPainPoints: z.string().min(1, "Primary pain points are required"),
  desiredOutcomes: z.string().optional(),
  budgetRange: z.enum(["under_5k", "5k_20k", "20k_50k", "over_50k"]),
  timeline: z.enum(["immediate", "1-3 months", "3-6 months", "6+ months"]),
});

interface ProjectIntakeFormValues {
  companyName: string;
  companyWebsite?: string;
  currentTechStack: string;
  primaryPainPoints: string;
  desiredOutcomes?: string;
  budgetRange: "under_5k" | "5k_20k" | "20k_50k" | "over_50k";
  timeline: "immediate" | "1-3 months" | "3-6 months" | "6+ months";
}

export default function ProjectIntake() {
  const [formData, setFormData] = useState<ProjectIntakeFormValues>({
    companyName: "",
    companyWebsite: "",
    currentTechStack: "",
    primaryPainPoints: "",
    desiredOutcomes: "",
    budgetRange: "under_5k",
    timeline: "1-3 months",
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

    const result = projectIntakeSchema.safeParse(formData);
    if (!result.success) {
      setError("Please fill in all required fields correctly.");
      return;
    }

try {
        const response = await fetch("/api/project-intake", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName: formData.companyName,
            companyWebsite: formData.companyWebsite,
            currentTechStack: formData.currentTechStack,
            primaryPainPoints: formData.primaryPainPoints,
            desiredOutcomes: formData.desiredOutcomes,
            budgetRange: formData.budgetRange,
            timeline: formData.timeline,
            ipHash: Buffer.from((e.target as { remoteIp?: string }).remoteIp || "unknown").toString("base64"),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save project intake");
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error("Failed to save project intake");
        }

      // Trigger local SMTP email notification via nodemailer (mock for now)
      setSuccess(true);
      setTimeout(() => setSubmitted(true), 3000);
    } catch (err) {
      console.error("Error saving project intake:", err);
      setError("Failed to save project intake. Please try again.");
    }
  };

  if (submitted) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="mono block mb-4">Project Intake</span>
          <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tight mb-6">
            Detailed project requirements.
          </h2>
          <p className="text-[#aab3bd] text-lg mb-12">
            Please provide comprehensive information about your project so we can deliver the most accurate proposal.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-[#8B0000]/20 border-l-4 border-[#8B0000] text-[#F8F9FA] rounded text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-[#107C10]/20 border-l-4 border-[#107C10] text-[#C6F6C5] rounded text-sm">
            Thank you! Your project intake form has been submitted successfully. We&apos;ll review your requirements and get back to you within 48 hours.
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-tilt p-8">
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <label className="block text-sm text-[#F8F9FA] mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#F8F9FA] mb-2">
                Company Website
              </label>
              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite || ""}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <label className="block text-sm text-[#F8F9FA] mb-2">
                Current Tech Stack
              </label>
              <textarea
                name="currentTechStack"
                value={formData.currentTechStack}
                onChange={handleChange}
                rows={3}
                required
                className="w-full px-4 py-3 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37] resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[#F8F9FA] mb-2">
                Primary Pain Points
              </label>
              <textarea
                name="primaryPainPoints"
                value={formData.primaryPainPoints}
                onChange={handleChange}
                rows={3}
                required
                className="w-full px-4 py-3 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37] resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <label className="block text-sm text-[#F8F9FA] mb-2">
                Desired Outcomes
              </label>
              <textarea
                name="desiredOutcomes"
                value={formData.desiredOutcomes || ""}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] placeholder-[#aab3bd] focus:outline-none focus:border-[#D4AF37] resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[#F8F9FA] mb-2">
                Budget Range
              </label>
              <select
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="under_5k">Under $5k</option>
                <option value="5k_20k">$5k - $20k</option>
                <option value="20k_50k">$20k - $50k</option>
                <option value="over_50k">Over $50k</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <div>
              <label className="block text-sm text-[#F8F9FA] mb-2">
                Timeline
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#1F2833] rounded-lg bg-[#0B0C10] text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="immediate">Immediate</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-[#D4AF37] text-[#0B0C10] rounded-lg font-medium hover:bg-[#E5C25A] transition-colors"
          >
            Submit Project Intake
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-[#aab3bd] hover:text-[#F8F9FA] transition-colors text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}