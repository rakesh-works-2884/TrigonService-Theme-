import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Trigon Services collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-slate-700 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-400">Last updated: July 5, 2026</p>

        <div>
          <h2 className="text-lg font-semibold text-navy">1. Information We Collect</h2>
          <p className="mt-2 leading-relaxed">
            When you use our consultation forms, contact us, or subscribe to our newsletter, we collect information
            such as your name, email address, phone number, and details about the service you are enquiring about.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-navy">2. How We Use Your Information</h2>
          <p className="mt-2 leading-relaxed">
            We use the information you provide to respond to enquiries, deliver the services you request, and, where
            you have opted in, to send updates about compliance deadlines and relevant news.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-navy">3. Cookies</h2>
          <p className="mt-2 leading-relaxed">
            We use cookies to improve site functionality and understand how visitors use our website. You can control
            cookie preferences through your browser settings.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-navy">4. Data Sharing</h2>
          <p className="mt-2 leading-relaxed">
            We do not sell your personal information. We may share information with regulatory authorities where
            required by law, or with service providers who help us operate our business, under confidentiality
            obligations.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-navy">5. Contact Us</h2>
          <p className="mt-2 leading-relaxed">
            For questions about this policy, contact us at{" "}
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
