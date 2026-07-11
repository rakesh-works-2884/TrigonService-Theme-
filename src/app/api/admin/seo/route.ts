import { NextResponse } from "next/server";
import { getAllPageSeo } from "@/lib/seo-store";

export async function GET() {
  const records = await getAllPageSeo();
  return NextResponse.json({ records });
}
