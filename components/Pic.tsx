type Props = { src?: string; label?: string; sub?: string; className?: string; alt?: string; logo?: string; children?: React.ReactNode; style?: React.CSSProperties };

/** Photo with a branded fallback: a venture logo in a white hexagon, or a gradient label. */
export default function Pic({ src, label, sub, className = "", alt = "", logo, children, style }: Props) {
  const showLogo = !src && logo;
  return (
    <figure className={`pic ${showLogo ? "has-logo " : ""}${className}`} style={{ margin: 0, ...style }}>
      {src ? <img src={src} alt={alt || label || ""} loading="lazy" /> : null}
      {showLogo ? (
        <span className={`lgx hx${logo!.includes("fairytale") ? " dark" : ""}`}><img src={logo} alt={alt || label || ""} /></span>
      ) : label && (!src || sub) ? (
        <span className="ph-label">{label}{sub ? <small>{sub}</small> : null}</span>
      ) : null}
      {children}
    </figure>
  );
}
