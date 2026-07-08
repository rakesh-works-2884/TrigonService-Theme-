import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ConsultationButton from "@/components/ConsultationButton";
import ImageShowcase from "@/components/decor/ImageShowcase";
import WhyChooseIcon from "@/components/WhyChooseIcon";
import FadeIn from "@/components/decor/FadeIn";
import { whyChooseUs, processSteps } from "@/data/site";
import { pexelsPhoto } from "@/lib/images";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "Why businesses choose Trigon Services: one-stop compliance solutions, pan-India service, expert team, affordable pricing, and on-time delivery.",
};

export default function WhyChooseUsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Why Choose Us"
        title="A Compliance Partner Built Around Your Business"
        description="Five reasons founders, CFOs, and operators trust Trigon with their compliance."
      />

      <ImageShowcase
        src={pexelsPhoto(7644014, 1600)}
        alt="Team member presenting during a work meeting"
        badge={{ value: "500+", label: "Businesses Supported" }}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="hover-tilt group rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand text-white shadow-lg shadow-cyan/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <WhyChooseIcon iconKey={item.key} className="h-7 w-7" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="bg-navy-dark py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How We Work</h2>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, idx) => (
                <div key={step.title} className="hover-tilt rounded-2xl border border-white/10 bg-white/5 p-6">
                  <span className="text-4xl font-bold text-cyan-light/40">{String(idx + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="gradient-brand py-16 text-white">
        <FadeIn className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Experience the Trigon difference</h2>
          <ConsultationButton className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy shadow-lg hover:bg-warmgray" />
        </FadeIn>
      </section>
    </div>
  );
}
