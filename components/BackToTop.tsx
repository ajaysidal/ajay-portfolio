"use client";

import { useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", checkScroll);
    checkScroll();

    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 p-3 rounded-full transition-all duration-300 opacity-100 translate-y-0 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10 pointer-events-none"}`}
      onClick={handleScrollToTop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleScrollToTop();
      }}
    >
      <div className="bg-[#1F2833]/80 backdrop-blur-md border border-[#D4AF37]/30 rounded-full p-3 hover:bg-[#1F2833]/90 transition-all duration-200">
        <ChevronUp className="w-5 h-5 text-[#D4AF37]" />
      </div>
    </div>
  );
}
