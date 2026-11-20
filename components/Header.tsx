"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, ventures } from "@/lib/data";

export default function Header() {
  const path = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);

  useEffect(() => { setOpen(false); setDd(false); }, [path]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setDd(false); } };
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, []);

  const isAct = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <div className="util">
        <div className="wrap">
          <span>Nashik, Maharashtra · <a href="tel:+917030086800">+91 70300 86800</a></span>
          <a className="hide-sm" href="mailto:culture@touchwoodworld.com">culture@touchwoodworld.com</a>
        </div>
      </div>
      <header className="hdr">
        <div className="wrap">
          <Link className="logo" href="/" aria-label="Touchwood World home"><img src="/logos/touchwood.png" alt="Touchwood" /></Link>
          <nav className={`nav-wrap${open ? " open" : ""}`} id="main-nav" aria-label="Main">
            <ul className="menu">
              {nav.map((n) =>
                n.sub ? (
                  <li key={n.href} className={`dd${dd ? " open" : ""}`} onMouseLeave={() => setDd(false)}>
                    <button className={`dd-btn${isAct(n.href) ? " act" : ""}`} aria-expanded={dd} aria-haspopup="true" onClick={() => setDd((v) => !v)}>
                      {n.label} ▾
                    </button>
                    <ul className="sub">
                      <li><Link href="/ventures/">All ventures</Link></li>
                      {ventures.map((v) => (<li key={v.slug}><Link href={`/ventures/${v.slug}/`}>{v.n}</Link></li>))}
                    </ul>
                  </li>
                ) : (
                  <li key={n.href}><Link href={n.href} className={isAct(n.href) ? "act" : undefined} aria-current={isAct(n.href) ? "page" : undefined}>{n.label}</Link></li>
                )
              )}
            </ul>
          </nav>
          <div className="hdr-cta">
            <Link className="btn" href="/contact/#enquire">Enquire now</Link>
            <button className="burger" aria-label="Menu" aria-controls="main-nav" aria-expanded={open} onClick={() => setOpen((v) => !v)}><span /></button>
          </div>
        </div>
      </header>
    </>
  );
}
