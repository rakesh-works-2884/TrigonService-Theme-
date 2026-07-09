import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  badge?: { value: string; label: string };
  tilt?: "left" | "right";
  className?: string;
};

export default function ImageShowcase({ src, alt, badge, tilt = "right", className = "" }: Props) {
  const offsetSide = tilt === "left" ? "-right-6" : "-left-6";

  return (
    <section className={`relative z-10 mx-auto -mt-12 mb-10 max-w-5xl px-4 sm:px-6 lg:px-8 sm:mb-14 ${className}`}>
      <div className="relative">
        <div className={`absolute -top-6 ${offsetSide} h-full w-full bg-light`} />
        <div className="img-tilt relative aspect-[16/9] w-full overflow-hidden shadow-xl">
          <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" priority />
        </div>
        {badge && (
          <div className="absolute -bottom-6 left-6 z-10 hidden bg-white px-6 py-4 text-center shadow-xl sm:left-10 sm:block">
            <p className="text-2xl font-extrabold text-primary">{badge.value}</p>
            <p className="text-xs text-body">{badge.label}</p>
          </div>
        )}
      </div>
    </section>
  );
}
