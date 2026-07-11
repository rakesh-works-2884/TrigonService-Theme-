"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import type { SiteConfig } from "@/lib/site-settings-store";
import type { ServicePillar } from "@/lib/services-store";

export default function SiteChrome({
  children,
  siteConfig,
  services,
  footer,
}: {
  children: React.ReactNode;
  siteConfig: SiteConfig;
  services: ServicePillar[];
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header siteConfig={siteConfig} services={services} />
      <main className="flex-1">{children}</main>
      {footer}
      <WhatsAppButton whatsappNumber={siteConfig.whatsappNumber} />
      <CookieConsent />
    </>
  );
}
