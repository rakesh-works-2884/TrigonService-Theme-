import Image from "next/image";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import DeletePostButton from "@/components/admin/DeletePostButton";
import { getAllPosts } from "@/lib/blog-store";

export default async function AdminDashboardPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Blog Posts ({posts.length})</h1>
          <Link
            href="/admin/posts/new"
            className="rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            + New Post
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {posts.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">No posts yet. Create your first one.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Image</th>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr key={post.slug}>
                    <td className="px-5 py-4">
                      <div className="relative h-12 w-16 overflow-hidden rounded-md bg-warmgray">
                        {post.image ? (
                          <Image src={post.image} alt={post.title} fill sizes="64px" className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                            No image
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-primary">{post.title}</td>
                    <td className="px-5 py-4 text-slate-500">{post.category}</td>
                    <td className="px-5 py-4 text-slate-500">
                      {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-warmgray"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/posts/${post.slug}/edit`}
                          className="rounded-full px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/10"
                        >
                          Edit
                        </Link>
                        <DeletePostButton slug={post.slug} title={post.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
