import type { MetadataRoute } from "next";
import { ventures, blogs } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "about/", "hive/", "ventures/", "careers/", "social-work/", "blogs/", "contact/"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}/${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...ventures.map((v) => ({ url: `${SITE_URL}/ventures/${v.slug}/`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...blogs.map((b) => ({ url: `${SITE_URL}/blogs/${b.slug}/`, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
