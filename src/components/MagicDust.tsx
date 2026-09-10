"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hue: number;
  sparkle: boolean;
};

const EMERALD_HUES = [145, 155, 160, 170, 175];

export default function MagicDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let lastX = 0;
    let lastY = 0;
    let hasMoved = false;
    let spawnCarry = 0;

    const particles: Particle[] = [];
    const MAX_PARTICLES = isCoarsePointer ? 80 : 120;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnParticle = (x: number, y: number, speed: number) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();

      const angle = Math.random() * Math.PI * 2;
      const burst = 0.3 + Math.random() * 0.9;
      const sparkle = Math.random() > 0.72;

      particles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * burst * (0.4 + speed * 0.08),
        vy: Math.sin(angle) * burst * (0.4 + speed * 0.08) - 0.35,
        size: sparkle
          ? 1.2 + Math.random() * 2.2
          : 0.8 + Math.random() * 1.8,
        life: 1,
        maxLife: 0.45 + Math.random() * 0.55,
        hue: EMERALD_HUES[Math.floor(Math.random() * EMERALD_HUES.length)],
        sparkle,
      });
    };

    const trailTo = (x: number, y: number) => {
      if (!hasMoved) {
        lastX = x;
        lastY = y;
        hasMoved = true;
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      const distance = Math.hypot(dx, dy);
      const speed = Math.min(distance, 40);

      // Spawn along the path so fast moves leave a trail, not gaps
      spawnCarry += distance * 0.55;
      const steps = Math.floor(spawnCarry);
      if (steps > 0) {
        spawnCarry -= steps;
        const count = Math.min(steps, 6);
        for (let i = 0; i < count; i++) {
          const t = (i + 1) / (count + 1);
          spawnParticle(lastX + dx * t, lastY + dy * t, speed);
        }
      }

      lastX = x;
      lastY = y;
    };

    const onPointerMove = (e: PointerEvent) => {
      trailTo(e.clientX, e.clientY);
    };

    const onPointerDown = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      hasMoved = true;
      for (let i = 0; i < 4; i++) spawnParticle(e.clientX, e.clientY, 8);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      trailTo(touch.clientX, touch.clientY);
    };

    const drawStar = (
      x: number,
      y: number,
      size: number,
      alpha: number,
      hue: number,
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = `hsla(${hue}, 90%, 72%, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.stroke();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.016 / p.maxLife;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy -= 0.012; // gentle upward drift

        const alpha = Math.max(0, p.life);
        const radius = p.size * (0.5 + p.life * 0.5);

        if (p.sparkle) {
          drawStar(p.x, p.y, radius * 2.2, alpha * 0.9, p.hue);
        }

        // Soft glow
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          radius * 4,
        );
        gradient.addColorStop(0, `hsla(${p.hue}, 95%, 70%, ${alpha * 0.85})`);
        gradient.addColorStop(0.4, `hsla(${p.hue}, 90%, 55%, ${alpha * 0.35})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 45%, 0)`);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 88%, ${alpha})`;
        ctx.arc(p.x, p.y, Math.max(0.4, radius * 0.45), 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  );
}
