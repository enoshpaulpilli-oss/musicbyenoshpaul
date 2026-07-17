"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SPRING } from "./tokens";

/** CustomCursor — a single thin ring that gently grows over interactive elements.
 *  No trailing dot, no color flashes; the cursor should feel like part of the
 *  glass surface it's floating over. */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, SPRING.cursor);
  const sy = useSpring(y, SPRING.cursor);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) { setTouch(true); return; }

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a,button,[role=button],input,textarea,select,[data-cursor=hover]"));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointerleave", leave);
    };
  }, [x, y, visible]);

  if (touch) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
      className="fixed left-0 top-0 z-[100] pointer-events-none mix-blend-difference"
    >
      <motion.div
        animate={{
          scale: pressed ? 0.85 : hovering ? 1.9 : 1,
          opacity: hovering ? 0.9 : 0.55,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="-translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-white/80"
      />
    </motion.div>
  );
}
