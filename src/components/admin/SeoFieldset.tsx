"use client";

import ImageUploadField from "@/components/admin/ImageUploadField";

export type SeoFieldsValue = {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
};

export default function SeoFieldset({
  value,
  onChange,
}: {
  value: SeoFieldsValue;
  onChange: (next: SeoFieldsValue) => void;
}) {
  const set = <K extends keyof SeoFieldsValue>(key: K, val: SeoFieldsValue[K]) =>
    onChange({ ...value, [key]: val });

  return (
    <details className="rounded-lg border border-slate-200 p-4">
      <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-slate-500">
        SEO &amp; Social Sharing (optional overrides)
      </summary>
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Meta Title</label>
            <input
              value={value.metaTitle ?? ""}
              onChange={(e) => set("metaTitle", e.target.value)}
              placeholder="Falls back to the page/item title"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">OG Title</label>
            <input
              value={value.ogTitle ?? ""}
              onChange={(e) => set("ogTitle", e.target.value)}
              placeholder="Falls back to Meta Title"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Meta Description</label>
            <textarea
              rows={3}
              value={value.metaDescription ?? ""}
              onChange={(e) => set("metaDescription", e.target.value)}
              placeholder="Falls back to the page/item summary"
              className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">OG Description</label>
            <textarea
              rows={3}
              value={value.ogDescription ?? ""}
              onChange={(e) => set("ogDescription", e.target.value)}
              placeholder="Falls back to Meta Description"
              className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <ImageUploadField
          label="OG Image (social share preview)"
          value={value.ogImage ?? ""}
          onChange={(url) => set("ogImage", url)}
        />

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={Boolean(value.noindex)}
            onChange={(e) => set("noindex", e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-accent"
          />
          Hide this page from search engines (noindex)
        </label>
      </div>
    </details>
  );
}
