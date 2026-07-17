"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/** SmoothScroll — cinematic inertial scrolling.
 *  Lenis drives requestAnimationFrame; wheel/touch feels weighted but responsive.
 *  Respects prefers-reduced-motion (skips entirely). */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      // Exponential ease-out — feels like a camera decelerating.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.1,
      wheelMultiplier: 1,
      lerp: 0.09,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Expose for anchor links elsewhere.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
  return null;
}
