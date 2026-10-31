"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Read the callbackUrl from the URL, default to /dashboard
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevent default NextAuth redirect so we can handle it manually
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Successful login! Force a router refresh to update auth state, then redirect
        router.refresh();
        router.push(callbackUrl);
      }
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
          Sign in to access your dashboard
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#aab3bd] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#1F2833] border border-[#D4AF37]/20 text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg bg-[#D4AF37] hover:bg-[#B8941F] text-[#0B1120] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4">
          <Link
            href="/forgot-password"
            className="block text-center text-sm text-[#aab3bd] hover:text-[#D4AF37] transition-colors"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0B1120]"><div className="text-[#F8F9FA]">Loading...</div></div>}>
      <SignInForm />
    </Suspense>
  );
}
