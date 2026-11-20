import Link from "next/link";
import { ventures, contact } from "@/lib/data";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="fcols">
          <div>
            <span className="lg"><img src="/logos/touchwood.png" alt="Touchwood" /></span>
            <p>We Dream. We Believe. We Achieve.</p>
            <p>{contact.addr}</p>
            <SocialIcons />
          </div>
          <div>
            <h4>Ventures</h4>
            {ventures.map((v) => (<Link key={v.slug} href={`/ventures/${v.slug}/`}>{v.n}</Link>))}
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/about/">About</Link><Link href="/hive/">Touchwood Hive</Link><Link href="/careers/">Careers</Link><Link href="/social-work/">Social Work</Link><Link href="/blogs/">Blogs</Link><Link href="/contact/">Contact</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`mailto:${contact.careers}`}>{contact.careers} (careers)</a>
            <a href="tel:+917030086800">+91 70300 86800</a>
          </div>
        </div>
        <div className="copy"><span>© {new Date().getFullYear()} Touchwood World. All rights reserved.</span><span>Optimistic by nature.</span></div>
      </div>
    </footer>
  );
}
