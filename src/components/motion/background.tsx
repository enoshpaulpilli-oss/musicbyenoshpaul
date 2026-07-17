"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

/** InteractiveBackground — restrained cinematic ambience.
 *  Two very slow low-saturation aurora fields + a reactive spotlight tied to
 *  the cursor. Deliberately minimal — no floating glyphs, no equalizer.
 *  All motion is GPU-cheap (transform/opacity only). */
export function InteractiveBackground({ notes: _notes = false }: { notes?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 50, ty = 40, cx = 50, cy = 40;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", `${cx}%`);
      el.style.setProperty("--my", `${cy}%`);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Deep base */}
      <div className="absolute inset-0 bg-background" />

      {/* Very slow aurora — low saturation, high blur */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 h-[70vh] w-[70vw] rounded-full blur-[120px] opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-primary) 30%, transparent), transparent 70%)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 30, 50, 0] }}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-[65vh] w-[65vw] rounded-full blur-[120px] opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 70%)",
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 52, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Reactive spotlight — the interface follows the pointer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,40%), color-mix(in oklab, var(--color-primary) 10%, transparent), transparent 60%)",
        }}
      />

      {/* Fine noise / grid — barely perceptible depth */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 85%)",
        }}
      />

      {/* Vignette to seat the composition */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, color-mix(in oklab, black 55%, transparent) 100%)",
        }}
      />
    </div>
  );
}
