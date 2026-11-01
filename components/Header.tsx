"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";

const navLinks = [
  { id: "home", href: "/", label: "Home" },
  { id: "services", href: "/services", label: "Services" },
  { id: "case-studies", href: "/case-studies", label: "Case Studies" },
  { id: "experience", href: "/experience", label: "Experience" },
  { id: "education", href: "/education", label: "Education" },
  { id: "pricing", href: "/pricing", label: "Pricing" },
  { id: "project-intake", href: "/project-intake", label: "Project Intake" },
  { id: "blog", href: "/blog", label: "Blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0B0C10]/70 backdrop-blur-xl border-b border-[#F8F9FA]/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <Link href="/" className="shrink-0" aria-label="Build With AI - Home">
          <Logo variant="full" />
        </Link>

        {/* Centered Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`text-sm transition-colors duration-200 ${
                pathname === link.href
                  ? "text-[#D4AF37]"
                  : "text-[#aab3bd] hover:text-[#D4AF37]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Monetized CTA Cluster */}
        <div className="hidden lg:flex shrink-0 items-center gap-3">
          <Link
            href="/book"
            className="px-4 py-2 rounded-full bg-[#D4AF37] border border-[#D4AF37] text-[#0B0C10] text-sm font-semibold hover:bg-transparent hover:text-[#D4AF37] transition-all duration-200 shadow-[0_0_20px_rgba(212,175,55,0.35)]"
          >
            Book Consultation
          </Link>
          <Link
            href="/contact"
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${
              pathname === "/contact"
                ? "bg-[#D4AF37] border-[#D4AF37] text-[#0B0C10]"
                : "border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0C10]"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden ml-auto text-[#F8F9FA]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden backdrop-blur-xl bg-[#0B0C10]/95 border-t border-[#F8F9FA]/10">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`block py-2 text-sm transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[#D4AF37]"
                    : "text-[#aab3bd] hover:text-[#D4AF37]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-3">
              <Link
                href="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 rounded-full bg-[#D4AF37] border border-[#D4AF37] text-[#0B0C10] text-sm font-semibold text-center"
              >
                Book Consultation
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 rounded-full border border-[#D4AF37]/60 text-[#D4AF37] text-sm font-semibold text-center"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
