"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { BlogPost } from "@/lib/blog-store";
import SeoFieldset, { type SeoFieldsValue } from "@/components/admin/SeoFieldset";

type Props = {
  mode: "create" | "edit";
  initialPost?: BlogPost;
  categories: string[];
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function PostForm({ mode, initialPost, categories }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [category, setCategory] = useState(initialPost?.category ?? categories[0] ?? "");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [date, setDate] = useState(initialPost?.date ?? todayISO());
  const [bodyText, setBodyText] = useState(initialPost?.body.join("\n\n") ?? "");
  const [image, setImage] = useState(initialPost?.image ?? "");
  const [seo, setSeo] = useState<SeoFieldsValue>({
    metaTitle: initialPost?.metaTitle ?? "",
    metaDescription: initialPost?.metaDescription ?? "",
    ogTitle: initialPost?.ogTitle ?? "",
    ogDescription: initialPost?.ogDescription ?? "",
    ogImage: initialPost?.ogImage ?? "",
    noindex: initialPost?.noindex ?? false,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setUploadError(data.error || "Upload failed.");
      } else {
        setImage(data.url);
      }
    } catch {
      setUploadError("Upload failed. Try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const body = bodyText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    if (body.length === 0) {
      setError("Post body can't be empty.");
      setSaving(false);
      return;
    }

    const payload = {
      title,
      category,
      excerpt,
      date,
      body,
      image: image || undefined,
      metaTitle: seo.metaTitle || undefined,
      metaDescription: seo.metaDescription || undefined,
      ogTitle: seo.ogTitle || undefined,
      ogDescription: seo.ogDescription || undefined,
      ogImage: seo.ogImage || undefined,
      noindex: seo.noindex || undefined,
    };

    try {
      const res =
        mode === "create"
          ? await fetch("/api/admin/posts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
          : await fetch(`/api/admin/posts/${initialPost!.slug}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to save post.");
        setSaving(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Featured Image</label>
        <div className="mt-2 flex items-center gap-4">
          <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-lg bg-warmgray">
            {image ? (
              <Image src={image} alt="Featured image preview" fill sizes="144px" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">No image</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleFileSelect}
              disabled={uploading}
              className="text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-primary-dark"
            />
            {uploading && <p className="text-xs text-slate-500">Uploading...</p>}
            {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
            {image && !uploading && (
              <button
                type="button"
                onClick={() => setImage("")}
                className="w-fit text-xs font-medium text-slate-500 hover:text-red-600"
              >
                Remove image
              </button>
            )}
          </div>
        </div>
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category</label>
          <input
            required
            list="admin-categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <datalist id="admin-categories">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Date</label>
          <input
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Excerpt</label>
        <textarea
          required
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Body <span className="normal-case text-slate-400">(separate paragraphs with a blank line)</span>
        </label>
        <textarea
          required
          rows={12}
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm leading-relaxed focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <SeoFieldset value={seo} onChange={setSeo} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving..." : mode === "create" ? "Publish Post" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
