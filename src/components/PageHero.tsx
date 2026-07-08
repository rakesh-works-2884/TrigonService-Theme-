export default function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="relative overflow-hidden gradient-brand py-20 text-white">
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-light">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
        {description && <p className="mt-5 text-lg leading-relaxed text-slate-200">{description}</p>}
      </div>
    </section>
  );
}
