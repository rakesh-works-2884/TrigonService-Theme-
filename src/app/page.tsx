import Image from "next/image";
import Link from "next/link";
import { servicePillars } from "@/data/services";
import { industries } from "@/data/industries";
import { trustStats, whyChooseUs, processSteps, blogCategories, siteConfig } from "@/data/site";
import { getAllPosts } from "@/lib/blog-store";
import { pexelsPhoto } from "@/lib/images";
import ConsultationButton from "@/components/ConsultationButton";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import ServiceIcon from "@/components/ServiceIcon";
import WhyChooseIcon from "@/components/WhyChooseIcon";
import DotGrid from "@/components/decor/DotGrid";
import FloatingStatCard from "@/components/decor/FloatingStatCard";

export default async function Home() {
  const blogPosts = (await getAllPosts()).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-brand text-white">
        <div className="animate-float-slow pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div
          className="animate-float-slow pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-cyan-light/20 blur-3xl"
          style={{ animationDelay: "-3s" }}
        />
        <div
          className="animate-float-slow pointer-events-none absolute right-1/4 top-1/3 h-56 w-56 rounded-full bg-white/5 blur-2xl"
          style={{ animationDelay: "-6s" }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-light">
              India&apos;s End-to-End Compliance Partner
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Building Compliant, Scalable, and Future-Ready Businesses
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
              {siteConfig.description}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ConsultationButton className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy shadow-lg transition hover:bg-warmgray" />
              <Link
                href="/services"
                className="rounded-full border border-white/30 px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </div>
          <div className="perspective-1000 relative hidden lg:block">
            <DotGrid className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 opacity-30" />
            <div className="animate-spin-slow pointer-events-none absolute -right-10 bottom-10 h-28 w-28 rounded-full border-2 border-dashed border-white/25" />
            <div className="absolute inset-0 translate-x-5 translate-y-5 rotate-6 rounded-3xl bg-gradient-to-br from-cyan-light/40 to-white/10 blur-[1px]" />
            <div className="tilt-card relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl shadow-navy-dark/40 ring-1 ring-white/20">
              <Image
                src={pexelsPhoto(8297445, 1000)}
                alt="Trigon Services team reviewing compliance documents together"
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
            </div>
            <FloatingStatCard
              value="98%"
              label="On-Time Filing Rate"
              className="absolute -bottom-6 -left-8 z-10 hidden xl:flex"
            />
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <DotGrid className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 opacity-40" color="#0ea5e9" />
        <DotGrid className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 opacity-40" color="#0b3d6d" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          {trustStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-navy sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="pb-6 text-center text-xs text-slate-400">
          * Figures shown are placeholders pending confirmation.
        </p>
      </section>

      {/* Service pillars */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            One Partner for Every Compliance Need
          </h2>
          <p className="mt-4 text-slate-600">
            From incorporation to ongoing filings, we cover the full lifecycle of business compliance under one roof.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicePillars.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan/40 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-brand text-white shadow-lg shadow-cyan/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <ServiceIcon slug={s.slug} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-navy group-hover:text-cyan">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Sectors we support */}
      <section className="bg-warmgray py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Sectors We Support</h2>
            <p className="mt-4 text-slate-600">Compliance expertise tailored to how your industry actually operates.</p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="rounded-xl border border-slate-200 bg-white px-5 py-6 text-center text-sm font-medium text-navy shadow-sm transition hover:border-cyan hover:text-cyan"
              >
                {i.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Why Choose Trigon Services</h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="group text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand text-white shadow-lg shadow-cyan/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <WhyChooseIcon iconKey={item.key} className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process timeline */}
      <section className="bg-navy-dark py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How We Work</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => (
              <div key={step.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="text-4xl font-bold text-cyan-light/40">{String(idx + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">What Our Clients Say</h2>
        </div>
        <div className="mt-14">
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Blog teaser */}
      <section className="bg-warmgray py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Blog &amp; Insights</h2>
              <p className="mt-3 text-slate-600">{blogCategories.join(" · ")}</p>
            </div>
            <Link href="/blog" className="shrink-0 text-sm font-semibold text-cyan hover:underline">
              View all articles →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center gradient-brand">
                      <ServiceIcon slug="legal-documentation" className="h-10 w-10 text-white/70" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-cyan">{post.category}</span>
                  <h3 className="mt-3 text-base font-semibold text-navy">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="gradient-brand py-16 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Let&apos;s Get Started</h2>
          <p className="max-w-xl text-slate-200">
            Talk to our compliance experts today and find out exactly what your business needs.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <ConsultationButton className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy shadow-lg hover:bg-warmgray" />
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
