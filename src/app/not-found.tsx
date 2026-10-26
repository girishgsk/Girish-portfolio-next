import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-start justify-center gap-4 py-20">
      <p className="section-eyebrow">404</p>
      <h1 className="font-display text-4xl font-bold sm:text-5xl">Page not found</h1>
      <p className="max-w-md text-fg-secondary">
        The page you are looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn-primary mt-2">
        Back to home
      </Link>
    </section>
  );
}
