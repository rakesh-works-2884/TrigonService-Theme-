import "server-only";
import fs from "fs/promises";
import path from "path";

export type AdditionalPhone = { phone: string; phoneHref: string };

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  phoneHref: string;
  additionalPhones: AdditionalPhone[];
  whatsappNumber: string;
  address: string;
  socials: { instagram: string; facebook: string; x: string };
};

export type TrustStat = { label: string; value: string; isPlaceholder?: boolean };
export type WhyChooseUsItem = { key: string; title: string; description: string };
export type ProcessStep = { title: string; description: string };
export type Testimonial = { quote: string; attribution: string };
export type TeamMember = { key: string; role: string; description: string };
export type CoreValue = { title: string; description: string };

export type SiteSettings = {
  siteConfig: SiteConfig;
  trustStats: TrustStat[];
  whyChooseUs: WhyChooseUsItem[];
  processSteps: ProcessStep[];
  testimonials: Testimonial[];
  blogCategories: string[];
  team: TeamMember[];
  coreValues: CoreValue[];
  industriesChallengesImage: string;
  industriesChallengesImageAlt: string;
};

const DATA_FILE = path.join(process.cwd(), "src", "data", "site-settings.json");

export async function getSiteSettings(): Promise<SiteSettings> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as SiteSettings;
}

export async function updateSiteSettings(partial: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const next: SiteSettings = { ...current, ...partial };
  await fs.writeFile(DATA_FILE, JSON.stringify(next, null, 2) + "\n", "utf-8");
  return next;
}
