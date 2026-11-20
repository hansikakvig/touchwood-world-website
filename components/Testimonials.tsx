"use client";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000); return () => clearInterval(t); }, []);
  return (
    <>
      <div className="qs" aria-live="polite">
        {testimonials.map((q, j) => (
          <figure key={j} className={j === i ? "on" : undefined} aria-hidden={j !== i}>
            <blockquote>“{q.q}”</blockquote>
            <figcaption>{q.n}</figcaption>
          </figure>
        ))}
      </div>
      <div className="qdots">
        {testimonials.map((q, j) => (<button key={j} aria-label={`Quote from ${q.n}`} className={j === i ? "on" : undefined} onClick={() => setI(j)} />))}
      </div>
    </>
  );
}
