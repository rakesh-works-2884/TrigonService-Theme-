"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transitionStyle = (delayMs: number) =>
    reduceMotion
      ? {}
      : {
          transitionProperty: "opacity, transform",
          transitionDuration: "1600ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: `${delayMs}ms`,
        };

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-10">
      {/* Main diagonal color panel — solid gradient, not a tinted photo overlay, so hero text stays legible */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[62%] bg-gradient-to-br from-primary via-primary to-secondary/90 sm:w-[58%]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 78% 100%, 0% 100%)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-56px)",
          ...transitionStyle(0),
        }}
      />

      {/* Top-right corner accent */}
      <div
        className="pointer-events-none absolute right-0 top-0 hidden h-40 w-40 bg-gradient-to-bl from-secondary to-primary-light sm:block lg:h-56 lg:w-56"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 0)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-56px)",
          ...transitionStyle(300),
        }}
      />

      {/* Subtle diagonal line texture, theme-bundled asset */}
      <img
        src="/hero/bg-decoration-header-banner.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[40%] top-0 hidden h-2/3 w-auto select-none lg:block [filter:hue-rotate(-46deg)_saturate(1.15)_brightness(1.3)]"
        style={{
          opacity: visible ? 0.5 : 0,
          transform: visible ? "translateX(0)" : "translateX(-56px)",
          ...transitionStyle(450),
        }}
      />
    </div>
  );
}
