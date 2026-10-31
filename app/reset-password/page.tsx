"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError("Missing reset token");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!token) {
      setError("Missing reset token");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 12) {
      setError("Password must be at least 12 characters");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Reset failed");
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
        <div className="glass-tilt p-8 rounded-lg max-w-md w-full mx-4 text-center">
          <h1 className="text-2xl font-bold text-[#F8F9FA] mb-4">Invalid Reset Link</h1>
          <p className="text-red-400 mb-6">{error}</p>
          <Link
            href="/forgot-password"
            className="inline-block px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#B8941F] text-[#0B1120] font-semibold transition-colors"
          >
            Request New Reset
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
      <div className="glass-tilt p-8 rounded-lg max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-[#F8F9FA] mb-2 text-center">
          Sovereign Command Center
        </h1>
        <p className="text-[#aab3bd] text-center mb-8">
          Set New Password
        </p>

        {success ? (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-green-400 text-sm">Password has been reset successfully.</p>
            </div>
            <Link
              href="/signin"
              className="inline-block mt-6 px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#B8941F] text-[#0B1120] font-semibold transition-colors"
            >
              Sign In with New Password
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-[#aab3bd] mb-2">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={12}
                className="w-full px-4 py-3 rounded-lg bg-[#1F2833] border border-[#D4AF37]/20 text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="••••••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#aab3bd] mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={12}
                className="w-full px-4 py-3 rounded-lg bg-[#1F2833] border border-[#D4AF37]/20 text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg bg-[#D4AF37] hover:bg-[#B8941F] text-[#0B1120] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0B1120]"><div className="text-[#F8F9FA]">Loading...</div></div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}