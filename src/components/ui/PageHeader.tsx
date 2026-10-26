import { Reveal } from "@/components/ui/Reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

/** The single <h1> of every inner page. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="relative border-b border-line">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-page relative py-14 sm:py-20">
        <Reveal>
          <p className="section-eyebrow">{eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-secondary sm:text-lg">
            {description}
          </p>
        </Reveal>
      </div>
    </header>
  );
}
