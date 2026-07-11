import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import DeleteItemButton from "@/components/admin/DeleteItemButton";
import { getAllPricingPlans } from "@/lib/pricing-store";

export default async function AdminPricingPage() {
  const plans = await getAllPricingPlans();

  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Pricing Plans ({plans.length})</h1>
          <Link
            href="/admin/pricing/new"
            className="rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            + New Plan
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {plans.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">No pricing plans yet.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Highlighted</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {plans.map((plan) => (
                  <tr key={plan.slug}>
                    <td className="px-5 py-4 font-medium text-primary">{plan.name}</td>
                    <td className="px-5 py-4 text-slate-500">
                      {plan.startingPrice} <span className="text-xs">({plan.billingNote})</span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{plan.highlighted ? "Yes" : "—"}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/pricing/${plan.slug}/edit`}
                          className="rounded-full px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/10"
                        >
                          Edit
                        </Link>
                        <DeleteItemButton endpoint={`/api/admin/pricing/${plan.slug}`} label={plan.name} />
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
