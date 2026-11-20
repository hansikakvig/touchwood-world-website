import { testimonials } from "@/lib/data";

const initials = (n: string) => n.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

/** Reviews in a continuously sliding strip (pauses on hover). The list is rendered twice for a seamless loop. */
export default function Testimonials() {
  return (
    <>
      <div className="rvw-badges">
        <span><b>4.8 ★</b> Touchwood Bliss · 12,000+ guest reviews</span>
        <span><b>★★★★★</b> reviews from Touchwood Lifespaces customers</span>
      </div>
      <div className="rvw" tabIndex={0} aria-label="Customer reviews (tap or hover to pause)">
        <div className="rvw-track">
          {[...testimonials, ...testimonials].map((t, i) => (
            <figure className="rvw-card" key={i} aria-hidden={i >= testimonials.length || undefined}>
              {t.v === "Touchwood Lifespaces" ? <div className="rvw-stars" aria-label="5 out of 5 stars">★★★★★</div> : <div className="rvw-q" aria-hidden="true">“</div>}
              <blockquote>“{t.q}”</blockquote>
              <figcaption>
                <span className="rvw-av hx" aria-hidden="true">{initials(t.n)}</span>
                <span><b>{t.n}</b><small>{t.r ? `${t.r} · ` : ""}{t.v}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </>
  );
}
