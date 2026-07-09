import AdminHeader from "@/components/admin/AdminHeader";
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-xl font-bold text-primary">New Post</h1>
        <div className="mt-6">
          <PostForm mode="create" />
        </div>
      </main>
    </div>
  );
}
