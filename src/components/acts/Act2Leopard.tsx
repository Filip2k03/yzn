"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LeopardSplash } from "../effects/LeopardSplash";
import { SoftOrbs } from "../effects/FloatingHearts";

export function Act2Leopard({ active }: { active: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex h-full flex-col justify-center px-5 py-8 sm:px-10">
      <SoftOrbs />
      <LeopardSplash active={active} />
      <motion.div
        key={active ? "on" : "off"}
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-lg text-center"
      >
        <motion.p
          className="font-mono text-[10px] tracking-[0.3em] text-blush sm:text-xs"
          animate={reduce ? undefined : { letterSpacing: ["0.3em", "0.38em", "0.3em"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          THE STORM PASSED THROUGH US
        </motion.p>

        <h2 className="mt-4 font-display text-3xl tracking-[0.1em] text-gold-soft sm:text-5xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="block"
          >
            You were hurt.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="mt-2 block text-blush"
          >
            I felt that.
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-8 max-w-md font-sans text-sm leading-relaxed text-blush-soft/90 sm:text-base"
        >
          You save lives for a living. I got lost in work and left you hanging.
          Your feelings mattered more than anything on my screen — and I am
          here now, fully.
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center gap-3 text-blush/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="text-lg"
              animate={reduce ? undefined : { y: [0, -6, 0], scale: [1, 1.15, 1] }}
              transition={{
                duration: 1.4,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ♥
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
