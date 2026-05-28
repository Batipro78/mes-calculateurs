import { NextRequest, NextResponse } from "next/server";

const HOST = "mescalculateurs.fr";
const KEY = "8f4d3c2b1a9e8f7d6c5b4a3e2d1c9b8a";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const CHUNK = 10000;

/**
 * Fetch all URLs from the sitemap index.
 * Used by IndexNow push to notify Bing/Yandex of new pages.
 */
async function fetchAllUrls(sitemapIndexUrl: string): Promise<string[]> {
  const indexRes = await fetch(sitemapIndexUrl, { method: "GET" });
  if (!indexRes.ok) {
    throw new Error(
      `Failed to fetch sitemap index ${sitemapIndexUrl}: ${indexRes.status}`
    );
  }
  const indexXml = await indexRes.text();
  const sitemapUrls = [
    ...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g),
  ].map((m) => m[1].trim());

  const all: string[] = [];
  for (const sitemapUrl of sitemapUrls) {
    const res = await fetch(sitemapUrl, { method: "GET" });
    if (!res.ok) {
      console.warn(`Skipping ${sitemapUrl}: HTTP ${res.status}`);
      continue;
    }
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
      m[1].trim()
    );
    all.push(...urls);
  }
  return all;
}

/**
 * GET /api/indexnow
 * Manually trigger IndexNow push to Bing/Yandex.
 * Requires x-admin-token header matching ADMIN_STATS_TOKEN env var.
 */
export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  const expectedToken = process.env.ADMIN_STATS_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  try {
    const sitemapIndex = `https://${HOST}/sitemap-index.xml`;
    const urls = await fetchAllUrls(sitemapIndex);

    let totalOk = 0;
    let totalFail = 0;

    for (let i = 0; i < urls.length; i += CHUNK) {
      const batch = urls.slice(i, i + CHUNK);
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host: HOST,
          key: KEY,
          keyLocation: KEY_LOCATION,
          urlList: batch,
        }),
      });

      const ok = res.ok || res.status === 202;
      if (ok) {
        totalOk += batch.length;
      } else {
        totalFail += batch.length;
        console.warn(
          `Batch ${Math.floor(i / CHUNK) + 1} failed: HTTP ${res.status}`
        );
      }
    }

    return NextResponse.json(
      {
        pushed: totalOk,
        failed: totalFail,
        status: "ok",
        totalUrls: urls.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("IndexNow push error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
