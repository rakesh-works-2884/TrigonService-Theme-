import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/decor/FadeIn";
import TiltCard from "@/components/decor/TiltCard";
import IconBadge from "@/components/decor/IconBadge";
import { getSiteSettings } from "@/lib/site-settings-store";
import { getAllServices } from "@/lib/services-store";
import { getSiteImages } from "@/lib/site-images-store";
import { buildPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("contact", {
    title: "Contact Us",
    description: "Get in touch with Trigon Services. Email, call, or visit our Greater Noida office.",
  });
}

export default async function ContactPage() {
  const [{ siteConfig }, services, siteImages] = await Promise.all([
    getSiteSettings(),
    getAllServices(),
    getSiteImages(),
  ]);

  return (
    <div>
      <PageHero eyebrow="Contact Us" title="Let's Talk About Your Compliance Needs" />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <FadeIn className="lg:col-span-3">
            <ContactForm services={services} />
          </FadeIn>

          <FadeIn delay={100} className="space-y-6 lg:col-span-2">
            <TiltCard className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md">
              <Image
                src={siteImages.contactSidebarImage}
                alt={siteImages.contactSidebarImageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </TiltCard>

            <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center gap-4 p-5 transition-colors duration-200 hover:bg-warmgray"
              >
                <IconBadge tone="soft" orbit>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </IconBadge>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">Email</span>
                  <span className="mt-0.5 block text-sm font-medium text-heading group-hover:text-primary">{siteConfig.email}</span>
                </span>
              </a>

              <div className="group flex items-start gap-4 p-5 transition-colors duration-200 hover:bg-warmgray">
                <IconBadge tone="soft" orbit>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-1.97.985a11.042 11.042 0 005.516 5.516l.985-1.97a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </IconBadge>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">Phone</span>
                  <a
                    href={`tel:${siteConfig.phoneHref}`}
                    className="mt-0.5 block text-sm font-medium text-heading hover:text-primary"
                  >
                    {siteConfig.phone}
                  </a>
                  {siteConfig.additionalPhones?.map((p) => (
                    <a
                      key={p.phoneHref}
                      href={`tel:${p.phoneHref}`}
                      className="mt-0.5 block text-sm font-medium text-heading hover:text-primary"
                    >
                      {p.phone}
                    </a>
                  ))}
                </span>
              </div>

              <div className="group flex items-start gap-4 p-5 transition-colors duration-200 hover:bg-warmgray">
                <IconBadge tone="soft" orbit>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </IconBadge>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">Office Address</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-heading">{siteConfig.address}</span>
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm transition-shadow duration-300 hover:shadow-lg">
              <iframe
                title="Trigon Services Office Location"
                src="https://www.google.com/maps?q=Gaur+City+Centre+Sector+4+Greater+Noida+West&output=embed"
                width="100%"
                height="220"
                loading="lazy"
                className="border-0"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
