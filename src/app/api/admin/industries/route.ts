import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createIndustry, getAllIndustries } from "@/lib/industries-store";

export async function GET() {
  const industries = await getAllIndustries();
  return NextResponse.json({ industries });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const industry = await createIndustry({
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
    slug: body.slug,
    metaTitle: body.metaTitle || undefined,
    metaDescription: body.metaDescription || undefined,
    ogTitle: body.ogTitle || undefined,
    ogDescription: body.ogDescription || undefined,
    ogImage: body.ogImage || undefined,
    noindex: Boolean(body.noindex),
  });

  revalidatePath("/");
  revalidatePath("/industries");
  revalidatePath(`/industries/${industry.slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ industry }, { status: 201 });
}
