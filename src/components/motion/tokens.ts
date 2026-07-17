/** Unified motion tokens — every animation in the app must draw from here.
 *  Curves are hand-tuned for a luxurious, physical feel:
 *  anticipation → acceleration → momentum → follow-through. */

export const EASE = {
  /** Primary easing — silky exit curve. Use for 90% of transitions. */
  out: [0.22, 1, 0.36, 1] as const,
  /** Quintic ease-out — for large travel distances (page enters, hero reveals). */
  outSoft: [0.16, 1, 0.3, 1] as const,
  /** Symmetric in-out — for scrubbed / scroll-linked motion. */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** Gentle ease-in for exits. */
  in: [0.7, 0, 0.84, 0] as const,
} as const;

export const DUR = {
  micro: 0.18,
  fast: 0.32,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.2,
} as const;

/** Standard spring — a soft, weighted feel used for hover / drag / cursor. */
export const SPRING = {
  soft: { type: "spring", stiffness: 180, damping: 26, mass: 0.6 },
  crisp: { type: "spring", stiffness: 320, damping: 30, mass: 0.5 },
  cursor: { stiffness: 260, damping: 32, mass: 0.35 },
} as const;

/** Stagger delay increments for choreographed reveals. */
export const STAGGER = {
  tight: 0.04,
  base: 0.07,
  wide: 0.12,
} as const;
