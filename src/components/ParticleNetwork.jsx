import { useEffect, useRef } from "react";

/**
 * Lightweight particle-network canvas: small gold/white dots drifting
 * slowly, with thin connecting lines between nearby dots.
 *
 * Performance guards:
 * - capped particle count, DPR clamped to 2
 * - starts on idle, not during initial paint
 * - pauses when the tab is hidden or the canvas leaves the viewport
 * - skipped entirely for prefers-reduced-motion
 */
export default function ParticleNetwork({ count = 55, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const LINK_DIST = 130;

    let raf = 0;
    let particles = [];
    let started = false;
    let tabVisible = !document.hidden;
    let onScreen = true;

    const size = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const p of particles) {
        p.x = Math.min(p.x, w);
        p.y = Math.min(p.y, h);
      }
    };

    const seed = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: 1 + Math.random() * 1.5,
        gold: Math.random() < 0.45,
      }));
    };

    const step = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = 0.13 * (1 - Math.sqrt(d2) / LINK_DIST);
            ctx.strokeStyle = `rgba(212, 160, 23, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = p.gold ? "rgba(226, 179, 56, 0.55)" : "rgba(255, 255, 255, 0.38)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    const syncRunning = () => {
      const shouldRun = started && tabVisible && onScreen;
      if (shouldRun && !raf) {
        raf = requestAnimationFrame(step);
      } else if (!shouldRun && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onVisibility = () => {
      tabVisible = !document.hidden;
      syncRunning();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        syncRunning();
      },
      { threshold: 0 }
    );

    const start = () => {
      size();
      seed();
      started = true;
      syncRunning();
    };

    // Lazy-start once the browser is idle so it never competes with first paint.
    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(start, { timeout: 1500 })
        : window.setTimeout(start, 400);

    window.addEventListener("resize", size);
    document.addEventListener("visibilitychange", onVisibility);
    observer.observe(canvas);

    return () => {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, [count]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
