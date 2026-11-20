"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Shot = { src: string; cat: "Ambience" | "Our people"; alt: string };

const amb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13];
const ppl = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const shots: Shot[] = [
  { src: "/images/hive-office.webp", cat: "Ambience", alt: "The Touchwood Hive office, Nashik" },
  ...amb.map((n) => ({ src: `/images/hive-ambience-${n}.webp`, cat: "Ambience" as const, alt: "Touchwood Hive ambience" })),
  ...ppl.map((n) => ({ src: `/images/hive-ourpeople-${n}.webp`, cat: "Our people" as const, alt: "Our people at the Touchwood Hive" })),
];
// Interleave the two sets so "All" alternates office and people shots.
const A = shots.filter((s) => s.cat === "Ambience"), P = shots.filter((s) => s.cat === "Our people");
const mixed = Array.from({ length: Math.max(A.length, P.length) }, (_, i) => [A[i], P[i]]).flat().filter(Boolean) as Shot[];
const tabs = ["All", "Ambience", "Our people"] as const;

export default function HiveGallery() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = tab === "All" ? mixed : shots.filter((s) => s.cat === tab);

  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, go]);

  return (
    <>
      <div className="hg-tabs" role="tablist" aria-label="Gallery filter">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "on" : undefined} onClick={() => setTab(t)}>
            {t} <small>{t === "All" ? shots.length : shots.filter((s) => s.cat === t).length}</small>
          </button>
        ))}
      </div>
      <div className="hg" key={tab}>
        {list.map((s, i) => (
          <button key={s.src} className="hg-item" style={{ "--d": i % 8 } as React.CSSProperties} onClick={() => setOpen(i)} aria-label={`Open photo: ${s.alt}`}>
            <img src={s.src} alt={s.alt} loading="lazy" />
            <span className="hg-cap">{s.cat}</span>
          </button>
        ))}
      </div>
      {open !== null ? createPortal(
        <div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setOpen(null)}>
          <img src={list[open].src} alt={list[open].alt} onClick={(e) => e.stopPropagation()} />
          <button className="lb-x" aria-label="Close" onClick={() => setOpen(null)}>×</button>
          <button className="lb-p" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1); }}>←</button>
          <button className="lb-n" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1); }}>→</button>
          <span className="lb-c">{open + 1} / {list.length}</span>
        </div>,
        document.body
      ) : null}
    </>
  );
}
