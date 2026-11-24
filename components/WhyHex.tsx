"use client";
import { useState } from "react";

/** Six promises as an overlapping honeycomb. Hover, focus or tap a cell to read it below. */
export default function WhyHex({ items }: { items: string[][] }) {
  const [a, setA] = useState(0);
  return (
    <div className="wh">
      <div className="wh-grid" role="tablist" aria-label="Why partners choose Touchwood">
        {items.map(([h], i) => (
          <button key={h} type="button" role="tab" aria-selected={a === i} className={`wh-cell c${i % 3}${a === i ? " on" : ""}`}
            onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)}>
            <span className="wh-no">{String(i + 1).padStart(2, "0")}</span>
            <span className="wh-t">{h}</span>
          </button>
        ))}
      </div>
      <div className="wh-panel" aria-live="polite" key={a}>
        <span className="wh-pno">{String(a + 1).padStart(2, "0")}</span>
        <div><h3>{items[a][0]}</h3><p>{items[a][1]}</p></div>
      </div>
    </div>
  );
}
