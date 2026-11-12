"use client";

import Image from "next/image";

export default function Logo({ variant = "full" }: { variant?: "full" | "icon" }) {
  return (
    <span className="flex items-center gap-3 group">
      {/* Optimized PNG Logo Mark */}
      <Image
        src="/logo.png"
        alt="Build With AI"
        width={48}
        height={48}
        className="h-10 w-10 md:h-12 md:w-12 object-contain transition-transform duration-300 group-hover:scale-105"
        priority
      />

      {/* Text - Only shown in "full" variant and on md+ screens */}
      {variant === "full" && (
        <span className="hidden md:block text-xl md:text-2xl font-bold tracking-wider text-[#1a1a1a] dark:text-[#f5f5f5] transition-colors duration-300 group-hover:text-[#BF953F] dark:group-hover:text-[#FCF6BA]">
          BUILD WITH AI
        </span>
      )}
    </span>
  );
}
