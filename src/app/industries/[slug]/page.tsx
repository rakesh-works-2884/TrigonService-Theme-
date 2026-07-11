import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustryBySlug, getAllIndustries } from "@/lib/industries-store";
import { getAllServices } from "@/lib/services-store";
import { getSiteSettings } from "@/lib/site-settings-store";
import PageHero from "@/components/PageHero";
import ConsultationButton from "@/components/ConsultationButton";
import ImageShowcase from "@/components/decor/ImageShowcase";
import FadeIn from "@/components/decor/FadeIn";
import TiltCard from "@/components/decor/TiltCard";

export async function generateStaticParams() {
  const industries = await getAllIndustries();
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: industry.metaTitle || industry.title,
    description: industry.metaDescription || industry.description,
    openGraph: {
      title: industry.ogTitle || industry.metaTitle || industry.title,
      description: industry.ogDescription || industry.metaDescription || industry.description,
      images: industry.ogImage || industry.image ? [industry.ogImage || industry.image] : undefined,
    },
    robots: industry.noindex ? { index: false, follow: false } : undefined,
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [industry, servicePillars, settings] = await Promise.all([
    getIndustryBySlug(slug),
    getAllServices(),
    getSiteSettings(),
  ]);
  if (!industry) notFound();

  const relatedServices = servicePillars.filter((s) => industry.keyServices.includes(s.title));
  const { industriesChallengesImage, industriesChallengesImageAlt } = settings;

  return (
    <div>
      <PageHero eyebrow="Industry" title={industry.title} description={industry.description} />

      <ImageShowcase src={industry.image} alt={industry.imageAlt} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {industry.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
                <p className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <h2 className="mt-16 text-xl font-bold text-heading">Services Most Relevant to {industry.title}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="hover-tilt rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-accent/40 hover:shadow-xl"
              >
                <h3 className="text-sm font-semibold text-heading">{s.title}</h3>
                <p className="mt-2 text-xs text-slate-500">{s.summary}</p>
              </Link>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="mt-16 grid grid-cols-1 gap-10 rounded-3xl border border-slate-100 bg-warmgray p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
            <TiltCard className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={industriesChallengesImage}
                alt={industriesChallengesImageAlt}
                fill
                sizes="(min-width: 1024px) 500px, 100vw"
                className="object-cover"
              />
            </TiltCard>
            <div>
              <h2 className="text-xl font-bold text-heading">Common Challenges We Help {industry.title} Solve</h2>
              <ul className="mt-6 space-y-4">
                {industry.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed text-slate-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        {industry.testimonial && (
          <FadeIn delay={100}>
            <div className="hover-tilt mt-16 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <p className="text-lg font-medium leading-relaxed text-slate-700">&ldquo;{industry.testimonial.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-primary">— {industry.testimonial.attribution}</p>
            </div>
          </FadeIn>
        )}

        <FadeIn delay={150}>
          <div className="mt-16 bg-primary p-8 text-center text-white sm:p-10">
            <h3 className="text-xl font-bold">Let&apos;s discuss what {industry.title.toLowerCase()} businesses need</h3>
            <ConsultationButton className="btn-brand mt-6 bg-white !text-primary hover:bg-warmgray" />
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
