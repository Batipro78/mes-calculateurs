import { JWT } from "google-auth-library";
import { fetchAllUrls } from "./lib/fetch-sitemap-urls.mjs";

const SCOPES = ["https://www.googleapis.com/auth/indexing"];
const ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const SITEMAP_INDEX = "https://mescalculateurs.fr/sitemap-index.xml";
const DAILY_LIMIT = 200;

const credsJson = process.env.GOOGLE_INDEXING_CREDENTIALS;
if (!credsJson) {
  console.error("ERROR: missing GOOGLE_INDEXING_CREDENTIALS env var");
  process.exit(1);
}

let creds;
try {
  creds = JSON.parse(credsJson);
} catch (e) {
  console.error("ERROR: GOOGLE_INDEXING_CREDENTIALS is not valid JSON");
  process.exit(1);
}

const client = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: SCOPES,
});

const { access_token: accessToken } = await client.authorize();
if (!accessToken) {
  console.error("ERROR: could not obtain access token");
  process.exit(1);
}

const allUrls = await fetchAllUrls(SITEMAP_INDEX);
console.log(`Total URLs in sitemap: ${allUrls.length}`);

const dayOfYear = Math.floor(
  (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
);
const cycleLength = Math.max(1, Math.ceil(allUrls.length / DAILY_LIMIT));
const cycleIndex = dayOfYear % cycleLength;
const offset = cycleIndex * DAILY_LIMIT;
const batch = allUrls.slice(offset, offset + DAILY_LIMIT);

console.log(
  `Cycle ${cycleIndex + 1}/${cycleLength} — pushing ${batch.length} URLs (offset ${offset})`
);

let success = 0;
let failed = 0;
const errors = [];

for (const url of batch) {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, type: "URL_UPDATED" }),
    });
    if (res.ok) {
      success++;
    } else {
      failed++;
      const body = await res.text().catch(() => "");
      errors.push(`${res.status} ${url} — ${body.slice(0, 200)}`);
    }
  } catch (e) {
    failed++;
    errors.push(`EXC ${url} — ${e.message}`);
  }
}

console.log(`Done. Success: ${success}, Failed: ${failed}`);
if (errors.length) {
  console.log("First errors:");
  errors.slice(0, 10).forEach((e) => console.log("  - " + e));
}

if (success === 0) process.exit(1);
