"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Pearl({
  position,
  scale = 1,
  color = "#fff5f8",
  phase = 0,
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  phase?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + phase;
    ref.current.position.x = base.x + Math.sin(t * 0.5) * 0.12;
    ref.current.position.y = base.y + Math.cos(t * 0.7) * 0.16;
    ref.current.position.z = base.z + Math.sin(t * 0.35) * 0.06;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[0.12, 24, 24]} />
      <meshStandardMaterial
        color={color}
        metalness={0.85}
        roughness={0.15}
        emissive="#f4c2c2"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function Heart3D({
  position,
  scale = 1,
  phase = 0,
  color = "#E8829C",
}: {
  position: [number, number, number];
  scale?: number;
  phase?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.25);
    s.bezierCurveTo(0, 0.45, -0.35, 0.45, -0.35, 0.2);
    s.bezierCurveTo(-0.35, 0, -0.1, -0.15, 0, -0.4);
    s.bezierCurveTo(0.1, -0.15, 0.35, 0, 0.35, 0.2);
    s.bezierCurveTo(0.35, 0.45, 0, 0.45, 0, 0.25);
    return s;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + phase;
    ref.current.position.x = base.x + Math.sin(t * 0.6) * 0.15;
    ref.current.position.y = base.y + Math.cos(t * 0.8) * 0.18;
    ref.current.rotation.y = t * 0.4;
    ref.current.rotation.z = Math.sin(t) * 0.15;
    const pulse = 1 + Math.sin(t * 2.2) * 0.06;
    ref.current.scale.setScalar(scale * pulse);
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh rotation={[0, 0, Math.PI]}>
        <extrudeGeometry
          args={[
            shape,
            { depth: 0.12, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 3 },
          ]}
        />
        <meshStandardMaterial
          color={color}
          metalness={0.35}
          roughness={0.35}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}

function Ribbon({
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
    ref.current.position.x = base.x + Math.sin(t * 0.45) * 0.2;
    ref.current.position.y = base.y + Math.cos(t * 0.55) * 0.12;
    ref.current.rotation.z = Math.sin(t * 0.7) * 0.35;
    ref.current.rotation.y = Math.cos(t * 0.4) * 0.4;
  });

  return (
    <group ref={ref} position={position}>
      {/* bow loops */}
      <mesh position={[-0.18, 0.05, 0]} rotation={[0.2, 0, 0.5]}>
        <torusGeometry args={[0.14, 0.045, 10, 24]} />
        <meshStandardMaterial
          color="#E8829C"
          metalness={0.2}
          roughness={0.4}
          emissive="#F4C2C2"
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh position={[0.18, 0.05, 0]} rotation={[0.2, 0, -0.5]}>
        <torusGeometry args={[0.14, 0.045, 10, 24]} />
        <meshStandardMaterial
          color="#F4C2C2"
          metalness={0.2}
          roughness={0.4}
          emissive="#E8829C"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* center knot */}
      <mesh>
        <sphereGeometry args={[0.07, 14, 14]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* tails */}
      <mesh position={[-0.08, -0.22, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.06, 0.28, 0.02]} />
        <meshStandardMaterial color="#E8829C" roughness={0.45} />
      </mesh>
      <mesh position={[0.08, -0.22, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.06, 0.28, 0.02]} />
        <meshStandardMaterial color="#F4C2C2" roughness={0.45} />
      </mesh>
    </group>
  );
}

function Butterfly({
  position,
  phase = 0,
  color = "#F4C2C2",
}: {
  position: [number, number, number];
  phase?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + phase;
    ref.current.position.x = base.x + Math.sin(t * 0.7) * 0.55;
    ref.current.position.y = base.y + Math.cos(t * 0.9) * 0.35;
    ref.current.position.z = base.z + Math.sin(t * 0.5) * 0.2;
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.5;
    const flap = Math.sin(t * 8) * 0.55;
    if (left.current) left.current.rotation.y = -0.6 + flap;
    if (right.current) right.current.rotation.y = 0.6 - flap;
  });

  return (
    <group ref={ref} position={position} scale={0.55}>
      <mesh ref={left} position={[-0.12, 0, 0]}>
        <sphereGeometry args={[0.16, 12, 10]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.85}
          emissive={color}
          emissiveIntensity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={right} position={[0.12, 0, 0]}>
        <sphereGeometry args={[0.16, 12, 10]} />
        <meshStandardMaterial
          color="#F5E0A3"
          transparent
          opacity={0.8}
          emissive="#D4AF37"
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <capsuleGeometry args={[0.025, 0.18, 4, 8]} />
        <meshStandardMaterial color="#2A121A" />
      </mesh>
    </group>
  );
}

function FeminineField({ active }: { active: boolean }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={0.9} color="#F5E0A3" />
      <pointLight position={[-2, 1, 2]} intensity={1.1} color="#E8829C" />
      <pointLight position={[1.5, -1, 1]} intensity={0.6} color="#F4C2C2" />

      <Float speed={active ? 1.4 : 0.2} floatIntensity={0.5} rotationIntensity={0.15}>
        <Heart3D position={[-1.3, 0.7, -0.3]} scale={0.7} phase={0.2} />
        <Heart3D position={[1.4, -0.4, -0.5]} scale={0.45} phase={1.4} color="#F4C2C2" />
        <Heart3D position={[0.2, 1.1, -0.8]} scale={0.35} phase={2.1} color="#D4AF37" />
      </Float>

      <Pearl position={[-0.6, -0.9, 0]} scale={0.9} phase={0.5} />
      <Pearl position={[0.9, 0.5, -0.4]} scale={0.65} phase={1.2} color="#ffe8ef" />
      <Pearl position={[-1.6, 0.1, -0.6]} scale={0.5} phase={2.0} color="#F5E0A3" />
      <Pearl position={[1.7, 0.9, -0.2]} scale={0.4} phase={0.8} />
      <Pearl position={[0.3, -1.2, -0.3]} scale={0.55} phase={1.7} color="#f8d7e0" />

      <Ribbon position={[0.9, 0.9, 0.1]} phase={0.3} />
      <Ribbon position={[-1.1, -0.5, 0]} phase={1.6} />

      <Butterfly position={[-0.4, 0.2, 0.4]} phase={0.4} />
      <Butterfly position={[1.0, -0.2, 0.2]} phase={1.8} color="#E8829C" />
      <Butterfly position={[-1.5, 0.8, -0.1]} phase={2.5} color="#F5E0A3" />

      <Sparkles
        count={60}
        scale={[8, 5, 4]}
        size={2}
        speed={0.4}
        opacity={0.65}
        color="#F4C2C2"
      />
      <Sparkles
        count={36}
        scale={[7, 4, 3]}
        size={1.8}
        speed={0.28}
        opacity={0.5}
        color="#F5E0A3"
      />
    </>
  );
}

export function FeminineScene3D({ active = true }: { active?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 4.4], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        frameloop={active ? "always" : "demand"}
      >
        <fog attach="fog" args={["#12080c", 4.8, 9.5]} />
        <FeminineField active={active} />
      </Canvas>
    </div>
  );
}
