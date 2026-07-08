import "server-only";
import fs from "fs/promises";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  body: string[];
  image?: string;
};

const DATA_FILE = path.join(process.cwd(), "src", "data", "blog-posts.json");

async function readAll(): Promise<BlogPost[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as BlogPost[];
}

async function writeAll(posts: BlogPost[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2) + "\n", "utf-8");
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await readAll();
  return posts.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await readAll();
  return posts.find((p) => p.slug === slug);
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createPost(input: Omit<BlogPost, "slug"> & { slug?: string }): Promise<BlogPost> {
  const posts = await readAll();
  const baseSlug = input.slug?.trim() || slugify(input.title);
  let slug = baseSlug;
  let i = 2;
  while (posts.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${i}`;
    i += 1;
  }
  const post: BlogPost = { ...input, slug };
  posts.push(post);
  await writeAll(posts);
  return post;
}

export async function updatePost(slug: string, input: Partial<Omit<BlogPost, "slug">>): Promise<BlogPost | undefined> {
  const posts = await readAll();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return undefined;
  posts[idx] = { ...posts[idx], ...input };
  await writeAll(posts);
  return posts[idx];
}

export async function deletePost(slug: string): Promise<boolean> {
  const posts = await readAll();
  const next = posts.filter((p) => p.slug !== slug);
  if (next.length === posts.length) return false;
  await writeAll(next);
  return true;
}
