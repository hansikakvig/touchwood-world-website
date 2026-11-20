import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import Counter from "@/components/Counter";
import VentureCards from "@/components/VentureCards";
import Testimonials from "@/components/Testimonials";
import Pic from "@/components/Pic";
import { stats, family, sectors, reach, sys, team, strat, ventures, siteUrl } from "@/lib/data";

/** Photo shown beside each sector (swap for real project photos when available). */
const sectorImg = ["/images/hive-ambience-3.webp", "/images/hive-ambience-9.webp", "/images/brandandbeeyond-hive.jpg", "/images/hive-ourpeople-4.webp"];
const logoFor: Record<string, string> = {
  "Touchwood Lifespaces": "/logos/lifespaces.png", "Touchwood Bliss": "/logos/bliss.png", "Fairytale Weddings": "/logos/fairytale.png",
  "The Harmony Retreat": "/logos/harmony-retreat.png", "The Harmony Movement": "/logos/harmony-movement.png", "Brand and Beeyond": "/logos/brandandbeeyond.png",
};

/** Official website for each venture named in the sectors (from lib/content.json); the Foundation links to our Social Work page. */
const norm = (x: string) => x.toLowerCase().replace(/s$/, "");
const siteFor = (name: string) => {
  const v = ventures.find((x) => norm(x.n) === norm(name));
  return v ? siteUrl(v.url) : undefined;
};
const VLink = ({ name, className, children, style }: { name: string; className?: string; children: React.ReactNode; style?: React.CSSProperties }) => {
  const href = siteFor(name);
  return href
    ? <a className={className} style={style} href={href} target="_blank" rel="noopener noreferrer" title={`Visit ${name}`}>{children}</a>
    : <Link className={className} style={style} href="/social-work/" title={name}>{children}</Link>;
};

export default function Home() {
  return (
    <>
      <HomeHero />

      <div className="glance">
        <div className="wrap">
          <div className="glance-card">
            {stats.map(([v, l]) => (<div className="it" key={l}><Counter value={v} /><span>{l}</span></div>))}
          </div>
        </div>
      </div>

      <section>
        <div className="wrap">
          <span className="kicker">Our family</span>
          <h2 className="rv">The Touchwood family.</h2>
          <p className="lead rv">One group, seven ventures, each leading in its own field.</p>
          <div className="fam">
            {family.slice(0, 1).map(([src, alt, sm]) => (
              <div className="fam-root rv" key={src}><img src={src} alt={alt} /><small>{sm}</small></div>
            ))}
            <div className="fam-line rv" aria-hidden="true" />
            <div className="fam-kids">
              {family.slice(1).map(([src, alt, sm], k) => (
                <div className={`fam-tile rv${src.includes("fairytale") ? " dark-tile" : ""}`} key={src} style={{ "--d": k } as React.CSSProperties}>
                  <img src={src} alt={alt} loading="lazy" /><small>{sm}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap split">
          <div className="rv">
            <span className="kicker">Who we are</span>
            <h2>A group built on optimism.</h2>
            <p className="lead">We are inspiring lives through our work in Real Estate, Hospitality, Marketing and Social Sectors. In everything we pursue, we are always optimistic by nature.</p>
            <p className="lead">Through our products, services and culture, we bring positive energy to our team, clients, vendors, partners and community, and we promise to build the most optimistic and happier communities around the globe.</p>
            <div className="cta" style={{ marginTop: 26 }}><Link className="btn" href="/about/">Read our story</Link></div>
          </div>
          <div className="duo rv">
            <Pic className="hx" src="/images/hive-ambience-13.webp" alt="Touchwood Hive office, Nashik" />
            <Pic className="hx small" src="/images/hive-ourpeople-1.webp" alt="Our people wall at the Touchwood Hive" />
          </div>
        </div>
        <div className="wrap">
          <div className="three">
            {strat.slice(0, 3).map(([h, p]) => (<div className="rv" key={h}><h3>Our {h.toLowerCase()}</h3><p>{p}</p></div>))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="kicker">What we do</span>
          <h2 className="rv">Four sectors, one philosophy.</h2>
          <div className="zz">
            {sectors.map(([h, p, list], i) => (
              <div className={`zz-row${i % 2 ? " rev" : ""}`} key={h}>
                <div className="zz-media rv">
                  <img src={sectorImg[i % sectorImg.length]} alt={h} loading="lazy" />
                  <span className="zz-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="zz-logos">
                    {list.map((l) => logoFor[l] ? <VLink name={l} className={`hx${l.startsWith("Fairytale") ? " dk" : ""}`} key={l}><img src={logoFor[l]} alt={l} /></VLink> : null)}
                  </div>
                </div>
                <div className="zz-body rv">
                  <span className="zz-tag">Sector {String(i + 1).padStart(2, "0")}</span>
                  <h3>{h}</h3><p>{p}</p>
                  <ul>{list.map((l, k) => <li key={l} style={{ "--d": k } as React.CSSProperties}><VLink name={l}>{l}{siteFor(l) ? <span aria-hidden="true"> ↗</span> : <span aria-hidden="true"> →</span>}</VLink></li>)}</ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <span className="kicker">Our ventures</span>
          <h2 className="rv">Swipe through the Touchwood family.</h2>
          <VentureCards />
        </div>
      </section>

      <section className="dark">
        <div className="wrap">
          <h2>Touchwood by the numbers.</h2>
          <div className="reach">
            {reach.map(([v, l]) => (<div key={l}><Counter value={v} /><span>{l}</span></div>))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="kicker">How we work</span>
          <h2 className="rv">Why partners choose Touchwood.</h2>
          <p className="lead">Nine principles that run through every venture.</p>
          <div className="prin">
            {sys.map((s, i) => (
              <div className="prin-card rv" key={s} style={{ "--d": i % 3 } as React.CSSProperties}>
                <span className="prin-no">{String(i + 1).padStart(2, "0")}</span>
                <i className="hx" aria-hidden="true" />
                <h3>{s}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <span className="kicker">Leadership</span>
          <h2 className="rv">The people behind the hive.</h2>
          <div className="team">
            {team.map((t) => (
              <div className="rv" key={t.n}><div className="hx">{t.n.split(" ").map((w) => w[0]).join("")}</div><h3>{t.n}</h3><small>{t.r}</small><p>{t.b}</p></div>
            ))}
          </div>
          <div className="cta" style={{ marginTop: 28 }}><Link className="btn ghost" href="/about/">Meet our people</Link></div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="found rv">
            <div className="o"><span className="kicker">Touchwood Foundation</span><h2>Optimism is better when it is shared.</h2></div>
            <div>
              <p>Social sectors are one of the four pillars Touchwood World was built on. Touchwood Welfare Foundation, a not-for-profit (Section 8) company based in Nashik, is where that pillar takes shape.</p>
              <p>A business that grows should help its community grow too. The Foundation is open to volunteers, partners and people who want to bring a cause to us.</p>
              <Link className="btn" href="/social-work/">Get involved</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <span className="kicker">Life at Touchwood</span>
          <h2 className="rv">Inside the Touchwood Hive.</h2>
          <div className="gal">
            <Pic className="hx" src="/images/hive-ambience-7.webp" label="The Hive" sub="Nashik office" />
            <Pic className="hx" src="/images/hive-ourpeople-10.webp" label="Our people" sub="Team Touchwood" />
            <Pic className="hx" src="/images/hive-ambience-2.webp" label="Happiness Corner" sub="Culture" />
            <Pic className="hx" src="/images/hive-ourpeople-9.webp" label="Team moments" sub="Working together" />
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="kicker">Kind words</span>
          <h2>What people say.</h2>
          <Testimonials />
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>Work, partner, sell, invest or do business with us.</h2>
          <p>Talk to the Touchwood team in Nashik.</p>
          <Link className="btn" href="/contact/">Connect with us</Link>
        </div>
      </section>
    </>
  );
}
