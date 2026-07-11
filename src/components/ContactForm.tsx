"use client";

import { useState } from "react";
import type { ServicePillar } from "@/lib/services-store";
import { submitLead } from "@/lib/leads";

export default function ContactForm({ services }: { services: ServicePillar[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (submitted) {
    return (
      <div className="animate-[fadeInUp_0.5s_ease] rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-warmgray p-10 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-2xl text-white shadow-md">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-heading">Message Sent</h3>
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

  const fieldClass =
    "peer mt-2 w-full rounded-xl border border-slate-200 bg-warmgray/40 px-4 py-3 text-sm text-heading transition-all duration-200 outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 hover:border-slate-300";

  return (
    <form
      className="relative space-y-5 overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-slate-200/60 transition-shadow duration-300 hover:shadow-xl"
      onSubmit={handleSubmit}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl" />

      <div className="relative">
        <h3 className="text-lg font-bold text-heading">Send Us a Message</h3>
        <p className="mt-1 text-sm text-slate-500">Fill in your details and we&apos;ll get back to you within 24 hours.</p>
      </div>

      <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Full Name</label>
          <input required name="name" placeholder="John Doe" className={fieldClass} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone Number</label>
          <input required type="tel" name="phone" placeholder="+91 98765 43210" className={fieldClass} />
        </div>
      </div>
      <div className="relative">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email Address</label>
        <input required type="email" name="email" placeholder="you@company.com" className={fieldClass} />
      </div>
      <div className="relative">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Service of Interest</label>
        <select name="service" defaultValue="" className={`${fieldClass} cursor-pointer`}>
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div className="relative">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Message</label>
        <textarea name="message" rows={4} placeholder="Tell us briefly what you need..." className={`${fieldClass} resize-none`} />
      </div>

      {error && (
        <p className="relative rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-brand relative flex w-full items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 sm:w-auto"
      >
        {submitting ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
