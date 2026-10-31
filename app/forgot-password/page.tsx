"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
      <div className="glass-tilt p-8 rounded-lg max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-[#F8F9FA] mb-2 text-center">
          Sovereign Command Center
        </h1>
        <p className="text-[#aab3bd] text-center mb-8">
          Password Recovery
        </p>

        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-green-400 text-sm">
                If an account exists, a reset link has been issued to the sovereign operator console.
              </p>
            </div>
            <p className="text-[#aab3bd] text-sm">
              Check the container logs for the reset URL.
            </p>
            <Link
              href="/signin"
              className="inline-block mt-6 px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#B8941F] text-[#0B1120] font-semibold transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#aab3bd] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#1F2833] border border-[#D4AF37]/20 text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="admin@buildwithai.digital"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg bg-[#D4AF37] hover:bg-[#B8941F] text-[#0B1120] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Issuing Reset..." : "Issue Reset Link"}
            </button>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-[#1F2833]">
          <Link
            href="/signin"
            className="block text-center text-sm text-[#aab3bd] hover:text-[#D4AF37] transition-colors"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}