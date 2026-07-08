"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { servicePillars } from "@/data/services";
import { siteConfig } from "@/data/site";
import ConsultationButton from "@/components/ConsultationButton";
import ServiceIcon from "@/components/ServiceIcon";

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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.jpeg" alt={siteConfig.name} width={48} height={48} className="h-12 w-12 rounded-full" priority />
          <span className="hidden text-lg font-bold tracking-tight text-navy sm:block">
            TRIGON <span className="font-medium text-slate-500">SERVICES</span>
          </span>
        </Link>

        <nav className="hidden items-center lg:flex">
          <Link href="/" className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-warmgray hover:text-navy">
            Home
          </Link>

          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <Link
              href="/services"
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-warmgray hover:text-navy"
            >
              Services
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
              </svg>
            </Link>

            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl">
                  {servicePillars.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-warmgray"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg gradient-brand text-white shadow-sm shadow-cyan/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        <ServiceIcon slug={s.slug} className="h-4 w-4" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-navy group-hover:text-cyan">{s.shortTitle}</span>
                        <span className="mt-0.5 line-clamp-1 text-xs text-slate-500">{s.summary}</span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="col-span-2 mt-2 flex items-center justify-center rounded-lg border border-dashed border-slate-200 py-2.5 text-sm font-medium text-navy hover:border-cyan hover:text-cyan"
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
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-warmgray hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <ConsultationButton className="rounded-full bg-gradient-to-r from-navy to-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90" />
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy lg:hidden"
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
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md gradient-brand text-white">
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
            <ConsultationButton className="w-full rounded-full bg-gradient-to-r from-navy to-cyan px-5 py-3 text-sm font-semibold text-white" />
          </div>
        </div>
      )}
    </header>
  );
}
