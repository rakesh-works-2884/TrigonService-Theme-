"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PricingPlan } from "@/lib/pricing-store";

type Props = {
  mode: "create" | "edit";
  initialPlan?: PricingPlan;
};

export default function PricingForm({ mode, initialPlan }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialPlan?.name ?? "");
  const [startingPrice, setStartingPrice] = useState(initialPlan?.startingPrice ?? "");
  const [billingNote, setBillingNote] = useState(initialPlan?.billingNote ?? "");
  const [featuresText, setFeaturesText] = useState((initialPlan?.features ?? []).join("\n"));
  const [highlighted, setHighlighted] = useState(Boolean(initialPlan?.highlighted));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      name,
      startingPrice,
      billingNote,
      features: featuresText.split("\n").map((s) => s.trim()).filter(Boolean),
      highlighted,
    };

    try {
      const res =
        mode === "create"
          ? await fetch("/api/admin/pricing", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
          : await fetch(`/api/admin/pricing/${initialPlan!.slug}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to save plan.");
        setSaving(false);
        return;
      }

      router.push("/admin/pricing");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Plan Name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Starting Price <span className="normal-case text-slate-400">(e.g. ₹1,499* or Custom)</span>
          </label>
          <input
            required
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Billing Note</label>
          <input
            required
            value={billingNote}
            onChange={(e) => setBillingNote(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Features <span className="normal-case text-slate-400">(one per line)</span>
        </label>
        <textarea
          rows={6}
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={highlighted}
          onChange={(e) => setHighlighted(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-accent"
        />
        Highlight as "Most Popular"
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving..." : mode === "create" ? "Publish Plan" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
