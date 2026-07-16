"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/motion";

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
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-xs uppercase tracking-[0.24em] text-muted-foreground mb-2"
          >
            {eyebrow}
          </motion.p>
        )}
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
            className="inline-block"
          >
            {title}
          </motion.span>
        </h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="mt-2 text-sm text-muted-foreground max-w-2xl"
          >
            {description}
          </motion.p>
        )}
      </div>
      {actions && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
          className="flex items-center gap-2"
        >
          {actions}
        </motion.div>
      )}
    </header>
  );
}

