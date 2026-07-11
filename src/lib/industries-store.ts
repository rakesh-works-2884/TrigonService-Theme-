import "server-only";
import fs from "fs/promises";
import path from "path";
import { slugify, uniqueSlug } from "@/lib/slugify";
import type { SeoFields } from "@/lib/seo-types";

export type Industry = SeoFields & {
  slug: string;
  title: string;
  description: string;
  keyServices: string[];
  image: string;
  imageAlt: string;
  stats: { value: string; label: string }[];
  challenges: string[];
  testimonial?: { quote: string; attribution: string };
};

const DATA_FILE = path.join(process.cwd(), "src", "data", "industries.json");

async function readAll(): Promise<Industry[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Industry[];
}

async function writeAll(industries: Industry[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(industries, null, 2) + "\n", "utf-8");
}

export async function getAllIndustries(): Promise<Industry[]> {
  return readAll();
}

export async function getIndustryBySlug(slug: string): Promise<Industry | undefined> {
  const industries = await readAll();
  return industries.find((i) => i.slug === slug);
}

export async function createIndustry(input: Omit<Industry, "slug"> & { slug?: string }): Promise<Industry> {
  const industries = await readAll();
  const baseSlug = input.slug?.trim() || slugify(input.title);
  const slug = uniqueSlug(baseSlug, industries.map((i) => i.slug));
  const industry: Industry = { ...input, slug };
  industries.push(industry);
  await writeAll(industries);
  return industry;
}

export async function updateIndustry(
  slug: string,
  input: Partial<Omit<Industry, "slug">>
): Promise<Industry | undefined> {
  const industries = await readAll();
  const idx = industries.findIndex((i) => i.slug === slug);
  if (idx === -1) return undefined;
  industries[idx] = { ...industries[idx], ...input };
  await writeAll(industries);
  return industries[idx];
}

export async function deleteIndustry(slug: string): Promise<boolean> {
  const industries = await readAll();
  const next = industries.filter((i) => i.slug !== slug);
  if (next.length === industries.length) return false;
  await writeAll(next);
  return true;
}
