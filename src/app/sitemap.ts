import type { MetadataRoute } from "next";
import { servicePillars } from "@/data/services";
import { industries } from "@/data/industries";
import { getAllPosts } from "@/lib/blog-store";

const baseUrl = "https://www.trigonservices.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllPosts();

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/industries",
    "/why-choose-us",
    "/pricing",
    "/testimonials",
    "/blog",
    "/consultation",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
    "/refund-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = servicePillars.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
  }));

  const industryRoutes = industries.map((i) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...blogRoutes];
}
