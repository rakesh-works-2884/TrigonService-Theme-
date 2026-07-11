const icons: Record<string, React.ReactNode> = {
  lawyers: (
    <>
      <path d="M12 3v18" />
      <path d="M5 7l-3 6a3 3 0 006 0l-3-6z" />
      <path d="M19 7l-3 6a3 3 0 006 0l-3-6z" />
      <path d="M5 7h14" />
      <path d="M8 21h8" />
    </>
  ),
  "company-secretaries": (
    <>
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M15 3v3h3" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </>
  ),
  "chartered-accountants": (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h8" />
      <path d="M8 13h2" />
      <path d="M13 13h3" />
      <path d="M8 17h2" />
      <path d="M13 17h3" />
    </>
  ),
  "compliance-specialists": (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

const DEFAULT_ICON = (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5" />
    <path d="M12 16h.01" />
  </>
);

export default function TeamIcon({ iconKey, className = "h-7 w-7" }: { iconKey: string; className?: string }) {
  const icon = icons[iconKey] ?? DEFAULT_ICON;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icon}
    </svg>
  );
}
