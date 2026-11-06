"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import { useEffect, useRef } from "react";

// Suppress THREE.Clock deprecation warning from @react-three/fiber internals
const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) {
    return;
  }
  originalWarn.apply(console, args);
};

const Hero3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Handle reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (meshRef.current) {
        meshRef.current.visible = !event.matches;
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    if (mediaQuery.matches && meshRef.current) {
      meshRef.current.visible = false;
    }

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
    >
      <camera position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <mesh
        ref={meshRef}
        scale={2}
        rotation-y={Math.PI / 4}
      >
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#D4AF37"
          wireframe={true}
          transparent={true}
          opacity={0.8}
          fog={false}
        />
      </mesh>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.2}>
        <mesh>
          <icosahedronGeometry args={[0.5, 0]} />
          <MeshDistortMaterial
            color="#D4AF37"
            wireframe={true}
            transparent={true}
            opacity={0.4}
            fog={false}
          />
        </mesh>
      </Float>
    </canvas>
  );
};

export default Hero3D;
