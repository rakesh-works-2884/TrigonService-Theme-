import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import TiltCard from "@/components/decor/TiltCard";
import { getAllIndustries } from "@/lib/industries-store";
import { buildPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("industries", {
    title: "Industries We Serve",
    description:
      "Trigon Services supports startups, IT, manufacturing, healthcare, finance, education, retail, and service-based businesses with sector-specific compliance.",
  });
}

export default async function IndustriesPage() {
  const industries = await getAllIndustries();

  return (
    <div>
      <PageHero
        eyebrow="Industries We Serve"
        title="Compliance Expertise Across Every Sector"
        description="We tailor our compliance support to the regulatory realities of your specific industry."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((i) => (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1"
            >
              <TiltCard className="relative h-36 w-full overflow-hidden" intensity={8}>
                <Image
                  src={i.image}
                  alt={i.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent" />
              </TiltCard>
              <div className="p-6">
                <h2 className="text-base font-semibold text-heading group-hover:text-accent">{i.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{i.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
