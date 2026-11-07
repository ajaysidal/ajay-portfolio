"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Hero3DBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh ref={meshRef} scale={2.5}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
              color="#D4AF37"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.2}
              metalness={0.8}
              wireframe={true}
            />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}
