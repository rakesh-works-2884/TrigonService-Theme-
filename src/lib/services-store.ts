import "server-only";
import fs from "fs/promises";
import path from "path";
import { slugify, uniqueSlug } from "@/lib/slugify";
import type { SeoFields } from "@/lib/seo-types";

export type FaqItem = { question: string; answer: string };

export type ServicePillar = SeoFields & {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  intro: string;
  subServices: string[];
  documentsRequired: string[];
  timeline: string;
  faq: FaqItem[];
  image: string;
  imageAlt: string;
};

const DATA_FILE = path.join(process.cwd(), "src", "data", "services.json");

async function readAll(): Promise<ServicePillar[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as ServicePillar[];
}

async function writeAll(services: ServicePillar[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(services, null, 2) + "\n", "utf-8");
}

export async function getAllServices(): Promise<ServicePillar[]> {
  return readAll();
}

export async function getServiceBySlug(slug: string): Promise<ServicePillar | undefined> {
  const services = await readAll();
  return services.find((s) => s.slug === slug);
}

export async function createService(
  input: Omit<ServicePillar, "slug"> & { slug?: string }
): Promise<ServicePillar> {
  const services = await readAll();
  const baseSlug = input.slug?.trim() || slugify(input.title);
  const slug = uniqueSlug(baseSlug, services.map((s) => s.slug));
  const service: ServicePillar = { ...input, slug };
  services.push(service);
  await writeAll(services);
  return service;
}

export async function updateService(
  slug: string,
  input: Partial<Omit<ServicePillar, "slug">>
): Promise<ServicePillar | undefined> {
  const services = await readAll();
  const idx = services.findIndex((s) => s.slug === slug);
  if (idx === -1) return undefined;
  services[idx] = { ...services[idx], ...input };
  await writeAll(services);
  return services[idx];
}

export async function deleteService(slug: string): Promise<boolean> {
  const services = await readAll();
  const next = services.filter((s) => s.slug !== slug);
  if (next.length === services.length) return false;
  await writeAll(next);
  return true;
}
