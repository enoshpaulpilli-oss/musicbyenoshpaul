"use client";
import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "framer-motion";
import { forwardRef, useRef, useState, type ReactNode, type MouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "./index";

/** MagneticButton — button that gently pulls toward the cursor within its radius. */
type MagneticButtonProps = Omit<HTMLMotionProps<"button">, "children" | "ref"> & {
  children?: ReactNode;
  strength?: number; // 0..1, how strongly the element follows cursor
  radius?: number; // px, distance beyond bounds where effect kicks in
  variant?: "primary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
};

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, strength = 0.35, radius = 40, variant = "primary", size = "md", glow = true, onClick, ...rest }, ref) => {
    const localRef = useRef<HTMLButtonElement>(null);
    const setRef = (node: HTMLButtonElement | null) => {
      localRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    };

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

    // for internal light reflection
    const lx = useMotionValue(50);
    const ly = useMotionValue(50);

    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

    const handleMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
      const el = localRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const max = Math.max(r.width, r.height) / 2 + radius;
      if (dist < max) {
        x.set(dx * strength);
        y.set(dy * strength);
      }
      lx.set(((e.clientX - r.left) / r.width) * 100);
      ly.set(((e.clientY - r.top) / r.height) * 100);
    };
    const handleLeave = () => { x.set(0); y.set(0); lx.set(50); ly.set(50); };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      const id = Date.now();
      setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
      setTimeout(() => setRipples((p) => p.filter((r) => r.id !== id)), 700);
      onClick?.(e);
    };

    const base = "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors select-none will-change-transform";
    const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2.5 text-sm", lg: "px-5 py-3 text-sm" };
    const variants = {
      primary: "bg-primary text-primary-foreground",
      ghost: "text-foreground hover:bg-white/5",
      glass: "glass text-foreground hover:bg-white/10",
    };

    // reflection gradient
    const reflection = useTransform([lx, ly], ([x, y]) =>
      `radial-gradient(120px circle at ${x}% ${y}%, color-mix(in oklab, white 30%, transparent), transparent 55%)`
    );

    return (
      <motion.button
        ref={setRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        onClick={handleClick}
        style={{ x: sx, y: sy }}
        whileHover={{ scale: 1.03, boxShadow: glow ? "0 20px 44px -14px var(--color-glow)" : undefined }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.25, ease: EASE }}
        className={cn(base, sizes[size], variants[variant], className)}
        {...rest}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <motion.span
          aria-hidden
          style={{ background: reflection }}
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay"
        />
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none absolute rounded-full bg-white/40"
            style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20 }}
          />
        ))}
      </motion.button>
    );
  },
);
MagneticButton.displayName = "MagneticButton";
