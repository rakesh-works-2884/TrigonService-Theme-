import AdminHeader from "@/components/admin/AdminHeader";
import ServiceForm from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-xl font-bold text-primary">New Service</h1>
        <div className="mt-6">
          <ServiceForm mode="create" />
        </div>
      </main>
    </div>
  );
}
