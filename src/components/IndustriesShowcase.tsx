"use client";

import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Industry } from "@/lib/industries-store";
import TiltCard from "@/components/decor/TiltCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function IndustriesShowcase({ industries }: { industries: Industry[] }) {
  return (
    <div className="theme-swiper relative px-2">
      <Swiper
        modules={[Navigation, Pagination]}
        loop
        spaceBetween={24}
        slidesPerView={1.1}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {industries.map((industry) => (
          <SwiperSlide key={industry.slug}>
            <Link href={`/industries/${industry.slug}`} className="group relative block overflow-hidden">
              <TiltCard className="relative h-64 w-full overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heading/85 via-heading/20 to-transparent" />
              </TiltCard>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-lg font-bold text-white">{industry.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-white/80">{industry.description}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
