import { defineCollection, z } from "astro:content";

const news = defineCollection({
  type: "content",
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
    linkedin_hook: z.string().optional()
  })
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    status: z.enum(["draft", "published"]).default("published"),
    summary: z.string().optional(),
    links: z.array(z.string().url()).default([]),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { news, projects };
