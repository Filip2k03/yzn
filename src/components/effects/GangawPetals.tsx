"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  sway: number;
  phase: number;
};

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  const s = p.size;

  // White petal lobes
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 2);
    ctx.beginPath();
    ctx.ellipse(0, -s * 0.35, s * 0.22, s * 0.42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Golden stamens
  ctx.strokeStyle = "rgba(212,175,55,0.95)";
  ctx.fillStyle = "#F5E0A3";
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * s * 0.28, Math.sin(a) * s * 0.28);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(Math.cos(a) * s * 0.28, Math.sin(a) * s * 0.28, 1.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.08, 0, Math.PI * 2);
  ctx.fillStyle = "#D4AF37";
  ctx.fill();
  ctx.restore();
}

export function GangawPetals({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const petals: Petal[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (fromTop = true) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      petals.push({
        x: Math.random() * w,
        y: fromTop ? -20 - Math.random() * 40 : Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: 0.35 + Math.random() * 0.55,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.02,
        size: 14 + Math.random() * 18,
        sway: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      });
    };

    resize();
    for (let i = 0; i < 18; i++) spawn(false);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    let last = performance.now();
    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(32, now - last) / 16.67;
      last = now;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      if (petals.length < 26 && Math.random() > 0.92) spawn(true);

      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.phase += 0.02 * dt;
        p.x += (p.vx + Math.sin(p.phase) * p.sway) * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        drawPetal(ctx, p);
        if (p.y > h + 40 || p.x < -40 || p.x > w + 40) {
          petals.splice(i, 1);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden
    />
  );
}
