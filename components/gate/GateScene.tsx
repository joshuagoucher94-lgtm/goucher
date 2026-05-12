"use client";

import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function Relic({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * speed;
    ref.current.rotation.y = clock.elapsedTime * speed * 0.7;
  });

  return (
    <Float speed={0.7} rotationIntensity={0.35} floatIntensity={0.7} position={position}>
      <mesh ref={ref} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial color="#d2b77a" roughness={0.45} metalness={0.45} distort={0.18} speed={0.45} transparent opacity={0.13} />
      </mesh>
    </Float>
  );
}

function SceneContents({ unlocked }: { unlocked: boolean }) {
  return (
    <>
      <ambientLight intensity={unlocked ? 1.1 : 0.48} />
      <pointLight position={[4, 5, 5]} intensity={unlocked ? 22 : 8} color="#f6d18a" />
      <pointLight position={[-5, -3, 2]} intensity={5} color="#7885a0" />
      <Stars radius={50} depth={34} count={unlocked ? 1500 : 850} factor={3.4} saturation={0} fade speed={unlocked ? 1.6 : 0.35} />
      <Relic position={[-4.6, 1.8, -7]} scale={1.5} speed={0.06} />
      <Relic position={[4.2, -1.2, -6]} scale={1.1} speed={-0.08} />
      <Relic position={[0.8, 3.6, -9]} scale={0.9} speed={0.07} />
    </>
  );
}

export default function GateScene({ unlocked = false }: { unlocked?: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
      <Canvas camera={{ position: [0, 0, 8], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <SceneContents unlocked={unlocked} />
      </Canvas>
    </div>
  );
}
