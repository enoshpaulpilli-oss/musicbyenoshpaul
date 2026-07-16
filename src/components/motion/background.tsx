"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

/** InteractiveBackground — animated aurora + floating particles + reactive glow.
 * Drop-in, absolute-positioned. Elegant, not distracting. */
export function InteractiveBackground({ notes = false }: { notes?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      {/* Reactive spotlight */}
      <div
        className="absolute inset-0 opacity-70 transition-opacity"
        style={{
          background:
            "radial-gradient(500px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--color-primary) 18%, transparent), transparent 55%)",
        }}
      />
      {/* Moving aurora blobs */}
      <motion.div
        className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 40%, transparent), transparent 60%)" }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 80, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 35%, transparent), transparent 60%)" }}
        animate={{ x: [0, -50, 20, 0], y: [0, 60, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 30%, transparent), transparent 60%)" }}
        animate={{ x: [0, 40, -60, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Particles */}
      <Particles count={28} />
      {notes && <FloatingNotes />}

      {/* Sound wave */}
      <SoundWave />
    </div>
  );
}

function Particles({ count }: { count: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="absolute inset-0">
      {items.map((_, i) => {
        const size = 2 + ((i * 3) % 5);
        const dur = 10 + (i % 8);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-primary/40"
            style={{
              width: size, height: size,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              filter: "blur(1px)",
              boxShadow: "0 0 12px var(--color-glow)",
            }}
            animate={{ y: [0, -30, 0], x: [0, 12, 0], opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: (i % 5) * 0.6 }}
          />
        );
      })}
    </div>
  );
}

function FloatingNotes() {
  const glyphs = ["♪", "♫", "♩", "♬", "𝄞"];
  const items = Array.from({ length: 10 });
  return (
    <div className="absolute inset-0">
      {items.map((_, i) => (
        <motion.span
          key={i}
          className="absolute font-display text-primary/25 select-none"
          style={{
            left: `${(i * 71) % 100}%`,
            top: `${(i * 43) % 100}%`,
            fontSize: 18 + ((i * 5) % 24),
          }}
          animate={{ y: [0, -40, 0], rotate: [0, 12, -8, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 14 + (i % 6), repeat: Infinity, ease: "easeInOut", delay: (i % 4) * 0.9 }}
        >
          {glyphs[i % glyphs.length]}
        </motion.span>
      ))}
    </div>
  );
}

function SoundWave() {
  const bars = Array.from({ length: 40 });
  return (
    <div className="absolute inset-x-0 bottom-0 h-40 flex items-end justify-center gap-1 opacity-30">
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-t bg-gradient-to-t from-primary/0 via-primary/60 to-accent/80"
          animate={{ height: [10, 60 + ((i * 13) % 40), 20, 40, 15] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: (i % 10) * 0.1 }}
          style={{ height: 10 }}
        />
      ))}
    </div>
  );
}
