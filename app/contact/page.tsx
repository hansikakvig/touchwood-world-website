import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { contact } from "@/lib/data";

export const metadata: Metadata = { title: "Contact" };
const tel = (p: string) => "tel:" + p.replace(/\s/g, "");
const topics = ["Work", "Partner", "Sell", "Invest", "Do business", "Social work"];

export default function Contact() {
  return (
    <>
      <PageHero title="Come say hello." sub="Visit our corporate office in Nashik, or reach out to the team." crumbs={[{ href: "/contact/", label: "Contact" }]} />
      <section>
        <div className="wrap">
          <span className="kicker">Get in touch</span>
          <h2 className="rv">Our Nashik office.</h2>
          <div className="contact">
            <div className="rv"><div className="hx" /><h3>Visit</h3><p>{contact.addr}</p>
              <p style={{ marginTop: 12 }}><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("JITO Business Bay, Mumbai Naka, Nashik")}`} target="_blank" rel="noopener noreferrer">Open in Maps →</a></p></div>
            <div className="rv"><div className="hx" style={{ background: "var(--honey)" }} /><h3>Call</h3>
              <p>{contact.phones.map((p) => (<span key={p}><a href={tel(p)}>{p}</a><br /></span>))}</p></div>
            <div className="rv"><div className="hx" style={{ background: "var(--bark)" }} /><h3>Write</h3>
              <p><a href={`mailto:${contact.email}`}>{contact.email}</a><br /><a href={`mailto:${contact.careers}`}>{contact.careers}</a> (careers)<br /><a href={tel(contact.cph)}>{contact.cph}</a></p></div>
          </div>
          <h3 style={{ marginTop: 48, fontSize: 22 }}>I want to…</h3>
          <div className="join">
            {topics.map((t) => (<a key={t} href={`mailto:${contact.email}?subject=${encodeURIComponent(t + " with Touchwood")}`}>{t}</a>))}
          </div>
        </div>
      </section>
    </>
  );
}
