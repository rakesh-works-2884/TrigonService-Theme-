import type { MetadataRoute } from "next";
import { getAllServices } from "@/lib/services-store";
import { getAllIndustries } from "@/lib/industries-store";
import { getAllPosts } from "@/lib/blog-store";
import { SITE_URL } from "@/lib/site-url";

const baseUrl = SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [servicePillars, industries, blogPosts] = await Promise.all([
    getAllServices(),
    getAllIndustries(),
    getAllPosts(),
  ]);

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
