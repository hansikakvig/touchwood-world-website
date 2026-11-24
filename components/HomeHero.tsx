"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides, pillars } from "@/lib/data";
import Words from "./Words";

const POS: Record<string, [number, number]> = { biz: [-0.5, -0.866], ppl: [0.5, -0.866], str: [1, 0], sys: [0.5, 0.866] };

function cellStyle(p: [number, number], i: number): React.CSSProperties {
  return { ["--x" as string]: p[0], ["--y" as string]: p[1], ["--d" as string]: `${i * 0.09}s`, ["--sx" as string]: `${(p[0] || 1) * 160}px`, ["--sy" as string]: `${(p[1] || 1) * -160}px` };
}

export default function HomeHero() {
  const [i, setI] = useState(0);
  const [pk, setPk] = useState("biz");
  const [pre, setPre] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 5500);
  }, []);
  useEffect(() => {
    start();
    const t = setTimeout(() => setPre(false), 200);
    return () => { if (timer.current) clearInterval(timer.current); clearTimeout(t); };
  }, [start]);

  const p = pillars.find((q) => q.k === pk)!;
  const s = heroSlides[i];

  return (
    <header className="hero on-dark" onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); }}>
      <div className="hs" aria-hidden="true">
        {heroSlides.map((sl, j) => (
          <div key={j} className={j === i ? "on" : undefined} style={{ backgroundImage: `url(${sl.img})` }} />
        ))}
      </div>
      <div className="wrap">
        <div>
          <h1><Words text="Optimistic by nature." accentFrom={2} /></h1>
          <div className="rot" aria-live="polite">
            <span className="pill">{s.tag}</span>
            <p key={i}>{s.t}</p>
          </div>
          <div className="dots" role="tablist" aria-label="Hero slides">
            {heroSlides.map((sl, j) => (
              <button key={j} role="tab" aria-selected={j === i} aria-label={sl.tag} className={j === i ? "on" : undefined} onClick={() => { setI(j); start(); }} />
            ))}
          </div>
          <div className="cta">
            <Link className="btn" href="/ventures/">Explore our businesses</Link>
            <Link className="btn ghost" href="/about/">Our philosophy</Link>
          </div>
        </div>
        <div className={pre ? "pre" : undefined}>
          <div className="comb">
            <span className="cell hx dim" style={cellStyle([-1, 0], 0)} />
            <span className="cell hx core" style={cellStyle([0, 0], 1)}>Touch<br />wood</span>
            {pillars.map((q, n) => (
              <Link key={q.k} href={q.href} className="cell hx" style={cellStyle(POS[q.k], n + 2)} aria-pressed={pk === q.k}
                onMouseEnter={() => setPk(q.k)} onFocus={() => setPk(q.k)}>
                {q.t}<small>{q.s}</small>
              </Link>
            ))}
            <span className="cell hx dim" style={cellStyle([-0.5, 0.866], 6)} />
          </div>
          <div className="panel" aria-live="polite">
            <h3>{p.t}</h3>
            <p>{p.d}</p>
            <Link href={p.href}>Open {p.t} →</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
