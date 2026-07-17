"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "./tokens";
import { cn } from "@/lib/utils";

/** ImageReveal — clip-path "wipe" reveal that also scales the inner content
 *  slightly, so images and rich media never simply fade in. */
export function ImageReveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  once?: boolean;
}) {
  const initialClip = {
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
  }[direction];

  return (
    <motion.div
      initial={{ clipPath: initialClip }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once, margin: "-10%" }}
      transition={{ duration: 1.1, ease: EASE.outSoft, delay }}
      className={cn("relative overflow-hidden will-change-[clip-path]", className)}
    >
      <motion.div
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once, margin: "-10%" }}
        transition={{ duration: 1.4, ease: EASE.outSoft, delay }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
