"use client";

import { useState } from "react";
import { servicePillars } from "@/data/services";
import { submitLead } from "@/lib/leads";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (submitted) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-2xl text-accent">
          ✓
        </div>
        <h3 className="text-xl font-semibold text-heading">Message sent</h3>
        <p className="mt-2 text-slate-600">Thank you for reaching out. Our team will respond within 24 hours.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const result = await submitLead({
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      service: String(form.get("service") || ""),
      message: String(form.get("message") || ""),
      source: "Contact Page",
    });

    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <form className="space-y-5 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Full Name</label>
          <input
            required
            name="name"
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone Number</label>
          <input
            required
            type="tel"
            name="phone"
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email Address</label>
        <input
          required
          type="email"
          name="email"
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Service of Interest</label>
        <select
          name="service"
          defaultValue=""
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="" disabled>
            Select a service
          </option>
          {servicePillars.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Message</label>
        <textarea
          name="message"
          rows={4}
          className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-brand w-full disabled:opacity-60 sm:w-auto">
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
