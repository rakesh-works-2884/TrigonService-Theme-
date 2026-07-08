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

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/admin" className="text-sm font-bold text-navy">
          Trigon Admin
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="/admin" className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-warmgray">
            Posts
          </Link>
          <Link
            href="/admin/posts/new"
            className="rounded-full bg-navy px-4 py-1.5 text-sm font-semibold text-white hover:bg-navy-dark"
          >
            + New Post
          </Link>
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
