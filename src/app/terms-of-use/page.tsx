import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms and conditions governing the use of Trigon Services' website and services.",
};

export default function TermsOfUsePage() {
  return (
    <div>
      <PageHero eyebrow="Legal" title="Terms of Use" />
      <section className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-slate-700 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-400">Last updated: July 5, 2026</p>

        <div>
          <h2 className="text-lg font-semibold text-navy">1. Acceptance of Terms</h2>
          <p className="mt-2 leading-relaxed">
            By accessing this website or engaging Trigon Services for compliance, registration, or advisory services,
            you agree to be bound by these Terms of Use.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-navy">2. Scope of Services</h2>
          <p className="mt-2 leading-relaxed">
            Services described on this website are subject to a specific engagement scope agreed with each client.
            Timelines and pricing referenced on the site are indicative and confirmed at the time of engagement.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-navy">3. Client Responsibilities</h2>
          <p className="mt-2 leading-relaxed">
            Clients are responsible for providing accurate documentation and information required to complete
            filings. Delays or errors caused by inaccurate information provided by the client are not the
            responsibility of Trigon Services.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-navy">4. Limitation of Liability</h2>
          <p className="mt-2 leading-relaxed">
            Trigon Services will exercise professional care in all filings and advisory work but does not guarantee
            approval outcomes by government authorities, which remain at the sole discretion of those authorities.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-navy">5. Governing Law</h2>
          <p className="mt-2 leading-relaxed">
            These terms are governed by the laws of India, with courts in Uttar Pradesh having jurisdiction over any
            disputes.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-navy">6. Contact</h2>
          <p className="mt-2 leading-relaxed">
            Questions about these terms can be directed to{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-navy underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
