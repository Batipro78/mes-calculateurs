import { fetchAllUrls } from "./lib/fetch-sitemap-urls.mjs";

const HOST = "mescalculateurs.fr";
const SITEMAP_INDEX = `https://${HOST}/sitemap-index.xml`;
const KEY = "8f4d3c2b1a9e8f7d6c5b4a3e2d1c9b8a";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const CHUNK = 10000;

const urls = await fetchAllUrls(SITEMAP_INDEX);
console.log(`Fetched ${urls.length} URLs from sitemap`);

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
  console.log(
    `Batch ${Math.floor(i / CHUNK) + 1} (${batch.length} URLs): HTTP ${res.status} ${res.statusText}`
  );

  if (ok) totalOk += batch.length;
  else {
    totalFail += batch.length;
    const body = await res.text().catch(() => "");
    if (body) console.log("  Response body: " + body.slice(0, 300));
  }
}

console.log(`Done. Accepted: ${totalOk}, Failed: ${totalFail}`);
if (totalOk === 0) process.exit(1);
