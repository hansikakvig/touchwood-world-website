"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds `.in` to every `.rv` element once its top edge has entered the viewport
 * (or anything above it, so fast jumps never leave hidden content behind).
 * Content stays visible when JS is off because the hidden state needs `html.js`.
 */
export default function RevealObserver() {
  const path = usePathname();
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const limit = innerHeight * 0.92;
      document.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach((el) => {
        if (el.getBoundingClientRect().top < limit) el.classList.add("in");
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [path]);
  return null;
}
