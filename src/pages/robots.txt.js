const site = "https://olanokhin.com";

export function GET() {
  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${site}/sitemap.xml`,
      `Host: ${site.replace("https://", "")}`
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
