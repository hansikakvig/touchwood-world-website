"use client";
import { useEffect, useRef } from "react";
import { testimonials } from "@/lib/data";

const initials = (n: string) => n.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

export default function Testimonials() {
  const el = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const step = (dir: number) => {
    const c = el.current; if (!c || !c.firstElementChild) return;
    const w = (c.firstElementChild as HTMLElement).offsetWidth + 16;
    const atEnd = c.scrollLeft + w > c.scrollWidth - c.clientWidth - 4;
    c.scrollTo({ left: atEnd ? 0 : c.scrollLeft + w * dir, behavior: "smooth" });
  };
  useEffect(() => {
    const t = setInterval(() => { if (!paused.current) step(1); }, 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      <div className="rvw-badges">
        <span><b>4.8 ★</b> Touchwood Bliss · 12,000+ guest reviews</span>
        <span><b>★★★★★</b> reviews from Touchwood Lifespaces customers</span>
      </div>
      <div className="rvw" ref={el} onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)} onTouchEnd={() => setTimeout(() => (paused.current = false), 3000)}>
        {testimonials.map((t, i) => (
          <figure className="rvw-card" key={t.n} style={{ "--d": i % 4 } as React.CSSProperties}>
            {t.v === "Touchwood Lifespaces" ? <div className="rvw-stars" aria-label="5 out of 5 stars">★★★★★</div> : <div className="rvw-q" aria-hidden="true">“</div>}
            <blockquote>“{t.q}”</blockquote>
            <figcaption>
              <span className="rvw-av hx" aria-hidden="true">{initials(t.n)}</span>
              <span><b>{t.n}</b><small>{t.r ? `${t.r} · ` : ""}{t.v}</small></span>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
