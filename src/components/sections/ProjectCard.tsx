import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  /** Small label above the title, e.g. the company name */
  badge?: string;
  showHighlights?: boolean;
}

/**
 * Whole card is clickable (stretched link to the live URL, or GitHub if there
 * is no live URL). The footer buttons sit above the stretched link.
 */
export function ProjectCard({ project, badge, showHighlights = false }: ProjectCardProps) {
  const primaryUrl = project.liveUrl ?? project.githubUrl;

  return (
    <article
      id={project.id}
      className="group relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card"
    >
      <div className="relative aspect-video overflow-hidden border-b border-line bg-raised">
        <Image
          src={project.image}
          alt={project.imageAlt ?? `${project.title} preview`}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {(badge || project.subtitle) && (
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            {[badge, project.subtitle].filter(Boolean).join(" · ")}
          </p>
        )}

        <h3 className="font-display text-xl font-bold leading-snug">
          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>

        <p className="text-sm leading-relaxed text-fg-secondary">{project.description}</p>

        {showHighlights && project.highlights && project.highlights.length > 0 && (
          <ul className="space-y-1.5 text-sm text-fg-secondary">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tech.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        {(project.liveUrl || project.githubUrl) && (
          <div className="relative z-10 flex gap-4 border-t border-line pt-4 text-sm">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
              >
                <ExternalLink size={15} /> Live site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-fg-secondary hover:text-accent"
              >
                <FaGithub size={15} /> Source code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
