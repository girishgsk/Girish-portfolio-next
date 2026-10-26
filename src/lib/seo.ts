import type { Metadata } from "next";
import { NAV_ITEMS } from "@/config/navigation";
import { getSite } from "@/lib/data";
import type {
  EducationData,
  Experience,
  PageKey,
  Profile,
  SiteConfig,
  SkillCategory,
  Social,
} from "@/types";

export function getSiteUrl(site: SiteConfig) {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "");
}

/** Builds complete per-page metadata (canonical, Open Graph, Twitter) from site.json. */
export async function createPageMetadata(key: PageKey): Promise<Metadata> {
  const site = await getSite();
  const page = site.pages[key];
  const nav = NAV_ITEMS.find((item) => item.key === key);
  const path = nav?.href ?? "/";
  const fullTitle = key === "home" ? page.title : `${page.title} | ${site.name}`;
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${site.name} portfolio`,
  };

  return {
    title: key === "home" ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: key === "home" ? "profile" : "website",
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description: page.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
      images: [image.url],
      ...(site.twitterHandle ? { creator: site.twitterHandle } : {}),
    },
  };
}

/* ---------- JSON-LD structured data ---------- */

export function websiteSchema(site: SiteConfig) {
  const url = getSiteUrl(site);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url,
    description: site.description,
    inLanguage: site.locale.replace("_", "-"),
  };
}

export function personSchema(args: {
  site: SiteConfig;
  profile: Profile;
  socials: Social[];
  skills: SkillCategory[];
  experience: Experience[];
  education: EducationData;
}) {
  const { site, profile, socials, skills, experience, education } = args;
  const url = getSiteUrl(site);
  const current = experience.find((e) => e.endDate === null) ?? experience[0];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url,
    image: `${url}${profile.avatar}`,
    jobTitle: current?.role ?? profile.headline,
    description: profile.summary,
    address: { "@type": "PostalAddress", addressCountry: profile.location },
    ...(current
      ? { worksFor: { "@type": "Organization", name: current.company } }
      : {}),
    alumniOf: education.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
    })),
    knowsAbout: skills.flatMap((c) => c.skills.map((s) => s.name)),
    sameAs: socials
      .filter((s) => s.url.startsWith("http"))
      .map((s) => s.url),
  };
}

export function breadcrumbSchema(
  site: SiteConfig,
  trail: Array<{ name: string; path: string }>,
) {
  const url = getSiteUrl(site);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
