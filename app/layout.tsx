import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import WhatsApp from "@/components/WhatsApp";
import { SITE_URL } from "@/lib/site";
import { contact, ventures, siteUrl, socials } from "@/lib/data";

export const metadata: Metadata = {
  title: { default: "Touchwood World – Optimistic by nature", template: "%s · Touchwood World" },
  description: "Touchwood World: a Nashik group of ventures in real estate, hospitality, weddings, wellness, branding and social work.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
  openGraph: { type: "website", siteName: "Touchwood World", locale: "en_IN", url: "./" },
  twitter: { card: "summary_large_image" },
};

/** Business details for search engines (schema.org Organization). */
const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Touchwood World",
  slogan: "Optimistic by nature",
  url: SITE_URL,
  logo: `${SITE_URL}/logos/touchwood.png`,
  email: contact.email,
  telephone: contact.phones[0].replace(/\s/g, ""),
  address: { "@type": "PostalAddress", streetAddress: "JITO Business Bay, Second Floor, Office No. 12, Near Sandeep Hotel, Mumbai Naka", addressLocality: "Nashik", addressRegion: "Maharashtra", addressCountry: "IN" },
  sameAs: socials.filter((s) => s.url).map((s) => s.url),
  subOrganization: ventures.filter((v) => siteUrl(v.url)).map((v) => ({ "@type": "Organization", name: v.n, url: siteUrl(v.url) })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "production" ? <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self' mailto:; upgrade-insecure-requests" /> : null}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd).replace(/</g, "\\u003c") }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsApp />
        <RevealObserver />
      </body>
    </html>
  );
}
