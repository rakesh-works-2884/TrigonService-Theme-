"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SiteImages } from "@/lib/site-images-store";
import ImageUploadField from "@/components/admin/ImageUploadField";
import HeroSlidesField from "@/components/admin/HeroSlidesField";

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-slate-500";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <legend className="px-1 text-sm font-bold text-primary">{title}</legend>
      {children}
    </fieldset>
  );
}

function SingleImageField({
  label,
  image,
  imageAlt,
  onImageChange,
  onAltChange,
}: {
  label: string;
  image: string;
  imageAlt: string;
  onImageChange: (url: string) => void;
  onAltChange: (alt: string) => void;
}) {
  return (
    <div className="space-y-3">
      <ImageUploadField label={label} value={image} onChange={onImageChange} />
      <div>
        <label className={labelClass}>Alt Text</label>
        <input value={imageAlt} onChange={(e) => onAltChange(e.target.value)} className={inputClass} />
      </div>
    </div>
  );
}

export default function SiteImagesForm({ initialImages }: { initialImages: SiteImages }) {
  const router = useRouter();
  const [images, setImages] = useState<SiteImages>(initialImages);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const setField = <K extends keyof SiteImages>(key: K, value: SiteImages[K]) =>
    setImages((s) => ({ ...s, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);

    try {
      const res = await fetch("/api/admin/site-images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(images),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to save images.");
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <Section title="Home Page Hero Carousel">
        <p className="text-xs text-slate-400">
          These slides autoplay on the homepage. Add, remove, or reorder them, and swap the background photo for each.
        </p>
        <HeroSlidesField value={images.heroSlides} onChange={(v) => setField("heroSlides", v)} />
      </Section>

      <Section title="Home Page — Other Images">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <SingleImageField
            label="About Intro — Main Photo"
            image={images.homeAboutMainImage}
            imageAlt={images.homeAboutMainImageAlt}
            onImageChange={(v) => setField("homeAboutMainImage", v)}
            onAltChange={(v) => setField("homeAboutMainImageAlt", v)}
          />
          <SingleImageField
            label="About Intro — Inset Photo"
            image={images.homeAboutInsetImage}
            imageAlt={images.homeAboutInsetImageAlt}
            onImageChange={(v) => setField("homeAboutInsetImage", v)}
            onAltChange={(v) => setField("homeAboutInsetImageAlt", v)}
          />
          <SingleImageField
            label="Gradient CTA Banner Photo"
            image={images.homeCtaBannerImage}
            imageAlt={images.homeCtaBannerImageAlt}
            onImageChange={(v) => setField("homeCtaBannerImage", v)}
            onAltChange={(v) => setField("homeCtaBannerImageAlt", v)}
          />
          <SingleImageField
            label="Dark CTA Band Photo"
            image={images.homeDarkCtaImage}
            imageAlt={images.homeDarkCtaImageAlt}
            onImageChange={(v) => setField("homeDarkCtaImage", v)}
            onAltChange={(v) => setField("homeDarkCtaImageAlt", v)}
          />
        </div>
      </Section>

      <Section title="About Page">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <SingleImageField
            label="Main Photo"
            image={images.aboutMainImage}
            imageAlt={images.aboutMainImageAlt}
            onImageChange={(v) => setField("aboutMainImage", v)}
            onAltChange={(v) => setField("aboutMainImageAlt", v)}
          />
          <SingleImageField
            label="Inset Photo"
            image={images.aboutInsetImage}
            imageAlt={images.aboutInsetImageAlt}
            onImageChange={(v) => setField("aboutInsetImage", v)}
            onAltChange={(v) => setField("aboutInsetImageAlt", v)}
          />
        </div>
      </Section>

      <Section title="Why Choose Us Page">
        <SingleImageField
          label="Showcase Banner"
          image={images.whyChooseUsShowcaseImage}
          imageAlt={images.whyChooseUsShowcaseImageAlt}
          onImageChange={(v) => setField("whyChooseUsShowcaseImage", v)}
          onAltChange={(v) => setField("whyChooseUsShowcaseImageAlt", v)}
        />
      </Section>

      <Section title="Pricing Page">
        <SingleImageField
          label="Showcase Banner"
          image={images.pricingShowcaseImage}
          imageAlt={images.pricingShowcaseImageAlt}
          onImageChange={(v) => setField("pricingShowcaseImage", v)}
          onAltChange={(v) => setField("pricingShowcaseImageAlt", v)}
        />
      </Section>

      <Section title="Testimonials Page">
        <SingleImageField
          label="Showcase Banner"
          image={images.testimonialsShowcaseImage}
          imageAlt={images.testimonialsShowcaseImageAlt}
          onImageChange={(v) => setField("testimonialsShowcaseImage", v)}
          onAltChange={(v) => setField("testimonialsShowcaseImageAlt", v)}
        />
      </Section>

      <Section title="Consultation Page">
        <SingleImageField
          label="Showcase Banner"
          image={images.consultationShowcaseImage}
          imageAlt={images.consultationShowcaseImageAlt}
          onImageChange={(v) => setField("consultationShowcaseImage", v)}
          onAltChange={(v) => setField("consultationShowcaseImageAlt", v)}
        />
      </Section>

      <Section title="Contact Page">
        <SingleImageField
          label="Sidebar Photo"
          image={images.contactSidebarImage}
          imageAlt={images.contactSidebarImageAlt}
          onImageChange={(v) => setField("contactSidebarImage", v)}
          onAltChange={(v) => setField("contactSidebarImageAlt", v)}
        />
      </Section>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-600">Saved.</p>}

      <div className="sticky bottom-4 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save All Images"}
        </button>
      </div>
    </form>
  );
}
