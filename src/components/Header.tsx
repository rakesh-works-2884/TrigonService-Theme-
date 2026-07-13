"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ConsultationButton from "@/components/ConsultationButton";
import ServiceIcon from "@/components/ServiceIcon";
import SocialIcons from "@/components/SocialIcons";
import IconBadge from "@/components/decor/IconBadge";
import type { SiteConfig } from "@/lib/site-settings-store";
import type { ServicePillar } from "@/lib/services-store";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/industries", label: "Industries" },
  { href: "/why-choose-us", label: "Why Us" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ siteConfig, services }: { siteConfig: SiteConfig; services: ServicePillar[] }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    // Hysteresis (different on/off thresholds) stops the header from flickering
    // when scroll position hovers right at a single boundary value.
    const evaluate = () => {
      ticking = false;
      setScrolled((prev) => {
        const y = window.scrollY;
        if (prev) return y > 8;
        return y > 32;
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 200);
  };

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-heading/5" : ""}`}>
      <div
        className={`hidden overflow-hidden bg-gradient-to-r from-primary-dark via-primary-dark to-primary text-white transition-[max-height] duration-300 ease-out lg:block ${
          scrolled ? "max-h-0" : "max-h-12"
        }`}
      >
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
              Mon – Sat: 10:00 AM – 6:30 PM
            </span>
          </div>
          <SocialIcons socials={siteConfig.socials} size="sm" />
        </div>
      </div>

      <div className="relative border-b border-slate-100 bg-white/80 backdrop-blur-xl">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6 lg:px-8 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link href="/" className="group flex shrink-0 items-center">
            <span className="relative flex items-center justify-center">
              <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
              <Image
                src="/logo.jpeg"
                alt={siteConfig.name}
                width={64}
                height={64}
                className={`rounded-full object-cover shadow-sm transition-all duration-300 group-hover:rotate-6 group-hover:scale-105 ${
                  scrolled ? "h-12 w-12" : "h-16 w-16"
                }`}
                priority
              />
            </span>
          </Link>

          <nav className="hidden items-center rounded-full bg-primary-light px-1.5 py-1 shadow-sm shadow-primary/15 ring-1 ring-primary/10 lg:flex">
            <Link href="/" className={`nav-link rounded-full px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-primary ${pathname === "/" ? "active bg-white !text-primary shadow-sm" : ""}`}>
              Home
            </Link>

            <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
              <Link
                href="/services"
                className={`nav-link flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-primary ${
                  servicesOpen || pathname.startsWith("/services") ? "active bg-white !text-primary shadow-sm" : ""
                }`}
              >
                Services
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${servicesOpen ? "-rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </Link>

              {/* Backdrop dims the rest of the page while the mega menu is open */}
              <div
                className={`fixed inset-x-0 bottom-0 z-40 bg-heading/40 backdrop-blur-sm transition-opacity duration-300 ${
                  scrolled ? "top-16" : "top-[116px]"
                } ${servicesOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
                onMouseEnter={scheduleClose}
              />

              <div
                className={`mega-menu fixed inset-x-0 z-40 ${scrolled ? "top-16" : "top-[116px]"} ${servicesOpen ? "is-open" : ""}`}
                onMouseEnter={openMenu}
                onMouseLeave={scheduleClose}
              >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-12 gap-6 rounded-b-3xl border border-t-0 border-slate-100 bg-white/95 p-8 shadow-2xl shadow-heading/20 backdrop-blur-xl">
                    <div className="relative col-span-4 overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-heading p-7 text-white">
                      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
                      <div className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-secondary/20 blur-2xl" />
                      <div className="group relative">
                        <IconBadge tone="solid" orbit size="lg">
                          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V7l8-4 8 4v14M4 21h16M9 21v-4h6v4M9 10h.01M9 14h.01M15 10h.01M15 14h.01" />
                          </svg>
                        </IconBadge>
                      </div>
                      <h3 className="relative mt-5 text-lg font-bold leading-snug">
                        Full-Service <span className="text-gradient-animated">Compliance</span>
                      </h3>
                      <p className="relative mt-2 text-sm leading-relaxed text-white/75">
                        11 service pillars covering everything from incorporation to international compliance.
                      </p>
                      <Link
                        href="/services"
                        className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-light transition hover:text-white"
                      >
                        View all services
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>

                    <div className="col-span-8 grid grid-cols-2 gap-x-6 gap-y-1">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-accent-light/40"
                        >
                          <IconBadge tone="soft" size="sm">
                            <ServiceIcon slug={s.slug} className="h-5 w-5" />
                          </IconBadge>
                          <span className="flex flex-col pt-0.5">
                            <span className="text-sm font-semibold text-heading transition-colors group-hover:text-primary">{s.shortTitle}</span>
                            <span className="mt-0.5 line-clamp-1 text-xs text-slate-500">{s.summary}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link rounded-full px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-primary ${
                  pathname === link.href ? "active bg-white !text-primary shadow-sm" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-md shadow-primary/30">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-1.97.985a11.042 11.042 0 005.516 5.516l.985-1.97a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[11px] uppercase tracking-wide text-slate-400">Call Anytime</span>
                <a href={`tel:${siteConfig.phoneHref}`} className="text-sm font-semibold text-heading hover:text-primary">
                  {siteConfig.phone}
                </a>
                {siteConfig.additionalPhones?.map((p) => (
                  <a key={p.phoneHref} href={`tel:${p.phoneHref}`} className="text-sm font-semibold text-heading hover:text-primary">
                    {p.phone}
                  </a>
                ))}
              </span>
            </div>

            <ConsultationButton className="btn-brand" />
          </div>

          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-primary lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? "top-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${mobileOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? "top-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-[max-height] duration-300 ease-out lg:hidden ${
          mobileOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4">
          <Link href="/" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-accent-light/40">
            Home
          </Link>
          <button
            type="button"
            onClick={() => setMobileServicesOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-accent-light/40"
          >
            Services
            <svg
              className={`h-3.5 w-3.5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
            </svg>
          </button>
          <div
            className={`ml-3 overflow-hidden border-l border-slate-100 pl-3 transition-[max-height] duration-300 ease-out ${
              mobileServicesOpen ? "max-h-[600px]" : "max-h-0"
            }`}
          >
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-accent-light/40"
              >
                <IconBadge tone="soft" size="xs">
                  <ServiceIcon slug={s.slug} className="h-3.5 w-3.5" />
                </IconBadge>
                {s.shortTitle}
              </Link>
            ))}
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-accent-light/40"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 border-t border-slate-100 pt-4">
            <ConsultationButton className="btn-brand w-full text-center" />
          </div>
        </div>
      </div>
    </header>
  );
}
