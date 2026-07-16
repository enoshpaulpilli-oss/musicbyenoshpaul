"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "./index";

/** AnimatedSection — a section that reveals children with a spring-based slide/blur/scale. */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  as = "section",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "section" | "div" | "article" | "aside" | "header";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/** MotionWrapper — universal wrapper with common presets. Use for any element that needs
 *  entrance + gentle idle motion without hand-writing variants. */
type Preset = "fade-up" | "fade" | "scale-in" | "slide-left" | "slide-right" | "float";

const PRESETS: Record<Preset, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: EASE } },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 220, damping: 22 } },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
  },
  float: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  },
};

export function MotionWrapper({
  children,
  preset = "fade-up",
  delay = 0,
  className,
  once = true,
  float = false,
}: {
  children: ReactNode;
  preset?: Preset;
  delay?: number;
  className?: string;
  once?: boolean;
  float?: boolean; // adds gentle idle floating after entrance
}) {
  return (
    <motion.div
      variants={PRESETS[preset]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      transition={{ delay }}
      className={cn("will-change-transform", className)}
    >
      {float ? (
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}
