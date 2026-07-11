import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteService, getServiceBySlug, updateService } from "@/lib/services-store";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ service });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const service = await updateService(slug, {
    title: body.title,
    shortTitle: body.shortTitle,
    summary: body.summary,
    intro: body.intro,
    subServices: Array.isArray(body.subServices) ? body.subServices : [],
    documentsRequired: Array.isArray(body.documentsRequired) ? body.documentsRequired : [],
    timeline: body.timeline,
    faq: Array.isArray(body.faq) ? body.faq : [],
    image: body.image || "",
    imageAlt: body.imageAlt || "",
    metaTitle: body.metaTitle || undefined,
    metaDescription: body.metaDescription || undefined,
    ogTitle: body.ogTitle || undefined,
    ogDescription: body.ogDescription || undefined,
    ogImage: body.ogImage || undefined,
    noindex: Boolean(body.noindex),
  });

  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath(`/services/${slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ service });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ok = await deleteService(slug);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath(`/services/${slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}
