"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ventures, siteUrl } from "@/lib/data";
import Pic from "./Pic";

export default function VentureCards() {
  const el = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const step = (dir: number) => {
    const c = el.current; if (!c || !c.firstElementChild) return;
    const w = (c.firstElementChild as HTMLElement).offsetWidth + 20;
    const atEnd = c.scrollLeft + w > c.scrollWidth - c.clientWidth - 4;
    const atStart = c.scrollLeft < 4;
    const left = dir > 0 ? (atEnd ? 0 : c.scrollLeft + w) : (atStart ? c.scrollWidth : c.scrollLeft - w);
    c.scrollTo({ left, behavior: "smooth" });
  };
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => { if (!paused.current) step(1); }, 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      <div className="cards" ref={el} onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)} onFocus={() => (paused.current = true)}>
        {ventures.filter((v) => v.slug !== "touchwood-foundation").map((v) => (
          <div key={v.slug} className="card-wrap">
          <Link href={`/ventures/${v.slug}/`} className="card">
            <Pic src={v.img} label={v.n} alt={v.n} logo={v.logo}>
              {v.img && v.logo ? <div className="chip"><img src={v.logo} alt="" /></div> : null}
            </Pic>
            <div className="tx"><h3>{v.n}</h3><p>{v.line}</p><span className="more">Explore →</span></div>
          </Link>
          {siteUrl(v.url) ? <a className="site-link" href={siteUrl(v.url)} target="_blank" rel="noopener noreferrer">Visit {v.url.split("/")[0]} ↗</a> : null}
          </div>
        ))}
      </div>
      <div className="scroll-ctl">
        <button className="rbtn" aria-label="Previous venture" onClick={() => step(-1)}>←</button>
        <button className="rbtn" aria-label="Next venture" onClick={() => step(1)}>→</button>
      </div>
    </>
  );
}
