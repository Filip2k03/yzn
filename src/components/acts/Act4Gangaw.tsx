"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { SoftOrbs } from "../effects/FloatingHearts";

const GangawScene3D = dynamic(
  () =>
    import("../effects/GangawScene3D").then((m) => m.GangawScene3D),
  { ssr: false },
);

gsap.registerPlugin(useGSAP);

export function Act4Gangaw({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const badge = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const body = useRef<HTMLParagraphElement>(null);
  const label = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!active || reduce || !root.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        badge.current,
        { scale: 0.6, opacity: 0, rotate: -12 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.85 },
      )
        .fromTo(
          label.current,
          { y: 24, opacity: 0, letterSpacing: "0.5em" },
          { y: 0, opacity: 1, letterSpacing: "0.28em", duration: 0.7 },
          "-=0.45",
        )
        .fromTo(
          title.current,
          { y: 40, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9 },
          "-=0.35",
        )
        .fromTo(
          body.current,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          "-=0.4",
        );

      gsap.to(badge.current, {
        boxShadow:
          "0 0 12px rgba(245,224,163,0.2), 0 0 36px rgba(232,130,156,0.4)",
        repeat: -1,
        yoyo: true,
        duration: 2.4,
        ease: "sine.inOut",
      });

      return () => {
        tl.kill();
      };
    },
    { dependencies: [active, reduce], scope: root },
  );

  return (
    <div
      ref={root}
      className="relative flex h-full flex-col justify-center px-5 py-8 sm:px-10"
    >
      <SoftOrbs />
      <GangawScene3D active={active} />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(9,9,11,0.55)_75%)]" />

      <div className="relative z-10 mx-auto w-full max-w-lg text-center">
        <div
          ref={badge}
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-velvet/70 backdrop-blur-xl"
        >
          <span className="text-2xl text-gold-soft">✿</span>
        </div>

        <p
          ref={label}
          className="font-mono text-[10px] tracking-[0.28em] text-gold sm:text-xs"
        >
          GANGAW GARDEN • SILK & BLOOM
        </p>
        <h2
          ref={title}
          className="mt-4 font-display text-2xl leading-snug tracking-[0.08em] text-gold-soft sm:text-4xl"
        >
          For the prettiest nurse
          <span className="mt-1 block bg-gradient-to-r from-blush-soft via-rose to-gold bg-clip-text text-transparent">
            on duty
          </span>
        </h2>
        <p
          ref={body}
          className="mx-auto mt-7 max-w-md font-sans text-sm leading-relaxed text-blush-soft/90 sm:text-base"
        >
          Butterflies, ribbons, and Gangaw petals blow through the wind — soft,
          feminine, and made for you. Rare. Resilient. Impossible to replace.
        </p>
      </div>
    </div>
  );
}
