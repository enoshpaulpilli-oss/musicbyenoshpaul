"use client";
import type { ReactNode } from "react";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/split-text";
import { motion } from "framer-motion";
import { EASE, DUR } from "@/components/motion/tokens";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.base, ease: EASE.out }}
            className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground mb-3"
          >
            {eyebrow}
          </motion.p>
        )}
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.02]">
          <SplitText text={title} split="words" inView={false} />
        </h1>
        {description && (
          <p className="mt-4 text-sm text-muted-foreground max-w-2xl leading-relaxed">
            <Reveal delay={0.35}>{description}</Reveal>
          </p>
        )}
      </div>
      {actions && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.base, ease: EASE.out, delay: 0.35 }}
          className="flex items-center gap-2"
        >
          {actions}
        </motion.div>
      )}
    </header>
  );
}
