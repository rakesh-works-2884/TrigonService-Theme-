export default function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="relative bg-heading py-20 text-white">
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent-light">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
        {description && <p className="mt-5 text-lg leading-relaxed text-slate-300">{description}</p>}
      </div>
    </section>
  );
}
