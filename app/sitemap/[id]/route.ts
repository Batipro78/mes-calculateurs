import { NextResponse } from "next/server";
import {
  getSitemapChunk,
  getSitemapsCount,
  type SitemapEntry,
} from "../../lib/sitemap-data";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  const count = getSitemapsCount();
  return Array.from({ length: count }, (_, i) => ({ id: String(i) }));
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toIsoDate(value: SitemapEntry["lastModified"]): string {
  if (!value) return new Date().toISOString();
  if (value instanceof Date) return value.toISOString();
  return new Date(value).toISOString();
}

function buildXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const parts: string[] = [`    <loc>${escapeXml(entry.url)}</loc>`];
      parts.push(`    <lastmod>${toIsoDate(entry.lastModified)}</lastmod>`);
      if (entry.changeFrequency) {
        parts.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
      }
      if (typeof entry.priority === "number") {
        parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
      }
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const numericId = Number.parseInt(id, 10);
  const chunk = getSitemapChunk(Number.isFinite(numericId) ? numericId : 0);

  if (chunk.length === 0) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return new NextResponse(buildXml(chunk), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
