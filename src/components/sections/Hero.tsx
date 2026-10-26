"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { RoleRotator } from "@/components/sections/RoleRotator";
import { SocialLinks } from "@/components/ui/SocialLinks";
import type { Profile, Social } from "@/types";
import profileImg from "../../../public/images/gsk_profile.png";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

interface HeroProps {
  profile: Profile;
  socials: Social[];
  current?: { role: string; company: string };
}

export function Hero({ profile, socials, current }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.3fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          {current && (
            <motion.p
              variants={item}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-fg-secondary"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
              </span>
              {current.role} · {current.company}
            </motion.p>
          )}

          <motion.p variants={item} className="mt-6 font-mono text-sm text-accent">
            Hi, I&apos;m
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-2 font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>
          <motion.p variants={item} className="mt-3 font-display text-2xl font-medium text-fg-secondary sm:text-3xl">
            <RoleRotator roles={profile.roles} />
          </motion.p>
          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-fg-secondary sm:text-lg">
            {profile.summary}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Link href="/experience" className="btn-primary">
              View experience <ArrowRight size={16} />
            </Link>
            <Link href="/projects" className="btn-outline">
              See projects
            </Link>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} download className="btn-outline">
                <Download size={16} /> Resume
              </a>
            )}
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <SocialLinks socials={socials} />
            <span className="inline-flex items-center gap-1.5 text-sm text-fg-muted">
              <MapPin size={15} /> {profile.location}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div
            className="absolute -inset-3 rounded-[2rem] border border-dashed border-line-strong"
            aria-hidden
          />
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
            <Image
              src={profileImg}
              alt={profile.avatarAlt}
              fill
              priority
              sizes="(min-width: 1024px) 384px, 80vw"
              className="object-cover"
            />
          </div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 rounded-xl border border-line bg-surface px-4 py-2.5 shadow-card"
          >
            <p className="font-display text-xl font-bold text-accent">{profile.stats[0]?.value}</p>
            <p className="text-xs text-fg-secondary">{profile.stats[0]?.label}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
