import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteSettings, updateSiteSettings } from "@/lib/site-settings-store";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const settings = await updateSiteSettings({
    siteConfig: body.siteConfig,
    trustStats: body.trustStats,
    whyChooseUs: body.whyChooseUs,
    processSteps: body.processSteps,
    testimonials: body.testimonials,
    blogCategories: body.blogCategories,
    team: body.team,
    coreValues: body.coreValues,
    industriesChallengesImage: body.industriesChallengesImage,
    industriesChallengesImageAlt: body.industriesChallengesImageAlt,
  });

  // Site settings appear on nearly every page (Header, Footer, ConsultationModalProvider) —
  // revalidate the whole root layout rather than enumerating every route.
  revalidatePath("/", "layout");

  return NextResponse.json({ settings });
}
