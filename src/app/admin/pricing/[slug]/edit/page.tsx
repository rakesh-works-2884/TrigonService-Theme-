import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import PricingForm from "@/components/admin/PricingForm";
import { getPricingPlanBySlug } from "@/lib/pricing-store";

export default async function EditPricingPlanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plan = await getPricingPlanBySlug(slug);
  if (!plan) notFound();

  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-xl font-bold text-primary">Edit Pricing Plan</h1>
        <div className="mt-6">
          <PricingForm mode="edit" initialPlan={plan} />
        </div>
      </main>
    </div>
  );
}
