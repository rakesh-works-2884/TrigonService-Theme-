"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HeroBars from "@/components/HeroBars";
import "swiper/css";

const slides = [
  {
    photo: "/hero/bg-revslider-home1-01.jpg",
    alt: "Trigon Services — your trusted compliance partner",
    subtitle: "India's End-to-End Compliance Partner",
    titleMain: "Business Registration",
    titleSecond: "Compliance",
    description:
      "From incorporation to ongoing filings, we handle the full lifecycle of business compliance under one roof.",
    cta: "Get Free Consultation",
    href: "/consultation",
  },
  {
    photo: "/hero/bg-revslider-home1-02.jpg",
    alt: "Desk with tax documents, calculator, and GST filing reminders",
    subtitle: "Stay Audit-Ready, Always",
    titleMain: "Tax Filing",
    titleSecond: "Regulatory Compliance",
    description: "GST returns, income tax, TDS, and bookkeeping — tracked on a compliance calendar so nothing slips.",
    cta: "Explore Services",
    href: "/services",
  },
  {
    photo: "/hero/bg-revslider-home1-03.jpg",
    alt: "Certificates of completion laid out on a desk",
    subtitle: "Build Trust With Every Certificate",
    titleMain: "Certifications",
    titleSecond: "Quality Standards",
    description: "ISO, BIS, CE, and every sector-specific certification that builds trust with your customers and partners.",
    cta: "Explore Services",
    href: "/services/certifications",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const active = slides[activeIndex];

  return (
    <section className="relative h-[620px] overflow-hidden bg-heading sm:h-[680px] lg:h-[760px]">
      <Swiper
        modules={[Autoplay]}
        loop
        speed={800}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        onSlideChangeTransitionStart={() => setTextVisible(false)}
        onSlideChangeTransitionEnd={(swiper) => {
          setActiveIndex(swiper.realIndex);
          setTextVisible(true);
        }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.titleMain}>
            <Image src={slide.photo} alt={slide.alt} fill priority={index === 0} className="object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      <HeroBars />

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
        <div className="pointer-events-auto mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="max-w-xl transition-opacity duration-400 ease-out"
            style={{ opacity: textVisible ? 1 : 0 }}
          >
            <span className="inline-block rounded-full bg-slate-600/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-sm backdrop-blur-sm">
              {active.subtitle}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.15] text-white drop-shadow-md sm:text-5xl">
              {active.titleMain} <span className="text-secondary">&amp;</span>
              <br />
              {active.titleSecond}
            </h1>
            <p className="mt-5 max-w-md text-white/85">{active.description}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={active.href} className="btn-brand bg-white !text-primary hover:bg-white/90">
                {active.cta}
              </Link>
              <Link href="/contact" className="btn-brand-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
