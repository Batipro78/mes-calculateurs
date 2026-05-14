export async function fetchAllUrls(sitemapIndexUrl) {
  const indexRes = await fetch(sitemapIndexUrl);
  if (!indexRes.ok) {
    throw new Error(`Failed to fetch sitemap index ${sitemapIndexUrl}: ${indexRes.status}`);
  }
  const indexXml = await indexRes.text();
  const sitemapUrls = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

  const all = [];
  for (const sitemapUrl of sitemapUrls) {
    const res = await fetch(sitemapUrl);
    if (!res.ok) {
      console.warn(`Skipping ${sitemapUrl}: HTTP ${res.status}`);
      continue;
    }
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    all.push(...urls);
  }
  return all;
}
