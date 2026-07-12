import "server-only";
import fs from "fs/promises";
import path from "path";

export type HeroSlide = {
  image: string;
  imageAlt: string;
  subtitle: string;
  titleMain: string;
  titleSecond: string;
  description: string;
  cta: string;
  href: string;
};

export type SiteImages = {
  heroSlides: HeroSlide[];
  homeAboutMainImage: string;
  homeAboutMainImageAlt: string;
  homeAboutInsetImage: string;
  homeAboutInsetImageAlt: string;
  homeCtaBannerImage: string;
  homeCtaBannerImageAlt: string;
  homeDarkCtaImage: string;
  homeDarkCtaImageAlt: string;
  aboutMainImage: string;
  aboutMainImageAlt: string;
  aboutInsetImage: string;
  aboutInsetImageAlt: string;
  whyChooseUsShowcaseImage: string;
  whyChooseUsShowcaseImageAlt: string;
  pricingShowcaseImage: string;
  pricingShowcaseImageAlt: string;
  testimonialsShowcaseImage: string;
  testimonialsShowcaseImageAlt: string;
  consultationShowcaseImage: string;
  consultationShowcaseImageAlt: string;
  contactSidebarImage: string;
  contactSidebarImageAlt: string;
};

const DATA_FILE = path.join(process.cwd(), "src", "data", "site-images.json");

export async function getSiteImages(): Promise<SiteImages> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as SiteImages;
}

export async function updateSiteImages(partial: Partial<SiteImages>): Promise<SiteImages> {
  const current = await getSiteImages();
  const updated: SiteImages = { ...current, ...partial };
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2) + "\n", "utf-8");
  return updated;
}
