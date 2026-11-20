import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Pic from "@/components/Pic";
import { blogs } from "@/lib/data";

export const metadata: Metadata = { title: "Blogs" };

export default function Blogs() {
  return (
    <>
      <PageHero title="Stories from the hive." sub="Ideas on travel, wellness, land and brands from the Touchwood family." crumbs={[{ href: "/blogs/", label: "Blogs" }]} />
      <section>
        <div className="wrap">
          <div className="bl">
            {blogs.map((b) => (
              <Link key={b.slug} href={`/blogs/${b.slug}/`} className="rv">
                <Pic src={b.img} label="Touchwood Journal" alt={b.t} />
                <div className="tx"><h3>{b.t}</h3><p>{b.b[0]}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
