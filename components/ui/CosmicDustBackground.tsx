"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export default function CosmicDustBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]} // Caps pixel ratio to prevent mobile GPU overload
        gl={{ antialias: false, alpha: true }} // Optimizes rendering performance
        style={{ width: "100%", height: "100%" }}
      >
        <Sparkles
          count={300}
          scale={12}
          size={1.5}
          speed={0.3}
          color="#D4AF37" // Brand Gold
          opacity={0.8}
        />
      </Canvas>
    </div>
  );
}