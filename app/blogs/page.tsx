import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BlogGrid from "@/components/BlogGrid";
import { blogs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blogs",
  description: "The Touchwood Journal: guides on NA plots in Igatpuri, destination weddings near Mumbai, family getaways, wellness retreats and life at the Touchwood Hive.",
  alternates: { canonical: "/blogs/" },
};

export default function Blogs() {
  return (
    <>
      <PageHero title="Stories from the hive." sub="Guides on land, travel, weddings, wellness and brands from the Touchwood family." crumbs={[{ href: "/blogs/", label: "Blogs" }]} />
      <section><div className="wrap"><BlogGrid posts={blogs} /></div></section>
    </>
  );
}
