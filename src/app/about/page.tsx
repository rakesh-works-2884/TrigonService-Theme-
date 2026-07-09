import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ConsultationButton from "@/components/ConsultationButton";
import { coreValues, team } from "@/data/site";
import { pexelsPhoto } from "@/lib/images";
import TeamIcon from "@/components/TeamIcon";
import ImageReveal from "@/components/decor/ImageReveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Trigon Services' mission, vision, core values, and the team of lawyers, CAs, and CS professionals behind our compliance work.",
};

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
          <ImageReveal className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="absolute -left-6 -top-6 h-full w-full rounded-sm bg-light" />
            <div className="img-tilt relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-xl">
              <Image
                src={pexelsPhoto(8124232, 1000)}
                alt="Trigon Services compliance team holding client documents"
                fill
                sizes="(min-width: 1024px) 400px, 80vw"
                className="object-cover"
              />
            </div>
            <div className="img-tilt absolute -bottom-8 -right-6 z-10 h-32 w-44 overflow-hidden rounded-sm shadow-xl ring-4 ring-white sm:h-36 sm:w-52">
              <Image
                src={pexelsPhoto(33175650, 500)}
                alt="Business handshake sealing a partnership"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <div className="absolute -top-6 left-1/2 z-10 hidden -translate-x-1/2 rounded-sm bg-white px-6 py-4 text-center shadow-xl sm:block">
              <p className="text-2xl font-extrabold text-primary">10+ Yrs</p>
              <p className="text-xs text-body">Combined Team Experience</p>
            </div>
          </ImageReveal>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-heading">Our Mission</h2>
              <p className="mt-3 leading-relaxed text-body">
                To empower businesses by delivering high-quality, tech-enabled compliance solutions that save time,
                reduce risk, and allow founders, executives, and teams to focus on innovation and growth.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-heading">Our Vision</h2>
              <p className="mt-3 leading-relaxed text-body">
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
            <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">Our Core Values</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((v) => (
              <div key={v.title} className="border border-light bg-white p-6 text-center shadow-sm">
                <h3 className="text-sm font-semibold text-heading">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">Our Team</h2>
          <p className="mt-4 text-body">
            A multi-disciplinary team so every compliance need is handled by the right expert.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.key} className="border border-light bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                <TeamIcon iconKey={member.key} />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-heading">{member.role}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-16 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ready to work with a partner you can trust?</h2>
          <ConsultationButton className="btn-brand bg-white !text-primary hover:bg-warmgray" />
        </div>
      </section>
    </div>
  );
}
