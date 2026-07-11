import Image from "next/image";
import Link from "next/link";
import { getAllServices } from "@/lib/services-store";
import { getAllIndustries } from "@/lib/industries-store";
import { getSiteSettings } from "@/lib/site-settings-store";
import NewsletterForm from "@/components/NewsletterForm";
import SocialIcons from "@/components/SocialIcons";

export default async function Footer() {
  const year = new Date().getFullYear();
  const [services, industries, settings] = await Promise.all([
    getAllServices(),
    getAllIndustries(),
    getSiteSettings(),
  ]);
  const { siteConfig } = settings;

  return (
    <footer className="border-t border-slate-100 bg-primary-dark text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/logo.jpeg"
                alt={siteConfig.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{siteConfig.description}</p>
            <div className="mt-5">
              <SocialIcons socials={siteConfig.socials} />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-slate-400 hover:text-accent-light">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Industries</h4>
            <ul className="mt-4 space-y-2.5">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}`} className="text-sm text-slate-400 hover:text-accent-light">
                    {i.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Company</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: "/about", label: "About Us" },
                { href: "/why-choose-us", label: "Why Choose Us" },
                { href: "/pricing", label: "Pricing" },
                { href: "/testimonials", label: "Testimonials" },
                { href: "/blog", label: "Blog & Insights" },
                { href: "/consultation", label: "Get Free Consultation" },
                { href: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-accent-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Get in Touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-accent-light">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-accent-light">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="leading-relaxed">{siteConfig.address}</li>
            </ul>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {year} Trigon Services. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-slate-500">
            <Link href="/privacy-policy" className="hover:text-accent-light">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-accent-light">
              Terms of Use
            </Link>
            <Link href="/refund-policy" className="hover:text-accent-light">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
