import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import SovereignChatAgent from "../components/SovereignChatAgent";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ajay Sidal — Technology & Operations Leader | Creative Technologist",
  description: "12+ years of cross-industry experience across banking, healthcare, logistics, and automotive. Expert in web development, system infrastructure, and orchestrating full-scale operations and marketing automation through AI-driven workflows.",
  keywords: [
    "Ajay Sidal",
    "Technology Leader",
    "Operations",
    "AI Workflows",
    "Web Infrastructure",
    "Creative Technologist",
    "Build With AI",
    "Sovereign AI",
    "Nginx",
    "Certbot",
    "DNS",
    "DevOps",
    "Consultancy",
  ],
  authors: [{ name: "Ajay Sidal" }],
  creator: "Ajay Sidal",
  openGraph: {
    title: "Ajay Sidal — Technology & Operations Leader | Creative Technologist",
    description: "12+ years of cross-industry experience across banking, healthcare, logistics, and automotive.",
    url: "https://buildwithai.digital",
    siteName: "Ajay Sidal Portfolio",
    images: [
      {
        url: "https://buildwithai.digital/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ajay Sidal - Creative Technologist",
      },
    ],
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Sidal — Technology & Operations Leader | Creative Technologist",
    description: "12+ years of cross-industry experience across banking, healthcare, logistics, and automotive.",
    images: ["https://buildwithai.digital/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="font-body bg-bg-primary text-text-primary antialiased overflow-x-hidden">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <SovereignChatAgent />
      </body>
    </html>
  );
}