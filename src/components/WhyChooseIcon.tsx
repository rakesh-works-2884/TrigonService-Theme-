const icons: Record<string, React.ReactNode> = {
  "one-stop": (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </>
  ),
  "pan-india": (
    <>
      <path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  "expert-team": (
    <>
      <path d="M12 3L2 8l10 5 10-5-10-5z" />
      <path d="M6 10.5V16c0 1.5 2.5 3 6 3s6-1.5 6-3v-5.5" />
      <path d="M22 8v6" />
    </>
  ),
  "affordable-pricing": (
    <>
      <path d="M13 3h-4L3 9v4l8 8 10-10V3h-8z" />
      <circle cx="8.5" cy="8.5" r="1.5" />
    </>
  ),
  "on-time-delivery": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
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

export default function WhyChooseIcon({ iconKey, className = "h-6 w-6" }: { iconKey: string; className?: string }) {
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
