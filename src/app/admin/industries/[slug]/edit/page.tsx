import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import IndustryForm from "@/components/admin/IndustryForm";
import { getIndustryBySlug } from "@/lib/industries-store";
import { getAllServices } from "@/lib/services-store";

export default async function EditIndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [industry, services] = await Promise.all([getIndustryBySlug(slug), getAllServices()]);
  if (!industry) notFound();

  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-xl font-bold text-primary">Edit Industry</h1>
        <div className="mt-6">
          <IndustryForm mode="edit" initialIndustry={industry} serviceTitles={services.map((s) => s.title)} />
        </div>
      </main>
    </div>
  );
}
