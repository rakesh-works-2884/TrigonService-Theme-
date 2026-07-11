"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PageKey, PageSeo } from "@/lib/seo-store";
import SeoFieldset, { type SeoFieldsValue } from "@/components/admin/SeoFieldset";

export default function SeoForm({ pageKey, initialSeo }: { pageKey: PageKey; initialSeo: PageSeo }) {
  const router = useRouter();
  const [seo, setSeo] = useState<SeoFieldsValue>({
    metaTitle: initialSeo.metaTitle,
    metaDescription: initialSeo.metaDescription,
    ogTitle: initialSeo.ogTitle,
    ogDescription: initialSeo.ogDescription,
    ogImage: initialSeo.ogImage,
    noindex: initialSeo.noindex,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/seo/${pageKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seo),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to save SEO settings.");
        setSaving(false);
        return;
      }

      setSaved(true);
      setSaving(false);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
      <SeoFieldset value={seo} onChange={setSeo} />

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && !error && <p className="text-sm text-green-600">SEO settings saved.</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
