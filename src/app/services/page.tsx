import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ServiceIcon from "@/components/ServiceIcon";
import { servicePillars } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Trigon Services' full range of compliance services — business registration, tax filing, licenses, labour law, certifications, IPR, and more.",
};

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="What We Do"
        title="Compliance Services for Every Stage of Your Business"
        description="Eleven service pillars covering everything from incorporation to international compliance — pick a category to see the full breakdown."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {servicePillars.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-cyan/40 hover:shadow-lg"
            >
              <div className="relative h-32 w-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
              </div>
              <div className="absolute left-6 top-32 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl gradient-brand text-white shadow-lg shadow-cyan/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <ServiceIcon slug={s.slug} />
              </div>
              <div className="flex flex-1 flex-col p-6 pt-8">
                <h2 className="text-base font-semibold text-navy group-hover:text-cyan">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.summary}</p>
                <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {s.subServices.length} services
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
