import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { social } from "@/lib/data";

export const metadata: Metadata = { title: "Social Work" };

export default function Social() {
  return (
    <>
      <PageHero title={social.title} sub={social.sub} crumbs={[{ href: "/social-work/", label: "Social Work" }]} />
      <section>
        <div className="wrap">
          <div className="found rv">
            <div className="o"><span className="kicker">Section 8 · Nashik</span><h2>Touchwood Welfare Foundation</h2></div>
            <div>{social.about.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <span className="kicker">Focus areas</span>
          <h2 className="rv">Our focus.</h2>
          <div className="three">{social.focus.map(([h, p]) => (<div className="rv" key={h}><h3>{h}</h3><p>{p}</p></div>))}</div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <span className="kicker">Join in</span>
          <h2 className="rv">Ways to get involved.</h2>
          <div className="three">{social.ways.map(([h, p]) => (<div className="rv" key={h}><h3>{h}</h3><p>{p}</p></div>))}</div>
          <div className="cta" style={{ marginTop: 34 }}><Link className="btn" href="/contact/">Get in touch</Link></div>
        </div>
      </section>
    </>
  );
}
