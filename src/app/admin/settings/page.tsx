import AdminHeader from "@/components/admin/AdminHeader";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import { getSiteSettings } from "@/lib/site-settings-store";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-xl font-bold text-primary">Site Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Company info, homepage stats, testimonials, team, and other content that appears across the site.
        </p>
        <div className="mt-6">
          <SiteSettingsForm initialSettings={settings} />
        </div>
      </main>
    </div>
  );
}
