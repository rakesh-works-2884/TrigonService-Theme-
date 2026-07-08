"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-store";

export default function BlogList({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory = !activeCategory || p.category === activeCategory;
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [posts, activeCategory, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
              activeCategory === null ? "bg-navy text-white" : "bg-warmgray text-slate-600 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                activeCategory === c ? "bg-navy text-white" : "bg-warmgray text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm sm:w-64 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-40 w-full overflow-hidden">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center gradient-brand">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10 text-white/70">
                    <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
                    <path d="M14 3v5h5" />
                    <path d="M9 13h6M9 17h6M9 9h2" />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-cyan">{post.category}</span>
              <h3 className="mt-3 text-base font-semibold text-navy">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-500">{post.excerpt}</p>
              <p className="mt-4 text-xs text-slate-400">
                {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && <p className="col-span-full text-center text-sm text-slate-500">No articles found.</p>}
      </div>
    </div>
  );
}
