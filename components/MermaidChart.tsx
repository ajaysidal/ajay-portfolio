"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidChartProps {
  chart: string;
  caption?: string;
}

export default function MermaidChart({ chart, caption }: MermaidChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const container = ref.current;
    if (!container || rendered) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "loose",
      themeVariables: {
        primaryColor: "#D4AF37",
        primaryTextColor: "#F8F9FA",
        primaryBorderColor: "#D4AF37",
        lineColor: "#D4AF37",
        secondaryColor: "#0B0C10",
        tertiaryColor: "#aab3bd",
      },
    });

    mermaid.render("mermaid-chart", chart, container).then(({ svg }) => {
      if (container) {
        container.innerHTML = svg;
        setRendered(true);
      }
    });
  }, [chart, rendered]);

  return (
    <div className="bg-[#0B0C10] p-6 rounded-lg border border-[#D4AF37]/20 flex flex-col items-center justify-center">
      <div ref={ref} className="w-full max-w-[600px] mx-auto" />
      {caption && (
        <p className="text-sm text-[#aab3bd] text-center mt-2 italic px-4 pb-4">
          {caption}
        </p>
      )}
    </div>
  );
}
