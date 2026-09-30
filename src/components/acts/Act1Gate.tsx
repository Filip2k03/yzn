"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { NurseCrest } from "../NurseCrest";
import { FloatingHearts, SoftOrbs } from "../effects/FloatingHearts";

const FeminineScene3D = dynamic(
  () =>
    import("../effects/FeminineScene3D").then((m) => m.FeminineScene3D),
  { ssr: false },
);

gsap.registerPlugin(useGSAP);

export function Act1Gate({ active = true }: { active?: boolean }) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduce || !root.current) return;
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q("[data-reveal]"),
        { y: 32, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.11,
          ease: "power3.out",
        },
      );
    },
    { scope: root, dependencies: [reduce] },
  );

  return (
    <div
      ref={root}
      className="relative flex h-full flex-col justify-center px-5 py-8 sm:px-10"
    >
      <FeminineScene3D active={active} />
      <SoftOrbs />
      <FloatingHearts count={10} tone="blush" className="opacity-60" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(16,8,12,0.55)_78%)]" />

      <div className="relative z-10 mx-auto w-full max-w-lg">
        <motion.div
          className="absolute -inset-4 rounded-[1.5rem] bg-gradient-to-br from-blush/35 via-rose/20 to-gold/20 blur-2xl"
          animate={
            reduce
              ? undefined
              : { opacity: [0.45, 0.9, 0.45], scale: [0.98, 1.03, 0.98] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -inset-[1px] rounded-2xl bg-[conic-gradient(from_120deg,#E8829C,#F5E0A3,#F4C2C2,#D4AF37,#E8829C)] opacity-80" />

        <div className="feminine-card relative overflow-hidden rounded-2xl backdrop-blur-2xl">
          <div className="absolute left-4 top-4 flex gap-1.5">
            <span className="pearl-dot" />
            <span className="pearl-dot opacity-80" />
            <span className="pearl-dot opacity-60" />
          </div>
          <div className="absolute right-4 top-4 text-blush/70">🎀</div>

          <div className="relative p-6 sm:p-8">
            <div data-reveal className="mb-6 flex items-center gap-3 pt-2">
              <NurseCrest className="h-14 w-14" />
              <div>
                <p className="font-display text-[11px] tracking-[0.24em] text-gold-soft sm:text-xs">
                  YUZANA, RN
                </p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-blush">
                  SILK • PEARLS • NURSE FIRST
                </p>
              </div>
            </div>

            <p
              data-reveal
              className="font-mono text-[10px] tracking-[0.28em] text-rose sm:text-xs"
            >
              FOR MY FAVORITE GIRL
            </p>

            <h1
              data-reveal
              className="mt-3 font-display text-[1.75rem] leading-tight tracking-[0.08em] text-gold-soft sm:text-4xl"
            >
              Her Royal Excellency
              <span className="mt-1 block bg-gradient-to-r from-blush-soft via-gold to-blush bg-clip-text text-transparent">
                Yuzana
              </span>
            </h1>

            <div
              data-reveal
              className="mt-6 grid grid-cols-3 gap-2 border-t border-blush/25 pt-5"
            >
              {[
                { label: "Age", value: "22" },
                { label: "Height", value: "5′ 3″" },
                { label: "Title", value: "Nurse" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-blush/25 bg-obsidian/40 px-2 py-3 text-center backdrop-blur-xl"
                >
                  <p className="font-mono text-[9px] tracking-wider text-blush/60">
                    {item.label}
                  </p>
                  <p className="mt-1 font-display text-sm text-pearl">{item.value}</p>
                </div>
              ))}
            </div>

            <p
              data-reveal
              className="mt-5 font-sans text-sm leading-relaxed text-blush-soft/95"
            >
              Soft, pretty, and made just for you — my apology wrapped in silk,
              pearls, and love.
            </p>

            <div
              data-reveal
              className="mt-7 flex items-center justify-between gap-3 border-t border-blush/20 pt-5"
            >
              <p className="font-sans text-xs text-gold-soft/75 sm:text-sm">
                Swipe gently, princess →
              </p>
              <motion.span
                className="inline-flex items-center gap-1 font-display text-xl text-blush"
                animate={
                  reduce ? undefined : { x: [0, 8, 0], opacity: [0.55, 1, 0.55] }
                }
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                ♥ →
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
