"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { SiteConfig } from "@/lib/site-settings-store";
import type { ServicePillar } from "@/lib/services-store";
import { submitLead } from "@/lib/leads";

type ConsultationContextValue = {
  openModal: () => void;
};

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

export function useConsultationModal() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) {
    throw new Error("useConsultationModal must be used within ConsultationModalProvider");
  }
  return ctx;
}

export default function ConsultationModalProvider({
  children,
  siteConfig,
  services,
}: {
  children: React.ReactNode;
  siteConfig: SiteConfig;
  services: ServicePillar[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const openModal = useCallback(() => {
    setSubmitted(false);
    setError("");
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeModal]);

  return (
    <ConsultationContext.Provider value={{ openModal }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-accent-light/40 hover:text-primary"
            >
              &times;
            </button>

            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-2xl text-accent">
                  ✓
                </div>
                <h3 className="text-xl font-semibold text-heading">Thank you!</h3>
                <p className="mt-2 text-slate-600">
                  Your request has been received. Our team will reach out within 24 hours.
                </p>
                <button onClick={closeModal} className="btn-brand mt-6">
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-heading sm:text-2xl">Get a Free Consultation</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Tell us what you need — our team will get back to you within 24 hours.
                </p>
                <form
                  className="mt-6 space-y-4"
                  onSubmit={async (e) => {
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
                      source: "Consultation Modal",
                    });
                    setSubmitting(false);
                    if (result.ok) {
                      setSubmitted(true);
                    } else {
                      setError(result.error || "Something went wrong. Please try again.");
                    }
                  }}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      required
                      name="name"
                      placeholder="Full name"
                      className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <select
                    name="service"
                    defaultValue=""
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="" disabled>
                      Service of interest
                    </option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us briefly what you need"
                    className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <button type="submit" disabled={submitting} className="btn-brand w-full disabled:opacity-60">
                    {submitting ? "Sending..." : "Request Consultation"}
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    Or reach us directly at{" "}
                    <a href={`tel:${siteConfig.phoneHref}`} className="font-medium text-primary">
                      {siteConfig.phone}
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </ConsultationContext.Provider>
  );
}
