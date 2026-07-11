type Props = {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  tone?: "solid" | "soft";
  orbit?: boolean;
  className?: string;
};

const SIZE_CLASS = { xs: "h-7 w-7", sm: "h-10 w-10", md: "h-12 w-12", lg: "h-16 w-16" };

export default function IconBadge({ children, size = "md", tone = "solid", orbit = false, className = "" }: Props) {
  const toneClass =
    tone === "solid"
      ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30"
      : "bg-gradient-to-br from-primary/10 to-accent/15 text-primary";

  return (
    <span
      className={`icon-badge ${orbit ? "icon-orbit" : ""} relative flex ${SIZE_CLASS[size]} shrink-0 items-center justify-center rounded-2xl ${toneClass} transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:shadow-xl ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center transition-transform duration-300 ease-out group-hover:rotate-6 group-hover:scale-110">
        {children}
      </span>
    </span>
  );
}
