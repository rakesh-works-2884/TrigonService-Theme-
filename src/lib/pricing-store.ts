import "server-only";
import fs from "fs/promises";
import path from "path";
import { slugify, uniqueSlug } from "@/lib/slugify";

export type PricingPlan = {
  slug: string;
  name: string;
  startingPrice: string;
  billingNote: string;
  features: string[];
  highlighted?: boolean;
};

const DATA_FILE = path.join(process.cwd(), "src", "data", "pricing.json");

async function readAll(): Promise<PricingPlan[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as PricingPlan[];
}

async function writeAll(plans: PricingPlan[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(plans, null, 2) + "\n", "utf-8");
}

export async function getAllPricingPlans(): Promise<PricingPlan[]> {
  return readAll();
}

export async function getPricingPlanBySlug(slug: string): Promise<PricingPlan | undefined> {
  const plans = await readAll();
  return plans.find((p) => p.slug === slug);
}

export async function createPricingPlan(input: Omit<PricingPlan, "slug"> & { slug?: string }): Promise<PricingPlan> {
  const plans = await readAll();
  const baseSlug = input.slug?.trim() || slugify(input.name);
  const slug = uniqueSlug(baseSlug, plans.map((p) => p.slug));
  const plan: PricingPlan = { ...input, slug };
  plans.push(plan);
  await writeAll(plans);
  return plan;
}

export async function updatePricingPlan(
  slug: string,
  input: Partial<Omit<PricingPlan, "slug">>
): Promise<PricingPlan | undefined> {
  const plans = await readAll();
  const idx = plans.findIndex((p) => p.slug === slug);
  if (idx === -1) return undefined;
  plans[idx] = { ...plans[idx], ...input };
  await writeAll(plans);
  return plans[idx];
}

export async function deletePricingPlan(slug: string): Promise<boolean> {
  const plans = await readAll();
  const next = plans.filter((p) => p.slug !== slug);
  if (next.length === plans.length) return false;
  await writeAll(next);
  return true;
}
