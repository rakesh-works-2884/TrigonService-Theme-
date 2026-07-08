import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import ImageShowcase from "@/components/decor/ImageShowcase";
import { siteConfig } from "@/data/site";
import { pexelsPhoto } from "@/lib/images";

export const metadata: Metadata = {
  title: "Get a Free Consultation",
  description: "Request a free consultation with Trigon Services' compliance experts.",
};

export default function ConsultationPage() {
  return (
    <div>
      <PageHero
        eyebrow="Free Consultation"
        title="Talk to a Compliance Expert — No Cost, No Obligation"
        description="Tell us about your business and what you need. We'll respond within 24 hours with clear next steps."
      />

      <ImageShowcase
        src={pexelsPhoto(6953779, 1600)}
        alt="Compliance expert discussing business needs with a client"
        tilt="left"
        badge={{ value: "24 hrs", label: "Average Response Time" }}
      />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <ContactForm />
        <p className="mt-6 text-center text-sm text-slate-500">
          Prefer to talk directly? Call us at{" "}
          <a href={`tel:${siteConfig.phoneHref}`} className="font-medium text-navy hover:text-cyan">
            {siteConfig.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-navy hover:text-cyan">
            {siteConfig.email}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
