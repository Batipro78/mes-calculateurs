import { NextResponse } from "next/server";
import { BASE_URL, getSitemapsCount } from "../lib/sitemap-data";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const count = getSitemapsCount();
  const now = new Date().toISOString();

  const sitemaps = Array.from(
    { length: count },
    (_, i) =>
      `  <sitemap>
    <loc>${BASE_URL}/sitemap/${i}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`,
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
