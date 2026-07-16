"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** CustomCursor — soft glow follower, hides on touch, expands on interactive elements */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 32, mass: 0.4 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) { setTouch(true); return; }

    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      if (!visible) setVisible(true);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a,button,[role=button],input,textarea,select,[data-cursor=hover]"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [x, y, visible]);

  if (touch) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
        className="fixed left-0 top-0 z-[100] pointer-events-none"
      >
        <motion.div
          animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.9 : 0.6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="-translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-primary/60"
          style={{ boxShadow: "0 0 24px var(--color-glow)" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x, y, opacity: visible ? 1 : 0 }}
        className="fixed left-0 top-0 z-[100] pointer-events-none"
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-primary" />
      </motion.div>
    </>
  );
}
