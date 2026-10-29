"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 0);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0B0C10]/95 border-t border-[#1F2833] p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-[#F8F9FA]">
          <p>
            We use minimal, privacy-first cookies to ensure you get the best experience. No tracking, no third-party analytics.
            See our{" "}
            <a href="/cookies" className="text-[#D4AF37] hover:underline">
              Cookie Policy
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-[#D4AF37] hover:underline">
              Privacy Policy
            </a>.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm text-[#aab3bd] hover:text-[#F8F9FA] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-[#D4AF37] text-[#0B0C10] rounded-lg font-medium hover:bg-[#E5C25A] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}