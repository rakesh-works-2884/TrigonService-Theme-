import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deletePost, getPostBySlug, updatePost } from "@/lib/blog-store";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const post = await updatePost(slug, {
    title: body.title,
    category: body.category,
    excerpt: body.excerpt,
    date: body.date,
    body: body.body,
    image: body.image || undefined,
    metaTitle: body.metaTitle || undefined,
    metaDescription: body.metaDescription || undefined,
    ogTitle: body.ogTitle || undefined,
    ogDescription: body.ogDescription || undefined,
    ogImage: body.ogImage || undefined,
    noindex: Boolean(body.noindex),
  });

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ post });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ok = await deletePost(slug);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}
