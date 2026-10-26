"use client";

import { motion } from "framer-motion";
import { formatYears } from "@/lib/utils";
import type { SkillCategory } from "@/types";

interface Props {
  category: SkillCategory;
  /** The longest experience across all skills; used to scale every bar. */
  maxYears: number;
  index: number;
}

export function SkillCategoryCard({ category, maxYears, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/50"
    >
      <h2 className="font-display text-xl font-bold">{category.title}</h2>
      {category.description && <p className="mt-1 text-sm text-fg-secondary">{category.description}</p>}

      <ul className="mt-5 space-y-4">
        {category.skills.map((skill) => (
          <li key={skill.name}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium">{skill.name}</span>
              <span className="font-mono text-xs text-fg-muted">{formatYears(skill.years)}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-raised" aria-hidden>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.max(6, (skill.years / maxYears) * 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-accent to-glow"
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
