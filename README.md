# Girish Kumbhar - Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion. Fully static, SEO-first.

## Run it

```bash
yarn install
yarn dev        # http://localhost:3000
yarn build      # production build
yarn start      # serve the production build
```

## Edit content (no code changes needed)

All content lives in `public/data/`:

| File              | Controls                                                    |
| ----------------- | ----------------------------------------------------------- |
| `site.json`       | SEO: site title, description, keywords, per-page meta, URL  |
| `profile.json`    | Name, headline, intro text, stats, avatar, logo, resume     |
| `socials.json`    | Social links (home hero + footer)                           |
| `skills.json`     | Skill categories and years of experience                    |
| `experience.json` | Jobs (timeline) and the projects built at each company      |
| `projects.json`   | Academic project cards                                      |
| `education.json`  | Education and certifications                                |

- **Add a skill/job/project:** copy an existing object in the array and edit it.
- **Delete one:** remove the object.
- **Current job:** set `"endDate": null`.
- **Hide a button:** set `liveUrl` / `githubUrl` to `null`.
- **Swap images:** replace files in `public/images/` (keep the names) or change the path in JSON.
  Remote image URLs need `images.remotePatterns` in `next.config.ts`.
- **Resume button:** put your PDF at `public/resume.pdf` and set `"resumeUrl": "/resume.pdf"` in `profile.json`.

## Add a new page

1. Create `src/app/<route>/page.tsx` (copy `skills/page.tsx` as a template).
2. Add an entry to `src/config/navigation.ts` (navbar, footer, sitemap update automatically).
3. Add a `pages.<key>` entry in `public/data/site.json` and the key to `PageKey` in `src/types/index.ts`.

## Theme

Colours for light and dark live in `src/app/globals.css` (`:root` and `.dark`).

## SEO checklist

Per-page title/description/canonical/Open Graph/Twitter, JSON-LD (WebSite, Person, BreadcrumbList),
`sitemap.xml`, `robots.txt`, generated social share image, one `<h1>` per page, semantic landmarks, skip link.

Before deploying: set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) or `url` in `site.json`,
then submit `/sitemap.xml` in Google Search Console (and paste the verification code in `site.json`).
