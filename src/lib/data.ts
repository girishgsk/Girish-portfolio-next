import "server-only";
import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  EducationData,
  Experience,
  Profile,
  Project,
  SiteConfig,
  SkillCategory,
  Social,
} from "@/types";

/**
 * All content lives in /public/data/*.json.
 * Edit a JSON file and the site updates, no component changes needed.
 * Files are read on the server at build time, so pages stay static and
 * fully crawlable.
 */
const DATA_DIR = path.join(process.cwd(), "public", "data");

async function readJson<T>(file: string): Promise<T> {
  const raw = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

export const getSite = cache(() => readJson<SiteConfig>("site.json"));
export const getProfile = cache(() => readJson<Profile>("profile.json"));
export const getSocials = cache(() => readJson<Social[]>("socials.json"));
export const getSkills = cache(() => readJson<SkillCategory[]>("skills.json"));
export const getExperience = cache(() => readJson<Experience[]>("experience.json"));
export const getProjects = cache(() => readJson<Project[]>("projects.json"));
export const getEducation = cache(() => readJson<EducationData>("education.json"));
