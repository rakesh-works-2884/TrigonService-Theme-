import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import ServiceForm from "@/components/admin/ServiceForm";
import { getServiceBySlug } from "@/lib/services-store";

export default async function EditServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-xl font-bold text-primary">Edit Service</h1>
        <div className="mt-6">
          <ServiceForm mode="edit" initialService={service} />
        </div>
      </main>
    </div>
  );
}
