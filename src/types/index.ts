export type PageKey = "home" | "skills" | "experience" | "projects";

export interface PageSeo {
  title: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  locale: string;
  twitterHandle?: string;
  lastUpdated: string;
  keywords: string[];
  verification?: { google?: string };
  pages: Record<PageKey, PageSeo>;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  firstName: string;
  headline: string;
  roles: string[];
  summary: string;
  intro: string[];
  location: string;
  email: string;
  avatar: string;
  avatarAlt: string;
  logo: string;
  resumeUrl: string | null;
  stats: Stat[];
}

export type SocialIconName =
  | "github"
  | "linkedin"
  | "leetcode"
  | "instagram"
  | "twitter"
  | "email"
  | "website";

export interface Social {
  id: string;
  label: string;
  url: string;
  icon: SocialIconName;
}

export interface Skill {
  name: string;
  years: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  description?: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  highlights?: string[];
  tech: string[];
  image: string;
  imageAlt?: string;
  liveUrl: string | null;
  githubUrl: string | null;
}

export interface Experience {
  id: string;
  role: string;
  employmentType: string;
  company: string;
  companyUrl: string | null;
  location: string | null;
  /** "YYYY-MM" */
  startDate: string;
  /** "YYYY-MM", or null when this is the current role */
  endDate: string | null;
  summary: string;
  highlights: string[];
  tech: string[];
  projects: Project[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  description: string;
  url: string | null;
}

export interface EducationData {
  education: EducationEntry[];
  certifications: Certification[];
}
