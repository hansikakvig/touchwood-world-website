import Link from "next/link";
import Pic from "./Pic";
import { blogIntro, readMins, type Blog } from "@/lib/data";

export default function BlogGrid({ posts }: { posts: Blog[] }) {
  return (
    <div className="bl">
      {posts.map((p) => (
        <Link key={p.slug} href={`/blogs/${p.slug}/`} className="rv">
          <Pic src={p.img} label="Touchwood Journal" alt={p.t} />
          <div className="tx">
            {p.cat ? <span className="bl-cat">{p.cat} · {readMins(p)} min read</span> : null}
            <h3>{p.t}</h3>
            <p>{blogIntro(p)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
