import type { Metadata } from "next";
import { Catamaran } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import Footer from "@/components/Footer";
import ConsultationModalProvider from "@/components/ConsultationModalProvider";
import { getSiteSettings } from "@/lib/site-settings-store";
import { getAllServices } from "@/lib/services-store";
import { SITE_URL } from "@/lib/site-url";

const catamaran = Catamaran({
  variable: "--font-catamaran",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await getSiteSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${siteConfig.name} | ${siteConfig.tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
      title: `${siteConfig.name} | ${siteConfig.tagline}`,
      description: siteConfig.description,
      siteName: siteConfig.name,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ siteConfig }, services] = await Promise.all([getSiteSettings(), getAllServices()]);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en" className={`${catamaran.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <ConsultationModalProvider siteConfig={siteConfig} services={services}>
          <SiteChrome siteConfig={siteConfig} services={services} footer={<Footer />}>
            {children}
          </SiteChrome>
        </ConsultationModalProvider>
      </body>
    </html>
  );
}
