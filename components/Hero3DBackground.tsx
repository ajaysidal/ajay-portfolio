"use client";

import dynamic from "next/dynamic";

const RecursiveErosion = dynamic(() => import("@/components/ui/recursive-erosion"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export default function Hero3DBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <RecursiveErosion
        className="w-full h-full"
        config={{
          hue: 45,
          saturation: 1.3,
          brightness: 0.85,
          particleCount: 1500,
          erosionSpeed: 0.5,
          particleLifetime: 3.0,
          maxRecursionDepth: 5,
          spawnProbability: 0.15,
          minSpawnDistance: 0.15,
          maxRadius: 4.5,
          rotationSpeed: 0.15,
          pulseEnabled: true,
          pulseSpeed: 1.5,
        }}
      />
    </div>
  );
}
