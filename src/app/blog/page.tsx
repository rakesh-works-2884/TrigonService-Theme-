import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BlogList from "@/components/BlogList";
import { getAllPosts } from "@/lib/blog-store";
import { blogCategories } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Policy updates, startup compliance checklists, GST & tax tips, risk management, and business growth insights from Trigon Services.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <PageHero
        eyebrow="Blog & Insights"
        title="Compliance News You Can Actually Use"
        description="Practical guidance on policy changes, tax filing, and risk management for growing businesses."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <BlogList posts={posts} categories={blogCategories} />
      </section>
    </div>
  );
}
