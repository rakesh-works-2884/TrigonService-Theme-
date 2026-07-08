import Image from "next/image";
import Link from "next/link";
import { servicePillars } from "@/data/services";
import { industries } from "@/data/industries";
import { siteConfig } from "@/data/site";
import NewsletterForm from "@/components/NewsletterForm";
import SocialIcons from "@/components/SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-navy-dark text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.jpeg" alt={siteConfig.name} width={40} height={40} className="h-10 w-10 rounded-full" />
              <span className="text-base font-bold text-white">TRIGON SERVICES</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{siteConfig.description}</p>
            <div className="mt-5">
              <SocialIcons />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {servicePillars.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-slate-400 hover:text-cyan-light">
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
                  <Link href={`/industries/${i.slug}`} className="text-sm text-slate-400 hover:text-cyan-light">
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
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-cyan-light">
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
                <a href={`mailto:${siteConfig.email}`} className="hover:text-cyan-light">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-cyan-light">
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
            <Link href="/privacy-policy" className="hover:text-cyan-light">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-cyan-light">
              Terms of Use
            </Link>
            <Link href="/refund-policy" className="hover:text-cyan-light">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
