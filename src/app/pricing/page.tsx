import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ConsultationButton from "@/components/ConsultationButton";
import ImageShowcase from "@/components/decor/ImageShowcase";
import Accordion from "@/components/Accordion";
import FadeIn from "@/components/decor/FadeIn";
import { pricingPlans } from "@/data/pricing";
import { pexelsPhoto } from "@/lib/images";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description: "Transparent, startup-friendly pricing packages for Trigon Services' compliance services.",
};

const pricingFaq = [
  {
    question: "Do prices include government or statutory fees?",
    answer:
      "No — government and statutory fees (MCA, GST portal, trademark filing, etc.) are charged separately at actual cost. Our pricing covers professional service fees only.",
  },
  {
    question: "Can I switch plans as my business grows?",
    answer:
      "Yes. You can move from Starter to Growth, or into a custom Enterprise scope, at any time — we'll adjust billing to reflect the change.",
  },
  {
    question: "What happens if I need a service outside my current plan?",
    answer:
      "We'll scope the additional work separately and share a clear quote upfront before any work begins — no surprise charges.",
  },
  {
    question: "Is there a refund if I change my mind?",
    answer:
      "Unearned professional fees are refundable if cancelled before filing work begins. See our Refund Policy for full details.",
  },
];

export default function PricingPage() {
  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        title="Enterprise-Grade Compliance, Startup-Friendly Pricing"
        description="Pick a package that fits your stage, or talk to us for a custom scope and quote."
      />

      <ImageShowcase
        src={pexelsPhoto(8353807, 1600)}
        alt="Compliance advisor reviewing a service plan"
        tilt="left"
        badge={{ value: "3", label: "Flexible Plans" }}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.slug}
                className={`hover-tilt flex flex-col rounded-2xl border p-8 shadow-sm ${
                  plan.highlighted ? "border-accent bg-white ring-2 ring-accent" : "border-slate-100 bg-white"
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    Most Popular
                  </span>
                )}
                <h2 className="text-lg font-bold text-heading">{plan.name}</h2>
                <p className="mt-4 text-3xl font-bold text-primary">{plan.startingPrice}</p>
                <p className="mt-1 text-xs text-slate-400">{plan.billingNote}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <ConsultationButton
                  className={`btn-brand mt-8 w-full text-center uppercase ${
                    plan.highlighted ? "" : "!bg-transparent !text-primary border border-primary hover:!bg-warmgray"
                  }`}
                >
                  Get Started
                </ConsultationButton>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-slate-400">
            * Starting prices shown are indicative placeholders and will be confirmed based on your exact requirement.
          </p>
        </FadeIn>
      </section>

      <section className="bg-warmgray py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-center text-2xl font-bold text-heading sm:text-3xl">Pricing Questions</h2>
            <div className="mt-10">
              <Accordion items={pricingFaq} />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
