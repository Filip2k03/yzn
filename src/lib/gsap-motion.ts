"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";
import { useEffect } from "react";

gsap.registerPlugin(useGSAP);

export function useActEnter(
  active: boolean,
  root: RefObject<HTMLElement | null>,
) {
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (!active || reduce || !root.current) return;
      const el = root.current;
      gsap.fromTo(
        el,
        { opacity: 0.55, filter: "blur(6px)", scale: 0.985 },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
        },
      );
    },
    { dependencies: [active, reduce] },
  );
}

export function useHeartPulse(
  ref: RefObject<HTMLElement | null>,
  enabled = true,
) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduce || !ref.current) return;
    const tween = gsap.to(ref.current, {
      scale: 1.18,
      duration: 1.1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    return () => {
      tween.kill();
    };
  }, [enabled, reduce, ref]);
}
