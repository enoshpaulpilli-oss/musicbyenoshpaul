"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** EqualizerBars — subtle animated EQ bars for musical accents. */
export function EqualizerBars({
  count = 5,
  className,
  height = 20,
}: {
  count?: number;
  className?: string;
  height?: number;
}) {
  return (
    <div
      className={cn("inline-flex items-end gap-[3px]", className)}
      style={{ height }}
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-primary/40 to-accent"
          animate={{ height: [4, height * (0.4 + ((i * 7) % 6) / 10), height * 0.2, height * 0.9, 6] }}
          transition={{
            duration: 1.6 + (i % 4) * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
          style={{ height: 4 }}
        />
      ))}
    </div>
  );
}

/** FrequencyRing — pulsing concentric rings, evoking a soft speaker pulse. */
export function FrequencyRing({ className, size = 80 }: { className?: string; size?: number }) {
  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-primary/40"
          animate={{ scale: [0.6, 1.4], opacity: [0.7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: i * 0.6 }}
        />
      ))}
      <div className="absolute inset-1/3 rounded-full bg-primary/60 shadow-[0_0_24px_var(--color-glow)]" />
    </div>
  );
}

/** WaveformLine — animated abstract waveform (SVG). */
export function WaveformLine({ className, bars = 32, height = 40 }: { className?: string; bars?: number; height?: number }) {
  return (
    <div className={cn("flex items-center gap-[2px]", className)} style={{ height }} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-primary/60"
          animate={{ height: [height * 0.2, height * (0.4 + ((i * 11) % 6) / 10), height * 0.3, height * 0.8, height * 0.25] }}
          transition={{ duration: 2 + (i % 5) * 0.15, repeat: Infinity, ease: "easeInOut", delay: (i % 10) * 0.05 }}
          style={{ height: height * 0.2 }}
        />
      ))}
    </div>
  );
}
