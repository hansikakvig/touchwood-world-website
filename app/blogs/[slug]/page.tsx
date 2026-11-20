import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Pic from "@/components/Pic";
import { blogs } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() { return blogs.map((b) => ({ slug: b.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const b = blogs.find((x) => x.slug === slug);
  return { title: b?.t, description: b?.b[0] };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = blogs.find((x) => x.slug === slug);
  if (!b) notFound();
  const mins = Math.max(1, Math.round(b.b.join(" ").split(" ").length / 200));
  return (
    <>
      <PageHero long title={b.t} sub={`${mins} min read · Touchwood World`} crumbs={[{ href: "/blogs/", label: "Blogs" }]} />
      <section>
        <div className="wrap art">
          <Pic src={b.img} label="Touchwood Journal" alt={b.t} />
          {b.b.map((p) => <p key={p}>{p}</p>)}
          <div className="cta" style={{ marginTop: 28 }}><Link className="btn ghost" href="/blogs/">← All articles</Link></div>
        </div>
      </section>
    </>
  );
}
