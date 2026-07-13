import Image from "next/image";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import DeleteItemButton from "@/components/admin/DeleteItemButton";
import { getAllIndustries } from "@/lib/industries-store";

export default async function AdminIndustriesPage() {
  const industries = await getAllIndustries();

  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Industries ({industries.length})</h1>
          <Link
            href="/admin/industries/new"
            className="rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            + New Industry
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {industries.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">No industries yet. Create your first one.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Image</th>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {industries.map((industry) => (
                  <tr key={industry.slug}>
                    <td className="px-5 py-4">
                      <div className="relative h-12 w-16 overflow-hidden rounded-md bg-warmgray">
                        {industry.image ? (
                          <Image src={industry.image} alt={industry.title} fill sizes="64px" className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                            No image
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-primary">{industry.title}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/industries/${industry.slug}`}
                          target="_blank"
                          className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-accent-light/40"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/industries/${industry.slug}/edit`}
                          className="rounded-full px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/10"
                        >
                          Edit
                        </Link>
                        <DeleteItemButton endpoint={`/api/admin/industries/${industry.slug}`} label={industry.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
