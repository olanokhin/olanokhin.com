import { getCollection } from "astro:content";

const site = "https://olanokhin.com";

function urlEntry(path, lastmod, priority = "0.7") {
  return [
    "  <url>",
    `    <loc>${site}${path}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
    "    <changefreq>weekly</changefreq>",
    `    <priority>${priority}</priority>`,
    "  </url>"
  ].filter(Boolean).join("\n");
}

export async function GET() {
  const posts = await getCollection("news", ({ data }) => data.status === "published");
  const staticPages = [
    urlEntry("/", undefined, "1.0"),
    urlEntry("/projects", undefined, "0.8"),
    urlEntry("/news", undefined, "0.8")
  ];
  const newsPages = posts.map((post) => {
    const slug = post.data.slug ?? post.id;
    const lastmod = post.data.date.toISOString().slice(0, 10);
    return urlEntry(`/news/${slug}/`, lastmod, "0.7");
  });

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...staticPages,
      ...newsPages,
      "</urlset>"
    ].join("\n"),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
}
