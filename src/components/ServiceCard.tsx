import Image from "next/image";
import Link from "next/link";
import ServiceIcon from "@/components/ServiceIcon";
import TiltCard from "@/components/decor/TiltCard";

export default function ServiceCard({
  slug,
  title,
  summary,
  image,
  imageAlt,
}: {
  slug: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <Link href={`/services/${slug}`} className="group relative block">
      <TiltCard className="relative h-48 overflow-hidden" intensity={8}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 origin-top scale-y-0 bg-black/30 transition-transform duration-500 group-hover:scale-y-100" />
      </TiltCard>

      <div className="relative mx-5">
        <span className="absolute -top-[70px] right-5 z-10 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30 transition-all duration-500 group-hover:-rotate-6 group-hover:bg-white group-hover:from-white group-hover:to-white group-hover:text-primary group-hover:shadow-xl">
          <ServiceIcon slug={slug} className="h-8 w-8 transition-transform duration-500 group-hover:scale-110" />
        </span>

        <div className="relative overflow-hidden bg-white px-6 py-6 shadow-[0px_10px_60px_0px_rgba(0,0,0,0.07)] sm:px-[45px] sm:py-[25px]">
          <div className="absolute inset-x-0 top-0 z-0 h-full origin-top scale-y-0 bg-primary transition-transform duration-500 group-hover:scale-y-100" />
          <h3 className="relative z-[1] text-xl font-extrabold text-heading transition-colors duration-500 group-hover:text-white">
            {title}
          </h3>
          <p className="relative z-[1] mt-2 text-sm leading-relaxed text-body transition-colors duration-500 group-hover:text-white/90">
            {summary}
          </p>
        </div>
      </div>
    </Link>
  );
}
