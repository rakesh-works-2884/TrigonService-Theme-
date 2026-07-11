"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Testimonial } from "@/lib/site-settings-store";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="theme-swiper relative mx-auto max-w-3xl px-12">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        navigation
        className="pb-10"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.attribution}>
            <div className="bg-white p-8 text-center shadow-[0px_10px_60px_0px_rgba(0,0,0,0.07)] sm:p-12">
              <div className="relative mx-auto flex h-[135px] w-[135px] items-center justify-center rounded-full bg-white">
                <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-gradient-to-b from-primary to-secondary">
                  <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full border-[5px] border-white bg-primary/15 text-2xl font-bold text-primary">
                    {t.attribution.charAt(0)}
                  </div>
                </div>
              </div>

              <p className="mt-6 text-lg font-medium leading-relaxed text-heading sm:text-xl">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mx-auto mt-6 inline-block rounded-[60px] bg-gradient-to-r from-primary to-secondary px-6 py-2.5">
                <p className="text-sm font-semibold text-white">{t.attribution}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
