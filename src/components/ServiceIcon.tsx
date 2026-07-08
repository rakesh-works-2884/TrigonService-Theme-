const icons: Record<string, React.ReactNode> = {
  "business-registration-setup": (
    <path d="M4 21V7l8-4 8 4v14M4 21h16M9 21v-4h6v4M9 10h.01M9 14h.01M15 10h.01M15 14h.01" />
  ),
  "government-regulatory-registrations": (
    <path d="M2 10l10-6 10 6M4 10v11M20 10v11M8 10v11M16 10v11M2 21h20" />
  ),
  "tax-registration-filing": (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  "government-business-licenses": (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  "labour-law-compliance": (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17.5" cy="9.5" r="2.2" />
      <path d="M15.8 14.2c2 .5 3.7 2.4 3.7 4.8" />
    </>
  ),
  certifications: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5L7 21l5-3 5 3-2-7.5" />
    </>
  ),
  "intellectual-property": (
    <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3 11.2c.6.4 1 1.1 1 1.8h4c0-.7.4-1.4 1-1.8A6 6 0 0012 3z" />
  ),
  "corporate-compliance": (
    <>
      <rect x="6" y="3.5" width="12" height="17" rx="2" />
      <path d="M9 3.5V3a1 1 0 011-1h4a1 1 0 011 1v.5" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  "financial-advisory": (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 6h6v6" />
    </>
  ),
  "international-business": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 010 18" />
      <path d="M12 3a15 15 0 000 18" />
    </>
  ),
  "legal-documentation": (
    <>
      <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6M9 9h2" />
    </>
  ),
};

export default function ServiceIcon({ slug, className = "h-5 w-5" }: { slug: string; className?: string }) {
  const icon = icons[slug];
  if (!icon) return null;
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
