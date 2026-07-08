import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import PostForm from "@/components/admin/PostForm";
import { getPostBySlug } from "@/lib/blog-store";

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-xl font-bold text-navy">Edit Post</h1>
        <div className="mt-6">
          <PostForm mode="edit" initialPost={post} />
        </div>
      </main>
    </div>
  );
}
