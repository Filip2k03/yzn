"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function Spot({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[0.08, 10, 10]} />
      <meshStandardMaterial color="#2a1810" roughness={0.7} />
    </mesh>
  );
}

function LeopardModel({ roaring }: { roaring: boolean }) {
  const group = useRef<THREE.Group>(null);
  const jaw = useRef<THREE.Mesh>(null);
  const head = useRef<THREE.Group>(null);
  const roarT = useRef(0);

  useEffect(() => {
    if (roaring) roarT.current = 0;
  }, [roaring]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const t = (roarT.current += delta);

    // idle prowling sway
    group.current.rotation.y = Math.sin(t * 0.55) * 0.18 - 0.15;
    group.current.position.y = Math.sin(t * 1.1) * 0.04;

    if (head.current) {
      const roarPulse = roaring
        ? Math.sin(Math.min(t, 1.2) * Math.PI * 3) * 0.12
        : Math.sin(t * 1.4) * 0.03;
      head.current.rotation.x = roarPulse;
      head.current.scale.setScalar(roaring ? 1 + Math.sin(t * 10) * 0.03 : 1);
    }

    if (jaw.current) {
      jaw.current.rotation.x = roaring
        ? 0.35 + Math.sin(t * 14) * 0.12
        : 0.08 + Math.sin(t * 2) * 0.02;
    }

    if (roaring && group.current) {
      group.current.position.x = Math.sin(t * 28) * 0.03;
    }
  });

  const fur = "#D4AF37";
  const furDeep = "#996515";
  const blush = "#E8829C";

  const spots = useMemo(
    () =>
      [
        [0.25, 0.22, 0.35],
        [-0.2, 0.28, 0.3],
        [0.05, 0.35, 0.45],
        [0.35, 0.05, 0.15],
        [-0.32, 0.1, 0.2],
        [0.15, -0.05, 0.4],
        [-0.1, 0.15, 0.55],
        [0.4, 0.2, -0.1],
        [-0.35, 0.25, -0.15],
        [0.2, 0.3, -0.25],
        [0, 0.18, -0.4],
        [0.28, -0.05, -0.2],
      ] as [number, number, number][],
    [],
  );

  return (
    <group ref={group} position={[0, -0.35, 0]} scale={1.15}>
      {/* body */}
      <mesh position={[0, 0.15, 0]} rotation={[0, 0, 0.05]} castShadow>
        <capsuleGeometry args={[0.42, 0.55, 8, 16]} />
        <meshStandardMaterial
          color={fur}
          metalness={0.35}
          roughness={0.45}
          emissive={furDeep}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* spots on body */}
      {spots.map((p, i) => (
        <Spot key={i} position={p} scale={0.7 + (i % 3) * 0.15} />
      ))}

      {/* neck */}
      <mesh position={[0.05, 0.45, 0.45]}>
        <capsuleGeometry args={[0.18, 0.12, 6, 12]} />
        <meshStandardMaterial color={fur} metalness={0.3} roughness={0.5} />
      </mesh>

      {/* head */}
      <group ref={head} position={[0.08, 0.55, 0.72]}>
        <mesh>
          <sphereGeometry args={[0.28, 20, 20]} />
          <meshStandardMaterial
            color={fur}
            metalness={0.3}
            roughness={0.4}
            emissive={blush}
            emissiveIntensity={roaring ? 0.25 : 0.05}
          />
        </mesh>
        {/* snout */}
        <mesh position={[0, -0.05, 0.22]}>
          <sphereGeometry args={[0.14, 14, 14]} />
          <meshStandardMaterial color="#F5E0A3" roughness={0.5} />
        </mesh>
        {/* jaw */}
        <mesh ref={jaw} position={[0, -0.12, 0.18]}>
          <boxGeometry args={[0.16, 0.06, 0.18]} />
          <meshStandardMaterial color="#2a121a" roughness={0.6} />
        </mesh>
        {/* ears */}
        <mesh position={[-0.16, 0.22, -0.05]} rotation={[0.2, 0, -0.4]}>
          <coneGeometry args={[0.08, 0.14, 8]} />
          <meshStandardMaterial color={furDeep} />
        </mesh>
        <mesh position={[0.16, 0.22, -0.05]} rotation={[0.2, 0, 0.4]}>
          <coneGeometry args={[0.08, 0.14, 8]} />
          <meshStandardMaterial color={furDeep} />
        </mesh>
        {/* eyes */}
        <mesh position={[-0.1, 0.08, 0.22]}>
          <sphereGeometry args={[0.04, 10, 10]} />
          <meshStandardMaterial
            color="#0a0a0a"
            emissive="#E8829C"
            emissiveIntensity={roaring ? 0.8 : 0.25}
          />
        </mesh>
        <mesh position={[0.1, 0.08, 0.22]}>
          <sphereGeometry args={[0.04, 10, 10]} />
          <meshStandardMaterial
            color="#0a0a0a"
            emissive="#E8829C"
            emissiveIntensity={roaring ? 0.8 : 0.25}
          />
        </mesh>
        {/* head spots */}
        <Spot position={[-0.12, 0.12, 0.1]} scale={0.55} />
        <Spot position={[0.14, 0.1, 0.08]} scale={0.5} />
        <Spot position={[0, 0.2, 0.05]} scale={0.45} />
      </group>

      {/* legs */}
      {[
        [-0.22, -0.35, 0.25],
        [0.22, -0.35, 0.25],
        [-0.22, -0.35, -0.25],
        [0.22, -0.35, -0.25],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <capsuleGeometry args={[0.07, 0.22, 4, 8]} />
          <meshStandardMaterial color={furDeep} roughness={0.55} />
        </mesh>
      ))}

      {/* tail */}
      <group position={[-0.05, 0.25, -0.55]} rotation={[0.4, 0, -0.6]}>
        <mesh>
          <capsuleGeometry args={[0.05, 0.55, 4, 8]} />
          <meshStandardMaterial color={fur} metalness={0.25} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, -0.35]}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshStandardMaterial color="#1a1008" />
        </mesh>
      </group>
    </group>
  );
}

function RoarBurst({ active }: { active: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.2;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current || !active) return;
    const t = state.clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < 80; i++) {
      const a = (i / 80) * Math.PI * 2;
      const r = 0.4 + (t % 1.2) * 1.4;
      pos.setXYZ(
        i,
        Math.cos(a + t) * r + (Math.random() - 0.5) * 0.1,
        Math.sin(t * 3 + i) * 0.4 + 0.5,
        Math.sin(a + t) * r * 0.6 + 0.8,
      );
    }
    pos.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#F5E0A3"
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ active }: { active: boolean }) {
  return (
    <>
      <color attach="background" args={["#00000000"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 2]} intensity={1.2} color="#F5E0A3" />
      <pointLight position={[-2, 1, 3]} intensity={1.1} color="#E8829C" />
      <pointLight position={[2, -1, 1]} intensity={0.5} color="#D4AF37" />
      <spotLight
        position={[0, 3, 2]}
        angle={0.5}
        penumbra={0.6}
        intensity={active ? 1.4 : 0.6}
        color="#F4C2C2"
      />

      <Float speed={active ? 1.6 : 0.4} floatIntensity={0.35} rotationIntensity={0.1}>
        <LeopardModel roaring={active} />
      </Float>

      <RoarBurst active={active} />

      <Sparkles
        count={40}
        scale={[6, 4, 4]}
        size={2.4}
        speed={active ? 1.2 : 0.3}
        opacity={0.7}
        color="#D4AF37"
      />
      <Sparkles
        count={24}
        scale={[5, 3, 3]}
        size={1.8}
        speed={active ? 0.9 : 0.2}
        opacity={0.45}
        color="#E8829C"
      />
    </>
  );
}

export function LeopardScene3D({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [1.6, 0.9, 3.4], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        frameloop={active ? "always" : "demand"}
      >
        <fog attach="fog" args={["#12080c", 4, 8.5]} />
        <Scene active={active} />
      </Canvas>
    </div>
  );
}
