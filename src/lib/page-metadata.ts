import type { Metadata } from "next";
import { getPageSeo, type PageKey } from "@/lib/seo-store";

export async function buildPageMetadata(
  pageKey: PageKey,
  fallback: { title: string; description: string; image?: string }
): Promise<Metadata> {
  const seo = await getPageSeo(pageKey);
  const title = seo?.metaTitle || fallback.title;
  const description = seo?.metaDescription || fallback.description;
  const ogImage = seo?.ogImage || fallback.image;
  return {
    title,
    description,
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: seo?.noindex ? { index: false, follow: false } : undefined,
  };
}
