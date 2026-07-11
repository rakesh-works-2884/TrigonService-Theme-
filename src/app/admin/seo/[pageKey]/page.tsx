import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import SeoForm from "@/components/admin/SeoForm";
import { getPageSeo, PAGE_KEYS, type PageKey } from "@/lib/seo-store";

function isPageKey(value: string): value is PageKey {
  return (PAGE_KEYS as readonly string[]).includes(value);
}

export default async function EditSeoPage({ params }: { params: Promise<{ pageKey: string }> }) {
  const { pageKey } = await params;
  if (!isPageKey(pageKey)) notFound();

  const record = (await getPageSeo(pageKey)) || { pageKey };

  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-xl font-bold text-primary">SEO — {pageKey}</h1>
        <div className="mt-6">
          <SeoForm pageKey={pageKey} initialSeo={record} />
        </div>
      </main>
    </div>
  );
}
