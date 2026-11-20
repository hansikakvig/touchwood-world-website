import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Pic from "@/components/Pic";
import { ventures } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() { return ventures.map((v) => ({ slug: v.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const v = ventures.find((x) => x.slug === slug);
  return { title: v?.n, description: v?.line };
}

export default async function VenturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = ventures.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const v = ventures[idx];
  const others = [1, 2, 3].map((d) => ventures[(idx + d) % ventures.length]);
  const isMail = v.url.includes("@");
  return (
    <>
      <PageHero title={v.n} sub={v.line} crumbs={[{ href: "/ventures/", label: "Ventures" }, { href: `/ventures/${v.slug}/`, label: v.short }]} />
      <section>
        <div className="wrap vh">
          <div>
            {v.logo ? <span className="lg"><img src={v.logo} alt={`${v.n} logo`} /></span> : null}
            <span className="kicker" style={{ display: "block" }}>{v.tag}</span>
            <h2>{v.line}</h2>
            <p className="lead">{v.d}</p>
            <ul className="ticks">{v.pts.map((p) => (<li key={p}><i className="hx" />{p}</li>))}</ul>
            <div className="cta" style={{ marginTop: 28 }}>
              <Link className="btn" href="/contact/">Enquire now</Link>
              <a className="btn ghost" href={isMail ? `mailto:${v.url}` : `https://${v.url}`} target={isMail ? undefined : "_blank"} rel="noopener noreferrer">{v.url}</a>
            </div>
          </div>
          <Pic src={v.img} label={v.n} sub={v.img ? undefined : v.tag} alt={v.n} logo={v.logo} />
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <h2 style={{ fontSize: "clamp(26px,3vw,36px)" }}>More from the hive.</h2>
          <div className="others">
            {others.map((o) => (<Link key={o.slug} href={`/ventures/${o.slug}/`}><small>{o.tag}</small><h3>{o.n}</h3></Link>))}
          </div>
          <div className="cta" style={{ marginTop: 24 }}><Link className="btn ghost" href="/ventures/">All ventures</Link></div>
        </div>
      </section>
    </>
  );
}
