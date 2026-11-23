"use client";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";

const initials = (n: string) => n.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");
const N = testimonials.length;

/** Reviews as a swipeable deck: the top card flies off (drag, arrows, or auto) and the next one rises from underneath. */
export default function Testimonials() {
  const [top, setTop] = useState(0);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [fly, setFly] = useState(0);
  const flyRef = useRef(0);
  const startX = useRef(0);
  const paused = useRef(false);

  const next = (dir = 1) => {
    if (flyRef.current) return;
    flyRef.current = dir;
    setFly(dir);
    setTimeout(() => {
      setTop((t) => (t + 1) % N);
      flyRef.current = 0;
      setFly(0);
      setDx(0);
    }, 380);
  };
  const prev = () => { if (!flyRef.current) { setDx(0); setTop((t) => (t - 1 + N) % N); } };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => { if (!paused.current) next(1); }, 5500);
    return () => clearInterval(id);
  }, []);

  const onDown = (e: React.PointerEvent) => {
    if (flyRef.current) return;
    startX.current = e.clientX;
    setDragging(true);
    paused.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => { if (dragging) setDx(e.clientX - startX.current); };
  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    paused.current = false;
    if (Math.abs(dx) > 90) next(dx > 0 ? 1 : -1); else setDx(0);
  };

  return (
    <>
      <div className="rvw-badges">
        <span><b>4.8 ★</b> Touchwood Bliss · 12,000+ guest reviews</span>
        <span><b>★★★★★</b> reviews from Touchwood Lifespaces customers</span>
      </div>
      <div className="deck" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)} aria-label="Customer reviews">
        <div className="deck-stack">
          {testimonials.map((t, i) => {
            const p = (i - top + N) % N;
            if (p > 3) return null;
            const isTop = p === 0;
            const tilt = p % 2 ? 2.2 : -2.2;
            const style: React.CSSProperties = isTop
              ? {
                  transform: fly ? `translateX(${fly * 130}%) rotate(${fly * 20}deg)` : `translateX(${dx}px) rotate(${dx / 16}deg)`,
                  opacity: fly ? 0 : 1,
                  transition: dragging ? "none" : "transform .38s cubic-bezier(.2,.8,.2,1), opacity .38s",
                  zIndex: N + 1,
                }
              : {
                  transform: `translateY(${(p - (fly ? 1 : 0)) * 20}px) scale(${1 - (p - (fly ? 1 : 0)) * 0.05}) rotate(${(fly ? 0 : tilt)}deg)`,
                  opacity: 1 - p * 0.18,
                  transition: "transform .45s cubic-bezier(.2,.8,.2,1), opacity .45s",
                  zIndex: N - p,
                };
            return (
              <figure
                className={`deck-card${isTop ? " is-top" : ""}`}
                key={i}
                style={style}
                aria-hidden={!isTop || undefined}
                onPointerDown={isTop ? onDown : undefined}
                onPointerMove={isTop ? onMove : undefined}
                onPointerUp={isTop ? onUp : undefined}
                onPointerCancel={isTop ? onUp : undefined}
              >
                <div className="deck-mark" aria-hidden="true">“</div>
                {t.v === "Touchwood Lifespaces" && <div className="rvw-stars" aria-label="5 out of 5 stars">★★★★★</div>}
                <blockquote>{t.q}</blockquote>
                <figcaption>
                  <span className="rvw-av hx" aria-hidden="true">{initials(t.n)}</span>
                  <span><b>{t.n}</b><small>{t.r ? `${t.r} · ` : ""}{t.v}</small></span>
                </figcaption>
              </figure>
            );
          })}
        </div>
        <div className="deck-nav">
          <button type="button" onClick={prev} aria-label="Previous review">←</button>
          <span>{String(top + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}<small>Swipe or tap</small></span>
          <button type="button" onClick={() => next(1)} aria-label="Next review">→</button>
        </div>
      </div>
    </>
  );
}
