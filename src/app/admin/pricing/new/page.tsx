import AdminHeader from "@/components/admin/AdminHeader";
import PricingForm from "@/components/admin/PricingForm";

export default function NewPricingPlanPage() {
  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-xl font-bold text-primary">New Pricing Plan</h1>
        <div className="mt-6">
          <PricingForm mode="create" />
        </div>
      </main>
    </div>
  );
}
