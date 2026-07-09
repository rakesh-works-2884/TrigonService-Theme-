import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-primary px-4 text-center text-white">
      <span className="text-sm font-semibold uppercase tracking-wide text-accent-light">Error 404</span>
      <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">Page Not Found</h1>
      <p className="mt-5 max-w-md text-slate-200">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link href="/" className="btn-brand bg-white !text-primary hover:bg-warmgray">
          Back to Home
        </Link>
        <Link href="/services" className="btn-brand-outline">
          Explore Services
        </Link>
      </div>
    </div>
  );
}
