"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Industry } from "@/lib/industries-store";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RepeatableRows from "@/components/admin/RepeatableRows";
import SeoFieldset, { type SeoFieldsValue } from "@/components/admin/SeoFieldset";

type Props = {
  mode: "create" | "edit";
  initialIndustry?: Industry;
  serviceTitles: string[];
};

export default function IndustryForm({ mode, initialIndustry, serviceTitles }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialIndustry?.title ?? "");
  const [description, setDescription] = useState(initialIndustry?.description ?? "");
  const [keyServicesText, setKeyServicesText] = useState((initialIndustry?.keyServices ?? []).join("\n"));
  const [image, setImage] = useState(initialIndustry?.image ?? "");
  const [imageAlt, setImageAlt] = useState(initialIndustry?.imageAlt ?? "");
  const [stats, setStats] = useState<Record<string, string>[]>(initialIndustry?.stats ?? []);
  const [challengesText, setChallengesText] = useState((initialIndustry?.challenges ?? []).join("\n"));
  const [hasTestimonial, setHasTestimonial] = useState(Boolean(initialIndustry?.testimonial));
  const [testimonialQuote, setTestimonialQuote] = useState(initialIndustry?.testimonial?.quote ?? "");
  const [testimonialAttribution, setTestimonialAttribution] = useState(
    initialIndustry?.testimonial?.attribution ?? ""
  );
  const [seo, setSeo] = useState<SeoFieldsValue>({
    metaTitle: initialIndustry?.metaTitle,
    metaDescription: initialIndustry?.metaDescription,
    ogTitle: initialIndustry?.ogTitle,
    ogDescription: initialIndustry?.ogDescription,
    ogImage: initialIndustry?.ogImage,
    noindex: initialIndustry?.noindex,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      title,
      description,
      keyServices: keyServicesText.split("\n").map((s) => s.trim()).filter(Boolean),
      image,
      imageAlt,
      stats: stats.filter((s) => s.value?.trim() && s.label?.trim()),
      challenges: challengesText.split("\n").map((s) => s.trim()).filter(Boolean),
      testimonial:
        hasTestimonial && testimonialQuote.trim() && testimonialAttribution.trim()
          ? { quote: testimonialQuote, attribution: testimonialAttribution }
          : undefined,
      ...seo,
    };

    try {
      const res =
        mode === "create"
          ? await fetch("/api/admin/industries", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
          : await fetch(`/api/admin/industries/${initialIndustry!.slug}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to save industry.");
        setSaving(false);
        return;
      }

      router.push("/admin/industries");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
      <ImageUploadField label="Industry Image" value={image} onChange={setImage} />

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Image Alt Text</label>
        <input
          value={imageAlt}
          onChange={(e) => setImageAlt(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

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
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Description</label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Key Services <span className="normal-case text-slate-400">(one per line — must match a Service title exactly)</span>
        </label>
        <textarea
          rows={3}
          value={keyServicesText}
          onChange={(e) => setKeyServicesText(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <p className="mt-1 text-xs text-slate-400">
          Available service titles: {serviceTitles.join(" · ")}
        </p>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Stats</label>
        <div className="mt-2">
          <RepeatableRows
            value={stats}
            onChange={setStats}
            fields={[
              { name: "value", label: "Value (e.g. 45+)" },
              { name: "label", label: "Label (e.g. IT Clients Supported)" },
            ]}
            addLabel="Add Stat"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Challenges <span className="normal-case text-slate-400">(one per line)</span>
        </label>
        <textarea
          rows={5}
          value={challengesText}
          onChange={(e) => setChallengesText(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="rounded-lg border border-slate-200 p-4">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={hasTestimonial}
            onChange={(e) => setHasTestimonial(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-accent"
          />
          Include a testimonial for this industry
        </label>
        {hasTestimonial && (
          <div className="mt-3 space-y-3">
            <textarea
              rows={2}
              placeholder="Quote"
              value={testimonialQuote}
              onChange={(e) => setTestimonialQuote(e.target.value)}
              className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <input
              placeholder="Attribution (e.g. Founder, SaaS Startup)"
              value={testimonialAttribution}
              onChange={(e) => setTestimonialAttribution(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        )}
      </div>

      <SeoFieldset value={seo} onChange={setSeo} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving..." : mode === "create" ? "Publish Industry" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
