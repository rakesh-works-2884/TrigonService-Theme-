import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden gradient-brand px-4 text-center text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <span className="text-sm font-semibold uppercase tracking-wide text-cyan-light">Error 404</span>
      <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">Page Not Found</h1>
      <p className="mt-5 max-w-md text-slate-200">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link href="/" className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-navy hover:bg-warmgray">
          Back to Home
        </Link>
        <Link
          href="/services"
          className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10"
        >
          Explore Services
        </Link>
      </div>
    </div>
  );
}
