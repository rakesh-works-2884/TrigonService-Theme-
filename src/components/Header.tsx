"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { servicePillars } from "@/data/services";
import { siteConfig } from "@/data/site";
import ConsultationButton from "@/components/ConsultationButton";
import ServiceIcon from "@/components/ServiceIcon";
import SocialIcons from "@/components/SocialIcons";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/industries", label: "Industries" },
  { href: "/why-choose-us", label: "Why Us" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="hidden bg-primary-dark text-white lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 text-white/80 transition hover:text-white">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {siteConfig.email}
            </a>
            <span className="flex items-center gap-1.5 text-white/80">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mon – Sat: 9:00 AM – 6:00 PM
            </span>
          </div>
          <SocialIcons size="sm" />
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.jpeg"
            alt={siteConfig.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
            priority
          />
        </Link>

        <nav className="hidden items-center lg:flex">
          <Link href="/" className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-warmgray hover:text-primary">
            Home
          </Link>

          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <Link
              href="/services"
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-warmgray hover:text-primary"
            >
              Services
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
              </svg>
            </Link>

            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 border border-slate-100 bg-white p-6 shadow-2xl">
                  {servicePillars.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-warmgray"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-white">
                        <ServiceIcon slug={s.slug} className="h-4 w-4" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-heading group-hover:text-primary">{s.shortTitle}</span>
                        <span className="mt-0.5 line-clamp-1 text-xs text-body">{s.summary}</span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="col-span-2 mt-2 flex items-center justify-center rounded-lg border border-dashed border-slate-200 py-2.5 text-sm font-medium text-primary hover:border-primary"
                  >
                    View all services →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-warmgray hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-warmgray hover:text-primary"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <a href={`tel:${siteConfig.phoneHref}`} className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-1.97.985a11.042 11.042 0 005.516 5.516l.985-1.97a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] uppercase tracking-wide text-slate-400">Call Anytime</span>
              <span className="text-sm font-semibold text-heading">{siteConfig.phone}</span>
            </span>
          </a>

          <ConsultationButton className="btn-brand" />
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-primary lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <Link href="/" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-warmgray">
            Home
          </Link>
          <Link href="/services" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-warmgray">
            Services
          </Link>
          <div className="ml-3 border-l border-slate-100 pl-3">
            {servicePillars.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-warmgray"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-primary text-white">
                  <ServiceIcon slug={s.slug} className="h-3.5 w-3.5" />
                </span>
                {s.shortTitle}
              </Link>
            ))}
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-warmgray"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 border-t border-slate-100 pt-4">
            <ConsultationButton className="btn-brand w-full text-center" />
          </div>
        </div>
      )}
    </header>
  );
}
