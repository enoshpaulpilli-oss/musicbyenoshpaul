"use client";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** ParallaxContainer — translates children Y based on scroll progress within the viewport.
 *  Use `speed` between -1 and 1. Positive = element moves up slower (parallax back). */
export function ParallaxContainer({
  children,
  speed = 0.2,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range = 120 * speed;
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [range, -range]), {
    stiffness: 120,
    damping: 22,
    mass: 0.5,
  });
  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/** ParallaxLayer — for stacking multiple layers with different speeds inside a Parallax scene. */
export function ParallaxLayer({
  children,
  progress,
  from = 60,
  to = -60,
  className,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  from?: number;
  to?: number;
  className?: string;
}) {
  const y = useTransform(progress, [0, 1], [from, to]);
  return (
    <motion.div style={{ y }} className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  );
}
