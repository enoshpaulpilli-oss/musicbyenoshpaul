"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, STAGGER } from "./tokens";
import { cn } from "@/lib/utils";

/** SplitText — reveals large typography one line / word / char at a time
 *  using a mask (overflow-hidden) and a translateY, for a filmic "curtain up" effect.
 *  Each token also softens via blur so nothing "pops". */

type Split = "chars" | "words" | "lines";

export function SplitText({
  text,
  as: Tag = "span",
  split = "words",
  delay = 0,
  className,
  once = true,
  inView = true,
}: {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  split?: Split;
  delay?: number;
  className?: string;
  once?: boolean;
  inView?: boolean;
}) {
  const tokens: string[] =
    split === "chars"
      ? Array.from(text)
      : split === "lines"
      ? text.split("\n")
      : text.split(/(\s+)/);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: split === "chars" ? STAGGER.tight : STAGGER.base,
        delayChildren: delay,
      },
    },
  };
  const item: Variants = {
    hidden: { y: "110%", opacity: 0, filter: "blur(6px)" },
    show: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: EASE.outSoft },
    },
  };

  const MotionTag = motion(Tag as "span");
  return (
    <MotionTag
      variants={container}
      initial="hidden"
      {...(inView
        ? { whileInView: "show", viewport: { once, margin: "-15%" } }
        : { animate: "show" })}
      className={cn("inline-block", className)}
      aria-label={text}
    >
      {tokens.map((tok, i) => {
        // preserve whitespace tokens without wrapping in a masked span
        if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block overflow-hidden align-baseline"
          >
            <motion.span variants={item} className="inline-block will-change-transform">
              {tok}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}

/** Reveal — universal "curtain" wrapper for arbitrary children. */
export function Reveal({
  children,
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <span className={cn("inline-block overflow-hidden align-baseline", className)}>
      <motion.span
        initial={{ y: "105%", opacity: 0, filter: "blur(6px)" }}
        whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        viewport={{ once, margin: "-15%" }}
        transition={{ duration: 0.95, ease: EASE.outSoft, delay }}
        className="inline-block will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  );
}
