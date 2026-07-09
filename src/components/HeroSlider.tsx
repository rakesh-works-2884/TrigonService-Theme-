import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import HeroBars from "@/components/HeroBars";

export default function HeroSlider() {
  return (
    <section className="relative h-[620px] overflow-hidden bg-heading sm:h-[680px] lg:h-[760px]">
      <Image
        src="/hero/bg-revslider-home1-01.jpg"
        alt="Compliance team reviewing documents in a meeting"
        fill
        priority
        className="hero-kenburns object-cover"
      />

      <HeroBars />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent-light">
              India&apos;s End-to-End Compliance Partner
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 max-w-md text-white/85">{siteConfig.description}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/consultation" className="btn-brand bg-white !text-primary hover:bg-white/90">
                Get Free Consultation
              </Link>
              <Link href="/services" className="btn-brand-outline">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
