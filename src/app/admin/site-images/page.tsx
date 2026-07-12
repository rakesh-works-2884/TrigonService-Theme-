import AdminHeader from "@/components/admin/AdminHeader";
import SiteImagesForm from "@/components/admin/SiteImagesForm";
import { getSiteImages } from "@/lib/site-images-store";

export default async function AdminSiteImagesPage() {
  const images = await getSiteImages();

  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-xl font-bold text-primary">Site Images</h1>
        <p className="mt-1 text-sm text-slate-500">
          The hero carousel and the standalone photos used across the public site (Home, About, Why Choose Us,
          Pricing, Testimonials, Consultation, Contact). Service, industry, and blog images are managed from their
          own sections.
        </p>
        <div className="mt-6">
          <SiteImagesForm initialImages={images} />
        </div>
      </main>
    </div>
  );
}
