import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import ImageShowcase from "@/components/decor/ImageShowcase";
import { getSiteSettings } from "@/lib/site-settings-store";
import { getAllServices } from "@/lib/services-store";
import { getSiteImages } from "@/lib/site-images-store";
import { buildPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("consultation", {
    title: "Get a Free Consultation",
    description: "Request a free consultation with Trigon Services' compliance experts.",
  });
}

export default async function ConsultationPage() {
  const [{ siteConfig }, services, siteImages] = await Promise.all([
    getSiteSettings(),
    getAllServices(),
    getSiteImages(),
  ]);

  return (
    <div>
      <PageHero
        eyebrow="Free Consultation"
        title="Talk to a Compliance Expert — No Cost, No Obligation"
        description="Tell us about your business and what you need. We'll respond within 24 hours with clear next steps."
      />

      <ImageShowcase
        src={siteImages.consultationShowcaseImage}
        alt={siteImages.consultationShowcaseImageAlt}
        tilt="left"
        badge={{ value: "24 hrs", label: "Average Response Time" }}
      />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <ContactForm services={services} />
        <p className="mt-6 text-center text-sm text-slate-500">
          Prefer to talk directly? Call us at{" "}
          <a href={`tel:${siteConfig.phoneHref}`} className="font-medium text-primary hover:text-accent">
            {siteConfig.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-primary hover:text-accent">
            {siteConfig.email}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
