"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function ImageUploadField({
  label = "Image",
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

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
        onChange(data.url);
      }
    } catch {
      setUploadError("Upload failed. Try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</label>
      <div className="mt-2 flex items-center gap-4">
        <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-lg bg-warmgray">
          {value ? (
            <Image src={value} alt="Preview" fill sizes="144px" className="object-cover" />
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
          {value && !uploading && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="w-fit text-xs font-medium text-slate-500 hover:text-red-600"
            >
              Remove image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
