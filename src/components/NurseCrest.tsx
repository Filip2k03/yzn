"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

export function NurseCrest({ className = "h-10 w-10" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const goldId = `goldCap-${uid}`;
  const blushId = `blushCross-${uid}`;
  const sheenId = `sheen-${uid}`;

  return (
    <motion.div
      className={`relative inline-flex ${className}`}
      animate={
        reduce
          ? undefined
          : {
              filter: [
                "drop-shadow(0 0 8px rgba(212,175,55,0.35))",
                "drop-shadow(0 0 18px rgba(212,175,55,0.7))",
                "drop-shadow(0 0 8px rgba(212,175,55,0.35))",
              ],
              y: [0, -1.5, 0],
            }
      }
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      {!reduce && (
        <motion.span
          className="pointer-events-none absolute -inset-2 rounded-full bg-gold/20 blur-md"
          animate={{ opacity: [0.25, 0.65, 0.25], scale: [0.92, 1.08, 0.92] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <svg
        viewBox="0 0 64 64"
        className="relative h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={goldId} x1="8" y1="8" x2="56" y2="52">
            <stop stopColor="#F5E0A3" />
            <stop offset="0.45" stopColor="#D4AF37" />
            <stop offset="1" stopColor="#996515" />
          </linearGradient>
          <linearGradient id={blushId} x1="28" y1="28" x2="36" y2="44">
            <stop stopColor="#F4C2C2" />
            <stop offset="1" stopColor="#E8829C" />
          </linearGradient>
          <linearGradient id={sheenId} x1="0" y1="0" x2="64" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M10 28c0-10 10-18 22-18s22 8 22 18v4H10v-4Z"
          fill={`url(#${goldId})`}
          stroke="#F5E0A3"
          strokeWidth="1.2"
        />
        <path
          d="M6 34c4 6 14 10 26 10s22-4 26-10H6Z"
          fill="#996515"
          stroke="#D4AF37"
          strokeWidth="1"
        />
        <rect x="29" y="24" width="6" height="16" rx="1.2" fill={`url(#${blushId})`} />
        <rect x="24" y="29" width="16" height="6" rx="1.2" fill={`url(#${blushId})`} />
        <path
          d="M18 22l1.6 3.4L23 27l-3.4 1.6L18 32l-1.6-3.4L13 27l3.4-1.6L18 22Z"
          fill="#F5E0A3"
        />
        <path
          d="M46 20l1.4 2.8L50 24.2l-2.6 1.3L46 28.2l-1.4-2.7L42 24.2l2.6-1.4L46 20Z"
          fill="#F5E0A3"
        />
        <circle cx="32" cy="18" r="1.6" fill="#fff" opacity="0.9" />
        {!reduce && (
          <motion.rect
            x="-20"
            y="12"
            width="18"
            height="28"
            fill={`url(#${sheenId})`}
            animate={{ x: [-24, 70] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
            style={{ mixBlendMode: "soft-light" }}
            opacity={0.5}
          />
        )}
      </svg>
    </motion.div>
  );
}
