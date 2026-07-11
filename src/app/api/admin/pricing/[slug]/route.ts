import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deletePricingPlan, getPricingPlanBySlug, updatePricingPlan } from "@/lib/pricing-store";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plan = await getPricingPlanBySlug(slug);
  if (!plan) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ plan });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const plan = await updatePricingPlan(slug, {
    name: body.name,
    startingPrice: body.startingPrice,
    billingNote: body.billingNote,
    features: Array.isArray(body.features) ? body.features : [],
    highlighted: Boolean(body.highlighted),
  });

  if (!plan) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/");
  revalidatePath("/pricing");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ plan });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ok = await deletePricingPlan(slug);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/");
  revalidatePath("/pricing");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}
