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
          <span className="kicker">Always hiring</span>
          <h2 className="rv">Open roles.</h2>
          <p className="lead rv">We are a growing group and hire across every venture through the year. Here is what is open right now.</p>
          {careers.roles.map((r) => (
            <div className="roles rv" key={r.t}>
              <div><span className="tag">{r.team}</span><h3>{r.t}</h3><p>{r.d}</p><p className="meta">{r.meta}</p></div>
              <a className="btn" href={`mailto:${contact.careers}?subject=${encodeURIComponent("Application: " + r.t)}`}>Apply by email</a>
            </div>
          ))}
          <div className="roles open rv">
            <div><span className="tag">Any department</span><h3>Don’t see your role?</h3><p>Real estate sales, hospitality, events, wellness, design, marketing or operations: send us your CV and tell us where you would add value. We keep every application on file for upcoming openings.</p></div>
            <a className="btn ghost" href={`mailto:${contact.careers}?subject=${encodeURIComponent("Open application")}`}>Send your CV</a>
          </div>
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
