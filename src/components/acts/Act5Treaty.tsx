"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { fireTreatyConfetti } from "../effects/confetti";
import { FloatingHearts, SoftOrbs } from "../effects/FloatingHearts";
import { playTreatyChime } from "@/lib/audio";
import { NurseCrest } from "../NurseCrest";

const FeminineScene3D = dynamic(
  () =>
    import("../effects/FeminineScene3D").then((m) => m.FeminineScene3D),
  { ssr: false },
);

const STORAGE_KEY = "yuzana-treaty-signed";

export function Act5Treaty({ active = true }: { active?: boolean }) {
  const reduce = useReducedMotion();
  const [signed, setSigned] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setSigned(true);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const sign = () => {
    if (signed) return;
    setSigned(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    playTreatyChime();
    fireTreatyConfetti();
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.([30, 40, 30]);
    }
  };

  return (
    <div className="relative flex h-full flex-col justify-center px-4 py-6 sm:px-8">
      <FeminineScene3D active={active} />
      <SoftOrbs />
      {(signed || active) && (
        <FloatingHearts count={signed ? 16 : 8} tone="blush" className="opacity-70" />
      )}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(16,8,12,0.6)_80%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-md"
      >
        <motion.div
          className="absolute -inset-4 rounded-[1.5rem] bg-gradient-to-br from-blush/35 via-rose/20 to-gold/15 blur-2xl"
          animate={
            reduce
              ? undefined
              : { opacity: [0.4, 0.9, 0.4], scale: [0.98, 1.03, 0.98] }
          }
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="feminine-card relative overflow-hidden rounded-2xl p-5 sm:p-7">
          <div className="absolute left-4 top-4 flex gap-1.5">
            <span className="pearl-dot" />
            <span className="pearl-dot opacity-75" />
            <span className="pearl-dot opacity-50" />
          </div>

          <div className="relative flex items-start justify-between gap-3 border-b border-blush/25 pb-4 pt-3">
            <div className="flex items-center gap-3">
              <NurseCrest className="h-11 w-11" />
              <div>
                <p className="font-display text-sm tracking-[0.18em] text-gold">
                  Soft Peace Treaty
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-blush">
                  FOR MY PRETTIEST NURSE
                </p>
              </div>
            </div>
            <motion.span
              className="text-blush"
              animate={reduce ? undefined : { scale: [1, 1.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              🎀
            </motion.span>
          </div>

          <dl className="relative mt-4 space-y-2.5 font-sans text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-blush/55">From</dt>
              <dd className="text-right text-gold-soft">Your loving bestie</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-blush/55">To</dt>
              <dd className="text-right text-blush">Yuzana, RN ♥</dd>
            </div>
          </dl>

          <div className="relative mt-5 rounded-xl border border-blush/25 bg-obsidian/35 p-4 backdrop-blur-xl">
            <p className="font-display text-xs tracking-[0.16em] text-gold-soft">
              Pretty promises
            </p>
            <ul className="mt-3 space-y-2.5 font-sans text-sm leading-snug text-blush-soft/95">
              {[
                "Food & boba after your shift — always on me.",
                "Reply fast. Bugs wait. You don't.",
                "No more disappearing without a word.",
                "You stay first. Forever, princess.",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="flex gap-2"
                >
                  <span className="text-blush">♥</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.button
            type="button"
            onClick={sign}
            onPointerDown={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={!hydrated}
            className="relative mt-6 w-full overflow-hidden rounded-full bg-gradient-to-r from-blush via-rose to-gold-soft px-5 py-3.5 font-display text-sm tracking-[0.14em] text-obsidian shadow-[0_0_28px_rgba(232,130,156,0.5)] transition disabled:opacity-70"
          >
            {!signed && !reduce && (
              <motion.span
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.2 }}
              />
            )}
            <span className="relative">
              {signed ? "FORGIVEN ✦ BESTIES AGAIN" : "FORGIVE ME ♥"}
            </span>
          </motion.button>

          {signed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="pointer-events-none absolute bottom-24 right-4 flex h-28 w-28 items-center justify-center rounded-full border-2 border-blush/80 bg-blush/20 p-3 text-center shadow-[0_0_30px_rgba(232,130,156,0.45)] backdrop-blur-sm sm:bottom-28 sm:right-6"
            >
              <p className="font-display text-[10px] leading-tight tracking-wider text-blush">
                SEALED WITH LOVE
                <span className="mt-1 block text-gold-soft">BESTIES ♥</span>
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
