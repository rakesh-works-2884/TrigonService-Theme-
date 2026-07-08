export default function DotGrid({ className = "", color = "white" }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="dot-grid-pattern" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill={color} />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#dot-grid-pattern)" />
    </svg>
  );
}
