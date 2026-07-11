import AdminHeader from "@/components/admin/AdminHeader";
import IndustryForm from "@/components/admin/IndustryForm";
import { getAllServices } from "@/lib/services-store";

export default async function NewIndustryPage() {
  const services = await getAllServices();

  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-xl font-bold text-primary">New Industry</h1>
        <div className="mt-6">
          <IndustryForm mode="create" serviceTitles={services.map((s) => s.title)} />
        </div>
      </main>
    </div>
  );
}
