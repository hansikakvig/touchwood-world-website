"use client";
import { useEffect, useState } from "react";
import { interests, contact } from "@/lib/data";

const WA_NUMBER = "917030086800";

/** Enquiry form for a static site: it sends the enquiry as a pre-filled WhatsApp message (or email). No data is stored on our side. */
export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [kind, setKind] = useState(interests[0].k);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  // Pre-select the interest from /contact/?i=wedding
  useEffect(() => {
    const i = new URLSearchParams(location.search).get("i");
    if (i && interests.some((x) => x.k === i)) setKind(i);
  }, []);

  const it = interests.find((x) => x.k === kind)!;
  const body = () =>
    [`Hi Touchwood, I'd like to: ${it.label} (${it.to}).`, `Name: ${name.trim()}`, `Phone: ${phone.trim()}`, msg.trim() ? `Message: ${msg.trim()}` : ""]
      .filter(Boolean).join("\n");
  const valid = () => {
    if (name.trim().length < 2) return "Please enter your name.";
    if (!/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(phone.trim())) return "Please enter a valid 10-digit mobile number.";
    return "";
  };
  const send = (via: "wa" | "mail") => {
    const e = valid(); setErr(e); if (e) return;
    const url = via === "wa"
      ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(body())}`
      : `mailto:${contact.email}?subject=${encodeURIComponent(`Enquiry: ${it.label}`)}&body=${encodeURIComponent(body())}`;
    window.open(url, via === "wa" ? "_blank" : "_self", "noopener,noreferrer");
  };

  return (
    <form className="enq" id="enquire" onSubmit={(e) => { e.preventDefault(); send("wa"); }} noValidate>
      <div className="enq-head">
        <span className="kicker">Send an enquiry</span>
        <h2>What can we help you with?</h2>
        <p>Pick a topic, leave your number, and the right Touchwood team will reply, usually the same day.</p>
      </div>
      <fieldset className="enq-chips">
        <legend>I want to</legend>
        {interests.map((x) => (
          <label key={x.k} className={kind === x.k ? "on" : undefined}>
            <input type="radio" name="kind" value={x.k} checked={kind === x.k} onChange={() => setKind(x.k)} />
            {x.label}
          </label>
        ))}
      </fieldset>
      <div className="enq-row">
        <label>Your name<input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={80} required /></label>
        <label>Mobile number<input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" maxLength={16} placeholder="98765 43210" required /></label>
      </div>
      <label>Message (optional)<textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} maxLength={600} placeholder="Dates, budget, guests, anything that helps" /></label>
      {err ? <p className="enq-err" role="alert">{err}</p> : null}
      <div className="enq-actions">
        <button type="submit" className="btn">Send on WhatsApp</button>
        <button type="button" className="btn ghost" onClick={() => send("mail")}>Send by email</button>
      </div>
      <p className="enq-note">Goes to {it.to}. We only use your details to reply to this enquiry.</p>
    </form>
  );
}
