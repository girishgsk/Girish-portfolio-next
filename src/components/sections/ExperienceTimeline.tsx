"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import type { Experience } from "@/types";

export interface TimelineItem extends Experience {
  period: string;
  duration: string;
  isCurrent: boolean;
}

/**
 * LinkedIn-style vertical "tree line". The line fills with the accent
 * gradient as the visitor scrolls down the list.
 */
export function ExperienceTimeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute bottom-2 left-[11px] top-2 w-px bg-line-strong md:left-[15px]" />
      <motion.div
        aria-hidden
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-accent to-glow md:left-[15px]"
      />

      <ol className="space-y-10">
        {items.map((exp) => (
          <motion.li
            key={exp.id}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative pl-10 md:pl-14"
          >
            {/* Node on the tree line */}
            <span
              aria-hidden
              className={`absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-bg md:h-8 md:w-8 ${
                exp.isCurrent ? "border-accent" : "border-line-strong"
              }`}
            >
              {exp.isCurrent && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/30" />
              )}
              <Briefcase size={13} className={exp.isCurrent ? "text-accent" : "text-fg-muted"} />
            </span>

            <div className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40 md:p-6">
              <h3 className="font-display text-xl font-bold">{exp.role}</h3>
              <p className="mt-1 text-sm font-medium">
                {exp.companyUrl ? (
                  <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )}
                <span className="text-fg-muted"> · {exp.employmentType}</span>
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-fg-muted">
                <span>
                  {exp.period} · {exp.duration}
                </span>
                {exp.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} /> {exp.location}
                  </span>
                )}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-fg-secondary">{exp.summary}</p>

              <ul className="mt-4 space-y-2 text-sm text-fg-secondary">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {exp.tech.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>

              {exp.projects.length > 0 && (
                <p className="mt-5 border-t border-line pt-4 text-sm text-fg-secondary">
                  <span className="font-mono text-xs uppercase tracking-wider text-fg-muted">Projects: </span>
                  {exp.projects.map((p, i) => (
                    <span key={p.id}>
                      <a href={`#${p.id}`} className="font-medium text-accent hover:underline">
                        {p.title}
                      </a>
                      {i < exp.projects.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
