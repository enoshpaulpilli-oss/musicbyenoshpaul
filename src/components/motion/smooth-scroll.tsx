"use client";
import { useEffect } from "react";

/** Lightweight smooth scroll: eases wheel deltas via CSS scroll-behavior + optional
 *  inertial dampening. Kept minimal so accessibility isn't hurt. */
export function SmoothScroll() {
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = prev; };
  }, []);
  return null;
}
