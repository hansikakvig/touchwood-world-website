import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HiveGallery from "@/components/HiveGallery";
import { strat, team, sys, stats } from "@/lib/data";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <PageHero title="We dream. We believe. We achieve." sub="Who we are, what we believe and how we work." crumbs={[{ href: "/about/", label: "About" }]} />
      <section className="alt">
        <div className="wrap knock">
          <div className="big">Knock<br />knock.</div>
          <div className="rv">
            <h2>A wish, then a thank you.</h2>
            <p className="lead">Ancient wisdom held that trees were homes of spirits. People knocked twice on wood: once to make a wish, once to say thank you. Touchwood carries that spirit into everything it builds, inspired by nature.</p>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <span className="kicker">Our direction</span>
          <h2 className="rv" style={{ marginBottom: 36 }}>One philosophy, four promises.</h2>
          <div className="rows">{strat.map(([h, p]) => (<div className="rv" key={h}><h3>{h}</h3><p>{p}</p></div>))}</div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <span className="kicker">Leadership</span>
          <h2 className="rv">Our people.</h2>
          <div className="team">{team.map((t) => (<div className="rv" key={t.n}><div className="hx">{t.n.split(" ").map((w) => w[0]).join("")}</div><h3>{t.n}</h3><small>{t.r}</small><p>{t.b}</p></div>))}</div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <span className="kicker">How we work</span>
          <h2 className="rv">The systems behind the brand.</h2>
          <div className="sys">{sys.map((s) => (<div className="rv" key={s}><i className="hx" />{s}</div>))}</div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <div className="stats">{stats.map(([v, l]) => (<div key={l} className="rv"><div className="hx">{v}</div><span>{l}</span></div>))}</div>
        </div>
      </section>
      <section className="hive-gal">
        <div className="wrap">
          <span className="kicker">Gallery</span>
          <h2 className="rv">Inside the Touchwood Hive.</h2>
          <p className="lead rv">Our Nashik office, built like a honeycomb: open, green and full of light, and the people who make it buzz.</p>
          <HiveGallery />
        </div>
      </section>
    </>
  );
}
