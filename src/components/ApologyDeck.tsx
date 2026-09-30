"use client";

import {
  animate,
  motion,
  useMotionValue,
  type PanInfo,
} from "framer-motion";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { Act1Gate } from "./acts/Act1Gate";
import { Act2Leopard } from "./acts/Act2Leopard";
import { Act3Confession } from "./acts/Act3Confession";
import { Act4Gangaw } from "./acts/Act4Gangaw";
import { Act5Treaty } from "./acts/Act5Treaty";
import { Pagination } from "./Pagination";
import { StatusBar } from "./StatusBar";
import {
  playGangawChime,
  playLeopardRoar,
  playTreatyChime,
  unlockAudio,
} from "@/lib/audio";

const TOTAL = 5;

/** Clean horizontal page swipe — no 3D transforms that fight the drag. */
export function ApologyDeck() {
  const [index, setIndex] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);
  const indexRef = useRef(0);
  const lettered = useRef(false);
  const chimed = useRef(false);
  const x = useMotionValue(0);
  const [viewportW, setViewportW] = useState(390);
  const widthRef = useRef(390);
  const flashRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      widthRef.current = w;
      setViewportW(w);
      x.set(-indexRef.current * w);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [x]);

  const flash = useCallback(() => {
    if (!flashRef.current) return;
    gsap.fromTo(
      flashRef.current,
      { opacity: 0.28 },
      { opacity: 0, duration: 0.45, ease: "power2.out" },
    );
  }, []);

  const goTo = useCallback(
    async (next: number) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, next));
      if (clamped === indexRef.current || isAnimating.current) return;

      isAnimating.current = true;
      flash();
      setHintVisible(false);
      setIndex(clamped);

      await animate(x, -clamped * widthRef.current, {
        type: "spring",
        stiffness: 420,
        damping: 42,
        mass: 0.65,
      });

      isAnimating.current = false;

      if (clamped === 1) {
        playLeopardRoar();
      }
      if (clamped === 2 && !lettered.current) {
        lettered.current = true;
        playTreatyChime();
      }
      if (clamped === 3 && !chimed.current) {
        chimed.current = true;
        playGangawChime();
      }
    },
    [x, flash],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        unlockAudio();
        void goTo(indexRef.current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        void goTo(indexRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const w = widthRef.current || 1;
    const { offset, velocity } = info;
    // Prefer velocity; fall back to distance (~22% of screen)
    const goNext =
      velocity.x < -500 || (offset.x < -w * 0.22 && velocity.x <= 50);
    const goPrev =
      velocity.x > 500 || (offset.x > w * 0.22 && velocity.x >= -50);

    if (goNext) {
      void goTo(indexRef.current + 1);
    } else if (goPrev) {
      void goTo(indexRef.current - 1);
    } else {
      void animate(x, -indexRef.current * widthRef.current, {
        type: "spring",
        stiffness: 500,
        damping: 45,
      });
    }
  };

  const progress = ((index + 1) / TOTAL) * 100;

  return (
    <div
      className="film-grain relative h-dvh w-screen overflow-hidden bg-obsidian text-gold-soft"
      onPointerDown={() => unlockAudio()}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(88,40,58,0.45),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(232,130,156,0.12),transparent_40%)]" />

      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-r from-blush/25 via-gold/15 to-blush/25 opacity-0"
      />

      <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 h-[2px] bg-blush/10">
        <motion.div
          className="h-full bg-gradient-to-r from-blush via-gold to-rose"
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 280, damping: 32 }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <StatusBar />
        <div className="relative min-h-0 flex-1 touch-none">
          <motion.div
            className="flex h-full cursor-grab active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragDirectionLock
            dragConstraints={{
              left: -(TOTAL - 1) * viewportW,
              right: 0,
            }}
            dragElastic={0.06}
            dragMomentum={false}
            onDragEnd={onDragEnd}
            onDragStart={() => setHintVisible(false)}
          >
            {[
              <Act1Gate key="1" active={index === 0} />,
              <Act2Leopard key="2" active={index === 1} />,
              <Act3Confession key="3" active={index === 2} />,
              <Act4Gangaw key="4" active={index === 3} />,
              <Act5Treaty key="5" active={index === 4} />,
            ].map((act, i) => (
              <section
                key={i}
                className="h-full w-screen shrink-0 overflow-hidden"
                aria-hidden={index !== i}
              >
                {act}
              </section>
            ))}
          </motion.div>

          {hintVisible && index === 0 && (
            <motion.div
              className="pointer-events-none absolute bottom-20 left-1/2 z-20 -translate-x-1/2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                className="flex items-center gap-2 rounded-full border border-blush/30 bg-obsidian/70 px-4 py-2 font-mono text-[10px] tracking-[0.22em] text-blush-soft backdrop-blur-xl"
                animate={{ x: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span>SWIPE</span>
                <span className="text-gold">→</span>
                <span className="text-blush">♥</span>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      <Pagination total={TOTAL} index={index} onSelect={(i) => void goTo(i)} />
    </div>
  );
}
