import { ProjectCard } from "@/components/sections/ProjectCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { getProjects, getSite } from "@/lib/data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return createPageMetadata("projects");
}

export default async function ProjectsPage() {
  const [site, projects] = await Promise.all([getSite(), getProjects()]);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Academic projects"
        description="Things I built while learning and experimenting. Select a card to open the project."
      />
      <section className="container-page py-12" aria-label="Project list">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <li key={project.id}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <ProjectCard project={project} showHighlights />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <JsonLd
        data={breadcrumbSchema(site, [
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
    </>
  );
}
