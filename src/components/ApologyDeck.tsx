"use client";

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import gsap from "gsap";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
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
const SWIPE_DISTANCE = 0.18; // fraction of width
const SWIPE_VELOCITY = 450;

const SPRING = { type: "spring" as const, stiffness: 320, damping: 36, mass: 0.78 };
const SNAP_SPRING = { type: "spring" as const, stiffness: 380, damping: 40, mass: 0.7 };

function SlidePanel({
  children,
  index,
  x,
  width,
  active,
}: {
  children: ReactNode;
  index: number;
  x: MotionValue<number>;
  width: number;
  active: boolean;
}) {
  const offset = useTransform(x, (latest) => {
    if (!width) return 0;
    return (latest + index * width) / width;
  });

  const scale = useTransform(offset, [-1, 0, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(offset, [-1, -0.25, 0, 0.25, 1], [0.45, 0.88, 1, 0.88, 0.45]);
  const rotateY = useTransform(offset, [-1, 0, 1], [12, 0, -12]);
  const y = useTransform(offset, [-1, 0, 1], [18, 0, 18]);

  return (
    <motion.section
      className="relative h-full w-screen shrink-0 overflow-hidden will-change-transform"
      aria-hidden={!active}
      style={{
        scale,
        opacity,
        rotateY,
        y,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.section>
  );
}

export function ApologyDeck() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);
  const indexRef = useRef(0);
  const roared = useRef(false);
  const lettered = useRef(false);
  const chimed = useRef(false);
  const x = useMotionValue(0);
  const [viewportW, setViewportW] = useState(390);
  const widthRef = useRef(390);
  const flashRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      widthRef.current = w;
      setViewportW(w);
      x.set(-indexRef.current * w);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [x]);

  const playTransitionFx = useCallback((dir: number) => {
    if (flashRef.current) {
      gsap.fromTo(
        flashRef.current,
        { opacity: 0.4, xPercent: dir > 0 ? -8 : 8 },
        { opacity: 0, xPercent: 0, duration: 0.55, ease: "power2.out" },
      );
    }
    if (veilRef.current) {
      gsap.fromTo(
        veilRef.current,
        { opacity: 0.22, scale: 1.02 },
        { opacity: 0, scale: 1, duration: 0.65, ease: "power3.out" },
      );
    }
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, next));
      const prev = indexRef.current;
      const dir = clamped === prev ? 0 : clamped > prev ? 1 : -1;

      if (dir !== 0) {
        setDirection(dir);
        playTransitionFx(dir);
        setHintVisible(false);
      }

      setIndex(clamped);
      void animate(x, -clamped * widthRef.current, SPRING);

      if (clamped === 1 && !roared.current) {
        roared.current = true;
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
    [x, playTransitionFx],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        unlockAudio();
        goTo(indexRef.current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(indexRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  const onDragStart = () => {
    dragging.current = true;
    setHintVisible(false);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    dragging.current = false;
    const w = widthRef.current || 1;
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const distanceOk = Math.abs(offset) > w * SWIPE_DISTANCE;
    const velocityOk = Math.abs(velocity) > SWIPE_VELOCITY;

    if ((offset < 0 && (distanceOk || velocityOk)) || velocity < -SWIPE_VELOCITY) {
      goTo(indexRef.current + 1);
    } else if ((offset > 0 && (distanceOk || velocityOk)) || velocity > SWIPE_VELOCITY) {
      goTo(indexRef.current - 1);
    } else {
      void animate(x, -indexRef.current * widthRef.current, SNAP_SPRING);
    }
  };

  const progress = ((index + 1) / TOTAL) * 100;

  const acts = [
    <Act1Gate key="1" active={index === 0} />,
    <Act2Leopard key="2" active={index === 1} />,
    <Act3Confession key="3" active={index === 2} />,
    <Act4Gangaw key="4" active={index === 3} />,
    <Act5Treaty key="5" active={index === 4} />,
  ];

  return (
    <div
      className="film-grain relative h-dvh w-screen overflow-hidden bg-obsidian text-gold-soft"
      onPointerDown={() => unlockAudio()}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(88,40,58,0.45),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(232,130,156,0.12),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(212,175,55,0.08),transparent_35%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cellipse cx='18' cy='22' rx='7' ry='4.5' fill='none' stroke='%23D4AF37' stroke-width='1.2'/%3E%3Cellipse cx='18' cy='22' rx='4' ry='7' fill='none' stroke='%23F5E0A3' stroke-width='1'/%3E%3Ccircle cx='18' cy='22' r='1.6'/%3E%3Cellipse cx='52' cy='48' rx='8' ry='5' fill='none' stroke='%23D4AF37' stroke-width='1.2'/%3E%3Cellipse cx='52' cy='48' rx='4.5' ry='8' fill='none' stroke='%23F5E0A3' stroke-width='1'/%3E%3Ccircle cx='52' cy='48' r='1.8'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* swipe transition flashes */}
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-r from-blush/30 via-pearl/15 to-gold/25 opacity-0"
      />
      <div
        ref={veilRef}
        className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,rgba(244,194,194,0.2),transparent_60%)] opacity-0"
      />

      {/* top progress silk */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 h-[2px] bg-blush/10">
        <motion.div
          className="h-full bg-gradient-to-r from-blush via-gold to-rose shadow-[0_0_12px_rgba(232,130,156,0.65)]"
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <StatusBar />
        <div
          className="relative min-h-0 flex-1 touch-none"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            className="flex h-full cursor-grab active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragConstraints={{
              left: -(TOTAL - 1) * viewportW,
              right: 0,
            }}
            dragElastic={0.18}
            dragTransition={{ bounceStiffness: 280, bounceDamping: 28 }}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            {acts.map((act, i) => (
              <SlidePanel
                key={i}
                index={i}
                x={x}
                width={viewportW}
                active={index === i}
              >
                <motion.div
                  className="h-full w-full"
                  animate={
                    index === i
                      ? {
                          y: 0,
                          opacity: 1,
                          scale: 1,
                        }
                      : {
                          y: direction >= 0 ? 8 : -8,
                          opacity: 0.92,
                          scale: 0.985,
                        }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 28,
                    delay: index === i ? 0.05 : 0,
                  }}
                >
                  {act}
                </motion.div>
              </SlidePanel>
            ))}
          </motion.div>

          {/* first-screen swipe coach */}
          {hintVisible && index === 0 && (
            <motion.div
              className="pointer-events-none absolute bottom-20 left-1/2 z-20 -translate-x-1/2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.1 }}
            >
              <motion.div
                className="flex items-center gap-2 rounded-full border border-blush/30 bg-obsidian/70 px-4 py-2 font-mono text-[10px] tracking-[0.22em] text-blush-soft backdrop-blur-xl"
                animate={{ x: [0, 14, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <span>SWIPE</span>
                <span className="text-gold">→</span>
                <span className="text-blush">♥</span>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      <Pagination total={TOTAL} index={index} onSelect={goTo} />
    </div>
  );
}
