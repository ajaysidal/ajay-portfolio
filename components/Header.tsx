"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { id: "home", href: "/", label: "Home" },
  { id: "services", href: "/services", label: "Services" },
  { id: "case-studies", href: "/case-studies", label: "Case Studies" },
  { id: "pricing", href: "/pricing", label: "Pricing" },
  { id: "book", href: "/book", label: "Book Consultation" },
  { id: "project-intake", href: "/project-intake", label: "Project Intake" },
  { id: "blog", href: "/blog", label: "Blog" },
  { id: "contact", href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-[#0B0C10]/80" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[#F8F9FA] tracking-tight">
          AS
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#F8F9FA]"
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
        <div className="md:hidden backdrop-blur-md bg-[#0B0C10]/95 border-t border-[#1F2833]">
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
          </div>
        </div>
      )}
    </header>
  );
}