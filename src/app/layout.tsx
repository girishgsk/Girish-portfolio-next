import type { Metadata, Viewport } from "next";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProfile, getSite, getSocials } from "@/lib/data";
import { getSiteUrl, websiteSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const url = getSiteUrl(site);

  return {
    metadataBase: new URL(url),
    title: { default: site.title, template: `%s | ${site.name}` },
    description: site.description,
    keywords: site.keywords,
    applicationName: site.name,
    authors: [{ name: site.name, url }],
    creator: site.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      locale: site.locale,
      title: site.title,
      description: site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
      ...(site.twitterHandle ? { creator: site.twitterHandle } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...(site.verification?.google
      ? { verification: { google: site.verification.google } }
      : {}),
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e14" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [site, profile, socials] = await Promise.all([getSite(), getProfile(), getSocials()]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-bg font-body text-fg antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only z-[60] rounded-md bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Navbar name={profile.name} logo={profile.logo} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer profile={profile} socials={socials} />
        </Providers>
        <JsonLd data={websiteSchema(site)} />
      </body>
    </html>
  );
}
