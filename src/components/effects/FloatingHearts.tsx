"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type Props = {
  count?: number;
  className?: string;
  tone?: "gold" | "blush" | "mix";
};

export function FloatingHearts({
  count = 12,
  className = "",
  tone = "mix",
}: Props) {
  const reduce = useReducedMotion();
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: ((i * 47) % 90) + 5,
        size: 8 + (i % 5) * 3,
        delay: (i % 8) * 0.45,
        duration: 7 + (i % 5) * 1.4,
        drift: ((i % 3) - 1) * 28,
        color:
          tone === "gold"
            ? "#D4AF37"
            : tone === "blush"
              ? "#E8829C"
              : i % 2 === 0
                ? "#E8829C"
                : "#F5E0A3",
      })),
    [count, tone],
  );

  if (reduce) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute bottom-[-10%]"
          style={{ left: `${h.left}%`, width: h.size, height: h.size }}
          initial={{ opacity: 0, y: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 0.75, 0.75, 0],
            y: ["0vh", "-110vh"],
            x: [0, h.drift, h.drift * -0.4],
            scale: [0.4, 1, 0.9],
            rotate: [0, 12, -8],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-[0_0_6px_rgba(232,130,156,0.5)]">
            <path
              fill={h.color}
              d="M12 21s-6.7-4.35-9.33-8.1C.4 9.7 1.3 5.9 4.5 4.6c2-.8 4.1-.1 5.4 1.6C11.2 4.5 13.3 3.8 15.3 4.6c3.2 1.3 4.1 5.1 1.83 8.3C18.7 16.65 12 21 12 21z"
            />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}

export function SoftOrbs() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-20 top-1/4 h-56 w-56 rounded-full bg-blush/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
        animate={{ x: [0, -35, 0], y: [0, 25, 0], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-blush-soft/10 blur-3xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
