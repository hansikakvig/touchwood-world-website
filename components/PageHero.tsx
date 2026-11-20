import Link from "next/link";
import Words from "./Words";

type Crumb = { href: string; label: string };
export default function PageHero({ title, sub, crumbs = [], long = false }: { title: string; sub?: string; crumbs?: Crumb[]; long?: boolean }) {
  return (
    <header className="ph">
      <div className="bg" aria-hidden="true"><i className="hx" /><i className="hx" /><i className="hx" /><i className="hx" /></div>
      <div className="wrap">
        <nav className="crumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (<span key={c.href}>/ <Link href={c.href}>{c.label}</Link></span>))}
        </nav>
        <h1 className={long ? "long" : undefined}><Words text={title} /></h1>
        {sub ? <p>{sub}</p> : null}
      </div>
    </header>
  );
}
