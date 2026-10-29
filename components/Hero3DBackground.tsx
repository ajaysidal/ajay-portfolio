"use client";

import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useEffect } from "react";
import * as THREE from "three";

// Pre-compute positions on mount instead of using Math.random() during render
const PARTICLE_COUNT = 110;
const POSITIONS = new Float32Array(PARTICLE_COUNT * 3);

for (let i = 0; i < PARTICLE_COUNT; i++) {
  POSITIONS[i * 3] = (Math.random() - 0.5) * 12;
  POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 8;
  POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 8;
}

const LINE_POSITIONS: number[] = [];
const POINT_POSITIONS: number[] = [];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  POINT_POSITIONS.push(POSITIONS[i * 3], POSITIONS[i * 3 + 1], POSITIONS[i * 3 + 2]);
}

for (let a = 0; a < PARTICLE_COUNT; a++) {
  for (let b = a + 1; b < PARTICLE_COUNT; b++) {
    const dx = POSITIONS[a * 3] - POSITIONS[b * 3];
    const dy = POSITIONS[a * 3 + 1] - POSITIONS[b * 3 + 1];
    const dz = POSITIONS[a * 3 + 2] - POSITIONS[b * 3 + 2];
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const threshold = typeof window !== "undefined" && window.innerWidth < 700 ? 2.2 : 1.9;
    if (dist < threshold) {
      LINE_POSITIONS.push(
        POSITIONS[a * 3],
        POSITIONS[a * 3 + 1],
        POSITIONS[a * 3 + 2],
        POSITIONS[b * 3],
        POSITIONS[b * 3 + 1],
        POSITIONS[b * 3 + 2]
      );
    }
  }
}

const GROUP_REF = { current: null as THREE.Group | null };
const MOUSE_REF = { x: 0, y: 0 };

export default function Hero3DBackground() {
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 700 : false;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches), 0);

      const handlePointerMove = (e: MouseEvent) => {
        MOUSE_REF.x = e.clientX / (window.innerWidth || 1) - 0.5;
        MOUSE_REF.y = e.clientY / (window.innerHeight || 1) - 0.5;
      };
      window.addEventListener("pointermove", handlePointerMove);
      return () => window.removeEventListener("pointermove", handlePointerMove);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tick = (time: number) => {
        if (GROUP_REF.current && !reduceMotion) {
          GROUP_REF.current.rotation.y = time * 0.00008 + MOUSE_REF.x * 0.4;
          GROUP_REF.current.rotation.x = time * 0.00004 + MOUSE_REF.y * 0.3;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, [reduceMotion, MOUSE_REF, GROUP_REF]);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60, near: 0.1, far: 100 }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at 50% 40%, #1F2833, #0B0C10)",
      }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, isMobile ? 1 : 2) : 1}
    >
      <group ref={GROUP_REF}>
        <Points
          positions={POSITIONS}
          stride={3}
        >
          <PointMaterial
            color={0xD4AF37}
            size={isMobile ? 0.05 : 0.07}
            sizeAttenuation
            transparent
            opacity={0.8}
          />
        </Points>
          <lineSegments>
            <bufferGeometry>
              <primitive 
                object={new THREE.BufferAttribute(POSITIONS, 3)} 
                attach="attributes-position" 
              />
              <primitive 
                object={new THREE.BufferAttribute(new Float32Array(LINE_POSITIONS), 3)} 
                attach="attributes-position" 
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={0x00A86B}
              transparent
              opacity={0.35}
            />
          </lineSegments>
      </group>
    </Canvas>
  );
}