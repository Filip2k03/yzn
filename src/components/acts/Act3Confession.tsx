"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SoftOrbs } from "../effects/FloatingHearts";

gsap.registerPlugin(useGSAP);

const lines = [
  "I disappeared into work that did not matter — and left you waiting.",
  "That was wrong. You were right to feel hurt.",
  "You spend your shifts caring for people. I should have cared for you first.",
  "I am sorry. Truly. Next time your message comes before everything else.",
];

export function Act3Confession({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const seal = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!active || reduce || !root.current) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        root.current.querySelector("[data-letter]"),
        { y: 40, opacity: 0, rotate: -2 },
        { y: 0, opacity: 1, rotate: 0, duration: 0.85 },
      )
        .fromTo(
          seal.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.8)" },
          "-=0.35",
        )
        .fromTo(
          q("[data-line]"),
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.16 },
          "-=0.2",
        );

      gsap.to(seal.current, {
        rotation: 4,
        duration: 2.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      return () => tl.kill();
    },
    { dependencies: [active, reduce], scope: root },
  );

  return (
    <div
      ref={root}
      className="relative flex h-full flex-col justify-center px-5 py-8 sm:px-10"
    >
      <SoftOrbs />

      <article
        data-letter
        className={`relative mx-auto w-full max-w-lg ${reduce || !active ? "" : "opacity-0"}`}
      >
        <div className="absolute -inset-4 rounded-[1.5rem] bg-gradient-to-br from-blush/25 via-gold/10 to-transparent blur-2xl" />
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-gold via-blush to-gold-deep opacity-70" />

        <div className="relative overflow-hidden rounded-2xl border border-gold/35 bg-gradient-to-b from-[#1c1116] via-velvet to-obsidian shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,130,156,0.14),transparent_55%)]" />

          <div className="absolute right-5 top-5 z-10">
            <div
              ref={seal}
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blush via-[#c45a74] to-[#6b2034] shadow-[0_0_28px_rgba(232,130,156,0.55)] ring-2 ring-gold/55"
            >
              <span className="font-display text-sm tracking-widest text-gold-soft">
                Y
              </span>
              <span className="absolute -bottom-1 -right-1 text-xs text-gold">♥</span>
            </div>
          </div>

          <div className="relative space-y-5 p-6 sm:p-8">
            <header>
              <p
                data-line
                className="font-mono text-[10px] tracking-[0.28em] text-gold sm:text-xs"
              >
                A LETTER FROM THE HEART
              </p>
              <h2
                data-line
                className="mt-3 font-display text-2xl tracking-[0.06em] text-gold-soft sm:text-3xl"
              >
                My dearest Yuzana
              </h2>
            </header>

            <div className="space-y-3.5 border-t border-gold/20 pt-5">
              {lines.map((line, i) => (
                <p
                  key={line}
                  data-line
                  className={`font-sans text-sm leading-relaxed sm:text-[15px] ${
                    i === lines.length - 1
                      ? "text-gold-soft"
                      : "text-blush-soft/95"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            <footer data-line className="border-t border-gold/15 pt-5">
              <p className="font-display text-sm tracking-[0.12em] text-gold">
                Forever yours ♥
              </p>
              <p className="mt-1 font-sans text-xs text-blush/70">
                with all the love I should have shown sooner
              </p>
            </footer>
          </div>
        </div>
      </article>

      {/* keep motion import used for reduced-motion path stability */}
      {reduce && (
        <motion.div className="sr-only" aria-hidden>
          static
        </motion.div>
      )}
    </div>
  );
}
