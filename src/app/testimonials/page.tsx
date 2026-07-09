import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ImageShowcase from "@/components/decor/ImageShowcase";
import FadeIn from "@/components/decor/FadeIn";
import { testimonials } from "@/data/site";
import { industries } from "@/data/industries";
import { pexelsPhoto } from "@/lib/images";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Hear from founders, HR leaders, and operators who trust Trigon Services with their compliance.",
};

export default function TestimonialsPage() {
  return (
    <div>
      <PageHero eyebrow="Testimonials" title="What Our Clients Say" />

      <ImageShowcase
        src={pexelsPhoto(36729674, 1600)}
        alt="Happy clients in a friendly meeting with their advisor"
        badge={{ value: "4.9/5", label: "Average Client Rating" }}
      />

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {testimonials.map((t) => (
              <div key={t.attribution} className="hover-tilt rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                <svg className="mb-4 h-7 w-7 text-accent/40" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8Zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8Z" />
                </svg>
                <p className="text-base leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-5 text-sm font-semibold text-primary">— {t.attribution}</p>
              </div>
            ))}
          </div>
        </FadeIn>
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
