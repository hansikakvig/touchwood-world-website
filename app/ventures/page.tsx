import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VentureExplorer from "@/components/VentureExplorer";

export const metadata: Metadata = { title: "Ventures" };

export default function Ventures() {
  return (
    <>
      <PageHero title="Seven ventures. One hive." sub="Real estate, hospitality, weddings, wellness, branding and social work. Pick a cell to explore." crumbs={[{ href: "/ventures/", label: "Ventures" }]} />
      <section><div className="wrap"><VentureExplorer /></div></section>
    </>
  );
}
