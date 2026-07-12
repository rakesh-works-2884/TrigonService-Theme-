import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteImages, updateSiteImages } from "@/lib/site-images-store";

export async function GET() {
  const images = await getSiteImages();
  return NextResponse.json({ images });
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const images = await updateSiteImages(body);

  // These images appear across nearly every page — revalidate the whole root layout
  // rather than enumerating every route.
  revalidatePath("/", "layout");

  return NextResponse.json({ images });
}
