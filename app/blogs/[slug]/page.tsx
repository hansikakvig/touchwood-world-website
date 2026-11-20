import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Pic from "@/components/Pic";
import { blogs, blogIntro, readMins } from "@/lib/data";
import BlogGrid from "@/components/BlogGrid";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return blogs.map((b) => ({ slug: b.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = blogs.find((x) => x.slug === slug);
  if (!b) return {};
  const description = blogIntro(b);
  return {
    title: b.t,
    description,
    keywords: b.kw,
    alternates: { canonical: `/blogs/${b.slug}/` },
    openGraph: { type: "article", title: b.t, description, url: `/blogs/${b.slug}/`, images: [{ url: b.img, alt: b.t }], ...(b.date ? { publishedTime: b.date } : {}), section: b.cat },
    twitter: { card: "summary_large_image", title: b.t, description, images: [b.img] },
  };
}

/** Renders [text](/path) links inside a paragraph. Only site-internal links are allowed. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\((\/[^)]*)\)$/);
        return m ? <Link key={i} href={m[2]}>{m[1]}</Link> : part;
      })}
    </>
  );
}

/** Turns the post's lines into headings, bullet lists and paragraphs. */
function Body({ lines }: { lines: string[] }) {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith("## ")) out.push(<h2 key={i}>{l.slice(3)}</h2>);
    else if (l.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) items.push(lines[i++].slice(2));
      i--;
      out.push(<ul key={i} className="art-list">{items.map((t) => <li key={t}><Inline text={t} /></li>)}</ul>);
    } else out.push(<p key={i}><Inline text={l} /></p>);
  }
  return <>{out}</>;
}

const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = blogs.find((x) => x.slug === slug);
  if (!b) notFound();
  const related = [...blogs.filter((x) => x.slug !== b.slug && x.cat === b.cat), ...blogs.filter((x) => x.slug !== b.slug && x.cat !== b.cat)].slice(0, 3);
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: b.t,
    description: blogIntro(b),
    image: `${SITE_URL}${b.img}`,
    ...(b.date ? { datePublished: b.date, dateModified: b.date } : {}),
    articleSection: b.cat,
    keywords: b.kw?.join(", "),
    mainEntityOfPage: `${SITE_URL}/blogs/${b.slug}/`,
    author: { "@type": "Organization", name: "Touchwood World", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Touchwood World", logo: { "@type": "ImageObject", url: `${SITE_URL}/logos/touchwood.png` } },
  };
  const sub = [b.cat, b.date ? fmt(b.date) : null, `${readMins(b)} min read`].filter(Boolean).join(" · ");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <PageHero long title={b.t} sub={sub} crumbs={[{ href: "/blogs/", label: "Blogs" }]} />
      <section>
        <article className="wrap art">
          <Pic src={b.img} label="Touchwood Journal" alt={b.t} />
          <Body lines={b.b} />
          <div className="cta" style={{ marginTop: 28 }}><Link className="btn ghost" href="/blogs/">← All articles</Link></div>
        </article>
      </section>
      <section className="alt">
        <div className="wrap">
          <span className="kicker">Keep reading</span>
          <h2 className="rv">More from the Touchwood Journal.</h2>
          <BlogGrid posts={related} />
        </div>
      </section>
    </>
  );
}
