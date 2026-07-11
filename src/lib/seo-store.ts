import "server-only";
import fs from "fs/promises";
import path from "path";
import type { SeoFields } from "@/lib/seo-types";

export const PAGE_KEYS = [
  "home",
  "about",
  "services",
  "industries",
  "pricing",
  "why-choose-us",
  "testimonials",
  "contact",
  "consultation",
  "blog",
] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

export type PageSeo = SeoFields & { pageKey: PageKey };

const DATA_FILE = path.join(process.cwd(), "src", "data", "seo-settings.json");

async function readAll(): Promise<PageSeo[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as PageSeo[];
}

async function writeAll(records: PageSeo[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2) + "\n", "utf-8");
}

export async function getAllPageSeo(): Promise<PageSeo[]> {
  return readAll();
}

export async function getPageSeo(pageKey: PageKey): Promise<PageSeo | undefined> {
  const records = await readAll();
  return records.find((r) => r.pageKey === pageKey);
}

export async function updatePageSeo(pageKey: PageKey, partial: SeoFields): Promise<PageSeo> {
  const records = await readAll();
  const idx = records.findIndex((r) => r.pageKey === pageKey);
  const updated: PageSeo = { ...(idx !== -1 ? records[idx] : {}), ...partial, pageKey };
  if (idx === -1) {
    records.push(updated);
  } else {
    records[idx] = updated;
  }
  await writeAll(records);
  return updated;
}
