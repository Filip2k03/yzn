"use client";

import confetti from "canvas-confetti";

export function fireTreatyConfetti() {
  const colors = ["#D4AF37", "#F5E0A3", "#996515", "#F4C2C2", "#E8829C", "#ffffff"];

  confetti({
    particleCount: 70,
    spread: 78,
    origin: { y: 0.62 },
    colors,
    scalar: 1.05,
    ticks: 220,
  });

  // Heart-shaped burst (runtime supports "heart"; typings may lag)
  confetti({
    particleCount: 28,
    spread: 70,
    origin: { y: 0.58 },
    colors: ["#E8829C", "#F4C2C2", "#D4AF37"],
    shapes: ["heart" as unknown as confetti.Shape],
    scalar: 1.3,
    ticks: 260,
  });

  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
      shapes: ["heart" as unknown as confetti.Shape, "circle"],
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
      shapes: ["heart" as unknown as confetti.Shape, "circle"],
    });
  }, 180);
}
