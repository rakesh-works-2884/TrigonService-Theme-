"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminHeader() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const links = [
    { href: "/admin", label: "Posts" },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/industries", label: "Industries" },
    { href: "/admin/pricing", label: "Pricing" },
    { href: "/admin/settings", label: "Site Settings" },
    { href: "/admin/site-images", label: "Images" },
    { href: "/admin/seo", label: "SEO" },
  ];

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/admin" className="text-sm font-bold text-primary">
          Trigon Admin
        </Link>
        <nav className="flex flex-wrap items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-warmgray"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-warmgray disabled:opacity-60"
          >
            {loggingOut ? "..." : "Logout"}
          </button>
        </nav>
      </div>
    </header>
  );
}
