import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getSiteSettings } from "@/lib/site-settings-store";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Trigon Services' refund and cancellation policy for compliance and advisory engagements.",
};

export default async function RefundPolicyPage() {
  const { siteConfig } = await getSiteSettings();

  return (
    <div>
      <PageHero eyebrow="Legal" title="Refund Policy" />
      <section className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-slate-700 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-400">Last updated: July 5, 2026</p>

        <div>
          <h2 className="text-lg font-semibold text-heading">1. Service-Based Engagements</h2>
          <p className="mt-2 leading-relaxed">
            Because our services involve professional time and, in many cases, government filing fees paid on your
            behalf, refunds are evaluated based on the stage of work completed at the time of a cancellation request.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-heading">2. Before Filing Begins</h2>
          <p className="mt-2 leading-relaxed">
            If you cancel before any documentation or filing work has started, you are eligible for a full refund of
            fees paid, minus any payment gateway charges.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-heading">3. After Filing Has Begun</h2>
          <p className="mt-2 leading-relaxed">
            Once documentation preparation or government filing has commenced, fees already incurred (including
            statutory/government fees) are non-refundable. Any remaining unearned professional fee may be refunded
            at our discretion.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-heading">4. Government Fees</h2>
          <p className="mt-2 leading-relaxed">
            Statutory fees paid to government departments or portals on your behalf are non-refundable once
            submitted, regardless of the outcome of the application.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-heading">5. Requesting a Refund</h2>
          <p className="mt-2 leading-relaxed">
            To request a refund, contact us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-primary underline">
              {siteConfig.email}
            </a>{" "}
            with your engagement details. We aim to resolve refund requests within 7 business days.
          </p>
        </div>
      </section>
    </div>
  );
}
