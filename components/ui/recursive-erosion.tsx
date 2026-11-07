"use client";

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import {
  DEFAULT_EROSION_CONFIG,
  ErosionConfig,
  ErosionParticle,
  createParticle,
  updateParticle,
  shouldSpawnChild,
  spawnChildParticle,
} from '@/components/ui/recursive-erosion-utils/recursive-erosion-source';

interface RecursiveErosionProps {
  config?: Partial<ErosionConfig>;
  className?: string;
}

export default function RecursiveErosion({
  config: configOverride,
  className,
}: RecursiveErosionProps) {
  const configRef = useRef<ErosionConfig>({
    ...DEFAULT_EROSION_CONFIG,
    ...configOverride,
  });
  const particlesRef = useRef<ErosionParticle[]>([]);
  const particleIdRef = useRef<number>(0);
  const meshRef = useRef<THREE.Points>(null!);
  const geometryRef = useRef<THREE.BufferGeometry>(null!);
  const materialRef = useRef<THREE.PointsMaterial>(null!);

  // Initialize particles on mount
  useEffect(() => {
    if (!geometryRef.current) return;

    const geometry = geometryRef.current;
    const count = DEFAULT_EROSION_CONFIG.particleCount;

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(count * 3), 3)
    );
    geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(new Float32Array(count * 3), 3)
    );
    geometry.setAttribute('size', new THREE.BufferAttribute(new Float32Array(count), 1));

    const particles: ErosionParticle[] = [];
    for (let i = 0; i < count; i++) {
      const particle = createParticle(
        particleIdRef.current++,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ).normalize().multiplyScalar(Math.random() * 0.5),
        0,
        configRef.current,
        null
      );
      particles.push(particle);
    }
    particlesRef.current = particles;
  }, []);

  // Animation loop
  useFrame((state, delta) => {
    if (!meshRef.current || !geometryRef.current || !materialRef.current) return;

    const dt = delta;
    const positions = geometryRef.current.getAttribute('position') as THREE.BufferAttribute;
    const colors = geometryRef.current.getAttribute('color') as THREE.BufferAttribute;
    const sizes = geometryRef.current.getAttribute('size') as THREE.BufferAttribute;

    let activeCount = 0;

    for (let i = 0; i < particlesRef.current.length; i++) {
      const particle = particlesRef.current[i];
      updateParticle(particle, dt, configRef.current);

      if (particle.active) {
        const idx = activeCount * 3;
        positions.setXYZ(idx, particle.position.x, particle.position.y, particle.position.z);
        colors.setXYZ(idx, particle.color.r, particle.color.g, particle.color.b);
        sizes.setX(activeCount, particle.size);
        activeCount++;

        // Spawn child particles
        if (
          shouldSpawnChild(particle, configRef.current) &&
          activeCount < DEFAULT_EROSION_CONFIG.particleCount
        ) {
          const child = spawnChildParticle(particle, particleIdRef.current++, configRef.current);
          particlesRef.current.push(child);
        }
      }
    }

    // Mark inactive particles as invisible
    for (let i = activeCount; i < particlesRef.current.length; i++) {
      const idx = i * 3;
      positions.setXYZ(idx, 0, 0, 0);
      colors.setXYZ(idx, 0, 0, 0);
      sizes.setX(i, 0);
    }

    positions.needsUpdate = true;
    colors.needsUpdate = true;
    sizes.needsUpdate = true;

    // Rotate the mesh
    if (meshRef.current) {
      meshRef.current.rotation.y += configRef.current.rotationSpeed * dt;
      if (configRef.current.pulseEnabled) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * configRef.current.pulseSpeed) * 0.1;
        meshRef.current.scale.set(pulse, pulse, pulse);
      }
    }
  });

  return (
    <Canvas
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <ambientLight intensity={0.5} />
      <mesh ref={meshRef}>
        <bufferGeometry ref={geometryRef} />
        <pointsMaterial
          ref={materialRef}
          attach="material"
          size={0.05}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation={true}
        />
      </mesh>
    </Canvas>
  );
}
