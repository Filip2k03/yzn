"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NurseCrest } from "./NurseCrest";

export function StatusBar() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <header className="relative z-20 border-b border-gold/20 bg-obsidian/80 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <NurseCrest className="h-11 w-11 shrink-0 sm:h-12 sm:w-12" />
          <div className="min-w-0">
            <p className="truncate font-display text-[11px] tracking-[0.22em] text-gold-soft sm:text-xs">
              YUZANA, RN // VIP CLEARANCE
            </p>
            <p className="mt-0.5 font-mono text-[9px] tracking-wider text-blush/80">
              SILK VIP • NURSE PRIORITY
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2.5 font-mono text-[10px] text-gold-soft/80 sm:text-[11px]">
          <span className="tabular-nums min-w-[3.2rem]">
            {now
              ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "--:--"}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-blush/35 bg-blush/10 px-2 py-0.5 text-blush">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-blush shadow-[0_0_6px_#E8829C]"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            ON DUTY
          </span>
        </div>
      </div>
    </header>
  );
}
