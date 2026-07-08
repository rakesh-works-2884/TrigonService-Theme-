import Image from "next/image";
import DotGrid from "@/components/decor/DotGrid";
import FloatingStatCard from "@/components/decor/FloatingStatCard";

type Props = {
  src: string;
  alt: string;
  badge?: { value: string; label: string };
  tilt?: "left" | "right";
  className?: string;
};

export default function ImageShowcase({ src, alt, badge, tilt = "right", className = "" }: Props) {
  const tiltClass = tilt === "left" ? "tilt-card-left" : "tilt-card";

  return (
    <section className={`relative z-10 mx-auto -mt-12 mb-10 max-w-5xl px-4 sm:px-6 lg:px-8 sm:mb-14 ${className}`}>
      <div className="perspective-1000 relative">
        <DotGrid className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 opacity-30" color="#0ea5e9" />
        <div className="animate-spin-slow pointer-events-none absolute -left-6 bottom-8 h-20 w-20 rounded-full border-2 border-dashed border-cyan/30" />
        <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-3xl bg-gradient-to-br from-navy/20 to-cyan/25" />
        <div className={`relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-2xl shadow-navy-dark/30 ring-1 ring-black/5 ${tiltClass}`}>
          <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" priority />
        </div>
        {badge && (
          <FloatingStatCard
            value={badge.value}
            label={badge.label}
            className="absolute -bottom-6 left-6 z-10 hidden sm:flex sm:left-10"
          />
        )}
      </div>
    </section>
  );
}
