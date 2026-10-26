export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-raised px-2 py-0.5 font-mono text-xs text-fg-secondary">
      {children}
    </span>
  );
}
