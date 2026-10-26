import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "@/config/navigation";
import { SocialLinks } from "@/components/ui/SocialLinks";
import type { Profile, Social } from "@/types";

export function Footer({ profile, socials }: { profile: Profile; socials: Social[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Image src={profile.logo} alt="" width={32} height={32} className="rounded-lg" />
            <span className="font-display text-base font-bold">{profile.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-secondary">
            {profile.headline}. {profile.summary}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-fg-muted">Pages</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-fg-secondary transition hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-fg-muted">Connect</h2>
          <SocialLinks socials={socials} className="mt-4" />
          <a
            href={`mailto:${profile.email}`}
            className="mt-4 inline-block text-sm text-fg-secondary transition hover:text-accent"
          >
            {profile.email}
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-fg-muted sm:flex-row">
          <p>
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
