import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteIndustry, getIndustryBySlug, updateIndustry } from "@/lib/industries-store";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ industry });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const industry = await updateIndustry(slug, {
    title: body.title,
    description: body.description,
    keyServices: Array.isArray(body.keyServices) ? body.keyServices : [],
    image: body.image || "",
    imageAlt: body.imageAlt || "",
    stats: Array.isArray(body.stats) ? body.stats : [],
    challenges: Array.isArray(body.challenges) ? body.challenges : [],
    testimonial:
      body.testimonial?.quote && body.testimonial?.attribution
        ? { quote: body.testimonial.quote, attribution: body.testimonial.attribution }
        : undefined,
    metaTitle: body.metaTitle || undefined,
    metaDescription: body.metaDescription || undefined,
    ogTitle: body.ogTitle || undefined,
    ogDescription: body.ogDescription || undefined,
    ogImage: body.ogImage || undefined,
    noindex: Boolean(body.noindex),
  });

  if (!industry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/");
  revalidatePath("/industries");
  revalidatePath(`/industries/${slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ industry });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ok = await deleteIndustry(slug);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/");
  revalidatePath("/industries");
  revalidatePath(`/industries/${slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}
