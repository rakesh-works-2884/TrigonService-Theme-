import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPageSeo, updatePageSeo, PAGE_KEYS, type PageKey } from "@/lib/seo-store";

const ROUTE_BY_KEY: Record<PageKey, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  industries: "/industries",
  pricing: "/pricing",
  "why-choose-us": "/why-choose-us",
  testimonials: "/testimonials",
  contact: "/contact",
  consultation: "/consultation",
  blog: "/blog",
};

function isPageKey(value: string): value is PageKey {
  return (PAGE_KEYS as readonly string[]).includes(value);
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ pageKey: string }> }) {
  const { pageKey } = await params;
  if (!isPageKey(pageKey)) return NextResponse.json({ error: "Unknown page" }, { status: 404 });
  const record = await getPageSeo(pageKey);
  return NextResponse.json({ record: record || { pageKey } });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ pageKey: string }> }) {
  const { pageKey } = await params;
  if (!isPageKey(pageKey)) return NextResponse.json({ error: "Unknown page" }, { status: 404 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const record = await updatePageSeo(pageKey, {
    metaTitle: body.metaTitle || undefined,
    metaDescription: body.metaDescription || undefined,
    ogTitle: body.ogTitle || undefined,
    ogDescription: body.ogDescription || undefined,
    ogImage: body.ogImage || undefined,
    noindex: Boolean(body.noindex),
  });

  revalidatePath(ROUTE_BY_KEY[pageKey]);

  return NextResponse.json({ record });
}
