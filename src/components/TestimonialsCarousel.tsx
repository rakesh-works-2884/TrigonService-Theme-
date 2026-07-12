"use client";

import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Testimonial } from "@/lib/site-settings-store";
import IconBadge from "@/components/decor/IconBadge";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="theme-swiper relative mx-auto max-w-6xl px-4 sm:px-14">
      <Swiper
        modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
        effect="coverflow"
        grabCursor
        centeredSlides
        rewind={testimonials.length > 1}
        slidesPerView={1.15}
        spaceBetween={24}
        breakpoints={{
          640: { slidesPerView: 1.3 },
          1024: { slidesPerView: 1.5 },
        }}
        coverflowEffect={{ rotate: 18, stretch: 0, depth: 80, modifier: 1, slideShadows: false }}
        autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        navigation
        className="testimonial-swiper pb-14 pt-8"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.attribution}>
            <div className="group relative rounded-3xl p-[2px]">
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [.swiper-slide-active_&]:opacity-70"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--color-primary), var(--color-accent), var(--color-secondary), var(--color-primary))",
                }}
              />
              <div className="relative overflow-hidden rounded-[calc(1.5rem-2px)] bg-white p-8 text-center shadow-xl shadow-heading/10 sm:p-10">
                <svg
                  className="pointer-events-none absolute -left-3 -top-4 h-24 w-24 text-primary/[0.05]"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8Zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8Z" />
                </svg>

                <div className="relative flex justify-center">
                  <IconBadge orbit size="lg">
                    <span className="text-xl font-bold">{t.attribution.charAt(0)}</span>
                  </IconBadge>
                </div>

                <div className="mt-4 flex justify-center gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3-5.4 3 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
                    </svg>
                  ))}
                </div>

                <p className="relative mt-5 text-base font-medium leading-relaxed text-heading sm:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mx-auto mt-6 inline-block rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 shadow-md shadow-primary/25">
                  <p className="text-sm font-semibold text-white">{t.attribution}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
