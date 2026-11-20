"use client";
import Link from "next/link";
import { useState } from "react";
import { ventures, siteUrl } from "@/lib/data";
import Pic from "./Pic";

const BP: [number, number][] = [[0, 0], [-1, 0], [1, 0], [-0.5, -0.866], [0.5, -0.866], [-0.5, 0.866], [0.5, 0.866]];

export default function VentureExplorer() {
  const [i, setI] = useState(0);
  const n = ventures.length;
  const v = ventures[i];
  return (
    <div className="bz">
      <div>
        <div className="mini" role="group" aria-label="Choose a venture">
          {ventures.map((x, k) => (
            <button key={x.slug} className="cell hx" aria-pressed={k === i} onClick={() => setI(k)}
              style={{ ["--x" as string]: BP[k][0], ["--y" as string]: BP[k][1] }}>{x.short}</button>
          ))}
        </div>
        <div className="ctl">
          <button className="rbtn" aria-label="Previous" onClick={() => setI((i + n - 1) % n)}>←</button>
          <span className="count">{i + 1} / {n}</span>
          <button className="rbtn" aria-label="Next" onClick={() => setI((i + 1) % n)}>→</button>
        </div>
      </div>
      <article className="slide slide-in" key={v.slug}>
        <Pic src={v.img} label={v.n} alt={v.n} logo={v.logo} />
        <div className="body">
          <span className="tag">{v.tag}</span>
          <h3>{v.n}</h3>
          <p className="ln">{v.line}</p>
          <p className="d">{v.d}</p>
          <ul className="ticks">{v.pts.map((p) => (<li key={p}><i className="hx" />{p}</li>))}</ul>
          <div className="cta" style={{ marginTop: 24 }}>
            <Link className="btn" href={`/ventures/${v.slug}/`}>View {v.short}</Link>
            {siteUrl(v.url) ? <a className="btn ghost" href={siteUrl(v.url)} target="_blank" rel="noopener noreferrer">Visit {v.url.split("/")[0]} ↗</a> : null}
          </div>
        </div>
      </article>
    </div>
  );
}
