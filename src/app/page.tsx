import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllServices } from "@/lib/services-store";
import { getAllIndustries } from "@/lib/industries-store";
import { getSiteSettings } from "@/lib/site-settings-store";
import { getAllPosts } from "@/lib/blog-store";
import { pexelsPhoto } from "@/lib/images";
import { buildPageMetadata } from "@/lib/page-metadata";
import ConsultationButton from "@/components/ConsultationButton";
import ServiceCard from "@/components/ServiceCard";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import HeroSlider from "@/components/HeroSlider";
import IndustriesShowcase from "@/components/IndustriesShowcase";
import ServiceIcon from "@/components/ServiceIcon";
import WhyChooseIcon from "@/components/WhyChooseIcon";
import TeamIcon from "@/components/TeamIcon";
import ImageReveal from "@/components/decor/ImageReveal";
import TiltCard from "@/components/decor/TiltCard";
import IconBadge from "@/components/decor/IconBadge";

export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await getSiteSettings();
  return buildPageMetadata("home", {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  });
}

export default async function Home() {
  const [servicePillars, industries, settings, allPosts] = await Promise.all([
    getAllServices(),
    getAllIndustries(),
    getSiteSettings(),
    getAllPosts(),
  ]);
  const { siteConfig, trustStats, whyChooseUs, coreValues, team, blogCategories } = settings;
  const blogPosts = allPosts.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <HeroSlider />

      {/* 2. About / Intro */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <ImageReveal className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="absolute -left-6 -top-6 h-full w-full bg-light" />
            <TiltCard className="relative aspect-[4/5] w-full overflow-hidden shadow-xl">
              <Image
                src={pexelsPhoto(8124232, 1000)}
                alt="Trigon Services compliance team holding client documents"
                fill
                sizes="(min-width: 1024px) 400px, 80vw"
                className="object-cover"
              />
            </TiltCard>
            <TiltCard className="absolute -bottom-8 -right-6 z-10 h-32 w-44 overflow-hidden shadow-xl ring-4 ring-white sm:h-36 sm:w-52" intensity={8}>
              <Image
                src={pexelsPhoto(33175650, 500)}
                alt="Business handshake sealing a partnership"
                fill
                sizes="200px"
                className="object-cover"
              />
            </TiltCard>
            <div className="absolute -top-6 left-1/2 z-10 hidden -translate-x-1/2 bg-white px-6 py-4 text-center shadow-xl sm:block">
              <p className="text-2xl font-extrabold text-primary">{trustStats[0].value}</p>
              <p className="text-xs text-body">{trustStats[0].label}</p>
            </div>
          </ImageReveal>

          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">About Trigon Services</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              We&apos;re Your Partner in Compliant, Scalable Growth
            </h2>
            <p className="mt-5 leading-relaxed text-body">{siteConfig.description}</p>
            <ul className="mt-6 space-y-3">
              {coreValues.slice(0, 3).map((v) => (
                <li key={v.title} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    ✓
                  </span>
                  <span className="text-sm text-body">
                    <strong className="font-semibold text-heading">{v.title}:</strong> {v.description}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn-brand mt-8 inline-block">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Services, 3-up */}
      <section className="bg-warmgray py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">What We Do</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              One Partner for Every Compliance Need
            </h2>
            <p className="mt-4 text-body">
              From incorporation to ongoing filings, we cover the full lifecycle of business compliance under one roof.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {servicePillars.slice(0, 3).map((s) => (
              <ServiceCard key={s.slug} slug={s.slug} title={s.title} summary={s.summary} image={s.image} imageAlt={s.imageAlt} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="btn-brand-outline !border-primary !text-primary hover:!bg-primary hover:!text-white">
              View All 11 Services
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Dark feature band */}
      <section className="bg-heading py-20 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-secondary">What We&apos;re Offering</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Dealing in All Professional Compliance Services
            </h2>
          </div>
          <p className="leading-relaxed text-slate-300">
            Whether you&apos;re incorporating your first company or managing compliance across a dozen states, our
            in-house team of lawyers, Company Secretaries, and Chartered Accountants handles it end-to-end — so you
            never have to juggle multiple vendors for a single business need.
          </p>
        </div>
      </section>

      {/* 5. Icon-box row, 5-up */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">Why Trigon</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">Why Choose Trigon Services</h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="group text-center">
              <div className="flex justify-center">
                <IconBadge orbit size="lg">
                  <WhyChooseIcon iconKey={item.key} className="h-7 w-7" />
                </IconBadge>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-heading">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Gradient CTA banner */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <ImageReveal>
            <TiltCard className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl">
              <Image
                src={pexelsPhoto(3184292, 1000)}
                alt="Founders reviewing a compliance checklist together"
                fill
                sizes="(min-width: 1024px) 500px, 90vw"
                className="object-cover"
              />
            </TiltCard>
          </ImageReveal>
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We&apos;re Ready to Simplify Your Compliance!</h2>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                  ✓
                </span>
                <span className="text-sm text-white/90">Compliance filings handled by lawyers, CAs, and CS in-house</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                  ✓
                </span>
                <span className="text-sm text-white/90">Receive a free consultation before you commit to anything</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                  ✓
                </span>
                <span className="text-sm text-white/90">Pan-India support with a dedicated compliance manager</span>
              </li>
            </ul>
            <ConsultationButton className="btn-brand mt-8 bg-white !text-primary hover:bg-warmgray" />
          </div>
        </div>
      </section>

      {/* 7. Industries We Serve (repurposed "Completed Projects" slider) */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Who We Serve</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">Industries We Serve</h2>
            </div>
            <p className="max-w-md text-sm text-body">
              Compliance expertise tailored to how your industry actually operates — nine sectors, one partner.
            </p>
          </div>
          <div className="mt-12">
            <IndustriesShowcase industries={industries} />
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="bg-warmgray py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Client Testimonials</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">What They&apos;re Talking?</h2>
          </div>
          <div className="mt-14">
            <TestimonialsCarousel testimonials={settings.testimonials} />
          </div>
        </div>
      </section>

      {/* 10. Team */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">Our Expert People</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">Meet Our Professional Team</h2>
          <p className="mt-4 text-body">A multi-disciplinary team so every compliance need is handled by the right expert.</p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.key} className="hover-tilt group border border-light bg-white p-6 text-center shadow-sm">
              <div className="flex justify-center">
                <IconBadge orbit size="lg">
                  <TeamIcon iconKey={member.key} className="h-7 w-7" />
                </IconBadge>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-heading">{member.role}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Dark CTA band (video embed replaced with a static photo) */}
      <section className="bg-heading py-20 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <ImageReveal>
            <TiltCard className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={pexelsPhoto(3182773, 1000)}
                alt="Compliance manager on a client call"
                fill
                sizes="(min-width: 1024px) 500px, 90vw"
                className="object-cover"
              />
            </TiltCard>
          </ImageReveal>
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-secondary">Do You Need a Meeting?</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Save Time and Money with a Trusted Compliance Partner
            </h2>
            <p className="mt-5 max-w-md text-slate-300">
              Book a free 30-minute consultation and get a clear scope, timeline, and quote before you commit to
              anything.
            </p>
            <ConsultationButton className="btn-brand mt-8" />
          </div>
        </div>
      </section>

      {/* 12+13. Trust stats (compressed) */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
          {trustStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 14. Blog */}
      <section className="bg-warmgray py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">What&apos;s Happening</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">News &amp; Articles</h2>
              <p className="mt-3 text-body">{blogCategories.join(" · ")}</p>
            </div>
            <Link href="/blog" className="shrink-0 text-sm font-semibold text-primary hover:underline">
              View all articles →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden bg-white shadow-sm transition hover:shadow-lg"
              >
                <TiltCard className="relative h-40 w-full overflow-hidden" intensity={8}>
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-accent">
                      <ServiceIcon slug="legal-documentation" className="h-10 w-10 text-white/70" />
                    </div>
                  )}
                </TiltCard>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{post.category}</span>
                  <h3 className="mt-3 text-base font-semibold text-heading">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-body">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Final CTA */}
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Looking for the Best Compliance Partner?</h2>
          <p className="max-w-xl text-white/85">
            Talk to our compliance experts today and find out exactly what your business needs.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <ConsultationButton className="btn-brand bg-white !text-primary hover:bg-warmgray" />
            <a href={`tel:${siteConfig.phoneHref}`} className="btn-brand-outline">
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
