import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createService, getAllServices } from "@/lib/services-store";

export async function GET() {
  const services = await getAllServices();
  return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.shortTitle || !body?.summary || !body?.intro || !body?.timeline) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const service = await createService({
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
    slug: body.slug,
    metaTitle: body.metaTitle || undefined,
    metaDescription: body.metaDescription || undefined,
    ogTitle: body.ogTitle || undefined,
    ogDescription: body.ogDescription || undefined,
    ogImage: body.ogImage || undefined,
    noindex: Boolean(body.noindex),
  });

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath(`/services/${service.slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ service }, { status: 201 });
}
