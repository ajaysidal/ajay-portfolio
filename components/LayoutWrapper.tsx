"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";
import SovereignChatAgent from "./SovereignChatAgent";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  // If on dashboard, render ONLY the children (the dashboard layout will handle the rest)
  if (isDashboard) {
    return <>{children}</>;
  }

  // Otherwise, render the full public layout
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
      <SovereignChatAgent />
    </>
  );
}
