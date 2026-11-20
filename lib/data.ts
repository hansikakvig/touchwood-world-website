import raw from "./content.json";

export type Venture = {
  n: string; tag: string; line: string; d: string; pts: string[]; url: string; slug: string;
  short: string; logo?: string; img?: string;
};

const ventureExtras: Record<string, { short: string; logo?: string; img?: string }> = {
  "touchwood-lifespaces": { short: "Lifespaces", logo: "/logos/lifespaces.png", img: "/images/ventures/lifespaces.webp" },
  "touchwood-bliss": { short: "Bliss", logo: "/logos/bliss.png", img: "/images/ventures/bliss.webp" },
  "fairytale-weddings": { short: "Fairytale Wedding", logo: "/logos/fairytale.png", img: "/images/ventures/fairytale-weddings.webp" },
  "harmony-retreat": { short: "Harmony Retreat", logo: "/logos/harmony-retreat.png", img: "/images/ventures/harmony-retreat.webp" },
  "harmony-movement": { short: "Harmony Movement", logo: "/logos/harmony-movement.png", img: "/images/ventures/harmony-movement.webp" },
  "brand-and-beeyond": { short: "Brand & Beeyond", logo: "/logos/brandandbeeyond.png", img: "/images/ventures/brand-and-beeyond.webp" },
  "touchwood-foundation": { short: "Foundation", img: "/images/hive-ourpeople-3.webp" },
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

/** Real reviews, as published on touchwoodworld.com and touchwoodlifespaces.com. */
export const testimonials = [
  { q: "Touchwood Lifespaces is honest and trustworthy. I have done many property deals with them and I’m very happy. If you are looking for NA plots in Igatpuri or the best NA plots near Mumbai, they are the right choice.", n: "Sachin Bedade", v: "Touchwood Lifespaces" },
  { q: "It was really good experience dealing with team from Touchwood. Nice property in nature, good knowledge of team regarding real estate market, immediate clarification of queries, all clear documentation, good support during purchase process were major highlights.", n: "Pankaj Shingote", v: "Touchwood Lifespaces" },
  { q: "Good initiative plan. And it’s more helpful.", n: "Akshay Kulthe", v: "Touchwood World" },
  { q: "We were looking for land for sale in Igatpuri to build our dream holiday home, and Touchwood Lifespaces exceeded our expectations! The plots are beautifully located, surrounded by nature, and just a short drive from Mumbai.", n: "Rajesh Marathe", r: "Chartered Accountant", v: "Touchwood Lifespaces" },
  { q: "Finding plots near Mumbai that offer both peace and investment potential felt impossible until we discovered Touchwood Lifespaces. Their NA plots are clear-titled, well-developed, and give us the chance to create the bungalow we always dreamed of.", n: "Mohini Desai", r: "Entrepreneur", v: "Touchwood Lifespaces" },
  { q: "Great services and ideas regarding real estate investments. Would love to work together in future also.", n: "Chintan Nahar", v: "Touchwood Lifespaces" },
  { q: "We recently bought a plot in Igatpuri at Touchwood Lifespaces, and the experience has been amazing! Pure nature, great infrastructure, and seamless service.", n: "Sneha & Manish Desai", r: "Fitness Coach", v: "Touchwood Lifespaces" },
  { q: "Excellent team work. I wish you the greatest services.", n: "Tejas Yadav", r: "Manager", v: "Touchwood World" },
  { q: "Touchwood Lifespaces helped us secure a resort plot in Igatpuri where we plan to build our dream getaway. It’s more than just land, it’s a legacy we are excited to create.", n: "Sumit Das", r: "Pulmonologist", v: "Touchwood Lifespaces" },
] as { q: string; n: string; r?: string; v: string }[];

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

/** Touchwood Hive office photos (from touchwoodworld.com/touchwoodhive.html). */
export type Shot = { src: string; cat: "Ambience" | "Our people"; alt: string };

const amb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13];
const ppl = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const hiveShots: Shot[] = [
  { src: "/images/hive-office.webp", cat: "Ambience", alt: "The Touchwood Hive office, Nashik" },
  ...amb.map((n) => ({ src: `/images/hive-ambience-${n}.webp`, cat: "Ambience" as const, alt: "Touchwood Hive ambience" })),
  ...ppl.map((n) => ({ src: `/images/hive-ourpeople-${n}.webp`, cat: "Our people" as const, alt: "Our people at the Touchwood Hive" })),
];
// Interleave the two sets so "All" alternates office and people shots.
const A = hiveShots.filter((s) => s.cat === "Ambience"), P = hiveShots.filter((s) => s.cat === "Our people");
export const hiveMixed = Array.from({ length: Math.max(A.length, P.length) }, (_, i) => [A[i], P[i]]).flat().filter(Boolean) as Shot[];
