"use client";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type HTMLMotionProps, type Variants } from "framer-motion";
import { forwardRef, useRef, type ReactNode, type MouseEvent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Shared easing — Anime.js-inspired, smooth physical curves */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

/** MotionContainer — reveals children with staggered fadeUp on mount / in-view */
export function MotionContainer({
  children,
  className,
  delay = 0,
  inView = false,
  as: _as,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
  as?: keyof HTMLElementTagNameMap;
}) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      {...(inView
        ? { whileInView: "show", viewport: { once: true, margin: "-80px" } }
        : { animate: "show" })}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Item wrapper for MotionContainer stagger */
export const MotionItem = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, children, ...rest }, ref) => (
    <motion.div ref={ref} variants={fadeUp} className={className} {...rest}>
      {children}
    </motion.div>
  ),
);
MotionItem.displayName = "MotionItem";

/** PageTransition — wraps route content */
export function PageTransition({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      key="page"
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** GlassCard — the base glass surface (no motion) */
export const GlassCard = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { strong?: boolean }
>(({ className, strong, children, ...rest }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-white/10 relative overflow-hidden",
      strong ? "glass-strong" : "glass",
      className,
    )}
    {...rest}
  >
    {children}
  </div>
));
GlassCard.displayName = "GlassCard";

/** AnimatedCard — reveals + hover lift + parallax glow that follows cursor */
export function AnimatedCard({
  children,
  className,
  glow = true,
  tilt = true,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  tilt?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rx = useSpring(useTransform(my, [0, 100], [4, -4]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 100], [-4, 4]), { stiffness: 150, damping: 18 });

  const handle = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };
  const leave = () => { mx.set(50); my.set(50); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handle}
      onMouseLeave={leave}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.7, ease: EASE }}
      whileHover={{ y: -4, transition: { duration: 0.35, ease: EASE } }}
      style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 1000 } : undefined}
      className={cn(
        "group relative rounded-2xl glass border border-white/10 p-5 will-change-transform",
        "transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_var(--color-glow)]",
        className,
      )}
    >
      {glow && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at ${mx.get()}% ${my.get()}%, color-mix(in oklab, var(--color-primary) 25%, transparent), transparent 60%)`,
          }}
        />
      )}
      {glow && (
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ring-inset ring-primary/30" />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

/** GlowEffect — soft radial glow behind an element */
export function GlowEffect({ className, intensity = 0.6 }: { className?: string; intensity?: number }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{
        background: `radial-gradient(60% 50% at 50% 50%, color-mix(in oklab, var(--color-primary) ${Math.round(intensity * 60)}%, transparent), transparent 70%)`,
        filter: "blur(40px)",
      }}
    />
  );
}

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
};

/** AnimatedButton — hover glow, press scale, ripple */
export const AnimatedButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "primary", size = "md", glow = true, onClick, ...rest }, ref) => {
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

    const handle = (e: MouseEvent<HTMLButtonElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      const id = Date.now();
      setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
      setTimeout(() => setRipples((p) => p.filter((r) => r.id !== id)), 700);
      onClick?.(e);
    };

    const base = "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors select-none";
    const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2.5 text-sm", lg: "px-5 py-3 text-sm" };
    const variants = {
      primary: "bg-primary text-primary-foreground",
      ghost: "text-foreground hover:bg-white/5",
      glass: "glass text-foreground hover:bg-white/10",
    };

    return (
      <motion.button
        ref={ref}
        onClick={handle}
        whileHover={{ y: -1, boxShadow: glow ? "0 20px 40px -12px var(--color-glow)" : undefined }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.25, ease: EASE }}
        className={cn(base, sizes[size], variants[variant], className)}
        {...rest}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {variant === "primary" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
            style={{ background: "linear-gradient(120deg, transparent, color-mix(in oklab, white 25%, transparent), transparent)" }}
          />
        )}
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              initial={{ opacity: 0.4, scale: 0 }}
              animate={{ opacity: 0, scale: 4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="pointer-events-none absolute rounded-full bg-white/40"
              style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20 }}
            />
          ))}
        </AnimatePresence>
      </motion.button>
    );
  },
);
AnimatedButton.displayName = "AnimatedButton";

/** FloatingPanel — glass panel with entrance + gentle idle float */
export function FloatingPanel({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={cn("relative", className)}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay }}
        className="glass-strong rounded-2xl border border-white/10 p-5 relative"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** InteractivePanel — pointer-tracking glow surface for hero-scale sections */
export function InteractivePanel({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const handle = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  return (
    <div ref={ref} onMouseMove={handle} className={cn("relative rounded-3xl glass-strong border border-white/10 overflow-hidden", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 55%)` }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/** LoadingPulse — elegant three-dot loader */
export function LoadingPulse({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary"
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

/** useHydrated — safe SSR gate */
export function useHydrated() {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}
