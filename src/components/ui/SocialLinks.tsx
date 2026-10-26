import type { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaGlobe, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import type { Social, SocialIconName } from "@/types";

const ICONS: Record<SocialIconName, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  leetcode: SiLeetcode,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  email: FaEnvelope,
  website: FaGlobe,
};

export function SocialLinks({ socials, className = "" }: { socials: Social[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socials.map((social) => {
        const Icon = ICONS[social.icon] ?? FaGlobe;
        const external = social.url.startsWith("http");
        return (
          <li key={social.id}>
            <a
              href={social.url}
              aria-label={social.label}
              title={social.label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-fg-secondary transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              <Icon size={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
