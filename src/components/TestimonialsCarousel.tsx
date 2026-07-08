"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/data/site";

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="min-h-[160px] rounded-2xl border border-slate-100 bg-white p-8 shadow-sm sm:p-10">
        <svg className="mx-auto mb-4 h-8 w-8 text-cyan/40" fill="currentColor" viewBox="0 0 32 32">
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8Zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8Z" />
        </svg>
        <p className="text-lg font-medium leading-relaxed text-slate-700 sm:text-xl">&ldquo;{current.quote}&rdquo;</p>
        <p className="mt-5 text-sm font-semibold text-navy">— {current.attribution}</p>
      </div>
      <div className="mt-5 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-cyan" : "w-2 bg-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
}
