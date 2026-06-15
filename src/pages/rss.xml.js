import rss from "@astrojs/rss";

export async function GET(context) {
  return rss({
    title: "Alex Anokhin — AI News",
    description: "AI and technology news through Alex Anokhin's personal technical filter.",
    site: context.site,
    items: []
  });
}
