"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { SoftOrbs } from "../effects/FloatingHearts";
import { LeopardSplash } from "../effects/LeopardSplash";

const LeopardScene3D = dynamic(
  () =>
    import("../effects/LeopardScene3D").then((m) => m.LeopardScene3D),
  { ssr: false },
);

export function Act2Leopard({ active }: { active: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex h-full flex-col justify-end px-5 pb-24 pt-8 sm:justify-center sm:px-10 sm:pb-8">
      <SoftOrbs />
      <LeopardScene3D active={active} />
      <LeopardSplash active={active} />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(16,8,12,0.55)_78%)]" />

      <motion.div
        key={active ? "on" : "off"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-lg text-center"
      >
        <motion.p
          className="font-mono text-[10px] tracking-[0.3em] text-blush sm:text-xs"
          animate={
            reduce ? undefined : { letterSpacing: ["0.3em", "0.38em", "0.3em"] }
          }
          transition={{ duration: 3, repeat: Infinity }}
        >
          3D LEOPARD ROAR
        </motion.p>

        <h2 className="mt-3 font-display text-3xl tracking-[0.1em] text-gold-soft sm:text-5xl">
          <span className="block">You were hurt.</span>
          <span className="mt-2 block text-blush">I felt that roar.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-md font-sans text-sm leading-relaxed text-blush-soft/90 sm:text-base">
          You save lives for a living. I got lost in work and left you hanging.
          Your feelings mattered more than anything on my screen — and I am
          here now, fully.
        </p>
      </motion.div>
    </div>
  );
}
