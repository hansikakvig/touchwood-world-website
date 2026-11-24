"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides, pillars } from "@/lib/data";
import Words from "./Words";

export default function HomeHero() {
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 5500);
  }, []);
  useEffect(() => {
    start();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [start]);

  const s = heroSlides[i];

  return (
    <header className="nh on-dark">
      <div className="hs" aria-hidden="true">
        {heroSlides.map((sl, j) => (
          <div key={j} className={j === i ? "on" : undefined} style={{ backgroundImage: `url(${sl.img})` }} />
        ))}
      </div>

      <div className="wrap nh-main">
        <span className="nh-eyebrow"><i className="hx" aria-hidden="true" />Touchwood World · Nashik</span>
        <h1><Words text="Optimistic by nature." accentFrom={2} /></h1>

        <div className="nh-slide" aria-live="polite">
          <span className="pill">{s.tag}</span>
          <p key={i}>{s.t}</p>
        </div>

        <div className="cta">
          <Link className="btn" href="/ventures/">Explore our businesses</Link>
          <Link className="btn ghost" href="/about/">Our philosophy</Link>
        </div>

        <div className="dots" role="tablist" aria-label="Hero slides">
          {heroSlides.map((sl, j) => (
            <button key={j} role="tab" aria-selected={j === i} aria-label={sl.tag} className={j === i ? "on" : undefined} onClick={() => { setI(j); start(); }} />
          ))}
        </div>
      </div>

      <div className="wrap">
        <nav className="nh-pillars" aria-label="What Touchwood is built on">
          {pillars.map((q, n) => (
            <Link key={q.k} href={q.href} className="nh-p">
              <span className="nh-no">{String(n + 1).padStart(2, "0")}</span>
              <h3>{q.t}</h3>
              <p>{q.d}</p>
              <span className="nh-go">{q.s} <b aria-hidden="true">→</b></span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
