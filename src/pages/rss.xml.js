import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("news", ({ data }) => data.status === "published");

  return rss({
    title: "Alex Anokhin — AI News",
    description: "AI and technology news through Alex Anokhin's personal technical filter.",
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.summary,
        link: `/news/${post.data.slug ?? post.id}/`,
        categories: post.data.topics
      }))
  });
}
