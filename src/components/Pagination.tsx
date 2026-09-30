"use client";

import { motion } from "framer-motion";

type Props = {
  total: number;
  index: number;
  onSelect: (i: number) => void;
};

const labels = ["Gate", "Storm", "Letter", "Bloom", "Peace"];

export function Pagination({ total, index, onSelect }: Props) {
  return (
    <nav
      className="pointer-events-auto absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-blush/30 bg-obsidian/75 px-3 py-2 shadow-[0_0_30px_rgba(232,130,156,0.2)] backdrop-blur-2xl sm:gap-2 sm:px-3.5 sm:py-2.5"
      aria-label="Act navigation"
    >
      {Array.from({ length: total }).map((_, i) => {
        const active = i === index;
        return (
          <button
            key={i}
            type="button"
            aria-label={labels[i] ?? `Go to act ${i + 1}`}
            aria-current={active ? "true" : undefined}
            onClick={() => onSelect(i)}
            onPointerDown={(e) => e.stopPropagation()}
            className="relative flex h-5 min-w-[1.75rem] items-center justify-center px-0.5"
          >
            {active ? (
              <motion.span
                layoutId="page-pill"
                className="absolute inset-y-0.5 left-0 right-0 rounded-full bg-gradient-to-r from-blush via-gold to-rose shadow-[0_0_16px_rgba(232,130,156,0.6)]"
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              />
            ) : (
              <span className="h-1.5 w-3.5 rounded-full bg-blush/30 transition hover:bg-blush/55" />
            )}
            {active && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 px-1.5 font-mono text-[8px] tracking-wider text-obsidian sm:text-[9px]"
              >
                {labels[i]}
              </motion.span>
            )}
          </button>
        );
      })}
      <motion.span
        className="ml-1 text-[10px] text-blush"
        animate={{ scale: [1, 1.25, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-hidden
      >
        ♥
      </motion.span>
    </nav>
  );
}
