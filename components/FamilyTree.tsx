/** Touchwood group tree: the group on top, three branches below (Bliss, Lifespaces, Beeyond). */
const Logo = ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} loading="lazy" />;

export default function FamilyTree() {
  return (
    <div className="ft">
      <div className="ft-root rv">
        <Logo src="/logos/touchwood.png" alt="Touchwood World" />
        <small>Group</small>
      </div>
      <div className="ft-stem rv" aria-hidden="true" />

      <div className="ft-cols">
        {/* 1. Bliss */}
        <div className="ft-col rv" style={{ "--d": 0 } as React.CSSProperties}>
          <div className="ft-node main"><Logo src="/logos/bliss.png" alt="Touchwood Bliss" /><small>Hospitality</small></div>
          <i className="ft-arrow" aria-hidden="true" />
          <div className="ft-node"><Logo src="/logos/fairytale.png" alt="Fairytale Weddings" /><small>Fairytale Weddings by Touchwood Bliss</small></div>
          <i className="ft-arrow" aria-hidden="true" />
          <div className="ft-node"><Logo src="/logos/bliss.png" alt="Bliss" /><small>Touchwood Bliss Membership</small></div>
        </div>

        {/* 2. Lifespaces */}
        <div className="ft-col rv" style={{ "--d": 1 } as React.CSSProperties}>
          <div className="ft-node main"><Logo src="/logos/lifespaces.png" alt="Touchwood Lifespaces" /><small>Real estate</small></div>
          <i className="ft-arrow" aria-hidden="true" />
          <div className="ft-list">
            <Logo src="/logos/mountainsyde.png" alt="Mountainsyde" />
            <Logo src="/logos/farmsyde.png" alt="Farmsyde" />
            <Logo src="/logos/hillsyde.png" alt="Hillsyde" />
            <Logo src="/logos/riversyde.png" alt="Riversyde" />
            <Logo src="/logos/countrysyde.png" alt="Countrysyde" />
            <span className="ft-text">Hillnest</span>
          </div>
        </div>

        {/* 3. Brand and Beeyond */}
        <div className="ft-col rv" style={{ "--d": 2 } as React.CSSProperties}>
          <div className="ft-node main"><Logo src="/logos/beeyond.png" alt="Beeyond" /><small>Branding &amp; systems</small></div>
          <i className="ft-arrow" aria-hidden="true" />
          <div className="ft-node"><Logo src="/logos/brand-beeyond.png" alt="Brand and Beeyond" /></div>
          <div className="ft-node"><Logo src="/logos/system-beeyond.png" alt="System and Beeyond" /></div>
        </div>
      </div>
    </div>
  );
}
