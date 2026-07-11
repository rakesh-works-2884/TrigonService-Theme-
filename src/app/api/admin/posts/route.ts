import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createPost, getAllPosts } from "@/lib/blog-store";

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.category || !body?.excerpt || !body?.date || !Array.isArray(body?.body)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const post = await createPost({
    title: body.title,
    category: body.category,
    excerpt: body.excerpt,
    date: body.date,
    body: body.body,
    slug: body.slug,
    image: body.image || undefined,
    metaTitle: body.metaTitle || undefined,
    metaDescription: body.metaDescription || undefined,
    ogTitle: body.ogTitle || undefined,
    ogDescription: body.ogDescription || undefined,
    ogImage: body.ogImage || undefined,
    noindex: Boolean(body.noindex),
  });

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ post }, { status: 201 });
}
