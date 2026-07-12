"use client";

import ImageUploadField from "@/components/admin/ImageUploadField";
import type { HeroSlide } from "@/lib/site-images-store";

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-slate-500";

const BLANK_SLIDE: HeroSlide = {
  image: "",
  imageAlt: "",
  subtitle: "",
  titleMain: "",
  titleSecond: "",
  description: "",
  cta: "",
  href: "",
};

export default function HeroSlidesField({
  value,
  onChange,
}: {
  value: HeroSlide[];
  onChange: (next: HeroSlide[]) => void;
}) {
  const updateSlide = (index: number, patch: Partial<HeroSlide>) => {
    const next = value.slice();
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  const removeSlide = (index: number) => onChange(value.filter((_, i) => i !== index));
  const addSlide = () => onChange([...value, { ...BLANK_SLIDE }]);
  const moveSlide = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= value.length) return;
    const next = value.slice();
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-6">
      {value.map((slide, index) => (
        <div key={index} className="rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-primary">Slide {index + 1}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => moveSlide(index, -1)}
                disabled={index === 0}
                className="rounded-full px-2 py-1 text-xs font-medium text-slate-400 hover:bg-warmgray disabled:opacity-30"
              >
                ↑ Up
              </button>
              <button
                type="button"
                onClick={() => moveSlide(index, 1)}
                disabled={index === value.length - 1}
                className="rounded-full px-2 py-1 text-xs font-medium text-slate-400 hover:bg-warmgray disabled:opacity-30"
              >
                ↓ Down
              </button>
              <button
                type="button"
                onClick={() => removeSlide(index)}
                className="rounded-full px-2 py-1 text-xs font-medium text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>

          <div className="mt-4">
            <ImageUploadField label="Background Image" value={slide.image} onChange={(url) => updateSlide(index, { image: url })} />
          </div>

          <div className="mt-4">
            <label className={labelClass}>Image Alt Text</label>
            <input
              value={slide.imageAlt}
              onChange={(e) => updateSlide(index, { imageAlt: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label className={labelClass}>Badge Text (small pill above the title)</label>
            <input
              value={slide.subtitle}
              onChange={(e) => updateSlide(index, { subtitle: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Title — Line 1</label>
              <input
                value={slide.titleMain}
                onChange={(e) => updateSlide(index, { titleMain: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Title — Line 2 (joined with &quot;&amp;&quot;)</label>
              <input
                value={slide.titleSecond}
                onChange={(e) => updateSlide(index, { titleSecond: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className={labelClass}>Description</label>
            <textarea
              rows={2}
              value={slide.description}
              onChange={(e) => updateSlide(index, { description: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Button Text</label>
              <input
                value={slide.cta}
                onChange={(e) => updateSlide(index, { cta: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Button Link (e.g. /services)</label>
              <input
                value={slide.href}
                onChange={(e) => updateSlide(index, { href: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addSlide}
        className="rounded-full border border-dashed border-slate-300 px-4 py-2 text-xs font-semibold text-slate-500 hover:border-accent hover:text-accent"
      >
        + Add Slide
      </button>
    </div>
  );
}
