import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createPricingPlan, getAllPricingPlans } from "@/lib/pricing-store";

export async function GET() {
  const plans = await getAllPricingPlans();
  return NextResponse.json({ plans });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.startingPrice || !body?.billingNote) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const plan = await createPricingPlan({
    name: body.name,
    startingPrice: body.startingPrice,
    billingNote: body.billingNote,
    features: Array.isArray(body.features) ? body.features : [],
    highlighted: Boolean(body.highlighted),
    slug: body.slug,
  });

  revalidatePath("/");
  revalidatePath("/pricing");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ plan }, { status: 201 });
}
