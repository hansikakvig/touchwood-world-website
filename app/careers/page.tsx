import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { careers, contact } from "@/lib/data";

export const metadata: Metadata = { title: "Careers" };

export default function Careers() {
  return (
    <>
      <PageHero title={careers.title} sub={careers.sub} crumbs={[{ href: "/careers/", label: "Careers" }]} />
      <section>
        <div className="wrap">
          <span className="kicker">Why Touchwood</span>
          <h2 className="rv">A place to grow, optimistically.</h2>
          <div className="sys two">{careers.why.map(([h, p]) => (<div className="rv" key={h}><i className="hx" /><span>{h}<small>{p}</small></span></div>))}</div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <span className="kicker">Hiring now</span>
          <h2 className="rv">Current openings.</h2>
          {careers.roles.map((r) => (
            <div className="roles rv" key={r.t}>
              <div><span className="tag">{r.team}</span><h3>{r.t}</h3><p>{r.d}</p><p className="meta">{r.meta}</p></div>
              <a className="btn" href={`mailto:${contact.careers}?subject=${encodeURIComponent("Application: " + r.t)}`}>Apply by email</a>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="wrap">
          <span className="kicker">Departments</span>
          <h2 className="rv">Where you could work.</h2>
          <div className="sect five">{careers.depts.map(([h, b, p]) => (<div className="rv" key={h}><div className="hx" /><h3>{h}</h3><p>{p}</p><ul><li>{b}</li></ul></div>))}</div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <span className="kicker">Process</span>
          <h2 className="rv">How to join.</h2>
          <div className="steps">{careers.steps.map(([h, p]) => (<div className="rv" key={h}><h3>{h}</h3><p>{p}</p></div>))}</div>
          <p style={{ marginTop: 32, fontWeight: 600 }}><a href={`mailto:${contact.careers}`}>{contact.careers}</a> · {contact.cph}</p>
        </div>
      </section>
    </>
  );
}
