import { JsonLd } from "@/components/seo/JsonLd";
import { SkillCategoryCard } from "@/components/sections/SkillCategoryCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSite, getSkills } from "@/lib/data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return createPageMetadata("skills");
}

export default async function SkillsPage() {
  const [site, categories] = await Promise.all([getSite(), getSkills()]);
  const maxYears = Math.max(...categories.flatMap((c) => c.skills.map((s) => s.years)));
  const total = categories.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="Technical skills"
        description={`${total} technologies across ${categories.length} areas, with the years of hands-on experience behind each one.`}
      />
      <div className="container-page grid gap-6 py-12 md:grid-cols-2">
        {categories.map((category, index) => (
          <SkillCategoryCard key={category.id} category={category} maxYears={maxYears} index={index} />
        ))}
      </div>
      <JsonLd
        data={breadcrumbSchema(site, [
          { name: "Home", path: "/" },
          { name: "Skills", path: "/skills" },
        ])}
      />
    </>
  );
}
