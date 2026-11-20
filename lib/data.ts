import raw from "./content.json";

export type Venture = {
  n: string; tag: string; line: string; d: string; pts: string[]; url: string; slug: string;
  short: string; logo?: string; img?: string;
};

const ventureExtras: Record<string, { short: string; logo?: string; img?: string }> = {
  "touchwood-lifespaces": { short: "Lifespaces", logo: "/logos/lifespaces.png" },
  "touchwood-bliss": { short: "Bliss", logo: "/logos/bliss.png",  },
  "fairytale-weddings": { short: "Fairytale Wedding", logo: "/logos/fairytale.png",  },
  "harmony-retreat": { short: "Harmony Retreat", logo: "/logos/harmony-retreat.png",  },
  "harmony-movement": { short: "Harmony Movement", logo: "/logos/harmony-movement.png",  },
  "brand-and-beeyond": { short: "Brand & Beeyond", logo: "/logos/brandandbeeyond.png" },
  "touchwood-foundation": { short: "Foundation" },
};

export const ventures: Venture[] = raw.biz.map((b) => ({ ...b, ...ventureExtras[b.slug] }));

const blogImg: Record<string, string | undefined> = {
  "why-igatpuri-is-the-next-wellness-destination": "/images/hive-ambience-5.webp",
  "what-is-a-self-love-retreat": "/images/hive-ambience-2.webp",
  "choosing-a-plot-in-igatpuri-and-nashik": "/images/hive-ambience-12.webp",
  "how-brand-and-beeyond-builds-brands": "/images/brandandbeeyond-hive.jpg",
};
export const blogs = raw.blogs.map((b) => ({ ...b, img: blogImg[b.slug] }));

export const { team, strat, sys, stats, careers, social, contact } = raw;
export const reach = raw.home.reach;
export const sectors = raw.home.sectors as [string, string, string[]][];

export const pillars = [
  { k: "biz", t: "Businesses", s: "7 ventures", href: "/ventures/", d: "Real estate, hospitality, weddings, wellness, branding and a foundation. Seven ventures, one philosophy." },
  { k: "ppl", t: "People", s: "Team first", href: "/about/", d: "A founder-led, employee-first culture with a Chief Happiness Officer at the heart of it." },
  { k: "str", t: "Strategy", s: "Vision", href: "/about/", d: "Inspiration, aspiration, expedition and promise: one direction that every venture follows." },
  { k: "sys", t: "Systems", s: "How we work", href: "/about/", d: "Nine working principles, from customer experience to the Happy Supplier Policy." },
];

export const heroSlides = [
  { tag: "The Hive", t: "Our Nashik office, built like a honeycomb: open, green and full of light.", img: "/images/hive-ambience-5.webp" },
  { tag: "Our people", t: "A team-first culture with a Chief Happiness Officer at its heart.", img: "/images/hive-ourpeople-10.webp" },
  { tag: "Seven ventures", t: "Real estate, hospitality, wellness, branding and social work, all from one hive.", img: "/images/hive-ourpeople-3.webp" },
  { tag: "Our culture", t: "We dream, we believe, we achieve: optimism shared with our community.", img: "/images/hive-ourpeople-6.webp" },
];

export const family = [
  ["/logos/touchwood.png", "Touchwood World", "Group"],
  ["/logos/lifespaces.png", "Lifespaces", "Real estate"],
  ["/logos/bliss.png", "Bliss", "Hospitality"],
  ["/logos/fairytale.png", "Fairytale Weddings", "Celebrations"],
  ["/logos/harmony-retreat.png", "Harmony Retreat", "Wellness"],
  ["/logos/harmony-movement.png", "Harmony Movement", "Women's wellness"],
  ["/logos/brandandbeeyond.png", "Brand and Beeyond", "Branding agency"],
];

export const testimonials = [
  { q: "Good initiative plan. And it’s more helpful.", n: "Akshay Kulthe" },
  { q: "Excellent team work. I wish you the greatest services.", n: "Tejas Yadav" },
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/ventures/", label: "Ventures", sub: true },
  { href: "/careers/", label: "Careers" },
  { href: "/social-work/", label: "Social Work" },
  { href: "/blogs/", label: "Blogs" },
  { href: "/contact/", label: "Contact" },
];

/** Official website URL for a venture, or undefined when it has none (e.g. an email contact). */
export const siteUrl = (url: string) => (url.includes("@") ? undefined : `https://${url}`);
