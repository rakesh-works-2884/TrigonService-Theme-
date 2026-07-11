import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import { getAllPageSeo, PAGE_KEYS } from "@/lib/seo-store";

const LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  services: "Services (listing)",
  industries: "Industries (listing)",
  pricing: "Pricing",
  "why-choose-us": "Why Choose Us",
  testimonials: "Testimonials",
  contact: "Contact",
  consultation: "Consultation",
  blog: "Blog (listing)",
};

export default async function AdminSeoPage() {
  const records = await getAllPageSeo();
  const byKey = new Map(records.map((r) => [r.pageKey, r]));

  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-xl font-bold text-primary">Page SEO</h1>
        <p className="mt-1 text-sm text-slate-500">
          Meta title/description and social share tags for each static page. Services, Industries, and Blog posts
          have their own SEO overrides on their individual edit forms.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">Page</th>
                <th className="px-5 py-3">Meta Title</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PAGE_KEYS.map((key) => (
                <tr key={key}>
                  <td className="px-5 py-4 font-medium text-primary">{LABELS[key]}</td>
                  <td className="px-5 py-4 text-slate-500">{byKey.get(key)?.metaTitle || "— using default —"}</td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/seo/${key}`}
                      className="rounded-full px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/10"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
