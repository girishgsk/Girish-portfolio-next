import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NAV_ITEMS } from "@/config/navigation";
import { Hero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { getEducation, getExperience, getProfile, getSite, getSkills, getSocials } from "@/lib/data";
import { createPageMetadata, personSchema } from "@/lib/seo";

export async function generateMetadata() {
  return createPageMetadata("home");
}

export default async function HomePage() {
  const [site, profile, socials, skills, experience, education] = await Promise.all([
    getSite(),
    getProfile(),
    getSocials(),
    getSkills(),
    getExperience(),
    getEducation(),
  ]);
  const current = experience.find((e) => e.endDate === null) ?? experience[0];
  const explore = NAV_ITEMS.filter((item) => item.key !== "home");

  return (
    <>
      <Hero
        profile={profile}
        socials={socials}
        current={current ? { role: current.role, company: current.company } : undefined}
      />

      <section className="container-page py-16 sm:py-20" aria-labelledby="about-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="section-eyebrow">About</p>
            <h2 id="about-heading" className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              A bit about me
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-4 text-base leading-relaxed text-fg-secondary">
            {profile.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {profile.stats.map((stat, i) => (
            <li key={stat.label}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-surface p-6">
                  <p className="font-display text-4xl font-bold text-accent">{stat.value}</p>
                  <p className="mt-1 text-sm text-fg-secondary">{stat.label}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pb-4" aria-labelledby="explore-heading">
        <Reveal>
          <p className="section-eyebrow">Explore</p>
          <h2 id="explore-heading" className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Take a look around
          </h2>
        </Reveal>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {explore.map((item, i) => (
            <li key={item.href}>
              <Reveal delay={i * 0.08} className="h-full">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card"
                >
                  <span className="flex items-center justify-between font-display text-xl font-bold">
                    {item.label}
                    <ArrowUpRight
                      size={20}
                      className="text-fg-muted transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-fg-secondary">{item.description}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <JsonLd data={personSchema({ site, profile, socials, skills, experience, education })} />
    </>
  );
}
