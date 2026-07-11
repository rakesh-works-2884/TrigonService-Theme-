"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ServicePillar } from "@/lib/services-store";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RepeatableRows from "@/components/admin/RepeatableRows";
import SeoFieldset, { type SeoFieldsValue } from "@/components/admin/SeoFieldset";

type Props = {
  mode: "create" | "edit";
  initialService?: ServicePillar;
};

export default function ServiceForm({ mode, initialService }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialService?.title ?? "");
  const [shortTitle, setShortTitle] = useState(initialService?.shortTitle ?? "");
  const [summary, setSummary] = useState(initialService?.summary ?? "");
  const [intro, setIntro] = useState(initialService?.intro ?? "");
  const [subServicesText, setSubServicesText] = useState((initialService?.subServices ?? []).join("\n"));
  const [documentsText, setDocumentsText] = useState((initialService?.documentsRequired ?? []).join("\n"));
  const [timeline, setTimeline] = useState(initialService?.timeline ?? "");
  const [faq, setFaq] = useState<Record<string, string>[]>(initialService?.faq ?? []);
  const [image, setImage] = useState(initialService?.image ?? "");
  const [imageAlt, setImageAlt] = useState(initialService?.imageAlt ?? "");
  const [seo, setSeo] = useState<SeoFieldsValue>({
    metaTitle: initialService?.metaTitle,
    metaDescription: initialService?.metaDescription,
    ogTitle: initialService?.ogTitle,
    ogDescription: initialService?.ogDescription,
    ogImage: initialService?.ogImage,
    noindex: initialService?.noindex,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      title,
      shortTitle,
      summary,
      intro,
      subServices: subServicesText.split("\n").map((s) => s.trim()).filter(Boolean),
      documentsRequired: documentsText.split("\n").map((s) => s.trim()).filter(Boolean),
      timeline,
      faq: faq.filter((f) => f.question?.trim() && f.answer?.trim()),
      image,
      imageAlt,
      ...seo,
    };

    try {
      const res =
        mode === "create"
          ? await fetch("/api/admin/services", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
          : await fetch(`/api/admin/services/${initialService!.slug}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to save service.");
        setSaving(false);
        return;
      }

      router.push("/admin/services");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
      <ImageUploadField label="Service Image" value={image} onChange={setImage} />

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Image Alt Text</label>
        <input
          value={imageAlt}
          onChange={(e) => setImageAlt(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Short Title (nav/menu)</label>
          <input
            required
            value={shortTitle}
            onChange={(e) => setShortTitle(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Summary (card/list blurb)</label>
        <textarea
          required
          rows={2}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Intro (detail page paragraph)</label>
        <textarea
          required
          rows={4}
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm leading-relaxed focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Sub-Services <span className="normal-case text-slate-400">(one per line)</span>
          </label>
          <textarea
            rows={6}
            value={subServicesText}
            onChange={(e) => setSubServicesText(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Documents Required <span className="normal-case text-slate-400">(one per line)</span>
          </label>
          <textarea
            rows={6}
            value={documentsText}
            onChange={(e) => setDocumentsText(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Timeline</label>
        <input
          required
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Frequently Asked Questions</label>
        <div className="mt-2">
          <RepeatableRows
            value={faq}
            onChange={setFaq}
            fields={[
              { name: "question", label: "Question" },
              { name: "answer", label: "Answer", multiline: true },
            ]}
            addLabel="Add Question"
          />
        </div>
      </div>

      <SeoFieldset value={seo} onChange={setSeo} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving..." : mode === "create" ? "Publish Service" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
