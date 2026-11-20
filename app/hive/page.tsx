import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HiveGallery from "@/components/HiveGallery";

export const metadata: Metadata = { title: "Touchwood Hive", description: "Photos of the Touchwood Hive, our honeycomb-inspired office in Nashik, and the people who work there." };

export default function Hive() {
  return (
    <>
      <PageHero title="Inside the Touchwood Hive." sub="Our Nashik office, built like a honeycomb: open, green and full of light, and the people who make it buzz." crumbs={[{ href: "/about/", label: "About" }, { href: "/hive/", label: "Touchwood Hive" }]} />
      <section><div className="wrap"><HiveGallery /></div></section>
    </>
  );
}
