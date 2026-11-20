"use client";
import { useEffect, useRef, useState } from "react";

/** Counts a value like "500+" or "4.8" up from zero when it scrolls into view. Renders the final value on the server. */
export default function Counter({ value }: { value: string }) {
  const m = value.match(/^([\d.]+)(.*)$/);
  const [txt, setTxt] = useState(value);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!m || !ref.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const to = parseFloat(m[1]); const dc = m[1].includes(".") ? 1 : 0; const rest = m[2];
    const el = ref.current; let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const f = (t: number) => { const k = Math.min((t - t0) / 1400, 1); setTxt((to * (1 - Math.pow(1 - k, 3))).toFixed(dc) + rest); if (k < 1) raf = requestAnimationFrame(f); };
      raf = requestAnimationFrame(f);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <b ref={ref}>{txt}</b>;
}
