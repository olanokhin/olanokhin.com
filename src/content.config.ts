import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    status: z.enum(["draft", "published"]).default("draft"),
    topics: z.array(z.string()).default([]),
    source_urls: z.array(z.string().url()).default([]),
    importance: z.number().min(1).max(5).default(3),
    summary: z.string().optional(),
    take: z.string().optional(),
    linkedin_hook: z.string().optional(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    thumbnail: z.string().optional(),
    thumbnail_alt: z.string().optional()
  })
});

export const collections = { news };
