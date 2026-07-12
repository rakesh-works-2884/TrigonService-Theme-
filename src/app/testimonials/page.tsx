import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ImageShowcase from "@/components/decor/ImageShowcase";
import FadeIn from "@/components/decor/FadeIn";
import IconBadge from "@/components/decor/IconBadge";
import { getSiteSettings } from "@/lib/site-settings-store";
import { getAllIndustries } from "@/lib/industries-store";
import { pexelsPhoto } from "@/lib/images";
import { buildPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("testimonials", {
    title: "Testimonials",
    description: "Hear from founders, HR leaders, and operators who trust Trigon Services with their compliance.",
  });
}

export default async function TestimonialsPage() {
  const [{ testimonials }, industries] = await Promise.all([getSiteSettings(), getAllIndustries()]);

  return (
    <div>
      <PageHero eyebrow="Testimonials" title="What Our Clients Say" />

      <ImageShowcase
        src={pexelsPhoto(36729674, 1600)}
        alt="Happy clients in a friendly meeting with their advisor"
        badge={{ value: "4.9/5", label: "Average Client Rating" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {testimonials.map((t, idx) => (
            <FadeIn key={t.attribution} delay={(idx % 2) * 100}>
              <div className="group relative h-full rounded-3xl p-[2px] transition-transform duration-500 hover:-translate-y-1.5">
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[conic-gradient(from_0deg,var(--color-primary),var(--color-accent),var(--color-secondary),var(--color-primary))]" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-2px)] border border-slate-100 bg-white p-8 shadow-sm transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-heading/10">
                  <svg
                    className="pointer-events-none absolute -left-2 -top-3 h-20 w-20 text-primary/[0.05]"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8Zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8Z" />
                  </svg>

                  <div className="relative flex items-center gap-4">
                    <IconBadge orbit>
                      <span className="text-base font-bold">{t.attribution.charAt(0)}</span>
                    </IconBadge>
                    <div className="flex gap-0.5 text-accent">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3-5.4 3 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <p className="relative mt-5 flex-1 text-base leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</p>
                  <p className="relative mt-5 text-sm font-semibold text-primary">— {t.attribution}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-warmgray py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-center text-2xl font-bold text-heading sm:text-3xl">Trusted Across Industries</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600">
              These are just a few of the sectors where our clients have put us to the test.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {industries.map((i) => (
                <Link
                  key={i.slug}
                  href={`/industries/${i.slug}`}
                  className="hover-tilt rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-primary shadow-sm hover:border-accent hover:text-accent"
                >
                  {i.title}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
