"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

function Rosette({ x, y, s, delay }: { x: number; y: number; s: number; delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, width: s, height: s }}
      initial={{ opacity: 0, scale: 0.2, rotate: -20 }}
      animate={{ opacity: [0, 0.9, 0.55], scale: [0.2, 1.15, 1], rotate: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg viewBox="0 0 40 40" className="h-full w-full drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
        <ellipse cx="20" cy="20" rx="16" ry="10" fill="none" stroke="#D4AF37" strokeWidth="1.4" opacity="0.85" />
        <ellipse cx="20" cy="20" rx="10" ry="16" fill="none" stroke="#F5E0A3" strokeWidth="1.2" opacity="0.7" />
        <ellipse cx="20" cy="20" rx="7" ry="4.5" fill="#996515" opacity="0.9" />
        <circle cx="20" cy="20" r="2.2" fill="#F5E0A3" />
      </svg>
    </motion.div>
  );
}

export function LeopardSplash({ active }: { active: boolean }) {
  const spots = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        x: (i * 37 + 11) % 92,
        y: (i * 53 + 7) % 88,
        s: 18 + (i % 5) * 10,
        delay: (i % 8) * 0.04,
      })),
    [],
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        angle: (i / 40) * Math.PI * 2,
        dist: 80 + (i % 7) * 28,
        delay: 0.05 + (i % 10) * 0.02,
      })),
    [],
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(232,130,156,0.18),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(212,175,55,0.15),transparent_50%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      {spots.map((s) => (
        <Rosette key={s.id} {...s} />
      ))}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-gold"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: Math.cos(p.angle) * p.dist,
            y: Math.sin(p.angle) * p.dist,
            scale: [0, 1.4, 0.2],
          }}
          transition={{ duration: 1.1, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
