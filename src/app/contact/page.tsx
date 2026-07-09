import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/data/site";
import { pexelsPhoto } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Trigon Services. Email, call, or visit our Greater Noida office.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero eyebrow="Contact Us" title="Let's Talk About Your Compliance Needs" />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="img-tilt relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md">
              <Image
                src={pexelsPhoto(8297445, 800)}
                alt="Trigon Services team reviewing compliance documents together"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Email</h3>
              <a href={`mailto:${siteConfig.email}`} className="mt-2 block text-sm font-medium text-primary hover:text-accent">
                {siteConfig.email}
              </a>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Phone</h3>
              <a href={`tel:${siteConfig.phoneHref}`} className="mt-2 block text-sm font-medium text-primary hover:text-accent">
                {siteConfig.phone}
              </a>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Office Address</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{siteConfig.address}</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <iframe
                title="Trigon Services Office Location"
                src="https://www.google.com/maps?q=Gaur+City+Centre+Sector+4+Greater+Noida+West&output=embed"
                width="100%"
                height="220"
                loading="lazy"
                className="border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
