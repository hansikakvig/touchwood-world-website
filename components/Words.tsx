/** Splits a headline into words that rise in one after another. `accentFrom` colours words from that index onward. */
export default function Words({ text, accentFrom }: { text: string; accentFrom?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span className="w" key={i}>
          <span style={{ ["--i" as string]: i }} className={accentFrom !== undefined && i >= accentFrom ? "accent" : undefined}>{w}</span>
        </span>
      ))}
    </>
  );
}
