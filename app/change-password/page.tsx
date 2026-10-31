"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function ChangePasswordContent() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

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
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Password change failed");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1000);
    } catch (err) {
      setError("An error occurred. Please try again.");
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
          {success ? "Password Updated" : "Required Password Change"}
        </p>

        {success ? (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-green-400 text-sm">Password has been updated successfully. Redirecting...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-[#aab3bd] mb-2">
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#1F2833] border border-[#D4AF37]/20 text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="Enter current password"
              />
            </div>

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
                placeholder="Min 12 characters"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#aab3bd] mb-2">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={12}
                className="w-full px-4 py-3 rounded-lg bg-[#1F2833] border border-[#D4AF37]/20 text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg bg-[#D4AF37] hover:bg-[#B8941F] text-[#0B1120] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-[#1F2833]">
          <p className="text-xs text-[#aab3bd] text-center">
            This is a mandatory security step on first login.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ChangePasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0B1120]"><div className="text-[#F8F9FA]">Loading...</div></div>}>
      <ChangePasswordContent />
    </Suspense>
  );
}