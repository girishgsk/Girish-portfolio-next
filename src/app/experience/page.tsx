import { ExternalLink } from "lucide-react";
import { Award, GraduationCap } from "lucide-react";
import { ExperienceTimeline, type TimelineItem } from "@/components/sections/ExperienceTimeline";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { getEducation, getExperience, getSite } from "@/lib/data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { formatDuration, formatMonthYear, monthsBetween } from "@/lib/utils";

export async function generateMetadata() {
  return createPageMetadata("experience");
}

export default async function ExperiencePage() {
  const [site, experience, education] = await Promise.all([getSite(), getExperience(), getEducation()]);

  // Pre-compute labels on the server so server and client output always match.
  const items: TimelineItem[] = experience.map((exp) => ({
    ...exp,
    isCurrent: exp.endDate === null,
    period: `${formatMonthYear(exp.startDate)} – ${exp.endDate ? formatMonthYear(exp.endDate) : "Present"}`,
    duration: formatDuration(monthsBetween(exp.startDate, exp.endDate)),
  }));

  const workProjects = experience.flatMap((exp) => exp.projects.map((project) => ({ project, company: exp.company })));

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Where I've worked"
        description="My professional journey, the products I built along the way, and where I studied."
      />

      <section className="container-page py-12" aria-labelledby="work-heading">
        <h2 id="work-heading" className="mb-8 font-display text-2xl font-bold">
          Work experience
        </h2>
        <ExperienceTimeline items={items} />
      </section>

      <section className="container-page py-8" aria-labelledby="work-projects-heading">
        <Reveal>
          <p className="section-eyebrow">Built at work</p>
          <h2 id="work-projects-heading" className="mt-2 font-display text-2xl font-bold">
            Projects I built in the company
          </h2>
        </Reveal>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workProjects.map(({ project, company }, i) => (
            <li key={project.id}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <ProjectCard project={project} badge={company} showHighlights />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page py-12" aria-labelledby="education-heading">
        <h2 id="education-heading" className="mb-8 flex items-center gap-2 font-display text-2xl font-bold">
          <GraduationCap size={24} className="text-accent" /> Education
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {education.education.map((e, i) => (
            <li key={e.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-surface p-5">
                  <h3 className="font-display text-lg font-bold">{e.institution}</h3>
                  <p className="mt-1 text-sm text-fg-secondary">{e.degree}</p>
                  <p className="mt-2 font-mono text-xs text-fg-muted">
                    {formatMonthYear(e.startDate)} – {formatMonthYear(e.endDate)} · {e.grade}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <h2 className="mb-8 mt-14 flex items-center gap-2 font-display text-2xl font-bold">
          <Award size={24} className="text-accent" /> Certifications
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {education.certifications.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-surface p-5">
                  <h3 className="font-display text-lg font-bold">{c.title}</h3>
                  <p className="mt-1 font-mono text-xs text-accent">{c.issuer}</p>
                  <p className="mt-2 text-sm text-fg-secondary">{c.description}</p>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                    >
                      <ExternalLink size={14} /> View credential
                    </a>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <JsonLd
        data={breadcrumbSchema(site, [
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
        ])}
      />
    </>
  );
}
