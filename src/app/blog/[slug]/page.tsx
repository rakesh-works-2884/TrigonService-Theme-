import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog-store";
import ConsultationButton from "@/components/ConsultationButton";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/blog" className="text-sm font-medium text-accent hover:underline">
        ← Back to Blog
      </Link>
      <span className="mt-6 block text-xs font-semibold uppercase tracking-wide text-accent">{post.category}</span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-sm text-slate-400">
        {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      {post.image && (
        <div className="img-tilt relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lg">
          <Image src={post.image} alt={post.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" priority />
        </div>
      )}

      <div className="mt-8 space-y-5">
        {post.body.map((para, idx) => (
          <p key={idx} className="leading-relaxed text-slate-700">
            {para}
          </p>
        ))}
      </div>

      <div className="mt-14 bg-primary p-8 text-center text-white">
        <h3 className="text-lg font-bold">Need help with this?</h3>
        <p className="mt-2 text-sm text-slate-200">Talk to our compliance team for guidance specific to your business.</p>
        <ConsultationButton className="btn-brand mt-5 bg-white !text-primary hover:bg-warmgray" />
      </div>
    </article>
  );
}
