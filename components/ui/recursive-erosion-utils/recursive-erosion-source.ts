/**
 * Recursive Erosion Source
 *
 * Configuration and utility functions for the recursive erosion particle system.
 * This module defines the erosion algorithm parameters, color palettes, and
 * mathematical utilities used by the RecursiveErosionBackground component.
 *
 * The erosion algorithm works by:
 * 1. Emitting particles from a central point
 * 2. Each particle travels outward, leaving a trail
 * 3. Particles decay (erode) over time based on distance and age
 * 4. New particles spawn from eroded points, creating recursive fractal patterns
 * 5. The result is an organic, geological-looking sphere that slowly evolves
 */

import * as THREE from 'three';

// ============================================================================
// Configuration
// ============================================================================

export interface ErosionConfig {
  /** Number of particles in the system */
  particleCount: number;
  /** Base color hue (0-360) */
  hue: number;
  /** Saturation multiplier (0-2) */
  saturation: number;
  /** Brightness multiplier (0-2) */
  brightness: number;
  /** Erosion speed (particles per second) */
  erosionSpeed: number;
  /** Particle lifetime in seconds */
  particleLifetime: number;
  /** Maximum recursion depth for erosion branches */
  maxRecursionDepth: number;
  /** Probability of a particle spawning a child (0-1) */
  spawnProbability: number;
  /** Minimum distance between parent and child particles */
  minSpawnDistance: number;
  /** Maximum distance particles can travel from center */
  maxRadius: number;
  /** Rotation speed of the entire system (radians per second) */
  rotationSpeed: number;
  /** Whether the system pulses over time */
  pulseEnabled: boolean;
  /** Pulse speed in radians per second */
  pulseSpeed: number;
}

/**
 * Default configuration optimized for the Sovereign brand aesthetic.
 * Uses gold/yellow tones (hue ~45) with dark background compatibility.
 */
export const DEFAULT_EROSION_CONFIG: ErosionConfig = {
  particleCount: 1500,
  hue: 45, // Gold
  saturation: 1.3,
  brightness: 0.85,
  erosionSpeed: 0.5,
  particleLifetime: 3.0,
  maxRecursionDepth: 5,
  spawnProbability: 0.15,
  minSpawnDistance: 0.15,
  maxRadius: 4.5,
  rotationSpeed: 0.15,
  pulseEnabled: true,
  pulseSpeed: 1.5,
};

// ============================================================================
// Color Utilities
// ============================================================================

/**
 * Convert HSL color to RGB
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = h % 360;
  if (h < 0) h += 360;

  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/**
 * Convert RGB to THREE.Color
 */
export function rgbToThreeColor(r: number, g: number, b: number): THREE.Color {
  return new THREE.Color(r / 255, g / 255, b / 255);
}

/**
 * Convert HSL to THREE.Color directly
 */
export function hslToThreeColor(h: number, s: number, l: number): THREE.Color {
  const rgb = hslToRgb(h, s, l);
  return rgbToThreeColor(rgb.r, rgb.g, rgb.b);
}

// ============================================================================
// Math Utilities
// ============================================================================

/**
 * Generate a random float between min and max (inclusive)
 */
export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Spherical to Cartesian coordinates
 */
export function sphericalToCartesian(
  radius: number,
  theta: number, // polar angle (0 to PI)
  phi: number // azimuthal angle (0 to 2*PI)
): { x: number; y: number; z: number } {
  const x = radius * Math.sin(theta) * Math.cos(phi);
  const y = radius * Math.cos(theta);
  const z = radius * Math.sin(theta) * Math.sin(phi);
  return { x, y, z };
}

/**
 * Normalize a 3D vector
 */
export function normalizeVector(v: { x: number; y: number; z: number }): { x: number; y: number; z: number } {
  const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  if (len === 0) return { x: 0, y: 0, z: 0 };
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Linear interpolation
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ============================================================================
// Particle Data Structures
// ============================================================================

export interface ErosionParticle {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  age: number;
  lifetime: number;
  depth: number; // Recursion depth (0 = root)
  parentId: number | null;
  color: THREE.Color;
  size: number;
  active: boolean;
}

/**
 * Create a new erosion particle
 */
export function createParticle(
  id: number,
  position: THREE.Vector3,
  velocity: THREE.Vector3,
  depth: number,
  config: ErosionConfig,
  parentId: number | null = null
): ErosionParticle {
  const lifetime = randomRange(config.particleLifetime * 0.5, config.particleLifetime * 1.5);
  const hue = config.hue + randomRange(-15, 15);
  const color = hslToThreeColor(hue, config.saturation, config.brightness);
  const size = randomRange(0.02, 0.08) * (1 - depth / config.maxRecursionDepth);

  return {
    id,
    position: position.clone(),
    velocity: velocity.clone(),
    age: 0,
    lifetime,
    depth,
    parentId,
    color,
    size,
    active: true,
  };
}

// ============================================================================
// Erosion Logic
// ============================================================================

/**
 * Update a single particle's state based on time delta
 */
export function updateParticle(
  particle: ErosionParticle,
  dt: number,
  config: ErosionConfig
): void {
  if (!particle.active) return;

  particle.age += dt;

  // Update position based on velocity
  particle.position.add(particle.velocity.clone().multiplyScalar(dt));

  // Apply slight drag to slow particles over time
  particle.velocity.multiplyScalar(1 - dt * 2);

  // Add slight random drift for organic feel
  particle.position.x += (Math.random() - 0.5) * dt * 0.05;
  particle.position.y += (Math.random() - 0.5) * dt * 0.05;
  particle.position.z += (Math.random() - 0.5) * dt * 0.05;

  // Deactivate if lifetime exceeded or too far from center
  const distanceFromCenter = particle.position.length();
  if (particle.age >= particle.lifetime || distanceFromCenter > config.maxRadius) {
    particle.active = false;
  }
}

/**
 * Determine if a particle should spawn a child particle
 */
export function shouldSpawnChild(
  particle: ErosionParticle,
  config: ErosionConfig
): boolean {
  if (particle.depth >= config.maxRecursionDepth) return false;
  if (Math.random() > config.spawnProbability) return false;
  if (particle.age < particle.lifetime * 0.3) return false; // Don't spawn too early
  return true;
}

/**
 * Create a child particle from a parent
 */
export function spawnChildParticle(
  parent: ErosionParticle,
  id: number,
  config: ErosionConfig
): ErosionParticle {
  // Direction is roughly the parent's velocity with some randomness
  const direction = parent.velocity.clone().normalize();
  direction.x += (Math.random() - 0.5) * 0.5;
  direction.y += (Math.random() - 0.5) * 0.5;
  direction.z += (Math.random() - 0.5) * 0.5;
  direction.normalize();

  const speed = parent.velocity.length() * randomRange(0.6, 0.9);
  const velocity = direction.multiplyScalar(speed);

  return createParticle(id, parent.position.clone(), velocity, parent.depth + 1, config, parent.id);
}