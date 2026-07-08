import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ConsultationButton from "@/components/ConsultationButton";
import { coreValues } from "@/data/site";
import { pexelsPhoto } from "@/lib/images";
import DotGrid from "@/components/decor/DotGrid";
import FloatingStatCard from "@/components/decor/FloatingStatCard";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Trigon Services' mission, vision, core values, and the team of lawyers, CAs, and CS professionals behind our compliance work.",
};

const team = [
  { role: "Corporate Lawyers", description: "Handling legal documentation, IPR, and regulatory filings." },
  { role: "Company Secretaries (CS)", description: "Managing ROC compliance, incorporation, and corporate governance." },
  { role: "Chartered Accountants (CA)", description: "Overseeing tax filing, bookkeeping, and financial advisory." },
  { role: "Compliance Specialists", description: "Tracking licenses, labour law, and certification renewals end-to-end." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Trigon Services"
        title="Your Partner in Compliant, Scalable Growth"
        description="We combine legal expertise, industry knowledge, and technology to help Indian businesses stay compliant at every stage."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div className="perspective-1000 relative mx-auto w-full max-w-md lg:mx-0">
            <DotGrid className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 opacity-20" color="#0ea5e9" />
            <div className="animate-spin-slow pointer-events-none absolute -right-6 top-1/4 h-20 w-20 rounded-full border-2 border-dashed border-cyan/30" />
            <div className="absolute inset-0 -translate-x-4 translate-y-4 -rotate-6 rounded-3xl bg-gradient-to-br from-navy/15 to-cyan/20" />
            <div className="tilt-card relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl shadow-navy/20">
              <Image
                src={pexelsPhoto(8124232, 1000)}
                alt="Trigon Services compliance team holding client documents"
                fill
                sizes="(min-width: 1024px) 400px, 80vw"
                className="object-cover"
              />
            </div>
            <div className="animate-float absolute -bottom-8 -right-6 z-10 h-32 w-44 overflow-hidden rounded-2xl shadow-xl ring-4 ring-white sm:h-36 sm:w-52">
              <Image
                src={pexelsPhoto(33175650, 500)}
                alt="Business handshake sealing a partnership"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <FloatingStatCard
              value="10+ Yrs"
              label="Combined Team Experience"
              className="absolute -left-6 -top-6 z-10 hidden sm:flex"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-navy">Our Mission</h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                To empower businesses by delivering high-quality, tech-enabled compliance solutions that save time,
                reduce risk, and allow founders, executives, and teams to focus on innovation and growth.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">Our Vision</h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                To be India&apos;s most reliable and result-driven compliance partner — helping companies stay fully
                compliant, audit-ready, and future-proof.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warmgray py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Our Core Values</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <h3 className="text-sm font-semibold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Our Team</h2>
          <p className="mt-4 text-slate-600">
            A multi-disciplinary team so every compliance need is handled by the right expert.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.role} className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full gradient-brand text-lg font-bold text-white">
                {member.role.charAt(0)}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-navy">{member.role}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gradient-brand py-16 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ready to work with a partner you can trust?</h2>
          <ConsultationButton className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy shadow-lg hover:bg-warmgray" />
        </div>
      </section>
    </div>
  );
}
