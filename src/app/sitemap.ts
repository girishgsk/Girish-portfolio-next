import type { MetadataRoute } from "next";
import { NAV_ITEMS } from "@/config/navigation";
import { getSite } from "@/lib/data";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSite();
  const base = getSiteUrl(site);

  return NAV_ITEMS.map((item) => ({
    url: `${base}${item.href === "/" ? "" : item.href}`,
    lastModified: new Date(site.lastUpdated),
    changeFrequency: item.href === "/" ? "monthly" : "monthly",
    priority: item.priority,
  }));
}
