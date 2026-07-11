"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SiteSettings } from "@/lib/site-settings-store";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RepeatableRows from "@/components/admin/RepeatableRows";

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

export default function SiteSettingsForm({ initialSettings }: { initialSettings: SiteSettings }) {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [blogCategoriesText, setBlogCategoriesText] = useState(initialSettings.blogCategories.join("\n"));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const setField = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) =>
    setSettings((s) => ({ ...s, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);

    const payload: SiteSettings = {
      ...settings,
      blogCategories: blogCategoriesText.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to save settings.");
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
      <Section title="Company Info">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Company Name</label>
            <input
              value={settings.siteConfig.name}
              onChange={(e) => setField("siteConfig", { ...settings.siteConfig, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Tagline</label>
            <input
              value={settings.siteConfig.tagline}
              onChange={(e) => setField("siteConfig", { ...settings.siteConfig, tagline: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            rows={2}
            value={settings.siteConfig.description}
            onChange={(e) => setField("siteConfig", { ...settings.siteConfig, description: e.target.value })}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Email</label>
            <input
              value={settings.siteConfig.email}
              onChange={(e) => setField("siteConfig", { ...settings.siteConfig, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone (display, e.g. +91-9266947125)</label>
            <input
              value={settings.siteConfig.phone}
              onChange={(e) => setField("siteConfig", { ...settings.siteConfig, phone: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone Href (digits only, e.g. +919266947125)</label>
            <input
              value={settings.siteConfig.phoneHref}
              onChange={(e) => setField("siteConfig", { ...settings.siteConfig, phoneHref: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>WhatsApp Number (digits only, with country code)</label>
            <input
              value={settings.siteConfig.whatsappNumber}
              onChange={(e) => setField("siteConfig", { ...settings.siteConfig, whatsappNumber: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Additional Phone Numbers (shown on Contact page)</label>
          <div className="mt-2">
            <RepeatableRows
              value={settings.siteConfig.additionalPhones as unknown as Record<string, string>[]}
              onChange={(rows) =>
                setField("siteConfig", {
                  ...settings.siteConfig,
                  additionalPhones: rows as unknown as SiteSettings["siteConfig"]["additionalPhones"],
                })
              }
              fields={[
                { name: "phone", label: "Phone (display)", placeholder: "+91 87500 08688" },
                { name: "phoneHref", label: "Phone Href (digits only)", placeholder: "+918750008688" },
              ]}
              addLabel="Add Phone Number"
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Address</label>
          <textarea
            rows={2}
            value={settings.siteConfig.address}
            onChange={(e) => setField("siteConfig", { ...settings.siteConfig, address: e.target.value })}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Instagram URL</label>
            <input
              value={settings.siteConfig.socials.instagram}
              onChange={(e) =>
                setField("siteConfig", {
                  ...settings.siteConfig,
                  socials: { ...settings.siteConfig.socials, instagram: e.target.value },
                })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Facebook URL</label>
            <input
              value={settings.siteConfig.socials.facebook}
              onChange={(e) =>
                setField("siteConfig", {
                  ...settings.siteConfig,
                  socials: { ...settings.siteConfig.socials, facebook: e.target.value },
                })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>X (Twitter) URL</label>
            <input
              value={settings.siteConfig.socials.x}
              onChange={(e) =>
                setField("siteConfig", {
                  ...settings.siteConfig,
                  socials: { ...settings.siteConfig.socials, x: e.target.value },
                })
              }
              className={inputClass}
            />
          </div>
        </div>
      </Section>

      <Section title="Trust Stats (homepage stat strip)">
        <RepeatableRows
          value={settings.trustStats.map((t) => ({ label: t.label, value: t.value }))}
          onChange={(rows) => setField("trustStats", rows as unknown as SiteSettings["trustStats"])}
          fields={[
            { name: "value", label: "Value (e.g. 500+)" },
            { name: "label", label: "Label (e.g. Clients Served)" },
          ]}
          addLabel="Add Stat"
        />
      </Section>

      <Section title="Why Choose Us (fixed 5 items — icon is tied to each one)">
        <div className="space-y-4">
          {settings.whyChooseUs.map((item, index) => (
            <div key={item.key} className="rounded-lg border border-slate-200 p-3">
              <span className="mb-2 inline-block rounded-full bg-warmgray px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                {item.key}
              </span>
              <input
                value={item.title}
                onChange={(e) => {
                  const next = settings.whyChooseUs.slice();
                  next[index] = { ...item, title: e.target.value };
                  setField("whyChooseUs", next);
                }}
                placeholder="Title"
                className={inputClass}
              />
              <textarea
                rows={2}
                value={item.description}
                onChange={(e) => {
                  const next = settings.whyChooseUs.slice();
                  next[index] = { ...item, description: e.target.value };
                  setField("whyChooseUs", next);
                }}
                placeholder="Description"
                className={`${inputClass} resize-none`}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="How We Work (process steps)">
        <RepeatableRows
          value={settings.processSteps}
          onChange={(rows) => setField("processSteps", rows as unknown as SiteSettings["processSteps"])}
          fields={[
            { name: "title", label: "Title (e.g. Consultation)" },
            { name: "description", label: "Description", multiline: true },
          ]}
          addLabel="Add Step"
        />
      </Section>

      <Section title="Testimonials">
        <RepeatableRows
          value={settings.testimonials}
          onChange={(rows) => setField("testimonials", rows as unknown as SiteSettings["testimonials"])}
          fields={[
            { name: "quote", label: "Quote", multiline: true },
            { name: "attribution", label: "Attribution (e.g. Founder, SaaS Startup)" },
          ]}
          addLabel="Add Testimonial"
        />
      </Section>

      <Section title="Blog Categories">
        <textarea
          rows={5}
          value={blogCategoriesText}
          onChange={(e) => setBlogCategoriesText(e.target.value)}
          className={inputClass}
        />
        <p className="text-xs text-slate-400">One per line.</p>
      </Section>

      <Section title="Team (fixed roles — icon is tied to each one)">
        <div className="space-y-4">
          {settings.team.map((member, index) => (
            <div key={member.key} className="rounded-lg border border-slate-200 p-3">
              <span className="mb-2 inline-block rounded-full bg-warmgray px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                {member.key}
              </span>
              <input
                value={member.role}
                onChange={(e) => {
                  const next = settings.team.slice();
                  next[index] = { ...member, role: e.target.value };
                  setField("team", next);
                }}
                placeholder="Role"
                className={inputClass}
              />
              <textarea
                rows={2}
                value={member.description}
                onChange={(e) => {
                  const next = settings.team.slice();
                  next[index] = { ...member, description: e.target.value };
                  setField("team", next);
                }}
                placeholder="Description"
                className={`${inputClass} resize-none`}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Core Values">
        <RepeatableRows
          value={settings.coreValues}
          onChange={(rows) => setField("coreValues", rows as unknown as SiteSettings["coreValues"])}
          fields={[
            { name: "title", label: "Title (e.g. Integrity & Trust)" },
            { name: "description", label: "Description", multiline: true },
          ]}
          addLabel="Add Core Value"
        />
      </Section>

      <Section title="Industries Page — Shared Challenges Image">
        <ImageUploadField
          label="Image"
          value={settings.industriesChallengesImage}
          onChange={(url) => setField("industriesChallengesImage", url)}
        />
        <div>
          <label className={labelClass}>Image Alt Text</label>
          <input
            value={settings.industriesChallengesImageAlt}
            onChange={(e) => setField("industriesChallengesImageAlt", e.target.value)}
            className={inputClass}
          />
        </div>
      </Section>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && !error && <p className="text-sm text-green-600">Settings saved.</p>}

      <div className="sticky bottom-4 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save All Settings"}
        </button>
      </div>
    </form>
  );
}
