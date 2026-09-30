"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type FlowerProps = {
  position: [number, number, number];
  scale?: number;
  phase?: number;
  wind?: number;
};

function GangawFlower({
  position,
  scale = 1,
  phase = 0,
  wind = 1,
}: FlowerProps) {
  const group = useRef<THREE.Group>(null);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime + phase;
    group.current.position.x = base.x + Math.sin(t * 0.55 * wind) * 0.22;
    group.current.position.y = base.y + Math.cos(t * 0.7 * wind) * 0.14;
    group.current.position.z = base.z + Math.sin(t * 0.35) * 0.08;
    group.current.rotation.z = Math.sin(t * 0.9 * wind) * 0.35;
    group.current.rotation.x = Math.cos(t * 0.6) * 0.12;
    group.current.rotation.y = Math.sin(t * 0.4) * 0.2;
  });

  const petals = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      return {
        key: i,
        rotZ: angle,
        pos: [Math.cos(angle) * 0.12, Math.sin(angle) * 0.12, 0] as [
          number,
          number,
          number,
        ],
      };
    });
  }, []);

  return (
    <group ref={group} position={position} scale={scale}>
      {petals.map((p) => (
        <mesh key={p.key} position={p.pos} rotation={[0.4, 0, p.rotZ]}>
          <sphereGeometry args={[0.22, 16, 12]} />
          <meshStandardMaterial
            color="#fff8f4"
            roughness={0.35}
            metalness={0.05}
            transparent
            opacity={0.92}
            emissive="#f4c2c2"
            emissiveIntensity={0.08}
          />
        </mesh>
      ))}
      {/* golden stamens / center */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#F5E0A3"
          emissiveIntensity={0.55}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={`stamen-${i}`}
            position={[Math.cos(a) * 0.08, Math.sin(a) * 0.08, 0.08]}
          >
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial
              color="#F5E0A3"
              emissive="#D4AF37"
              emissiveIntensity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function BlowingPetal({
  seed,
}: {
  seed: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const data = useMemo(() => {
    const rng = (n: number) => {
      const x = Math.sin(seed * 999 + n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    return {
      startX: -4.5 + rng(1) * 1.2,
      y: -2 + rng(2) * 4,
      z: -2 + rng(3) * 2,
      speed: 0.35 + rng(4) * 0.55,
      spin: 0.8 + rng(5) * 1.6,
      sway: 0.2 + rng(6) * 0.45,
      scale: 0.18 + rng(7) * 0.28,
      delay: rng(8) * 8,
    };
  }, [seed]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + data.delay;
    const travel = ((t * data.speed) % 10) - 1;
    ref.current.position.x = data.startX + travel;
    ref.current.position.y = data.y + Math.sin(t * data.sway * 2) * 0.35;
    ref.current.position.z = data.z;
    ref.current.rotation.z = t * data.spin;
    ref.current.rotation.x = Math.sin(t * 1.2) * 0.6;
    ref.current.rotation.y = Math.cos(t * 0.9) * 0.5;
  });

  return (
    <group ref={ref} scale={data.scale}>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          rotation={[0.5, 0, (i / 4) * Math.PI * 2]}
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 0.1,
            Math.sin((i / 4) * Math.PI * 2) * 0.1,
            0,
          ]}
        >
          <sphereGeometry args={[0.16, 10, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.85}
            roughness={0.4}
            emissive="#f4c2c2"
            emissiveIntensity={0.06}
          />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#F5E0A3"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function ButterflyLite({
  position,
  phase = 0,
}: {
  position: [number, number, number];
  phase?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + phase;
    ref.current.position.x = base.x + Math.sin(t * 0.65) * 0.7;
    ref.current.position.y = base.y + Math.cos(t * 0.85) * 0.4;
    const flap = Math.sin(t * 9) * 0.5;
    if (left.current) left.current.rotation.y = -0.55 + flap;
    if (right.current) right.current.rotation.y = 0.55 - flap;
  });

  return (
    <group ref={ref} position={position} scale={0.45}>
      <mesh ref={left} position={[-0.12, 0, 0]}>
        <sphereGeometry args={[0.15, 10, 8]} />
        <meshStandardMaterial color="#F4C2C2" transparent opacity={0.88} emissive="#E8829C" emissiveIntensity={0.3} />
      </mesh>
      <mesh ref={right} position={[0.12, 0, 0]}>
        <sphereGeometry args={[0.15, 10, 8]} />
        <meshStandardMaterial color="#F5E0A3" transparent opacity={0.85} emissive="#D4AF37" emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

function SilkRibbon({
  position,
  phase = 0,
}: {
  position: [number, number, number];
  phase?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + phase;
    ref.current.position.x = base.x + Math.sin(t * 0.5) * 0.18;
    ref.current.position.y = base.y + Math.cos(t * 0.6) * 0.12;
    ref.current.rotation.z = Math.sin(t * 0.8) * 0.4;
  });

  return (
    <group ref={ref} position={position} scale={0.85}>
      <mesh position={[-0.16, 0.04, 0]} rotation={[0.15, 0, 0.45]}>
        <torusGeometry args={[0.12, 0.04, 8, 20]} />
        <meshStandardMaterial color="#E8829C" emissive="#F4C2C2" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0.16, 0.04, 0]} rotation={[0.15, 0, -0.45]}>
        <torusGeometry args={[0.12, 0.04, 8, 20]} />
        <meshStandardMaterial color="#F4C2C2" emissive="#E8829C" emissiveIntensity={0.2} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.75} roughness={0.2} />
      </mesh>
    </group>
  );
}

function WindField({ active }: { active: boolean }) {
  const flowers = useMemo(
    () =>
      [
        { position: [-1.4, 0.6, -0.4] as [number, number, number], scale: 0.85, phase: 0.2, wind: 1.1 },
        { position: [1.2, 0.3, -0.6] as [number, number, number], scale: 1.05, phase: 1.1, wind: 0.9 },
        { position: [0.1, -0.8, -0.2] as [number, number, number], scale: 0.7, phase: 2.2, wind: 1.3 },
        { position: [-0.6, -0.2, -1.0] as [number, number, number], scale: 0.55, phase: 0.7, wind: 1.4 },
        { position: [0.8, 1.0, -0.8] as [number, number, number], scale: 0.6, phase: 1.7, wind: 1.0 },
        { position: [-1.8, -0.9, -0.5] as [number, number, number], scale: 0.5, phase: 2.8, wind: 1.2 },
        { position: [1.7, -0.7, -0.7] as [number, number, number], scale: 0.48, phase: 0.9, wind: 1.15 },
        { position: [-0.2, 1.15, -0.5] as [number, number, number], scale: 0.42, phase: 1.5, wind: 1.25 },
      ],
    [],
  );

  const petals = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), []);

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 4, 2]} intensity={1.05} color="#F5E0A3" />
      <pointLight position={[-2, 1, 2]} intensity={1.15} color="#E8829C" />
      <pointLight position={[2, -1, 1]} intensity={0.7} color="#F4C2C2" />
      <pointLight position={[0, 2, 1]} intensity={0.45} color="#ffe6ef" />

      <Float speed={active ? 1.35 : 0.2} rotationIntensity={0.22} floatIntensity={0.45}>
        {flowers.map((f, i) => (
          <GangawFlower key={i} {...f} />
        ))}
      </Float>

      {petals.map((seed) => (
        <BlowingPetal key={seed} seed={seed} />
      ))}

      <ButterflyLite position={[-0.8, 0.4, 0.5]} phase={0.3} />
      <ButterflyLite position={[1.1, -0.1, 0.3]} phase={1.4} />
      <ButterflyLite position={[0.2, 0.9, 0.2]} phase={2.2} />

      <SilkRibbon position={[-1.5, 0.2, 0.2]} phase={0.5} />
      <SilkRibbon position={[1.4, 0.7, 0]} phase={1.7} />

      <Sparkles count={64} scale={[8, 5, 4]} size={2.3} speed={0.4} opacity={0.65} color="#F4C2C2" />
      <Sparkles count={40} scale={[7, 4, 3]} size={1.8} speed={0.3} opacity={0.5} color="#F5E0A3" />
      <Sparkles count={24} scale={[6, 3.5, 2.5]} size={1.4} speed={0.22} opacity={0.45} color="#ffffff" />
    </>
  );
}

export function GangawScene3D({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        frameloop={active ? "always" : "demand"}
      >
        <fog attach="fog" args={["#12080c", 4.5, 9]} />
        <WindField active={active} />
      </Canvas>
    </div>
  );
}
