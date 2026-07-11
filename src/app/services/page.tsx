import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import { getAllServices } from "@/lib/services-store";
import { buildPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("services", {
    title: "Services",
    description:
      "Explore Trigon Services' full range of compliance services — business registration, tax filing, licenses, labour law, certifications, IPR, and more.",
  });
}

export default async function ServicesPage() {
  const servicePillars = await getAllServices();

  return (
    <div>
      <PageHero
        eyebrow="What We Do"
        title="Compliance Services for Every Stage of Your Business"
        description="Eleven service pillars covering everything from incorporation to international compliance — pick a category to see the full breakdown."
      />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
          {servicePillars.map((s) => (
            <ServiceCard key={s.slug} slug={s.slug} title={s.title} summary={s.summary} image={s.image} imageAlt={s.imageAlt} />
          ))}
        </div>
      </section>
    </div>
  );
}
