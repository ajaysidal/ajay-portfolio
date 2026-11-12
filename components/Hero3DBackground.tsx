"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Hero3DBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Canvas
        className="inset-0 w-full h-full"
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 1000 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
        resize={{ scroll: false }}
      >
        {/* Dramatic Golden Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#D4AF37" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#F8F9FA" />
        <pointLight position={[0, 5, 0]} intensity={1} color="#D4AF37" distance={10} decay={2} />
        
        {/* Primary Hero Sphere */}
        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.5}>
          <mesh ref={meshRef} scale={3.2} rotation={[0.5, 0.5, 0]}>
            <sphereGeometry args={[1, 128, 128]} />
            <MeshDistortMaterial
              color="#D4AF37"
              attach="material"
              distort={0.35}
              speed={2}
              roughness={0.1}
              metalness={0.95}
              wireframe={true}
              transparent
              opacity={0.85}
            />
          </mesh>
        </Float>
        
        {/* Secondary Depth Sphere */}
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
          <mesh position={[3.5, -2, -3]} scale={1.8} rotation={[-0.3, 0.3, 0]}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
              color="#F8F9FA"
              attach="material"
              distort={0.2}
              speed={1.5}
              roughness={0.3}
              metalness={0.6}
              wireframe={true}
              transparent
              opacity={0.25}
            />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}
