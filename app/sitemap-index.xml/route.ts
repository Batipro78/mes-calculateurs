import { NextResponse } from "next/server";

const BASE_URL = "https://mes-calculateurs.vercel.app";

export async function GET() {
  // Import the generateSitemaps function to know how many sitemaps exist
  const { generateSitemaps } = await import("../sitemap");
  const sitemaps = await generateSitemaps();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((s) => `  <sitemap>
    <loc>${BASE_URL}/sitemap/${s.id}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join("\n")}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
