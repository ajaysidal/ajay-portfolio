"use client";

export default function Logo({ variant = "full" }: { variant?: "full" | "icon" }) {
  return (
    <span className="flex items-center gap-3 group" aria-hidden="true">
      {/* SVG Logo Mark */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="h-10 w-10 md:h-12 md:w-12 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BF953F" />
            <stop offset="25%" stopColor="#FCF6BA" />
            <stop offset="50%" stopColor="#B38728" />
            <stop offset="75%" stopColor="#FBF5B7" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Hexagon Base */}
        <path
          d="M 50 5 L 93 27.5 L 93 72.5 L 50 95 L 7 72.5 L 7 27.5 Z"
          fill="url(#goldGrad)"
        />

        {/* Inner Hexagon Cutout */}
        <path
          d="M 50 15 L 83 32.5 L 83 67.5 L 50 85 L 17 67.5 L 17 32.5 Z"
          fill="currentColor"
          className="text-[#0a0a0a] dark:text-[#f5f5f5]"
          opacity="0.95"
        />

        {/* Circuit Traces - Left */}
        <path d="M 17 50 L 30 50 L 37 40 L 47 40" stroke="url(#goldGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="47" cy="40" r="2.5" fill="url(#goldGrad)" />

        <path d="M 17 60 L 28 60 L 35 70 L 45 70" stroke="url(#goldGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="45" cy="70" r="2.5" fill="url(#goldGrad)" />

        {/* Circuit Traces - Right */}
        <path d="M 83 50 L 70 50 L 63 60 L 53 60" stroke="url(#goldGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="53" cy="60" r="2.5" fill="url(#goldGrad)" />

        <path d="M 83 40 L 72 40 L 65 30 L 55 30" stroke="url(#goldGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="55" cy="30" r="2.5" fill="url(#goldGrad)" />

        {/* Central AI Core Node */}
        <g filter="url(#glow)">
          <circle cx="50" cy="50" r="14" fill="url(#goldGrad)" />
          <path d="M 50 36 L 50 22 M 38 57 L 26 64 M 62 57 L 74 64" stroke="url(#goldGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="22" r="3" fill="url(#goldGrad)" />
          <circle cx="26" cy="64" r="3" fill="url(#goldGrad)" />
          <circle cx="74" cy="64" r="3" fill="url(#goldGrad)" />
        </g>
      </svg>

      {/* Text - Only shown in "full" variant and on md+ screens */}
      {variant === "full" && (
        <span className="hidden md:block text-xl md:text-2xl font-bold tracking-wider text-[#1a1a1a] dark:text-[#f5f5f5] transition-colors duration-300 group-hover:text-[#BF953F] dark:group-hover:text-[#FCF6BA]">
          BUILD WITH AI
        </span>
      )}
    </span>
  );
}