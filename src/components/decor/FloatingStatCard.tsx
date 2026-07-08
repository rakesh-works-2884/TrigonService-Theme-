export default function FloatingStatCard({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`animate-float flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 ring-black/5 ${className}`}
    >
      <svg viewBox="0 0 40 32" className="h-8 w-10 shrink-0" fill="none">
        <rect x="0" y="18" width="6" height="14" rx="1.5" className="fill-cyan/30" />
        <rect x="9" y="10" width="6" height="22" rx="1.5" className="fill-cyan/60" />
        <rect x="18" y="14" width="6" height="18" rx="1.5" className="fill-cyan" />
        <rect x="27" y="4" width="6" height="28" rx="1.5" className="fill-navy" />
      </svg>
      <div>
        <p className="text-lg font-bold leading-none text-navy">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}
