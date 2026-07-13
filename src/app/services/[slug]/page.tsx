import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getAllServices } from "@/lib/services-store";
import { getSiteSettings } from "@/lib/site-settings-store";
import PageHero from "@/components/PageHero";
import Accordion from "@/components/Accordion";
import ConsultationButton from "@/components/ConsultationButton";
import ImageShowcase from "@/components/decor/ImageShowcase";
import FadeIn from "@/components/decor/FadeIn";
import TiltCard from "@/components/decor/TiltCard";

export async function generateStaticParams() {
  const servicePillars = await getAllServices();
  return servicePillars.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.summary,
    openGraph: {
      title: service.ogTitle || service.metaTitle || service.title,
      description: service.ogDescription || service.metaDescription || service.summary,
      images: service.ogImage || service.image ? [service.ogImage || service.image] : undefined,
    },
    robots: service.noindex ? { index: false, follow: false } : undefined,
  };
}

export default async function ServicePillarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, servicePillars, { processSteps }] = await Promise.all([
    getServiceBySlug(slug),
    getAllServices(),
    getSiteSettings(),
  ]);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: {
      "@type": "LocalBusiness",
      name: "Trigon Services",
    },
    areaServed: "IN",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const related = servicePillars.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHero eyebrow="Service" title={service.title} description={service.intro} />

      <ImageShowcase src={service.image} alt={service.imageAlt} tilt="left" />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FadeIn>
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Scope Of Work</span>
              <h2 className="mt-2 text-xl font-bold text-heading">What&apos;s Included</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.subServices.map((sub, idx) => (
                  <FadeIn key={sub} delay={idx * 60}>
                    <div className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1">
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      <span className="relative pt-2 text-sm font-medium leading-relaxed text-slate-700">{sub}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h2 className="mt-14 text-xl font-bold text-heading">How It Works</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {processSteps.map((step, idx) => (
                  <div key={step.title} className="hover-tilt rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                    <span className="text-2xl font-bold text-accent/30">{String(idx + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 text-sm font-semibold text-heading">{step.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{step.description}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <h2 className="mt-14 text-xl font-bold text-heading">Frequently Asked Questions</h2>
              <div className="mt-6">
                <Accordion items={service.faq} />
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={100} className="space-y-6">
            <div className="hover-tilt rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Documents Required</h3>
              <ul className="mt-4 space-y-3">
                {service.documentsRequired.map((doc) => (
                  <li key={doc} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hover-tilt rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Estimated Timeline</h3>
              <p className="mt-3 text-sm font-medium text-primary">{service.timeline}</p>
            </div>

            <div className="bg-primary p-6 text-white shadow-sm">
              <h3 className="text-base font-semibold">Need help with {service.shortTitle}?</h3>
              <p className="mt-2 text-sm text-slate-200">Talk to our experts and get a clear scope and quote.</p>
              <ConsultationButton className="btn-brand mt-5 w-full bg-white !text-primary hover:bg-white/90" />
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={150}>
          <div className="mt-16 border-t border-slate-100 pt-12">
            <h2 className="text-xl font-bold text-heading">Related Services</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="hover-tilt group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1"
                >
                  <TiltCard className="relative h-24 w-full overflow-hidden" intensity={8}>
                    <Image
                      src={r.image}
                      alt={r.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </TiltCard>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-heading">{r.title}</h3>
                    <p className="mt-2 text-xs text-slate-500">{r.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
