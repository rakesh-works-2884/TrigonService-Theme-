import AdminHeader from "@/components/admin/AdminHeader";
import PostForm from "@/components/admin/PostForm";
import { getSiteSettings } from "@/lib/site-settings-store";

export default async function NewPostPage() {
  const { blogCategories } = await getSiteSettings();

  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-xl font-bold text-primary">New Post</h1>
        <div className="mt-6">
          <PostForm mode="create" categories={blogCategories} />
        </div>
      </main>
    </div>
  );
}
